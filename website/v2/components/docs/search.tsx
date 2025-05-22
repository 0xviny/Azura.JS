"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { SearchIcon, ArrowRight, Command } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { motion, AnimatePresence } from "framer-motion";

type SearchProps = {
  onClose?: () => void;
};

// Definição dos dados de documentação para pesquisa
const searchData = {
  en: [
    {
      title: "Getting Started",
      path: "/docs/getting-started",
      keywords: "install setup configuration start begin",
    },
    {
      title: "Core Concepts",
      path: "/docs/core-concepts",
      keywords: "architecture structure design patterns",
    },
    { title: "Server & Routing", path: "/docs/server", keywords: "http routes endpoints api rest" },
    {
      title: "Database Integration",
      path: "/docs/database",
      keywords: "mongodb postgres sql nosql storage",
    },
    {
      title: "Authentication",
      path: "/docs/authentication",
      keywords: "auth jwt token security login",
    },
    {
      title: "Plugins",
      path: "/docs/plugins",
      keywords: "extend modules addons middleware extensions",
    },
    {
      title: "API Reference",
      path: "/docs/api-reference",
      keywords: "methods functions classes interfaces",
    },
    { title: "Examples", path: "/docs/examples", keywords: "samples demos tutorials guides" },
    {
      title: "Deployment",
      path: "/docs/deployment",
      keywords: "production docker kubernetes cloud hosting",
    },
    {
      title: "RESTful API Example",
      path: "/docs/examples/rest-api",
      keywords: "crud http methods endpoints",
    },
    {
      title: "E-commerce API",
      path: "/docs/examples/real-world-api",
      keywords: "products orders users shopping",
    },
    {
      title: "Realtime Chat",
      path: "/docs/examples/realtime-chat",
      keywords: "websockets messages realtime",
    },
    {
      title: "What's New",
      path: "/docs/whats-new",
      keywords: "updates changelog releases versions",
    },
    {
      title: "Community",
      path: "/docs/community",
      keywords: "support help discord github twitter",
    },
  ],
  pt: [
    {
      title: "Primeiros Passos",
      path: "/docs/getting-started",
      keywords: "instalar configurar iniciar começar",
    },
    {
      title: "Conceitos Principais",
      path: "/docs/core-concepts",
      keywords: "arquitetura estrutura design padrões",
    },
    { title: "Servidor & Rotas", path: "/docs/server", keywords: "http rotas endpoints api rest" },
    {
      title: "Integração com Banco de Dados",
      path: "/docs/database",
      keywords: "mongodb postgres sql nosql armazenamento",
    },
    {
      title: "Autenticação",
      path: "/docs/authentication",
      keywords: "auth jwt token segurança login",
    },
    {
      title: "Plugins",
      path: "/docs/plugins",
      keywords: "estender módulos addons middleware extensões",
    },
    {
      title: "Referência da API",
      path: "/docs/api-reference",
      keywords: "métodos funções classes interfaces",
    },
    { title: "Exemplos", path: "/docs/examples", keywords: "amostras demos tutoriais guias" },
    {
      title: "Implantação",
      path: "/docs/deployment",
      keywords: "produção docker kubernetes cloud hospedagem",
    },
    {
      title: "Exemplo de API RESTful",
      path: "/docs/examples/rest-api",
      keywords: "crud métodos http endpoints",
    },
    {
      title: "API de E-commerce",
      path: "/docs/examples/real-world-api",
      keywords: "produtos pedidos usuários compras",
    },
    {
      title: "Chat em Tempo Real",
      path: "/docs/examples/realtime-chat",
      keywords: "websockets mensagens tempo real",
    },
    {
      title: "Novidades",
      path: "/docs/whats-new",
      keywords: "atualizações changelog lançamentos versões",
    },
    {
      title: "Comunidade",
      path: "/docs/community",
      keywords: "suporte ajuda discord github twitter",
    },
  ],
};

