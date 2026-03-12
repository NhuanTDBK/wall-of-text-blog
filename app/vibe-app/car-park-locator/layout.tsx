import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Car Park Locator',
  description: 'Remember where you parked — capture GPS, floor, zone, and slot number instantly.',
})

export default function CarParkLocatorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-white text-black dark:bg-gray-950 dark:text-white">
      {children}
    </div>
  )
}
