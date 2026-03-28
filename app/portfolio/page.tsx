import portfolioData from '@/data/portfolioData'
import { genPageMetadata } from 'app/seo'
import Link from '@/components/Link'

export const metadata = genPageMetadata({
  title: 'Portfolio',
  description: 'A showcase of engineering and ML projects — production systems, models, and tools.',
})

function TechTag({ label }: { label: string }) {
  return (
    <span className="inline-block rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400">
      {label}
    </span>
  )
}

export default function Portfolio() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
          Portfolio
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Engineering and ML projects — production systems, models, and tools.
        </p>
      </div>

      <div className="py-12">
        <div className="grid gap-6 sm:grid-cols-2">
          {portfolioData.map((project) => (
            <Link
              key={project.title}
              href={project.href}
              className="group block rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-900/50 dark:hover:bg-gray-900"
            >
              <h2 className="group-hover:text-primary-600 dark:group-hover:text-primary-400 mb-2 text-lg font-bold text-gray-900 dark:text-gray-100">
                {project.title}
              </h2>
              <p className="mb-4 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <TechTag key={tag} label={tag} />
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
