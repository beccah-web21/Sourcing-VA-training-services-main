import { Link } from 'react-router-dom'
import { ArrowRight, BadgeCheck, Landmark, MapPin, MessageCircle, Quote, Route, Wrench } from 'lucide-react'
import { Page, Footer, cta, card } from '../components/Layout.jsx'
import EditableImage from '../components/EditableImage.jsx'
import Reveal from '../components/Reveal.jsx'
import { FACEBOOK_URL } from '../config.js'

// Placeholder content — swap bracketed text (founder name, bio, story, registration details) for the real details before launch.
// Founder photo: open /about?edit and use "Change image".

const FOUNDER = { name: '[Founder Name]', title: 'Founder & Owner, Sourcing VA Training Services' }

// Only keep this card if the business is actually registered — every value must match the certificate.
const REGISTRATION = {
  label: 'Business registration',
  summary: 'Sourcing VA Training Services is a registered business in the Philippines.',
  fields: [
    ['Business name', 'Sourcing VA Training Services'],
    ['Registered owner', '[Founder Name]'],
    ['Issuer', '[e.g. Department of Trade and Industry (DTI)]'],
    ['Registration No.', '[Certificate number]'],
    ['Date of registration', '[Date]'],
    ['Services', 'Training services; online courses; coaching'],
  ],
}

const reasons = [
  {
    icon: Wrench,
    title: 'Build relevant skill',
    body: '[Your background, e.g. years of experience as an Amazon VA, the tools you use every day and the clients you’ve worked with.]',
  },
  {
    icon: Route,
    title: 'Get the right path',
    body: 'Live training, a real internship and a lifetime community, so you learn the exact skills Amazon sellers hire for.',
  },
]

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
                fallback="/founder-placeholder.svg"
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
                {FOUNDER.name} is the founder of Sourcing VA Training Services, a Philippine training platform that teaches beginners the Amazon
                product research and sourcing skills sellers hire VAs for. [Add a line about your own VA experience.]
              </p>
              <p>
                The goal is a clear path from zero experience to a first Amazon VA role, through live lessons, hands-on practice and a
                community that keeps you learning long after the training ends.
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

      {/* Why I built it */}
      <section className="bg-white px-5 py-20 md:py-24">
        <div className="mx-auto max-w-[1000px]">
          <Reveal className="mx-auto mb-12 max-w-2xl text-center">
            <Eyebrow>Our story</Eyebrow>
            <h2 className="text-3xl font-extrabold leading-tight text-ink md:text-4xl">
              Why I built{' '}
              <strong className="relative inline-block font-extrabold">
                <span className="absolute inset-x-0 bottom-1 h-3 rounded bg-accent md:h-4" aria-hidden="true" />
                <span className="relative">Sourcing VA</span>
              </strong>
            </h2>
          </Reveal>

          <div className="grid gap-10 md:grid-cols-2 md:gap-6">
            {reasons.map(({ icon: Icon, title, body }, i) => (
              <Reveal key={title} className={`${card} relative p-7 pt-9`}>
                <span className="absolute -top-5 left-7 grid size-10 place-items-center rounded-full border-2 border-ink bg-accent text-sm font-extrabold text-ink">
                  #{i + 1}
                </span>
                <Icon className="mb-3 size-7 text-accent-ink" strokeWidth={2.2} />
                <h3 className="text-xl font-extrabold text-ink">{title}</h3>
                <p className="mt-2 leading-relaxed text-body">{body}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="relative mt-14 rounded-3xl border-2 border-ink bg-tint-2 px-6 py-10 shadow-[8px_8px_0_var(--color-ink)] sm:px-12">
            <span className="absolute -top-6 left-8 grid size-12 place-items-center rounded-full border-2 border-ink bg-accent">
              <Quote className="size-5 text-ink" strokeWidth={2.4} />
            </span>
            <p className="text-xl font-semibold leading-relaxed text-ink md:text-2xl">
              We are just like you. [Share your story: where you started, what it cost you to learn, and when you started earning as a VA.]
              You don’t have to go through the same trial and error, that’s why we built the most affordable training to help you start your
              Amazon VA career from home.
            </p>
            <p className="mt-6 font-bold text-accent-ink">— {FOUNDER.name}</p>
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
