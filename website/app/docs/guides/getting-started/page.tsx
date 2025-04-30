import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ChevronRight, Github } from "lucide-react"
import { CodeDemo } from "@/components/code-demo"
import { DocSidebar } from "@/components/doc-sidebar"
import { TableOfContents } from "@/components/table-of-contents"

export default function GettingStartedPage() {
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
                  <span className="text-gray-300">Primeiros Passos</span>
                </div>

                <Badge className="mb-4 bg-purple-900/30 text-purple-300 hover:bg-purple-900/40 transition-colors">
                  Guia
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Primeiros Passos</h1>
                <p className="text-xl text-gray-300 max-w-3xl">
                  Aprenda como criar e executar sua primeira aplicação com Azura.
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
                    href="https://github.com/0xviny/AzuraV2/edit/main/docs/guides/getting-started.md"
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
                  <a href="https://github.com/0xviny/AzuraV2" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" /> Ver no GitHub
                  </a>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-10">
              <div className="prose prose-invert max-w-none prose-headings:scroll-mt-20 prose-pre:bg-gray-950 prose-pre:border prose-pre:border-purple-900/20">
                <h2 id="creating-project">Criando um Novo Projeto</h2>
                <p>
                  A maneira mais fácil de começar com o Azura é usando a CLI para criar um novo projeto. Certifique-se
                  de ter instalado o Azura globalmente conforme descrito no guia de{" "}
                  <Link href="/docs/guides/installation" className="text-purple-400 hover:text-purple-300">
                    Instalação
                  </Link>
                  .
                </p>

                <p>Execute o seguinte comando para criar um novo projeto:</p>

                <div className="not-prose">
                  <CodeDemo language="bash" code="azura create my-api ts" showLineNumbers={false} />
                </div>

                <p>Este comando aceita dois argumentos:</p>
                <ul>
                  <li>
                    <code>my-api</code>: O nome da pasta/projeto que será criado
                  </li>
                  <li>
                    <code>ts</code>: O tipo de projeto. Use <code>ts</code> para TypeScript ou <code>js</code> para
                    JavaScript
                  </li>
                </ul>

                <p>
                  Após a execução do comando, uma nova pasta será criada com a estrutura básica do projeto e todas as
                  dependências necessárias já instaladas.
                </p>

                <h2 id="project-structure">Estrutura do Projeto</h2>
                <p>Após criar um novo projeto, você terá a seguinte estrutura de arquivos:</p>

                <div className="not-prose">
                  <CodeDemo
                    language="bash"
                    code={`my-api/
├── src/
│   ├── controllers/
│   │   └── HomeController.ts
│   ├── services/
│   │   └── ExampleService.ts
│   ├── plugins/
│   │   └── index.ts
│   └── index.ts
├── package.json
├── tsconfig.json
└── README.md`}
                    showLineNumbers={false}
                  />
                </div>

                <h2 id="hello-world">Criando uma API "Hello World"</h2>
                <p>
                  Vamos começar com um exemplo simples. Abra o arquivo <code>src/index.ts</code> e substitua seu
                  conteúdo pelo seguinte código:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`import { AzuraServer } from '@atosjs/azura';

const app = new AzuraServer();

app.get('/', (req, res) => {
  res.send('Hello World from Azura!');
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});`}
                  />
                </div>

                <p>
                  Este código cria uma instância do servidor Azura, define uma rota para o caminho raiz ("/") que
                  responde com "Hello World from Azura!" e inicia o servidor na porta 3000.
                </p>

                <h2 id="running-app">Executando a Aplicação</h2>
                <p>Para executar sua aplicação, use o seguinte comando:</p>

                <div className="not-prose">
                  <CodeDemo language="bash" code="npm run dev" showLineNumbers={false} />
                </div>

                <p>
                  Isso iniciará o servidor em modo de desenvolvimento com hot-reloading, o que significa que o servidor
                  será reiniciado automaticamente sempre que você fizer alterações nos arquivos.
                </p>

                <p>
                  Agora, abra seu navegador e acesse <code>http://localhost:3000</code>. Você deverá ver a mensagem
                  "Hello World from Azura!".
                </p>

                <h2 id="adding-routes">Adicionando Mais Rotas</h2>
                <p>
                  Vamos adicionar mais algumas rotas para demonstrar como o Azura lida com diferentes tipos de
                  requisições HTTP:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`import { AzuraServer } from '@atosjs/azura';

const app = new AzuraServer();

// Rota GET básica
app.get('/', (req, res) => {
  res.send('Hello World from Azura!');
});

// Rota GET que retorna JSON
app.get('/api/info', (req, res) => {
  res.json({
    name: 'Azura API',
    version: '1.0.0',
    status: 'running'
  });
});

// Rota GET com parâmetros
app.get('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({
    id: userId,
    name: 'User ' + userId
  });
});

// Rota POST para criar recursos
app.post('/api/users', (req, res) => {
  const newUser = req.body;
  // Em uma aplicação real, você salvaria isso em um banco de dados
  res.status(201).json({
    ...newUser,
    id: Date.now().toString()
  });
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});`}
                  />
                </div>

                <h2 id="using-controllers">Usando Controllers</h2>
                <p>
                  Para aplicações maiores, é recomendável organizar suas rotas em controllers. O Azura suporta
                  controllers baseados em classes com decorators para definir rotas.
                </p>

                <p>
                  Vamos criar um controller para gerenciar usuários. Crie ou edite o arquivo
                  <code>src/controllers/UserController.ts</code>:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`import { Controller, Get, Post, Put, Delete } from '@atosjs/azura';

@Controller('/api/users')
export class UserController {
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
}`}
                  />
                </div>

                <p>
                  Agora, atualize o arquivo <code>src/index.ts</code> para carregar este controller:
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

                <h2 id="testing-api">Testando a API</h2>
                <p>
                  Agora você pode testar sua API usando ferramentas como cURL, Postman ou qualquer cliente HTTP. Aqui
                  estão alguns exemplos de como testar as rotas que criamos:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="bash"
                    code={`# Obter todos os usuários
curl http://localhost:3000/api/users

# Obter um usuário específico
curl http://localhost:3000/api/users/1

# Criar um novo usuário
curl -X POST -H "Content-Type: application/json" -d '{"name":"Alice"}' http://localhost:3000/api/users

# Atualizar um usuário
curl -X PUT -H "Content-Type: application/json" -d '{"name":"Updated Name"}' http://localhost:3000/api/users/1

# Excluir um usuário
curl -X DELETE http://localhost:3000/api/users/1`}
                    showLineNumbers={false}
                  />
                </div>

                <h2 id="next-steps">Próximos Passos</h2>
                <p>Agora que você criou sua primeira aplicação com Azura, pode explorar recursos mais avançados:</p>

                <ul>
                  <li>
                    <Link href="/docs/guides/project-structure" className="text-purple-400 hover:text-purple-300">
                      Estrutura de Projeto
                    </Link>{" "}
                    - Aprenda como organizar seu código para projetos maiores
                  </li>
                  <li>
                    <Link href="/docs/guides/middlewares" className="text-purple-400 hover:text-purple-300">
                      Middlewares
                    </Link>{" "}
                    - Adicione funcionalidades como autenticação, logging e validação
                  </li>
                  <li>
                    <Link href="/docs/guides/plugins" className="text-purple-400 hover:text-purple-300">
                      Plugins
                    </Link>{" "}
                    - Estenda o Azura com plugins personalizados
                  </li>
                  <li>
                    <Link href="/docs/guides/database" className="text-purple-400 hover:text-purple-300">
                      Banco de Dados
                    </Link>{" "}
                    - Conecte sua aplicação a um banco de dados
                  </li>
                </ul>
              </div>

              <div className="hidden lg:block">
                <div className="sticky top-16">
                  <TableOfContents
                    items={[
                      { id: "creating-project", title: "Criando um Novo Projeto", level: 2 },
                      { id: "project-structure", title: "Estrutura do Projeto", level: 2 },
                      { id: "hello-world", title: "Criando uma API 'Hello World'", level: 2 },
                      { id: "running-app", title: "Executando a Aplicação", level: 2 },
                      { id: "adding-routes", title: "Adicionando Mais Rotas", level: 2 },
                      { id: "using-controllers", title: "Usando Controllers", level: 2 },
                      { id: "testing-api", title: "Testando a API", level: 2 },
                      { id: "next-steps", title: "Próximos Passos", level: 2 },
                    ]}
                  />
                </div>
              </div>
            </div>

            <div className="mt-16 border-t border-gray-800 pt-8 flex items-center justify-between">
              <Link
                href="/docs/guides/installation"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                ← Instalação
              </Link>
              <Link
                href="/docs/guides/project-structure"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                Estrutura de Projeto →
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
