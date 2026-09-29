// Payment server — keeps the Stripe secret key private (never sent to the browser).
import 'dotenv/config'
import express from 'express'
import Stripe from 'stripe'
import multer from 'multer'
import path from 'node:path'
import fs from 'node:fs/promises'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { PAYMENT_OPTIONS, PAYMENT_METHODS } from './src/paymentOptions.js'
import { sendPaymentEmails, mailEnabled } from './mailer.js'

const { STRIPE_SECRET_KEY, SITE_URL = 'http://localhost:5173', PORT = 3001 } = process.env

if (!STRIPE_SECRET_KEY || STRIPE_SECRET_KEY.startsWith('sk_xxx')) {
  console.warn('⚠  STRIPE_SECRET_KEY is missing. Add it to the .env file.')
}
const stripe = STRIPE_SECRET_KEY ? new Stripe(STRIPE_SECRET_KEY) : null

// Price is set here on the server so customers can't change it in the browser
const PLAN = {
  name: 'Amazon VA Training',
  amount: 129900, // ₱1,299.00 in centavos
  currency: 'php',
  interval: 'month',
}

const app = express()
app.use(express.json())

// ---- Manual payment submissions (GCash / Maya / Bank / QR Ph) ----
// Each submission is saved to submissions/<date>_<reference>/ with details.json + the proof file.
const ROOT = path.dirname(fileURLToPath(import.meta.url))
const SUBMISSIONS_DIR = path.join(ROOT, 'submissions')
const PROOF_TYPES = { 'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp', 'application/pdf': '.pdf' }

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => cb(null, Boolean(PROOF_TYPES[file.mimetype])),
})

app.post('/api/payment-submissions', (req, res) => {
  upload.single('screenshot')(req, res, async (uploadErr) => {
    if (uploadErr) {
      const msg = uploadErr.code === 'LIMIT_FILE_SIZE' ? 'Proof file must be 5MB or smaller.' : 'Could not upload your proof file.'
      return res.status(400).json({ error: msg })
    }
    const b = req.body || {}
    const clean = (v) => String(v ?? '').trim()
    const email = clean(b.email).toLowerCase().replace(/\s+/g, '')
    const confirmEmail = clean(b.confirmEmail).toLowerCase().replace(/\s+/g, '')
    const option = PAYMENT_OPTIONS.find((o) => o.id === b.paymentOptionId)

    const errors = []
    if (!option) errors.push('Select a valid payment option.')
    if (!clean(b.firstName)) errors.push('First name is required.')
    if (!clean(b.lastName)) errors.push('Last name is required.')
    if (!/^\d{11}$/.test(clean(b.phone))) errors.push('Phone number must be exactly 11 digits (e.g. 09171234567).')
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errors.push('Enter a valid email address.')
    if (email !== confirmEmail) errors.push('Email addresses do not match.')
    if (!clean(b.reference)) errors.push('Reference number is required.')
    if (!PAYMENT_METHODS.some((m) => m.id === b.provider)) errors.push('Select a payment option (QRPH or GCash).')
    if (!req.file) errors.push('Upload your payment proof (JPG, PNG, WEBP, or PDF).')
    if (errors.length) return res.status(400).json({ error: errors[0], errors })

    try {
      const submittedAt = new Date()
      const reference = clean(b.reference)
      const safeRef = reference.replace(/[^A-Za-z0-9-]/g, '').slice(0, 40) || 'noref'
      const id = `${submittedAt.toISOString().replace(/[:.]/g, '-')}_${safeRef}`
      const dir = path.join(SUBMISSIONS_DIR, id)
      await fs.mkdir(dir, { recursive: true })
      const proofFile = `proof${PROOF_TYPES[req.file.mimetype]}`
      await fs.writeFile(path.join(dir, proofFile), req.file.buffer)

      const record = {
        id,
        status: 'pending',
        submittedAt: submittedAt.toISOString(),
        paymentOption: option.name,
        amount: option.amount, // taken from the server list, not the browser
        firstName: clean(b.firstName),
        lastName: clean(b.lastName),
        name: `${clean(b.firstName)} ${clean(b.lastName)}`,
        phone: clean(b.phone),
        email,
        reference,
        provider: b.provider,
        proofFile,
      }
      await fs.writeFile(path.join(dir, 'details.json'), JSON.stringify(record, null, 2))
      console.log(`💰 New payment submission: ${record.name} · ${record.provider} · ref ${reference} · ₱${option.amount}`)
      // Email admin (with receipt) + customer "pending" reply — runs in background, never blocks the customer
      sendPaymentEmails(record, { buffer: req.file.buffer, mimetype: req.file.mimetype, ext: PROOF_TYPES[req.file.mimetype] })
        .catch((err) => console.error('Email error:', err.message))
      res.json({ ok: true, submission: { id, reference, amount: option.amount, paymentOption: option.name, email, provider: record.provider, submittedAt: record.submittedAt } })
    } catch (err) {
      console.error('Save submission error:', err.message)
      res.status(500).json({ error: 'Could not save your submission. Please try again.' })
    }
  })
})

