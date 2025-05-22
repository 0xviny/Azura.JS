"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Book, Code, Server, Database, Lock, Zap } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";

export default function DocsPage() {
  const { language, t } = useLanguage();

  const content = {
    en: {
      title: "Documentation",
      subtitle: "Welcome to the Azura.JS Framework documentation.",
      gettingStarted: "Getting Started",
      gettingStartedDesc: "Learn how to install and set up your first Azura API.",
      readGuide: "Read guide",
      coreConcepts: "Core Concepts",
      coreConceptsDesc: "Understand the key concepts and architecture of Azura.",
      exploreConcepts: "Explore concepts",
      serverRouting: "Server & Routing",
      serverRoutingDesc: "Learn how to define routes and handle requests.",
      viewDocs: "View documentation",
      database: "Database Integration",
      databaseDesc: "Connect to different databases with our adapters.",
      exploreAdapters: "Explore adapters",
      authentication: "Authentication",
      authenticationDesc: "Secure your API with JWT and API key authentication.",
      learnMore: "Learn more",
      plugins: "Plugins System",
      pluginsDesc: "Extend Azura with built-in and custom plugins.",
      discoverPlugins: "Discover plugins",
      needHelp: "Need help?",
      helpText:
        "If you can't find what you're looking for, please visit our community forums or open an issue on GitHub.",
    },
    pt: {
      title: "Documentação",
      subtitle: "Bem-vindo à documentação do Azura.JS Framework.",
      gettingStarted: "Primeiros Passos",
      gettingStartedDesc: "Aprenda como instalar e configurar sua primeira API Azura.",
      readGuide: "Ler guia",
      coreConcepts: "Conceitos Principais",
      coreConceptsDesc: "Entenda os conceitos-chave e a arquitetura do Azura.",
      exploreConcepts: "Explorar conceitos",
      serverRouting: "Servidor & Rotas",
      serverRoutingDesc: "Aprenda como definir rotas e lidar com requisições.",
      viewDocs: "Ver documentação",
      database: "Integração com Banco de Dados",
      databaseDesc: "Conecte-se a diferentes bancos de dados com nossos adaptadores.",
      exploreAdapters: "Explorar adaptadores",
      authentication: "Autenticação",
      authenticationDesc: "Proteja sua API com autenticação JWT e chaves de API.",
      learnMore: "Saiba mais",
      plugins: "Sistema de Plugins",
      pluginsDesc: "Estenda o Azura com plugins integrados e personalizados.",
      discoverPlugins: "Descobrir plugins",
      needHelp: "Precisa de ajuda?",
      helpText:
        "Se você não encontrar o que está procurando, visite nossos fóruns da comunidade ou abra uma issue no GitHub.",
    },
  };

  const c = content[language];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">{c.title}</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">{c.subtitle}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <Book className="w-8 h-8 mb-2 text-primary" />
            <CardTitle>{c.gettingStarted}</CardTitle>
            <CardDescription>{c.gettingStartedDesc}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="link" className="p-0">
              <Link href="/docs/getting-started">
                {c.readGuide} <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Code className="w-8 h-8 mb-2 text-primary" />
            <CardTitle>{c.coreConcepts}</CardTitle>
            <CardDescription>{c.coreConceptsDesc}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="link" className="p-0">
              <Link href="/docs/core-concepts">
                {c.exploreConcepts} <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Server className="w-8 h-8 mb-2 text-primary" />
            <CardTitle>{c.serverRouting}</CardTitle>
            <CardDescription>{c.serverRoutingDesc}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="link" className="p-0">
              <Link href="/docs/server">
                {c.viewDocs} <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Database className="w-8 h-8 mb-2 text-primary" />
            <CardTitle>{c.database}</CardTitle>
            <CardDescription>{c.databaseDesc}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="link" className="p-0">
              <Link href="/docs/database">
                {c.exploreAdapters} <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Lock className="w-8 h-8 mb-2 text-primary" />
            <CardTitle>{c.authentication}</CardTitle>
            <CardDescription>{c.authenticationDesc}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="link" className="p-0">
              <Link href="/docs/authentication">
                {c.learnMore} <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Zap className="w-8 h-8 mb-2 text-primary" />
            <CardTitle>{c.plugins}</CardTitle>
            <CardDescription>{c.pluginsDesc}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="link" className="p-0">
              <Link href="/docs/plugins">
                {c.discoverPlugins} <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="p-4 mt-8 rounded-lg bg-gray-50 dark:bg-gray-900">
        <h3 className="text-lg font-medium">{c.needHelp}</h3>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          {c.helpText}{" "}
          <a href="#" className="text-primary hover:underline">
            community forums
          </a>{" "}
          or{" "}
          <a href="#" className="text-primary hover:underline">
            open an issue
          </a>{" "}
          on GitHub.
        </p>
      </div>
    </div>
  );
}
