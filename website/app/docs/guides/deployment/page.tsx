import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ChevronRight, Github } from "lucide-react"
import { CodeDemo } from "@/components/code-demo"
import { DocSidebar } from "@/components/doc-sidebar"
import { TableOfContents } from "@/components/table-of-contents"

export default function DeploymentPage() {
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
                  <span className="text-gray-300">Deployment</span>
                </div>

                <Badge className="mb-4 bg-purple-900/30 text-purple-300 hover:bg-purple-900/40 transition-colors">
                  Guia
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Deployment</h1>
                <p className="text-xl text-gray-300 max-w-3xl">
                  Aprenda como implantar sua aplicação Azura em diferentes ambientes de produção.
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
                    href="https://github.com/0xviny/AzuraV2/edit/main/docs/guides/deployment.md"
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
                <h2 id="preparing-for-production">Preparando para Produção</h2>
                <p>
                  Antes de implantar sua aplicação Azura em um ambiente de produção, você deve seguir algumas práticas
                  recomendadas:
                </p>

                <h3 id="environment-variables">Variáveis de Ambiente</h3>
                <p>
                  Use variáveis de ambiente para configurações sensíveis ou específicas do ambiente, como chaves de API,
                  segredos e URLs de banco de dados. Você pode usar o pacote <code>dotenv</code> para carregar variáveis
                  de ambiente de um arquivo <code>.env</code>:
                </p>

                <div className="not-prose">
                  <CodeDemo language="bash" code="npm install dotenv" showLineNumbers={false} />
                </div>

                <p>
                  Crie um arquivo <code>.env</code> na raiz do seu projeto:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="plaintext"
                    code={`PORT=3000
MONGODB_URI=mongodb://localhost:27017/mydb
JWT_SECRET=your-secret-key
NODE_ENV=production`}
                    showLineNumbers={false}
                  />
                </div>

                <p>E carregue-o no início do seu aplicativo:</p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`// src/index.ts
import 'dotenv/config';
import { AzuraServer } from '@atosjs/azura';

const app = new AzuraServer({
  port: parseInt(process.env.PORT || '3000')
});

// ...`}
                  />
                </div>

                <h3 id="build-process">Processo de Build</h3>
                <p>
                  Para projetos TypeScript, você precisa compilar seu código antes de implantá-lo. Adicione os seguintes
                  scripts ao seu <code>package.json</code>:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="json"
                    code={`{
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "ts-node-dev --respawn src/index.ts"
  }
}`}
                  />
                </div>

                <h3 id="error-handling">Tratamento de Erros</h3>
                <p>Implemente um tratamento de erros adequado para evitar que sua aplicação falhe em produção:</p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`// src/middlewares/errorHandler.ts
import { Request, Response, NextFunction } from '@atosjs/azura';

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

                <p>Adicione este middleware ao final da sua cadeia de middlewares:</p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`// src/index.ts
import { errorHandler } from './middlewares/errorHandler';

// ...

// Adicione depois de todas as rotas e outros middlewares
app.use(errorHandler);`}
                  />
                </div>

                <h2 id="deployment-options">Opções de Deployment</h2>

                <h3 id="deploy-vercel">Deployment na Vercel</h3>
                <p>
                  A Vercel é uma plataforma excelente para implantar aplicações Node.js, incluindo APIs construídas com
                  Azura.
                </p>

                <p>1. Primeiro, instale a CLI da Vercel:</p>

                <div className="not-prose">
                  <CodeDemo language="bash" code="npm install -g vercel" showLineNumbers={false} />
                </div>

                <p>
                  2. Crie um arquivo <code>vercel.json</code> na raiz do seu projeto:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="json"
                    code={`{
  "version": 2,
  "builds": [
    {
      "src": "dist/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "dist/index.js"
    }
  ]
}`}
                  />
                </div>

                <p>3. Implante seu projeto:</p>

                <div className="not-prose">
                  <CodeDemo
                    language="bash"
                    code={`npm run build
vercel`}
                    showLineNumbers={false}
                  />
                </div>

                <p>4. Para implantações de produção subsequentes:</p>

                <div className="not-prose">
                  <CodeDemo
                    language="bash"
                    code={`npm run build
