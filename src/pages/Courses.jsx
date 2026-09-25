import { Link } from 'react-router-dom'
import {
  Star, ArrowRight, Radio, GraduationCap, Users, Briefcase, Video, PlayCircle, RefreshCw,
  MessagesSquare, FileText, Award, CheckCircle2, ShieldCheck,
} from 'lucide-react'
import { Page, Footer, btn } from '../components/Layout.jsx'
import CourseCard, { CourseCover } from '../components/CourseCard.jsx'
import { courses } from '../data.js'

const whyCards = [
  { title: 'Expert Mentors', description: 'Learn directly from top-rated VAs with years of real-world agency experience.', icon: GraduationCap },
  { title: 'Community Access', description: 'Connect with a supportive global network of like-minded professionals in our private Slack.', icon: Users },
  { title: 'Career Support', description: 'Get help with resume building, portfolio creation, and interview preparation.', icon: Briefcase },
]

const advantages = [
  { title: 'Live Trainings', description: 'Weekly interactive sessions.', icon: Video },
  { title: 'Pre-recorded Lessons', description: 'Learn at your own pace.', icon: PlayCircle },
  { title: 'Training Updates', description: 'Lifetime access to updates.', icon: RefreshCw },
  { title: 'Community Access', description: 'Private networking space.', icon: MessagesSquare },
  { title: 'Files Access', description: 'Templates and checklists.', icon: FileText },
  { title: 'Certification', description: 'Industry recognized certificates.', icon: Award },
]

const plans = [
  { title: 'Monthly Explorer', price: '₱99', suffix: '/month', savings: 'SAVE 15%', button: 'Select Plan', features: ['Basic Course Library', 'Community Discord Access', 'Live Monthly Q&A'], featured: false },
  { title: 'Semi-Annual Pro', price: '₱499', suffix: '/6 months', savings: '', button: 'Start 6-Month Pro', features: ['Full Course Library Access', 'Priority Live Q&A Support', 'Career Coaching', 'Downloadable Templates'], featured: true },
]

