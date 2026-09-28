import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, BookOpen, ShieldCheck, Wrench, Tag, Calculator, Briefcase,
  Check, Plus, Quote, Laptop, MonitorPlay, BriefcaseBusiness, GraduationCap,
  CalendarDays, CirclePlay, Users, User, ClipboardCheck, Crown,
} from 'lucide-react'
import { Page, cta, card } from '../components/Layout.jsx'
import EditableImage from '../components/EditableImage.jsx'

// Placeholder content — swap bracketed text (testimonials, prices, contact info) for real details before launch.

const learn = [
  { title: 'Get the Basics Down', description: 'Learn how Online Arbitrage works and understand the role of a product researcher.', icon: BookOpen },
  { title: 'Know Who You Can Trust', description: 'Learn how to identify safe and reliable suppliers and retailers for your product research.', icon: ShieldCheck },
  { title: 'Make Product Hunting Easier', description: 'Get hands-on with SellerAmp, Keepa, and other sourcing tools and extensions to find and research products faster.', icon: Wrench },
  { title: 'Sharpen Your Sourcing Skills', description: 'Learn different Sourcing Methods, understand Keepa charts, and find the Buy Box price with confidence.', icon: Tag },
  { title: 'Find Out If It’s a Good Deal', description: 'Learn to calculate profit, and ROI using SellerAmp, and see if a product hits your deal criteria.', icon: Calculator },
  { title: 'Take Your Skills to the Next Level', description: 'After the 3-day live training, put your skills into practice with a 1-week Amazon US internship, followed by career preparation to help you get ready for real opportunities.', icon: Briefcase },
]

const highlights = [
  { title: 'Live & Recorded Classes', icon: Laptop },
  { title: 'Lifetime Access', icon: MonitorPlay },
  { title: 'Internship Opportunities', icon: BriefcaseBusiness },
  { title: 'Verifiable Certificates', icon: GraduationCap },
]

const courseHighlights = [
  { title: 'Every Friday – Sunday', detail: '7:30 PM – 10:30 PM (PH Time)', icon: CalendarDays },
  { title: '3-Day Live Training', detail: '+ 1 Week Internship for Amazon US', icon: CirclePlay },
  { title: 'Lifetime Access', detail: 'to Skool Community', icon: Users },
  { title: '1-on-1 Lead Review', detail: 'during Internship', icon: User },
  { title: 'Hands-on Practical Assessment', detail: 'for Every Session', icon: ClipboardCheck },
  { title: '30-Day Access', detail: 'to SellerAmp Premium Login', icon: Crown },
]

const testimonials = [
  { initial: 'A', name: '[Student name]', role: '[Role / location]', quote: '[Real student feedback goes here.]' },
  { initial: 'B', name: '[Student name]', role: '[Role / location]', quote: '[Real student feedback goes here.]' },
  { initial: 'C', name: '[Student name]', role: '[Role / location]', quote: '[Real student feedback goes here.]' },
]

const tiers = [
  { name: 'Self-Paced', tagline: 'Learn on your own schedule', price: { onetime: '[₱X,XXX]', plan: '[₱X,XXX]/mo × 3' }, features: ['All 4 core modules', 'Templates & trackers vault', 'Lifetime curriculum updates', 'Private community access'] },
  { name: 'Guided Mastery', tagline: 'Most students choose this', price: { onetime: '[₱XX,XXX]', plan: '[₱X,XXX]/mo × 4' }, features: ['Everything in Self-Paced', 'Weekly live Q&A sessions', 'Homework & submission reviews', 'Priority community support'], featured: true },
  { name: 'VIP Mentorship', tagline: 'For hands-on 1:1 support', price: { onetime: '[₱XX,XXX]', plan: '[₱X,XXX]/mo × 6' }, features: ['Everything in Guided Mastery', '[X] private 1:1 coaching calls', 'Personal sourcing plan review', 'Direct mentor messaging'] },
]

const faqs = [
  { q: 'Do I need experience to join?', a: 'No. The masterclass starts from the basics and builds up step by step.' },
  { q: 'How long is the course?', a: '[e.g. 4 weeks, at your own pace.]' },
  { q: 'Is it live or recorded?', a: '[Describe your format.]' },
  { q: 'Do I get a certificate?', a: 'Students who complete all modules receive a certificate of completion.' },
  { q: 'How do I pay?', a: 'GCash, Maya, bank transfer, or card — choose your option at checkout.' },
]

