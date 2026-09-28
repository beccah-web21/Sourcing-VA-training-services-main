import { ArrowRight, Check } from 'lucide-react'
import { cta } from './Layout.jsx'
import { Link } from 'react-router-dom'

export const amazonVaPlan = {
  title: 'Amazon VA Training',
  description: 'Unlock the complete Sourcing VA Training Services training experience and keep building momentum.',
  price: '₱1,299',
  originalPrice: '₱2,362',
  discount: '45% OFF',
  suffix: '',
  savings: "What's included",
  button: 'Join Now',
  features: [
    'Access to all courses',
    'Access to Paid Exclusive VA Courses',
    'Access to Live Trainings',
    'Community hub entry',
    'Weekly live Q&A sessions',
    'Certificates and hiring opportunities',
  ],
}

export default function PlanCard({ plan = amazonVaPlan, featured }) {
  return (
    <div className={`relative flex flex-col rounded-3xl border-2 border-ink p-8 text-ink shadow-[8px_8px_0_var(--color-ink)] md:p-10 ${featured ? 'bg-accent' : 'bg-white'}`}>
      {featured && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border-2 border-ink bg-white px-4 py-0.5 text-sm font-bold">
          Most Popular
        </span>
      )}
      <h3 className="text-2xl font-extrabold">{plan.title}</h3>
      <p className={`mt-3 leading-7 ${featured ? 'text-ink/75' : 'text-body'}`}>{plan.description}</p>
      {plan.originalPrice && (
        <div className="mt-6 flex items-center gap-3">
          <span className={`text-xl font-bold line-through ${featured ? 'text-ink/55' : 'text-muted'}`}>{plan.originalPrice}</span>
          <span className={`rounded-full border-2 border-ink px-3 py-0.5 text-xs font-extrabold ${featured ? 'bg-white' : 'bg-accent'}`}>{plan.discount}</span>
        </div>
      )}
      <p className={plan.originalPrice ? 'mt-1' : 'mt-6'}>
        <span className="text-5xl font-extrabold">{plan.price}</span>
        <span className={featured ? 'text-ink/70' : 'text-muted'}>{plan.suffix}</span>
      </p>
      <p className="mt-6 text-sm font-extrabold uppercase tracking-wider">{plan.savings}</p>
      <ul className="mt-4 space-y-2.5">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 font-medium">
            <span className={`grid size-6 shrink-0 place-items-center rounded-full border-2 border-ink ${featured ? 'bg-white' : 'bg-accent'}`}>
              <Check className="size-3.5" strokeWidth={3.5} />
            </span>
            {f}
          </li>
        ))}
      </ul>
      <Link to="/checkout" className={`mt-10 w-full ${featured ? cta.whiteRaised : cta.yellow}`}>
        {plan.button} <ArrowRight className="size-4" />
      </Link>
    </div>
  )
}
