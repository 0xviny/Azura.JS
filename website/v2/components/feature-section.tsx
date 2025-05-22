"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Shield, Database, Layers, Gauge, PlugIcon as Plugin } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"

export default function FeatureSection() {
  const { language } = useLanguage()

  const content = {
    en: {
      title: "Why Choose Azura?",
      subtitle:
        "Azura combines the best features of modern API frameworks with a focus on developer experience and performance.",
      performance: {
        title: "High Performance",
        desc: "Built for speed with a lightweight core and optimized request handling.",
        content:
          "Azura's architecture is designed for minimal overhead, with cluster mode support for multi-core systems.",
      },
      security: {
        title: "Built-in Security",
        desc: "Secure your API with JWT authentication, API keys, and role-based access control.",
        content: "Protect your endpoints with decorators and middleware that handle authentication and authorization.",
      },
      database: {
        title: "Database Agnostic",
        desc: "Connect to any database with our unified adapter interface.",
        content:
          "Built-in support for MongoDB, PostgreSQL, and simple JSON storage, with a consistent API across all adapters.",
      },
      typescript: {
        title: "TypeScript First",
        desc: "Fully typed API with decorators and strong typing for better developer experience.",
        content:
          "Leverage the power of TypeScript with decorators, interfaces, and type definitions for safer, more maintainable code.",
      },
      scalable: {
        title: "Scalable Architecture",
        desc: "From simple APIs to complex microservices, Azura scales with your needs.",
        content:
          "Built-in support for clustering, load balancing, and horizontal scaling for high-traffic applications.",
      },
      plugins: {
        title: "Extensible Plugin System",
        desc: "Extend functionality with built-in and custom plugins.",
        content:
          "Add compression, CORS, rate limiting, and more with our plugin system. Create your own plugins to extend functionality.",
      },
    },
    pt: {
      title: "Por que escolher Azura?",
      subtitle:
        "Azura combina as melhores características dos frameworks de API modernos com foco na experiência do desenvolvedor e desempenho.",
      performance: {
        title: "Alto Desempenho",
        desc: "Construído para velocidade com um núcleo leve e manipulação otimizada de requisições.",
        content:
          "A arquitetura do Azura é projetada para mínima sobrecarga, com suporte ao modo cluster para sistemas multi-core.",
      },
      security: {
        title: "Segurança Integrada",
        desc: "Proteja sua API com autenticação JWT, chaves de API e controle de acesso baseado em funções.",
        content: "Proteja seus endpoints com decoradores e middleware que lidam com autenticação e autorização.",
      },
      database: {
        title: "Agnóstico de Banco de Dados",
        desc: "Conecte-se a qualquer banco de dados com nossa interface de adaptador unificada.",
        content:
          "Suporte integrado para MongoDB, PostgreSQL e armazenamento JSON simples, com uma API consistente em todos os adaptadores.",
      },
      typescript: {
        title: "TypeScript em Primeiro Lugar",
        desc: "API totalmente tipada com decoradores e tipagem forte para melhor experiência do desenvolvedor.",
        content:
          "Aproveite o poder do TypeScript com decoradores, interfaces e definições de tipo para código mais seguro e manutenível.",
      },
      scalable: {
        title: "Arquitetura Escalável",
        desc: "De APIs simples a microsserviços complexos, Azura escala com suas necessidades.",
        content:
          "Suporte integrado para clustering, balanceamento de carga e escalonamento horizontal para aplicações de alto tráfego.",
      },
      plugins: {
        title: "Sistema de Plugins Extensível",
        desc: "Estenda a funcionalidade com plugins integrados e personalizados.",
        content:
          "Adicione compressão, CORS, limitação de taxa e mais com nosso sistema de plugins. Crie seus próprios plugins para estender a funcionalidade.",
      },
    },
  }

  const c = content[language]
  const features = [
    { icon: Zap, ...c.performance },
    { icon: Shield, ...c.security },
    { icon: Database, ...c.database },
    { icon: Layers, ...c.typescript },
    { icon: Gauge, ...c.scalable },
    { icon: Plugin, ...c.plugins },
  ]

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
    <div className="py-12">
      <div className="text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-white"
        >
          {c.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto mt-4 text-lg text-gray-400"
        >
          {c.subtitle}
        </motion.p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-8 mt-12 md:grid-cols-2 lg:grid-cols-3"
      >
        {features.map((feature, index) => (
          <motion.div key={index} variants={item}>
            <Card className="h-full border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:bg-gray-900 transition-all duration-300">
              <CardHeader>
                <feature.icon className="w-10 h-10 mb-2 text-purple-400" />
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">{feature.content}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
