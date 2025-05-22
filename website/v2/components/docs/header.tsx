"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Github, Menu, X, SearchIcon } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { useLanguage } from "@/components/language-provider";
import { Sidebar } from "@/components/docs/sidebar";
import { Search } from "@/components/docs/search";
import Image from "next/image";
import Link from "next/link";

export default function DocsHeader() {
  const { language, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const content = {
    en: {
      toggleMenu: "Toggle menu",
      toggleSearch: "Toggle search",
      documentation: "Documentation",
    },
    pt: {
      toggleMenu: "Alternar menu",
      toggleSearch: "Alternar pesquisa",
      documentation: "Documentação",
    },
  };

  const c = content[language];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-purple-900/20 bg-background/95 backdrop-blur-md">
        <div className="container flex items-center h-16">
          <div className="flex items-center gap-2 lg:gap-4">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={toggleMenu}>
              <Menu className="w-5 h-5" />
              <span className="sr-only">{c.toggleMenu}</span>
            </Button>

            <Link href="/" className="flex items-center">
              <Image
                src="/images/azura-logo.png"
                alt="Azura Logo"
                width={32}
                height={32}
                className="logo-shadow rounded-full"
              />
              <span className="ml-2 text-xl font-bold gradient-text hidden sm:inline-block">
                Azura
              </span>
            </Link>

            {/* <div className="hidden md:flex items-center h-full ml-4">
              <Link
                href="/docs"
                className="px-3 h-full flex items-center text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                {c.documentation}
              </Link>
            </div> */}
          </div>

          <div className="flex items-center ml-auto gap-4">
            {/* Search button for mobile and tablet */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleSearch}>
              <SearchIcon className="w-5 h-5" />
              <span className="sr-only">{c.toggleSearch}</span>
            </Button>

            {/* Search component for desktop */}
            <div className="hidden md:block mx-4 w-full max-w-md mr-12">
              <Search />
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              <LanguageToggle />
              <Button variant="ghost" size="icon" asChild>
                <a
                  href="https://github.com/0xviny/Azura.JS"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-foreground/80 hover:text-foreground transition-colors"
                >
                  <Github className="w-5 h-5" />
                  <span className="sr-only">GitHub</span>
                </a>
              </Button>
              <ModeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile search overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm p-4 flex items-start pt-20 md:hidden">
          <div className="w-full max-w-md mx-auto">
            <div className="relative">
              <Search onClose={() => setIsSearchOpen(false)} />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2"
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Menu móvel */}
      <div className={`${isMenuOpen ? "mobile-menu-open" : "hidden"}`} onClick={toggleMenu}>
        <div
          className={`mobile-menu ${
            isMenuOpen ? "mobile-menu-opened" : "mobile-menu-closed"
          } glass-effect`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center p-4 border-b border-purple-900/20">
            <div className="flex items-center">
              <Image
                src="/images/azura-logo.png"
                alt="Azura Logo"
                width={28}
                height={28}
                className="logo-shadow"
              />
              <h2 className="ml-2 text-lg font-bold gradient-text">Azura Docs</h2>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              <X className="w-5 h-5" />
            </Button>
          </div>
          <Sidebar className="w-full border-r-0" />
        </div>
      </div>
    </>
  );
}
