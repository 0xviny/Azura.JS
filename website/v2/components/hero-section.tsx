"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Github } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { LanguageToggle } from "@/components/language-toggle"
import { AnimatedSection, AnimatedContainer } from "@/components/ui/animated-section"
import { motion } from "framer-motion"

export default function HeroSection() {
  const { language } = useLanguage()

  const content = {
    en: {
      title: "Azura.JS Framework",
      subtitle: "Modern. Fast. Scalable.",
      description:
        "Build powerful, scalable APIs with less code. Azura provides a modern, TypeScript-first framework for building high-performance APIs.",
      getStarted: "Get Started",
      installCommand: "npm install @atosjs/azura",
    },
    pt: {
      title: "Azura.JS Framework",
      subtitle: "Moderno. Rápido. Escalável.",
      description:
        "Construa APIs poderosas e escaláveis com menos código. Azura fornece um framework moderno, com TypeScript em primeiro lugar, para construir APIs de alto desempenho.",
      getStarted: "Começar",
      installCommand: "npm install @atosjs/azura",
    },
  }

  const c = content[language]

  return (
    <div className="relative overflow-hidden bg-black dark:bg-black text-white">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-800/30 via-transparent to-transparent"></div>
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "60px 60px"],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 10,
            ease: "linear",
          }}
        />
      </div>
      <div className="container relative z-10 px-4 py-32 mx-auto text-center">
        <div className="absolute top-4 right-4">
          <LanguageToggle />
        </div>
        <AnimatedContainer>
          <AnimatedSection animation="slideInFromTop">
            <h1 className="text-5xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl">
              <span className="block">{c.title}</span>
              <span className="block mt-2 text-purple-400">{c.subtitle}</span>
            </h1>
          </AnimatedSection>

          <AnimatedSection animation="fadeIn" delay={0.2}>
            <p className="max-w-2xl mx-auto mt-6 text-xl text-gray-300">{c.description}</p>
          </AnimatedSection>

          <AnimatedSection animation="slideInFromBottom" delay={0.4}>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
              <Button asChild size="lg" className="px-8 py-6 text-lg bg-purple-700 hover:bg-purple-800 text-white">
                <a href="/docs/getting-started">
                  {c.getStarted} <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="px-8 py-6 text-lg border-purple-700 text-purple-400 hover:bg-purple-900/20"
              >
                <a href="https://github.com/0xviny/Azura.JS" target="_blank" rel="noreferrer noopener">
                  <Github className="w-5 h-5 mr-2" /> GitHub
                </a>
              </Button>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="scaleUp" delay={0.6}>
            <div className="mt-16">
              <div className="p-4 text-sm text-left bg-gray-900 rounded-lg text-gray-300 border border-gray-800 shadow-lg">
                <pre className="font-mono">
                  <code>{c.installCommand}</code>
                </pre>
              </div>
            </div>
          </AnimatedSection>
        </AnimatedContainer>
      </div>
    </div>
  )
}
