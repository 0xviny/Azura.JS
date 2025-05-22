"use client"

import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Server, Database, Lock, Code } from "lucide-react"
import Link from "next/link"
import { AnimatedSection } from "@/components/ui/animated-section"
import { motion } from "framer-motion"

export default function TutorialsPage() {
  const { language } = useLanguage()

  const content = {
    en: {
      title: "Interactive Tutorials",
      subtitle: "Step-by-step guides to help you learn Azura.JS Framework.",
      intro:
        "Our interactive tutorials provide hands-on learning experiences. Follow along with each step, run the code, and see the results in real-time.",
      tutorials: [
        {
          title: "Building Your First API",
          description: "Learn how to create a complete RESTful API with Azura",
          icon: Server,
          link: "/docs/tutorials/first-api",
          level: "Beginner",
          duration: "30 min",
        },
        {
          title: "Database Integration",
          description: "Connect your API to MongoDB and perform CRUD operations",
          icon: Database,
          link: "/docs/tutorials/database-integration",
          level: "Intermediate",
          duration: "45 min",
        },
        {
          title: "Authentication & Authorization",
          description: "Implement JWT authentication and role-based access control",
          icon: Lock,
          link: "/docs/tutorials/authentication",
          level: "Intermediate",
          duration: "60 min",
        },
        {
          title: "Advanced Routing",
          description: "Master advanced routing techniques and middleware",
          icon: Code,
          link: "/docs/tutorials/advanced-routing",
          level: "Advanced",
          duration: "45 min",
        },
      ],
      viewTutorial: "Start Tutorial",
      level: "Level",
      duration: "Duration",
    },
    pt: {
      title: "Tutoriais Interativos",
      subtitle: "Guias passo a passo para ajudá-lo a aprender o Azura.JS Framework.",
      intro:
        "Nossos tutoriais interativos fornecem experiências de aprendizado práticas. Acompanhe cada etapa, execute o código e veja os resultados em tempo real.",
      tutorials: [
        {
          title: "Construindo Sua Primeira API",
          description: "Aprenda como criar uma API RESTful completa com Azura",
          icon: Server,
          link: "/docs/tutorials/first-api",
          level: "Iniciante",
          duration: "30 min",
        },
        {
          title: "Integração com Banco de Dados",
          description: "Conecte sua API ao MongoDB e realize operações CRUD",
          icon: Database,
          link: "/docs/tutorials/database-integration",
          level: "Intermediário",
          duration: "45 min",
        },
        {
          title: "Autenticação e Autorização",
          description: "Implemente autenticação JWT e controle de acesso baseado em funções",
          icon: Lock,
          link: "/docs/tutorials/authentication",
          level: "Intermediário",
          duration: "60 min",
        },
        {
          title: "Roteamento Avançado",
          description: "Domine técnicas avançadas de roteamento e middleware",
          icon: Code,
          link: "/docs/tutorials/advanced-routing",
          level: "Avançado",
          duration: "45 min",
        },
      ],
      viewTutorial: "Iniciar Tutorial",
      level: "Nível",
      duration: "Duração",
    },
  }

  const c = content[language]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  }

  return (
    <div className="space-y-8">
      <AnimatedSection animation="fadeIn">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">{c.title}</h1>
          <p className="mt-2 text-lg text-gray-400">{c.subtitle}</p>
        </div>
      </AnimatedSection>

      <AnimatedSection animation="slideInFromLeft" delay={0.1}>
        <p className="text-lg">{c.intro}</p>
      </AnimatedSection>

      <motion.div variants={container} initial="hidden" animate="show" className="grid gap-6 mt-8 md:grid-cols-2">
        {c.tutorials.map((tutorial, index) => (
          <motion.div key={index} variants={item}>
            <Card className="overflow-hidden transition-all hover:shadow-md hover:shadow-purple-900/20 hover:border-purple-800/50 border-gray-800 bg-gray-900/50 backdrop-blur-sm h-full">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <tutorial.icon className="w-8 h-8 mb-2 text-purple-400" />
                  <div className="flex space-x-2">
                    <span className="inline-flex items-center rounded-full bg-purple-900/30 px-2.5 py-0.5 text-xs font-medium text-purple-300">
                      {tutorial.level}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-gray-800 px-2.5 py-0.5 text-xs font-medium text-gray-300">
                      {tutorial.duration}
                    </span>
                  </div>
                </div>
                <CardTitle>{tutorial.title}</CardTitle>
                <CardDescription>{tutorial.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <div className="flex items-center">
                  <BookOpen className="w-4 h-4 mr-1 text-gray-400" />
                  <span className="text-sm text-gray-400">
                    {c.level}: {tutorial.level}
                  </span>
                </div>
                <Button asChild variant="link" className="p-0 text-purple-400 hover:text-purple-300">
                  <Link href={tutorial.link}>
                    {c.viewTutorial} <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
