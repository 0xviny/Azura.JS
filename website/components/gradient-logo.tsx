"use client"

import { motion } from "framer-motion"
import { Flame } from "lucide-react"

interface GradientLogoProps {
  size?: number
}

export function GradientLogo({ size = 60 }: GradientLogoProps) {
  return (
    <motion.div
      className="relative"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 rounded-full blur-xl bg-gradient-to-br from-purple-500 to-purple-700 opacity-70"></div>
      <div className="relative flex items-center justify-center rounded-full bg-black p-3 border border-purple-700/50">
        <Flame className="text-purple-500" size={size} />
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(139, 92, 246, 0.4)",
              "0 0 0 10px rgba(139, 92, 246, 0)",
              "0 0 0 0 rgba(139, 92, 246, 0)",
            ],
          }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />
      </div>
    </motion.div>
  )
}
