'use client'

import { useState, useCallback } from 'react'

/**
 * Parses TSV (tab-separated) input from Google Sheets.
 * Handles quoted fields that contain embedded newlines, tabs, and quotes.
 */
function parseTSV(input: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let cell = ''
  let inQuotes = false
  let i = 0

  while (i < input.length) {
    const ch = input[i]

    if (inQuotes) {
      if (ch === '"') {
        // Escaped quote ("") → literal quote character
        if (input[i + 1] === '"') {
          cell += '"'
          i += 2
        } else {
          // Closing quote
          inQuotes = false
          i++
        }
      } else {
        cell += ch
        i++
      }
    } else {
      if (ch === '"') {
        inQuotes = true
        i++
      } else if (ch === '\t') {
        row.push(cell)
        cell = ''
        i++
      } else if (ch === '\n' || (ch === '\r' && input[i + 1] === '\n')) {
        row.push(cell)
        cell = ''
        if (row.some((c) => c.trim() !== '')) rows.push(row)
        row = []
        i += ch === '\r' ? 2 : 1
      } else if (ch === '\r') {
        row.push(cell)
        cell = ''
        if (row.some((c) => c.trim() !== '')) rows.push(row)
        row = []
        i++
      } else {
        cell += ch
        i++
      }
    }
  }

  // Flush last cell/row
  if (cell || row.length > 0) {
    row.push(cell)
    if (row.some((c) => c.trim() !== '')) rows.push(row)
  }

  return rows
}

function convertToMarkdown(input: string): string {
  const rows = parseTSV(input)
  if (rows.length === 0) return ''

  const colCount = Math.max(...rows.map((row) => row.length))

  // Pad rows to same column count
  const normalized = rows.map((row) => {
    const padded = [...row]
    while (padded.length < colCount) padded.push('')
    return padded
  })

  // Collapse internal newlines to a space and escape pipes
  const escape = (cell: string) => cell.trim().replace(/\r?\n/g, ' ').replace(/\|/g, '\\|')

  const header = `| ${normalized[0].map(escape).join(' | ')} |`
  const separator = `| ${Array(colCount).fill('---').join(' | ')} |`
  const body = normalized
    .slice(1)
    .map((row) => `| ${row.map(escape).join(' | ')} |`)
    .join('\n')

  return [header, separator, ...(body ? [body] : [])].join('\n')
}

export default function GoogleSheetToMarkdown() {
  const [input, setInput] = useState('')
  const [copied, setCopied] = useState(false)

  const output = input.trim() ? convertToMarkdown(input) : ''

  const handleCopy = useCallback(async () => {
    if (!output) return
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [output])

  const handleClear = () => {
    setInput('')
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      {/* Header bar */}
      <div className="flex shrink-0 items-center justify-between border-b border-gray-200 px-6 py-3 dark:border-gray-700">
        <div>
          <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">
            Google Sheet → Markdown
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Copy cells from Google Sheets, paste below, and get a Markdown table instantly.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {input && (
            <button
              onClick={handleClear}
              className="text-sm text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-200"
            >
              Clear
            </button>
          )}
          <button
            onClick={handleCopy}
            disabled={!output}
            className="bg-primary-500 hover:bg-primary-600 inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-40"
          >
            {copied ? (
              <>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Copy Markdown
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main panels */}
      <div className="flex flex-1 divide-x divide-gray-200 overflow-hidden dark:divide-gray-700">
        {/* Left: Input */}
        <div className="flex w-1/2 flex-col overflow-hidden">
          <div className="shrink-0 border-b border-gray-200 bg-gray-50 px-4 py-2 dark:border-gray-700 dark:bg-gray-800">
            <span className="text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
              Paste from Google Sheets
            </span>
          </div>
          <textarea
            className="w-full flex-1 resize-none bg-white px-4 py-3 font-mono text-sm text-gray-900 placeholder-gray-400 focus:outline-none dark:bg-gray-900 dark:text-gray-100"
            placeholder="Select and copy cells from Google Sheets (Ctrl+C / Cmd+C), then paste here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
          />
        </div>

        {/* Right: Output + Preview stacked */}
        <div className="flex w-1/2 flex-col divide-y divide-gray-200 overflow-hidden dark:divide-gray-700">
          {/* Markdown output */}
          <div className="flex h-1/2 flex-col overflow-hidden">
            <div className="shrink-0 border-b border-gray-200 bg-gray-50 px-4 py-2 dark:border-gray-700 dark:bg-gray-800">
              <span className="text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
                Markdown Table
              </span>
            </div>
            <textarea
              className="w-full flex-1 resize-none bg-gray-50 px-4 py-3 font-mono text-sm text-gray-900 focus:outline-none dark:bg-gray-800/50 dark:text-gray-100"
              readOnly
              value={output}
              placeholder="Your markdown table will appear here..."
            />
          </div>

          {/* Preview */}
          <div className="flex h-1/2 flex-col overflow-hidden">
            <div className="shrink-0 border-b border-gray-200 bg-gray-50 px-4 py-2 dark:border-gray-700 dark:bg-gray-800">
              <span className="text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
                Preview
              </span>
            </div>
            <div className="flex-1 overflow-auto p-4">
              {output ? (
                <MarkdownTablePreview markdown={output} />
              ) : (
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  Table preview will appear here...
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MarkdownTablePreview({ markdown }: { markdown: string }) {
  const lines = markdown.split('\n').filter(Boolean)
  if (lines.length < 2) return null

  const parseRow = (line: string) =>
    line
      .slice(1, -1) // remove leading/trailing |
      .split('|')
      .map((cell) => cell.trim())

  const headers = parseRow(lines[0])
  const rows = lines.slice(2).map(parseRow)

  return (
    <table className="min-w-full text-left text-sm">
      <thead>
        <tr className="border-b border-gray-200 dark:border-gray-700">
          {headers.map((h, i) => (
            <th
              key={i}
              className="px-4 py-2 font-semibold whitespace-nowrap text-gray-900 dark:text-gray-100"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, ri) => (
          <tr
            key={ri}
            className="border-b border-gray-100 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800/50"
          >
            {row.map((cell, ci) => (
              <td key={ci} className="px-4 py-2 whitespace-nowrap text-gray-700 dark:text-gray-300">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
