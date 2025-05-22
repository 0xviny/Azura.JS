"use client";

import { useLanguage } from "@/components/language-provider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Server,
  Database,
  Lock,
  MessageSquare,
  Globe,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { AnimatedSection } from "@/components/ui/animated-section";
import { motion } from "framer-motion";

export default function ExamplesPage() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "Examples",
      subtitle: "Real-world examples and use cases for the Azura.JS Framework.",
      intro:
        "Explore these practical examples to learn how to build different types of applications with Azura. Each example demonstrates best practices and common patterns.",
      examples: [
        {
          title: "RESTful API",
          description: "A complete RESTful API with CRUD operations",
          icon: Server,
          link: "/docs/examples/rest-api",
        },
        {
          title: "E-commerce API",
          description: "Building a comprehensive e-commerce API with products, orders, and users",
          icon: ShoppingCart,
          link: "/docs/examples/real-world-api",
        },
        {
          title: "Realtime Chat",
          description: "Building a real-time chat application with WebSockets",
          icon: MessageSquare,
          link: "/docs/examples/realtime-chat",
        },
        {
          title: "Authentication",
          description: "JWT-based authentication with role-based access control",
          icon: Lock,
          link: "/docs/examples/authentication",
        },
        {
          title: "Database Integration",
          description: "Connecting to MongoDB, PostgreSQL, and other databases",
          icon: Database,
          link: "/docs/examples/database",
        },
        {
          title: "API Gateway",
          description: "Creating an API gateway to route requests to microservices",
          icon: Globe,
          link: "/docs/examples/api-gateway",
        },
      ],
      viewExample: "View Example",
    },
    pt: {
      title: "Exemplos",
      subtitle: "Exemplos do mundo real e casos de uso para o Azura.JS Framework.",
      intro:
        "Explore estes exemplos práticos para aprender como construir diferentes tipos de aplicações com Azura. Cada exemplo demonstra as melhores práticas e padrões comuns.",
      examples: [
        {
          title: "API RESTful",
          description: "Uma API RESTful completa com operações CRUD",
          icon: Server,
          link: "/docs/examples/rest-api",
        },
        {
          title: "API de E-commerce",
          description:
            "Construindo uma API de e-commerce abrangente com produtos, pedidos e usuários",
          icon: ShoppingCart,
          link: "/docs/examples/real-world-api",
        },
        {
          title: "Chat em Tempo Real",
          description: "Construindo uma aplicação de chat em tempo real com WebSockets",
          icon: MessageSquare,
          link: "/docs/examples/realtime-chat",
        },
        {
          title: "Autenticação",
          description: "Autenticação baseada em JWT com controle de acesso baseado em funções",
          icon: Lock,
          link: "/docs/examples/authentication",
        },
        {
          title: "Integração com Banco de Dados",
          description: "Conectando-se a MongoDB, PostgreSQL e outros bancos de dados",
          icon: Database,
          link: "/docs/examples/database",
        },
        {
          title: "API Gateway",
          description: "Criando um API gateway para rotear requisições para microsserviços",
          icon: Globe,
          link: "/docs/examples/api-gateway",
        },
      ],
      viewExample: "Ver Exemplo",
    },
  };

  const c = content[language];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

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

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3"
      >
        {c.examples.map((example, index) => (
          <motion.div key={index} variants={item}>
            <Card className="overflow-hidden transition-all hover:shadow-md hover:shadow-purple-900/20 hover:border-purple-800/50 border-gray-800 bg-gray-900/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <example.icon className="w-8 h-8 mb-2 text-purple-400" />
                <CardTitle>{example.title}</CardTitle>
                <CardDescription>{example.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  asChild
                  variant="link"
                  className="p-0 text-purple-400 hover:text-purple-300"
                >
                  <Link href={example.link}>
                    {c.viewExample} <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
