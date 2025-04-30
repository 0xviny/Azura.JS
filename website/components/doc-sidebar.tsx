"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { GradientLogo } from "./gradient-logo";

interface DocSidebarProps {
  className?: string;
}

export function DocSidebar({ className }: DocSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const sections = [
    {
      title: "Introdução",
      items: [
        { title: "Visão Geral", href: "/docs/guides/introduction" },
        { title: "Instalação", href: "/docs/guides/installation" },
        { title: "Primeiros Passos", href: "/docs/guides/getting-started" },
      ],
    },
    {
      title: "Guias",
      items: [
        { title: "Plugins", href: "/docs/guides/plugins" },
        { title: "Autenticação", href: "/docs/guides/authentication" },
        { title: "Validação", href: "/docs/guides/validation" },
        { title: "Banco de Dados", href: "/docs/guides/database" },
        { title: "Deployment", href: "/docs/guides/deployment" },
      ],
    },
    {
      title: "API Reference",
      items: [
        { title: "AzuraServer", href: "/docs/api/azura-app" },
        { title: "Controllers", href: "/docs/api/controllers" },
        { title: "Decorators", href: "/docs/api/decorators" },
        { title: "Middlewares", href: "/docs/api/middlewares" },
        { title: "Plugins", href: "/docs/api/plugins" },
      ],
    },
    {
      title: "Exemplos",
      items: [
        { title: "API REST", href: "/docs/examples/rest-api" },
        { title: "Autenticação JWT", href: "/docs/examples/authentication" },
        { title: "Validação de Dados", href: "/docs/examples/validation" },
      ],
    },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-16 right-1 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSidebar}
          className="bg-gray-900 border-gray-700"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "bg-black border-r border-gray-800 overflow-y-auto",
          "fixed inset-0 z-40 transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          className
        )}
      >
        <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-sm border-b border-gray-800 p-4">
          <Link href="/docs" className="flex items-center" onClick={() => setIsOpen(false)}>
            <div className="mr-2 flex items-center justify-center">
              <GradientLogo size={24} />
            </div>
            <span className="text-xl font-bold text-white">Azura Docs</span>
          </Link>
        </div>

        <div className="p-4 space-y-6">
          {sections.map((section, i) => (
            <Collapsible key={i} defaultOpen={i === 0}>
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                  {section.title}
                </h4>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-0 h-7 w-7">
                    <ChevronDown className="h-4 w-4" />
                    <span className="sr-only">Toggle {section.title}</span>
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent className="mt-2 space-y-1">
                {section.items.map((item, j) => (
                  <Link
                    key={j}
                    href={item.href}
                    className="flex items-center py-1 px-2 text-gray-300 hover:text-white hover:bg-purple-900/20 rounded-md transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <ChevronRight className="h-3 w-3 mr-2 text-gray-500" />
                    {item.title}
                  </Link>
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
    </>
  );
}
