'use client'

import { useEffect, useRef, useId } from 'react'
import { useTheme } from 'next-themes'

export default function Mermaid({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const id = useId().replace(/:/g, '')
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    if (!ref.current) return
    const render = async () => {
      const mermaid = (await import('mermaid')).default
      mermaid.initialize({
        startOnLoad: false,
        theme: resolvedTheme === 'dark' ? 'dark' : 'default',
      })
      try {
        const { svg } = await mermaid.render(`m${id}`, chart)
        if (ref.current) ref.current.innerHTML = svg
      } catch {
        if (ref.current) ref.current.innerHTML = `<pre>${chart}</pre>`
      }
    }
    render()
  }, [chart, id, resolvedTheme])

  return <div ref={ref} className="my-4 flex justify-center overflow-x-auto" />
}
