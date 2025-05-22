"use client";

import { Github, Twitter, Slack } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

export default function Footer() {
  const { language } = useLanguage();

  const content = {
    en: {
      description: "A modern, TypeScript-first framework for building high-performance APIs.",
      documentation: "Documentation",
      gettingStarted: "Getting Started",
      coreConcepts: "Core Concepts",
      serverRouting: "Server & Routing",
      database: "Database",
      authentication: "Authentication",
      resources: "Resources",
      apiReference: "API Reference",
      examples: "Examples",
      tutorials: "Tutorials",
      blog: "Blog",
      community: "Community",
      legal: "Legal",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      license: "License",
      copyright: "All rights reserved.",
    },
    pt: {
      description:
        "Um framework moderno, com TypeScript em primeiro lugar, para construir APIs de alto desempenho.",
      documentation: "Documentação",
      gettingStarted: "Primeiros Passos",
      coreConcepts: "Conceitos Principais",
      serverRouting: "Servidor & Rotas",
      database: "Banco de Dados",
      authentication: "Autenticação",
      resources: "Recursos",
      apiReference: "Referência da API",
      examples: "Exemplos",
      tutorials: "Tutoriais",
      blog: "Blog",
      community: "Comunidade",
      legal: "Legal",
      privacy: "Política de Privacidade",
      terms: "Termos de Serviço",
      license: "Licença",
      copyright: "Todos os direitos reservados.",
    },
  };

  const c = content[language];

  return (
    <footer className="py-12 bg-black text-gray-300">
      <div className="container px-4 mx-auto">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-bold text-white">Azura.JS Framework</h3>
            <p className="text-gray-400">{c.description}</p>
            <div className="flex mt-4 space-x-4">
              <a
                href="https://github.com/0xviny/Azura.JS"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Github className="w-5 h-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://www.npmjs.com/package/@atosjs/azura"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 576 512"
                  className="text-2xl cursor-pointer hover:text-red-500"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M288 288h-32v-64h32v64zm288-128v192H288v32H160v-32H0V160h576zm-416 32H32v128h64v-96h32v96h32V192zm160 0H192v160h64v-32h64V192zm224 0H352v128h64v-96h32v96h32v-96h32v96h32V192z"></path>
                </svg>
                <span className="sr-only">NPM</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400">
                <Slack className="w-5 h-5" />
                <span className="sr-only">Slack</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-white">{c.documentation}</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/docs/getting-started" className="hover:text-purple-400">
                  {c.gettingStarted}
                </a>
              </li>
              <li>
                <a href="/docs/core-concepts" className="hover:text-purple-400">
                  {c.coreConcepts}
                </a>
              </li>
              <li>
                <a href="/docs/server" className="hover:text-purple-400">
                  {c.serverRouting}
                </a>
              </li>
              <li>
                <a href="/docs/database" className="hover:text-purple-400">
                  {c.database}
                </a>
              </li>
              <li>
                <a href="/docs/authentication" className="hover:text-purple-400">
                  {c.authentication}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-white">{c.resources}</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/docs/api-reference" className="hover:text-purple-400">
                  {c.apiReference}
                </a>
              </li>
              <li>
                <a href="/docs/examples" className="hover:text-purple-400">
                  {c.examples}
                </a>
              </li>
              <li>
                <a href="/docs/tutorials" className="hover:text-purple-400">
                  {c.tutorials}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-white">{c.legal}</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-purple-400">
                  {c.privacy}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400">
                  {c.terms}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400">
                  {c.license}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 mt-8 text-center border-t border-gray-800">
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()} Azura.JS Framework. {c.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
