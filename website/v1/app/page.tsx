import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Code,
  Download,
  ExternalLink,
  Github,
  Package,
  Server,
  Shield,
  Zap,
} from "lucide-react";
import { HeroCode } from "@/components/hero-code";
import { FeatureCard } from "@/components/feature-card";
import { GradientLogo } from "@/components/gradient-logo";
import { AnimatedGradient } from "@/components/animated-gradient";
import { CodeDemo } from "@/components/code-demo";
import { TestimonialCard } from "@/components/testimonial-card";
import { GradientButton } from "@/components/gradient-button";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <section className="relative overflow-hidden py-20 md:py-32">
        <AnimatedGradient />

        <div className="container relative z-10 px-4 md:px-6">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-purple-900/30 text-purple-300 hover:bg-purple-900/40 transition-colors">
              v3.0.0 Lançado
            </Badge>

            <div className="mb-6">
              <GradientLogo size={80} />
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6">
              O{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
                microframework
              </span>{" "}
              para APIs modernas
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl">
              Azura é um microframework web minimalista, poderoso e moderno, feito para APIs rápidas
              e modulares usando TypeScript ou JavaScript.
            </p>

            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <GradientButton asChild>
                <Link href="/docs">
                  Começar <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </GradientButton>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-purple-700/50 text-white hover:bg-purple-950/20 transition-all duration-300"
              >
                <a
                  href="https://github.com/0xviny/Azura.JS"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-4 w-4" /> GitHub
                </a>
              </Button>
            </div>

            <div className="flex gap-3 mb-8">
              <a
                href="https://www.npmjs.com/package/@atosjs/azura"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center transition-transform hover:scale-105"
              >
                <img
                  src="https://img.shields.io/npm/v/@atosjs/azura.svg?style=for-the-badge"
                  alt="npm version"
                />
              </a>
              <a href="#" className="inline-flex items-center transition-transform hover:scale-105">
                <img
                  src="https://img.shields.io/badge/license-ISC-blue.svg?style=for-the-badge"
                  alt="License"
                />
              </a>
              <a
                href="https://nodejs.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center transition-transform hover:scale-105"
              >
                <img
                  src="https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg?style=for-the-badge"
                  alt="Node.js"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950/20 to-transparent opacity-50"></div>
        <div className="container relative z-10 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-purple-900/30 text-purple-300 hover:bg-purple-900/40 transition-colors">
                Simples e Poderoso
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Crie APIs em segundos, não em horas
              </h2>
              <p className="text-gray-300 mb-6">
                Azura foi projetado para ser intuitivo e fácil de usar, permitindo que você crie
                APIs robustas com poucas linhas de código. Sem configurações complexas, sem
                dependências pesadas.
              </p>
              <ul className="space-y-3 text-gray-300">
                {[
                  "Sintaxe limpa e intuitiva",
                  "Suporte completo a TypeScript",
                  "Roteamento simplificado",
                  "Middlewares e plugins extensíveis",
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <div className="mr-3 h-5 w-5 text-purple-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-purple-700 rounded-xl blur-sm opacity-75"></div>
              <HeroCode />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-6">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-900/30 text-purple-300 hover:bg-purple-900/40 transition-colors">
              Recursos
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Tudo que você precisa para APIs modernas
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Azura combina simplicidade com poder, oferecendo tudo que você precisa para criar APIs
              robustas e escaláveis.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Zap className="h-6 w-6" />}
              title="Performance Extrema"
              description="Arquitetura otimizada para máxima performance, com overhead mínimo e resposta rápida."
            />
            <FeatureCard
              icon={<Code className="h-6 w-6" />}
              title="TypeScript Nativo"
              description="Suporte completo a TypeScript com tipos bem definidos e autocompletion inteligente."
            />
            <FeatureCard
              icon={<Server className="h-6 w-6" />}
              title="Arquitetura Modular"
              description="Organize seu código com Controllers, Services e Plugins para máxima manutenibilidade."
            />
            <FeatureCard
              icon={<Shield className="h-6 w-6" />}
              title="Segurança Integrada"
              description="Proteção contra vulnerabilidades comuns e ferramentas para implementar autenticação."
            />
            <FeatureCard
              icon={<Package className="h-6 w-6" />}
              title="CLI Poderosa"
              description="Gere projetos, controllers e serviços com comandos simples para acelerar o desenvolvimento."
            />
            <FeatureCard
              icon={<Download className="h-6 w-6" />}
              title="Leve e Minimalista"
              description="Sem dependências desnecessárias, mantendo seu projeto leve e rápido."
            />
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-black to-purple-950/20">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-900/30 text-purple-300 hover:bg-purple-900/40 transition-colors">
              Exemplos
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Código limpo e expressivo
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Veja como é fácil criar APIs poderosas com Azura.
            </p>
          </div>

          <div className="space-y-12">
            <CodeDemo
              title="API Básica"
              description="Crie um servidor HTTP básico em segundos"
              language="javascript"
              code={`const { AzuraServer } = require('@atosjs/azura');

const app = new AzuraServer({ port: 3000 });

app.get('/', (req, res) => {
  res.send('Hello World from Azura!');
});

app.listen();`}
            />

            <CodeDemo
              title="Controllers com Decorators"
              description="Use decorators para organizar suas rotas"
              language="typescript"
              code={`import { Controller, Get, Post } from '@atosjs/azura';
import { app } from '../app';

@Controller('/users')
export class UserController {
  @Get('/')
  async getAllUsers(req, res) {
    const users = await app.db?.find('users', {});
    res.json(users);
  }

  @Post('/')
  async createUser(req, res) {
    const user = await app.db?.insert('users', req.body);
    res.status(201).json(user);
  }

  @Get('/:id')
  async getUserById(req, res) {
    const user = await app.db?.find('users', { id: req.params.id });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  }
}`}
            />

            <CodeDemo
              title="Middlewares e Plugins"
              description="Estenda a funcionalidade com middlewares e plugins"
              language="typescript"
              code={`import { AzuraServer } from '@atosjs/azura';
import { AuthPlugin } from './plugins/AuthPlugin';
import { LoggerMiddleware } from './middlewares/LoggerMiddleware';

const app = new AzuraServer();

// Registrar plugin de autenticação
app.registerPlugin(AuthPlugin, {
  secret: process.env.JWT_SECRET,
  expiresIn: '7d'
});

// Adicionar middleware global
app.use(LoggerMiddleware);

// Middleware específico para rota
app.get('/protected', 
  app.auth.requireAuth(), 
  (req, res) => {
    res.json({ message: 'Acesso autorizado', user: req.user });
  }
);

app.listen(3000);`}
            />
          </div>

          <div className="mt-16 text-center">
            <GradientButton asChild>
              <Link href="/docs/examples">
                Ver mais exemplos <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </GradientButton>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-950/30 to-transparent"></div>
        <div className="container relative z-10 max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-purple-950/50 to-purple-900/50 p-8 md:p-12 rounded-2xl border border-purple-700/30 backdrop-blur-sm">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Comece a usar Azura hoje
                </h2>
                <p className="text-gray-300 mb-8">
                  Instale o pacote, crie seu primeiro projeto e veja como é fácil desenvolver APIs
                  modernas com Azura.
                </p>
                <div className="flex flex-wrap gap-4">
                  <GradientButton asChild>
                    <Link href="/docs/guides/getting-started">
                      Guia de Início <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </GradientButton>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-purple-700/50 text-white hover:bg-purple-950/20 transition-all duration-300"
                  >
                    <a
                      href="https://www.npmjs.com/package/@atosjs/azura"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Package className="mr-2 h-4 w-4" /> NPM Package
                    </a>
                  </Button>
                </div>
              </div>
              <div className="bg-black/60 p-6 rounded-xl border border-purple-700/30">
                <div className="text-sm font-mono text-gray-300 mb-2">Instale via npm:</div>
                <div className="bg-black rounded-lg p-4 font-mono text-purple-300 mb-6 overflow-x-auto">
                  npm install @atosjs/azura
                </div>
                <div className="text-sm font-mono text-gray-300 mb-2">Ou via bun:</div>
                <div className="bg-black rounded-lg p-4 font-mono text-purple-300 overflow-x-auto">
                  bun add @atosjs/azura
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-6">
        <div className="container max-w-6xl mx-auto text-center">
          <Badge className="mb-4 bg-purple-900/30 text-purple-300 hover:bg-purple-900/40 transition-colors">
            Open Source
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Construído pela comunidade, para a comunidade
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            Azura é um projeto open source, mantido por desenvolvedores apaixonados. Contribua e
            faça parte desta comunidade.
          </p>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-purple-700/50 text-white hover:bg-purple-950/20 transition-all duration-300"
          >
            <a
              href="https://github.com/0xviny/Azura.JS"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center"
            >
              <Github className="mr-2 h-5 w-5" />
              Contribua no GitHub
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
