"use client";

import type React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Book,
  Server,
  Database,
  Lock,
  Zap,
  Code,
  Package,
  Layers,
  Settings,
  FileText,
  Globe,
  MessageSquare,
  ShoppingCart,
  Bell,
  Users,
  BookOpen,
  Play,
} from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import Image from "next/image";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const { language } = useLanguage();
  const pathname = usePathname();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    examples: pathname?.startsWith("/docs/examples") || false,
    database: pathname?.startsWith("/docs/database") || false,
    coreConcepts: pathname?.startsWith("/docs/core-concepts") || false,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const content = {
    en: {
      docs: "Azura Docs",
      gettingStarted: "Getting Started",
      installation: "Installation",
      coreConcepts: "Core Concepts",
      essentials: "Essentials",
      serverRouting: "Server & Routing",
      database: "Database",
      authentication: "Authentication",
      plugins: "Plugins",
      advanced: "Advanced",
      middleware: "Middleware",
      websockets: "WebSockets",
      configuration: "Configuration",
      apiReference: "API Reference",
      examples: "Examples",
      restApi: "RESTful API",
      ecommerceApi: "E-commerce API",
      realtimeChat: "Realtime Chat",
      deployment: "Deployment",
      whatsNew: "What's New",
      community: "Community",
      tutorials: "Tutorials",
      architecture: "Architecture",
      mongodbDemo: "MongoDB Demo",
    },
    pt: {
      docs: "Docs Azura",
      gettingStarted: "Primeiros Passos",
      installation: "Instalação",
      coreConcepts: "Conceitos Principais",
      essentials: "Essenciais",
      serverRouting: "Servidor & Rotas",
      database: "Banco de Dados",
      authentication: "Autenticação",
      plugins: "Plugins",
      advanced: "Avançado",
      middleware: "Middleware",
      websockets: "WebSockets",
      configuration: "Configuração",
      apiReference: "Referência da API",
      examples: "Exemplos",
      restApi: "API RESTful",
      ecommerceApi: "API de E-commerce",
      realtimeChat: "Chat em Tempo Real",
      deployment: "Implantação",
      whatsNew: "Novidades",
      community: "Comunidade",
      tutorials: "Tutoriais",
      architecture: "Arquitetura",
      mongodbDemo: "Demo MongoDB",
    },
  };

  const c = content[language];

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <div className={cn("pb-12 w-64 border-r border-purple-900/20 sidebar-gradient", className)}>
      <div className="px-3 py-4">
        {/* <Link href="/" className="flex items-center px-2 py-2 mb-6">
          <Image
            src="/images/azura-logo.png"
            alt="Azura Logo"
            width={32}
            height={32}
            className="logo-shadow"
          />
          <span className="ml-2 text-xl font-bold gradient-text">{c.docs}</span>
        </Link> */}
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="px-2 py-2">
            <h2 className="px-4 py-2 mb-2 text-lg font-semibold gradient-text">
              {c.gettingStarted}
            </h2>
            <div className="space-y-1">
              <Button
                variant={isActive("/docs/getting-started") ? "secondary" : "ghost"}
                className={cn(
                  "justify-start w-full",
                  isActive("/docs/getting-started")
                    ? "bg-purple-900/20 text-purple-400 hover:bg-purple-900/30 hover:text-purple-300"
                    : "text-gray-400 hover:text-white hover:bg-purple-900/10"
                )}
                asChild
              >
                <Link href="/docs/getting-started">
                  <Book className="w-4 h-4 mr-2" />
                  {c.installation}
                </Link>
              </Button>
              <Collapsible
                open={openSections.coreConcepts}
                onOpenChange={() => toggleSection("coreConcepts")}
                className="space-y-1"
              >
                <div className="flex items-center">
                  <CollapsibleTrigger asChild>
                    <Button
                      variant={isActive("/docs/core-concepts") ? "secondary" : "ghost"}
                      className={cn(
                        "justify-start w-full",
                        isActive("/docs/core-concepts")
                          ? "bg-purple-900/20 text-purple-400 hover:bg-purple-900/30 hover:text-purple-300"
                          : "text-gray-400 hover:text-white hover:bg-purple-900/10"
                      )}
                    >
                      <Code className="w-4 h-4 mr-2" />
                      {c.coreConcepts}
                      {openSections.coreConcepts ? (
                        <ChevronDown className="ml-auto h-4 w-4" />
                      ) : (
                        <ChevronRight className="ml-auto h-4 w-4" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="space-y-1 pl-6">
                  <Button
                    variant={isActive("/docs/core-concepts/architecture") ? "secondary" : "ghost"}
                    className={cn(
                      "justify-start w-full",
                      isActive("/docs/core-concepts/architecture")
                        ? "bg-purple-900/20 text-purple-400 hover:bg-purple-900/30 hover:text-purple-300"
                        : "text-gray-400 hover:text-white hover:bg-purple-900/10"
                    )}
                    asChild
                  >
                    <Link href="/docs/core-concepts/architecture">
                      <Layers className="w-4 h-4 mr-2" />
                      {c.architecture}
                    </Link>
                  </Button>
                </CollapsibleContent>
              </Collapsible>
              <Button
                variant={isActive("/docs/whats-new") ? "secondary" : "ghost"}
                className={cn(
                  "justify-start w-full",
                  isActive("/docs/whats-new")
                    ? "bg-purple-900/20 text-purple-400 hover:bg-purple-900/30 hover:text-purple-300"
                    : "text-gray-400 hover:text-white hover:bg-purple-900/10"
                )}
                asChild
              >
                <Link href="/docs/whats-new">
                  <Bell className="w-4 h-4 mr-2" />
                  {c.whatsNew}
                </Link>
              </Button>
              <Button
                variant={isActive("/docs/tutorials") ? "secondary" : "ghost"}
                className={cn(
                  "justify-start w-full",
                  isActive("/docs/tutorials")
                    ? "bg-purple-900/20 text-purple-400 hover:bg-purple-900/30 hover:text-purple-300"
                    : "text-gray-400 hover:text-white hover:bg-purple-900/10"
                )}
                asChild
              >
                <Link href="/docs/tutorials">
                  <BookOpen className="w-4 h-4 mr-2" />
                  {c.tutorials}
                </Link>
              </Button>
            </div>
          </div>
          <div className="px-2 py-2">
            <h2 className="px-4 py-2 mb-2 text-lg font-semibold gradient-text">{c.essentials}</h2>
            <div className="space-y-1">
              <Button
                variant={isActive("/docs/server") ? "secondary" : "ghost"}
                className={cn(
                  "justify-start w-full",
                  isActive("/docs/server")
                    ? "bg-purple-900/20 text-purple-400 hover:bg-purple-900/30 hover:text-purple-300"
                    : "text-gray-400 hover:text-white hover:bg-purple-900/10"
                )}
                asChild
              >
                <Link href="/docs/server">
                  <Server className="w-4 h-4 mr-2" />
                  {c.serverRouting}
                </Link>
              </Button>
              <Collapsible
                open={openSections.database}
                onOpenChange={() => toggleSection("database")}
                className="space-y-1"
              >
                <div className="flex items-center">
                  <CollapsibleTrigger asChild>
                    <Button
                      variant={isActive("/docs/database") ? "secondary" : "ghost"}
                      className={cn(
                        "justify-start w-full",
                        isActive("/docs/database")
                          ? "bg-purple-900/20 text-purple-400 hover:bg-purple-900/30 hover:text-purple-300"
                          : "text-gray-400 hover:text-white hover:bg-purple-900/10"
                      )}
                    >
                      <Database className="w-4 h-4 mr-2" />
                      {c.database}
                      {openSections.database ? (
                        <ChevronDown className="ml-auto h-4 w-4" />
                      ) : (
                        <ChevronRight className="ml-auto h-4 w-4" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="space-y-1 pl-6">
                  <Button
                    variant={isActive("/docs/database/mongodb-demo") ? "secondary" : "ghost"}
                    className={cn(
                      "justify-start w-full",
                      isActive("/docs/database/mongodb-demo")
                        ? "bg-purple-900/20 text-purple-400 hover:bg-purple-900/30 hover:text-purple-300"
                        : "text-gray-400 hover:text-white hover:bg-purple-900/10"
                    )}
                    asChild
                  >
                    <Link href="/docs/database/mongodb-demo">
                      <Play className="w-4 h-4 mr-2" />
                      {c.mongodbDemo}
                    </Link>
                  </Button>
                </CollapsibleContent>
              </Collapsible>
              <Button
                variant={isActive("/docs/authentication") ? "secondary" : "ghost"}
                className={cn(
                  "justify-start w-full",
                  isActive("/docs/authentication")
                    ? "bg-purple-900/20 text-purple-400 hover:bg-purple-900/30 hover:text-purple-300"
                    : "text-gray-400 hover:text-white hover:bg-purple-900/10"
                )}
                asChild
              >
                <Link href="/docs/authentication">
                  <Lock className="w-4 h-4 mr-2" />
                  {c.authentication}
                </Link>
              </Button>
              <Button
                variant={isActive("/docs/plugins") ? "secondary" : "ghost"}
                className={cn(
                  "justify-start w-full",
                  isActive("/docs/plugins")
                    ? "bg-purple-900/20 text-purple-400 hover:bg-purple-900/30 hover:text-purple-300"
                    : "text-gray-400 hover:text-white hover:bg-purple-900/10"
                )}
                asChild
              >
                <Link href="/docs/plugins">
                  <Zap className="w-4 h-4 mr-2" />
                  {c.plugins}
                </Link>
              </Button>
            </div>
          </div>
          <div className="px-2 py-2">
            <h2 className="px-4 py-2 mb-2 text-lg font-semibold gradient-text">{c.advanced}</h2>
            <div className="space-y-1">
              <Button
                variant={isActive("/docs/middleware") ? "secondary" : "ghost"}
                className={cn(
                  "justify-start w-full",
                  isActive("/docs/middleware")
                    ? "bg-purple-900/20 text-purple-400 hover:bg-purple-900/30 hover:text-purple-300"
                    : "text-gray-400 hover:text-white hover:bg-purple-900/10"
                )}
                asChild
              >
                <Link href="/docs/middleware">
                  <Layers className="w-4 h-4 mr-2" />
                  {c.middleware}
                </Link>
              </Button>
              <Button
                variant={isActive("/docs/websockets") ? "secondary" : "ghost"}
                className={cn(
                  "justify-start w-full",
                  isActive("/docs/websockets")
                    ? "bg-purple-900/20 text-purple-400 hover:bg-purple-900/30 hover:text-purple-300"
                    : "text-gray-400 hover:text-white hover:bg-purple-900/10"
                )}
                asChild
              >
                <Link href="/docs/websockets">
                  <Package className="w-4 h-4 mr-2" />
                  {c.websockets}
                </Link>
              </Button>
              <Button
                variant={isActive("/docs/configuration") ? "secondary" : "ghost"}
                className={cn(
                  "justify-start w-full",
                  isActive("/docs/configuration")
                    ? "bg-purple-900/20 text-purple-400 hover:bg-purple-900/30 hover:text-purple-300"
                    : "text-gray-400 hover:text-white hover:bg-purple-900/10"
                )}
                asChild
              >
                <Link href="/docs/configuration">
                  <Settings className="w-4 h-4 mr-2" />
                  {c.configuration}
                </Link>
              </Button>
            </div>
          </div>
          <div className="px-2 py-2">
            <h2 className="px-4 py-2 mb-2 text-lg font-semibold gradient-text">{c.apiReference}</h2>
            <div className="space-y-1">
              <Button
                variant={isActive("/docs/api-reference") ? "secondary" : "ghost"}
                className={cn(
                  "justify-start w-full",
                  isActive("/docs/api-reference")
                    ? "bg-purple-900/20 text-purple-400 hover:bg-purple-900/30 hover:text-purple-300"
                    : "text-gray-400 hover:text-white hover:bg-purple-900/10"
                )}
                asChild
              >
                <Link href="/docs/api-reference">
                  <FileText className="w-4 h-4 mr-2" />
                  {c.apiReference}
                </Link>
              </Button>
            </div>
          </div>
          <div className="px-2 py-2">
            <Collapsible
              open={openSections.examples}
              onOpenChange={() => toggleSection("examples")}
              className="space-y-1"
            >
              <div className="flex items-center">
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="justify-start w-full px-4 py-2 mb-2 text-lg font-semibold gradient-text hover:bg-transparent"
                  >
                    {openSections.examples ? (
                      <ChevronDown className="w-4 h-4 mr-1" />
                    ) : (
                      <ChevronRight className="w-4 h-4 mr-1" />
                    )}
                    {c.examples}
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent className="space-y-1">
                <Button
                  variant={isActive("/docs/examples/rest-api") ? "secondary" : "ghost"}
                  className={cn(
                    "justify-start w-full pl-8",
                    isActive("/docs/examples/rest-api")
                      ? "bg-purple-900/20 text-purple-400 hover:bg-purple-900/30 hover:text-purple-300"
                      : "text-gray-400 hover:text-white hover:bg-purple-900/10"
                  )}
                  asChild
                >
                  <Link href="/docs/examples/rest-api">
                    <Server className="w-4 h-4 mr-2" />
                    {c.restApi}
                  </Link>
                </Button>
                <Button
                  variant={isActive("/docs/examples/real-world-api") ? "secondary" : "ghost"}
                  className={cn(
                    "justify-start w-full pl-8",
                    isActive("/docs/examples/real-world-api")
                      ? "bg-purple-900/20 text-purple-400 hover:bg-purple-900/30 hover:text-purple-300"
                      : "text-gray-400 hover:text-white hover:bg-purple-900/10"
                  )}
                  asChild
                >
                  <Link href="/docs/examples/real-world-api">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {c.ecommerceApi}
                  </Link>
                </Button>
                <Button
                  variant={isActive("/docs/examples/realtime-chat") ? "secondary" : "ghost"}
                  className={cn(
                    "justify-start w-full pl-8",
                    isActive("/docs/examples/realtime-chat")
                      ? "bg-purple-900/20 text-purple-400 hover:bg-purple-900/30 hover:text-purple-300"
                      : "text-gray-400 hover:text-white hover:bg-purple-900/10"
                  )}
                  asChild
                >
                  <Link href="/docs/examples/realtime-chat">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    {c.realtimeChat}
                  </Link>
                </Button>
              </CollapsibleContent>
            </Collapsible>
          </div>
          <div className="px-2 py-2">
            <h2 className="px-4 py-2 mb-2 text-lg font-semibold gradient-text">{c.deployment}</h2>
            <div className="space-y-1">
              <Button
                variant={isActive("/docs/deployment") ? "secondary" : "ghost"}
                className={cn(
                  "justify-start w-full",
                  isActive("/docs/deployment")
                    ? "bg-purple-900/20 text-purple-400 hover:bg-purple-900/30 hover:text-purple-300"
                    : "text-gray-400 hover:text-white hover:bg-purple-900/10"
                )}
                asChild
              >
                <Link href="/docs/deployment">
                  <Globe className="w-4 h-4 mr-2" />
                  {c.deployment}
                </Link>
              </Button>
            </div>
          </div>
          <div className="px-2 py-2">
            <h2 className="px-4 py-2 mb-2 text-lg font-semibold gradient-text">{c.community}</h2>
            <div className="space-y-1">
              <Button
                variant={isActive("/docs/community") ? "secondary" : "ghost"}
                className={cn(
                  "justify-start w-full",
                  isActive("/docs/community")
                    ? "bg-purple-900/20 text-purple-400 hover:bg-purple-900/30 hover:text-purple-300"
                    : "text-gray-400 hover:text-white hover:bg-purple-900/10"
                )}
                asChild
              >
                <Link href="/docs/community">
                  <Users className="w-4 h-4 mr-2" />
                  {c.community}
                </Link>
              </Button>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
