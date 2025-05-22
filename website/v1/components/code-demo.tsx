"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface CodeDemoProps {
  title?: string
  description?: string
  language: string
  code: string
  showLineNumbers?: boolean
}

export function CodeDemo({ title, description, language, code, showLineNumbers = true }: CodeDemoProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="relative group"
    >
      {(title || description) && (
        <div className="mb-3">
          {title && <h3 className="text-xl font-bold text-white mb-1">{title}</h3>}
          {description && <p className="text-gray-400">{description}</p>}
        </div>
      )}

      <div className="relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/20 to-purple-800/20 rounded-xl blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative bg-black rounded-xl overflow-hidden border border-purple-700/30">
          <div className="flex items-center justify-between px-4 py-2 bg-gray-950 border-b border-gray-800">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-sm text-gray-500 font-mono">{language}</div>
          </div>
          <pre className={cn("text-sm overflow-x-auto p-4", showLineNumbers && "pl-12")}>
            <code className={`language-${language}`}>
              {code.split("\n").map((line, i) => (
                <div key={i} className="table-row">
                  {showLineNumbers && (
                    <span className="table-cell text-right pr-4 select-none text-gray-600 text-xs">{i + 1}</span>
                  )}
                  <span className="table-cell text-gray-300">{line}</span>
                </div>
              ))}
            </code>
          </pre>
          <button
            onClick={copyToClipboard}
            className="absolute top-3 right-3 p-2 rounded-md bg-gray-800/80 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Copy code"
          >
            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </motion.div>
  )
}
