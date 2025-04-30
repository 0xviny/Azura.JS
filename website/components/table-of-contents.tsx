"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface TableOfContentsItem {
  id: string
  title: string
  level: number
}

interface TableOfContentsProps {
  items: TableOfContentsItem[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "0px 0px -80% 0px" },
    )

    items.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      items.forEach((item) => {
        const element = document.getElementById(item.id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [items])

  return (
    <div className="space-y-4">
      <div className="text-sm font-medium text-gray-400 uppercase tracking-wider">Nesta página</div>
      <nav className="space-y-1">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={cn(
              "flex text-sm py-1 transition-colors",
              item.level === 2 ? "pl-0" : "pl-4",
              activeId === item.id ? "text-purple-400" : "text-gray-400 hover:text-gray-300",
            )}
            style={{
              scrollBehavior: "smooth",
            }}
          >
            {item.title}
          </a>
        ))}
      </nav>
    </div>
  )
}
