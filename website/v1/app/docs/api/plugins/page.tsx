import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ChevronRight, Github } from "lucide-react";
import { CodeDemo } from "@/components/code-demo";
import { DocSidebar } from "@/components/doc-sidebar";

export default function PluginsPage() {
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
                  <span className="text-gray-300">Plugins</span>
                </div>

                <Badge className="mb-4 bg-purple-900/30 text-purple-300 hover:bg-purple-900/40 transition-colors">
                  API Reference
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Plugins</h1>
                <p className="text-xl text-gray-300 max-w-3xl">
                  Aprenda como estender a funcionalidade do Azura com plugins personalizados.
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
                    href="https://github.com/0xviny/Azura.JS/edit/main/docs/api/plugins.md"
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
                  Plugins são uma maneira poderosa de estender a funcionalidade do Azura. Eles
                  permitem adicionar novos recursos, modificar o comportamento existente e organizar
                  seu código de forma modular.
                </p>

                <p>
                  O sistema de plugins do Azura é projetado para ser simples e flexível, permitindo
                  que você crie e compartilhe funcionalidades reutilizáveis.
                </p>

                <h2 id="plugin-structure">Estrutura de um Plugin</h2>
                <p>
                  Um plugin do Azura é um objeto que segue uma estrutura específica. Aqui está a
                  estrutura básica de um plugin:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`import { AzuraServer } from '@atosjs/azura';

// Definição do plugin
export const MyPlugin = {
  // Nome do plugin (obrigatório)
  name: 'my-plugin',
  
  // Função de registro (obrigatória)
  register: (app: AzuraServer, options?: any) => {
    // Implementação do plugin
    // Retorna uma API que será exposta no app
    return {
      sayHello: () => console.log('Hello from MyPlugin!')
    };
  }
};`}
                  />
                </div>

                <p>Um plugin deve ter pelo menos duas propriedades:</p>

                <ul>
                  <li>
                    <code>name</code>: Um identificador único para o plugin.
                  </li>
                  <li>
                    <code>register</code>: Uma função que será chamada quando o plugin for
                    registrado. Esta função recebe a instância do AzuraServer e opções opcionais.
                  </li>
                </ul>

                <h2 id="registering-plugins">Registrando Plugins</h2>
                <p>
                  Para usar um plugin, você precisa registrá-lo na instância do AzuraServer usando o
                  método <code>registerPlugin</code>:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`import { AzuraServer } from '@atosjs/azura';
import { MyPlugin } from './plugins/MyPlugin';

const app = new AzuraServer();

// Registra o plugin sem opções
const myPlugin = app.registerPlugin(MyPlugin);

// Usa a API exposta pelo plugin
myPlugin.sayHello(); // Saída: Hello from MyPlugin!

app.listen(3000);`}
                  />
                </div>

                <p>Você também pode passar opções para o plugin:</p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`import { AzuraServer } from '@atosjs/azura';
import { DatabasePlugin } from './plugins/DatabasePlugin';

const app = new AzuraServer();

// Registra o plugin com opções
const db = app.registerPlugin(DatabasePlugin, {
  uri: 'mongodb://localhost:27017/mydb',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
});

// Usa a API exposta pelo plugin
db.connect().then(() => {
  console.log('Connected to database');
});

app.listen(3000);`}
                  />
                </div>

                <h2 id="plugin-types">Tipagem de Plugins</h2>
                <p>
                  Para obter suporte completo de TypeScript, você pode definir tipos para seus
                  plugins:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`import { AzuraServer } from '@atosjs/azura';

// Interface para as opções do plugin
interface DatabaseOptions {
  uri: string;
  options?: {
    useNewUrlParser?: boolean;
    useUnifiedTopology?: boolean;
  };
}

// Interface para a API exposta pelo plugin
interface DatabaseAPI {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  getCollection: (name: string) => any;
}

// Definição do plugin com tipos
export const DatabasePlugin = {
  name: 'database',
  register: (app: AzuraServer, options: DatabaseOptions): DatabaseAPI => {
    // Implementação do plugin
    return {
      connect: async () => {
        // Conecta ao banco de dados usando options.uri
        console.log(\`Connecting to \${options.uri}\`);
      },
      disconnect: async () => {
        // Desconecta do banco de dados
        console.log('Disconnecting from database');
      },
      getCollection: (name: string) => {
        // Retorna uma coleção
        return { name };
      }
    };
  }
};

// Uso com tipos
const app = new AzuraServer();
const db = app.registerPlugin<DatabaseAPI>(DatabasePlugin, {
  uri: 'mongodb://localhost:27017/mydb'
});

// TypeScript agora conhece os métodos disponíveis
db.connect().then(() => {
  const users = db.getCollection('users');
  console.log(users.name); // 'users'
});`}
                  />
                </div>

                <h2 id="plugin-examples">Exemplos de Plugins</h2>

                <h3 id="auth-plugin">Plugin de Autenticação</h3>
                <p>
                  Um plugin de autenticação que adiciona funcionalidades de autenticação à sua
                  aplicação:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`import { AzuraServer, Request, Response, NextFunction } from '@atosjs/azura';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Interface para as opções do plugin
interface AuthOptions {
  secret: string;
  expiresIn?: string;
}

// Interface para a API exposta pelo plugin
interface AuthAPI {
  generateToken: (payload: object) => string;
  verifyToken: (token: string) => any;
  hashPassword: (password: string) => Promise<string>;
  comparePassword: (password: string, hash: string) => Promise<boolean>;
  authMiddleware: (req: Request, res: Response, next: NextFunction) => void;
}

// Plugin de autenticação
export const AuthPlugin = {
  name: 'auth',
  register: (app: AzuraServer, options: AuthOptions): AuthAPI => {
    const secret = options.secret || process.env.JWT_SECRET || 'your-secret-key';
    const expiresIn = options.expiresIn || '1d';

    // Middleware de autenticação
    const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization?.split(' ')[1];
      
      if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
      }
      
      try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
      } catch (error) {
        return res.status(401).json({ message: 'Token inválido' });
      }
    };

    // API exposta pelo plugin
    return {
      generateToken: (payload: object) => {
        return jwt.sign(payload, secret, { expiresIn });
      },
      verifyToken: (token: string) => {
        return jwt.verify(token, secret);
      },
      hashPassword: async (password: string) => {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
      },
      comparePassword: async (password: string, hash: string) => {
        return bcrypt.compare(password, hash);
      },
      authMiddleware
    };
  }
};

// Exemplo de uso
const app = new AzuraServer();

// Registra o plugin com opções
const auth = app.registerPlugin<AuthAPI>(AuthPlugin, {
  secret: process.env.JWT_SECRET || 'your-secret-key',
  expiresIn: '7d'
});

// Rota de login
app.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  
  // Busca o usuário no banco de dados (exemplo simplificado)
  const user = { id: 1, email: 'user@example.com', password: '$2b$10$...' };
  
  // Verifica a senha
  const isValid = await auth.comparePassword(password, user.password);
  
  if (!isValid) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }
  
  // Gera o token
  const token = auth.generateToken({ id: user.id, email: user.email });
  
  res.json({ token });
});

// Rota protegida
app.get('/profile', auth.authMiddleware, (req: Request, res: Response) => {
  res.json({ user: req.user });
});

app.listen(3000);`}
                  />
                </div>

                <h3 id="logging-plugin">Plugin de Logging</h3>
                <p>Um plugin de logging que registra informações sobre as requisições:</p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`import { AzuraServer, Request, Response, NextFunction } from '@atosjs/azura';
import fs from 'fs';
import path from 'path';

// Interface para as opções do plugin
interface LoggingOptions {
  logDir?: string;
  logLevel?: 'info' | 'warn' | 'error' | 'debug';
}

// Interface para a API exposta pelo plugin
interface LoggingAPI {
  info: (message: string, meta?: any) => void;
  warn: (message: string, meta?: any) => void;
  error: (message: string, meta?: any) => void;
  debug: (message: string, meta?: any) => void;
  requestLogger: (req: Request, res: Response, next: NextFunction) => void;
}

// Plugin de logging
export const LoggingPlugin = {
  name: 'logging',
  register: (app: AzuraServer, options: LoggingOptions = {}): LoggingAPI => {
    const logDir = options.logDir || './logs';
    const logLevel = options.logLevel || 'info';
    
    // Cria o diretório de logs se não existir
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
    
    // Função para escrever logs
    const writeLog = (level: string, message: string, meta?: any) => {
      const timestamp = new Date().toISOString();
      const logMessage = \`[\${timestamp}] [\${level.toUpperCase()}] \${message} \${meta ? JSON.stringify(meta) : ''}\n\`;
      
      // Escreve no arquivo de log
      fs.appendFileSync(
        path.join(logDir, \`\${level}.log\`),
        logMessage
      );
      
      // Também exibe no console
      console[level](message, meta || '');
    };
    
    // Middleware de logging de requisições
    const requestLogger = (req: Request, res: Response, next: NextFunction) => {
      const start = Date.now();
      
      // Captura o método original de envio de resposta
      const originalSend = res.send;
      
      // Sobrescreve o método send para capturar o status e o tempo de resposta
      res.send = function(body) {
        const duration = Date.now() - start;
        
        writeLog('info', \`\${req.method} \${req.url}\`, {
          method: req.method,
          url: req.url,
          status: res.statusCode,
          duration: \`\${duration}ms\`,
          userAgent: req.headers['user-agent']
        });
        
        // Chama o método original
        return originalSend.call(this, body);
      };
      
      next();
    };
    
    // Registra o middleware na aplicação
    app.use(requestLogger);
    
    // API exposta pelo plugin
    return {
      info: (message: string, meta?: any) => {
        if (['info', 'warn', 'error', 'debug'].includes(logLevel)) {
          writeLog('info', message, meta);
        }
      },
      warn: (message: string, meta?: any) => {
        if (['warn', 'error', 'debug'].includes(logLevel)) {
          writeLog('warn', message, meta);
        }
      },
      error: (message: string, meta?: any) => {
        if (['error', 'debug'].includes(logLevel)) {
          writeLog('error', message, meta);
        }
      },
      debug: (message: string, meta?: any) => {
        if (['debug'].includes(logLevel)) {
          writeLog('debug', message, meta);
        }
      },
      requestLogger
    };
  }
};

// Exemplo de uso
const app = new AzuraServer();

// Registra o plugin com opções
const logger = app.registerPlugin<LoggingAPI>(LoggingPlugin, {
  logDir: './logs',
  logLevel: 'debug'
});

// Usa o logger
app.get('/', (req: Request, res: Response) => {
  logger.info('Requisição recebida na rota raiz');
  res.send('Hello World!');
});

app.listen(3000);`}
                  />
                </div>

                <h2 id="plugin-dependencies">Dependências entre Plugins</h2>
                <p>
                  Às vezes, um plugin pode depender de outro plugin. Você pode gerenciar essas
                  dependências garantindo que os plugins sejam registrados na ordem correta:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`import { AzuraServer } from '@atosjs/azura';
import { DatabasePlugin } from './plugins/DatabasePlugin';
import { UserPlugin } from './plugins/UserPlugin';

const app = new AzuraServer();

// Registra o plugin de banco de dados primeiro
const db = app.registerPlugin(DatabasePlugin, {
  uri: 'mongodb://localhost:27017/mydb'
});

// Registra o plugin de usuários que depende do plugin de banco de dados
const users = app.registerPlugin(UserPlugin, {
  db // Passa a instância do plugin de banco de dados
});

app.listen(3000);`}
                  />
                </div>

                <p>Você também pode definir dependências explicitamente no plugin:</p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`import { AzuraServer } from '@atosjs/azura';

// Plugin de usuários com dependência explícita
export const UserPlugin = {
  name: 'users',
  dependencies: ['database'], // Define as dependências
  register: (app: AzuraServer, options: any) => {
    // Verifica se o plugin de banco de dados está registrado
    if (!app.plugins.database) {
      throw new Error('O plugin de banco de dados é necessário para o plugin de usuários');
    }
    
    // Implementação do plugin
    return {
      // ...
    };
  }
};`}
                  />
                </div>

                <h2 id="plugin-hooks">Hooks de Plugins</h2>
                <p>
                  Hooks permitem que os plugins interajam com eventos do ciclo de vida da aplicação:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`import { AzuraServer } from '@atosjs/azura';

export const LifecyclePlugin = {
  name: 'lifecycle',
  register: (app: AzuraServer) => {
    // Hook executado antes da aplicação iniciar
    app.hooks.onBeforeStart(async () => {
      console.log('Aplicação iniciando...');
    });
    
    // Hook executado depois da aplicação iniciar
    app.hooks.onAfterStart(async () => {
      console.log('Aplicação iniciada na porta', app.port);
    });
    
    // Hook executado antes da aplicação parar
    app.hooks.onBeforeStop(async () => {
      console.log('Aplicação parando...');
    });
    
    // Hook executado depois da aplicação parar
    app.hooks.onAfterStop(async () => {
      console.log('Aplicação parada');
    });
    
    return {};
  }
};`}
                  />
                </div>

                <h2 id="plugin-best-practices">Melhores Práticas</h2>
                <p>Aqui estão algumas melhores práticas para criar plugins no Azura:</p>

                <ul>
                  <li>
                    <strong>Nomeie seus plugins de forma clara e descritiva</strong>: Use nomes que
                    descrevam a funcionalidade do plugin.
                  </li>
                  <li>
                    <strong>Documente suas opções</strong>: Forneça documentação clara sobre as
                    opções que seu plugin aceita.
                  </li>
                  <li>
                    <strong>Use TypeScript</strong>: Defina interfaces para suas opções e API para
                    fornecer melhor suporte de tipos.
                  </li>
                  <li>
                    <strong>Gerencie recursos</strong>: Se seu plugin criar recursos (como conexões
                    de banco de dados), certifique-se de limpá-los quando a aplicação for encerrada.
                  </li>
                  <li>
                    <strong>Trate erros</strong>: Implemente tratamento de erros adequado em seu
                    plugin.
                  </li>
                  <li>
                    <strong>Mantenha a compatibilidade</strong>: Ao atualizar seu plugin, tente
                    manter a compatibilidade com versões anteriores.
                  </li>
                </ul>

                <h2 id="official-plugins">Plugins Oficiais</h2>
                <p>
                  O Azura vem com vários plugins oficiais que você pode usar em suas aplicações:
                </p>

                <ul>
                  <li>
                    <code>@atosjs/azura/plugins/plugin-db</code>: Plugin para integração com bancos
                    de dados.
                  </li>
                  <li>
                    <code>@atosjs/azura/plugins/plugin-auth</code>: Plugin para autenticação e
                    autorização.
                  </li>
                  <li>
                    <code>@atosjs/azura/plugins/plugin-cors</code>: Plugin para configurar CORS.
                  </li>
                  <li>
                    <code>@atosjs/azura/plugins/plugin-swagger</code>: Plugin para documentação de
                    API com Swagger.
                  </li>
                  <li>
                    <code>@atosjs/azura/plugins/plugin-rate-limit</code>: Plugin para limitar taxa
                    de requisições.
                  </li>
                </ul>

                <p>Você pode usar esses plugins importando-os diretamente do pacote Azura:</p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`import { AzuraServer } from '@atosjs/azura';
import { dbPlugin } from '@atosjs/azura/plugins/plugin-db';
import { authPlugin } from '@atosjs/azura/plugins/plugin-auth';
import { corsPlugin } from '@atosjs/azura/plugins/plugin-cors';

const app = new AzuraServer();

// Registra plugins oficiais
app.registerPlugin(corsPlugin, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
});

app.registerPlugin(dbPlugin, {
  type: 'mongo',
  uri: 'mongodb://localhost:27017/mydb'
});

app.registerPlugin(authPlugin, {
  secret: process.env.JWT_SECRET
});

app.listen(3000);`}
                  />
                </div>

                <h2 id="conclusion">Conclusão</h2>
                <p>
                  Plugins são uma parte fundamental da arquitetura do Azura, permitindo que você
                  estenda e personalize sua aplicação de forma modular. Ao criar seus próprios
                  plugins ou usar os plugins oficiais, você pode adicionar funcionalidades poderosas
                  à sua aplicação sem complicar seu código principal.
                </p>

                <p>
                  Experimente criar seus próprios plugins para encapsular funcionalidades
                  específicas do seu domínio e compartilhá-los entre diferentes projetos.
                </p>
              </div>

              {/* Table of Contents */}
              <div className="hidden lg:block">
                <div className="sticky top-20">
                  <h3 className="text-lg font-semibold text-white mb-4">Nesta página</h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a
                        href="#introduction"
                        className="text-gray-400 hover:text-purple-400 transition-colors"
                      >
                        Introdução
                      </a>
                    </li>
                    <li>
                      <a
                        href="#plugin-structure"
                        className="text-gray-400 hover:text-purple-400 transition-colors"
                      >
                        Estrutura de um Plugin
                      </a>
                    </li>
                    <li>
                      <a
                        href="#registering-plugins"
                        className="text-gray-400 hover:text-purple-400 transition-colors"
                      >
                        Registrando Plugins
                      </a>
                    </li>
                    <li>
                      <a
                        href="#plugin-types"
                        className="text-gray-400 hover:text-purple-400 transition-colors"
                      >
                        Tipagem de Plugins
                      </a>
                    </li>
                    <li>
                      <a
                        href="#plugin-examples"
                        className="text-gray-400 hover:text-purple-400 transition-colors"
                      >
                        Exemplos de Plugins
                      </a>
                      <ul className="pl-4 mt-2 space-y-2">
                        <li>
                          <a
                            href="#auth-plugin"
                            className="text-gray-400 hover:text-purple-400 transition-colors"
                          >
                            Plugin de Autenticação
                          </a>
                        </li>
                        <li>
                          <a
                            href="#logging-plugin"
                            className="text-gray-400 hover:text-purple-400 transition-colors"
                          >
                            Plugin de Logging
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a
                        href="#plugin-dependencies"
                        className="text-gray-400 hover:text-purple-400 transition-colors"
                      >
                        Dependências entre Plugins
                      </a>
                    </li>
                    <li>
                      <a
                        href="#plugin-hooks"
                        className="text-gray-400 hover:text-purple-400 transition-colors"
                      >
                        Hooks de Plugins
                      </a>
                    </li>
                    <li>
                      <a
                        href="#plugin-best-practices"
                        className="text-gray-400 hover:text-purple-400 transition-colors"
                      >
                        Melhores Práticas
                      </a>
                    </li>
                    <li>
                      <a
                        href="#official-plugins"
                        className="text-gray-400 hover:text-purple-400 transition-colors"
                      >
                        Plugins Oficiais
                      </a>
                    </li>
                    <li>
                      <a
                        href="#conclusion"
                        className="text-gray-400 hover:text-purple-400 transition-colors"
                      >
                        Conclusão
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
