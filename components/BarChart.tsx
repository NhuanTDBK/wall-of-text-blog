interface BarItem {
  label: string
  value: number
  highlight?: boolean
}

interface BarChartProps {
  title: string
  unit?: string
  items: BarItem[]
  note?: string
}

const CHART_HEIGHT = 180

const formatValue = (value: number, unit: string) =>
  `${value < 10 ? value.toFixed(1) : Math.round(value)} ${unit}`

const BarChart = ({ title, unit = 'ms', items, note }: BarChartProps) => {
  const max = Math.max(...items.map((item) => item.value))
  const baseline = items[0].value

  return (
    <figure className="my-8 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
      <figcaption className="mb-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
        {title}
      </figcaption>
      <div className="flex gap-3 border-b border-gray-300 dark:border-gray-600">
        {items.map((item) => {
          const speedup = baseline / item.value
          const showSpeedup = item !== items[0] && speedup >= 1.05
          return (
            <div
              key={item.label}
              className="flex flex-1 flex-col items-center justify-end"
              style={{ height: CHART_HEIGHT + 40 }}
              title={`${item.label}: ${formatValue(item.value, unit)}`}
            >
              <span className="text-xs font-medium text-gray-900 dark:text-gray-100">
                {formatValue(item.value, unit)}
              </span>
              <span className="mb-1 h-4 text-xs text-gray-600 dark:text-gray-400">
                {showSpeedup
                  ? `${speedup >= 10 ? Math.round(speedup) : speedup.toFixed(1)}x faster`
                  : ''}
              </span>
              <div
                className={`w-full max-w-[64px] rounded-t ${
                  item.highlight ? 'bg-blue-600 dark:bg-blue-400' : 'bg-gray-400 dark:bg-gray-500'
                }`}
                style={{ height: `max(${(item.value / max) * CHART_HEIGHT}px, 3px)` }}
              />
            </div>
          )
        })}
      </div>
      <div className="mt-2 flex gap-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex-1 text-center text-xs text-gray-600 dark:text-gray-400"
          >
            {item.label}
          </div>
        ))}
      </div>
      {note && <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">{note}</p>}
    </figure>
  )
}

export default BarChart
