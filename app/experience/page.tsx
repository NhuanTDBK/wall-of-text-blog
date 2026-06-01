import experienceData, { WorkExperience, ExperienceProject } from '@/data/experienceData'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Experience' })

function TechBadge({ label }: { label: string }) {
  return (
    <span className="bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium">
      {label}
    </span>
  )
}

function ProjectCard({ project }: { project: ExperienceProject }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800/50">
      <h4 className="mb-1 text-base font-semibold text-gray-900 dark:text-gray-100">
        {project.name}
      </h4>
      <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">{project.description}</p>
      <ul className="mb-3 space-y-1.5">
        {project.highlights.map((highlight, i) => (
          <li key={i} className="flex gap-2 text-sm text-gray-600 dark:text-gray-300">
            <span className="bg-primary-500 mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" />
            <span dangerouslySetInnerHTML={{ __html: boldMetrics(highlight) }} />
          </li>
        ))}
      </ul>
      {project.tech && project.tech.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.tech.map((t) => (
            <TechBadge key={t} label={t} />
          ))}
        </div>
      )}
    </div>
  )
}

/** Wrap numbers+units and percent values in <strong> for visual emphasis */
function boldMetrics(text: string): string {
  return text.replace(
    /(\d[\d,]*(?:\.\d+)?(?:x|%|M|K|TB|GB|ms|B|\+)?(?:\s*(?:requests\/day|QPS|stars|per\s+\w+))?)/g,
    '<strong>$1</strong>'
  )
}

function ExperienceEntry({ experience, isLast }: { experience: WorkExperience; isLast: boolean }) {
  return (
    <div className="relative flex gap-6 pb-12">
      {/* Vertical line */}
      {!isLast && (
        <div className="absolute top-10 bottom-0 left-[19px] w-0.5 bg-gray-200 dark:bg-gray-700" />
      )}

      {/* Timeline dot */}
      <div className="border-primary-500 relative z-10 mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 bg-white shadow dark:bg-gray-900">
        <div className="bg-primary-500 h-3 w-3 rounded-full" />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        {/* Header */}
        <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {experience.role}
            </h3>
            {experience.company && (
              <p className="text-primary-600 dark:text-primary-400 text-lg font-semibold">
                {experience.company}
              </p>
            )}
            {experience.summary && (
              <p className="mt-1 text-sm text-gray-500 italic dark:text-gray-400">
                {experience.summary}
              </p>
            )}
          </div>
          <div className="text-right text-sm text-gray-500 sm:shrink-0 dark:text-gray-400">
            <div className="font-medium">{experience.period}</div>
            <div>{experience.location}</div>
          </div>
        </div>

        {/* Projects grid */}
        <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
          {experience.projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ExperiencePage() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
          Experience
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          8+ years building ML systems at scale — from semantic search to recommendation engines.
        </p>
      </div>

      <div className="pt-10">
        {experienceData.map((exp, idx) => (
          <ExperienceEntry
            key={exp.company + exp.period}
            experience={exp}
            isLast={idx === experienceData.length - 1}
          />
        ))}
      </div>
    </div>
  )
}
