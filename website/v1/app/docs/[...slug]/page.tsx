import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ChevronRight, Github } from "lucide-react";
import { CodeDemo } from "@/components/code-demo";
import { DocSidebar } from "@/components/doc-sidebar";
import { TableOfContents } from "@/components/table-of-contents";

export default function DocPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <div className="container max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-10">
          <DocSidebar className="w-full lg:w-64 shrink-0" />

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
                  <span className="text-gray-300">AzuraServer</span>
                </div>

                <Badge className="mb-4 bg-purple-900/30 text-purple-300 hover:bg-purple-900/40 transition-colors">
                  API Reference
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">AzuraServer</h1>
                <p className="text-xl text-gray-300 max-w-3xl">
                  A classe principal do Azura que cria e configura o servidor HTTP.
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
                    href="https://github.com/0xviny/Azura.JS/edit/main/docs/api/azura-app.md"
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
                  <code>AzuraServer</code> é a classe principal do Azura que cria e configura o
                  servidor HTTP. Ela fornece métodos para definir rotas, middlewares, plugins e
                  iniciar o servidor.
                </p>

                <h2 id="installation">Instalação</h2>
                <p>
                  Antes de usar a classe <code>AzuraServer</code>, você precisa instalar o pacote
                  Azura:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="bash"
                    code="npm install @atosjs/azura"
                    showLineNumbers={false}
                  />
                </div>

                <h2 id="basic-usage">Uso Básico</h2>
                <p>
                  Aqui está um exemplo básico de como usar a classe <code>AzuraServer</code>:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="javascript"
                    code={`const { AzuraServer } = require('@atosjs/azura');

const app = new AzuraServer({ port: 3000 });

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen();`}
                  />
                </div>

                <h2 id="constructor">Construtor</h2>
                <p>
                  O construtor da classe <code>AzuraServer</code> aceita um objeto de opções para
                  configurar o servidor.
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`const app = new AzuraServer({
  port: 3000,        // Porta padrão (opcional)
  https: false,      // Habilitar HTTPS (opcional)
  http2: false,      // Habilitar HTTP/2 (opcional)
  cluster: false,    // Usar cluster para múltiplos CPUs (opcional)
});`}
                  />
                </div>

                <h2 id="methods">Métodos</h2>

                <h3 id="method-get">app.get(path, ...handlers)</h3>
                <p>Registra uma rota para o método HTTP GET.</p>

                <div className="not-prose">
                  <CodeDemo
                    language="javascript"
                    code={`app.get('/users', (req, res) => {
  res.json([{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]);
});

// Com múltiplos handlers (middlewares)
app.get('/users/:id', authMiddleware, (req, res) => {
  res.json({ id: req.params.id, name: 'John' });
});`}
                  />
                </div>

                <h3 id="method-post">app.post(path, ...handlers)</h3>
                <p>Registra uma rota para o método HTTP POST.</p>

                <div className="not-prose">
                  <CodeDemo
                    language="javascript"
                    code={`app.post('/users', (req, res) => {
  // req.body contém os dados enviados no corpo da requisição
  const newUser = { id: Date.now(), ...req.body };
  res.status(201).json(newUser);
});`}
                  />
                </div>

                <h3 id="method-put">app.put(path, ...handlers)</h3>
                <p>Registra uma rota para o método HTTP PUT.</p>

                <h3 id="method-delete">app.delete(path, ...handlers)</h3>
                <p>Registra uma rota para o método HTTP DELETE.</p>

                <h3 id="method-use">app.use(...handlers)</h3>
                <p>Adiciona middlewares globais que serão executados para todas as rotas.</p>

                <div className="not-prose">
                  <CodeDemo
                    language="javascript"
                    code={`// Middleware de logging
app.use((req, res, next) => {
  console.log(\`\${req.method} \${req.url}\`);
  next();
});

// Middleware de parsing de JSON
app.use((req, res, next) => {
  if (req.headers['content-type'] === 'application/json') {
    let data = '';
    req.on('data', chunk => {
      data += chunk;
    });
    req.on('end', () => {
      try {
        req.body = JSON.parse(data);
        next();
      } catch (e) {
        res.status(400).json({ error: 'Invalid JSON' });
      }
    });
  } else {
    next();
  }
});`}
                  />
                </div>

                <h3 id="method-load">app.load(controllers)</h3>
                <p>Carrega controladores que usam decorators para definir rotas.</p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`import { Controller, Get, Post } from '@atosjs/azura';

@Controller('/users')
class UserController {
  @Get('/')
  getUsers(req, res) {
    res.json([{ id: 1, name: 'John' }]);
  }
  
  @Post('/')
  createUser(req, res) {
    res.status(201).json({ id: 2, ...req.body });
  }
}

// Carregando o controlador
app.load([UserController]);`}
                  />
                </div>

                <h3 id="method-listen">app.listen(port?, callback?)</h3>
                <p>Inicia o servidor HTTP na porta especificada.</p>

                <div className="not-prose">
                  <CodeDemo
                    language="javascript"
                    code={`// Porta especificada no método listen
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});

// Usando a porta definida no construtor
app.listen(() => {
  console.log('Server running');
});`}
                  />
                </div>

                <h3 id="method-register-plugin">app.registerPlugin(plugin, options?)</h3>
                <p>Registra um plugin para estender a funcionalidade do Azura.</p>

                <div className="not-prose">
                  <CodeDemo
                    language="javascript"
                    code={`// Definindo um plugin
interface AuthAPI {
requireAuth(): (req: Request, res: Response, next: Function) => void;
}

const authPlugin = {
  name: "auth",
  register(app: AzuraServer): AuthAPI {
    const api: AuthAPI = {
      requireAuth: () => (req, res, next) => {
        if (!req.headers.authorization) {
          return res.status(401).json({ error: "Unauthorized" });
        }
        next();
      },
    };
    return api;
  },
};

// Registrando o plugin
const auth = app.registerPlugin<AuthAPI>(authPlugin)!;

// Usando o plugin
app.get("/protected", auth.requireAuth(), async (req: Request, res: Response) => {
  return res.json({ message: "Protected route" });
});`}
                  />
                </div>

                <h2 id="events">Eventos</h2>
                <p>
                  A classe <code>AzuraServer</code> emite eventos durante o ciclo de vida da
                  aplicação.
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="javascript"
                    code={`// Evento antes de iniciar o servidor
app.onHook('beforeStart', () => {
  console.log('Server is about to start');
});

// Evento depois de iniciar o servidor
app.onHook('afterStart', () => {
  console.log('Server has started');
});

// Evento antes de parar o servidor
app.onHook('beforeStop', () => {
  console.log('Server is about to stop');
});

// Evento depois de parar o servidor
app.onHook('afterStop', () => {
  console.log('Server has stopped');
});`}
                  />
                </div>

                <h2 id="examples">Exemplos</h2>

                <h3 id="example-basic-server">Servidor Básico</h3>
                <div className="not-prose">
                  <CodeDemo
                    language="javascript"
                    code={`const { AzuraServer } = require('@atosjs/azura');

const app = new AzuraServer();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/json', (req, res) => {
  res.json({ message: 'Hello World!' });
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});`}
                  />
                </div>

                <h3 id="example-with-middleware">Com Middleware</h3>
                <div className="not-prose">
                  <CodeDemo
                    language="javascript"
                    code={`const { AzuraServer } = require('@atosjs/azura');

const app = new AzuraServer();

// Middleware de logging
app.use((req, res, next) => {
  console.log(\`\${req.method} \${req.url}\`);
  next();
});

// Middleware de autenticação
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  // Verificar token...
  next();
};

app.get('/', (req, res) => {
  res.send('Public route');
});

app.get('/admin', authMiddleware, (req, res) => {
  res.send('Admin route');
});

app.listen(3000);`}
                  />
                </div>

                <h3 id="example-with-controllers">Com Controllers</h3>
                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`import { AzuraServer, Controller, Get, Post, Put, Delete } from '@atosjs/azura';

@Controller('/api/users')
class UserController {
  private users = [
    { id: '1', name: 'John' },
    { id: '2', name: 'Jane' }
  ];

  @Get('/')
  getAll(req, res) {
    res.json(this.users);
  }

  @Get('/:id')
  getOne(req, res) {
    const user = this.users.find(u => u.id === req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  }

  @Post('/')
  create(req, res) {
    const newUser = { id: Date.now().toString(), ...req.body };
    this.users.push(newUser);
    res.status(201).json(newUser);
  }

  @Put('/:id')
  update(req, res) {
    const index = this.users.findIndex(u => u.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'User not found' });
    
    this.users[index] = { ...this.users[index], ...req.body };
    res.json(this.users[index]);
  }

  @Delete('/:id')
  delete(req, res) {
    const index = this.users.findIndex(u => u.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'User not found' });
    
    const deleted = this.users.splice(index, 1);
    res.json(deleted[0]);
  }
}

const app = new AzuraServer();
app.load([UserController]);
app.listen(3000);`}
                  />
                </div>
              </div>

              <div className="hidden lg:block">
                <div className="sticky top-16">
                  <TableOfContents
                    items={[
                      { id: "introduction", title: "Introdução", level: 2 },
                      { id: "installation", title: "Instalação", level: 2 },
                      { id: "basic-usage", title: "Uso Básico", level: 2 },
                      { id: "constructor", title: "Construtor", level: 2 },
                      { id: "methods", title: "Métodos", level: 2 },
                      { id: "method-get", title: "app.get()", level: 3 },
                      { id: "method-post", title: "app.post()", level: 3 },
                      { id: "method-put", title: "app.put()", level: 3 },
                      { id: "method-delete", title: "app.delete()", level: 3 },
                      { id: "method-use", title: "app.use()", level: 3 },
                      { id: "method-load", title: "app.load()", level: 3 },
                      { id: "method-listen", title: "app.listen()", level: 3 },
                      { id: "method-register-plugin", title: "app.registerPlugin()", level: 3 },
                      { id: "events", title: "Eventos", level: 2 },
                      { id: "examples", title: "Exemplos", level: 2 },
                      { id: "example-basic-server", title: "Servidor Básico", level: 3 },
                      { id: "example-with-middleware", title: "Com Middleware", level: 3 },
                      { id: "example-with-controllers", title: "Com Controllers", level: 3 },
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
              <Link
                href="/docs/api/controllers"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                Controllers →
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
