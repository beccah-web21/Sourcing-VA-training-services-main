import { Plus, GraduationCap, Briefcase, BadgeCheck } from 'lucide-react'
import { Page, Footer, card } from '../components/Layout.jsx'
import PlanCard from '../components/PlanCard.jsx'

const features = [
  { title: 'Expert Mentorship', description: 'Learn directly from industry veterans who have successfully navigated the VA landscape for years.', icon: GraduationCap },
  { title: 'Career Coaching', description: 'Receive personalized resume reviews, portfolio feedback, and interview prep to help you land clients.', icon: Briefcase },
  { title: 'Verified Certificates', description: 'Earn industry-recognized certificates upon completion to showcase your skills to potential employers.', icon: BadgeCheck },
]

const faqs = [
  { question: 'How do payments work?', answer: 'Pay via GCash by sending the amount to our GCash number or scanning the QR code, then submit your GCash reference number. Once we confirm your payment, we will email you your course access.' },
  { question: 'Can I cancel my subscription anytime?', answer: 'Yes. You can cancel your subscription and keep access until the end of your active billing period.' },
  { question: 'When do I get access to the courses?', answer: 'Access starts once we verify your GCash payment, usually within 24 hours. You will receive an email with your course access details.' },
]

export default function Pricing() {
  return (
    <Page
      footer={
        <Footer
          copyright="© 2026 Sourcing VA Training Services. All rights reserved."
          links={[
            { text: 'Privacy Policy', link: '#privacy' },
            { text: 'Terms of Service', link: '#terms' },
            { text: 'Refund Policy', link: '#refund' },
            { text: 'Contact Support', link: '#support' },
          ]}
        />
      }
    >
      <section className="bg-white px-5 pb-16 pt-14 text-center md:pt-20">
        <div className="mb-6 inline-block rounded-full border-[3px] border-ink px-4 py-1.5 text-sm font-semibold text-ink sm:px-6 sm:py-2 sm:text-base">
          Sourcing VA Training Services Membership
        </div>
        <h1 className="mx-auto max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl md:text-6xl">
          Membership that{' '}
          <strong className="relative inline-block font-extrabold">
            <span className="absolute inset-x-0 bottom-1 h-4 rounded bg-accent md:h-5" aria-hidden="true" />
            <span className="relative">doesn't suck</span>
          </strong>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-body">
          Start free, explore the platform, and upgrade when you are ready for complete training access.
        </p>
      </section>

      <section className="bg-tint-2 px-5 py-20">
        <div className="mx-auto max-w-lg">
          <PlanCard featured />
        </div>
      </section>

      <section className="bg-white px-5 py-24">
        <div className="mx-auto grid max-w-[1200px] gap-6 md:grid-cols-3">
          {features.map(({ title, description, icon: Icon }) => (
            <div key={title} className={`${card} p-8`}>
              <span className="mb-4 grid size-13 place-items-center rounded-xl border-2 border-ink bg-accent">
                <Icon className="size-6 text-ink" strokeWidth={2.2} />
              </span>
              <h3 className="mb-2 text-xl font-bold text-ink">{title}</h3>
              <p className="text-body">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-tint px-5 py-24">
        <div className="mx-auto max-w-[800px]">
          <div className="mb-12 text-center">
            <span className="mb-3.5 inline-block rounded-full bg-accent px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-ink">FAQ</span>
            <h2 className="text-3xl font-extrabold text-ink md:text-4xl">Frequently asked questions</h2>
          </div>
          <div className="space-y-3.5">
            {faqs.map((f, i) => (
              <details key={f.question} className="group overflow-hidden rounded-2xl border-2 border-ink bg-white" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 font-bold text-ink [&::-webkit-details-marker]:hidden">
                  {f.question}
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-accent transition-transform duration-300 group-open:rotate-45">
                    <Plus className="size-4" strokeWidth={3} />
                  </span>
                </summary>
                <p className="px-5 pb-5 text-body">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </Page>
  )
}
