import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ChevronRight, Github } from "lucide-react"
import { CodeDemo } from "@/components/code-demo"
import { DocSidebar } from "@/components/doc-sidebar"
import { TableOfContents } from "@/components/table-of-contents"

export default function DatabasePage() {
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
                  <Link href="/docs/examples" className="hover:text-purple-400 transition-colors">
                    Exemplos
                  </Link>
                  <ChevronRight className="h-4 w-4" />
                  <span className="text-gray-300">Banco de Dados</span>
                </div>

                <Badge className="mb-4 bg-purple-900/30 text-purple-300 hover:bg-purple-900/40 transition-colors">
                  Exemplo
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Banco de Dados</h1>
                <p className="text-xl text-gray-300 max-w-3xl">
                  Aprenda como conectar sua aplicação Azura a diferentes bancos de dados e implementar operações CRUD.
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
                    href="https://github.com/0xviny/Azura.JS/edit/main/docs/examples/database.md"
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
                  A maioria das aplicações web precisa armazenar e recuperar dados de um banco de dados. O Azura oferece
                  adaptadores nativos para diferentes tipos de bancos de dados, facilitando a integração com JSON
                  (arquivo local), MongoDB e PostgreSQL.
                </p>
                <p>
                  Neste guia, vamos explorar como usar os adaptadores de banco de dados nativos do Azura e implementar
                  operações CRUD (Create, Read, Update, Delete) básicas.
                </p>

                <h2 id="database-adapters">Adaptadores de Banco de Dados</h2>
                <p>O Azura fornece adaptadores nativos para os seguintes tipos de banco de dados:</p>

                <ul>
                  <li>
                    <strong>JSON</strong>: Armazena dados em um arquivo JSON local, ideal para prototipagem rápida e
                    aplicações simples.
                  </li>
                  <li>
                    <strong>MongoDB</strong>: Um banco de dados NoSQL orientado a documentos, ideal para dados
                    semiestruturados e aplicações que precisam escalar horizontalmente.
                  </li>
                  <li>
                    <strong>PostgreSQL</strong>: Um poderoso banco de dados relacional com suporte a JSON, ideal para
                    aplicações que precisam de transações ACID e consultas complexas.
                  </li>
                </ul>

                <p>
                  Todos os adaptadores expõem uma API unificada através de <code>app.db</code>, com métodos como
                  <code>find</code>, <code>insert</code>, <code>update</code> e <code>delete</code>.
                </p>

                <h2 id="json-adapter">Adaptador JSON (arquivo local)</h2>
                <p>
                  O adaptador JSON armazena dados em um arquivo JSON local. É ideal para prototipagem rápida e
                  aplicações simples que não precisam de um banco de dados completo.
                </p>

                <h3 id="json-setup">Configuração do JSON</h3>
                <p>
                  Para usar o adaptador JSON, você precisa registrar o plugin <code>dbPlugin</code> com o tipo
                  <code>'json'</code> e especificar o caminho do arquivo:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`// src/index.ts
import { AzuraServer } from '@atosjs/azura';
import { dbPlugin } from '@atosjs/azura/plugins/plugin-db';
import { Request, Response } from '@atosjs/azura';

async function main() {
  const app = new AzuraServer({ port: 3000 });

  // 1) Registra o plugin apontando para um arquivo JSON
  app.registerPlugin(dbPlugin, {
    type: 'json',
    file: './data/db.json'
  });

  // 2) Conecta (opcional, pois JSONAdapter abre o arquivo na primeira operação)
  await app.db!.connect();

  // 3) Rotas CRUD básicas
  // Criar
  app.post('/items', async (req: Request, res: Response) => {
    const item = await app.db!.insert('items', req.body);
    res.status(201).json(item);
  });

  // Ler tudo
  app.get('/items', async (_req, res) => {
    const list = await app.db!.find('items', {});
    res.json(list);
  });

  // Atualizar
  app.put('/items/:id', async (req, res) => {
    const count = await app.db!.update('items', { id: req.params.id }, req.body);
    res.json({ updated: count });
  });

  // Deletar
  app.delete('/items/:id', async (req, res) => {
    const count = await app.db!.delete('items', { id: req.params.id });
    res.json({ deleted: count });
  });

  app.listen();
}

main();`}
                  />
                </div>

                <p>
                  O adaptador JSON criará automaticamente o arquivo se ele não existir. Cada coleção será armazenada
                  como uma propriedade no objeto JSON raiz.
                </p>

                <h2 id="mongodb-adapter">Adaptador MongoDB</h2>
                <p>
                  O adaptador MongoDB permite que você se conecte a um banco de dados MongoDB e use suas coleções
                  através da API unificada do Azura.
                </p>

                <h3 id="mongodb-setup">Configuração do MongoDB</h3>
                <p>
                  Para usar o adaptador MongoDB, você precisa registrar o plugin <code>dbPlugin</code> com o tipo
                  <code>'mongo'</code> e especificar a URI de conexão e o nome do banco de dados:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`// src/index.ts
import { AzuraServer } from '@atosjs/azura';
import { dbPlugin } from '@atosjs/azura/plugins/plugin-db';
import { Request, Response } from '@atosjs/azura';

async function main() {
  const app = new AzuraServer({ port: 3000 });

  // 1) Registra o plugin para Mongo
  app.registerPlugin(dbPlugin, {
    type: 'mongo',
    uri: 'mongodb://localhost:27017',
    db: 'mydb'
  });

  // 2) Conecta ao Mongo
  await app.db!.connect();

  // 3) Rotas CRUD
  app.post('/users', async (req: Request, res: Response) => {
    const user = await app.db!.insert('users', req.body);
    res.status(201).json(user);
  });

  app.get('/users', async (_req, res) => {
    const users = await app.db!.find('users', {});
    res.json(users);
  });

  app.put('/users/:id', async (req, res) => {
    const count = await app.db!.update(
      'users',
      { _id: req.params.id },
      req.body
    );
    res.json({ updated: count });
  });

  app.delete('/users/:id', async (req, res) => {
    const count = await app.db!.delete('users', { _id: req.params.id });
    res.json({ deleted: count });
  });

  app.listen();
}

main();`}
                  />
                </div>

                <p>
                  Observe que para o MongoDB, você deve usar <code>_id</code> como identificador nas operações de
                  atualização e exclusão. O adaptador MongoDB converte automaticamente o ID de string para ObjectId.
                </p>

                <h3 id="mongodb-environment">Usando Variáveis de Ambiente</h3>
                <p>
                  Em um ambiente de produção, é recomendável usar variáveis de ambiente para armazenar a URI de conexão
                  do MongoDB:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`// src/index.ts
import { AzuraServer } from '@atosjs/azura';
import { dbPlugin } from '@atosjs/azura/plugins/plugin-db';

async function main() {
  const app = new AzuraServer({ port: parseInt(process.env.PORT || '3000') });

  // Registra o plugin para Mongo usando variáveis de ambiente
  app.registerPlugin(dbPlugin, {
    type: 'mongo',
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017',
    db: process.env.MONGODB_DB || 'mydb'
  });

  await app.db!.connect();

  // Resto do código...
  
  app.listen();
}

main();`}
                  />
                </div>

                <h2 id="postgresql-adapter">Adaptador PostgreSQL</h2>
                <p>
                  O adaptador PostgreSQL permite que você se conecte a um banco de dados PostgreSQL e use suas tabelas
                  através da API unificada do Azura.
                </p>

                <h3 id="postgresql-setup">Configuração do PostgreSQL</h3>
                <p>
                  Para usar o adaptador PostgreSQL, você precisa registrar o plugin <code>dbPlugin</code> com o tipo
                  <code>'postgres'</code> e especificar as opções de conexão:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`// src/index.ts
import { AzuraServer } from '@atosjs/azura';
import { dbPlugin } from '@atosjs/azura/plugins/plugin-db';
import { Request, Response } from '@atosjs/azura';

async function main() {
  const app = new AzuraServer({ port: 3000 });

  // 1) Registra o plugin para Postgres
  app.registerPlugin(dbPlugin, {
    type: 'postgres',
    pg: {
      host: 'localhost',
      port: 5432,
      database: 'mydb',
      user: 'postgres',
      password: 'secret'
    }
  });

  // 2) Não precisa chamar .connect() ("Pool" já gerencia conexão)
  // await app.db!.connect();

  // 3) Rotas CRUD
  app.post('/products', async (req: Request, res: Response) => {
    const product = await app.db!.insert('products', req.body);
    res.status(201).json(product);
  });

  app.get('/products', async (_req, res) => {
    const products = await app.db!.find('products', {});
    res.json(products);
  });

  app.put('/products/:id', async (req, res) => {
    const count = await app.db!.update(
      'products',
      { id: req.params.id },
      req.body
    );
    res.json({ updated: count });
  });

  app.delete('/products/:id', async (req, res) => {
    const count = await app.db!.delete('products', { id: req.params.id });
    res.json({ deleted: count });
  });

  app.listen();
}

main();`}
                  />
                </div>

                <p>
                  O adaptador PostgreSQL usa um pool de conexões para gerenciar as conexões com o banco de dados, então
                  você não precisa chamar <code>connect()</code> explicitamente.
                </p>

                <h3 id="postgresql-environment">Usando Variáveis de Ambiente</h3>
                <p>
                  Em um ambiente de produção, é recomendável usar variáveis de ambiente para armazenar as credenciais do
                  PostgreSQL:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`// src/index.ts
import { AzuraServer } from '@atosjs/azura';
import { dbPlugin } from '@atosjs/azura/plugins/plugin-db';

async function main() {
  const app = new AzuraServer({ port: parseInt(process.env.PORT || '3000') });

  // Registra o plugin para Postgres usando variáveis de ambiente
  app.registerPlugin(dbPlugin, {
    type: 'postgres',
    pg: {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      database: process.env.DB_DATABASE || 'mydb',
      user: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'secret'
    }
  });

  // Resto do código...
  
  app.listen();
}

main();`}
                  />
                </div>

                <h2 id="unified-api">API Unificada</h2>
                <p>
                  Todos os adaptadores de banco de dados do Azura expõem a mesma API através de <code>app.db</code>, o
                  que facilita a troca de um banco de dados para outro sem alterar a lógica da aplicação.
                </p>

                <h3 id="find-method">Método find</h3>
                <p>
                  O método <code>find</code> permite buscar documentos ou registros em uma coleção ou tabela:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`// Buscar todos os usuários
const allUsers = await app.db!.find('users', {});

// Buscar usuários com filtro
const activeUsers = await app.db!.find('users', { active: true });

// Buscar um usuário específico
const user = await app.db!.find('users', { id: '123' });`}
                  />
                </div>

                <h3 id="insert-method">Método insert</h3>
                <p>
                  O método <code>insert</code> permite inserir um novo documento ou registro:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`// Inserir um novo usuário
const newUser = await app.db!.insert('users', {
  name: 'John Doe',
  email: 'john@example.com',
  active: true
});

// O objeto retornado inclui o ID gerado
console.log(newUser.id); // ou newUser._id para MongoDB`}
                  />
                </div>

                <h3 id="update-method">Método update</h3>
                <p>
                  O método <code>update</code> permite atualizar documentos ou registros existentes:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`// Atualizar um usuário específico
const updatedCount = await app.db!.update(
  'users',
  { id: '123' }, // filtro
  { active: false } // campos a atualizar
);

// Atualizar múltiplos usuários
const updatedCount = await app.db!.update(
  'users',
  { role: 'guest' }, // filtro
  { role: 'user' } // campos a atualizar
);`}
                  />
                </div>

                <h3 id="delete-method">Método delete</h3>
                <p>
                  O método <code>delete</code> permite excluir documentos ou registros:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`// Excluir um usuário específico
const deletedCount = await app.db!.delete('users', { id: '123' });

// Excluir múltiplos usuários
const deletedCount = await app.db!.delete('users', { active: false });`}
                  />
                </div>

                <h2 id="controllers-with-db">Usando Banco de Dados em Controllers</h2>
                <p>Você pode usar o banco de dados em seus controllers para criar APIs RESTful completas:</p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`// src/controllers/UserController.ts
import { Controller, Get, Post, Put, Delete, Request, Response } from '@atosjs/azura';

@Controller('/users')
export class UserController {
  @Get('/')
  async getAllUsers(_req: Request, res: Response) {
    const users = await res.app.db!.find('users', {});
    res.json(users);
  }

  @Get('/:id')
  async getUserById(req: Request, res: Response) {
    const user = await res.app.db!.find('users', { id: req.params.id });
    if (!user || user.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.json(user[0]);
  }

  @Post('/')
  async createUser(req: Request, res: Response) {
    const user = await res.app.db!.insert('users', req.body);
    res.status(201).json(user);
  }

  @Put('/:id')
  async updateUser(req: Request, res: Response) {
    const count = await res.app.db!.update('users', { id: req.params.id }, req.body);
    if (count === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.json({ updated: count });
  }

  @Delete('/:id')
  async deleteUser(req: Request, res: Response) {
    const count = await res.app.db!.delete('users', { id: req.params.id });
    if (count === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.json({ deleted: count });
  }
}`}
                  />
                </div>

                <h2 id="database-best-practices">Melhores Práticas para Bancos de Dados</h2>
                <p>
                  Ao trabalhar com bancos de dados em sua aplicação Azura, considere as seguintes melhores práticas:
                </p>

                <ul>
                  <li>
                    <strong>Use variáveis de ambiente para configurações de banco de dados</strong>: Nunca hardcode
                    credenciais de banco de dados em seu código.
                  </li>
                  <li>
                    <strong>Valide dados antes de inserir</strong>: Sempre valide os dados antes de inseri-los no banco
                    de dados.
                  </li>
                  <li>
                    <strong>Use consultas parametrizadas</strong>: Para evitar injeção de SQL, sempre use consultas
                    parametrizadas.
                  </li>
                  <li>
                    <strong>Implemente paginação</strong>: Para consultas que retornam muitos resultados, implemente
                    paginação.
                  </li>
                  <li>
                    <strong>Monitore o desempenho</strong>: Use ferramentas para monitorar o desempenho do banco de
                    dados e identificar gargalos.
                  </li>
                  <li>
                    <strong>Faça backup regularmente</strong>: Implemente uma estratégia de backup para evitar perda de
                    dados.
                  </li>
                </ul>

                <h2 id="next-steps">Próximos Passos</h2>
                <p>Agora que você aprendeu como usar os adaptadores de banco de dados do Azura, você pode:</p>

                <ul>
                  <li>
                    <Link href="/docs/examples/authentication" className="text-purple-400 hover:text-purple-300">
                      Implementar autenticação e autorização
                    </Link>
                  </li>
                  <li>
                    <Link href="/docs/examples/validation" className="text-purple-400 hover:text-purple-300">
                      Implementar validação de dados
                    </Link>
                  </li>
                  <li>
                    <Link href="/docs/guides/deployment" className="text-purple-400 hover:text-purple-300">
                      Implantar sua aplicação em produção
                    </Link>
                  </li>
                  <li>
                    Explorar recursos avançados de banco de dados, como consultas complexas, agregações e otimização de
                    desempenho
                  </li>
                  <li>
                    Implementar caching para reduzir a carga no banco de dados e melhorar o desempenho da aplicação
                  </li>
                </ul>
              </div>

              <div className="hidden lg:block">
                <div className="sticky top-16">
                  <TableOfContents
                    items={[
                      { id: "introduction", title: "Introdução", level: 2 },
                      { id: "database-adapters", title: "Adaptadores de Banco de Dados", level: 2 },
                      { id: "json-adapter", title: "Adaptador JSON (arquivo local)", level: 2 },
                      { id: "json-setup", title: "Configuração do JSON", level: 3 },
                      { id: "mongodb-adapter", title: "Adaptador MongoDB", level: 2 },
                      { id: "mongodb-setup", title: "Configuração do MongoDB", level: 3 },
                      { id: "mongodb-environment", title: "Usando Variáveis de Ambiente", level: 3 },
                      { id: "postgresql-adapter", title: "Adaptador PostgreSQL", level: 2 },
                      { id: "postgresql-setup", title: "Configuração do PostgreSQL", level: 3 },
                      { id: "postgresql-environment", title: "Usando Variáveis de Ambiente", level: 3 },
                      { id: "unified-api", title: "API Unificada", level: 2 },
                      { id: "find-method", title: "Método find", level: 3 },
                      { id: "insert-method", title: "Método insert", level: 3 },
                      { id: "update-method", title: "Método update", level: 3 },
                      { id: "delete-method", title: "Método delete", level: 3 },
                      { id: "controllers-with-db", title: "Usando Banco de Dados em Controllers", level: 2 },
                      { id: "database-best-practices", title: "Melhores Práticas para Bancos de Dados", level: 2 },
                      { id: "next-steps", title: "Próximos Passos", level: 2 },
                    ]}
                  />
                </div>
              </div>
            </div>

            <div className="mt-16 border-t border-gray-800 pt-8 flex items-center justify-between">
              <Link
                href="/docs/examples/validation"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                ← Validação
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
