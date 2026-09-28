import { useRef, useState } from 'react'
import { ImageUp, Loader2 } from 'lucide-react'
import { cta } from './Layout.jsx'

// An image the site owner can replace from the browser.
// Visitors see the uploaded image (or `fallback` until one is uploaded).
// Open the page with ?edit in the address to show the "Change image" button;
// uploading asks for the ADMIN_PASSWORD set in .env.
const PASSWORD_KEY = 'svaAdminPassword'

const readPassword = () => {
  try { return sessionStorage.getItem(PASSWORD_KEY) || '' } catch { return '' }
}
const savePassword = (pw) => {
  try { pw ? sessionStorage.setItem(PASSWORD_KEY, pw) : sessionStorage.removeItem(PASSWORD_KEY) } catch { /* storage unavailable */ }
}

export default function EditableImage({ slot, fallback, alt, className = '' }) {
  const [src, setSrc] = useState(`/api/site-images/${slot}`)
  const [useFallback, setUseFallback] = useState(false)
  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState('')
  const inputRef = useRef(null)
  const editMode = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('edit')

  const onPick = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    const pw = readPassword() || window.prompt('Enter the admin password to change this image:') || ''
    if (!pw) return

    setBusy(true)
    setStatus('')
    try {
      const data = new FormData()
      data.append('image', file)
      const res = await fetch(`/api/site-images/${slot}`, { method: 'POST', headers: { 'x-admin-password': pw }, body: data })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) {
        if (res.status === 401) savePassword('')
        throw new Error(json.error || 'Upload failed. Please try again.')
      }
      savePassword(pw)
      setUseFallback(false)
      setSrc(`/api/site-images/${slot}?v=${json.updatedAt}`)
      setStatus('Image updated ✓')
    } catch (err) {
      setStatus(err.message === 'Failed to fetch' ? 'Server is offline. Please try again later.' : err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <img src={useFallback ? fallback : src} onError={() => setUseFallback(true)} alt={alt} className={className} />
      {editMode && (
        <div className="absolute bottom-4 right-4 z-10 flex flex-col items-end gap-2">
          <button type="button" onClick={() => inputRef.current?.click()} disabled={busy} className={`${cta.yellow} disabled:opacity-60`}>
            {busy ? <><Loader2 className="size-4 animate-spin" /> Uploading...</> : <><ImageUp className="size-4" /> Change image</>}
          </button>
          {status && <span className="rounded-full border-2 border-ink bg-white px-3 py-1 text-xs font-bold text-ink">{status}</span>}
          <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={onPick} className="sr-only" />
        </div>
      )}
    </>
  )
}
