import { CheckCircle2 } from 'lucide-react'
import { btn } from './Layout.jsx'
import { Link } from 'react-router-dom'

export const amazonVaPlan = {
  title: 'Amazon VA Training',
  description: 'Unlock the complete Sourcing VA Training Services training experience and keep building momentum.',
  price: '₱1,299',
  originalPrice: '₱2,362',
  discount: '45% OFF',
  suffix: '/month',
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
    <div className={`relative flex flex-col rounded-[2rem] p-8 md:p-10 ${featured ? 'bg-gradient-to-br from-brand-bright to-brand-deep text-white shadow-2xl shadow-brand-deep/30' : 'border border-tint-2 bg-white'}`}>
      {featured && <span className="absolute -top-3 right-8 rounded-full bg-accent px-4 py-1.5 text-[11px] font-extrabold uppercase text-accent-ink shadow">Most Popular</span>}
      <h3 className="text-2xl font-extrabold">{plan.title}</h3>
      <p className={`mt-3 leading-7 ${featured ? 'text-white/80' : 'text-body'}`}>{plan.description}</p>
      {plan.originalPrice && (
        <div className="mt-6 flex items-center gap-3">
          <span className={`text-xl font-bold line-through ${featured ? 'text-white/60' : 'text-muted'}`}>{plan.originalPrice}</span>
          <span className="rounded-full bg-accent px-3 py-1 text-xs font-extrabold text-accent-ink">{plan.discount}</span>
        </div>
      )}
      <p className={plan.originalPrice ? 'mt-1' : 'mt-6'}>
        <span className="text-5xl font-extrabold">{plan.price}</span>
        <span className={featured ? 'text-white/70' : 'text-muted'}>{plan.suffix}</span>
      </p>
      <p className={`mt-6 text-sm font-extrabold ${featured ? 'text-accent' : 'text-brand'}`}>{plan.savings}</p>
      <ul className="mt-4 space-y-3">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm font-semibold">
            <CheckCircle2 className={`mt-0.5 size-5 shrink-0 ${featured ? 'text-accent' : 'text-brand-bright'}`} /> {f}
          </li>
        ))}
      </ul>
      <Link
        to="/checkout"
        className={`mt-10 w-full ${featured ? 'inline-flex justify-center rounded-full bg-white px-7 py-3.5 text-sm font-extrabold text-brand transition hover:bg-accent hover:text-accent-ink' : btn.primary}`}
      >
        {plan.button}
      </Link>
    </div>
  )
}
