"use client";

import { useLanguage } from "@/components/language-provider";
import { InteractiveDiagram } from "@/components/docs/interactive-diagram";

export default function ArchitecturePage() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "Azura Architecture",
      subtitle: "Understanding the architecture of the Azura.JS Framework",
      intro:
        "Azura follows a modular architecture that makes it easy to build scalable and maintainable APIs. This page explains the core components and how they interact with each other.",
    },
    pt: {
      title: "Arquitetura Azura",
      subtitle: "Entendendo a arquitetura do Azura.JS Framework",
      intro:
        "Azura segue uma arquitetura modular que facilita a construção de APIs escaláveis e de fácil manutenção. Esta página explica os componentes principais e como eles interagem entre si.",
    },
  };

  const c = content[language];

  const architectureNodes = [
    {
      id: "core",
      label: {
        en: "Core",
        pt: "Núcleo",
      },
      description: {
        en: "The central component that manages the application lifecycle and coordinates all other components. It handles initialization, configuration, and shutdown processes.",
        pt: "O componente central que gerencia o ciclo de vida da aplicação e coordena todos os outros componentes. Ele lida com processos de inicialização, configuração e encerramento.",
      },
      x: 350,
      y: 50,
      color: "purple",
      connections: ["router", "middleware", "plugins", "database"],
    },
    {
      id: "router",
      label: {
        en: "Router",
        pt: "Roteador",
      },
      description: {
        en: "Responsible for matching incoming HTTP requests to the appropriate handlers. It supports various HTTP methods, route parameters, and nested routes.",
        pt: "Responsável por corresponder solicitações HTTP de entrada aos manipuladores apropriados. Suporta vários métodos HTTP, parâmetros de rota e rotas aninhadas.",
      },
      x: 200,
      y: 150,
      color: "blue",
      connections: ["handlers", "middleware"],
    },
    {
      id: "middleware",
      label: {
        en: "Middleware",
        pt: "Middleware",
      },
      description: {
        en: "Functions that process requests before they reach route handlers. They can modify requests/responses, perform authentication, logging, etc.",
        pt: "Funções que processam solicitações antes que cheguem aos manipuladores de rota. Podem modificar solicitações/respostas, realizar autenticação, logging, etc.",
      },
      x: 500,
      y: 150,
      color: "green",
      connections: ["router", "handlers"],
    },
    {
      id: "handlers",
      label: {
        en: "Handlers",
        pt: "Manipuladores",
      },
      description: {
        en: "Functions that process the final request and generate a response. They implement the business logic of your API endpoints.",
        pt: "Funções que processam a solicitação final e geram uma resposta. Implementam a lógica de negócios dos seus endpoints de API.",
      },
      x: 350,
      y: 250,
      color: "orange",
      connections: ["database", "services"],
    },
    {
      id: "database",
      label: {
        en: "Database",
        pt: "Banco de Dados",
      },
      description: {
        en: "Provides an abstraction layer for database operations. Supports multiple database types and handles connections, queries, and transactions.",
        pt: "Fornece uma camada de abstração para operações de banco de dados. Suporta múltiplos tipos de banco de dados e gerencia conexões, consultas e transações.",
      },
      x: 200,
      y: 350,
      color: "red",
      connections: ["models"],
    },
    {
      id: "models",
      label: {
        en: "Models",
        pt: "Modelos",
      },
      description: {
        en: "Represent the data structures in your application. They define schemas, validation rules, and relationships between entities.",
        pt: "Representam as estruturas de dados em sua aplicação. Definem esquemas, regras de validação e relacionamentos entre entidades.",
      },
      x: 350,
      y: 400,
      color: "yellow",
      connections: [],
    },
    {
      id: "services",
      label: {
        en: "Services",
        pt: "Serviços",
      },
      description: {
        en: "Encapsulate business logic that can be reused across multiple handlers. They help keep your code DRY and maintainable.",
        pt: "Encapsulam lógica de negócios que pode ser reutilizada em vários manipuladores. Ajudam a manter seu código DRY e de fácil manutenção.",
      },
      x: 500,
      y: 350,
      color: "indigo",
      connections: ["models"],
    },
    {
      id: "plugins",
      label: {
        en: "Plugins",
        pt: "Plugins",
      },
      description: {
        en: "Extend the framework's functionality. They can add new features, integrate with external services, or modify the behavior of existing components.",
        pt: "Estendem a funcionalidade do framework. Podem adicionar novos recursos, integrar com serviços externos ou modificar o comportamento de componentes existentes.",
      },
      x: 650,
      y: 250,
      color: "pink",
      connections: ["core", "middleware"],
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">{c.title}</h1>
        <p className="mt-2 text-lg text-gray-400">{c.subtitle}</p>
      </div>

      <p className="text-lg">{c.intro}</p>

      <InteractiveDiagram
        title={{
          en: "Azura Architecture Overview",
          pt: "Visão Geral da Arquitetura Azura",
        }}
        description={{
          en: "Click on each component to learn more about its role in the framework",
          pt: "Clique em cada componente para saber mais sobre seu papel no framework",
        }}
        nodes={architectureNodes}
      />
    </div>
  );
}