// ---- Editable site images (admin only) ----
// Uploaded images are saved to site-images/<slot>.<ext> and served at /api/site-images/<slot>.
// Uploading requires the ADMIN_PASSWORD from .env, sent in the x-admin-password header.
const SITE_IMAGES_DIR = path.join(ROOT, 'site-images')
const SITE_IMAGE_SLOTS = ['course', 'founder']
const IMAGE_TYPES = { 'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp' }

const imageUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => cb(null, Boolean(IMAGE_TYPES[file.mimetype])),
})

const isAdmin = (req) => {
  const expected = Buffer.from(process.env.ADMIN_PASSWORD || '')
  const given = Buffer.from(req.get('x-admin-password') || '')
  return expected.length > 0 && given.length === expected.length && crypto.timingSafeEqual(given, expected)
}

const findSiteImage = async (slot) => {
  const files = await fs.readdir(SITE_IMAGES_DIR).catch(() => [])
  return files.find((f) => f.startsWith(`${slot}.`))
}

app.get('/api/site-images/:slot', async (req, res) => {
  if (!SITE_IMAGE_SLOTS.includes(req.params.slot)) return res.status(404).end()
  const file = await findSiteImage(req.params.slot)
  if (!file) return res.status(404).end()
  res.set('Cache-Control', 'no-cache')
  res.sendFile(path.join(SITE_IMAGES_DIR, file))
})

app.post('/api/site-images/:slot', (req, res) => {
  const { slot } = req.params
  if (!SITE_IMAGE_SLOTS.includes(slot)) return res.status(404).json({ error: 'Unknown image.' })
  if (!process.env.ADMIN_PASSWORD) return res.status(503).json({ error: 'Add ADMIN_PASSWORD to the .env file to enable image uploads.' })
  if (!isAdmin(req)) return res.status(401).json({ error: 'Wrong admin password.' })

  imageUpload.single('image')(req, res, async (uploadErr) => {
    if (uploadErr) {
      const msg = uploadErr.code === 'LIMIT_FILE_SIZE' ? 'Image must be 5MB or smaller.' : 'Could not upload the image.'
      return res.status(400).json({ error: msg })
    }
    if (!req.file) return res.status(400).json({ error: 'Choose a JPG, PNG, or WEBP image.' })
    try {
      await fs.mkdir(SITE_IMAGES_DIR, { recursive: true })
      const old = await findSiteImage(slot)
      if (old) await fs.rm(path.join(SITE_IMAGES_DIR, old))
      await fs.writeFile(path.join(SITE_IMAGES_DIR, `${slot}${IMAGE_TYPES[req.file.mimetype]}`), req.file.buffer)
      console.log(`🖼  Site image updated: ${slot}`)
      res.json({ ok: true, updatedAt: Date.now() })
    } catch (err) {
      console.error('Save site image error:', err.message)
      res.status(500).json({ error: 'Could not save the image. Please try again.' })
    }
  })
})

app.post('/api/create-checkout-session', async (req, res) => {
  if (!stripe) return res.status(500).json({ error: 'Payments are not set up yet.' })
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: PLAN.currency,
            unit_amount: PLAN.amount,
            recurring: { interval: PLAN.interval },
            // Tax category required by Stripe Managed Payments: electronically supplied services
            product_data: { name: PLAN.name, tax_code: 'txcd_10000000' },
          },
        },
      ],
      success_url: `${SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/checkout`,
    })
    res.json({ url: session.url })
  } catch (err) {
    console.error('Stripe error:', err.message)
    res.status(500).json({ error: 'Could not start checkout. Please try again.' })
  }
})

// In production, also serve the built website
const dist = path.join(path.dirname(fileURLToPath(import.meta.url)), 'dist')
app.use(express.static(dist))
app.get('/{*splat}', (req, res) => res.sendFile(path.join(dist, 'index.html')))

app.listen(PORT, () => {
  console.log(`Payment server running on http://localhost:${PORT}`)
  if (!mailEnabled) console.warn('⚠  Payment emails are OFF. Add SMTP_USER and SMTP_PASS (Gmail App Password) to .env')
})
