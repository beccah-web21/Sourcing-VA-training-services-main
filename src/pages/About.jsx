import { Link } from 'react-router-dom'
import { ArrowRight, BadgeCheck, Landmark, MapPin, MessageCircle } from 'lucide-react'
import { Page, Footer, cta, card } from '../components/Layout.jsx'
import EditableImage from '../components/EditableImage.jsx'
import Reveal from '../components/Reveal.jsx'
import { FACEBOOK_URL } from '../config.js'

// Founder photo: shows /founder.jpg until one is uploaded via /about?edit and "Change image".

const FOUNDER = { name: 'Rebeccah Gonzales', title: 'Founder and Training Coach, Sourcing VA Training Services' }

// Only keep this card if the business is actually registered — every value must match the certificate.
const REGISTRATION = {
  label: 'Business registration',
  summary: 'Sourcing VA Training Services is a registered business in the Philippines.',
  fields: [
    ['Business name', 'Sourcing VA Training Services'],
    ['Registered owner', 'Rebeccah Gonzales'],
    ['Issuer', 'Department of Trade and Industry'],
    ['Registration No.', '8502994'],
    ['Date of registration', 'September 22, 2026'],
    ['Services', 'Online Training Services'],
  ],
}

function Eyebrow({ children }) {
  return (
    <span className="mb-3.5 inline-block rounded-full bg-accent px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-ink">
      {children}
    </span>
  )
}

export default function About() {
  return (
    <Page footer={<Footer />}>
      {/* Meet the founder */}
      <section className="overflow-hidden bg-tint px-5 py-16 md:py-24">
        <div className="mx-auto grid max-w-[1150px] gap-14 lg:grid-cols-[5fr_7fr] lg:gap-16">
          <Reveal className="relative mx-auto w-full max-w-[420px] lg:sticky lg:top-24 lg:self-start">
            <div className="absolute inset-0 translate-x-4 translate-y-4 rotate-3 rounded-3xl border-2 border-ink bg-accent" aria-hidden="true" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border-2 border-ink bg-tint-3">
              <EditableImage
                slot="founder"
                fallback="/founder.jpg"
                alt={`${FOUNDER.name}, founder of Sourcing VA Training Services`}
                className="absolute inset-0 size-full object-cover object-top"
              />
            </div>
            <span className="absolute -left-3 top-6 flex -rotate-6 items-center gap-1.5 rounded-full border-2 border-ink bg-white px-4 py-2 text-sm font-extrabold text-ink shadow-[3px_3px_0_var(--color-ink)]">
              <span aria-hidden="true">👋</span> Hi, I’m your trainer!
            </span>
            <span className="absolute -bottom-5 right-2 flex items-center gap-1.5 rounded-full border-2 border-ink bg-white px-4 py-2 text-xs font-bold text-ink shadow-[3px_3px_0_var(--color-ink)] sm:text-sm">
              <MapPin className="size-4 shrink-0" /> Puerto Princesa, Palawan
            </span>
          </Reveal>

          <Reveal>
            <Eyebrow>Meet the founder</Eyebrow>
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl">{FOUNDER.name}</h1>
            <p className="mt-3 text-lg font-bold text-accent-ink">{FOUNDER.title}</p>

            <div className="mt-6 space-y-4 text-lg leading-relaxed text-body">
              <p>
                {FOUNDER.name} started her VA journey with no experience and no idea where to start. As a fresh Elementary Education
                graduate, she began with her mom’s borrowed laptop, took online courses, and discovered Amazon product research. Today, she has
                4+ years of experience as an Amazon VA, working with the Amazon US marketplace.
              </p>
              <p>
                Her journey inspired her to create Sourcing VA Training Services to help beginners who are starting from zero. Her goal is
                simple: make learning less overwhelming, help aspiring VAs focus on one skill, and give them a clear path into Amazon product
                research. If she could start from zero, so can you.
              </p>
            </div>

            <div className={`${card} mt-8 overflow-hidden`}>
              <div className="flex items-start gap-3 border-b-2 border-ink bg-accent px-5 py-4 sm:px-6">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl border-2 border-ink bg-white">
                  <Landmark className="size-5 text-ink" strokeWidth={2.2} />
                </span>
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-widest text-ink">{REGISTRATION.label}</p>
                  <p className="mt-0.5 text-sm font-semibold text-ink">{REGISTRATION.summary}</p>
                </div>
                <BadgeCheck className="ml-auto hidden size-6 shrink-0 text-ink sm:block" strokeWidth={2.2} />
              </div>
              <dl className="grid gap-x-8 gap-y-5 px-5 py-6 sm:grid-cols-2 sm:px-6">
                {REGISTRATION.fields.map(([term, value]) => (
                  <div key={term}>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-muted">{term}</dt>
                    <dd className="mt-1 font-bold text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/checkout" className={cta.yellow}>
                Enroll in the Masterclass <ArrowRight className="size-4" />
              </Link>
              <a href={FACEBOOK_URL} target="_blank" rel="noreferrer" className={cta.white}>
                <MessageCircle className="size-4" /> Message us on Facebook
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-accent px-5 py-20 text-center md:py-28">
        <div className="absolute -right-20 -top-28 size-72 rounded-full bg-white/40 md:size-96" aria-hidden="true" />
        <div className="absolute -bottom-24 -left-16 size-56 rounded-full bg-white/30 md:size-72" aria-hidden="true" />
        <Reveal className="relative mx-auto max-w-[1200px]">
          <h2 className="text-3xl font-extrabold text-ink md:text-4xl">Ready to start your VA career?</h2>
          <p className="mx-auto mb-8 mt-3 max-w-lg text-ink/80">Join the next batch and learn product research from home.</p>
          <Link to="/checkout" className={`${cta.whiteRaised} hover:bg-accent active:bg-accent`}>
            Enroll in the Masterclass <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </section>
    </Page>
  )
}
