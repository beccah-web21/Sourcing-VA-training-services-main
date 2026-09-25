import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen } from 'lucide-react'

export function CourseCover({ course, className = '' }) {
  return (
    <div className={`relative overflow-hidden rounded-[1.5rem] ${className}`} style={{ background: `linear-gradient(135deg, ${course.bg}, #ffffff)` }}>
      <div className="absolute -right-6 -top-6 size-28 rounded-full opacity-20" style={{ background: course.accent }} />
      <div className="absolute -bottom-10 -left-8 size-32 rounded-full opacity-10" style={{ background: course.accent }} />
      <div className="relative m-5 rounded-2xl bg-white/80 p-5">
        <div className="h-2.5 w-24 rounded-full opacity-30" style={{ background: course.accent }} />
        <div className="mt-3 h-3 w-4/5 rounded-full bg-brand/10" />
        <div className="mt-2 h-2.5 w-3/5 rounded-full bg-brand/10" />
        <p className="mt-5 text-lg font-extrabold leading-tight text-ink">{course.short}</p>
        <p className="text-xs font-semibold text-body">{course.sub}</p>
      </div>
    </div>
  )
}

export default function CourseCard({ course }) {
  return (
    <article className="group flex flex-col rounded-[2rem] bg-white p-4 shadow-[0_12px_35px_rgba(32,28,16,0.06)] transition hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(249,115,22,0.15)]">
      <CourseCover course={course} className="h-44" />
      <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
        <span className="w-fit rounded-full bg-tint px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-brand">{course.category}</span>
        <h3 className="mt-3 text-lg font-extrabold leading-snug text-ink">{course.title}</h3>
        <p className="mt-2 text-sm leading-6 text-body">{course.description}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase text-muted">
            <BookOpen className="size-4" /> {course.meta}
          </span>
          <Link to="/courses" className="inline-flex items-center gap-1 rounded-full bg-brand-bright px-4 py-2 text-xs font-extrabold text-white transition group-hover:bg-brand">
            View Course <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </article>
  )
}
