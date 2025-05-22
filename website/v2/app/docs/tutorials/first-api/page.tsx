"use client";

import { useLanguage } from "@/components/language-provider";
import { InteractiveTutorial } from "@/components/docs/interactive-tutorial";

export default function FirstApiTutorial() {
  const { language } = useLanguage();

  const tutorialSteps = [
    {
      title: {
        en: "Setting up your project",
        pt: "Configurando seu projeto",
      },
      description: {
        en: "Let's start by creating a new Azura project and installing the necessary dependencies.",
        pt: "Vamos começar criando um novo projeto Azura e instalando as dependências necessárias.",
      },
      code: {
        typescript: `// Create a new directory for your project
mkdir my-first-api
cd my-first-api

// Initialize a new npm project
npm init -y

// Install Azura and its dependencies
npm install @atosjs/azura typescript ts-node @types/node`,
        javascript: `// Create a new directory for your project
mkdir my-first-api
cd my-first-api

// Initialize a new npm project
npm init -y

// Install Azura and its dependencies
npm install @atosjs/azura`,
      },
      explanation: {
        en: `<p>In this step, we're setting up a new project directory and initializing it as an npm package. This creates a <code>package.json</code> file that will track our dependencies.</p>
        <p>Then, we install the Azura framework along with TypeScript and its related packages (if you're using TypeScript). These tools will help us build our API with type safety.</p>
        <p>If you're using JavaScript, you only need to install the Azura framework itself.</p>`,
        pt: `<p>Neste passo, estamos configurando um novo diretório de projeto e inicializando-o como um pacote npm. Isso cria um arquivo <code>package.json</code> que rastreará nossas dependências.</p>
        <p>Em seguida, instalamos o framework Azura junto com TypeScript e seus pacotes relacionados (se você estiver usando TypeScript). Essas ferramentas nos ajudarão a construir nossa API com segurança de tipos.</p>
        <p>Se você estiver usando JavaScript, só precisa instalar o próprio framework Azura.</p>`,
      },
    },
    {
      title: {
        en: "Creating your first server",
        pt: "Criando seu primeiro servidor",
      },
      description: {
        en: "Now, let's create a basic Azura server with a simple route.",
        pt: "Agora, vamos criar um servidor Azura básico com uma rota simples.",
      },
      code: {
        typescript: `// src/index.ts
import { Azura } from '@atosjs/azura';

// Create a new Azura instance
const app = new Azura();

// Define a simple route
app.get('/hello', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});`,
        javascript: `// src/index.js
const { Azura } = require('@atosjs/azura');

// Create a new Azura instance
const app = new Azura();

// Define a simple route
app.get('/hello', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});`,
      },
      explanation: {
        en: `<p>In this step, we're creating our first Azura server:</p>
        <ol>
          <li>We import the <code>Azura</code> class from the framework</li>
          <li>We create a new instance of the Azura application</li>
          <li>We define a GET route at the path <code>/hello</code> that returns a JSON response</li>
          <li>Finally, we start the server on port 3000</li>
        </ol>
        <p>When you run this code and visit <code>http://localhost:3000/hello</code> in your browser, you'll see the JSON response <code>{ "message": "Hello, World!" }</code>.</p>`,
        pt: `<p>Neste passo, estamos criando nosso primeiro servidor Azura:</p>
        <ol>
          <li>Importamos a classe <code>Azura</code> do framework</li>
          <li>Criamos uma nova instância da aplicação Azura</li>
          <li>Definimos uma rota GET no caminho <code>/hello</code> que retorna uma resposta JSON</li>
          <li>Finalmente, iniciamos o servidor na porta 3000</li>
        </ol>
        <p>Quando você executar este código e visitar <code>http://localhost:3000/hello</code> em seu navegador, verá a resposta JSON <code>{ "message": "Hello, World!" }</code>.</p>`,
      },
    },
    {
      title: {
        en: "Adding more routes",
        pt: "Adicionando mais rotas",
      },
      description: {
        en: "Let's expand our API by adding more routes with different HTTP methods.",
        pt: "Vamos expandir nossa API adicionando mais rotas com diferentes métodos HTTP.",
      },
      code: {
        typescript: `// src/index.ts
import { Azura } from '@atosjs/azura';

const app = new Azura();

// GET route
app.get('/api/users', (req, res) => {
  res.json([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' }
  ]);
});

// GET route with parameter
app.get('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  res.json({ id: userId, name: \`User \${userId}\` });
});

// POST route
app.post('/api/users', (req, res) => {
  // In a real app, you would save the user to a database
  const newUser = req.body;
  res.status(201).json({ ...newUser, id: 3 });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});`,
        javascript: `// src/index.js
const { Azura } = require('@atosjs/azura');

const app = new Azura();

// GET route
app.get('/api/users', (req, res) => {
  res.json([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' }
  ]);
});

// GET route with parameter
app.get('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  res.json({ id: userId, name: \`User \${userId}\` });
});

// POST route
app.post('/api/users', (req, res) => {
  // In a real app, you would save the user to a database
  const newUser = req.body;
  res.status(201).json({ ...newUser, id: 3 });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});`,
      },
      explanation: {
        en: `<p>Now we're expanding our API with more routes:</p>
        <ul>
          <li><strong>GET /api/users</strong>: Returns a list of users</li>
          <li><strong>GET /api/users/:id</strong>: Returns a single user by ID (using route parameters)</li>
          <li><strong>POST /api/users</strong>: Creates a new user (using request body)</li>
        </ul>
        <p>Notice how we can access route parameters with <code>req.params</code> and request body with <code>req.body</code>. Azura automatically parses JSON request bodies for you.</p>
        <p>We're also using <code>res.status(201)</code> to set a specific HTTP status code for the response.</p>`,
        pt: `<p>Agora estamos expandindo nossa API com mais rotas:</p>
        <ul>
          <li><strong>GET /api/users</strong>: Retorna uma lista de usuários</li>
          <li><strong>GET /api/users/:id</strong>: Retorna um único usuário por ID (usando parâmetros de rota)</li>
          <li><strong>POST /api/users</strong>: Cria um novo usuário (usando corpo da requisição)</li>
        </ul>
        <p>Observe como podemos acessar parâmetros de rota com <code>req.params</code> e o corpo da requisição com <code>req.body</code>. O Azura analisa automaticamente os corpos de requisição JSON para você.</p>
        <p>Também estamos usando <code>res.status(201)</code> para definir um código de status HTTP específico para a resposta.</p>`,
      },
    },
    {
      title: {
        en: "Using middleware",
        pt: "Usando middleware",
      },
      description: {
        en: "Let's add middleware to our application for logging and authentication.",
        pt: "Vamos adicionar middleware à nossa aplicação para logging e autenticação.",
      },
      code: {
        typescript: `// src/index.ts
import { Azura } from '@atosjs/azura';

const app = new Azura();

// Logging middleware
app.use((req, res, next) => {
  console.log(\`\${new Date().toISOString()} - \${req.method} \${req.path}\`);
  next();
});

// Authentication middleware
const authenticate = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  
  if (!apiKey || apiKey !== 'secret-key') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  next();
};

// Public route
app.get('/api/public', (req, res) => {
  res.json({ message: 'This is a public endpoint' });
});

// Protected route with authentication middleware
app.get('/api/protected', authenticate, (req, res) => {
  res.json({ message: 'This is a protected endpoint' });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});`,
        javascript: `// src/index.js
const { Azura } = require('@atosjs/azura');

const app = new Azura();

// Logging middleware
app.use((req, res, next) => {
  console.log(\`\${new Date().toISOString()} - \${req.method} \${req.path}\`);
  next();
});

// Authentication middleware
const authenticate = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  
  if (!apiKey || apiKey !== 'secret-key') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  next();
};

// Public route
app.get('/api/public', (req, res) => {
  res.json({ message: 'This is a public endpoint' });
});

// Protected route with authentication middleware
app.get('/api/protected', authenticate, (req, res) => {
  res.json({ message: 'This is a protected endpoint' });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});`,
      },
      explanation: {
        en: `<p>Middleware functions are a powerful feature in Azura. They allow you to process requests before they reach your route handlers.</p>
        <p>In this example, we've added two types of middleware:</p>
        <ol>
          <li><strong>Global logging middleware</strong>: Applied to all routes using <code>app.use()</code>. It logs the timestamp, HTTP method, and path for every request.</li>
          <li><strong>Route-specific authentication middleware</strong>: Applied only to specific routes. It checks for a valid API key in the request headers.</li>
        </ol>
        <p>Middleware functions take three parameters: <code>req</code>, <code>res</code>, and <code>next</code>. The <code>next()</code> function passes control to the next middleware in the stack. If you don't call <code>next()</code>, the request processing stops.</p>
        <p>To test the protected route, you'll need to include the header <code>x-api-key: secret-key</code> in your request.</p>`,
        pt: `<p>Funções de middleware são um recurso poderoso no Azura. Elas permitem processar requisições antes que cheguem aos seus manipuladores de rota.</p>
        <p>Neste exemplo, adicionamos dois tipos de middleware:</p>
        <ol>
          <li><strong>Middleware de logging global</strong>: Aplicado a todas as rotas usando <code>app.use()</code>. Ele registra o timestamp, método HTTP e caminho para cada requisição.</li>
          <li><strong>Middleware de autenticação específico de rota</strong>: Aplicado apenas a rotas específicas. Ele verifica uma chave de API válida nos cabeçalhos da requisição.</li>
        </ol>
        <p>Funções de middleware recebem três parâmetros: <code>req</code>, <code>res</code> e <code>next</code>. A função <code>next()</code> passa o controle para o próximo middleware na pilha. Se você não chamar <code>next()</code>, o processamento da requisição para.</p>
        <p>Para testar a rota protegida, você precisará incluir o cabeçalho <code>x-api-key: secret-key</code> em sua requisição.</p>`,
      },
    },
    {
      title: {
        en: "Connecting to a database",
        pt: "Conectando a um banco de dados",
      },
      description: {
        en: "Let's connect our API to a database to store and retrieve data.",
        pt: "Vamos conectar nossa API a um banco de dados para armazenar e recuperar dados.",
      },
      code: {
        typescript: `// src/index.ts
import { Azura } from '@atosjs/azura';
import { Database } from '@atosjs/azura/database';

const app = new Azura();

// Configure database connection
const db = new Database({
  type: 'mongodb',
  url: process.env.MONGO_URL || 'mongodb://localhost:27017/my-api',
});

// Connect to the database
db.connect()
  .then(() => {
    console.log('Connected to database');
    
    // Define a users collection
    const users = db.collection('users');
    
    // Get all users
    app.get('/api/users', async (req, res) => {
      try {
        const allUsers = await users.find().toArray();
        res.json(allUsers);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
      }
    });
    
    // Get user by ID
    app.get('/api/users/:id', async (req, res) => {
      try {
        const user = await users.findOne({ _id: req.params.id });
        
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        
        res.json(user);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
      }
    });
    
    // Create a new user
    app.post('/api/users', async (req, res) => {
      try {
        const result = await users.insertOne(req.body);
        res.status(201).json({ 
          id: result.insertedId,
          ...req.body 
        });
      } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
      }
    });
    
    // Start the server
    app.listen(3000, () => {
      console.log('Server running on http://localhost:3000');
    });
  })
  .catch(err => {
    console.error('Failed to connect to database:', err);
    process.exit(1);
  });`,
        javascript: `// src/index.js
const { Azura } = require('@atosjs/azura');
const { Database } = require('@atosjs/azura/database');

const app = new Azura();

// Configure database connection
const db = new Database({
  type: 'mongodb',
  url: process.env.MONGO_URL || 'mongodb://localhost:27017/my-api',
});

// Connect to the database
db.connect()
  .then(() => {
    console.log('Connected to database');
    
    // Define a users collection
    const users = db.collection('users');
    
    // Get all users
    app.get('/api/users', async (req, res) => {
      try {
        const allUsers = await users.find().toArray();
        res.json(allUsers);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
      }
    });
    
    // Get user by ID
    app.get('/api/users/:id', async (req, res) => {
      try {
        const user = await users.findOne({ _id: req.params.id });
        
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        
        res.json(user);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
      }
    });
    
    // Create a new user
    app.post('/api/users', async (req, res) => {
      try {
        const result = await users.insertOne(req.body);
        res.status(201).json({ 
          id: result.insertedId,
          ...req.body 
        });
      } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
      }
    });
    
    // Start the server
    app.listen(3000, () => {
      console.log('Server running on http://localhost:3000');
    });
  })
  .catch(err => {
    console.error('Failed to connect to database:', err);
    process.exit(1);
  });`,
      },
      explanation: {
        en: `<p>In this step, we're connecting our API to a MongoDB database:</p>
        <ol>
          <li>We import the <code>Database</code> class from Azura's database module</li>
          <li>We create a new database connection with configuration options</li>
          <li>We connect to the database before starting our server</li>
          <li>We define a <code>users</code> collection to store our user data</li>
          <li>We update our routes to use the database for CRUD operations</li>
        </ol>
        <p>Notice that our route handlers are now <code>async</code> functions, allowing us to use <code>await</code> with database operations. We're also adding proper error handling with try/catch blocks and appropriate HTTP status codes.</p>
        <p>The database connection URL is read from an environment variable (<code>MONGO_URL</code>) with a fallback to a local MongoDB instance.</p>`,
        pt: `<p>Neste passo, estamos conectando nossa API a um banco de dados MongoDB:</p>
        <ol>
          <li>Importamos a classe <code>Database</code> do módulo de banco de dados do Azura</li>
          <li>Criamos uma nova conexão de banco de dados com opções de configuração</li>
          <li>Conectamos ao banco de dados antes de iniciar nosso servidor</li>
          <li>Definimos uma coleção <code>users</code> para armazenar nossos dados de usuário</li>
          <li>Atualizamos nossas rotas para usar o banco de dados para operações CRUD</li>
        </ol>
        <p>Observe que nossos manipuladores de rota agora são funções <code>async</code>, permitindo-nos usar <code>await</code> com operações de banco de dados. Também estamos adicionando tratamento adequado de erros com blocos try/catch e códigos de status HTTP apropriados.</p>
        <p>A URL de conexão do banco de dados é lida de uma variável de ambiente (<code>MONGO_URL</code>) com um fallback para uma instância local do MongoDB.</p>`,
      },
    },
  ];

  const content = {
    en: {
      title: "Building Your First API",
      description:
        "Learn how to build a complete RESTful API with Azura in this interactive tutorial.",
    },
    pt: {
      title: "Construindo Sua Primeira API",
      description:
        "Aprenda como construir uma API RESTful completa com Azura neste tutorial interativo.",
    },
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">{content[language].title}</h1>
        <p className="mt-2 text-lg text-gray-400">{content[language].description}</p>
      </div>

      <InteractiveTutorial
        title={{
          en: content.en.title,
          pt: content.pt.title,
        }}
        description={{
          en: content.en.description,
          pt: content.pt.description,
        }}
        steps={tutorialSteps}
      />
    </div>
  );
}
