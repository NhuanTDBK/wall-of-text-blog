export default function ToolLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col bg-white text-black dark:bg-gray-950 dark:text-white">
      {children}
    </div>
  )
}
