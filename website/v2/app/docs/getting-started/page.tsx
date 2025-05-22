"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react"
import CodeBlock from "@/components/docs/code-block"
import { useLanguage } from "@/components/language-provider"
import { CodeTabs } from "@/components/code-tabs"

export default function GettingStartedPage() {
  const { language } = useLanguage()

  const content = {
    en: {
      title: "Getting Started",
      subtitle: "Learn how to install and set up your first Azura API.",
      installation: "Installation",
      installText: "Install Azura using your favorite package manager:",
      tsSupport: "TypeScript Support",
      tsDesc: "Azura is built with TypeScript and includes type definitions. No need to install additional types.",
      firstApi: "Your First API",
      createFile: "Create a new file named",
      inRoot: "in your project root and add the following code:",
      runApp: "Run your application:",
      visitText: "Visit",
      inBrowser: "in your browser or use a tool like curl or Postman to make a request:",
      seeResponse: "You should see the following response:",
      usingDecorators: "Using Decorators",
      decoratorsDesc: "Azura provides a set of decorators to simplify API development. Here's how to use them:",
      tsConfig: "TypeScript Configuration",
      tsConfigDesc: "To use decorators, make sure to enable",
      and: "and",
      inYour: "in your",
      configuration: "Configuration",
      configDesc: "Create an",
      configFile: "file in your project root to configure your server:",
      configLoad: "Azura will automatically load this configuration when you create a new server instance.",
      nextSteps: "Next Steps",
      nextStepsDesc:
        "Now that you have your first Azura API up and running, explore the following topics to learn more:",
      coreConcepts: "Core Concepts",
      coreConceptsDesc: "Understand the architecture of Azura",
      routing: "Routing",
      routingDesc: "Learn how to define complex routes",
      database: "Database Integration",
      databaseDesc: "Connect your API to a database",
      authentication: "Authentication",
      authDesc: "Secure your API",
      plugins: "Plugins",
      pluginsDesc: "Extend Azura with plugins",
    },
    pt: {
      title: "Primeiros Passos",
      subtitle: "Aprenda como instalar e configurar sua primeira API Azura.",
      installation: "Instalação",
      installText: "Instale o Azura usando seu gerenciador de pacotes favorito:",
      tsSupport: "Suporte a TypeScript",
      tsDesc:
        "Azura é construído com TypeScript e inclui definições de tipos. Não é necessário instalar tipos adicionais.",
      firstApi: "Sua Primeira API",
      createFile: "Crie um novo arquivo chamado",
      inRoot: "na raiz do seu projeto e adicione o seguinte código:",
      runApp: "Execute sua aplicação:",
      visitText: "Visite",
      inBrowser: "no seu navegador ou use uma ferramenta como curl ou Postman para fazer uma requisição:",
      seeResponse: "Você deverá ver a seguinte resposta:",
      usingDecorators: "Usando Decoradores",
      decoratorsDesc:
        "Azura fornece um conjunto de decoradores para simplificar o desenvolvimento de APIs. Veja como usá-los:",
      tsConfig: "Configuração do TypeScript",
      tsConfigDesc: "Para usar decoradores, certifique-se de habilitar",
      and: "e",
      inYour: "no seu",
      configuration: "Configuração",
      configDesc: "Crie um arquivo",
      configFile: "na raiz do seu projeto para configurar seu servidor:",
      configLoad: "Azura carregará automaticamente esta configuração quando você criar uma nova instância do servidor.",
      nextSteps: "Próximos Passos",
      nextStepsDesc:
        "Agora que você tem sua primeira API Azura funcionando, explore os seguintes tópicos para aprender mais:",
      coreConcepts: "Conceitos Principais",
      coreConceptsDesc: "Entenda a arquitetura do Azura",
      routing: "Roteamento",
      routingDesc: "Aprenda como definir rotas complexas",
      database: "Integração com Banco de Dados",
      databaseDesc: "Conecte sua API a um banco de dados",
      authentication: "Autenticação",
      authDesc: "Proteja sua API",
      plugins: "Plugins",
      pluginsDesc: "Estenda o Azura com plugins",
    },
  }

  const c = content[language]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">{c.title}</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">{c.subtitle}</p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{c.installation}</h2>
        <p>{c.installText}</p>

        <Tabs defaultValue="npm">
          <TabsList>
            <TabsTrigger value="npm">npm</TabsTrigger>
            <TabsTrigger value="yarn">Yarn</TabsTrigger>
            <TabsTrigger value="pnpm">pnpm</TabsTrigger>
          </TabsList>
          <TabsContent value="npm">
            <CodeBlock language="bash">npm install @atosjs/azura</CodeBlock>
          </TabsContent>
          <TabsContent value="yarn">
            <CodeBlock language="bash">yarn add @atosjs/azura</CodeBlock>
          </TabsContent>
          <TabsContent value="pnpm">
            <CodeBlock language="bash">pnpm add @atosjs/azura</CodeBlock>
          </TabsContent>
        </Tabs>

        <Alert>
          <Info className="w-4 h-4" />
          <AlertTitle>{c.tsSupport}</AlertTitle>
          <AlertDescription>{c.tsDesc}</AlertDescription>
        </Alert>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{c.firstApi}</h2>
        <p>
          {c.createFile} <code>index.ts</code> {c.inRoot}
        </p>

        <CodeTabs
          typescript={`import { AzuraServer } from '@atosjs/azura';

// Create a new instance of the server
const app = new AzuraServer();

// Define a simple route
app.get('/hello', (req, res) => {
  res.json({ message: 'Hello World!' });
});

// Start the server
app.listen(3000);
console.log('Server is running at http://localhost:3000');`}
          javascript={`const { AzuraServer } = require('@atosjs/azura');

// Create a new instance of the server
const app = new AzuraServer();

// Define a simple route
app.get('/hello', (req, res) => {
  res.json({ message: 'Hello World!' });
});

// Start the server
app.listen(3000);
console.log('Server is running at http://localhost:3000');`}
        />

        <p>{c.runApp}</p>

        <Tabs defaultValue="npm">
          <TabsList>
            <TabsTrigger value="npm">npm</TabsTrigger>
            <TabsTrigger value="yarn">Yarn</TabsTrigger>
            <TabsTrigger value="ts-node">ts-node</TabsTrigger>
          </TabsList>
          <TabsContent value="npm">
            <CodeBlock language="bash">npx ts-node index.ts</CodeBlock>
          </TabsContent>
          <TabsContent value="yarn">
            <CodeBlock language="bash">yarn ts-node index.ts</CodeBlock>
          </TabsContent>
          <TabsContent value="ts-node">
            <CodeBlock language="bash">ts-node index.ts</CodeBlock>
          </TabsContent>
        </Tabs>

        <p>
          {c.visitText} <code>http://localhost:3000/hello</code> {c.inBrowser}
        </p>

        <CodeBlock language="bash">curl http://localhost:3000/hello</CodeBlock>

        <p>{c.seeResponse}</p>

        <CodeBlock language="json">{'{ "message": "Hello World!" }'}</CodeBlock>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{c.usingDecorators}</h2>
        <p>{c.decoratorsDesc}</p>

        <CodeTabs
          typescript={`import { AzuraServer, Controller, Get, Post, Body } from '@atosjs/azura';

// Create a new instance of the server
const app = new AzuraServer();

// Define a controller
@Controller('/users')
class UserController {
  @Get('/')
  getUsers() {
    return { users: [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }] };
  }

  @Post('/')
  createUser(@Body() userData: any) {
    return { message: 'User created', user: userData };
  }
}

// Register the controller
app.load([UserController]);

// Start the server
app.listen(3000);`}
          javascript={`const { AzuraServer, Controller, Get, Post, Body } = require('@atosjs/azura');

// Create a new instance of the server
const app = new AzuraServer();

// Define a controller
@Controller('/users')
class UserController {
  @Get('/')
  getUsers() {
    return { users: [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }] };
  }

  @Post('/')
  createUser(@Body() userData) {
    return { message: 'User created', user: userData };
  }
}

// Register the controller
app.load([UserController]);

// Start the server
app.listen(3000);`}
        />

        <Alert>
          <Info className="w-4 h-4" />
          <AlertTitle>{c.tsConfig}</AlertTitle>
          <AlertDescription>
            {c.tsConfigDesc} <code>experimentalDecorators</code> {c.and} <code>emitDecoratorMetadata</code> {c.inYour}{" "}
            <code>tsconfig.json</code>.
          </AlertDescription>
        </Alert>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{c.configuration}</h2>
        <p>
          {c.configDesc} <code>azura.config.ts</code> {c.configFile}
        </p>

        <CodeTabs
          typescript={`import { AzuraConfig } from '@atosjs/azura';

const config: AzuraConfig = {
  server: {
    port: 8080,
    cluster: true, // Enable cluster mode for better performance
  },
  plugins: {
    cors: {
      enabled: true,
      origin: '*',
    },
    compression: {
      enabled: true,
    },
  },
};

export default config;`}
          javascript={`/** @type {import('@atosjs/azura').AzuraConfig} */
const config = {
  server: {
    port: 8080,
    cluster: true, // Enable cluster mode for better performance
  },
  plugins: {
    cors: {
      enabled: true,
      origin: '*',
    },
    compression: {
      enabled: true,
    },
  },
};

module.exports = config;`}
        />

        <p>{c.configLoad}</p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{c.nextSteps}</h2>
        <p>{c.nextStepsDesc}</p>

        <ul className="ml-6 list-disc">
          <li>
            <a href="/docs/core-concepts" className="text-primary hover:underline">
              {c.coreConcepts}
            </a>{" "}
            - {c.coreConceptsDesc}
          </li>
          <li>
            <a href="/docs/server" className="text-primary hover:underline">
              {c.routing}
            </a>{" "}
            - {c.routingDesc}
          </li>
          <li>
            <a href="/docs/database" className="text-primary hover:underline">
              {c.database}
            </a>{" "}
            - {c.databaseDesc}
          </li>
          <li>
            <a href="/docs/authentication" className="text-primary hover:underline">
              {c.authentication}
            </a>{" "}
            - {c.authDesc}
          </li>
          <li>
            <a href="/docs/plugins" className="text-primary hover:underline">
              {c.plugins}
            </a>{" "}
            - {c.pluginsDesc}
          </li>
        </ul>
      </div>
    </div>
  )
}
