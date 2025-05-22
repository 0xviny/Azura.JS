import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ChevronRight, Github } from "lucide-react";
import { CodeDemo } from "@/components/code-demo";
import { DocSidebar } from "@/components/doc-sidebar";
import { TableOfContents } from "@/components/table-of-contents";

export default function ControllersPage() {
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
                  <span className="text-gray-300">Controllers</span>
                </div>

                <Badge className="mb-4 bg-purple-900/30 text-purple-300 hover:bg-purple-900/40 transition-colors">
                  API Reference
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Controllers</h1>
                <p className="text-xl text-gray-300 max-w-3xl">
                  Aprenda como usar controllers para organizar suas rotas e endpoints de forma
                  eficiente.
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
                    href="https://github.com/0xviny/Azura.JS/edit/main/docs/api/controllers.md"
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
                  <a
                    href="https://github.com/0xviny/Azura.JS"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-2 h-4 w-4" /> Ver no GitHub
                  </a>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-10">
              <div className="prose prose-invert max-w-none prose-headings:scroll-mt-20 prose-pre:bg-gray-950 prose-pre:border prose-pre:border-purple-900/20">
                <h2 id="introduction">Introdução</h2>
                <p>
                  Controllers são uma parte fundamental do Azura que permitem organizar suas rotas e
                  lógica de negócios em classes. Eles são especialmente úteis para aplicações
                  maiores, onde ter todas as rotas em um único arquivo pode se tornar difícil de
                  gerenciar.
                </p>

                <p>
                  O Azura implementa controllers usando classes e decorators, o que torna o código
                  mais limpo e organizado.
                </p>

                <h2 id="basic-controller">Controller Básico</h2>
                <p>
                  Vamos começar criando um controller básico. Primeiro, você precisa importar os
                  decorators necessários do Azura:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`import { Controller, Get, Post, Put, Delete } from '@atosjs/azura';

@Controller('/users')
export class UserController {
  @Get('/')
  getAll(req, res) {
    res.json([
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' }
    ]);
  }

  @Get('/:id')
  getOne(req, res) {
    const userId = req.params.id;
    res.json({ id: userId, name: 'User ' + userId });
  }

  @Post('/')
  create(req, res) {
    const newUser = req.body;
    // Em uma aplicação real, você salvaria isso em um banco de dados
    res.status(201).json({
      ...newUser,
      id: Date.now().toString()
    });
  }

  @Put('/:id')
  update(req, res) {
    const userId = req.params.id;
    // Em uma aplicação real, você atualizaria isso em um banco de dados
    res.json({
      ...req.body,
      id: userId
    });
  }

  @Delete('/:id')
  delete(req, res) {
    const userId = req.params.id;
    // Em uma aplicação real, você excluiria isso do banco de dados
    res.json({ message: \`User $\{userId\} deleted\` });
  }
}`}
                  />
                </div>

                <p>
                  Depois de criarar seu controller, você precisa carregá-lo na instância do
                  AzuraServer:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`import { AzuraServer } from '@atosjs/azura';
import { UserController } from './controllers/UserController';

const app = new AzuraServer();

// Carrega o controller
app.load([UserController]);

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});`}
                  />
                </div>

                <h2 id="controller-decorator">Decorator @Controller</h2>
                <p>
                  O decorator <code>@Controller</code> é usado para definir o prefixo de rota para
                  todas as rotas definidas dentro da classe. Ele aceita um parâmetro de string que
                  representa o caminho base.
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`@Controller('/api/products')
export class ProductController {
  // Todas as rotas neste controller terão o prefixo '/api/products'
}`}
                  />
                </div>

                <p>
                  Você também pode usar o decorator <code>@Controller</code> sem argumentos, o que
                  significa que as rotas não terão um prefixo:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`@Controller()
export class HomeController {
  @Get('/')
  home(req, res) {
    res.send('Home Page');
  }
}`}
                  />
                </div>

                <h2 id="route-decorators">Decorators de Rota</h2>
                <p>
                  O Azura fornece decorators para os métodos HTTP comuns: <code>@Get</code>,{" "}
                  <code>@Post</code>, <code>@Put</code>, <code>@Delete</code>, <code>@Patch</code>,{" "}
                  <code>@Options</code> e <code>@Head</code>.
                </p>

                <p>
                  Cada decorator aceita um parâmetro de string que representa o caminho da rota:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`@Controller('/api')
export class ApiController {
  @Get('/users')
  getUsers(req, res) {
    // Esta rota responde a GET /api/users
  }

  @Post('/users')
  createUser(req, res) {
    // Esta rota responde a POST /api/users
  }

  @Put('/users/:id')
  updateUser(req, res) {
    // Esta rota responde a PUT /api/users/:id
  }

  @Delete('/users/:id')
  deleteUser(req, res) {
    // Esta rota responde a DELETE /api/users/:id
  }

  @Patch('/users/:id')
  patchUser(req, res) {
    // Esta rota responde a PATCH /api/users/:id
  }

  @Options('/users')
  optionsUsers(req, res) {
    // Esta rota responde a OPTIONS /api/users
  }

  @Head('/users')
  headUsers(req, res) {
    // Esta rota responde a HEAD /api/users
  }
}`}
                  />
                </div>

                <h2 id="route-parameters">Parâmetros de Rota</h2>
                <p>
                  Você pode acessar parâmetros de rota através do objeto <code>req.params</code>,
                  assim como faria em rotas tradicionais:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`@Controller('/api/users')
export class UserController {
  @Get('/:id')
  getUser(req, res) {
    const userId = req.params.id;
    // Buscar usuário com o ID fornecido
    res.json({ id: userId, name: 'User ' + userId });
  }
}`}
                  />
                </div>

                <h2 id="query-parameters">Parâmetros de Consulta</h2>
                <p>
                  Parâmetros de consulta podem ser acessados através do objeto{" "}
                  <code>req.query</code>:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`@Controller('/api/users')
export class UserController {
  @Get('/')
  getUsers(req, res) {
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    
    // Buscar usuários com paginação
    res.json({
      page: page,
      limit: limit,
      users: [
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' }
      ]
    });
  }
}`}
                  />
                </div>

                <h2 id="request-body">Corpo da Requisição</h2>
                <p>
                  O corpo da requisição pode ser acessado através do objeto <code>req.body</code>.
                  Note que você precisará usar um middleware de parsing de corpo, como{" "}
                  <code>express.json()</code> ou <code>body-parser</code>:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`import { AzuraServer } from '@atosjs/azura';
import { UserController } from './controllers/UserController';

const app = new AzuraServer();

// Middleware para parsing de JSON
app.use(express.json());

// Carrega o controller
app.load([UserController]);

app.listen(3000);`}
                  />
                </div>

                <p>
                  Agora você pode acessar <code>req.body</code> em seus controllers:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`@Controller('/api/users')
export class UserController {
  @Post('/')
  createUser(req, res) {
    const { name, email } = req.body;
    
    // Validar dados
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }
    
    // Criar usuário
    const newUser = {
      id: Date.now().toString(),
      name,
      email
    };
    
    res.status(201).json(newUser);
  }
}`}
                  />
                </div>

                <h2 id="middleware">Middlewares em Controllers</h2>
                <p>
                  Você pode aplicar middlewares a rotas específicas em seus controllers. O Azura
                  permite que você passe middlewares como argumentos adicionais para os decorators
                  de rota:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`import { Controller, Get, Post, Put, Delete } from '@atosjs/azura';

// Middleware de autenticação
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  // Verificar token...
  next();
};

// Middleware de validação
const validateUserInput = (req, res, next) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  next();
};

@Controller('/api/users')
export class UserController {
  @Get('/')
  getUsers(req, res) {
    // Rota pública
    res.json([{ id: 1, name: 'John' }]);
  }

  @Get('/profile')
  getUserProfile(req, res) {
    // Rota protegida
    res.json({ id: 1, name: 'John', email: 'john@example.com' });
  }

  @Post('/', authMiddleware, validateUserInput)
  createUser(req, res) {
    // Esta rota usa dois middlewares
    const { name, email } = req.body;
    res.status(201).json({ id: Date.now().toString(), name, email });
  }
}`}
                  />
                </div>

                <h2 id="controller-middleware">Middleware para Todo o Controller</h2>
                <p>
                  Se você quiser aplicar um middleware a todas as rotas em um controller, você pode
                  usar o decorator <code>@UseMiddleware</code>:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`import { Controller, Get, Post, UseMiddleware } from '@atosjs/azura';

const authMiddleware = (req, res, next) => {
  // Lógica de autenticação
  next();
};

@Controller('/api/admin')
@UseMiddleware(authMiddleware)
export class AdminController {
  // Todas as rotas neste controller usarão o authMiddleware
  
  @Get('/dashboard')
  getDashboard(req, res) {
    res.json({ stats: { users: 100, products: 50 } });
  }
  
  @Post('/settings')
  updateSettings(req, res) {
    res.json({ message: 'Settings updated' });
  }
}`}
                  />
                </div>

                <h2 id="dependency-injection">Injeção de Dependência</h2>
                <p>
                  O Azura suporta um sistema simples de injeção de dependência que permite injetar
                  serviços em seus controllers. Isso é útil para separar a lógica de negócios da
                  lógica de roteamento:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`// src/services/UserService.ts
export class UserService {
  private users = [
    { id: '1', name: 'John' },
    { id: '2', name: 'Jane' }
  ];

  async findAll() {
    return this.users;
  }

  async findById(id: string) {
    const user = this.users.find(u => u.id === id);
    if (!user) throw new Error('User not found');
    return user;
  }

  async create(userData: any) {
    const newUser = { id: Date.now().toString(), ...userData };
    this.users.push(newUser);
    return newUser;
  }
}

// src/controllers/UserController.ts
import { Controller, Get, Post, Inject } from '@atosjs/azura';
import { UserService } from '../services/UserService';

@Controller('/api/users')
export class UserController {
  @Inject()
  private userService: UserService;

  @Get('/')
  async getUsers(req, res) {
    const users = await this.userService.findAll();
    res.json(users);
  }

  @Get('/:id')
  async getUser(req, res) {
    try {
      const user = await this.userService.findById(req.params.id);
      res.json(user);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  @Post('/')
  async createUser(req, res) {
    const newUser = await this.userService.create(req.body);
    res.status(201).json(newUser);
  }
}`}
                  />
                </div>

                <p>
                  Para usar a injeção de dependência, você precisa registrar seus serviços no
                  contêiner de injeção de dependência:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`// src/index.ts
import { AzuraServer, Container } from '@atosjs/azura';
import { UserController } from './controllers/UserController';
import { UserService } from './services/UserService';

// Registrar serviços
Container.register(UserService);

const app = new AzuraServer();

// Carregar controllers
app.load([UserController]);

app.listen(3000);`}
                  />
                </div>

                <h2 id="error-handling">Tratamento de Erros</h2>
                <p>
                  Para lidar com erros em seus controllers, você pode usar blocos try-catch ou um
                  middleware de tratamento de erros:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`// Usando try-catch
@Controller('/api/users')
export class UserController {
  @Get('/:id')
  async getUser(req, res) {
    try {
      const user = await this.userService.findById(req.params.id);
      res.json(user);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

// Usando middleware de tratamento de erros
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
};

// Adicione este middleware após todas as rotas
app.use(errorHandler);`}
                  />
                </div>

                <h2 id="async-handlers">Handlers Assíncronos</h2>
                <p>
                  O Azura suporta handlers assíncronos, permitindo que você use{" "}
                  <code>async/await</code> em seus métodos de controller:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`@Controller('/api/users')
export class UserController {
  @Get('/')
  async getUsers(req, res) {
    // Simulando uma operação assíncrona, como buscar do banco de dados
    const users = await db.users.findAll();
    res.json(users);
  }

  @Post('/')
  async createUser(req, res) {
    try {
      const newUser = await db.users.create(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}`}
                  />
                </div>

                <h2 id="controller-inheritance">Herança de Controller</h2>
                <p>Você pode usar herança para compartilhar funcionalidades entre controllers:</p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`// Controller base com métodos comuns
export class BaseController {
  protected sendSuccess(res, data, status = 200) {
    res.status(status).json({
      success: true,
      data
    });
  }

  protected sendError(res, message, status = 400) {
    res.status(status).json({
      success: false,
      error: message
    });
  }
}

// Controller específico que herda do BaseController
@Controller('/api/users')
export class UserController extends BaseController {
  @Get('/')
  async getUsers(req, res) {
    try {
      const users = await db.users.findAll();
      this.sendSuccess(res, users);
    } catch (error) {
      this.sendError(res, error.message, 500);
    }
  }

  @Post('/')
  async createUser(req, res) {
    try {
      const newUser = await db.users.create(req.body);
      this.sendSuccess(res, newUser, 201);
    } catch (error) {
      this.sendError(res, error.message);
    }
  }
}`}
                  />
                </div>

                <h2 id="versioning">Versionamento de API</h2>
                <p>Você pode usar controllers para implementar versionamento de API:</p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`// API v1
@Controller('/api/v1/users')
export class UserControllerV1 {
  @Get('/')
  getUsers(req, res) {
    res.json([
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' }
    ]);
  }
}

// API v2 com campos adicionais
@Controller('/api/v2/users')
export class UserControllerV2 {
  @Get('/')
  getUsers(req, res) {
    res.json([
      { id: 1, name: 'John', email: 'john@example.com', role: 'user' },
      { id: 2, name: 'Jane', email: 'jane@example.com', role: 'admin' }
    ]);
  }
}

// Carregando ambas as versões
app.load([UserControllerV1, UserControllerV2]);`}
                  />
                </div>

                <h2 id="best-practices">Melhores Práticas</h2>
                <p>Aqui estão algumas melhores práticas para usar controllers no Azura:</p>

                <ul>
                  <li>
                    <strong>Separação de Responsabilidades</strong>: Mantenha seus controllers
                    focados em lidar com requisições HTTP e delegue a lógica de negócios para
                    serviços.
                  </li>
                  <li>
                    <strong>Nomeação Consistente</strong>: Use nomes consistentes para seus
                    controllers, como UserController, ProductController, etc.
                  </li>
                  <li>
                    <strong>Organização de Arquivos</strong>: Mantenha cada controller em seu
                    próprio arquivo e organize-os em uma pasta de controllers.
                  </li>
                  <li>
                    <strong>Tratamento de Erros</strong>: Implemente tratamento de erros adequado em
                    seus controllers para fornecer respostas de erro consistentes.
                  </li>
                  <li>
                    <strong>Validação</strong>: Valide os dados de entrada antes de processá-los,
                    usando middlewares de validação ou bibliotecas como Joi ou class-validator.
                  </li>
                </ul>

                <h2 id="next-steps">Próximos Passos</h2>
                <p>
                  Agora que você entende como usar controllers no Azura, você pode explorar outros
                  tópicos relacionados:
                </p>

                <ul>
                  <li>
                    <Link
                      href="/docs/api/middlewares"
                      className="text-purple-400 hover:text-purple-300"
                    >
                      Middlewares
                    </Link>{" "}
                    - Aprenda como usar middlewares para processar requisições
                  </li>
                  <li>
                    <Link
                      href="/docs/api/plugins"
                      className="text-purple-400 hover:text-purple-300"
                    >
                      Plugins
                    </Link>{" "}
                    - Estenda a funcionalidade do Azura com plugins
                  </li>
                  <li>
                    <Link
                      href="/docs/examples/rest-api"
                      className="text-purple-400 hover:text-purple-300"
                    >
                      Exemplo de API REST
                    </Link>{" "}
                    - Veja um exemplo completo de API REST usando controllers
                  </li>
                </ul>
              </div>

              <div className="hidden lg:block">
                <div className="sticky top-16">
                  <TableOfContents
                    items={[
                      { id: "introduction", title: "Introdução", level: 2 },
                      { id: "basic-controller", title: "Controller Básico", level: 2 },
                      { id: "controller-decorator", title: "Decorator @Controller", level: 2 },
                      { id: "route-decorators", title: "Decorators de Rota", level: 2 },
                      { id: "route-parameters", title: "Parâmetros de Rota", level: 2 },
                      { id: "query-parameters", title: "Parâmetros de Consulta", level: 2 },
                      { id: "request-body", title: "Corpo da Requisição", level: 2 },
                      { id: "middleware", title: "Middlewares em Controllers", level: 2 },
                      {
                        id: "controller-middleware",
                        title: "Middleware para Todo o Controller",
                        level: 2,
                      },
                      { id: "dependency-injection", title: "Injeção de Dependência", level: 2 },
                      { id: "error-handling", title: "Tratamento de Erros", level: 2 },
                      { id: "async-handlers", title: "Handlers Assíncronos", level: 2 },
                      { id: "controller-inheritance", title: "Herança de Controller", level: 2 },
                      { id: "versioning", title: "Versionamento de API", level: 2 },
                      { id: "best-practices", title: "Melhores Práticas", level: 2 },
                      { id: "next-steps", title: "Próximos Passos", level: 2 },
                    ]}
                  />
                </div>
              </div>
            </div>

            <div className="mt-16 border-t border-gray-800 pt-8 flex items-center justify-between">
              <Link
                href="/docs/api/azura-app"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                ← AzuraServer
              </Link>
              <Link
                href="/docs/api/middlewares"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                Middlewares →
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
