import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft, CreditCard, HelpCircle, MessageCircleQuestion, Mail, Lock, AlertTriangle, QrCode, Copy, Check,
  Upload, FileText, Send, CheckCircle2, Loader2, X, ShieldCheck, Wallet, Download,
} from 'lucide-react'
import { Page, Footer } from '../components/Layout.jsx'
import { PAYMENT_OPTIONS, PAYMENT_METHODS, formatPeso } from '../paymentOptions.js'
import { PAY_TO, SUPPORT_EMAIL } from '../config.js'

const TABS = [
  { id: 'payment', label: 'Payment', icon: CreditCard },
  { id: 'how', label: 'How to Pay', icon: HelpCircle },
  { id: 'faq', label: 'FAQs', icon: MessageCircleQuestion },
  { id: 'contact', label: 'Contact Us', icon: Mail },
]

const HOW_TO_PAY = [
  ['Choose the correct payment option.', 'This becomes your declared course/payment choice.'],
  ['Scan the QR or follow the notes.', 'Pay the exact amount shown on the page. Different amounts may be declined or delayed.'],
  ['Copy your reference number.', 'Use the reference from your payment receipt or confirmation message.'],
  ['Upload your proof.', 'Attach a clear screenshot or PDF copy of your payment.'],
  ['Submit and wait for verification.', 'Your reference number and exact amount will be checked against the official transaction.'],
]

const FAQS = [
  ['Can I pay a different amount?', 'No. Please pay the exact amount shown for your selected payment option. Payments with a different amount may be declined, delayed, or not eligible for refund.'],
  ['What if someone else sends the payment for me?', 'That is okay. The payer name is not used for matching. Please make sure the reference number and exact amount are correct.'],
  ['What proof should I upload?', 'Upload a clear screenshot or PDF showing the amount paid and reference number.'],
  ['What if I entered the wrong reference number?', 'Please contact support with your correct payment details so the team can review your submission.'],
  ['How long does verification take?', 'Verification depends on when the transaction is received and matched, usually within 24 hours.'],
]

const EMPTY_FORM = { firstName: '', lastName: '', phone: '', email: '', confirmEmail: '', reference: '', provider: '' }
const MAX_FILE = 5 * 1024 * 1024
const FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']

const card = 'rounded-[2rem] bg-white p-6 shadow-[0_12px_35px_rgba(32,28,16,0.06)] md:p-8'
const inputCls =
  'w-full rounded-2xl border border-line bg-white px-4 py-3.5 text-sm font-medium text-ink outline-none transition placeholder:text-muted focus:border-brand-bright focus:ring-4 focus:ring-brand-bright/15'

function Field({ label, hint, children, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-sm font-bold text-ink">{label}<span className="text-red-500"> *</span></span>
      {children}
      {hint && <small className="mt-1.5 block text-xs leading-5 text-muted">{hint}</small>}
    </label>
  )
}

function CopyButton({ value }) {
  const [copied, setCopied] = useState(false)
  if (!value) return null
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value.replace(/\s/g, ''))
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        } catch { /* clipboard unavailable */ }
      }}
      className="inline-flex items-center gap-1 rounded-full bg-tint-2 px-2.5 py-1 text-[11px] font-extrabold text-brand transition hover:bg-tint-3"
    >
      {copied ? <><Check className="size-3" /> Copied</> : <><Copy className="size-3" /> Copy</>}
    </button>
  )
}

function PolicyNote({ title, children }) {
  return (
    <div className="flex gap-3 rounded-2xl border border-accent/60 bg-accent/10 p-4" role="note">
      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent text-accent-ink"><AlertTriangle className="size-4" /></span>
      <div>
        <strong className="text-sm font-extrabold text-ink">{title}</strong>
        <p className="mt-1 text-xs leading-5 text-body">{children}</p>
      </div>
    </div>
  )
}

