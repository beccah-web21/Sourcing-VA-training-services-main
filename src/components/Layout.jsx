import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Bell, Menu, X } from 'lucide-react'

const navLinks = [
  { text: 'Home', link: '/' },
  { text: 'Join the Training', link: '/subscription' },
]

// Shared button styles — every button on the site is yellow
export const btn = {
  primary:
    'inline-flex items-center justify-center gap-2 rounded-full bg-brand-bright px-7 py-3.5 text-sm font-extrabold tracking-wide text-white shadow-lg shadow-brand-bright/25 transition hover:-translate-y-0.5 hover:bg-brand',
  outline:
    'inline-flex items-center justify-center gap-2 rounded-full border-2 border-brand-bright bg-white px-7 py-3.5 text-sm font-extrabold tracking-wide text-brand transition hover:-translate-y-0.5 hover:bg-tint',
  soft:
    'inline-flex items-center justify-center gap-2 rounded-full bg-tint-2 px-7 py-3.5 text-sm font-extrabold tracking-wide text-brand transition hover:-translate-y-0.5 hover:bg-tint-3',
}

// Bold yellow-and-white styles shared by the Landing and Pricing pages
export const cta = {
  yellow:
    'inline-flex items-center justify-center gap-2 rounded-full border-2 border-ink bg-accent px-7 py-3 text-sm font-extrabold text-ink shadow-[4px_4px_0_var(--color-ink)] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_var(--color-ink)]',
  white:
    'inline-flex items-center justify-center gap-2 rounded-full border-2 border-ink bg-white px-7 py-3 text-sm font-extrabold text-ink transition hover:bg-tint-2',
  whiteRaised:
    'inline-flex items-center justify-center gap-2 rounded-full border-2 border-ink bg-white px-7 py-3 text-sm font-extrabold text-ink shadow-[4px_4px_0_var(--color-ink)] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_var(--color-ink)]',
}
export const card = 'rounded-2xl border-2 border-ink bg-white shadow-[6px_6px_0_var(--color-ink)]'

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <span className="size-11 shrink-0 overflow-hidden rounded-full border-2 border-ink bg-white">
        <img src="/logo.jpg" alt="" className="size-full scale-[1.3] object-cover" />
      </span>
      <span className="text-base font-extrabold leading-tight tracking-tight text-ink sm:text-xl">Sourcing VA Training Services</span>
    </Link>
  )
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const { state } = useLocation()
  // Yellow underline slides in on hover and marks the link the visitor clicked.
  // Home is only underlined after a navbar click, not when someone first lands on the site.
  const linkClass = (link) => ({ isActive }) => {
    const underlined = isActive && (link !== '/' || state?.fromNav)
    return `relative w-fit text-sm font-bold transition after:absolute after:-bottom-1.5 after:left-0 after:h-[3px] after:rounded-full after:bg-accent after:transition-[width] after:duration-200 hover:text-ink hover:after:w-full focus-visible:after:w-full ${
      underlined ? 'text-ink after:w-full' : 'text-body after:w-0'
    }`
  }

  return (
    <header className="sticky top-0 z-50 border-b border-tint-2 bg-white/85 backdrop-blur">
      <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 md:px-8">
        <Logo />
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <NavLink key={l.link} to={l.link} state={{ fromNav: true }} end className={linkClass(l.link)}>
              {l.text}
            </NavLink>
          ))}
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <button aria-label="Notifications" className="grid size-10 place-items-center rounded-full text-body transition hover:bg-tint hover:text-brand">
            <Bell className="size-5" />
          </button>
        </div>
        <button className="grid size-10 place-items-center rounded-full text-ink hover:bg-tint md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>
      {open && (
        <div className="border-t border-tint-2 bg-white px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((l) => (
              <NavLink key={l.link} to={l.link} state={{ fromNav: true }} end className={linkClass(l.link)} onClick={() => setOpen(false)}>
                {l.text}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

export function Footer({ copyright = '© 2026 Sourcing VA Training Services. All rights reserved.', links, description }) {
  const items = links || [
    { text: 'Terms', link: '#terms' },
    { text: 'Privacy', link: '#privacy' },
    { text: 'Support', link: '#support' },
    { text: 'Help', link: '#help' },
  ]
  return (
    <footer className="rounded-t-[2rem] bg-white px-6 py-12 md:px-8">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-8 md:flex-row">
        <div className="text-center md:text-left">
          <p className="font-bold text-ink">Sourcing VA Training Services</p>
          {description && <p className="mt-2 max-w-sm text-xs text-body">{description}</p>}
          <p className="mt-2 text-xs text-body">{copyright}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-xs font-semibold text-body">
          {items.map((l) => (
            <a key={l.text} href={l.link} className="transition hover:text-brand">
              {l.text}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export function Page({ children, footer }) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-page font-sans text-ink">
      <Navbar />
      <main>{children}</main>
      {footer ?? <Footer />}
    </div>
  )
}