export default function Courses() {
  return (
    <Page
      footer={
        <Footer
          description="Elevating virtual assistance through specialized training and global community support."
          copyright="© 2026 Sourcing VA Training Services. All rights reserved."
          links={[
            { text: 'Terms of Service', link: '#terms' },
            { text: 'Privacy Policy', link: '#privacy' },
            { text: 'Contact Support', link: '#support' },
            { text: 'Help Center', link: '#help' },
          ]}
        />
      }
    >
      {/* HERO */}
      <section className="mx-auto grid max-w-[1440px] items-center gap-12 px-6 py-16 md:px-8 lg:grid-cols-2 lg:py-20">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-tint-2 px-4 py-2 text-xs font-extrabold text-brand">
            <Star className="size-4 fill-accent text-accent" /> Trusted by 2,000+ Students
          </span>
          <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
            Master the Digital World with <span className="text-brand-bright">Sourcing VA Training Services</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-body">
            Join a supportive community designed for virtual assistants, digital marketers, and tech-driven professionals. Elevate your career with industry-standard training and live mentorship.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/subscription" className={btn.primary}>Get Started Now <ArrowRight className="size-4" /></Link>
            <a href="#courses" className={btn.outline}>Browse Courses</a>
          </div>
        </div>
        <div className="relative">
          <CourseCover course={courses[0]} className="h-80 shadow-[0_30px_70px_rgba(133,77,14,0.15)] md:h-96" />
          <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-brand-bright px-3 py-1.5 text-[11px] font-extrabold text-white">
            <Radio className="size-3.5 animate-pulse" /> LIVE NOW
          </span>
          <span className="absolute bottom-5 right-5 rounded-2xl bg-white px-4 py-3 text-lg font-extrabold text-brand shadow-xl">₱99/mo</span>
        </div>
      </section>

      {/* TRACKS */}
      <section id="courses" className="mx-auto max-w-[1440px] scroll-mt-24 px-6 py-12 md:px-8">
        <h2 className="text-3xl font-extrabold md:text-4xl">Diverse Training Tracks</h2>
        <p className="mt-3 text-body">Specialized modules tailored for every VA niche.</p>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {courses.map((c) => <CourseCard key={c.title} course={c} />)}
        </div>
      </section>

      {/* WHY */}
      <section className="bg-tint px-6 py-20 md:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-extrabold md:text-4xl">Why Choose Sourcing VA Training Services?</h2>
          <p className="mt-3 text-body">We provide more than just lessons; we provide a career path.</p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {whyCards.map(({ title, description, icon: Icon }) => (
              <div key={title} className="rounded-[2rem] bg-white p-8 text-left shadow-[0_12px_35px_rgba(32,28,16,0.05)]">
                <span className="grid size-14 place-items-center rounded-2xl bg-brand-bright text-white"><Icon className="size-7" /></span>
                <h3 className="mt-6 text-xl font-extrabold">{title}</h3>
                <p className="mt-3 leading-7 text-body">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ADVANTAGE */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:px-8 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-extrabold md:text-4xl">The Sourcing VA Advantage</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {advantages.map(({ title, description, icon: Icon }) => (
              <div key={title} className="flex items-start gap-3 rounded-2xl border border-tint-2 bg-white p-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-tint-3 text-brand"><Icon className="size-5" /></span>
                <div>
                  <p className="font-extrabold">{title}</p>
                  <p className="text-sm text-body">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80"
            alt="Learning community"
            className="h-96 w-full rounded-[2rem] object-cover"
          />
          <div className="absolute -bottom-6 -left-4 rounded-2xl bg-brand-bright px-6 py-4 text-white shadow-xl md:-left-8">
            <p className="text-3xl font-extrabold">98%</p>
            <p className="text-xs font-semibold text-white/85">Student Satisfaction Rate</p>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="px-6 py-20 md:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-extrabold md:text-4xl">Affordable Growth</h2>
          <p className="mt-3 text-body">Invest in your future without breaking the bank.</p>
          <div className="mt-12 grid gap-6 text-left md:grid-cols-2">
            {plans.map((p) => (
              <div key={p.title} className={`relative rounded-[2rem] p-8 ${p.featured ? 'bg-brand text-white shadow-2xl shadow-brand-deep/30' : 'border border-tint-2 bg-white'}`}>
                {p.savings && <span className="absolute right-6 top-6 rounded-full bg-accent px-3 py-1 text-[11px] font-extrabold text-accent-ink">{p.savings}</span>}
                <h3 className="text-xl font-extrabold">{p.title}</h3>
                <p className="mt-4">
                  <span className="text-5xl font-extrabold">{p.price}</span>
                  <span className={p.featured ? 'text-white/70' : 'text-muted'}>{p.suffix}</span>
                </p>
                <ul className="mt-6 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm font-semibold">
                      <CheckCircle2 className={`size-5 ${p.featured ? 'text-accent' : 'text-brand-bright'}`} /> {f}
                    </li>
                  ))}
                </ul>
                <Link to="/subscription" className={`mt-8 w-full ${p.featured ? 'inline-flex justify-center rounded-full bg-white px-7 py-3.5 text-sm font-extrabold text-brand transition hover:bg-accent hover:text-accent-ink' : btn.primary}`}>
                  {p.button}
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-6 rounded-[2rem] bg-tint p-8 text-left md:flex-row">
            <div className="flex items-center gap-4">
              <span className="grid size-14 shrink-0 place-items-center rounded-full bg-brand-bright text-white"><ShieldCheck className="size-7" /></span>
              <div>
                <p className="text-lg font-extrabold">100% Satisfaction Guarantee</p>
                <p className="text-sm text-body">If you're not satisfied within 14 days, get a full refund no questions asked.</p>
              </div>
            </div>
            <div className="flex gap-8">
              {[['4.9/5', 'Student Rating'], ['500+', 'Hired Graduates']].map(([v, l]) => (
                <div key={l} className="text-center">
                  <p className="text-2xl font-extrabold text-brand">{v}</p>
                  <p className="text-xs font-semibold text-body">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Page>
  )
}
