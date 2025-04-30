"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  avatar: string
  className?: string
}

export function TestimonialCard({ quote, author, role, avatar, className }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-purple-800/20 bg-black p-6 hover:border-purple-700/50 transition-colors duration-300",
        className,
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative z-10">
        <div className="mb-6 text-xl text-gray-300 italic">"{quote}"</div>
        <div className="flex items-center">
          <div className="mr-4 h-12 w-12 overflow-hidden rounded-full border border-purple-700/30">
            <Image
              src={avatar || "/placeholder.svg"}
              alt={author}
              width={48}
              height={48}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <div className="font-bold text-white">{author}</div>
            <div className="text-sm text-gray-400">{role}</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
