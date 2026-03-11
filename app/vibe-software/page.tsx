import vibeSoftwareData from '@/data/vibeSoftwareData'
import Card from '@/components/Card'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Vibe Software',
  description: 'A showcase of vibe-coded software built with the power of AI',
})

export default function VibeSoftware() {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            Vibe Software
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            A showcase of vibe-coded software built with the power of AI
          </p>
        </div>
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            {vibeSoftwareData.map((d) => (
              <Card
                key={d.title}
                title={d.title}
                description={d.description}
                imgSrc={d.imgSrc}
                href={d.href}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
