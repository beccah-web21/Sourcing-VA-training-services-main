// Sends payment emails through Gmail (settings in .env):
//  1) To the admin: all form details + the receipt as an attachment
//  2) To the customer: "payment is pending" confirmation
import nodemailer from 'nodemailer'

const { SMTP_USER, SMTP_PASS, ADMIN_EMAIL, BRAND_NAME = 'Sourcing VA Training Services' } = process.env
// Name customers see as the sender. A person's name gets into Inbox more often than a brand name.
const SENDER_NAME = process.env.SENDER_NAME || `${BRAND_NAME} Team`

export const mailEnabled = Boolean(SMTP_USER && SMTP_PASS)

const transporter = mailEnabled
  ? nodemailer.createTransport({ service: 'gmail', auth: { user: SMTP_USER, pass: SMTP_PASS.replace(/\s/g, '') } })
  : null

const esc = (v) =>
  String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

const peso = (n) => `₱${Number(n).toLocaleString('en-PH', { minimumFractionDigits: 2 })}`

const methodLabel = (id) => ({ GCASH: 'GCash', QRPH: 'QRPH' })[id] || id

const textTable = (rows) => rows.map(([k, v]) => `${k}: ${v}`).join('\n')

function layout(title, bodyHtml) {
  return `<!doctype html><html><body style="margin:0;background:#fff4ed;font-family:Arial,Helvetica,sans-serif;color:#1f130b">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:24px 12px"><tr><td align="center">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:20px;overflow:hidden">
      <tr><td style="background-color:#f97316;padding:24px 28px;color:#ffffff">
        <div style="font-size:20px;font-weight:800">${esc(BRAND_NAME)}</div>
        <div style="font-size:13px;opacity:.85;margin-top:4px">${esc(title)}</div>
      </td></tr>
      <tr><td style="padding:28px">${bodyHtml}</td></tr>
    </table>
    <div style="font-size:11px;color:#7d736d;margin-top:16px">© ${new Date().getFullYear()} ${esc(BRAND_NAME)}</div>
  </td></tr></table></body></html>`
}

function detailsTable(rows) {
  return `<table width="100%" cellpadding="0" cellspacing="0" style="background:#fff4ed;border-radius:14px;font-size:14px">
    ${rows
      .map(
        ([k, v]) => `<tr>
          <td style="padding:10px 16px;color:#7d736d;border-bottom:1px solid #ffe4d1;width:42%">${esc(k)}</td>
          <td style="padding:10px 16px;font-weight:700;border-bottom:1px solid #ffe4d1">${esc(v)}</td></tr>`,
      )
      .join('')}
  </table>`
}

export async function sendPaymentEmails(record, proof) {
  if (!mailEnabled) {
    console.warn('⚠  Emails not sent: add SMTP_USER and SMTP_PASS to .env')
    return
  }
  const submitted = new Date(record.submittedAt).toLocaleString('en-PH', { timeZone: 'Asia/Manila' })
  const rows = [
    ['Payment option', record.paymentOption],
    ['Amount', peso(record.amount)],
    ['Payment method', methodLabel(record.provider)],
    ['Reference number', record.reference],
    ['First name', record.firstName],
    ['Last name', record.lastName],
    ['Phone', record.phone],
    ['Email', record.email],
    ['Submitted', `${submitted} (PH time)`],
    ['Submission ID', record.id],
  ]

  // 1) Admin notification with receipt attached
  const adminMail = transporter.sendMail({
    // Shows the customer's name as the sender; Reply goes straight to the customer's email
    from: `"${record.name.replace(/["<>]/g, '')} (via ${BRAND_NAME})" <${SMTP_USER}>`,
    to: ADMIN_EMAIL || SMTP_USER,
    replyTo: record.email,
    subject: `New payment: ${record.name} · ${peso(record.amount)} · Ref ${record.reference}`,
    html: layout(
      'New payment submission',
      `<p style="margin:0 0 16px;font-size:15px">A customer submitted a payment for verification. Check the reference number and amount in your ${esc(methodLabel(record.provider))} account.</p>
       ${detailsTable(rows)}
       <p style="margin:16px 0 0;font-size:13px;color:#7d736d">📎 The receipt is attached to this email. Reply to this email to contact the customer directly.</p>`,
    ),
    text: `A customer submitted a payment for verification.

${textTable(rows)}

The receipt is attached. Reply to this email to contact the customer.`,
    attachments: [{ filename: `receipt-${record.reference}${proof.ext}`, content: proof.buffer, contentType: proof.mimetype }],
  })

  // 2) Customer auto-reply: payment pending.
  // Written like a short personal note (no tables, badges, or "payment verification" subject)
  // because receipt-style emails from a Gmail address look like phishing to spam filters.
  const firstName = record.firstName || record.name.trim().split(/\s+/)[0]
  const customerText = [
    `Hi ${firstName},`,
    '',
    `Thank you for enrolling in ${record.paymentOption}! We got your details and we're now checking your payment. This usually takes up to 24 hours.`,
    '',
    `Once it's confirmed, we'll send your course access to this email address.`,
    '',
    `For your reference, your ${methodLabel(record.provider)} reference number is ${record.reference}.`,
    '',
    `If you have any questions, just reply to this email.`,
    '',
    `Talk soon,`,
    `${SENDER_NAME}`,
  ]
  const customerMail = transporter.sendMail({
    from: `"${SENDER_NAME}" <${SMTP_USER}>`,
    to: record.email,
    replyTo: ADMIN_EMAIL || SMTP_USER,
    subject: `Thanks for enrolling, ${firstName}!`,
    text: customerText.join('\n'),
    html: `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#222">${customerText
      .map((line) => (line ? `<div>${esc(line)}</div>` : '<br>'))
      .join('')}</div>`,
  })

  const [admin, customer] = await Promise.allSettled([adminMail, customerMail])
  if (admin.status === 'rejected') console.error('Admin email failed:', admin.reason?.message)
  if (customer.status === 'rejected') console.error('Customer email failed:', customer.reason?.message)
  if (admin.status === 'fulfilled' && customer.status === 'fulfilled') console.log(`📧 Emails sent (admin + ${record.email})`)
}
