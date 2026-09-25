// Payment options customers can choose from. Shared by the website AND the server,
// so the amount can't be changed from the browser.
// qrImage: save your QR (GCash / Maya / QR Ph) in the /public folder, e.g. public/qr-amazon-va.png → '/qr-amazon-va.png'
export const PAYMENT_OPTIONS = [
  {
    id: 'amazon-va-training',
    name: 'Amazon VA Training',
    amount: 1299,
    originalAmount: 2362, // shown crossed out (45% off)
    notes: 'Sourcing VA training services with access to an exclusive Skool community, live training sessions, and training certificates.',
    qrImage: '/qr-amazon-va.jpg',
  },
]

// Choices in the "Select Payment Option" dropdown
export const PAYMENT_METHODS = [
  { id: 'GCASH', label: 'GCash' },
  { id: 'QRPH', label: 'QRPH (Scan QR)' },
]

export const formatPeso = (n) => `₱${Number(n).toLocaleString('en-PH', { minimumFractionDigits: 2 })}`
