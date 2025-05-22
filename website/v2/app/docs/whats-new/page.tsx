"use client";

import { useLanguage } from "@/components/language-provider";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/components/ui/animated-section";
import { motion } from "framer-motion";

export default function WhatsNewPage() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "What's New",
      subtitle: "Latest updates and improvements to the Azura.JS Framework",
      versions: [
        {
          version: "1.5.0",
          date: "May 15, 2025",
          title: "WebSockets and Real-time Features",
          description:
            "This release adds comprehensive WebSocket support, enabling real-time applications with Azura.",
          changes: [
            {
              type: "feature",
              title: "WebSocket Support",
              description:
                "Added native WebSocket support with room-based messaging, private messages, and presence tracking.",
            },
            {
              type: "feature",
              title: "Real-time Events",
              description: "New event system for real-time updates and notifications.",
            },
            {
              type: "improvement",
              title: "Performance Optimizations",
              description: "Improved request handling performance by 30%.",
            },
            {
              type: "fix",
              title: "Authentication Bug Fix",
              description: "Fixed an issue with token refresh in the authentication system.",
            },
          ],
        },
        {
          version: "1.4.0",
          date: "April 2, 2025",
          title: "Database Enhancements",
          description:
            "This release focuses on improving database integrations and query performance.",
          changes: [
            {
              type: "feature",
              title: "SQL Query Builder",
              description: "New SQL query builder for PostgreSQL and MySQL databases.",
            },
            {
              type: "feature",
              title: "MongoDB Aggregation Pipeline",
              description: "Support for MongoDB aggregation pipelines with a fluent API.",
            },
            {
              type: "improvement",
              title: "Connection Pooling",
              description: "Improved connection pooling for better performance under high load.",
            },
            {
              type: "fix",
              title: "Transaction Handling",
              description: "Fixed issues with nested transactions in PostgreSQL adapter.",
            },
          ],
        },
        {
          version: "1.3.0",
          date: "February 18, 2025",
          title: "Authentication and Security",
          description: "This release enhances authentication and security features.",
          changes: [
            {
              type: "feature",
              title: "OAuth 2.0 Support",
              description: "Added support for OAuth 2.0 authentication with popular providers.",
            },
            {
              type: "feature",
              title: "Rate Limiting",
              description: "Configurable rate limiting with various strategies.",
            },
            {
              type: "improvement",
              title: "JWT Performance",
              description: "Improved JWT validation performance.",
            },
            {
              type: "fix",
              title: "CORS Configuration",
              description: "Fixed issues with CORS configuration for complex setups.",
            },
          ],
        },
      ],
      feature: "New Feature",
      improvement: "Improvement",
      fix: "Bug Fix",
    },
    pt: {
      title: "Novidades",
      subtitle: "Últimas atualizações e melhorias no Azura.JS Framework",
      versions: [
        {
          version: "1.5.0",
          date: "15 de Maio, 2025",
          title: "WebSockets e Recursos em Tempo Real",
          description:
            "Esta versão adiciona suporte abrangente a WebSockets, permitindo aplicações em tempo real com Azura.",
          changes: [
            {
              type: "feature",
              title: "Suporte a WebSocket",
              description:
                "Adicionado suporte nativo a WebSocket com mensagens baseadas em salas, mensagens privadas e rastreamento de presença.",
            },
            {
              type: "feature",
              title: "Eventos em Tempo Real",
              description:
                "Novo sistema de eventos para atualizações e notificações em tempo real.",
            },
            {
              type: "improvement",
              title: "Otimizações de Desempenho",
              description: "Melhorou o desempenho de manipulação de requisições em 30%.",
            },
            {
              type: "fix",
              title: "Correção de Bug de Autenticação",
              description:
                "Corrigido um problema com a atualização de token no sistema de autenticação.",
            },
          ],
        },
        {
          version: "1.4.0",
          date: "2 de Abril, 2025",
          title: "Melhorias no Banco de Dados",
          description:
            "Esta versão se concentra em melhorar as integrações de banco de dados e o desempenho de consultas.",
          changes: [
            {
              type: "feature",
              title: "Construtor de Consultas SQL",
              description:
                "Novo construtor de consultas SQL para bancos de dados PostgreSQL e MySQL.",
            },
            {
              type: "feature",
              title: "Pipeline de Agregação MongoDB",
              description: "Suporte para pipelines de agregação MongoDB com uma API fluente.",
            },
            {
              type: "improvement",
              title: "Pool de Conexões",
              description: "Pool de conexões melhorado para melhor desempenho sob alta carga.",
            },
            {
              type: "fix",
              title: "Manipulação de Transações",
              description: "Corrigidos problemas com transações aninhadas no adaptador PostgreSQL.",
            },
          ],
        },
        {
          version: "1.3.0",
          date: "18 de Fevereiro, 2025",
          title: "Autenticação e Segurança",
          description: "Esta versão melhora os recursos de autenticação e segurança.",
          changes: [
            {
              type: "feature",
              title: "Suporte a OAuth 2.0",
              description:
                "Adicionado suporte para autenticação OAuth 2.0 com provedores populares.",
            },
            {
              type: "feature",
              title: "Limitação de Taxa",
              description: "Limitação de taxa configurável com várias estratégias.",
            },
            {
              type: "improvement",
              title: "Desempenho JWT",
              description: "Melhorado o desempenho de validação JWT.",
            },
            {
              type: "fix",
              title: "Configuração CORS",
              description:
                "Corrigidos problemas com configuração CORS para configurações complexas.",
            },
          ],
        },
      ],
      feature: "Novo Recurso",
      improvement: "Melhoria",
      fix: "Correção de Bug",
    },
  };

  const c = content[language];

  const getBadgeColor = (type: string) => {
    switch (type) {
      case "feature":
        return "bg-green-500/20 text-green-400 hover:bg-green-500/30";
      case "improvement":
        return "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30";
      case "fix":
        return "bg-red-500/20 text-red-400 hover:bg-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 hover:bg-gray-500/30";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "feature":
        return c.feature;
      case "improvement":
        return c.improvement;
      case "fix":
        return c.fix;
      default:
        return type;
    }
  };

  return (
    <div className="space-y-8">
      <AnimatedSection animation="fadeIn">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">{c.title}</h1>
          <p className="mt-2 text-lg text-gray-400">{c.subtitle}</p>
        </div>
      </AnimatedSection>

      <div className="space-y-12">
        {c.versions.map((version, versionIndex) => (
          <AnimatedSection
            key={version.version}
            animation="slideInFromLeft"
            delay={versionIndex * 0.1}
          >
            <div className="relative">
              <div className="absolute left-0 w-0.5 h-full bg-gray-800 ml-6 -z-10"></div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-900/50 border-2 border-purple-700 flex items-center justify-center shrink-0">
                  <span className="text-lg font-bold text-purple-400">
                    {version.version.split(".")[0]}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-2xl font-bold text-white">{version.version}</h2>
                    <Badge variant="outline" className="bg-gray-800 text-gray-400">
                      {version.date}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-semibold text-purple-400">{version.title}</h3>
                  <p className="text-gray-400">{version.description}</p>

                  <div className="mt-4 space-y-4">
                    {version.changes.map((change, changeIndex) => (
                      <motion.div
                        key={changeIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + changeIndex * 0.1 }}
                        className="bg-gray-900/50 border border-gray-800 rounded-lg p-4"
                      >
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <Badge className={getBadgeColor(change.type)}>
                            {getTypeLabel(change.type)}
                          </Badge>
                          <h4 className="text-lg font-medium text-white">{change.title}</h4>
                        </div>
                        <p className="text-gray-400">{change.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}
