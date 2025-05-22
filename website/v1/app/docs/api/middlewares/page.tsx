import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ChevronRight, Github } from "lucide-react"
import { CodeDemo } from "@/components/code-demo"
import { DocSidebar } from "@/components/doc-sidebar"
import { TableOfContents } from "@/components/table-of-contents"

export default function MiddlewaresPage() {
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
                  <Link href="/docs/api" className="hover:text-purple-400 transition-colors">
                    API
                  </Link>
                  <ChevronRight className="h-4 w-4" />
                  <span className="text-gray-300">Middlewares</span>
                </div>

                <Badge className="mb-4 bg-purple-900/30 text-purple-300 hover:bg-purple-900/40 transition-colors">
                  API Reference
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Middlewares</h1>
                <p className="text-xl text-gray-300 max-w-3xl">
                  Aprenda como usar middlewares para processar requisições e adicionar funcionalidades à sua aplicação
                  Azura.
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
                    href="https://github.com/0xviny/Azura.JS/edit/main/docs/api/middlewares.md"
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
                <h2 id="introduction">Introdução</h2>
                <p>
                  Middlewares são funções que têm acesso ao objeto de requisição (req), ao objeto de resposta (res) e à
                  próxima função middleware no ciclo de requisição-resposta da aplicação. Eles podem executar código,
                  modificar objetos de requisição e resposta, encerrar o ciclo de requisição-resposta ou chamar o
                  próximo middleware na pilha.
                </p>

                <p>
                  No Azura, os middlewares funcionam de maneira semelhante ao Express, permitindo que você processe
                  requisições antes que elas cheguem aos seus handlers de rota.
                </p>

                <h2 id="basic-middleware">Middleware Básico</h2>
                <p>
                  Um middleware básico é uma função que recebe três parâmetros: <code>req</code>, <code>res</code> e{" "}
                  <code>next</code>. Aqui está um exemplo simples de um middleware de logging:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`import { Request, Response, NextFunction } from '@atosjs/azura';

export function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();
  
  // Registra a requisição
  console.log(\`\${new Date().toISOString()} - \${req.method} \${req.url}\`);
  
  // Modifica o objeto de resposta para capturar quando a resposta for enviada
  const originalSend = res.send;
  res.send = function(body) {
    const duration = Date.now() - start;
    console.log(\`\${new Date().toISOString()} - \${req.method} \${req.url} - \${res.statusCode} - \${duration}ms\`);
    return originalSend.call(this, body);
  };
  
  // Chama o próximo middleware na pilha
  next();
}`}
                  />
                </div>

                <h2 id="using-middleware">Usando Middlewares</h2>
                <p>Existem várias maneiras de usar middlewares no Azura:</p>

                <h3 id="global-middleware">Middleware Global</h3>
                <p>
                  Middlewares globais são aplicados a todas as rotas da aplicação. Você pode registrá-los usando o
                  método <code>use</code> da instância do AzuraServer:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`import { AzuraServer } from '@atosjs/azura';
import { loggerMiddleware } from './middlewares/logger';
import { corsMiddleware } from './middlewares/cors';

const app = new AzuraServer();

// Registra middlewares globais
app.use(loggerMiddleware);
app.use(corsMiddleware);

// Define rotas
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000);`}
                  />
                </div>

                <h3 id="route-middleware">Middleware de Rota</h3>
                <p>
                  Você pode aplicar middlewares a rotas específicas, passando-os como argumentos antes do handler da
                  rota:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`import { AzuraServer } from '@atosjs/azura';
import { authMiddleware } from './middlewares/auth';
import { validateUserMiddleware } from './middlewares/validation';

const app = new AzuraServer();

// Rota pública
app.get('/public', (req, res) => {
  res.send('Public route');
});

// Rota protegida com middleware de autenticação
app.get('/protected', authMiddleware, (req, res) => {
  res.send('Protected route');
});

// Rota com múltiplos middlewares
app.post('/users', authMiddleware, validateUserMiddleware, (req, res) => {
  res.status(201).json({ id: Date.now().toString(), ...req.body });
});

app.listen(3000);`}
                  />
                </div>

                <h3 id="controller-middleware">Middleware em Controllers</h3>
                <p>
                  Você também pode aplicar middlewares a controllers inteiros ou a métodos específicos de controllers
                  usando decorators:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`import { Controller, Get, Post, UseMiddleware } from '@atosjs/azura';
import { authMiddleware } from '../middlewares/auth';
import { validateUserMiddleware } from '../middlewares/validation';

// Middleware aplicado a todo o controller
@Controller('/api/admin')
@UseMiddleware(authMiddleware)
export class AdminController {
  @Get('/dashboard')
  getDashboard(req, res) {
    res.json({ stats: { users: 100, products: 50 } });
  }
  
  // Middleware adicional aplicado apenas a este método
  @Post('/users')
  @UseMiddleware(validateUserMiddleware)
  createUser(req, res) {
    res.status(201).json({ id: Date.now().toString(), ...req.body });
  }
}`}
                  />
                </div>

                <h2 id="common-middlewares">Middlewares Comuns</h2>
                <p>Aqui estão alguns middlewares comuns que você pode implementar em sua aplicação Azura:</p>

                <h3 id="cors-middleware">Middleware CORS</h3>
                <p>
                  O middleware CORS (Cross-Origin Resource Sharing) permite que você controle quais origens podem
                  acessar sua API:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`import { Request, Response, NextFunction } from '@atosjs/azura';

export function corsMiddleware(req: Request, res: Response, next: NextFunction) {
  // Configura os cabeçalhos CORS
  res.setHeader('Access-Control-Allow-Origin', '*'); // Ou especifique origens permitidas
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Responde imediatamente a requisições OPTIONS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
}`}
                  />
                </div>

                <p>
                  Alternativamente, você pode usar o pacote <code>cors</code> do npm:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`import { AzuraServer } from '@atosjs/azura';
import cors from 'cors';

const app = new AzuraServer();

// Configuração básica do CORS
app.use(cors());

// Ou com opções personalizadas
app.use(cors({
  origin: ['https://example.com', 'https://api.example.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));`}
                  />
                </div>

                <h3 id="auth-middleware">Middleware de Autenticação</h3>
                <p>
                  Um middleware de autenticação verifica se o usuário está autenticado antes de permitir o acesso a
                  rotas protegidas:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`import { Request, Response, NextFunction } from '@atosjs/azura';
import jwt from 'jsonwebtoken';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  // Obtém o token do cabeçalho Authorization
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  
  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }
  
  try {
    // Verifica o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    
    // Adiciona o usuário decodificado à requisição
    req.user = decoded;
    
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
}`}
                  />
                </div>

                <h3 id="validation-middleware">Middleware de Validação</h3>
                <p>Um middleware de validação verifica se os dados da requisição estão no formato correto:</p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`import { Request, Response, NextFunction } from '@atosjs/azura';
import Joi from 'joi';

// Middleware de validação genérico
export function validateSchema(schema: Joi.Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        error: 'Dados inválidos',
        details: error.details.map(detail => detail.message)
      });
    }
    
    next();
  };
}

// Exemplo de uso
const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

// Em sua aplicação
app.post('/users', validateSchema(userSchema), (req, res) => {
  // Os dados já foram validados
  res.status(201).json({ id: Date.now().toString(), ...req.body });
});`}
                  />
                </div>

                <h3 id="error-middleware">Middleware de Tratamento de Erros</h3>
                <p>
                  Um middleware de tratamento de erros captura exceções lançadas durante o processamento da requisição:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`import { Request, Response, NextFunction } from '@atosjs/azura';

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack);
  
  // Não expor detalhes do erro em produção
  const isProd = process.env.NODE_ENV === 'production';
  
  res.status(500).json({
    error: 'Internal Server Error',
    message: isProd ? 'Algo deu errado' : err.message,
    stack: isProd ? undefined : err.stack
  });
}`}
                  />
                </div>

                <p>
                  Importante: Middlewares de tratamento de erros devem ser definidos após todas as outras rotas e
                  middlewares:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`import { AzuraServer } from '@atosjs/azura';
import { errorHandler } from './middlewares/errorHandler';

const app = new AzuraServer();

// Rotas e outros middlewares
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Middleware de tratamento de erros (deve ser o último)
app.use(errorHandler);

app.listen(3000);`}
                  />
                </div>

                <h2 id="async-middleware">Middlewares Assíncronos</h2>
                <p>
                  Você pode criar middlewares assíncronos usando <code>async/await</code>:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`import { Request, Response, NextFunction } from '@atosjs/azura';

export async function databaseMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    // Operação assíncrona, como conectar ao banco de dados
    const connection = await db.connect();
    
    // Adiciona a conexão à requisição
    req.db = connection;
    
    // Chama o próximo middleware
    next();
  } catch (error) {
    // Passa o erro para o middleware de tratamento de erros
    next(error);
  }
}`}
                  />
                </div>

                <p>
                  Importante: Ao usar middlewares assíncronos, certifique-se de capturar erros e passá-los para o
                  <code>next</code> para que sejam tratados pelo middleware de tratamento de erros.
                </p>

                <h2 id="middleware-order">Ordem dos Middlewares</h2>
                <p>
                  A ordem em que você registra os middlewares é importante, pois eles são executados na mesma ordem.
                  Aqui está um exemplo de ordem recomendada:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`import { AzuraServer } from '@atosjs/azura';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { loggerMiddleware } from './middlewares/logger';
import { errorHandler } from './middlewares/errorHandler';

const app = new AzuraServer();

// 1. Middlewares de segurança e cabeçalhos
app.use(helmet());
app.use(cors());

// 2. Middleware de logging
app.use(loggerMiddleware);

// 3. Middlewares de parsing de corpo
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. Rotas da aplicação
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// 5. Middleware para rotas não encontradas
app.use((req, res, next) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// 6. Middleware de tratamento de erros (sempre por último)
app.use(errorHandler);

app.listen(3000);`}
                  />
                </div>

                <h2 id="third-party-middleware">Middlewares de Terceiros</h2>
                <p>
                  O Azura é compatível com a maioria dos middlewares do Express. Aqui estão alguns middlewares populares
                  que você pode usar:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`import { AzuraServer } from '@atosjs/azura';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import rateLimit from 'express-rate-limit';

const app = new AzuraServer();

// Segurança
app.use(helmet());
app.use(cors());

// Compressão de resposta
app.use(compression());

// Logging
app.use(morgan('dev'));

// Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Sessões
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Rate limiting
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // limite de 100 requisições por IP
}));

// Rotas
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000);`}
                  />
                </div>

                <h2 id="custom-middleware">Criando Middlewares Personalizados</h2>
                <p>
                  Você pode criar middlewares personalizados para atender às necessidades específicas da sua aplicação.
                  Aqui está um exemplo de um middleware que adiciona informações de paginação à requisição:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`import { Request, Response, NextFunction } from '@atosjs/azura';

export function paginationMiddleware(req: Request, res: Response, next: NextFunction) {
  // Obtém parâmetros de consulta
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  
  // Valida os valores
  const validPage = page > 0 ? page : 1;
  const validLimit = limit > 0 && limit <= 100 ? limit : 10;
  
  // Calcula o offset
  const offset = (validPage - 1) * validLimit;
  
  // Adiciona informações de paginação à requisição
  req.pagination = {
    page: validPage,
    limit: validLimit,
    offset
  };
  
  next();
}`}
                  />
                </div>

                <p>Você pode usar este middleware em rotas que precisam de paginação:</p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`app.get('/api/users', paginationMiddleware, async (req, res) => {
  const { page, limit, offset } = req.pagination;
  
  // Busca usuários com paginação
  const users = await db.users.findAll({
    limit,
    offset
  });
  
  // Conta o total de usuários
  const total = await db.users.count();
  
  // Calcula o total de páginas
  const totalPages = Math.ceil(total / limit);
  
  res.json({
    data: users,
    pagination: {
      page,
      limit,
      total,
      totalPages
    }
  });
});`}
                  />
                </div>

                <h2 id="middleware-factory">Fábricas de Middleware</h2>
                <p>
                  Uma fábrica de middleware é uma função que retorna um middleware com base em parâmetros
                  personalizados. Isso é útil para criar middlewares configuráveis:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`import { Request, Response, NextFunction } from '@atosjs/azura';

// Fábrica de middleware de timeout
export function timeout(ms: number) {
  return (req: Request, res: Response, next: NextFunction) => {
    // Define um timeout para a requisição
    const timeoutId = setTimeout(() => {
      res.status(408).json({ error: 'Request Timeout' });
    }, ms);
    
    // Limpa o timeout quando a resposta for enviada
    res.on('finish', () => {
      clearTimeout(timeoutId);
    });
    
    next();
  };
}

// Uso
app.get('/api/slow-operation', timeout(5000), async (req, res) => {
  // Esta operação tem 5 segundos para completar
  const result = await slowOperation();
  res.json(result);
});`}
                  />
                </div>

                <h2 id="best-practices">Melhores Práticas</h2>
                <p>Aqui estão algumas melhores práticas para usar middlewares no Azura:</p>

                <ul>
                  <li>
                    <strong>Mantenha os middlewares focados</strong>: Cada middleware deve ter uma única
                    responsabilidade.
                  </li>
                  <li>
                    <strong>Organize os middlewares em arquivos separados</strong>: Isso facilita a manutenção e o
                    reuso.
                  </li>
                  <li>
                    <strong>Cuide da ordem dos middlewares</strong>: A ordem em que você registra os middlewares é
                    importante.
                  </li>
                  <li>
                    <strong>Trate erros adequadamente</strong>: Use try/catch em middlewares assíncronos e passe os
                    erros para o next.
                  </li>
                  <li>
                    <strong>Documente seus middlewares</strong>: Adicione comentários explicando o que cada middleware
                    faz e como usá-lo.
                  </li>
                  <li>
                    <strong>Teste seus middlewares</strong>: Escreva testes unitários para garantir que seus middlewares
                    funcionem corretamente.
                  </li>
                </ul>

                <h2 id="next-steps">Próximos Passos</h2>
                <p>
                  Agora que você entende como usar middlewares no Azura, você pode explorar outros tópicos relacionados:
                </p>

                <ul>
                  <li>
                    <Link href="/docs/api/plugins" className="text-purple-400 hover:text-purple-300">
                      Plugins
                    </Link>{" "}
                    - Aprenda como estender a funcionalidade do Azura com plugins
                  </li>
                  <li>
                    <Link href="/docs/examples/authentication" className="text-purple-400 hover:text-purple-300">
                      Exemplo de Autenticação
                    </Link>{" "}
                    - Veja um exemplo completo de autenticação usando middlewares
                  </li>
                  <li>
                    <Link href="/docs/examples/validation" className="text-purple-400 hover:text-purple-300">
                      Exemplo de Validação
                    </Link>{" "}
                    - Veja um exemplo completo de validação usando middlewares
                  </li>
                </ul>
              </div>

              <div className="hidden lg:block">
                <div className="sticky top-16">
                  <TableOfContents
                    items={[
                      { id: "introduction", title: "Introdução", level: 2 },
                      { id: "basic-middleware", title: "Middleware Básico", level: 2 },
                      { id: "using-middleware", title: "Usando Middlewares", level: 2 },
                      { id: "global-middleware", title: "Middleware Global", level: 3 },
                      { id: "route-middleware", title: "Middleware de Rota", level: 3 },
                      { id: "controller-middleware", title: "Middleware em Controllers", level: 3 },
                      { id: "common-middlewares", title: "Middlewares Comuns", level: 2 },
                      { id: "cors-middleware", title: "Middleware CORS", level: 3 },
                      { id: "auth-middleware", title: "Middleware de Autenticação", level: 3 },
                      { id: "validation-middleware", title: "Middleware de Validação", level: 3 },
                      { id: "error-middleware", title: "Middleware de Tratamento de Erros", level: 3 },
                      { id: "async-middleware", title: "Middlewares Assíncronos", level: 2 },
                      { id: "middleware-order", title: "Ordem dos Middlewares", level: 2 },
                      { id: "third-party-middleware", title: "Middlewares de Terceiros", level: 2 },
                      { id: "custom-middleware", title: "Criando Middlewares Personalizados", level: 2 },
                      { id: "middleware-factory", title: "Fábricas de Middleware", level: 2 },
                      { id: "best-practices", title: "Melhores Práticas", level: 2 },
                      { id: "next-steps", title: "Próximos Passos", level: 2 },
                    ]}
                  />
                </div>
              </div>
            </div>

            <div className="mt-16 border-t border-gray-800 pt-8 flex items-center justify-between">
              <Link href="/docs/api/controllers" className="text-purple-400 hover:text-purple-300 transition-colors">
                ← Controllers
              </Link>
              <Link href="/docs/api/plugins" className="text-purple-400 hover:text-purple-300 transition-colors">
                Plugins →
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
