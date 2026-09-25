import { Link } from 'react-router-dom'
import { CheckCircle2, Mail } from 'lucide-react'
import { Page } from '../components/Layout.jsx'
import { amazonVaPlan } from '../components/PlanCard.jsx'

export default function CheckoutSuccess() {
  return (
    <Page>
      <section className="px-6 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-xl rounded-[2.5rem] bg-white p-10 text-center shadow-[0_30px_70px_rgba(133,77,14,0.12)]">
          <span className="mx-auto grid size-20 place-items-center rounded-full bg-tint-3 text-brand"><CheckCircle2 className="size-11" /></span>
          <h1 className="mt-6 text-3xl font-extrabold md:text-4xl">Payment successful!</h1>
          <p className="mt-4 leading-7 text-body">
            Welcome to <b className="text-ink">{amazonVaPlan.title}</b>. Your payment was received and a receipt has been sent to your email.
          </p>
          <p className="mx-auto mt-6 flex max-w-sm items-center gap-3 rounded-2xl bg-tint p-4 text-left text-sm font-semibold text-body">
            <Mail className="size-5 shrink-0 text-brand-bright" /> We will email your course access details shortly.
          </p>
          <Link to="/" className="mt-8 inline-flex rounded-full bg-brand-bright px-8 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-brand-bright/25 transition hover:bg-brand">Back to Home</Link>
        </div>
      </section>
    </Page>
  )
}
