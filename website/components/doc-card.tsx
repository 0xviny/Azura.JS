"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface DocCardProps {
  icon: ReactNode
  title: string
  description: string
  href: string
  links?: Array<{ title: string; href: string }>
  className?: string
}

export function DocCard({ icon, title, description, href, links, className }: DocCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-purple-800/20 bg-black hover:border-purple-700/50 transition-colors duration-300",
        className,
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative z-10 p-6">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-950/50 text-purple-400 group-hover:bg-purple-900/50 group-hover:text-purple-300 transition-colors duration-300">
          {icon}
        </div>
        <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
        <p className="mb-6 text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{description}</p>

        {links && (
          <ul className="mb-6 space-y-2">
            {links.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.href}
                  className="text-purple-400 hover:text-purple-300 transition-colors duration-300 flex items-center"
                >
                  <ArrowRight className="mr-2 h-3 w-3" />
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        )}

        <Link
          href={href}
          className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors duration-300 font-medium"
        >
          Ver documentação
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  )
}