export function Search({ onClose }: SearchProps) {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof searchData.en>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const content = {
    en: {
      searchPlaceholder: "Search documentation...",
      noResults: "No results found",
      searchResults: "Search Results",
      searching: "Searching...",
      categories: "Categories",
      pressEnter: "Press Enter to search",
    },
    pt: {
      searchPlaceholder: "Buscar documentação...",
      noResults: "Nenhum resultado encontrado",
      searchResults: "Resultados da Busca",
      searching: "Buscando...",
      categories: "Categorias",
      pressEnter: "Pressione Enter para buscar",
    },
  };

  const c = content[language];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
        if (onClose) onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.length > 1) {
      setIsLoading(true);
      const timeoutId = setTimeout(() => {
        const data = searchData[language];
        const filtered = data.filter(
          (item) =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.keywords.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
        setIsLoading(false);
        setSelectedIndex(-1);
      }, 300);
      return () => clearTimeout(timeoutId);
    } else {
      setResults([]);
    }
  }, [query, language]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (resultsRef.current && !resultsRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleResultClick = (path: string) => {
    router.push(path);
    setIsOpen(false);
    setQuery("");
    if (onClose) onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prevIndex) => (prevIndex < results.length - 1 ? prevIndex + 1 : prevIndex));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && results[selectedIndex]) {
        handleResultClick(results[selectedIndex].path);
      } else if (results.length > 0) {
        handleResultClick(results[0].path);
      }
    }
  };

  return (
    <div className="relative w-[500px]" ref={resultsRef}>
      <div className="relative flex items-center">
        <div className="absolute left-3 flex items-center justify-center text-muted-foreground">
          <SearchIcon className="h-4 w-4" />
        </div>
        <Input
          ref={inputRef}
          type="search"
          placeholder={c.searchPlaceholder}
          className="pl-10 pr-12 h-10 w-full bg-secondary/50 border-purple-900/20 focus-visible:ring-purple-500 focus-visible:ring-offset-0"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
        />
        <div className="absolute right-3 flex items-center">
          <kbd className="hidden md:flex h-5 select-none items-center gap-1 rounded border border-purple-900/20 bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            <span className="text-xs">
              <Command className="h-3 w-3" />
            </span>
            K
          </kbd>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 w-full rounded-md border border-purple-900/20 bg-background shadow-lg z-50 glass-effect overflow-hidden"
          >
            <div className="max-h-[60vh] overflow-y-auto">
              {isLoading ? (
                <div className="p-4 text-center">
                  <div className="animate-spin h-5 w-5 border-2 border-purple-500 border-t-transparent rounded-full mx-auto"></div>
                  <p className="mt-2 text-sm text-muted-foreground">{c.searching}</p>
                </div>
              ) : results.length > 0 ? (
                <div className="p-2">
                  <h3 className="text-xs font-medium text-muted-foreground px-2 py-1.5">
                    {c.searchResults}
                  </h3>
                  <div className="mt-1">
                    {results.map((result, index) => (
                      <button
                        key={index}
                        onClick={() => handleResultClick(result.path)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                          selectedIndex === index
                            ? "bg-purple-500/10 text-purple-500"
                            : "hover:bg-purple-500/5 focus:bg-purple-500/5"
                        } focus:outline-none`}
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium">{result.title}</h3>
                          <ArrowRight
                            className={`h-4 w-4 transition-opacity ${
                              selectedIndex === index ? "opacity-100" : "opacity-0"
                            } text-purple-500`}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{result.path}</p>
                      </button>
                    ))}
                  </div>
                </div>
              ) : query.length > 1 ? (
                <div className="p-4 text-center">
                  <p className="text-sm text-muted-foreground">{c.noResults}</p>
                </div>
              ) : (
                <div className="p-2">
                  <h3 className="text-xs font-medium text-muted-foreground px-2 py-1.5">
                    {c.categories}
                  </h3>
                  <div className="mt-1 grid grid-cols-2 gap-4 px-2">
                    {searchData[language].slice(0, 6).map((category, index) => (
                      <button
                        key={index}
                        onClick={() => handleResultClick(category.path)}
                        className="text-left px-3 py-2 rounded-md hover:bg-purple-500/5 focus:bg-purple-500/5 focus:outline-none transition-colors"
                      >
                        <h3 className="text-sm font-medium">{category.title}</h3>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {query.length > 0 && results.length > 0 && (
              <div className="border-t border-purple-900/20 px-4 py-2 text-xs text-muted-foreground flex justify-between items-center">
                <span>
                  <kbd className="px-1.5 py-0.5 rounded border border-purple-900/20 bg-muted font-mono text-xs text-muted-foreground mr-1">
                    ↑
                  </kbd>
                  <kbd className="px-1.5 py-0.5 rounded border border-purple-900/20 bg-muted font-mono text-xs text-muted-foreground mr-1">
                    ↓
                  </kbd>
                  to navigate
                </span>
                <span>
                  <kbd className="px-1.5 py-0.5 rounded border border-purple-900/20 bg-muted font-mono text-xs text-muted-foreground mr-1">
                    Enter
                  </kbd>
                  to select
                </span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
