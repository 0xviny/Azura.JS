import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, Book, Code, Github, Package } from "lucide-react"
import { GradientButton } from "@/components/gradient-button"
import { DocCard } from "@/components/doc-card"
import { CodeDemo } from "@/components/code-demo"

export default function DocsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <div className="container max-w-6xl mx-auto px-4 py-16 md:py-24">
        <Link href="/" className="inline-flex mb-8">
          <Button variant="outline" size="sm" className="border-purple-700/50 text-white hover:bg-purple-950/20">
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para Home
          </Button>
        </Link>

        <div className="mb-16">
          <Badge className="mb-4 bg-purple-900/30 text-purple-300 hover:bg-purple-900/40 transition-colors">
            Documentação
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Documentação Azura</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Bem-vindo à documentação oficial do Azura. Aqui você encontrará tudo o que precisa para começar a
            desenvolver APIs modernas e eficientes.
          </p>
        </div>

        {/* Quick Start Section */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Comece em segundos</h2>
              <p className="text-gray-300 mb-6">
                Instale o Azura e crie sua primeira API com poucos comandos. Não é necessária configuração complexa.
              </p>
              <div className="space-y-6">
                <div>
                  <div className="text-sm font-mono text-gray-400 mb-2">Instale o pacote:</div>
                  <div className="bg-gray-950 rounded-lg p-4 font-mono text-purple-300 overflow-x-auto">
                    npm install @atosjs/azura
                  </div>
                </div>
                <div>
                  <div className="text-sm font-mono text-gray-400 mb-2">Crie um arquivo index.js:</div>
                  <div className="bg-gray-950 rounded-lg p-4 font-mono text-purple-300 overflow-x-auto">
                    {`const { AzuraServer } = require('@atosjs/azura');\n\nconst app = new AzuraServer();\n\napp.get('/', (req, res) => {\n  res.send('Hello from Azura!');\n});\n\napp.listen(3000);`}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-mono text-gray-400 mb-2">Execute sua aplicação:</div>
                  <div className="bg-gray-950 rounded-lg p-4 font-mono text-purple-300 overflow-x-auto">
                    node index.js
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <GradientButton asChild>
                  <Link href="/docs/guides/getting-started">
                    Guia completo de início <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </GradientButton>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-purple-700 rounded-xl blur-sm opacity-50"></div>
              <div className="relative bg-black rounded-xl overflow-hidden border border-purple-700/50">
                <video className="w-full h-auto" autoPlay loop muted playsInline>
                  <source src="/placeholder.svg?height=400&width=600" type="video/mp4" />
                  Seu navegador não suporta vídeos.
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-2">Veja em ação</h3>
                  <p className="text-gray-300">Crie uma API completa em minutos</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Documentation Categories */}
        <section className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Explore a documentação</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DocCard
              icon={<Book className="h-6 w-6" />}
              title="Guias"
              description="Tutoriais passo a passo para começar com Azura"
              href="/docs/guides"
              links={[
                { title: "Instalação", href: "/docs/guides/installation" },
                { title: "Primeiros passos", href: "/docs/guides/getting-started" },
                { title: "Estrutura de projeto", href: "/docs/guides/project-structure" },
                { title: "Deployment", href: "/docs/guides/deployment" },
              ]}
            />

            <DocCard
              icon={<Code className="h-6 w-6" />}
              title="API Reference"
              description="Documentação detalhada da API do Azura"
              href="/docs/api"
              links={[
                { title: "AzuraServer", href: "/docs/api/azura-app" },
                { title: "Controllers", href: "/docs/api/controllers" },
                { title: "Middlewares", href: "/docs/api/middlewares" },
                { title: "Plugins", href: "/docs/api/plugins" },
              ]}
            />

            <DocCard
              icon={<Package className="h-6 w-6" />}
              title="Exemplos"
              description="Exemplos práticos para casos de uso comuns"
              href="/docs/examples"
              links={[
                { title: "API REST", href: "/docs/examples/rest-api" },
                { title: "Autenticação", href: "/docs/examples/authentication" },
                { title: "Validação", href: "/docs/examples/validation" },
                { title: "Banco de dados", href: "/docs/examples/database" },
              ]}
            />
          </div>
        </section>

        {/* Featured Examples */}
        <section className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Exemplos em destaque</h2>

          <div className="space-y-8">
            <CodeDemo
              title="API REST Completa"
              description="Crie uma API REST com CRUD completo"
              language="typescript"
              code={`import { AzuraServer, Controller, Get, Post, Put, Delete } from '@atosjs/azura';

@Controller('/api/users')
class UserController {
  private users = [];

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

            <CodeDemo
              title="Autenticação com JWT"
              description="Implemente autenticação segura com JWT"
              language="typescript"
              code={`import { AzuraServer } from '@atosjs/azura';
import jwt from 'jsonwebtoken';

const app = new AzuraServer();
const JWT_SECRET = 'your-secret-key';

// Middleware de autenticação
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token não fornecido' });
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};

// Rota de login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // Aqui você faria a validação com seu banco de dados
  if (username === 'admin' && password === 'password') {
    const token = jwt.sign({ id: 1, username }, JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  }
  
  res.status(401).json({ error: 'Credenciais inválidas' });
});

// Rota protegida
app.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'Rota protegida', user: req.user });
});

app.listen(3000);`}
            />
          </div>

          <div className="mt-10 text-center">
            <GradientButton asChild>
              <Link href="/docs/examples">
                Ver todos os exemplos <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </GradientButton>
          </div>
        </section>

        {/* Community Section */}
        <section>
          <div className="bg-gradient-to-r from-purple-950/50 to-purple-900/50 p-8 md:p-12 rounded-2xl border border-purple-700/30 backdrop-blur-sm">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Junte-se à comunidade</h2>
                <p className="text-gray-300 mb-6">
                  Participe da comunidade Azura, contribua com o projeto e obtenha ajuda de outros desenvolvedores.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-purple-700/50 text-white hover:bg-purple-950/20 transition-all duration-300"
                  >
                    <a href="https://github.com/0xviny/Azura.JS" target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" /> GitHub
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-purple-700/50 text-white hover:bg-purple-950/20 transition-all duration-300"
                  >
                    <a href="https://discord.gg" target="_blank" rel="noopener noreferrer">
                      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                      </svg>
                      Discord
                    </a>
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/60 p-6 rounded-xl border border-purple-700/30">
                  <div className="text-2xl font-bold text-white mb-2">100+</div>
                  <div className="text-gray-300">Contribuidores</div>
                </div>
                <div className="bg-black/60 p-6 rounded-xl border border-purple-700/30">
                  <div className="text-2xl font-bold text-white mb-2">5k+</div>
                  <div className="text-gray-300">Downloads</div>
                </div>
                <div className="bg-black/60 p-6 rounded-xl border border-purple-700/30">
                  <div className="text-2xl font-bold text-white mb-2">50+</div>
                  <div className="text-gray-300">Issues resolvidas</div>
                </div>
                <div className="bg-black/60 p-6 rounded-xl border border-purple-700/30">
                  <div className="text-2xl font-bold text-white mb-2">24h</div>
                  <div className="text-gray-300">Tempo médio de resposta</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
