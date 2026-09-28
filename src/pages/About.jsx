import { Link } from 'react-router-dom'
import { ArrowRight, CirclePlay, BriefcaseBusiness, Users, GraduationCap, MapPin } from 'lucide-react'
import { Page, Footer, cta, card } from '../components/Layout.jsx'

// Drafted from details already on the site — swap bracketed text for the real story before launch.

const offers = [
  { title: '3-Day Live Training', description: 'Learn Amazon product research live with the trainer, with hands-on practice every session.', icon: CirclePlay },
  { title: '1-Week Amazon US Internship', description: 'Put your new skills to work on real product research, with a 1-on-1 lead review.', icon: BriefcaseBusiness },
  { title: 'Lifetime Skool Community', description: 'Keep learning with recorded lessons and a community of fellow VAs.', icon: Users },
  { title: 'Certificate of Completion', description: 'Show clients you’ve completed the training and are ready to work.', icon: GraduationCap },
]

export default function About() {
  return (
    <Page footer={<Footer />}>
      <section className="bg-white px-5 pb-16 pt-14 text-center md:pt-20">
        <div className="mb-6 inline-block rounded-full border-[3px] border-ink px-4 py-1.5 text-sm font-semibold text-ink sm:px-6 sm:py-2 sm:text-base">
          About Us
        </div>
        <h1 className="mx-auto max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl md:text-6xl">
          Helping Filipino VAs build careers{' '}
          <strong className="relative inline-block font-extrabold">
            <span className="absolute inset-x-0 bottom-1 h-4 rounded bg-accent md:h-5" aria-hidden="true" />
            <span className="relative">from home</span>
          </strong>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-body">
          Sourcing VA Training Services teaches beginners the product research and sourcing skills Amazon sellers hire VAs for, no experience needed.
        </p>
      </section>

      <section className="bg-tint-2 px-5 py-20">
        <div className="mx-auto grid max-w-[1100px] gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="mb-3.5 inline-block rounded-full bg-accent px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-ink">Our story</span>
            <h2 className="text-3xl font-extrabold leading-tight text-ink md:text-4xl">Why we started</h2>
            <p className="mt-4 text-body">[Share how Sourcing VA Training Services began, who the trainer is, and why you started teaching Amazon product research.]</p>
            <p className="mt-4 text-body">
              Our goal is simple: give every student a clear, practical path from zero experience to their first Amazon VA role, with live guidance and real practice along the way.
            </p>
            <p className="mt-5 flex items-center gap-2 font-semibold text-ink">
              <MapPin className="size-5 shrink-0" /> Puerto Princesa City, Palawan, Philippines
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {offers.map(({ title, description, icon: Icon }) => (
              <div key={title} className={`${card} p-6`}>
                <span className="mb-4 grid size-12 place-items-center rounded-xl border-2 border-ink bg-accent">
                  <Icon className="size-6 text-ink" strokeWidth={2.2} />
                </span>
                <h3 className="mb-1.5 font-bold text-ink">{title}</h3>
                <p className="text-sm text-body">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 text-center">
        <h2 className="text-3xl font-extrabold text-ink md:text-4xl">Ready to start your VA career?</h2>
        <p className="mx-auto mb-8 mt-3 max-w-lg text-body">Join the next batch and learn product research from home.</p>
        <Link to="/checkout" className={cta.yellow}>
          Enroll in the Masterclass <ArrowRight className="size-4" />
        </Link>
      </section>
    </Page>
  )
}