// Fade-up on scroll; shows immediately when reduced motion is preferred
function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return setVisible(true)
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); io.disconnect() }
    }, { threshold: 0.12 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <Tag ref={ref} className={`transition duration-700 ease-out ${visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'} ${className}`} {...rest}>
      {children}
    </Tag>
  )
}

function Accordion({ items }) {
  const [open, setOpen] = useState(null)
  return (
    <div className="space-y-3.5">
      {items.map(({ title, body }, i) => {
        const isOpen = open === i
        return (
          <div key={title} className="overflow-hidden rounded-2xl border-2 border-ink bg-white">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left font-bold text-ink"
            >
              {title}
              <span className={`grid size-7 shrink-0 place-items-center rounded-full bg-accent transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
                <Plus className="size-4" strokeWidth={3} />
              </span>
            </button>
            <div className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
              <div className="overflow-hidden">
                <div className="px-5 pb-5 text-body">{body}</div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function Eyebrow({ children }) {
  return (
    <span className="mb-3.5 inline-block rounded-full bg-accent px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-ink">
      {children}
    </span>
  )
}

function SectionHead({ eyebrow, title, sub }) {
  return (
    <Reveal className="mx-auto mb-12 max-w-2xl text-center">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-3xl font-extrabold leading-tight text-ink md:text-4xl">{title}</h2>
      {sub && <p className="mt-3 text-body">{sub}</p>}
    </Reveal>
  )
}

function HeroIllustration() {
  const ink = 'var(--color-ink)'
  const sun = 'var(--color-accent)'
  const pale = 'var(--color-tint)'
  const soft = 'var(--color-tint-3)'
  const muted = 'var(--color-muted)'
  return (
    <svg className="absolute bottom-0 left-1/2 z-[2] w-[300px] -translate-x-1/2 sm:w-[440px]" viewBox="0 0 440 340" role="img" aria-label="Laptop showing product research charts">
      <rect x="60" y="30" width="320" height="210" rx="14" fill={ink} />
      <rect x="74" y="44" width="292" height="182" rx="6" fill="#fff" />
      <rect x="74" y="44" width="292" height="22" rx="6" fill={pale} />
      <circle cx="88" cy="55" r="4" fill={ink} /><circle cx="100" cy="55" r="4" fill={muted} /><circle cx="112" cy="55" r="4" fill={sun} />
      <rect x="90" y="140" width="22" height="66" rx="4" fill={sun} />
      <rect x="120" y="115" width="22" height="91" rx="4" fill={soft} stroke={ink} strokeWidth="2" />
      <rect x="150" y="95" width="22" height="111" rx="4" fill={sun} />
      <rect x="180" y="80" width="22" height="126" rx="4" fill={soft} stroke={ink} strokeWidth="2" />
      <polyline points="95,130 128,108 158,90 190,72" fill="none" stroke={ink} strokeWidth="3" strokeLinecap="round" />
      {[80, 126, 172].map((y, i) => (
        <g key={y}>
          <rect x="222" y={y} width="130" height="38" rx="8" fill={pale} stroke={ink} strokeWidth="2" />
          <rect x="230" y={y + 8} width="22" height="22" rx="5" fill={i === 1 ? soft : sun} stroke={i === 1 ? ink : 'none'} strokeWidth="2" />
          <rect x="260" y={y + 10} width="70" height="6" rx="3" fill={ink} />
          <rect x="260" y={y + 22} width={[46, 40, 54][i]} height="6" rx="3" fill={muted} />
        </g>
      ))}
      <circle cx="330" cy="70" r="28" fill="#fff" stroke={ink} strokeWidth="6" />
      <line x1="350" y1="90" x2="378" y2="118" stroke={ink} strokeWidth="9" strokeLinecap="round" />
      <path d="M318 70 l8 8 l16 -16" fill="none" stroke={ink} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M30 240 H410 L390 268 H50 Z" fill="#2c2a22" />
      <rect x="190" y="240" width="60" height="8" rx="3" fill="#5a5646" />
      <rect x="20" y="268" width="120" height="72" rx="6" fill={soft} stroke={ink} strokeWidth="2" />
      <line x1="80" y1="268" x2="80" y2="340" stroke={ink} strokeWidth="2" />
      <rect x="310" y="280" width="100" height="60" rx="6" fill={soft} stroke={ink} strokeWidth="2" />
      <line x1="360" y1="280" x2="360" y2="340" stroke={ink} strokeWidth="2" />
    </svg>
  )
}

function SiteFooter() {
  const explore = [['Courses', '#learn'],['Testimonials', '#testimonials'], ['FAQ', '#faq']]
  return (
    <footer className="bg-white px-5 pb-8 pt-16">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-10 grid gap-10 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <p className="text-base font-extrabold text-ink">Sourcing VA Training Services</p>
            <p className="mt-3 max-w-xs text-body">Helping Filipino VAs master product research and build careers from home.</p>
          </div>
          <div>
            <h4 className="mb-3 font-bold text-ink">Explore</h4>
            <ul className="space-y-2 text-body">
              {explore.map(([t, h]) => <li key={t}><a href={h} className="hover:text-ink">{t}</a></li>)}
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-bold text-ink">Contact</h4>
            <ul className="space-y-2 text-body"><li>[your@email.com]</li><li>[Facebook page]</li><li>Philippines</li></ul>
          </div>
        </div>
        <p className="border-t border-line pt-6 text-center text-sm text-muted">
          © {new Date().getFullYear()} Sourcing VA Training Services. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default function Landing() {
  const [billing, setBilling] = useState('onetime')

  return (
    <Page footer={<SiteFooter />}>
      {/* HERO */}
      <section className="relative overflow-hidden bg-white pt-10 text-center">
        <div className="mx-auto max-w-[1200px] px-5">
          <div className="mb-6 inline-block rounded-full border-[3px] border-ink px-4 py-1.5 text-sm font-semibold text-ink sm:px-6 sm:py-2 sm:text-base">
            Start Your VA Career With Sourcing VA Training
          </div>
          <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl md:text-6xl">
            Become an Amazon Product Researcher,
            <strong className="block font-extrabold">
              <span className="relative inline-block">
                <span className="absolute inset-x-0 bottom-1 -z-0 h-4 rounded bg-accent md:h-5" aria-hidden="true" />
                <span className="relative">from home</span>
              </span>
            </strong>
          </h1>
          <p className="mx-auto mb-8 mt-5 max-w-xl text-lg text-body">
            No experience needed. Learn the exact product research and sourcing skills Amazon sellers hire VAs for.
          </p>
          <div className="mb-10 flex flex-wrap justify-center gap-4">
            <Link to="/checkout" className={cta.yellow}>Enroll in the Masterclass <ArrowRight className="size-4" /></Link>
            <a href="#curriculum" className={cta.white}>See the Curriculum</a>
          </div>

          <div className="relative mx-auto h-[340px] max-w-[900px] sm:h-[440px]">
            <div className="absolute -bottom-[120px] left-1/2 size-[380px] -translate-x-1/2 rounded-full border-2 border-ink bg-accent sm:-bottom-[170px] sm:size-[560px]" />
            <HeroIllustration />

            <div className={`${card} absolute bottom-[150px] left-0 z-[3] origin-bottom-left scale-[.85] px-5 py-3.5 text-center sm:bottom-[110px] sm:left-[4%] sm:scale-100`}>
              <p className="text-xs font-bold uppercase tracking-widest text-muted">Join our exclusive</p>
              {/* object-cover on a wide box trims the square image's empty space around the wordmark */}
              <img src="/skool-logo.png" alt="Skool" className="mx-auto my-1 h-10 w-[130px] object-cover" />
              <p className="text-sm font-bold text-ink">community</p>
            </div>

            <div className="absolute bottom-[190px] right-[4%] z-[3] hidden rounded-2xl border-2 border-ink bg-accent px-5 py-4 text-left shadow-[6px_6px_0_var(--color-ink)] lg:block">
              <span className="text-2xl font-extrabold text-ink">100%</span>
              <small className="block text-sm text-ink/80">online &amp; beginner-friendly</small>
            </div>
          </div>
        </div>
        <svg className="relative z-[4] -mt-[120px] block h-[120px] w-full" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,0 C360,120 1080,120 1440,0 L1440,120 L0,120 Z" fill="var(--color-tint-2)" />
        </svg>
      </section>

      {/* WHAT YOU'LL LEARN */}
      <section id="learn" className="scroll-mt-20 bg-tint-2 px-5 pb-24 pt-10">
        <div className="mx-auto max-w-[1200px]">
          <SectionHead
            eyebrow="The Masterclass"
            title="What You'll Learn in the Product Research Masterclass"
            sub="Step-by-step skills you can use on real client work, even if you're starting from zero."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {learn.map(({ title, description, icon: Icon }, i) => (
              <Reveal key={title} className={`${card} p-7 hover:-translate-y-1`}>
                <div className="mb-4 flex items-start justify-between">
                  <span className="grid size-13 place-items-center rounded-xl border-2 border-ink bg-accent">
                    <Icon className="size-6 text-ink" strokeWidth={2.2} />
                  </span>
                  <span className="text-3xl font-extrabold text-tint-3 [-webkit-text-stroke:1.5px_var(--color-ink)]">0{i + 1}</span>
                </div>
                <h3 className="mb-2 text-lg font-bold text-ink">{title}</h3>
                <p className="text-[15px] text-body">{description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS STRIP */}
      <section className="border-y-2 border-ink bg-accent px-5 py-12">
        <ul className="mx-auto grid max-w-[1100px] gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map(({ title, icon: Icon }) => (
            <Reveal as="li" key={title} className="flex items-center gap-4">
              <span className="grid size-16 shrink-0 place-items-center rounded-full border-2 border-ink bg-white shadow-[3px_3px_0_var(--color-ink)]">
                <Icon className="size-7 text-ink" strokeWidth={2} />
              </span>
              <span className="text-xl font-extrabold leading-tight text-ink">{title}</span>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* CURRICULUM */}
      <section id="curriculum" className="scroll-mt-20 bg-tint px-5 py-24">
        <div className="mx-auto max-w-[1200px]">
          <SectionHead eyebrow="Course" title="Amazon Product Researcher" sub="Find profitable products. Build your skills. Create your future." />
          <Reveal className="grid overflow-hidden rounded-3xl border-2 border-ink bg-white shadow-[8px_8px_0_var(--color-ink)] lg:grid-cols-2">
            <div className="relative min-h-[280px] border-b-2 border-ink lg:border-b-0 lg:border-r-2">
              <EditableImage
                slot="course"
                fallback="/course-product-research.jpg"
                alt="Laptop showing Amazon product research next to Keepa, Helium 10, SellerAmp and RevSeller, with a Find, Analyze, Source, Profit checklist"
                className="absolute inset-0 size-full object-cover object-right"
              />
              <span className="absolute left-5 top-5 rounded-full border-2 border-ink bg-accent px-4 py-1 text-xs font-extrabold uppercase tracking-wider text-ink">
                Featured Course
              </span>
            </div>
            <div className="p-7 md:p-10">
              <span className="inline-block rounded-full border-2 border-ink bg-accent px-4 py-1 text-xs font-extrabold uppercase tracking-wider text-ink">
                Amazon Product Researcher
              </span>
              <h3 className="mt-4 text-3xl font-extrabold leading-tight text-ink md:text-4xl">
                Amazon VA{' '}
                <span className="relative inline-block">
                  <span className="absolute inset-x-0 -bottom-0.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
                  <span className="relative">3-Day Live</span>
                </span>{' '}
                Training
              </h3>
              <p className="mt-4 text-body">
                Learn proven strategies and get hands-on with industry tools to find profitable products, analyze market demand, and build a successful Amazon business.
              </p>
              <ul className="mt-5 divide-y divide-ink/10">
                {courseHighlights.map(({ title, detail, icon: Icon }) => (
                  <li key={title} className="flex items-center gap-4 py-2.5">
                    <span className="grid size-11 shrink-0 place-items-center rounded-full border-2 border-ink bg-tint-3">
                      <Icon className="size-5 text-ink" strokeWidth={2} />
                    </span>
                    <div>
                      <p className="font-bold leading-snug text-ink">{title}</p>
                      <p className="text-sm text-body">{detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Link to="/checkout" className={`${cta.yellow} mt-6 w-full py-4 text-base uppercase`}>
                Enroll Now <ArrowRight className="size-5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="scroll-mt-20 bg-tint-2 px-5 py-24">
        <div className="mx-auto max-w-[1200px]">
          <SectionHead eyebrow="Student stories" title="What our students say" />
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={i} className={`${card} flex flex-col gap-4 p-7`}>
                <Quote className="size-7 fill-accent text-ink" strokeWidth={1.5} />
                <p className="italic text-ink">"{t.quote}"</p>
                <div className="mt-auto flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-full border-2 border-ink bg-accent font-bold text-ink">{t.initial}</span>
                  <div>
                    <strong className="block text-ink">{t.name}</strong>
                    <small className="text-muted">{t.role}</small>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="scroll-mt-20 bg-white px-5 py-24">
        <div className="mx-auto max-w-[1200px]">
          <SectionHead eyebrow="Enroll" title="Start learning today" sub="One masterclass, three ways to learn it. [Add guarantee or enrollment-deadline messaging here.]" />

          <div className="mb-12 flex justify-center">
            <div className="inline-flex rounded-full border-2 border-ink bg-white p-1">
              {[['onetime', 'One-Time'], ['plan', 'Payment Plan']].map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => setBilling(id)}
                  className={`rounded-full px-5 py-2 text-sm font-bold transition ${billing === id ? 'bg-accent text-ink' : 'text-body hover:text-ink'}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid items-stretch gap-8 md:grid-cols-3">
            {tiers.map((tier) => (
              <Reveal
                key={tier.name}
                className={`relative flex flex-col rounded-3xl border-2 border-ink p-8 shadow-[8px_8px_0_var(--color-ink)] ${tier.featured ? 'bg-accent' : 'bg-white'}`}
              >
                {tier.featured && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border-2 border-ink bg-white px-4 py-0.5 text-sm font-bold text-ink">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-extrabold text-ink">{tier.name}</h3>
                <p className={tier.featured ? 'text-ink/75' : 'text-muted'}>{tier.tagline}</p>
                <p className="my-4 text-4xl font-extrabold text-ink">{tier.price[billing]}</p>
                <ul className="mb-8 flex-1 space-y-2.5">
                  {tier.features.map((f) => (
                    <li key={f} className="flex gap-2.5 text-ink">
                      <span className={`grid size-6 shrink-0 place-items-center rounded-full border-2 border-ink ${tier.featured ? 'bg-white' : 'bg-accent'}`}>
                        <Check className="size-3.5" strokeWidth={3.5} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/checkout" className={`${tier.featured ? cta.white : cta.yellow} w-full`}>
                  Enroll Now <ArrowRight className="size-4" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-20 bg-tint px-5 py-24">
        <div className="mx-auto max-w-[800px]">
          <SectionHead eyebrow="FAQ" title="Frequently asked questions" />
          <Reveal>
            <Accordion items={faqs.map(({ q, a }) => ({ title: q, body: a }))} />
          </Reveal>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-white px-5 py-24">
        <Reveal className="relative mx-auto max-w-[1200px] overflow-hidden rounded-3xl border-2 border-ink bg-accent px-6 py-16 text-center shadow-[8px_8px_0_var(--color-ink)] md:rounded-[2rem] md:py-20">
          <div className="absolute -right-20 -top-28 size-72 rounded-full bg-white/40" aria-hidden="true" />
          <div className="absolute -bottom-24 -left-16 size-56 rounded-full bg-white/30" aria-hidden="true" />
          <div className="relative">
            <h2 className="text-3xl font-extrabold text-ink md:text-4xl">Ready to start your VA career?</h2>
            <p className="mx-auto mb-8 mt-3 max-w-lg text-ink/80">Learn product research from home and build a skill Amazon sellers are looking for.</p>
            <Link to="/checkout" className={cta.whiteRaised}>
              Enroll in the Masterclass <ArrowRight className="size-4" />
            </Link>
          </div>
        </Reveal>
      </section>
    </Page>
  )
}