export default function Checkout() {
  const [tab, setTab] = useState('payment')
  const [optionId, setOptionId] = useState(PAYMENT_OPTIONS.length === 1 ? PAYMENT_OPTIONS[0].id : '')
  const [form, setForm] = useState(EMPTY_FORM)
  const [file, setFile] = useState(null)
  const [fileError, setFileError] = useState('')
  const [reviewOpen, setReviewOpen] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  const option = PAYMENT_OPTIONS.find((o) => o.id === optionId)
  const previewUrl = useMemo(() => (file && file.type.startsWith('image/') ? URL.createObjectURL(file) : ''), [file])
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })
  const norm = (v) => v.trim().toLowerCase().replace(/\s+/g, '')
  const emailMismatch = form.confirmEmail && norm(form.email) !== norm(form.confirmEmail)

  const onFile = (e) => {
    const f = e.target.files?.[0]
    setFileError('')
    if (!f) return setFile(null)
    if (!FILE_TYPES.includes(f.type)) { e.target.value = ''; setFile(null); return setFileError('Accepted formats: JPG, PNG, WEBP, PDF.') }
    if (f.size > MAX_FILE) { e.target.value = ''; setFile(null); return setFileError('File is too large. Max 5MB.') }
    setFile(f)
  }

  const openReview = (e) => {
    e.preventDefault()
    setError('')
    if (!option || !form.provider) return setError('Please select a payment option (QRPH or GCash).')
    if (emailMismatch) return setError('Email addresses do not match.')
    if (!file) return setError('Please upload your payment proof.')
    setAgreed(false)
    setReviewOpen(true)
  }

  const submit = async () => {
    setSubmitting(true)
    setError('')
    try {
      const data = new FormData()
      Object.entries(form).forEach(([k, v]) => data.append(k, v))
      data.append('paymentOptionId', optionId)
      data.append('screenshot', file)
      const res = await fetch('/api/payment-submissions', { method: 'POST', body: data })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(json.error || 'Could not submit your payment. Please try again.')
      setResult(json.submission)
      setReviewOpen(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      setError(err.message === 'Failed to fetch' ? 'Payment server is offline. Please try again later.' : err.message)
      setReviewOpen(false)
    } finally {
      setSubmitting(false)
    }
  }

  const resetAll = () => {
    setResult(null); setForm(EMPTY_FORM); setFile(null); setAgreed(false); setError(''); setTab('payment')
  }

  const payToRows = [
    ['Maya Number', PAY_TO.mayaNumber, true],
    ['Bank', PAY_TO.bankDetails],
  ].filter(([, v]) => v)

  return (
    <Page footer={<Footer copyright="© 2026 Sourcing VA Training Services. All rights reserved." />}>
      <section className="mx-auto max-w-[1280px] px-6 py-10 md:px-8 md:py-14">
        <Link to="/subscription" className="inline-flex items-center gap-2 text-sm font-bold text-brand hover:underline">
          <ArrowLeft className="size-4" /> Back to Pricing
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-[240px_1fr]">
          {/* Sidebar */}
          <aside className="h-fit lg:sticky lg:top-24">
            <div className="rounded-[1.75rem] bg-gradient-to-br from-brand-bright to-brand-deep p-5 text-white">
              <p className="text-lg font-extrabold">Sourcing VA Training Services</p>
              <p className="text-xs font-semibold text-white/75">Payment Portal</p>
            </div>
            <nav className="mt-4 flex gap-2 overflow-x-auto lg:flex-col" aria-label="Payment portal navigation">
              {TABS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  className={`flex shrink-0 items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition ${
                    tab === id ? 'bg-brand-bright text-white shadow-md shadow-brand-bright/25' : 'bg-white text-body hover:bg-tint hover:text-brand'
                  }`}
                >
                  <Icon className="size-5" /> {label}
                </button>
              ))}
            </nav>
          </aside>

          <div className="min-w-0">
            {/* ===== THANK YOU ===== */}
            {tab === 'payment' && result && (
              <div className={`${card} space-y-8`}>
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <span className="grid size-16 shrink-0 place-items-center rounded-full bg-tint-3 text-brand"><CheckCircle2 className="size-9" /></span>
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-wider text-brand">Submission received</p>
                    <h1 className="mt-1 text-2xl font-extrabold md:text-3xl">Thank you! Your payment details were submitted.</h1>
                    <p className="mt-2 text-sm leading-6 text-body">Access will be available upon payment verification. Your receipt and access details will be sent to <b className="text-ink">{result.email}</b>.</p>
                    <p className="mt-3 rounded-xl bg-tint px-4 py-3 text-xs leading-5 text-body">
                      📧 We sent a confirmation email. If you don't see it in your Inbox, check your <b>Spam</b> or <b>Promotions</b> folder and mark it as <b>"Not spam"</b> so you receive your course access.
                    </p>
                  </div>
                </div>
                <dl className="grid gap-3 rounded-2xl bg-tint p-5 text-sm sm:grid-cols-2">
                  {[
                    ['Payment option', result.paymentOption],
                    ['Amount', formatPeso(result.amount)],
                    ['Reference number', result.reference],
                    ['Payment method', result.provider],
                  ].map(([k, v]) => (
                    <div key={k}><dt className="text-xs font-semibold text-muted">{k}</dt><dd className="font-extrabold text-ink">{v}</dd></div>
                  ))}
                </dl>
                <div>
                  <h2 className="text-lg font-extrabold">What happens next?</h2>
                  <ol className="mt-4 space-y-3">
                    {[
                      'We check your reference number and exact amount against our official records.',
                      'If the reference and amount match, your payment will be verified.',
                      'Once verified, your official payment receipt will be sent to your email address.',
                      'Your course access details will then be sent to the same email.',
                      'If there is a mismatch, we will email you a payment verification update.',
                    ].map((t, i) => (
                      <li key={t} className="flex gap-3 text-sm leading-6 text-body">
                        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand-bright text-[11px] font-extrabold text-white">{i + 1}</span>{t}
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button onClick={resetAll} className="rounded-full bg-brand-bright px-6 py-3 text-sm font-extrabold text-white transition hover:bg-brand">Submit Another Payment</button>
                  <button onClick={() => setTab('contact')} className="rounded-full border-2 border-brand-bright px-6 py-3 text-sm font-extrabold text-brand transition hover:bg-tint">Contact Support</button>
                </div>
                <PolicyNote title="Final payment reminder">
                  Wrong course selection, wrong reference number, duplicate payment, underpayment, or overpayment may be declined, delayed, and may not be eligible for refund because the submitted payment must match the selected course amount exactly.
                </PolicyNote>
              </div>
            )}

            {/* ===== PAYMENT ===== */}
            {tab === 'payment' && !result && (
              <div className="space-y-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div>
                    <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">Complete Your <span className="text-brand-bright">Payment</span></h1>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-body">Choose carefully. Your selected option becomes your declared purchase and exact payment amount for verification.</p>
                  </div>
                  <span className="inline-flex w-fit items-center gap-2 rounded-full bg-tint-2 px-4 py-2 text-xs font-extrabold text-brand"><Lock className="size-3.5" /> Secure payment details</span>
                </div>

                {/* Option + QR */}
                <div className={`${card} space-y-5`}>
                  <Field label="Select Payment Option">
                    <select value={form.provider} onChange={set('provider')} required className={inputCls}>
                      <option value="" disabled hidden>GCash, QRPH</option>
                      {PAYMENT_METHODS.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
                    </select>
                  </Field>

                  {option && form.provider && (
                    <div className="rounded-[1.5rem] border-2 border-dashed border-tint-3 p-5 md:p-8">
                      <div className="mx-auto mb-6 max-w-md">
                        <PolicyNote title="Note">
                          Make sure to screenshot and upload the receipt below, along with the reference number.
                        </PolicyNote>
                      </div>
                      {form.provider === 'QRPH' && <div className="mx-auto w-full max-w-md">
                        {option.qrImage ? (
                          <>
                            <a href={option.qrImage} target="_blank" rel="noopener noreferrer" title="Open full-size QR">
                              <img src={option.qrImage} alt={`QR code for ${option.name}`} className="w-full rounded-3xl shadow-[0_20px_50px_rgba(32,28,16,0.15)]" />
                            </a>
                            <div className="mt-4 flex flex-col items-center gap-2">
                              <a href={option.qrImage} download={`sourcing-va-${option.id}-qr.jpg`} className="inline-flex items-center gap-2 rounded-full bg-brand-bright px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-brand-bright/25 transition hover:bg-brand">
                                <Download className="size-4" /> Download QR
                              </a>
                              <p className="text-center text-xs text-muted">Scan with GCash, Maya, or any banking app via InstaPay. On mobile, download the QR and upload it in your app.</p>
                            </div>
                          </>
                        ) : (
                          <div className="grid aspect-square place-items-center rounded-3xl bg-tint text-center text-muted"><div><QrCode className="mx-auto size-16" /><p className="mt-2 text-xs font-semibold">QR code coming soon</p></div></div>
                        )}
                      </div>}

                      {form.provider === 'GCASH' && (
                        <div className="mx-auto max-w-md space-y-6">
                          {/* GCash QR picture */}
                          {PAY_TO.gcashQr && (
                            <div>
                              <a href={PAY_TO.gcashQr} target="_blank" rel="noopener noreferrer" title="Open full-size GCash QR">
                                <img src={PAY_TO.gcashQr} alt="GCash QR code" className="w-full rounded-3xl shadow-[0_20px_50px_rgba(32,28,16,0.15)]" />
                              </a>
                              <div className="mt-4 flex flex-col items-center gap-2">
                                <a href={PAY_TO.gcashQr} download="sourcing-va-gcash-qr.jpg" className="inline-flex items-center gap-2 rounded-full bg-brand-bright px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-brand-bright/25 transition hover:bg-brand">
                                  <Download className="size-4" /> Download QR
                                </a>
                                <p className="text-center text-xs text-muted">Scan with GCash. On mobile, download the QR and upload it in GCash.</p>
                              </div>
                            </div>
                          )}

                          {/* GCash details card */}
                          <div className="rounded-3xl bg-gradient-to-br from-brand-bright to-brand-deep p-6 text-white shadow-xl shadow-brand-deep/20">
                            <div className="flex items-center gap-3">
                              <img src="/gcash-logo.png" alt="GCash" className="size-14 rounded-2xl shadow-md" />
                              <p className="text-lg font-extrabold">GCash</p>
                            </div>
                            <div className="mt-5 rounded-2xl bg-white/12 p-4">
                              <p className="text-xs font-semibold text-white/70">GCash Number</p>
                              <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
                                <p className="text-2xl font-extrabold tracking-wider">{PAY_TO.gcashNumber}</p>
                                <CopyButton value={PAY_TO.gcashNumber} />
                              </div>
                              {PAY_TO.gcashName && (
                                <>
                                  <p className="mt-3 text-xs font-semibold text-white/70">Account Name</p>
                                  <p className="text-lg font-extrabold">{PAY_TO.gcashName}</p>
                                </>
                              )}
                              <p className="mt-3 text-xs font-semibold text-white/70">Amount</p>
                              <p className="text-lg font-extrabold text-accent">{formatPeso(option.amount)}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="mx-auto mt-8 max-w-md border-t border-tint-2 pt-6">
                        <p className="text-xs font-extrabold uppercase tracking-wider text-brand">Selected option</p>
                        <p className="mt-1 text-xl font-extrabold">{option.name}</p>
                        <p className="mt-3 text-xs font-semibold text-muted">Exact amount to pay</p>
                        <div className="flex flex-wrap items-center gap-3">
                          <p className="text-4xl font-extrabold text-brand">{formatPeso(option.amount)}</p>
                          {option.originalAmount > option.amount && (
                            <>
                              <span className="text-lg font-bold text-muted line-through">{formatPeso(option.originalAmount)}</span>
                              <span className="rounded-full bg-accent px-3 py-1 text-xs font-extrabold text-accent-ink">
                                {Math.round((1 - option.amount / option.originalAmount) * 100)}% OFF
                              </span>
                            </>
                          )}
                        </div>
                        {option.notes && <p className="mt-3 text-sm leading-6 text-body">{option.notes}</p>}
                        {payToRows.length > 0 && (
                          <dl className="mt-4 space-y-2 border-t border-tint-2 pt-4 text-sm">
                            {payToRows.map(([k, v, copy]) => (
                              <div key={k} className="flex flex-wrap items-center gap-2">
                                <dt className="w-28 text-xs font-semibold text-muted">{k}</dt>
                                <dd className="font-extrabold text-ink">{v}</dd>
                                {copy && <CopyButton value={v} />}
                              </div>
                            ))}
                          </dl>
                        )}
                      </div>
                    </div>
                  )}

                  <PolicyNote title="Important payment policy">
                    You must pay the exact amount for the payment option you selected. Wrong option selection or wrong amount may be declined, delayed, or not eligible for refund. Payer name may be different from the customer; verification uses the reference number and exact amount.
                  </PolicyNote>
                </div>

                {/* Details form */}
                <div className={card}>
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-xl bg-brand-bright text-white"><Wallet className="size-5" /></span>
                    <div>
                      <h2 className="text-xl font-extrabold">Payment Details</h2>
                      <p className="text-sm text-body">Please fill in your details and upload your payment proof.</p>
                    </div>
                  </div>

                  <form onSubmit={openReview} className="mt-6 grid gap-5 md:grid-cols-2">
                    <Field label="First Name" hint="Use your real name for certificate issuance.">
                      <input value={form.firstName} onChange={set('firstName')} placeholder="e.g. Juan" autoComplete="given-name" required className={inputCls} />
                    </Field>
                    <Field label="Last Name" hint="Payment verification uses the reference number and exact amount, not the payer name.">
                      <input value={form.lastName} onChange={set('lastName')} placeholder="e.g. Dela Cruz" autoComplete="family-name" required className={inputCls} />
                    </Field>
                    <Field label="Phone Number" hint="11 digits, numbers only (e.g. 09171234567). We may contact you here if your email is not answered." className="md:col-span-2">
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, '').slice(0, 11) })}
                        placeholder="e.g. 09171234567"
                        autoComplete="tel"
                        inputMode="numeric"
                        maxLength={11}
                        required
                        pattern="[0-9]{11}"
                        title="Enter an 11-digit phone number (e.g. 09171234567)"
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Email Address" hint="Double-check your email — your receipt and course access will be sent there.">
                      <input type="email" value={form.email} onChange={set('email')} placeholder="Enter your email address" autoComplete="email" required className={inputCls} />
                    </Field>
                    <Field label="Confirm Email Address" hint={emailMismatch ? undefined : 'This must match your email address exactly.'}>
                      <input type="email" value={form.confirmEmail} onChange={set('confirmEmail')} placeholder="Re-enter your email address" autoComplete="email" required className={`${inputCls} ${emailMismatch ? 'border-red-400 focus:border-red-400 focus:ring-red-500/15' : ''}`} />
                      {emailMismatch && <small className="mt-1.5 block text-xs font-bold text-red-600">Email addresses do not match.</small>}
                    </Field>
                    <Field label="Reference Number" hint="Enter the exact reference number from your payment receipt. This is the main matching detail." className="md:col-span-2">
                      <input value={form.reference} onChange={set('reference')} placeholder="Enter reference number" required className={inputCls} />
                    </Field>

                    <div className="md:col-span-2">
                      <span className="mb-2 block text-sm font-bold text-ink">Payment Proof / Screenshot<span className="text-red-500"> *</span></span>
                      <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-tint-3 bg-tint/50 px-4 py-8 text-center transition hover:border-brand-bright hover:bg-tint">
                        <Upload className="size-7 text-brand-bright" />
                        <span className="text-sm font-extrabold text-brand">{file ? 'Change file' : 'Click to upload your proof'}</span>
                        <span className="text-xs text-muted">Accepted formats: JPG, PNG, WEBP, PDF. Max 5MB.</span>
                        <input type="file" accept="image/jpeg,image/png,image/webp,application/pdf" onChange={onFile} className="sr-only" />
                      </label>
                      {fileError && <p className="mt-2 text-xs font-bold text-red-600">{fileError}</p>}
                      <div className="mt-3 flex items-center gap-3 rounded-2xl bg-tint px-4 py-3 text-sm text-body">
                        {file ? (
                          <>
                            {previewUrl ? <img src={previewUrl} alt="Proof preview" className="size-14 rounded-xl object-cover" /> : <FileText className="size-8 text-brand" />}
                            <span className="min-w-0 flex-1 truncate font-semibold text-ink">{file.name}</span>
                            <span className="text-xs text-muted">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                            <button type="button" onClick={() => setFile(null)} aria-label="Remove file" className="grid size-8 place-items-center rounded-full hover:bg-tint-2"><X className="size-4" /></button>
                          </>
                        ) : 'No proof selected yet.'}
                      </div>
                    </div>

                    {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 md:col-span-2">{error}</p>}

                    <div className="md:col-span-2">
                      <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-bright py-4 text-sm font-extrabold text-white shadow-lg shadow-brand-bright/25 transition hover:bg-brand">
                        <Send className="size-4" /> Submit Payment
                      </button>
                      <p className="mt-3 text-center text-xs leading-5 text-muted"><span className="text-red-500">*</span> All fields are required. Before submitting, confirm that you selected the correct payment option and paid the exact amount shown. Sender/payer name is not used for matching.</p>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* ===== HOW TO PAY ===== */}
            {tab === 'how' && (
              <div className={card}>
                <h1 className="text-3xl font-extrabold">How to Pay</h1>
                <ol className="mt-6 space-y-4">
                  {HOW_TO_PAY.map(([t, d], i) => (
                    <li key={t} className="flex gap-4 rounded-2xl bg-tint p-4">
                      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-bright font-extrabold text-white">{i + 1}</span>
                      <p className="text-sm leading-6 text-body"><strong className="text-ink">{t}</strong> {d}</p>
                    </li>
                  ))}
                </ol>
                <button onClick={() => setTab('payment')} className="mt-6 rounded-full bg-brand-bright px-6 py-3 text-sm font-extrabold text-white transition hover:bg-brand">Go to Payment</button>
              </div>
            )}

            {/* ===== FAQ ===== */}
            {tab === 'faq' && (
              <div className={card}>
                <h1 className="text-3xl font-extrabold">FAQs</h1>
                <div className="mt-6 space-y-4">
                  {FAQS.map(([q, a], i) => (
                    <details key={q} open={i === 0} className="group border-b border-line pb-4">
                      <summary className="flex cursor-pointer list-none items-center justify-between py-2 text-sm font-bold [&::-webkit-details-marker]:hidden">
                        {q} <span className="text-xl leading-none text-brand-bright transition group-open:rotate-45">+</span>
                      </summary>
                      <p className="mt-2 text-sm leading-6 text-body">{a}</p>
                    </details>
                  ))}
                </div>
              </div>
            )}

            {/* ===== CONTACT ===== */}
            {tab === 'contact' && (
              <div className={card}>
                <h1 className="text-3xl font-extrabold">Contact Us</h1>
                <p className="mt-3 text-sm leading-6 text-body">For payment concerns, contact the Sourcing VA Training Services support team and include your reference number, payment option, and proof of payment.</p>
                <div className="mt-6 flex items-center gap-4 rounded-2xl bg-tint p-5">
                  <span className="grid size-12 place-items-center rounded-xl bg-brand-bright text-white"><Mail className="size-6" /></span>
                  <div>
                    <p className="text-sm font-extrabold">Email Support</p>
                    {SUPPORT_EMAIL ? <a href={`mailto:${SUPPORT_EMAIL}`} className="text-sm font-semibold text-brand hover:underline">{SUPPORT_EMAIL}</a> : <p className="text-sm text-muted">Coming soon</p>}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===== FINAL REVIEW DIALOG ===== */}
      {reviewOpen && option && (
        <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-ink/50 p-4 backdrop-blur-sm" onClick={() => !submitting && setReviewOpen(false)}>
          <div className="w-full max-w-lg rounded-[2rem] bg-white p-6 md:p-8" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="review-title">
            <div className="flex gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-tint-3 text-brand"><ShieldCheck className="size-6" /></span>
              <div>
                <h3 id="review-title" className="text-xl font-extrabold">Final payment confirmation</h3>
                <p className="mt-1 text-sm leading-6 text-body">Please double-check your selected course, exact amount, reference number, and email before submitting.</p>
              </div>
            </div>
            <dl className="mt-6 divide-y divide-tint-2 rounded-2xl bg-tint px-5 text-sm">
              {[
                ['Payment option', option.name],
                ['Exact amount', formatPeso(option.amount)],
                ['Reference number', form.reference],
                ['Payment method', form.provider],
                ['Name', `${form.firstName.trim()} ${form.lastName.trim()}`],
                ['Email', norm(form.email)],
                ['Proof', file?.name],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 py-2.5">
                  <dt className="text-muted">{k}</dt>
                  <dd className="truncate text-right font-extrabold text-ink">{v}</dd>
                </div>
              ))}
            </dl>
            <label className="mt-5 flex cursor-pointer gap-3 text-xs leading-5 text-body">
              <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5 size-4 shrink-0 accent-brand-bright" />
              I confirm that I selected the correct course/payment option, paid the exact required amount, and understand that wrong course selection or wrong amount may be declined, delayed, or not eligible for refund.
            </label>
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
              <button onClick={() => setReviewOpen(false)} disabled={submitting} className="flex-1 rounded-full border-2 border-brand-bright py-3 text-sm font-extrabold text-brand transition hover:bg-tint disabled:opacity-60">Go Back</button>
              <button onClick={submit} disabled={!agreed || submitting} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-bright py-3 text-sm font-extrabold text-white transition hover:bg-brand disabled:cursor-not-allowed disabled:opacity-50">
                {submitting ? <><Loader2 className="size-4 animate-spin" /> Submitting...</> : 'Confirm and Submit'}
              </button>
            </div>
          </div>
        </div>
      )}
    </Page>
  )
}
