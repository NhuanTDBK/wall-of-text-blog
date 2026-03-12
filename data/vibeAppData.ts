interface VibeApp {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const vibeAppData: VibeApp[] = [
  {
    title: 'Google Sheet → Markdown',
    description: `Copy cells from Google Sheets and instantly convert them into a clean Markdown table. Paste, convert, preview, and copy — no fuss.`,
    href: '/vibe-app/googlesheet-to-markdown',
  },
  {
    title: 'Car Park Locator',
    description: `Remember where you parked. Capture your GPS position, floor, zone, and slot number — and find your car in seconds.`,
    href: '/vibe-app/car-park-locator',
  },
]

export default vibeAppData
