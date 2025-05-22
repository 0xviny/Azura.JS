"use client"

import { useLanguage } from "@/components/language-provider"
import { Globe, Globe2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-4 text-gray-200 p-2 rounded-md hover:text-white hover:bg-purple-900/20">
          <Globe2 className="inline-block h-5 w-5" />
          <span className="sr-only md:not-sr-only md:inline-block">{language === "en" ? "English" : "Português"}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-gray-900 border-gray-800">
        <DropdownMenuItem
          onClick={() => setLanguage("en")}
          className={language === "en" ? "font-bold text-purple-400" : "text-gray-300 hover:text-white"}
        >
          <span>English</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage("pt")}
          className={language === "pt" ? "font-bold text-purple-400" : "text-gray-300 hover:text-white"}
        >
          <span>Português</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
