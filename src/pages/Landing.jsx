import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, BookOpen, SearchCheck, Rocket,
  Plus, Quote, Laptop, MonitorPlay, BriefcaseBusiness, GraduationCap,
  CalendarDays, CirclePlay, Users, User, ClipboardCheck, Crown, Play, ChevronLeft, ChevronRight,
} from 'lucide-react'
import { Page, cta, card } from '../components/Layout.jsx'
import EditableImage from '../components/EditableImage.jsx'
import Reveal from '../components/Reveal.jsx'
import { FACEBOOK_URL } from '../config.js'
import { amazonVaPlan } from '../components/PlanCard.jsx'

// Placeholder content — swap bracketed text (testimonials, prices, contact info) for real details before launch.

const challengeDays = [
  { day: 'Day 1', icon: BookOpen, modules: [[1, 'Amazon VA Fundamentals'], [2, 'Research Essentials'], [3, 'Research Tools']] },
  { day: 'Day 2', icon: SearchCheck, modules: [[4, 'Sourcing Methods'], [5, 'Product Analysis']] },
  { day: 'Day 3', icon: Rocket, modules: [[7, 'Advanced Sourcing'], [8, 'Practical Assessment'], [9, 'Getting Ready for Your 1-Week Amazon US Internship']] },
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

// youtubeId is the part after "watch?v=" in a YouTube link; leave it empty to show a "coming soon" card
const videos = [
  { youtubeId: '', title: '[Video title]', description: '[Short description of what this video covers.]' },
  // photo shows a still image instead of a video; cards without a title skip the text block
  { photo: '/training-session-1.jpg', alt: 'Trainees on a live Zoom training session' },
  { photo: '/training-session-2.png', alt: 'Trainees on a live Zoom training session' },
]

const testimonials = [
  { initial: 'J', photo: '/testimonial-janrie.jpg', name: 'Janrie Diamante', role: 'Batch 1 Trainee', quote: 'I completed their Amz program, and it was a great learning experience. I learned how to properly analyze products, competition, demand, and other important factors. It gave me a better understanding. Definitely worth it for anyone who is interested in learning. 🤙🏼' },
  { initial: 'G', photo: '/testimonial-gemma.jpg', name: 'Gemma Ladia', role: 'Batch 2 Trainee', quote: 'Thank you so much, Coach, sa 3-day Amazon Product Research training!\nSa una, nakakalito lang talaga kasi bago sa akin yung process, lalo na sa pag-check ng products, Keepa chart, Buy Box, at pag-analyze ng mga numbers. Pero after the training, na-realize ko na practice lang talaga. Habang paulit-ulit mong ginagawa at hinahanap yung products, mas nagiging familiar ka rin at makukuha mo rin siya eventually.' },
  { initial: 'J', photo: '/testimonial-jason.jpg', name: 'Jason Rosales', role: 'Batch 3 Trainee', quote: 'The course is good for those who want to start building a foundation ng pagiging Amazon Online Arbitrage Product Researcher, whether from zero or may kaunting knowledge na. As someone who has watched a lot of YouTube videos about becoming an Amazon Product Researcher before enrolling in this course, I can say na mas na-solidify ang foundations ko after taking it 😁' },
  { initial: 'S', photo: '/testimonial-sarah.jpg', name: 'Sarah Caraballe Allou', role: 'Batch 3 Trainee', quote: 'The course training is very Beginner friendly.' },
  { initial: 'S', photo: '/testimonial-sai.jpg', name: 'Sai Nav', role: 'Batch 1 Trainee', quote: 'Sourcing VA 101 is great, i learned a lot of new things and gain new knowledge about sourcing. This is good for people who want to learn about product sourcing, i highly recommend it ❤️❤️' },
  { initial: 'B', photo: '/testimonial-bembem.jpg', name: 'Bembem Emnace Navaja', role: 'Batch 2 Trainee', quote: 'I’m very grateful for the opportunity to be part of this Product Researcher training. The training was very informative and helped me understand the fundamentals and process of product research more clearly.\nI learned valuable skills such as finding potential products, analyzing product opportunities, checking competition, and understanding important factors to consider when doing product research.' },
]

const faqs = [
  { q: 'Do I need experience to join?', a: 'No experience needed! This training is beginner-friendly and designed to help you build practical skills from the ground up. All you need is a working laptop or PC, a headset, and a webcam to participate in the live training.' },
  { q: 'How long is the course?', a: 'The training is a 3-day live program, held from 7:30 PM–10:30 PM each day. That’s 3 hours per day and 9 hours of focused, hands-on training designed to help you build practical skills with confidence.' },
  { q: 'Is it live or recorded?', a: 'The main training is live, allowing you to learn directly with the trainer and ask questions along the way. Recorded lessons are also available through our Skool community for self-paced learning.' },
  { q: 'Do I get a certificate?', a: 'Yes! You’ll receive a certificate of completion after successfully completing the training.' },
  { q: 'How do I pay?', a: 'Pay securely via GCash, Maya, bank transfer, or card. Simply choose your preferred payment option at checkout.' },
]

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

// Shows the YouTube thumbnail until clicked, so the page doesn't load three players up front
function VideoCard({ youtubeId, title, description, photo, alt, featured }) {
  const [playing, setPlaying] = useState(false)
  return (
    <Reveal className={`${card} flex flex-col overflow-hidden ${featured ? 'md:col-span-2' : ''}`}>
      {/* Photos keep their own shape (never cropped); the dark fill matches the Zoom screenshots if a card is taller */}
      <div className={`relative ${photo ? 'grid flex-1 place-items-center bg-[#16171a]' : 'aspect-video bg-tint-3'} ${title ? 'border-b-2 border-ink' : ''}`}>
        {photo ? (
          <img src={photo} alt={alt} loading="lazy" className="block h-auto w-full" />
        ) : !youtubeId ? (
          <div className="grid size-full place-items-center text-center">
            <div>
              <CirclePlay className="mx-auto size-12 text-ink/40" strokeWidth={1.5} />
              <p className="mt-2 text-sm font-bold text-muted">Video coming soon</p>
            </div>
          </div>
        ) : playing ? (
          <iframe
            className="absolute inset-0 size-full"
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button onClick={() => setPlaying(true)} className="group absolute inset-0" aria-label={`Play video: ${title}`}>
            <img src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`} alt="" className="size-full object-cover" />
            <span className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-ink bg-accent shadow-[3px_3px_0_var(--color-ink)] transition group-hover:scale-110">
              <Play className="ml-1 size-7 fill-ink text-ink" />
            </span>
          </button>
        )}
      </div>
      {title && (
        <div className={featured ? 'p-7 md:p-8' : 'p-6'}>
          <h3 className={`mb-2 font-bold text-ink ${featured ? 'text-2xl' : 'text-lg'}`}>{title}</h3>
          <p className="text-[15px] text-body">{description}</p>
        </div>
      )}
    </Reveal>
  )
}

// Horizontal scroll-snap row: 1 card visible on phones, 2 on tablets, 3 on desktop
function Carousel({ label, children }) {
  const track = useRef(null)
  const [edges, setEdges] = useState({ start: true, end: false })

  const update = () => {
    const el = track.current
    if (!el) return
    setEdges({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 })
  }
  useEffect(() => {
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // Scroll by one card (first child's width plus the gap)
  const go = (dir) => {
    const el = track.current
    const step = (el.firstElementChild?.offsetWidth ?? el.clientWidth) + 24
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  const arrow = 'grid size-12 place-items-center rounded-full border-2 border-ink bg-accent text-ink shadow-[3px_3px_0_var(--color-ink)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-white disabled:opacity-40 disabled:hover:translate-y-0'
  return (
    <Reveal role="region" aria-roledescription="carousel" aria-label={label}>
      {/* padding keeps the cards' offset shadows from being clipped */}
      <div
        ref={track}
        onScroll={update}
        className="-mx-2 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-2 pb-4 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [&>*]:w-[85%] [&>*]:shrink-0 [&>*]:snap-start md:[&>*]:w-[calc((100%-24px)/2)] lg:[&>*]:w-[calc((100%-48px)/3)]"
      >
        {children}
      </div>
      <div className="mt-6 flex justify-center gap-4">
        <button onClick={() => go(-1)} disabled={edges.start} className={arrow} aria-label="Previous">
          <ChevronLeft className="size-6" strokeWidth={2.5} />
        </button>
        <button onClick={() => go(1)} disabled={edges.end} className={arrow} aria-label="Next">
          <ChevronRight className="size-6" strokeWidth={2.5} />
        </button>
      </div>
    </Reveal>
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

// Lucide has no brand icons, so these are drawn inline. Replace each '#' with the real profile URL.
const socials = [
  {
    name: 'Facebook',
    href: FACEBOOK_URL,
    icon: (
      <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
        <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
        <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.4" cy="6.6" r="0.6" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@arbitrageva101',
    icon: (
      <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
]

function SiteFooter() {
  const explore = [['About Us', '/about'], ['Courses', '#learn'], ['Videos', '#videos'], ['Testimonials', '#testimonials'], ['FAQ', '#faq']]
  return (
    <footer className="bg-ink px-5 pb-8 pt-16">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-10 grid gap-10 md:grid-cols-[2fr_1fr_1fr]">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            {/* Same crop as the header logo: scaled up so the orange frame falls outside the circle */}
            <span className="size-28 shrink-0 overflow-hidden rounded-full border-2 border-accent bg-white shadow-[4px_4px_0_var(--color-accent)] md:size-32">
              <img src="/logo.jpg" alt="Sourcing VA Training Services logo" className="size-full scale-[1.3] object-cover" />
            </span>
            <div>
              <p className="text-2xl font-extrabold leading-tight text-white">Sourcing VA Training Services</p>
              <p className="mt-3 max-w-xs text-white/70">Helping Filipino VAs master product research and build careers from home.</p>
              <ul className="mt-5 flex gap-3">
                {socials.map(({ name, href, icon }) => (
                  <li key={name}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={name}
                      className="grid size-11 place-items-center rounded-full border-2 border-ink bg-white text-ink shadow-[3px_3px_0_var(--color-accent)] transition hover:-translate-y-0.5 hover:bg-accent"
                    >
                      {icon}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <h4 className="mb-4 text-xl font-extrabold text-accent">Quick Links</h4>
            <ul className="space-y-2 text-white/70">
              {explore.map(([t, h]) => <li key={t}><a href={h} className="underline-offset-4 transition-colors hover:text-accent hover:underline">{t}</a></li>)}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-xl font-extrabold text-accent">Contact Info</h4>
            <ul className="space-y-2 text-white/70">
              <li><a href="mailto:arbiscouttraininghub.ph@gmail.com" className="break-all hover:text-accent">arbiscouttraininghub.ph@gmail.com</a></li>
              <li><a href={socials[0].href} target="_blank" rel="noopener noreferrer" className="hover:text-accent">Sourcing VA Training Services</a></li>
              <li>Puerto Princesa City, Palawan, Philippines</li>
            </ul>
          </div>
        </div>
        <p className="border-t border-white/15 pt-6 text-center text-sm text-white/55">
          © {new Date().getFullYear()} Sourcing VA Training Services. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default function Landing() {
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

      {/* WHAT'S INCLUDED IN THE 3-DAY CHALLENGE */}
      <section id="learn" className="scroll-mt-20 bg-tint-2 px-5 pb-24 pt-10 text-ink">
        <div className="mx-auto max-w-[1200px]">
          <Reveal className="mb-16 grid gap-6 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <Eyebrow>The Masterclass</Eyebrow>
              <h2 className="text-3xl font-extrabold leading-tight md:text-5xl">
                What's Included in the{' '}
                <span className="relative inline-block">
                  <span className="absolute inset-x-0 bottom-1 h-3 rounded bg-accent md:h-4" aria-hidden="true" />
                  <span className="relative">3-Day Challenge</span>
                </span>
              </h2>
            </div>
            <p className="text-lg leading-relaxed text-body">
              Step-by-step skills you can use on real client work, even if you're starting from zero. Over three days of live training, you'll go from Amazon VA fundamentals to a practical assessment and getting ready for your 1-week Amazon US internship.
            </p>
          </Reveal>

          <div className="relative">
            {/* Dashed wave linking the day circles; circle centers sit at 1/6, 1/2 and 5/6 of the width (desktop only) */}
            <svg className="absolute inset-x-0 top-0 hidden h-[200px] w-full lg:block" viewBox="0 0 600 200" preserveAspectRatio="none" aria-hidden="true">
              <path d="M100,56 C200,56 200,152 300,152 C400,152 400,56 500,56" fill="none" stroke="var(--color-ink)" strokeWidth="2" strokeDasharray="8 8" vectorEffect="non-scaling-stroke" />
            </svg>
            <ol className="relative grid gap-14 lg:grid-cols-3 lg:gap-10">
              {challengeDays.map(({ day, icon: Icon, modules }, i) => (
                <Reveal as="li" key={day} className={`flex flex-col items-center text-center ${i % 2 ? 'lg:mt-24' : ''}`}>
                  <span className="grid size-28 place-items-center rounded-full border-2 border-ink bg-accent shadow-[4px_4px_0_var(--color-ink),0_0_0_10px_var(--color-tint-2)]">
                    <Icon className="size-12 text-ink" strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-6 text-2xl font-extrabold">{day}</h3>
                  <ul className="mt-4 w-full max-w-xs space-y-2.5">
                    {modules.map(([num, name]) => (
                      <li key={num} className="flex items-center gap-3 rounded-xl border-2 border-ink bg-white px-4 py-2.5 text-left shadow-[3px_3px_0_var(--color-ink)]">
                        <span className="shrink-0 rounded-full border-2 border-ink bg-accent px-2.5 py-0.5 text-xs font-extrabold text-ink">M{num}</span>
                        <span className="font-semibold text-ink">{name}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </ol>
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

      {/* VIDEOS */}
      <section id="videos" className="scroll-mt-20 bg-white px-5 py-24">
        <div className="mx-auto max-w-[1200px]">
          <SectionHead eyebrow="Watch" title="See the training in action" sub="[Short line introducing the videos below.]" />
          {/* First video is the featured one across the full width; the rest sit two per row below it */}
          <div className="mx-auto grid max-w-[1000px] gap-6 md:grid-cols-2">
            {videos.map((v, i) => <VideoCard key={i} {...v} featured={i === 0} />)}
          </div>
        </div>
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
              {/* Price comes from the shared plan so it always matches the Enroll card */}
              <div className="mt-5 rounded-2xl border-2 border-ink bg-tint px-5 py-4">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-muted line-through">{amazonVaPlan.originalPrice}</span>
                  <span className="rounded-full border-2 border-ink bg-accent px-3 py-0.5 text-xs font-extrabold text-ink">{amazonVaPlan.discount}</span>
                </div>
                <p className="mt-1 text-ink">
                  <span className="text-4xl font-extrabold">{amazonVaPlan.price}</span>
                </p>
              </div>
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
          <Carousel label="Student reviews">
            {testimonials.map((t, i) => (
              <div key={i} className={`${card} flex flex-col gap-4 p-7`}>
                <Quote className="size-7 fill-accent text-ink" strokeWidth={1.5} />
                <p className="whitespace-pre-line italic text-ink">"{t.quote}"</p>
                <div className="mt-auto flex items-center gap-3">
                  {t.photo ? (
                    <img src={t.photo} alt={t.name} className="size-11 shrink-0 rounded-full border-2 border-ink object-cover" />
                  ) : (
                    <span className="grid size-11 shrink-0 place-items-center rounded-full border-2 border-ink bg-accent font-bold text-ink">{t.initial}</span>
                  )}
                  <div>
                    <strong className="block text-ink">{t.name}</strong>
                    <small className="text-muted">{t.role}</small>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
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
      <section className="relative overflow-hidden bg-accent px-5 py-20 text-center md:py-28">
        <div className="absolute -right-20 -top-28 size-72 rounded-full bg-white/40 md:size-96" aria-hidden="true" />
        <div className="absolute -bottom-24 -left-16 size-56 rounded-full bg-white/30 md:size-72" aria-hidden="true" />
        <Reveal className="relative mx-auto max-w-[1200px]">
          <h2 className="text-3xl font-extrabold text-ink md:text-4xl">Ready to start your VA career?</h2>
          <p className="mx-auto mb-8 mt-3 max-w-lg text-ink/80">Learn product research from home and build a skill Amazon sellers are looking for.</p>
          <Link to="/checkout" className={`${cta.whiteRaised} hover:bg-accent active:bg-accent`}>
            Enroll in the Masterclass <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </section>
    </Page>
  )
}
