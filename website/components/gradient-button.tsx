"use client"

import type React from "react"

import { forwardRef } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface GradientButtonProps extends React.ComponentPropsWithoutRef<typeof Button> {
  children: React.ReactNode
  className?: string
}

export const GradientButton = forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div className="relative group">
        <motion.div
          className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 opacity-70 blur-sm group-hover:opacity-100 transition duration-300"
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(139, 92, 246, 0)",
              "0 0 0 4px rgba(139, 92, 246, 0.3)",
              "0 0 0 0 rgba(139, 92, 246, 0)",
            ],
          }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />
        <Button
          ref={ref}
          size="lg"
          className={cn(
            "relative bg-black text-white border-0 hover:bg-black/80 transition-colors duration-300",
            className,
          )}
          {...props}
        >
          {children}
        </Button>
      </div>
    )
  },
)

GradientButton.displayName = "GradientButton"
