import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Sparkles, CheckCircle2, ArrowRight, PlayCircle, Award, TrendingUp, ShieldCheck,
  Search, Handshake, Calculator, LineChart, Video, Puzzle, ListChecks, FolderOpen, RefreshCw, Quote,
  Compass, Sprout, Rocket, LifeBuoy, CalendarClock, Newspaper,
} from 'lucide-react'
import { Page, btn } from '../components/Layout.jsx'

// Placeholder content — swap testimonials, ratings, press mentions, and support contact for real details before launch.

const avatars = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
]

const topics = ['Niche Discovery', 'Supplier Sourcing', 'Profit Analysis', 'Competitor Research', 'Chrome Toolkit', 'Live Coaching']

const pathwayCards = [
  { title: 'Live Sourcing Labs', description: 'Watch real product research sessions from start to finish, then repeat the process yourself.', icon: Video, cta: 'Watch a lab' },
  { title: 'Templates & Trackers', description: 'Downloadable trackers for suppliers, inventory, and reorders — ready on day one.', icon: FolderOpen, cta: 'See the vault' },
  { title: 'Curriculum Overview', description: 'Every module mapped step by step, from your first search to a sourced order.', icon: Compass, cta: 'View curriculum' },
]

const dualPaths = [
  { title: 'New to product research', description: 'Start from zero with structured lessons, templates, and lifetime curriculum updates.', icon: Sprout, cta: 'Start learning', to: '#curriculum' },
  { title: 'Want live coaching', description: 'Get weekly Q&A sessions, homework reviews, and direct mentor support along the way.', icon: Rocket, cta: 'See what’s included', to: '/checkout' },
]

const curriculumFeatures = [
  { title: 'Niche & Product Discovery', description: 'Learn the exact filters and criteria used to uncover profitable, low-competition product opportunities.', icon: Search },
  { title: 'Supplier Sourcing Playbook', description: 'Step-by-step scripts and vetting checklists for reaching out to suppliers and negotiating terms.', icon: Handshake },
  { title: 'Profit & Fee Calculators', description: 'Ready-made spreadsheets that account for Amazon fees, shipping, and landed cost automatically.', icon: Calculator },
  { title: 'Competitor Teardowns', description: 'Reverse-engineer top-selling listings to understand pricing, positioning, and demand signals.', icon: LineChart },
  { title: 'Live Sourcing Labs', description: 'Watch real product research sessions from start to finish, then repeat the process yourself.', icon: Video },
  { title: 'Chrome Research Toolkit', description: 'A guided setup for the browser extensions and tools used throughout every module.', icon: Puzzle },
  { title: 'Red-Flag & Risk Screening', description: 'Spot gated categories, IP complaints, and other risks before you ever place an order.', icon: ShieldCheck },
  { title: 'Deal Validation Checklist', description: 'A repeatable checklist to confirm a product is worth sourcing before you commit budget.', icon: ListChecks },
  { title: 'Templates & Trackers Vault', description: 'Downloadable trackers for inventory, reorders, and supplier communication.', icon: FolderOpen },
  { title: 'Lifetime Curriculum Updates', description: 'New lessons and refreshed data are added as sourcing strategies evolve.', icon: RefreshCw },
]

