import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ChevronRight, Github } from "lucide-react";
import { CodeDemo } from "@/components/code-demo";
import { DocSidebar } from "@/components/doc-sidebar";
import { TableOfContents } from "@/components/table-of-contents";

export default function AuthenticationPage() {
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
                  <span className="text-gray-300">Autenticação</span>
                </div>

                <Badge className="mb-4 bg-purple-900/30 text-purple-300 hover:bg-purple-900/40 transition-colors">
                  Exemplo
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Autenticação</h1>
                <p className="text-xl text-gray-300 max-w-3xl">
                  Aprenda como implementar autenticação e autorização em suas aplicações usando o
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
                    href="https://github.com/0xviny/AzuraV2/edit/main/docs/examples/authentication.md"
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
                    href="https://github.com/0xviny/AzuraV2"
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
                  A autenticação e autorização são aspectos fundamentais para a segurança de
                  qualquer aplicação. O Azura permite implementar diferentes estratégias de
                  autenticação, como JWT (JSON Web Tokens) e autenticação baseada em sessões.
                </p>
                <p>
                  Neste guia, vamos explorar como implementar autenticação JWT em uma aplicação
                  Azura, incluindo registro de usuários, login, e proteção de rotas.
                </p>

                <h2 id="prerequisites">Pré-requisitos</h2>
                <p>
                  Antes de começar, você precisará de um projeto Azura configurado. Se você ainda
                  não tem um, consulte nosso guia de{" "}
                  <Link
                    href="/docs/guides/installation"
                    className="text-purple-400 hover:text-purple-300"
                  >
                    Instalação
                  </Link>{" "}
                  e{" "}
                  <Link
                    href="/docs/guides/getting-started"
                    className="text-purple-400 hover:text-purple-300"
                  >
                    Primeiros Passos
                  </Link>
                  .
                </p>
                <p>Você também precisará instalar algumas dependências adicionais:</p>

                <div className="not-prose">
                  <CodeDemo
                    language="bash"
                    code={`npm install jsonwebtoken bcrypt
npm install @types/jsonwebtoken @types/bcrypt --save-dev`}
                    showLineNumbers={false}
                  />
                </div>

                <h2 id="user-model">Modelo de Usuário</h2>
                <p>
                  Primeiro, vamos definir nosso modelo de usuário. Crie um arquivo chamado{" "}
                  <code>src/models/User.ts</code>:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`// src/models/User.ts
export interface User {
  id: string;
  username: string;
  email: string;
  password: string; // Este será o hash da senha, nunca a senha em texto puro
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

// Versão segura para enviar ao cliente (sem a senha)
export type SafeUser = Omit<User, 'password'>;`}
                  />
                </div>

                <h2 id="user-service">Serviço de Usuário</h2>
                <p>
                  Em seguida, vamos criar um serviço para gerenciar operações relacionadas a
                  usuários, incluindo autenticação. Crie um arquivo chamado{" "}
                  <code>src/services/UserService.ts</code>:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`// src/services/UserService.ts
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, SafeUser } from '../models/User';

export class UserService {
  private users: User[] = [];
  private readonly JWT_SECRET: string;
  private readonly SALT_ROUNDS = 10;

  constructor() {
    // Em uma aplicação real, você usaria uma variável de ambiente para o segredo do JWT
    this.JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
    
    // Adiciona um usuário de exemplo
    this.createUser({
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin'
    });
  }

  // Remove a senha antes de retornar ao cliente
  private sanitizeUser(user: User): SafeUser {
    const { password, ...safeUser } = user;
    return safeUser;
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.users.find(u => u.username === username) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find(u => u.email === email) || null;
  }

  async findById(id: string): Promise<SafeUser | null> {
    const user = this.users.find(u => u.id === id);
    return user ? this.sanitizeUser(user) : null;
  }

  async createUser(userData: { username: string; email: string; password: string; role: 'user' | 'admin' }): Promise<SafeUser> {
    // Verifica se o usuário ou e-mail já existe
    const existingUsername = await this.findByUsername(userData.username);
    const existingEmail = await this.findByEmail(userData.email);

    if (existingUsername) {
      throw new Error('Nome de usuário já está em uso');
    }

    if (existingEmail) {
      throw new Error('E-mail já está em uso');
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(userData.password, this.SALT_ROUNDS);

    // Cria o novo usuário
    const newUser: User = {
      id: Date.now().toString(),
      username: userData.username,
      email: userData.email,
      password: hashedPassword,
      role: userData.role,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.users.push(newUser);
    
    return this.sanitizeUser(newUser);
  }

  async authenticate(username: string, password: string): Promise<{ user: SafeUser; token: string } | null> {
    // Busca o usuário pelo nome de usuário
    const user = await this.findByUsername(username);
    
    if (!user) {
      return null;
    }

    // Verifica a senha
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return null;
    }

    // Gera o token JWT
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      this.JWT_SECRET,
      { expiresIn: '1h' } // O token expira em 1 hora
    );

    return {
      user: this.sanitizeUser(user),
      token
    };
  }

  verifyToken(token: string): { id: string; username: string; role: string } | null {
    try {
      return jwt.verify(token, this.JWT_SECRET) as { id: string; username: string; role: string };
    } catch (error) {
      return null;
    }
  }
}`}
                  />
                </div>

                <h2 id="auth-middleware">Middleware de Autenticação</h2>
                <p>
                  Agora, vamos criar um middleware para verificar se o usuário está autenticado.
                  Crie um arquivo chamado <code>src/middlewares/auth.ts</code>:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`// src/middlewares/auth.ts
import { Request, Response, NextFunction } from '@atosjs/azura';
import { UserService } from '../services/UserService';

const userService = new UserService();

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  // Obtém o token do cabeçalho Authorization
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: 'Token não fornecido ou formato inválido'
    });
  }

  // Extrai o token
  const token = authHeader.split(' ')[1];
  
  // Verifica o token
  const decoded = userService.verifyToken(token);
  
  if (!decoded) {
    return res.status(401).json({
      success: false,
      error: 'Token inválido ou expirado'
    });
  }

  // Adiciona as informações do usuário à requisição
  req.user = decoded;
  
  // Prossegue para o próximo middleware ou rota
  next();
}

// Middleware para verificar o papel (role) do usuário
export function roleMiddleware(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    // Verifica se o usuário está autenticado
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Usuário não autenticado'
      });
    }

    // Verifica se o usuário tem o papel necessário
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: 'Acesso negado: permissão insuficiente'
      });
    }

    // Usuário tem permissão, prossegue
    next();
  };
}`}
                  />
                </div>

                <h2 id="auth-controller">Controller de Autenticação</h2>
                <p>
                  Agora, vamos criar um controller para gerenciar registro e login de usuários. Crie
                  um arquivo chamado <code>src/controllers/AuthController.ts</code>:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`// src/controllers/AuthController.ts
import { Controller, Post, Get } from '@atosjs/azura';
import { UserService } from '../services/UserService';
import { authMiddleware } from '../middlewares/auth';

@Controller('/api/auth')
export class AuthController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  @Post('/register')
  async register(req, res) {
    try {
      const { username, email, password } = req.body;
      
      // Validação básica
      if (!username || !email || !password) {
        return res.status(400).json({
          success: false,
          error: 'Dados inválidos',
          details: 'Campos obrigatórios: username, email, password'
        });
      }

      // Cria o usuário (por padrão com papel 'user')
      const user = await this.userService.createUser({
        username,
        email,
        password,
        role: 'user'
      });

      res.status(201).json({
        success: true,
        data: user
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  @Post('/login')
  async login(req, res) {
    try {
      const { username, password } = req.body;
      
      // Validação básica
      if (!username || !password) {
        return res.status(400).json({
          success: false,
          error: 'Dados inválidos',
          details: 'Campos obrigatórios: username, password'
        });
      }

      // Tenta autenticar o usuário
      const result = await this.userService.authenticate(username, password);
      
      if (!result) {
        return res.status(401).json({
          success: false,
          error: 'Credenciais inválidas'
        });
      }

      res.json({
        success: true,
        data: {
          user: result.user,
          token: result.token
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  @Get('/me')
  async getProfile(req, res, next) {
    // Aplica o middleware de autenticação
    authMiddleware(req, res, async () => {
      try {
        // O middleware já verificou e adicionou o usuário à requisição
        const userId = req.user.id;
        
        // Busca o usuário pelo ID
        const user = await this.userService.findById(userId);
        
        if (!user) {
          return res.status(404).json({
            success: false,
            error: 'Usuário não encontrado'
          });
        }

        res.json({
          success: true,
          data: user
        });
      } catch (error) {
        next(error);
      }
    });
  }
}`}
                  />
                </div>

                <h2 id="protected-routes">Rotas Protegidas</h2>
                <p>
                  Vamos criar um controller com rotas protegidas que requerem autenticação. Crie um
                  arquivo chamado <code>src/controllers/ProtectedController.ts</code>:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`// src/controllers/ProtectedController.ts
import { Controller, Get, UseMiddleware } from '@atosjs/azura';
import { authMiddleware, roleMiddleware } from '../middlewares/auth';

@Controller('/api/protected')
@UseMiddleware(authMiddleware) // Todas as rotas neste controller requerem autenticação
export class ProtectedController {
  @Get('/user-data')
  async getUserData(req, res) {
    // O usuário já foi autenticado pelo middleware
    res.json({
      success: true,
      data: {
        message: 'Esta é uma rota protegida para usuários autenticados',
        user: {
          id: req.user.id,
          username: req.user.username,
          role: req.user.role
        }
      }
    });
  }

  @Get('/admin-only')
  @UseMiddleware(roleMiddleware(['admin'])) // Esta rota requer o papel de admin
  async getAdminData(req, res) {
    res.json({
      success: true,
      data: {
        message: 'Esta é uma rota protegida apenas para administradores',
        user: {
          id: req.user.id,
          username: req.user.username,
          role: req.user.role
        }
      }
    });
  }
}`}
                  />
                </div>

                <h2 id="server-setup">Configuração do Servidor</h2>
                <p>
                  Finalmente, vamos configurar o servidor principal para incluir nossos controllers
                  de autenticação. Crie ou atualize o arquivo <code>src/index.ts</code>:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`// src/index.ts
import { AzuraServer } from '@atosjs/azura';
import { AuthController } from './controllers/AuthController';
import { ProtectedController } from './controllers/ProtectedController';

async function bootstrap() {
  const app = new AzuraServer({
    port: parseInt(process.env.PORT || '3000')
  });

  // Middleware para processar JSON
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
          res.status(400).json({ success: false, error: 'JSON inválido' });
        }
      });
    } else {
      next();
    }
  });

  // Define uma rota pública
  app.get('/api/public', (req, res) => {
    res.json({
      success: true,
      message: 'Esta é uma rota pública acessível a todos'
    });
  });

  // Carrega os controllers
  app.load([AuthController, ProtectedController]);

  // Middleware para rotas não encontradas
  app.use((req, res) => {
    res.status(404).json({
      success: false,
      error: 'Rota não encontrada'
    });
  });

  // Inicia o servidor
  app.listen(() => {
    console.log(\`Servidor rodando na porta \${app.getPort()}\`);
  });
}

bootstrap().catch(console.error);`}
                  />
                </div>

                <h2 id="running-testing">Executando e Testando</h2>
                <p>Agora você pode iniciar o servidor e testar a autenticação:</p>

                <div className="not-prose">
                  <CodeDemo language="bash" code={`npm run dev`} showLineNumbers={false} />
                </div>

                <p>Vamos testar nossa API de autenticação:</p>

                <h3 id="test-register">1. Registrar um novo usuário</h3>

                <div className="not-prose">
                  <CodeDemo
                    language="bash"
                    code={`curl -X POST http://localhost:3000/api/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{
    "username": "usuario",
    "email": "usuario@example.com",
    "password": "senha123"
  }'`}
                    showLineNumbers={false}
                  />
                </div>

                <h3 id="test-login">2. Fazer login</h3>

                <div className="not-prose">
                  <CodeDemo
                    language="bash"
                    code={`curl -X POST http://localhost:3000/api/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "username": "usuario",
    "password": "senha123"
  }'`}
                    showLineNumbers={false}
                  />
                </div>

                <p>Copie o token JWT retornado para usar nas próximas requisições.</p>

                <h3 id="test-protected">3. Acessar uma rota protegida</h3>

                <div className="not-prose">
                  <CodeDemo
                    language="bash"
                    code={`curl -X GET http://localhost:3000/api/protected/user-data \\
  -H "Authorization: Bearer SEU_TOKEN_JWT"`}
                    showLineNumbers={false}
                  />
                </div>

                <h3 id="test-admin">4. Acessar uma rota de administrador</h3>

                <div className="not-prose">
                  <CodeDemo
                    language="bash"
                    code={`# Primeiro, faça login como admin
curl -X POST http://localhost:3000/api/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "username": "admin",
    "password": "admin123"
  }'

# Então, use o token do admin para acessar a rota protegida
curl -X GET http://localhost:3000/api/protected/admin-only \\
  -H "Authorization: Bearer TOKEN_DO_ADMIN"`}
                    showLineNumbers={false}
                  />
                </div>

                <h2 id="advanced-topics">Tópicos Avançados</h2>

                <h3 id="refresh-tokens">Tokens de Atualização</h3>
                <p>
                  Para melhorar a experiência do usuário, você pode implementar tokens de
                  atualização (refresh tokens), que permitem que um usuário obtenha um novo token
                  JWT sem precisar fazer login novamente.
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`// Adicione ao UserService.ts

// Armazena refresh tokens (em uma aplicação real, isso seria armazenado em um banco de dados)
private refreshTokens: Map<string, { userId: string; expiresAt: Date }> = new Map();

async generateRefreshToken(userId: string): Promise<string> {
  // Gera um refresh token (um UUID ou outro identificador único)
  const refreshToken = crypto.randomBytes(40).toString('hex');
  
  // Define a expiração (por exemplo, 7 dias)
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);
  
  // Armazena o refresh token
  this.refreshTokens.set(refreshToken, { userId, expiresAt });
  
  return refreshToken;
}

async refreshAccessToken(refreshToken: string): Promise<{ token: string } | null> {
  // Verifica se o refresh token existe e não expirou
  const tokenData = this.refreshTokens.get(refreshToken);
  
  if (!tokenData) {
    return null;
  }
  
  // Verifica se o token expirou
  if (new Date() > tokenData.expiresAt) {
    // Remove o token expirado
    this.refreshTokens.delete(refreshToken);
    return null;
  }
  
  // Busca o usuário
  const user = this.users.find(u => u.id === tokenData.userId);
  
  if (!user) {
    return null;
  }
  
  // Gera um novo access token
  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    this.JWT_SECRET,
    { expiresIn: '1h' }
  );
  
  return { token };
}

// Adicione um endpoint de refresh token ao AuthController.ts
@Post('/refresh-token')
async refreshToken(req, res) {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        error: 'Refresh token não fornecido'
      });
    }
    
    const result = await this.userService.refreshAccessToken(refreshToken);
    
    if (!result) {
      return res.status(401).json({
        success: false,
        error: 'Refresh token inválido ou expirado'
      });
    }
    
    res.json({
      success: true,
      data: {
        token: result.token
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}`}
                  />
                </div>

                <h3 id="password-reset">Redefinição de Senha</h3>
                <p>
                  Implementar um fluxo de redefinição de senha é uma funcionalidade importante para
                  qualquer sistema de autenticação.
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`// Adicione ao UserService.ts

// Armazena tokens de redefinição de senha (em uma aplicação real, isso seria armazenado em um banco de dados)
private resetTokens: Map<string, { userId: string; expiresAt: Date }> = new Map();

async generatePasswordResetToken(email: string): Promise<string | null> {
  // Busca o usuário pelo e-mail
  const user = await this.findByEmail(email);
  
  if (!user) {
    return null;
  }
  
  // Gera um token de redefinição de senha
  const resetToken = crypto.randomBytes(20).toString('hex');
  
  // Define a expiração (por exemplo, 1 hora)
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 1);
  
  // Armazena o token
  this.resetTokens.set(resetToken, { userId: user.id, expiresAt });
  
  return resetToken;
}

async resetPassword(resetToken: string, newPassword: string): Promise<boolean> {
  // Verifica se o token existe e não expirou
  const tokenData = this.resetTokens.get(resetToken);
  
  if (!tokenData) {
    return false;
  }
  
  // Verifica se o token expirou
  if (new Date() > tokenData.expiresAt) {
    // Remove o token expirado
    this.resetTokens.delete(resetToken);
    return false;
  }
  
  // Busca o usuário
  const index = this.users.findIndex(u => u.id === tokenData.userId);
  
  if (index === -1) {
    return false;
  }
  
  // Hash da nova senha
  const hashedPassword = await bcrypt.hash(newPassword, this.SALT_ROUNDS);
  
  // Atualiza a senha do usuário
  this.users[index].password = hashedPassword;
  this.users[index].updatedAt = new Date();
  
  // Remove o token usado
  this.resetTokens.delete(resetToken);
  
  return true;
}

// Adicione endpoints ao AuthController.ts
@Post('/forgot-password')
async forgotPassword(req, res) {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'E-mail não fornecido'
      });
    }
    
    const resetToken = await this.userService.generatePasswordResetToken(email);
    
    if (!resetToken) {
      // Por segurança, não informamos se o e-mail existe ou não
      return res.json({
        success: true,
        message: 'Se o e-mail estiver registrado, você receberá instruções para redefinir sua senha'
      });
    }
    
    // Em uma aplicação real, você enviaria um e-mail com um link contendo o token
    console.log(\`Token de redefinição para \${email}: \${resetToken}\`);
    
    res.json({
      success: true,
      message: 'Se o e-mail estiver registrado, você receberá instruções para redefinir sua senha'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

@Post('/reset-password')
async resetPassword(req, res) {
  try {
    const { resetToken, newPassword } = req.body;
    
    if (!resetToken || !newPassword) {
      return res.status(400).json({
        success: false,
        error: 'Token de redefinição e nova senha são obrigatórios'
      });
    }
    
    const success = await this.userService.resetPassword(resetToken, newPassword);
    
    if (!success) {
      return res.status(400).json({
        success: false,
        error: 'Token inválido ou expirado'
      });
    }
    
    res.json({
      success: true,
      message: 'Senha redefinida com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}`}
                  />
                </div>

                <h2 id="security-best-practices">Melhores Práticas de Segurança</h2>
                <p>
                  Ao implementar autenticação em sua aplicação, considere as seguintes melhores
                  práticas:
                </p>

                <ul>
                  <li>
                    <strong>Armazenamento seguro de senhas</strong>: Sempre use bibliotecas como
                    bcrypt ou Argon2 para hash de senhas. Nunca armazene senhas em texto puro.
                  </li>
                  <li>
                    <strong>Segredo JWT seguro</strong>: Use um segredo forte e aleatório para
                    assinar seus tokens JWT e armazene-o em variáveis de ambiente.
                  </li>
                  <li>
                    <strong>Expiração de tokens</strong>: Configure seus tokens JWT para expirar
                    após um período razoável (por exemplo, 15-60 minutos).
                  </li>
                  <li>
                    <strong>HTTPS</strong>: Sempre use HTTPS em produção para proteger os dados em
                    trânsito.
                  </li>
                  <li>
                    <strong>Proteção contra CSRF</strong>: Implemente proteção contra Cross-Site
                    Request Forgery (CSRF) para APIs que usam cookies.
                  </li>
                  <li>
                    <strong>Validação de entradas</strong>: Valide rigorosamente todas as entradas
                    do usuário para prevenir injeção de SQL e outros ataques.
                  </li>
                  <li>
                    <strong>Controle de acesso</strong>: Implemente controle de acesso baseado em
                    papéis (RBAC) para restringir acesso a recursos sensíveis.
                  </li>
                  <li>
                    <strong>Limitação de taxa</strong>: Implemente limitação de taxa para rotas de
                    autenticação para prevenir ataques de força bruta.
                  </li>
                </ul>

                <h2 id="next-steps">Próximos Passos</h2>
                <p>
                  Agora que você implementou autenticação básica em sua aplicação Azura, você pode:
                </p>

                <ul>
                  <li>
                    <Link
                      href="/docs/examples/database"
                      className="text-purple-400 hover:text-purple-300"
                    >
                      Conectar a um banco de dados real
                    </Link>{" "}
                    para armazenar usuários e tokens
                  </li>
                  <li>
                    <Link
                      href="/docs/examples/validation"
                      className="text-purple-400 hover:text-purple-300"
                    >
                      Implementar validação avançada
                    </Link>{" "}
                    para dados de usuário
                  </li>
                  <li>
                    <Link
                      href="/docs/guides/deployment"
                      className="text-purple-400 hover:text-purple-300"
                    >
                      Implantar sua aplicação
                    </Link>{" "}
                    em um ambiente de produção
                  </li>
                  <li>
                    Implementar autenticação OAuth 2.0 para permitir login com provedores como
                    Google, Facebook, etc.
                  </li>
                  <li>Implementar autenticação de dois fatores (2FA) para maior segurança</li>
                </ul>
              </div>

              <div className="hidden lg:block">
                <div className="sticky top-16">
                  <TableOfContents
                    items={[
                      { id: "introduction", title: "Introdução", level: 2 },
                      { id: "prerequisites", title: "Pré-requisitos", level: 2 },
                      { id: "user-model", title: "Modelo de Usuário", level: 2 },
                      { id: "user-service", title: "Serviço de Usuário", level: 2 },
                      { id: "auth-middleware", title: "Middleware de Autenticação", level: 2 },
                      { id: "auth-controller", title: "Controller de Autenticação", level: 2 },
                      { id: "protected-routes", title: "Rotas Protegidas", level: 2 },
                      { id: "server-setup", title: "Configuração do Servidor", level: 2 },
                      { id: "running-testing", title: "Executando e Testando", level: 2 },
                      { id: "test-register", title: "Registrar um novo usuário", level: 3 },
                      { id: "test-login", title: "Fazer login", level: 3 },
                      { id: "test-protected", title: "Acessar uma rota protegida", level: 3 },
                      { id: "test-admin", title: "Acessar uma rota de administrador", level: 3 },
                      { id: "advanced-topics", title: "Tópicos Avançados", level: 2 },
                      { id: "refresh-tokens", title: "Tokens de Atualização", level: 3 },
                      { id: "password-reset", title: "Redefinição de Senha", level: 3 },
                      {
                        id: "security-best-practices",
                        title: "Melhores Práticas de Segurança",
                        level: 2,
                      },
                      { id: "next-steps", title: "Próximos Passos", level: 2 },
                    ]}
                  />
                </div>
              </div>
            </div>

            <div className="mt-16 border-t border-gray-800 pt-8 flex items-center justify-between">
              <Link
                href="/docs/examples/rest-api"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                ← API REST
              </Link>
              <Link
                href="/docs/examples/validation"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                Validação →
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