vercel --prod`}
                    showLineNumbers={false}
                  />
                </div>

                <h3 id="deploy-heroku">Deployment no Heroku</h3>
                <p>O Heroku é outra plataforma popular para implantar aplicações Node.js.</p>

                <p>1. Instale a CLI do Heroku:</p>

                <div className="not-prose">
                  <CodeDemo language="bash" code="npm install -g heroku" showLineNumbers={false} />
                </div>

                <p>
                  2. Crie um arquivo <code>Procfile</code> na raiz do seu projeto:
                </p>

                <div className="not-prose">
                  <CodeDemo language="plaintext" code="web: node dist/index.js" showLineNumbers={false} />
                </div>

                <p>3. Certifique-se de que seu aplicativo está escutando na porta fornecida pelo Heroku:</p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`// src/index.ts
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(\`Server running on port \${port}\`);
});`}
                  />
                </div>

                <p>4. Implante no Heroku:</p>

                <div className="not-prose">
                  <CodeDemo
                    language="bash"
                    code={`heroku create my-azura-app
git add .
git commit -m "Ready for deployment"
git push heroku main`}
                    showLineNumbers={false}
                  />
                </div>

                <p>5. Configure as variáveis de ambiente:</p>

                <div className="not-prose">
                  <CodeDemo
                    language="bash"
                    code={`heroku config:set MONGODB_URI=your-mongodb-uri
heroku config:set JWT_SECRET=your-jwt-secret
heroku config:set NODE_ENV=production`}
                    showLineNumbers={false}
                  />
                </div>

                <h3 id="deploy-docker">Deployment com Docker</h3>
                <p>
                  Docker permite empacotar sua aplicação em um contêiner que pode ser executado em qualquer ambiente que
                  suporte Docker.
                </p>

                <p>
                  1. Crie um arquivo <code>Dockerfile</code> na raiz do seu projeto:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="dockerfile"
                    code={`FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/index.js"]`}
                  />
                </div>

                <p>
                  2. Crie um arquivo <code>.dockerignore</code>:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="plaintext"
                    code={`node_modules
npm-debug.log
dist
.env
.git
.gitignore`}
                    showLineNumbers={false}
                  />
                </div>

                <p>3. Construa e execute o contêiner:</p>

                <div className="not-prose">
                  <CodeDemo
                    language="bash"
                    code={`docker build -t my-azura-app .
docker run -p 3000:3000 --env-file .env my-azura-app`}
                    showLineNumbers={false}
                  />
                </div>

                <h3 id="deploy-aws">Deployment na AWS</h3>
                <p>
                  Para implantar na AWS, você pode usar o Elastic Beanstalk, que é um serviço fácil de usar para
                  implantar e escalar aplicações web.
                </p>

                <p>1. Instale a CLI do Elastic Beanstalk:</p>

                <div className="not-prose">
                  <CodeDemo language="bash" code="pip install awsebcli" showLineNumbers={false} />
                </div>

                <p>2. Inicialize seu projeto para o Elastic Beanstalk:</p>

                <div className="not-prose">
                  <CodeDemo language="bash" code="eb init" showLineNumbers={false} />
                </div>

                <p>3. Crie um ambiente e implante sua aplicação:</p>

                <div className="not-prose">
                  <CodeDemo language="bash" code="eb create my-azura-env" showLineNumbers={false} />
                </div>

                <p>4. Para implantações subsequentes:</p>

                <div className="not-prose">
                  <CodeDemo
                    language="bash"
                    code={`npm run build
eb deploy`}
                    showLineNumbers={false}
                  />
                </div>

                <h2 id="production-best-practices">Melhores Práticas para Produção</h2>

                <h3 id="logging">Logging</h3>
                <p>
                  Implemente um sistema de logging adequado para monitorar sua aplicação em produção. Você pode usar
                  bibliotecas como Winston ou Pino:
                </p>

                <div className="not-prose">
                  <CodeDemo language="bash" code="npm install winston" showLineNumbers={false} />
                </div>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`// src/utils/logger.ts
import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

export default logger;`}
                  />
                </div>

                <h3 id="monitoring">Monitoramento</h3>
                <p>
                  Use ferramentas de monitoramento para acompanhar o desempenho e a saúde da sua aplicação. Algumas
                  opções populares incluem:
                </p>

                <ul>
                  <li>PM2 - Gerenciador de processos para Node.js</li>
                  <li>New Relic - Monitoramento de desempenho de aplicações</li>
                  <li>Datadog - Monitoramento de infraestrutura e aplicações</li>
                  <li>Sentry - Rastreamento de erros em tempo real</li>
                </ul>

                <p>Exemplo de configuração do PM2:</p>

                <div className="not-prose">
                  <CodeDemo language="bash" code="npm install -g pm2" showLineNumbers={false} />
                </div>

                <p>
                  Crie um arquivo <code>ecosystem.config.js</code>:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="javascript"
                    code={`module.exports = {
  apps: [{
    name: 'azura-app',
    script: 'dist/index.js',
    instances: 'max',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};`}
                  />
                </div>

                <p>Inicie sua aplicação com PM2:</p>

                <div className="not-prose">
                  <CodeDemo language="bash" code="pm2 start ecosystem.config.js" showLineNumbers={false} />
                </div>

                <h3 id="security">Segurança</h3>
                <p>Implemente medidas de segurança para proteger sua aplicação em produção:</p>

                <ul>
                  <li>Use HTTPS para todas as comunicações</li>
                  <li>Implemente rate limiting para prevenir ataques de força bruta</li>
                  <li>Configure CORS adequadamente</li>
                  <li>Use Helmet para configurar cabeçalhos HTTP de segurança</li>
                </ul>

                <div className="not-prose">
                  <CodeDemo language="bash" code="npm install helmet express-rate-limit" showLineNumbers={false} />
                </div>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`// src/index.ts
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

// Adicione o Helmet para segurança
app.use(helmet());

// Configure o rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // limite de 100 requisições por IP
  standardHeaders: true,
  legacyHeaders: false
});

// Aplique o rate limiting a todas as requisições
app.use(limiter);`}
                  />
                </div>

                <h2 id="scaling">Escalabilidade</h2>
                <p>À medida que sua aplicação cresce, você pode precisar escalar para lidar com mais tráfego:</p>

                <h3 id="horizontal-scaling">Escalabilidade Horizontal</h3>
                <p>Use o módulo cluster do Node.js ou PM2 para aproveitar todos os núcleos da CPU:</p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`// src/index.ts
import cluster from 'cluster';
import os from 'os';
import { AzuraServer } from '@atosjs/azura';

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(\`Master \${process.pid} is running\`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(\`Worker \${worker.process.pid} died\`);
    // Replace the dead worker
    cluster.fork();
  });
} else {
  // Workers can share any TCP connection
  const app = new AzuraServer();
  
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });
  
  app.listen(3000, () => {
    console.log(\`Worker \${process.pid} started\`);
  });
}`}
                  />
                </div>

                <h3 id="load-balancing">Balanceamento de Carga</h3>
                <p>
                  Use um balanceador de carga como Nginx ou HAProxy para distribuir o tráfego entre várias instâncias da
                  sua aplicação.
                </p>

                <h2 id="next-steps">Próximos Passos</h2>
                <p>
                  Agora que você sabe como implantar sua aplicação Azura em produção, você pode explorar outros tópicos
                  avançados:
                </p>

                <ul>
                  <li>
                    <Link href="/docs/api/controllers" className="text-purple-400 hover:text-purple-300">
                      Controllers
                    </Link>{" "}
                    - Aprenda mais sobre como usar controllers
                  </li>
                  <li>
                    <Link href="/docs/api/middlewares" className="text-purple-400 hover:text-purple-300">
                      Middlewares
                    </Link>{" "}
                    - Aprenda mais sobre como usar middlewares
                  </li>
                  <li>
                    <Link href="/docs/examples/authentication" className="text-purple-400 hover:text-purple-300">
                      Autenticação
                    </Link>{" "}
                    - Implemente autenticação em sua aplicação
                  </li>
                </ul>
              </div>

              <div className="hidden lg:block">
                <div className="sticky top-16">
                  <TableOfContents
                    items={[
                      { id: "preparing-for-production", title: "Preparando para Produção", level: 2 },
                      { id: "environment-variables", title: "Variáveis de Ambiente", level: 3 },
                      { id: "build-process", title: "Processo de Build", level: 3 },
                      { id: "error-handling", title: "Tratamento de Erros", level: 3 },
                      { id: "deployment-options", title: "Opções de Deployment", level: 2 },
                      { id: "deploy-vercel", title: "Deployment na Vercel", level: 3 },
                      { id: "deploy-heroku", title: "Deployment no Heroku", level: 3 },
                      { id: "deploy-docker", title: "Deployment com Docker", level: 3 },
                      { id: "deploy-aws", title: "Deployment na AWS", level: 3 },
                      { id: "production-best-practices", title: "Melhores Práticas para Produção", level: 2 },
                      { id: "logging", title: "Logging", level: 3 },
                      { id: "monitoring", title: "Monitoramento", level: 3 },
                      { id: "security", title: "Segurança", level: 3 },
                      { id: "scaling", title: "Escalabilidade", level: 2 },
                      { id: "horizontal-scaling", title: "Escalabilidade Horizontal", level: 3 },
                      { id: "load-balancing", title: "Balanceamento de Carga", level: 3 },
                      { id: "next-steps", title: "Próximos Passos", level: 2 },
                    ]}
                  />
                </div>
              </div>
            </div>

            <div className="mt-16 border-t border-gray-800 pt-8 flex items-center justify-between">
              <Link
                href="/docs/guides/project-structure"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                ← Estrutura de Projeto
              </Link>
              <Link href="/docs/api/controllers" className="text-purple-400 hover:text-purple-300 transition-colors">
                Controllers →
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