const modules = [
  {
    title: 'Niche & Product Discovery',
    description: 'Start every research session with a system instead of a guess.',
    bullets: [
      'Use a scoring framework to filter thousands of listings down to real opportunities',
      'Build saved search presets so you can repeat your best research sessions in minutes',
      'Learn which sales-rank and review patterns actually predict long-term demand',
    ],
    visual: 'scorecard',
  },
  {
    title: 'Supplier & Sourcing Research',
    description: 'Go from a promising product to a signed supplier with confidence.',
    bullets: [
      'Copy-and-send outreach scripts for contacting suppliers and distributors',
      'A vetting checklist to confirm legitimacy before you send any payment',
      'Templates for negotiating MOQs, payment terms, and sample requests',
    ],
    visual: 'tracker',
  },
  {
    title: 'Profit, Fees & Competition Analysis',
    description: 'Know your real margin before you ever place a purchase order.',
    bullets: [
      'Calculate true landed cost including marketplace fees, storage, and shipping',
      'Break down competitor listings to estimate monthly sales and margin',
      'Set a go / no-go profit threshold so you never source on a hunch',
    ],
    visual: 'chart',
  },
  {
    title: 'Live Sourcing Labs & Chrome Toolkit',
    description: 'Watch the full workflow in action, then run it yourself.',
    bullets: [
      'Follow along as real products are researched live, mistakes included',
      'Set up the exact Chrome extensions used throughout the course',
      'Practice the full workflow on your own product before moving on',
    ],
    visual: 'lab',
  },
]

const testimonials = [
  { name: 'Student A', role: '[Self-Paced Student]', quote: '[Add a real quote from this student about their experience with the masterclass.]', result: '[Add result, e.g. $X,XXX sourced]' },
  { name: 'Student B', role: '[Guided Mastery Graduate]', quote: '[Add a real quote from this student about their experience with the masterclass.]', result: '[Add result, e.g. first product sourced in X weeks]' },
  { name: 'Student C', role: '[Career Switcher]', quote: '[Add a real quote from this student about their experience with the masterclass.]', result: '[Add result]' },
  { name: 'Student D', role: '[Self-Paced Student]', quote: '[Add a real quote from this student about their experience with the masterclass.]', result: '[Add result]' },
  { name: 'Student E', role: '[Guided Mastery Graduate]', quote: '[Add a real quote from this student about their experience with the masterclass.]', result: '[Add result]' },
  { name: 'Student F', role: '[VIP Mentorship Graduate]', quote: '[Add a real quote from this student about their experience with the masterclass.]', result: '[Add result]' },
]

const tiers = [
  {
    name: 'Self-Paced',
    tagline: 'Learn on your own schedule',
    price: { onetime: '[₱X,XXX]', plan: '[₱X,XXX]/mo × 3' },
    features: ['All 4 core modules', 'Templates & trackers vault', 'Lifetime curriculum updates', 'Private community access'],
    featured: false,
  },
  {
    name: 'Guided Mastery',
    tagline: 'Most students choose this',
    price: { onetime: '[₱XX,XXX]', plan: '[₱X,XXX]/mo × 4' },
    features: ['Everything in Self-Paced', 'Weekly live Q&A sessions', 'Homework & submission reviews', 'Priority community support'],
    featured: true,
  },
  {
    name: 'VIP Mentorship',
    tagline: 'For hands-on 1:1 support',
    price: { onetime: '[₱XX,XXX]', plan: '[₱X,XXX]/mo × 6' },
    features: ['Everything in Guided Mastery', '[X] private 1:1 coaching calls', 'Personal sourcing plan review', 'Direct mentor messaging'],
    featured: false,
  },
]

const commonFeatures = ['Certificate of completion', 'Templates & trackers vault', 'Private community access']

const supportColumns = [
  { title: 'Enrollment Help', icon: CalendarClock, description: 'Questions before you enroll? Reach out and we’ll help you pick the right track.', cta: '[Add contact email or booking link]' },
  { title: 'Student Support', icon: LifeBuoy, description: 'Already enrolled? Our support team is here for module questions and account help.', cta: '[Add help center link]' },
]

const footerColumns = [
  { title: 'Curriculum', links: curriculumFeatures.slice(0, 4).map((f) => f.title) },
  { title: 'Company', links: ['[About]', '[Blog]', '[Careers]'] },
  { title: 'Support', links: ['[Help Center]', '[Contact Support]', '[FAQ]'] },
]

