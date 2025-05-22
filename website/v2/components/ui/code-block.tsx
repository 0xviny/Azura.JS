import type React from "react"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
  children: React.ReactNode
  language?: string
  className?: string
}

export function CodeBlock({ children, language = "typescript", className }: CodeBlockProps) {
  return (
    <div className={cn("relative rounded-md overflow-hidden", className)}>
      <div className="absolute top-0 right-0 px-4 py-1 text-xs text-gray-400 bg-gray-800 rounded-bl">{language}</div>
      <pre className="p-4 overflow-x-auto text-sm bg-gray-900 rounded-md text-gray-300">
        <code>{children}</code>
      </pre>
    </div>
  )
}
