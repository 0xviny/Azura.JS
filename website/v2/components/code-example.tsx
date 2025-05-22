"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/components/language-provider";

export default function CodeExample() {
  const { language } = useLanguage();

  const examples = {
    en: {
      basic: {
        ts: `import { AzuraServer } from '@atosjs/azura';

// Create a new server instance
const app = new AzuraServer();

// Define routes
app.get('/users', (req, res) => {
  const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' }
  ];
  
  res.json(users);
});

app.post('/users', (req, res) => {
  const newUser = req.body;
  
  // Add user to database...
  
  res.status(201).json({
    id: 3,
    ...newUser
  });
});

// Start the server
app.listen(3000);
console.log('Server running at http://localhost:3000');`,
        js: `const { AzuraServer } = require('@atosjs/azura');

// Create a new server instance
const app = new AzuraServer();

// Define routes
app.get('/users', (req, res) => {
  const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' }
  ];
  
  res.json(users);
});

app.post('/users', (req, res) => {
  const newUser = req.body;
  
  // Add user to database...
  
  res.status(201).json({
    id: 3,
    ...newUser
  });
});

// Start the server
app.listen(3000);
console.log('Server running at http://localhost:3000');`,
      },
      controller: {
        ts: `import { AzuraServer, Controller, Get, Post, Body, Param } from '@atosjs/azura';

@Controller('/users')
class UserController {
  private users = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' }
  ];

  @Get('/')
  getAllUsers() {
    return this.users;
  }

  @Get('/:id')
  getUserById(@Param('id') id: string) {
    const user = this.users.find(u => u.id === id);
    if (!user) throw new Error('User not found');
    return user;
  }

  @Post('/')
  createUser(@Body() userData: any) {
    const newUser = {
      id: Date.now().toString(),
      ...userData
    };
    this.users.push(newUser);
    return newUser;
  }
}

const app = new AzuraServer();
app.load([UserController]);
app.listen(3000);`,
        js: `const { AzuraServer, Controller, Get, Post, Body, Param } = require('@atosjs/azura');

@Controller('/users')
class UserController {
  constructor() {
    this.users = [
      { id: '1', name: 'John Doe' },
      { id: '2', name: 'Jane Smith' }
    ];
  }

  @Get('/')
  getAllUsers() {
    return this.users;
  }

  @Get('/:id')
  getUserById(@Param('id') id) {
    const user = this.users.find(u => u.id === id);
    if (!user) throw new Error('User not found');
    return user;
  }

  @Post('/')
  createUser(@Body() userData) {
    const newUser = {
      id: Date.now().toString(),
      ...userData
    };
    this.users.push(newUser);
    return newUser;
  }
}

const app = new AzuraServer();
app.load([UserController]);
app.listen(3000);`,
      },
      database: {
        ts: `import { AzuraServer, Controller, Get, Post, MongoAdapter } from '@atosjs/azura';

// Create database adapter
const db = new MongoAdapter('mongodb://localhost:27017', 'my-app');

@Controller('/users')
class UserController {
  constructor(private db: MongoAdapter) {}

  @Get('/')
  async getAllUsers() {
    return await this.db.find('users');
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string) {
    const users = await this.db.find('users', { id });
    if (!users.length) throw new Error('User not found');
    return users[0];
  }

  @Post('/')
  async createUser(@Body() userData: any) {
    return await this.db.insert('users', userData);
  }
}

async function bootstrap() {
  // Connect to database
  await db.connect();
  
  // Create server
  const app = new AzuraServer();
  
  // Register controller with database
  const userController = new UserController(db);
  app.load([userController]);
  
  app.listen(3000);
}

bootstrap();`,
        js: `const { AzuraServer, Controller, Get, Post, MongoAdapter } = require('@atosjs/azura');

// Create database adapter
const db = new MongoAdapter('mongodb://localhost:27017', 'my-app');

@Controller('/users')
class UserController {
  constructor(db) {
    this.db = db;
  }

  @Get('/')
  async getAllUsers() {
    return await this.db.find('users');
  }

  @Get('/:id')
  async getUserById(@Param('id') id) {
    const users = await this.db.find('users', { id });
    if (!users.length) throw new Error('User not found');
    return users[0];
  }

  @Post('/')
  async createUser(@Body() userData) {
    return await this.db.insert('users', userData);
  }
}

async function bootstrap() {
  // Connect to database
  await db.connect();
  
  // Create server
  const app = new AzuraServer();
  
  // Register controller with database
  const userController = new UserController(db);
  app.load([userController]);
  
  app.listen(3000);
}

bootstrap();`,
      },
    },
    pt: {
      basic: {
        ts: `import { AzuraServer } from '@atosjs/azura';

// Cria uma nova instância do servidor
const app = new AzuraServer();

// Define rotas
app.get('/users', (req, res) => {
  const users = [
    { id: 1, name: 'João Silva' },
    { id: 2, name: 'Maria Souza' }
  ];
  
  res.json(users);
});

app.post('/users', (req, res) => {
  const newUser = req.body;
  
  // Adiciona usuário ao banco de dados...
  
  res.status(201).json({
    id: 3,
    ...newUser
  });
});

// Inicia o servidor
app.listen(3000);
console.log('Servidor rodando em http://localhost:3000');`,
        js: `const { AzuraServer } = require('@atosjs/azura');

// Cria uma nova instância do servidor
const app = new AzuraServer();

// Define rotas
app.get('/users', (req, res) => {
  const users = [
    { id: 1, name: 'João Silva' },
    { id: 2, name: 'Maria Souza' }
  ];
  
  res.json(users);
});

app.post('/users', (req, res) => {
  const newUser = req.body;
  
  // Adiciona usuário ao banco de dados...
  
  res.status(201).json({
    id: 3,
    ...newUser
  });
});

// Inicia o servidor
app.listen(3000);
console.log('Servidor rodando em http://localhost:3000');`,
      },
      controller: {
        ts: `import { AzuraServer, Controller, Get, Post, Body, Param } from '@atosjs/azura';

@Controller('/users')
class UserController {
  private users = [
    { id: '1', name: 'João Silva' },
    { id: '2', name: 'Maria Souza' }
  ];

  @Get('/')
  getAllUsers() {
    return this.users;
  }

  @Get('/:id')
  getUserById(@Param('id') id: string) {
    const user = this.users.find(u => u.id === id);
    if (!user) throw new Error('Usuário não encontrado');
    return user;
  }

  @Post('/')
  createUser(@Body() userData: any) {
    const newUser = {
      id: Date.now().toString(),
      ...userData
    };
    this.users.push(newUser);
    return newUser;
  }
}

const app = new AzuraServer();
app.load([UserController]);
app.listen(3000);`,
        js: `const { AzuraServer, Controller, Get, Post, Body, Param } = require('@atosjs/azura');

@Controller('/users')
class UserController {
  constructor() {
    this.users = [
      { id: '1', name: 'João Silva' },
      { id: '2', name: 'Maria Souza' }
    ];
  }

  @Get('/')
  getAllUsers() {
    return this.users;
  }

  @Get('/:id')
  getUserById(@Param('id') id) {
    const user = this.users.find(u => u.id === id);
    if (!user) throw new Error('Usuário não encontrado');
    return user;
  }

  @Post('/')
  createUser(@Body() userData) {
    const newUser = {
      id: Date.now().toString(),
      ...userData
    };
    this.users.push(newUser);
    return newUser;
  }
}

const app = new AzuraServer();
app.load([UserController]);
app.listen(3000);`,
      },
      database: {
        ts: `import { AzuraServer, Controller, Get, Post, MongoAdapter } from '@atosjs/azura';

// Cria adaptador de banco de dados
const db = new MongoAdapter('mongodb://localhost:27017', 'minha-app');

@Controller('/users')
class UserController {
  constructor(private db: MongoAdapter) {}

  @Get('/')
  async getAllUsers() {
    return await this.db.find('users');
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string) {
    const users = await this.db.find('users', { id });
    if (!users.length) throw new Error('Usuário não encontrado');
    return users[0];
  }

  @Post('/')
  async createUser(@Body() userData: any) {
    return await this.db.insert('users', userData);
  }
}

async function bootstrap() {
  // Conecta ao banco de dados
  await db.connect();
  
  // Cria servidor
  const app = new AzuraServer();
  
  // Registra controller com banco de dados
  const userController = new UserController(db);
  app.load([userController]);
  
  app.listen(3000);
}

bootstrap();`,
        js: `const { AzuraServer, Controller, Get, Post, MongoAdapter } = require('@atosjs/azura');

// Cria adaptador de banco de dados
const db = new MongoAdapter('mongodb://localhost:27017', 'minha-app');

@Controller('/users')
class UserController {
  constructor(db) {
    this.db = db;
  }

  @Get('/')
  async getAllUsers() {
    return await this.db.find('users');
  }

  @Get('/:id')
  async getUserById(@Param('id') id) {
    const users = await this.db.find('users', { id });
    if (!users.length) throw new Error('Usuário não encontrado');
    return users[0];
  }

  @Post('/')
  async createUser(@Body() userData) {
    return await this.db.insert('users', userData);
  }
}

async function bootstrap() {
  // Conecta ao banco de dados
  await db.connect();
  
  // Cria servidor
  const app = new AzuraServer();
  
  // Registra controller com banco de dados
  const userController = new UserController(db);
  app.load([userController]);
  
  app.listen(3000);
}

bootstrap();`,
      },
    },
  };

  const tabs = {
    en: {
      basic: "Basic API",
      controller: "Controllers",
      database: "Database",
    },
    pt: {
      basic: "API Básica",
      controller: "Controllers",
      database: "Banco de Dados",
    },
  };

  const t = tabs[language];
  const e = examples[language];

  return (
    <div className="max-w-4xl mx-auto">
      <Tabs defaultValue="basic">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">{t.basic}</TabsTrigger>
          <TabsTrigger value="controller">{t.controller}</TabsTrigger>
          <TabsTrigger value="database">{t.database}</TabsTrigger>
        </TabsList>
        <TabsContent value="basic">
          <Tabs defaultValue="typescript">
            <TabsList className="w-full">
              <TabsTrigger value="typescript" className="flex-1">
                TypeScript
              </TabsTrigger>
              <TabsTrigger value="javascript" className="flex-1">
                JavaScript
              </TabsTrigger>
            </TabsList>
            <TabsContent value="typescript">
              <Card className="p-4 overflow-hidden font-mono text-sm text-left bg-gray-900 rounded-lg text-gray-300">
                <pre>
                  <code>{e.basic.ts}</code>
                </pre>
              </Card>
            </TabsContent>
            <TabsContent value="javascript">
              <Card className="p-4 overflow-hidden font-mono text-sm text-left bg-gray-900 rounded-lg text-gray-300">
                <pre>
                  <code>{e.basic.js}</code>
                </pre>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>
        <TabsContent value="controller">
          <Tabs defaultValue="typescript">
            <TabsList className="w-full">
              <TabsTrigger value="typescript" className="flex-1">
                TypeScript
              </TabsTrigger>
              <TabsTrigger value="javascript" className="flex-1">
                JavaScript
              </TabsTrigger>
            </TabsList>
            <TabsContent value="typescript">
              <Card className="p-4 overflow-hidden font-mono text-sm text-left bg-gray-900 rounded-lg text-gray-300">
                <pre>
                  <code>{e.controller.ts}</code>
                </pre>
              </Card>
            </TabsContent>
            <TabsContent value="javascript">
              <Card className="p-4 overflow-hidden font-mono text-sm text-left bg-gray-900 rounded-lg text-gray-300">
                <pre>
                  <code>{e.controller.js}</code>
                </pre>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>
        <TabsContent value="database">
          <Tabs defaultValue="typescript">
            <TabsList className="w-full">
              <TabsTrigger value="typescript" className="flex-1">
                TypeScript
              </TabsTrigger>
              <TabsTrigger value="javascript" className="flex-1">
                JavaScript
              </TabsTrigger>
            </TabsList>
            <TabsContent value="typescript">
              <Card className="p-4 overflow-hidden font-mono text-sm text-left bg-gray-900 rounded-lg text-gray-300">
                <pre>
                  <code>{e.database.ts}</code>
                </pre>
              </Card>
            </TabsContent>
            <TabsContent value="javascript">
              <Card className="p-4 overflow-hidden font-mono text-sm text-left bg-gray-900 rounded-lg text-gray-300">
                <pre>
                  <code>{e.database.js}</code>
                </pre>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
}
