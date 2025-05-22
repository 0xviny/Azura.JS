import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ChevronRight, Github } from "lucide-react"
import { CodeDemo } from "@/components/code-demo"
import { DocSidebar } from "@/components/doc-sidebar"
import { TableOfContents } from "@/components/table-of-contents"

export default function ProjectStructurePage() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <div className="container max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar */}
          <DocSidebar className="w-full lg:w-64 shrink-0" />

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-10">
              <div>
                <Link href="/docs" className="inline-flex mb-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-purple-700/50 text-white hover:bg-purple-950/20"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para Documentação
                  </Button>
                </Link>

                <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                  <Link href="/docs" className="hover:text-purple-400 transition-colors">
                    Docs
                  </Link>
                  <ChevronRight className="h-4 w-4" />
                  <Link href="/docs/guides" className="hover:text-purple-400 transition-colors">
                    Guias
                  </Link>
                  <ChevronRight className="h-4 w-4" />
                  <span className="text-gray-300">Estrutura de Projeto</span>
                </div>

                <Badge className="mb-4 bg-purple-900/30 text-purple-300 hover:bg-purple-900/40 transition-colors">
                  Guia
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Estrutura de Projeto</h1>
                <p className="text-xl text-gray-300 max-w-3xl">
                  Aprenda como organizar seu código para projetos maiores e mais complexos com Azura.
                </p>
              </div>

              <div className="flex gap-3">
                {/* <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-purple-700/50 text-white hover:bg-purple-950/20 transition-all duration-300"
                >
                  <a
                    href="https://github.com/0xviny/Azura.JS/edit/main/docs/guides/project-structure.md"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Editar esta página
                  </a>
                </Button> */}
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-purple-700/50 text-white hover:bg-purple-950/20 transition-all duration-300"
                >
                  <a href="https://github.com/0xviny/Azura.JS" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" /> Ver no GitHub
                  </a>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-10">
              <div className="prose prose-invert max-w-none prose-headings:scroll-mt-20 prose-pre:bg-gray-950 prose-pre:border prose-pre:border-purple-900/20">
                <h2 id="overview">Visão Geral</h2>
                <p>
                  Uma boa estrutura de projeto é essencial para manter seu código organizado, especialmente à medida que
                  seu projeto cresce. O Azura foi projetado para ser flexível, permitindo que você organize seu código
                  da maneira que melhor se adapte às suas necessidades, mas também fornece algumas convenções
                  recomendadas.
                </p>

                <h2 id="recommended-structure">Estrutura Recomendada</h2>
                <p>Para projetos de médio a grande porte, recomendamos a seguinte estrutura de diretórios:</p>

                <div className="not-prose">
                  <CodeDemo
                    language="bash"
                    code={`my-api/
├── src/
│   ├── controllers/       # Controladores para definir rotas e endpoints
│   │   ├── UserController.ts
│   │   └── ProductController.ts
│   ├── services/          # Lógica de negócios
│   │   ├── UserService.ts
│   │   └── ProductService.ts
│   ├── models/            # Modelos de dados e interfaces
│   │   ├── User.ts
│   │   └── Product.ts
│   ├── middlewares/       # Middlewares personalizados
│   │   ├── auth.ts
│   │   └── logger.ts
│   ├── plugins/           # Plugins para estender a funcionalidade
│   │   ├── AuthPlugin.ts
│   │   └── DatabasePlugin.ts
│   ├── config/            # Configurações da aplicação
│   │   ├── database.ts
│   │   └── app.ts
│   ├── utils/             # Funções utilitárias
│   │   └── helpers.ts
│   └── index.ts           # Ponto de entrada da aplicação
├── tests/                 # Testes
│   ├── unit/
│   └── integration/
├── package.json
├── tsconfig.json
└── README.md`}
                    showLineNumbers={false}
                  />
                </div>

                <h2 id="controllers">Controllers</h2>
                <p>
                  Os controllers são responsáveis por definir as rotas e endpoints da sua API. Eles recebem as
                  requisições HTTP, delegam o processamento para os serviços e retornam as respostas apropriadas.
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`// src/controllers/UserController.ts
import { Controller, Get, Post, Put, Delete } from '@atosjs/azura';
import { UserService } from '../services/UserService';

@Controller('/api/users')
export class UserController {
  private userService = new UserService();

  @Get('/')
  async getAll(req, res) {
    const users = await this.userService.findAll();
    res.json(users);
  }

  @Get('/:id')
  async getOne(req, res) {
    try {
      const user = await this.userService.findById(req.params.id);
      res.json(user);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  @Post('/')
  async create(req, res) {
    try {
      const newUser = await this.userService.create(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  @Put('/:id')
  async update(req, res) {
    try {
      const updatedUser = await this.userService.update(req.params.id, req.body);
      res.json(updatedUser);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  @Delete('/:id')
  async delete(req, res) {
    try {
      const deletedUser = await this.userService.delete(req.params.id);
      res.json(deletedUser);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}`}
                  />
                </div>

                <h2 id="services">Services</h2>
                <p>
                  Os serviços contêm a lógica de negócios da sua aplicação. Eles são responsáveis por processar dados,
                  interagir com o banco de dados e implementar regras de negócio.
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`// src/services/UserService.ts
import { User } from '../models/User';

export class UserService {
  private users: User[] = [];

  async findAll(): Promise<User[]> {
    // Em uma aplicação real, você buscaria do banco de dados
    return this.users;
  }

  async findById(id: string): Promise<User> {
    const user = this.users.find(u => u.id === id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async create(userData: Partial<User>): Promise<User> {
    const newUser: User = {
      id: Date.now().toString(),
      ...userData as any
    };
    this.users.push(newUser);
    return newUser;
  }

  async update(id: string, userData: Partial<User>): Promise<User> {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }
    
    this.users[index] = { ...this.users[index], ...userData };
    return this.users[index];
  }

  async delete(id: string): Promise<User> {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }
    
    const deletedUser = this.users[index];
    this.users.splice(index, 1);
    return deletedUser;
  }
}`}
                  />
                </div>

                <h2 id="models">Models</h2>
                <p>
                  Os modelos definem a estrutura dos dados da sua aplicação. Em TypeScript, eles são geralmente
                  interfaces ou classes.
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`// src/models/User.ts
export interface User {
  id: string;
  name: string;
  email: string;
  role?: 'user' | 'admin';
  createdAt?: Date;
  updatedAt?: Date;
}`}
                  />
                </div>

                <h2 id="middlewares">Middlewares</h2>
                <p>
                  Os middlewares são funções que têm acesso ao objeto de requisição, ao objeto de resposta e à próxima
                  função middleware no ciclo de requisição-resposta.
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`// src/middlewares/auth.ts
import { Request, Response, NextFunction } from '@atosjs/azura';
import jwt from 'jsonwebtoken';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
}`}
                  />
                </div>

                <h2 id="plugins">Plugins</h2>
                <p>
                  Os plugins são usados para estender a funcionalidade do Azura. Eles podem adicionar novos métodos,
                  propriedades ou comportamentos ao servidor.
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`// src/plugins/DatabasePlugin.ts
import { AzuraServer } from '@atosjs/azura';
import mongoose from 'mongoose';

export const DatabasePlugin = {
  name: 'database',
  register: async (app: AzuraServer, options: { uri: string }) => {
    try {
      await mongoose.connect(options.uri);
      console.log('Connected to MongoDB');
      
      // Adiciona métodos ao app
      return {
        getConnection: () => mongoose.connection,
        disconnect: () => mongoose.disconnect()
      };
    } catch (error) {
      console.error('Failed to connect to MongoDB', error);
      throw error;
    }
  }
};

// Uso:
// const db = app.registerPlugin(DatabasePlugin, { uri: 'mongodb://localhost:27017/mydb' });`}
                  />
                </div>

                <h2 id="config">Configuração</h2>
                <p>
                  É uma boa prática separar as configurações da sua aplicação em arquivos dedicados. Isso facilita a
                  manutenção e permite diferentes configurações para diferentes ambientes.
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`// src/config/app.ts
export const appConfig = {
  port: process.env.PORT || 3000,
  environment: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  corsOptions: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }
};

// src/config/database.ts
export const dbConfig = {
  uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/mydb',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
};`}
                  />
                </div>

                <h2 id="entry-point">Ponto de Entrada</h2>
                <p>
                  O arquivo <code>index.ts</code> é o ponto de entrada da sua aplicação. Ele é responsável por
                  configurar e iniciar o servidor.
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`// src/index.ts
import { AzuraServer } from '@atosjs/azura';
import { UserController } from './controllers/UserController';
import { ProductController } from './controllers/ProductController';
import { authMiddleware } from './middlewares/auth';
import { DatabasePlugin } from './plugins/DatabasePlugin';
import { appConfig } from './config/app';
import { dbConfig } from './config/database';

async function bootstrap() {
  const app = new AzuraServer({
    port: appConfig.port
  });

  // Registrar plugins
  const db = app.registerPlugin(DatabasePlugin, dbConfig);

  // Adicionar middlewares globais
  app.use((req, res, next) => {
    console.log(\`\${req.method} \${req.url}\`);
    next();
  });

  // Carregar controllers
  app.load([
    UserController,
    ProductController
  ]);

  // Iniciar o servidor
  app.listen(() => {
    console.log(\`Server running at http://localhost:\${appConfig.port}\`);
  });
}

bootstrap().catch(console.error);`}
                  />
                </div>

                <h2 id="monorepo">Estrutura para Monorepo</h2>
                <p>
                  Para projetos maiores que consistem em múltiplos serviços ou pacotes, você pode considerar uma
                  estrutura de monorepo:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="bash"
                    code={`my-project/
├── packages/
│   ├── api/              # Serviço de API principal
│   │   ├── src/
│   │   └── package.json
│   ├── auth-service/     # Serviço de autenticação
│   │   ├── src/
│   │   └── package.json
│   └── shared/           # Código compartilhado
│       ├── src/
│       └── package.json
├── package.json          # Root package.json
└── lerna.json            # Configuração do Lerna (opcional)`}
                    showLineNumbers={false}
                  />
                </div>

                <h2 id="next-steps">Próximos Passos</h2>
                <p>Agora que você entende como estruturar seu projeto Azura, pode explorar outros tópicos:</p>

                <ul>
                  <li>
                    <Link href="/docs/guides/middlewares" className="text-purple-400 hover:text-purple-300">
                      Middlewares
                    </Link>{" "}
                    - Aprenda mais sobre como usar middlewares
                  </li>
                  <li>
                    <Link href="/docs/guides/plugins" className="text-purple-400 hover:text-purple-300">
                      Plugins
                    </Link>{" "}
                    - Estenda o Azura com plugins personalizados
                  </li>
                  <li>
                    <Link href="/docs/guides/deployment" className="text-purple-400 hover:text-purple-300">
                      Deployment
                    </Link>{" "}
                    - Aprenda como implantar sua aplicação Azura
                  </li>
                </ul>
              </div>

              <div className="hidden lg:block">
                <div className="sticky top-16">
                  <TableOfContents
                    items={[
                      { id: "overview", title: "Visão Geral", level: 2 },
                      { id: "recommended-structure", title: "Estrutura Recomendada", level: 2 },
                      { id: "controllers", title: "Controllers", level: 2 },
                      { id: "services", title: "Services", level: 2 },
                      { id: "models", title: "Models", level: 2 },
                      { id: "middlewares", title: "Middlewares", level: 2 },
                      { id: "plugins", title: "Plugins", level: 2 },
                      { id: "config", title: "Configuração", level: 2 },
                      { id: "entry-point", title: "Ponto de Entrada", level: 2 },
                      { id: "monorepo", title: "Estrutura para Monorepo", level: 2 },
                      { id: "next-steps", title: "Próximos Passos", level: 2 },
                    ]}
                  />
                </div>
              </div>
            </div>

            <div className="mt-16 border-t border-gray-800 pt-8 flex items-center justify-between">
              <Link
                href="/docs/guides/getting-started"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                ← Primeiros Passos
              </Link>
              <Link href="/docs/guides/deployment" className="text-purple-400 hover:text-purple-300 transition-colors">
                Deployment →
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
