import { ChevronDown, GraduationCap, Briefcase, BadgeCheck } from 'lucide-react'
import { Page, Footer } from '../components/Layout.jsx'
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
      <section className="relative px-6 pb-16 pt-16 text-center md:px-8 md:pt-24">
        <div className="absolute left-1/2 top-10 -z-0 size-96 -translate-x-1/2 rounded-full bg-glow/20 blur-3xl" />
        <div className="relative">
          <span className="inline-flex rounded-full bg-tint-2 px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-brand">Sourcing VA Training Services Membership</span>
          <h1 className="mx-auto mt-6 max-w-3xl text-5xl font-extrabold tracking-tight md:text-6xl">
            Membership that <span className="text-brand-bright">doesn't suck</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-body">
            Start free, explore the platform, and upgrade when you are ready for complete training access.
          </p>
        </div>
      </section>

      <section className="px-6 pb-20 md:px-8">
        <div className="mx-auto max-w-lg">
          <PlanCard featured />
        </div>
      </section>

      <section className="px-6 py-16 md:px-8">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
          {features.map(({ title, description, icon: Icon }) => (
            <div key={title} className="rounded-[2rem] bg-tint p-8 text-center">
              <div className="mx-auto mb-5 grid size-16 place-items-center rounded-full bg-tint-3 text-brand">
                <Icon className="size-8" />
              </div>
              <h3 className="text-2xl font-bold text-ink">{title}</h3>
              <p className="mt-4 leading-7 text-body">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-6 mb-20 rounded-[2rem] bg-white px-6 py-12 md:mx-auto md:max-w-4xl md:px-8">
        <h2 className="mb-10 text-center text-3xl font-extrabold tracking-tight text-ink">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <details key={f.question} className="group border-b border-line pb-4" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between py-2 text-sm font-bold text-ink [&::-webkit-details-marker]:hidden">
                {f.question}
                <ChevronDown className="size-5 text-brand-bright transition group-open:rotate-180" />
              </summary>
              <p className="mt-4 leading-7 text-body">{f.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </Page>
  )
}
