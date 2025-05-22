"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import * as animations from "@/lib/animations"

type AnimationType = keyof typeof animations

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  animation?: AnimationType
  delay?: number
  duration?: number
}

export function AnimatedSection({
  children,
  className,
  animation = "fadeIn",
  delay = 0,
  duration = 0.5,
}: AnimatedSectionProps) {
  const animationProps = animations[animation]

  return (
    <motion.div
      initial={animationProps.initial}
      animate={animationProps.animate}
      exit={animationProps.exit}
      transition={{
        delay,
        duration,
        ...animationProps.animate?.transition,
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

export function AnimatedContainer({ children, className, animation = "staggerContainer" }: AnimatedSectionProps) {
  const animationProps = animations[animation]

  return (
    <motion.div
      initial={animationProps.initial}
      animate={animationProps.animate}
      exit={animationProps.exit}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