function ModuleVisual({ kind }) {
  if (kind === 'scorecard') {
    return (
      <div className="rounded-[2rem] bg-white p-6 shadow-[0_20px_50px_rgba(133,77,14,0.12)]">
        <div className="flex items-center gap-3">
          <div className="size-14 shrink-0 rounded-2xl bg-tint-3" />
          <div className="min-w-0">
            <p className="truncate text-sm font-extrabold text-ink">Ceramic Coffee Mug Set</p>
            <p className="text-xs text-muted">Home &amp; Kitchen · [Sample listing]</p>
          </div>
          <span className="ml-auto grid size-12 shrink-0 place-items-center rounded-full bg-brand-bright text-sm font-extrabold text-white">8.7</span>
        </div>
        <div className="mt-5 space-y-3">
          {[['Demand', 88], ['Competition', 64], ['Margin', 76]].map(([label, pct]) => (
            <div key={label}>
              <div className="mb-1 flex items-center justify-between text-xs font-semibold text-body"><span>{label}</span><span>{pct}%</span></div>
              <div className="h-2 rounded-full bg-tint"><div className="h-full rounded-full bg-brand-bright" style={{ width: `${pct}%` }} /></div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  if (kind === 'tracker') {
    return (
      <div className="rounded-[2rem] bg-white p-6 shadow-[0_20px_50px_rgba(133,77,14,0.12)]">
        <p className="text-xs font-extrabold uppercase tracking-wider text-brand">Supplier Tracker</p>
        <div className="mt-4 space-y-2">
          {[['[Supplier A]', 'Sample requested'], ['[Supplier B]', 'Awaiting reply'], ['[Supplier C]', 'Terms agreed']].map(([name, status]) => (
            <div key={name} className="flex items-center justify-between rounded-xl bg-tint px-4 py-3">
              <span className="text-sm font-bold text-ink">{name}</span>
              <span className="rounded-full bg-white px-3 py-1 text-[11px] font-extrabold text-brand">{status}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }
  if (kind === 'chart') {
    return (
      <div className="rounded-[2rem] bg-white p-6 shadow-[0_20px_50px_rgba(133,77,14,0.12)]">
        <p className="text-xs font-extrabold uppercase tracking-wider text-brand">Profit Breakdown</p>
        <div className="mt-6 flex items-end gap-4">
          {[['Revenue', 90], ['Fees', 40], ['Profit', 55]].map(([label, h]) => (
            <div key={label} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex h-32 w-full items-end rounded-xl bg-tint">
                <div className="w-full rounded-xl bg-brand-bright" style={{ height: `${h}%` }} />
              </div>
              <p className="text-xs font-semibold text-body">{label}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-sm font-extrabold text-brand">[X]% estimated margin</p>
      </div>
    )
  }
  return (
    <div className="rounded-[2rem] bg-white p-6 shadow-[0_20px_50px_rgba(133,77,14,0.12)]">
      <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-brand-bright to-brand-deep">
        <span className="grid size-16 place-items-center rounded-full bg-white/90 text-brand shadow-lg"><PlayCircle className="size-9" /></span>
        <span className="absolute bottom-3 right-3 rounded-full bg-black/40 px-2.5 py-1 text-[11px] font-bold text-white">[32:14]</span>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm font-extrabold text-ink">Live Lab · Module 4</p>
        <span className="rounded-full bg-tint px-3 py-1 text-[11px] font-extrabold text-brand">Beginner friendly</span>
      </div>
    </div>
  )
}

function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="absolute inset-0 -z-10 translate-x-6 translate-y-6 rounded-[2.5rem] bg-tint-3/60" />
      <div className="rounded-[2.5rem] bg-white p-6 shadow-[0_30px_70px_rgba(133,77,14,0.15)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={avatars[0]} alt="" className="size-11 rounded-full object-cover" />
            <div>
              <p className="text-sm font-extrabold">Live Sourcing Lab</p>
              <p className="text-xs text-muted">Module 3 · Profit Analysis</p>
            </div>
          </div>
          <span className="rounded-full bg-tint px-3 py-1 text-[11px] font-extrabold text-brand">New</span>
        </div>

        <div className="mt-6 rounded-3xl bg-gradient-to-br from-brand-bright to-brand p-5 text-white">
          <div className="flex items-center gap-2 text-xs font-bold text-white/80"><PlayCircle className="size-4" /> Reviewing this product</div>
          <p className="mt-2 text-lg font-extrabold">Ceramic Coffee Mug Set</p>
          <div className="mt-4 h-2.5 rounded-full bg-white/25">
            <div className="h-full w-[87%] rounded-full bg-accent" />
          </div>
          <p className="mt-2 text-xs font-semibold text-white/80">Profit score 8.7 / 10 · Pass</p>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          {[['4', 'Modules'], ['[X]', 'Templates'], ['[X]', 'Live labs']].map(([v, l]) => (
            <div key={l} className="rounded-2xl bg-tint p-3 text-center">
              <p className="text-xl font-extrabold text-brand">{v}</p>
              <p className="text-[11px] font-semibold text-body">{l}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute -left-4 top-1/2 hidden items-center gap-3 rounded-2xl bg-white p-3 pr-5 shadow-xl sm:flex md:-left-12">
        <span className="grid size-10 place-items-center rounded-xl bg-accent text-accent-ink"><Award className="size-5" /></span>
        <div>
          <p className="text-[11px] font-semibold text-muted">Module complete</p>
          <p className="text-sm font-extrabold">Sourcing Certified!</p>
        </div>
      </div>
      <div className="absolute -right-3 -top-5 flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 shadow-xl">
        <TrendingUp className="size-5 text-brand-bright" />
        <span className="text-xs font-extrabold">[X]% avg. margin</span>
      </div>
    </div>
  )
}

function SiteFooter() {
  return (
    <footer className="rounded-t-[2rem] bg-white px-6 pb-10 pt-14 md:px-8">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="text-base font-extrabold text-ink">Sourcing VA Training Services</p>
            <p className="mt-3 max-w-xs text-sm leading-6 text-body">A step-by-step masterclass that trains you to become an Amazon Product Researcher — no experience required.</p>
          </div>
          {footerColumns.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-extrabold uppercase tracking-wider text-muted">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}><a href="#curriculum" className="text-sm font-semibold text-body transition hover:text-brand">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 text-xs text-muted md:flex-row">
          <p>© 2026 Sourcing VA Training Services. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-5">
            <a href="#terms" className="font-semibold transition hover:text-brand">Terms of Use</a>
            <a href="#privacy" className="font-semibold transition hover:text-brand">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function Landing() {
  const [billing, setBilling] = useState('onetime')

  return (
    <Page footer={<SiteFooter />}>
      {/* HERO */}
      <section className="relative">
        <div className="absolute -left-24 top-16 size-72 rounded-full bg-brand/5 blur-3xl" />
        <div className="absolute -right-20 bottom-0 size-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-[1440px] items-center gap-14 px-6 py-16 md:px-8 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-tint-2 px-4 py-2 text-xs font-extrabold text-brand">
              <Sparkles className="size-4 text-accent" /> Want to become an Amazon Product Researcher but don't know where to start?
            </span>
            <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
              Become an Amazon{' '}
              <span className="bg-gradient-to-r from-brand-bright to-brand bg-clip-text text-transparent">Product Researcher</span>
              {' '}today
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-body">
              No experience needed. This step-by-step masterclass trains you in real Amazon product research — finding profitable products, vetting suppliers, and validating margin — so you can start landing paid research work with confidence.
            </p>
            <p className="mt-2 text-sm font-bold text-brand">[4.9]/5 average rating · [120]+ students trained</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {topics.map((t) => (
                <a key={t} href="#curriculum" className="rounded-full border border-tint-2 bg-white px-3.5 py-1.5 text-xs font-bold text-body transition hover:border-brand-bright hover:text-brand">
                  {t}
                </a>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/checkout" className={btn.primary}>ENROLL NOW <ArrowRight className="size-4" /></Link>
              <a href="#curriculum" className={btn.outline}>SEE FULL CURRICULUM</a>
            </div>
            <div className="mt-10">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {avatars.map((a) => <img key={a} src={a} alt="" className="size-10 rounded-full border-2 border-white object-cover" />)}
                </div>
                <p className="text-sm font-semibold text-body">Trusted by aspiring Amazon Product Researchers</p>
              </div>
            </div>
          </div>
          <HeroVisual />
        </div>
      </section>

      {/* QUICK PATHWAY CARDS */}
      <section className="px-6 pb-4 md:px-8">
        <div className="mx-auto grid max-w-[1180px] gap-5 md:grid-cols-3">
          {pathwayCards.map(({ title, description, icon: Icon, cta }) => (
            <a key={title} href="#curriculum" className="group flex flex-col rounded-[1.75rem] border border-tint-2 bg-white p-6 transition hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(32,28,16,0.08)]">
              <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-bright to-brand text-white"><Icon className="size-6" /></span>
              <h3 className="mt-5 text-lg font-extrabold text-ink">{title}</h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-body">{description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-extrabold text-brand">
                {cta} <ArrowRight className="size-4 transition group-hover:translate-x-1" />
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* WORKFLOW STRIP */}
      <section className="border-y border-tint-2 bg-white px-6 py-14 md:px-8">
        <div className="mx-auto max-w-[1180px] text-center">
          <h2 className="text-2xl font-extrabold text-ink md:text-3xl">Built around the workflow Amazon sellers hire researchers to run</h2>
          <p className="mx-auto mt-3 max-w-2xl text-body">Every module maps directly to the exact tasks a client will expect from their Amazon Product Researcher.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {curriculumFeatures.slice(0, 6).map(({ title, icon: Icon }) => (
              <span key={title} className="inline-flex items-center gap-2 rounded-full bg-tint px-4 py-2 text-sm font-bold text-brand">
                <Icon className="size-4" /> {title}
              </span>
            ))}
          </div>
          <a href="#curriculum" className="mt-6 inline-flex items-center gap-1 text-sm font-extrabold text-brand hover:underline">
            See the full curriculum <ArrowRight className="size-4" />
          </a>
        </div>
      </section>

      {/* FEATURED PROMO */}
      <section className="bg-tint px-6 py-20 md:px-8">
        <div className="mx-auto grid max-w-[1180px] items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-extrabold text-brand">Featured</span>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-ink md:text-4xl">Get sourcing-ready in 4 hands-on modules</h2>
            <ul className="mt-6 space-y-3">
              {[
                'Live sourcing labs with real products, not theory',
                'Downloadable templates for every step of the workflow',
                'A repeatable system you can run again and again for clients',
              ].map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm font-semibold text-body">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-bright" /> {b}
                </li>
              ))}
            </ul>
            <a href="#curriculum" className={`${btn.primary} mt-8`}>SEE FULL CURRICULUM <ArrowRight className="size-4" /></a>
          </div>
          <ModuleVisual kind="scorecard" />
        </div>
      </section>

      {/* DUAL PATH SPLIT */}
      <section className="px-6 py-20 md:px-8">
        <div className="mx-auto max-w-[1180px] text-center">
          <h2 className="text-3xl font-extrabold text-ink md:text-4xl">Wherever you're starting from, there's a path for you</h2>
          <p className="mx-auto mt-3 max-w-2xl text-body">Learn at your own pace, or get hands-on coaching — you decide how much support you want.</p>
          <div className="mt-10 grid gap-6 text-left md:grid-cols-2">
            {dualPaths.map(({ title, description, icon: Icon, cta, to }) => (
              <div key={title} className="rounded-[2rem] border border-tint-2 bg-white p-8">
                <span className="grid size-12 place-items-center rounded-2xl bg-tint-3 text-brand"><Icon className="size-6" /></span>
                <h3 className="mt-5 text-xl font-extrabold text-ink">{title}</h3>
                <p className="mt-2 leading-6 text-body">{description}</p>
                {to.startsWith('/') ? (
                  <Link to={to} className="mt-5 inline-flex items-center gap-1 text-sm font-extrabold text-brand hover:underline">{cta} <ArrowRight className="size-4" /></Link>
                ) : (
                  <a href={to} className="mt-5 inline-flex items-center gap-1 text-sm font-extrabold text-brand hover:underline">{cta} <ArrowRight className="size-4" /></a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-tint px-6 py-20 md:px-8">
        <div className="mx-auto max-w-[1180px]">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-ink md:text-4xl">What our students say</h2>
            <p className="mt-3 text-body">[Placeholder testimonials — replace with real student quotes and results.]</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-[1.75rem] border border-tint-2 bg-white p-6">
                <Quote className="size-6 text-brand-bright" />
                <p className="mt-3 text-sm leading-6 text-body">{t.quote}</p>
                <div className="mt-5 flex items-center gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-tint-3 text-sm font-extrabold text-brand">
                    {t.name.split(' ').map((w) => w[0]).join('')}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-extrabold text-ink">{t.name}</p>
                    <p className="truncate text-xs text-muted">{t.role}</p>
                  </div>
                </div>
                <p className="mt-4 rounded-xl bg-white px-3 py-2 text-xs font-bold text-brand">{t.result}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRESS / TRUST STRIP */}
      <section className="px-6 py-14 md:px-8">
        <div className="mx-auto max-w-[1180px] text-center">
          <p className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-muted">
            <Newspaper className="size-4" /> [Add "As featured in" press mentions or partner logos]
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="grid h-12 w-40 place-items-center rounded-xl border border-dashed border-tint-3 text-xs font-bold text-muted">[Logo]</div>
            ))}
          </div>
        </div>
      </section>

      {/* CURRICULUM / FEATURES GRID */}
      <section id="curriculum" className="scroll-mt-24 bg-tint px-6 py-20 md:px-8">
        <div className="mx-auto max-w-[1180px] text-center">
          <h2 className="text-3xl font-extrabold text-ink md:text-4xl">Everything you need to work as an Amazon Product Researcher</h2>
          <p className="mx-auto mt-3 max-w-2xl text-body">From your first product search to a client-ready report — this masterclass covers everything a hiring Amazon seller expects you to know.</p>
        </div>
        <div className="mx-auto mt-12 grid max-w-[1180px] gap-5 md:grid-cols-2 xl:grid-cols-3">
          {curriculumFeatures.map(({ title, description, icon: Icon }) => (
            <div key={title} className="rounded-[1.75rem] bg-white p-6 shadow-[0_12px_35px_rgba(32,28,16,0.06)] transition hover:-translate-y-1">
              <span className="grid size-11 place-items-center rounded-2xl bg-tint-3 text-brand"><Icon className="size-5" /></span>
              <h3 className="mt-4 text-base font-extrabold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-body">{description}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/checkout" className={btn.primary}>START LEARNING TODAY <ArrowRight className="size-4" /></Link>
        </div>
      </section>

      {/* MODULE DEEP-DIVES */}
      <section className="mx-auto max-w-[1180px] px-6 py-20 md:px-8">
        <div className="space-y-20">
          {modules.map((m, i) => (
            <div key={m.title} className="grid items-center gap-10 lg:grid-cols-2">
              <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                <span className="inline-flex items-center gap-2 rounded-full bg-tint-2 px-3 py-1 text-xs font-extrabold text-brand">Module {i + 1}</span>
                <h3 className="mt-4 text-2xl font-extrabold text-ink md:text-3xl">{m.title}</h3>
                <p className="mt-3 text-body">{m.description}</p>
                <ul className="mt-6 space-y-3">
                  {m.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm font-semibold text-body">
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-bright" /> {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                <ModuleVisual kind={m.visual} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="bg-tint px-6 py-20 md:px-8">
        <div className="mx-auto max-w-[1180px] text-center">
          <h2 className="text-3xl font-extrabold text-ink md:text-4xl">One masterclass, three ways to learn it</h2>
          <p className="mx-auto mt-3 max-w-2xl text-body">[Add trial, guarantee, or enrollment-deadline messaging here.]</p>

          <div className="mt-8 inline-flex rounded-full bg-white p-1 shadow-sm">
            {[['onetime', 'One-Time'], ['plan', 'Payment Plan']].map(([id, label]) => (
              <button
                key={id}
                onClick={() => setBilling(id)}
                className={`rounded-full px-5 py-2 text-sm font-extrabold transition ${billing === id ? 'bg-brand-bright text-white' : 'text-body'}`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-6 text-left md:grid-cols-3">
            {tiers.map((tier) => (
              <div key={tier.name} className={`relative flex flex-col rounded-[2rem] p-8 ${tier.featured ? 'bg-gradient-to-br from-brand-bright to-brand-deep text-white shadow-2xl shadow-brand-deep/30' : 'border border-tint-2 bg-white'}`}>
                {tier.featured && <span className="absolute -top-3 right-8 rounded-full bg-accent px-4 py-1.5 text-[11px] font-extrabold uppercase text-accent-ink shadow">Most Popular</span>}
                <h3 className="text-xl font-extrabold">{tier.name}</h3>
                <p className={`mt-1 text-sm ${tier.featured ? 'text-white/80' : 'text-muted'}`}>{tier.tagline}</p>
                <p className="mt-6"><span className="text-4xl font-extrabold">{tier.price[billing]}</span></p>
                <ul className="mt-6 flex-1 space-y-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm font-semibold">
                      <CheckCircle2 className={`mt-0.5 size-5 shrink-0 ${tier.featured ? 'text-accent' : 'text-brand-bright'}`} /> {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/checkout"
                  className={`mt-8 w-full ${tier.featured ? 'inline-flex justify-center rounded-full bg-white px-7 py-3.5 text-sm font-extrabold text-brand transition hover:bg-accent hover:text-accent-ink' : btn.primary}`}
                >
                  Enroll Now
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm font-bold text-body">
            {commonFeatures.map((f) => (
              <span key={f} className="inline-flex items-center gap-2"><CheckCircle2 className="size-5 text-brand-bright" /> {f}</span>
            ))}
          </div>
        </div>
      </section>

      {/* SUPPORT */}
      <section className="px-6 py-20 md:px-8">
        <div className="mx-auto max-w-[1180px]">
          <h2 className="text-center text-3xl font-extrabold text-ink md:text-4xl">Get the help you need, every step of the way</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {supportColumns.map(({ title, icon: Icon, description, cta }) => (
              <div key={title} className="flex gap-4 rounded-[1.75rem] border border-tint-2 bg-white p-6">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-tint-3 text-brand"><Icon className="size-5" /></span>
                <div>
                  <h3 className="font-extrabold text-ink">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-body">{description}</p>
                  <p className="mt-3 text-xs font-bold text-brand">{cta}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-brand-bright px-6 py-20 text-center text-white md:px-8">
        <div className="absolute -left-20 top-8 size-72 rounded-full bg-glow/30 blur-3xl" />
        <div className="absolute -right-16 bottom-0 size-80 rounded-full bg-accent/20 blur-3xl" />
        <div className="relative z-10 mx-auto max-w-2xl">
          <ShieldCheck className="mx-auto size-10 text-accent" />
          <h2 className="mt-4 text-3xl font-extrabold md:text-4xl">Stop wondering where to start. Become an Amazon Product Researcher today.</h2>
          <p className="mt-4 text-white/85">[Add urgency, guarantee, or cohort-deadline messaging here.]</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/checkout" className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-extrabold text-brand shadow-lg transition hover:-translate-y-0.5">
              BECOME A PRODUCT RESEARCHER <ArrowRight className="size-4" />
            </Link>
            <a href="#curriculum" className="inline-flex items-center gap-2 rounded-full border-2 border-white px-8 py-3.5 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-white/10">
              SEE FULL CURRICULUM
            </a>
          </div>
        </div>
      </section>
    </Page>
  )
}
