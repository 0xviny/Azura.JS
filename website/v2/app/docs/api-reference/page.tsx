"use client";

import { useLanguage } from "@/components/language-provider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CodeBlock from "@/components/docs/code-block";
import { ApiPlayground } from "@/components/docs/api-playground";
import { AnimatedSection } from "@/components/ui/animated-section";

export default function ApiReferencePage() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "API Reference",
      subtitle: "Complete reference documentation for the Azura.JS Framework",
      intro:
        "This section provides detailed documentation for all classes, methods, and interfaces in the Azura.JS Framework. Use the tabs below to navigate between different sections of the API.",
      server: "Server",
      router: "Router",
      controllers: "Controllers",
      middleware: "Middleware",
      database: "Database",
      authentication: "Authentication",
      plugins: "Plugins",
      websockets: "WebSockets",
      utilities: "Utilities",
      interfaces: "Interfaces",
      playground: "API Playground",
      tryIt: "Try it yourself",
    },
    pt: {
      title: "Referência da API",
      subtitle: "Documentação de referência completa para o Azura.JS Framework",
      intro:
        "Esta seção fornece documentação detalhada para todas as classes, métodos e interfaces no Azura.JS Framework. Use as abas abaixo para navegar entre diferentes seções da API.",
      server: "Servidor",
      router: "Roteador",
      controllers: "Controladores",
      middleware: "Middleware",
      database: "Banco de Dados",
      authentication: "Autenticação",
      plugins: "Plugins",
      websockets: "WebSockets",
      utilities: "Utilitários",
      interfaces: "Interfaces",
      playground: "Playground da API",
      tryIt: "Experimente você mesmo",
    },
  };

  const c = content[language];

  const serverCode = `import { AzuraServer } from '@atosjs/azura';

// Create a new server instance
const app = new AzuraServer({
  port: 3000,
  host: 'localhost'
});

// Start the server
app.listen();`;

  const routerCode = `import { Router } from '@atosjs/azura';

// Create a new router
const router = new Router();

// Define routes
router.get('/users', (req, res) => {
  res.json({ users: [] });
});

router.post('/users', (req, res) => {
  // Create a new user
  res.status(201).json({ id: 1, ...req.body });
});

// Export the router
export default router;`;

  const controllerCode = `import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@atosjs/azura';

@Controller('/users')
export class UserController {
  @Get('/')
  async getAllUsers(@Query('page') page: string = '1', @Query('limit') limit: string = '10') {
    // Get all users with pagination
    return { users: [], page, limit };
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string) {
    // Get user by ID
    return { id, name: 'John Doe' };
  }

  @Post('/')
  async createUser(@Body() userData: any) {
    // Create a new user
    return { id: 1, ...userData };
  }

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() userData: any) {
    // Update user
    return { id, ...userData };
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    // Delete user
    return { success: true };
  }
}`;

  const middlewareCode = `import { Middleware, Request, Response, NextFunction } from '@atosjs/azura';

@Middleware()
export class LoggerMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(\`[\${new Date().toISOString()}] \${req.method} \${req.url}\`);
    next();
  }
}

// Usage in server
import { AzuraServer } from '@atosjs/azura';
import { LoggerMiddleware } from './middleware/logger.middleware';

const app = new AzuraServer();
app.use(LoggerMiddleware);`;

  const databaseCode = `import { MongoAdapter } from '@atosjs/azura';

// Create a MongoDB adapter
const db = new MongoAdapter('mongodb://localhost:27017', 'my_database');

// Connect to the database
await db.connect();

// Use the database
const users = db.collection('users');
const result = await users.find({ age: { $gt: 18 } }).toArray();

// Close the connection
await db.close();`;

  const authenticationCode = `import { Auth, Roles } from '@atosjs/azura';
import { Controller, Get, Post, Body } from '@atosjs/azura';
import { JwtService } from '../services/jwt.service';

@Controller('/auth')
export class AuthController {
  constructor(private jwtService: JwtService) {}

  @Post('/login')
  async login(@Body() credentials: { email: string; password: string }) {
    // Authenticate user
    const user = await this.authenticateUser(credentials);
    
    // Generate JWT token
    const token = this.jwtService.generateToken(user);
    
    return { user, token };
  }

  @Get('/profile')
  @Auth() // Requires authentication
  async getProfile(req) {
    return req.user;
  }

  @Get('/admin')
  @Auth()
  @Roles('admin') // Requires admin role
  async getAdminDashboard() {
    return { message: 'Admin dashboard' };
  }

  private async authenticateUser(credentials) {
    // Implementation of user authentication
    return { id: 1, email: credentials.email, role: 'user' };
  }
}`;

  const pluginsCode = `import { AzuraServer, cors, rateLimit, compress } from '@atosjs/azura';

const app = new AzuraServer();

// Register plugins
app.registerPlugin(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
});

app.registerPlugin(rateLimit, {
  limit: 100,
  timeframe: 60000 // 1 minute
});

app.registerPlugin(compress, {
  threshold: 1024
});`;

  const websocketsCode = `import { AzuraServer, createWebSocket } from '@atosjs/azura';

const app = new AzuraServer();

// Create WebSocket server
const wss = createWebSocket(app.server);

// Handle WebSocket connections
wss.on('connection', (socket, req) => {
  console.log('Client connected');
  
  // Handle messages
  socket.on('message', (data) => {
    const message = JSON.parse(data.toString());
    console.log('Received message:', message);
    
    // Echo the message back
    socket.send(JSON.stringify({
      type: 'echo',
      data: message
    }));
  });
  
  // Handle disconnection
  socket.on('close', () => {
    console.log('Client disconnected');
  });
});

// Start the server
app.listen(3000);`;

  const utilitiesCode = `import { HttpError, validateSchema, parseQuery } from '@atosjs/azura';

// Create a custom HTTP error
throw new HttpError(404, { message: 'Resource not found' });

// Validate data against a schema
const schema = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 3 },
    age: { type: 'number', minimum: 18 }
  },
  required: ['name', 'age']
};

const data = { name: 'John', age: 25 };
const { valid, errors } = validateSchema(data, schema);

// Parse query parameters
const query = '?page=1&limit=10&sort=name&order=asc';
const params = parseQuery(query);
// Result: { page: '1', limit: '10', sort: 'name', order: 'asc' }`;

  const interfacesCode = `// Request interface
export interface Request {
  method: string;
  url: string;
  headers: Record<string, string>;
  query: Record<string, string>;
  params: Record<string, string>;
  body: any;
  user?: any;
}

// Response interface
export interface Response {
  status(code: number): Response;
  header(name: string, value: string): Response;
  json(data: any): void;
  send(data: string): void;
  end(): void;
}

// Middleware interface
export interface Middleware {
  use(req: Request, res: Response, next: NextFunction): void;
}

// Controller method decorator options
export interface ControllerOptions {
  prefix?: string;
}

// Route decorator options
export interface RouteOptions {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD';
}`;

  return (
    <div className="space-y-8">
      <AnimatedSection animation="fadeIn">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">{c.title}</h1>
          <p className="mt-2 text-lg text-gray-400">{c.subtitle}</p>
        </div>
      </AnimatedSection>

      <AnimatedSection animation="slideInFromLeft" delay={0.1}>
        <p className="text-lg">{c.intro}</p>
      </AnimatedSection>

      <AnimatedSection animation="fadeIn" delay={0.2}>
        <Tabs defaultValue="server" className="mt-8">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10">
            <TabsTrigger value="server">{c.server}</TabsTrigger>
            <TabsTrigger value="router">{c.router}</TabsTrigger>
            <TabsTrigger value="controllers">{c.controllers}</TabsTrigger>
            <TabsTrigger value="middleware">{c.middleware}</TabsTrigger>
            <TabsTrigger value="database">{c.database}</TabsTrigger>
            <TabsTrigger value="authentication">{c.authentication}</TabsTrigger>
            <TabsTrigger value="plugins">{c.plugins}</TabsTrigger>
            <TabsTrigger value="websockets">{c.websockets}</TabsTrigger>
            <TabsTrigger value="utilities">{c.utilities}</TabsTrigger>
            <TabsTrigger value="interfaces">{c.interfaces}</TabsTrigger>
          </TabsList>
          <TabsContent value="server" className="mt-6">
            <h2 className="text-2xl font-bold mb-4">AzuraServer</h2>
            <p className="mb-4 text-gray-400">
              The main server class that handles HTTP requests and manages the application
              lifecycle.
            </p>
            <CodeBlock language="typescript">{serverCode}</CodeBlock>
          </TabsContent>
          <TabsContent value="router" className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Router</h2>
            <p className="mb-4 text-gray-400">
              The router class that handles routing HTTP requests to the appropriate handlers.
            </p>
            <CodeBlock language="typescript">{routerCode}</CodeBlock>
          </TabsContent>
          <TabsContent value="controllers" className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Controllers</h2>
            <p className="mb-4 text-gray-400">
              Controllers handle HTTP requests and define the API endpoints of your application.
            </p>
            <CodeBlock language="typescript">{controllerCode}</CodeBlock>
          </TabsContent>
          <TabsContent value="middleware" className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Middleware</h2>
            <p className="mb-4 text-gray-400">
              Middleware functions process requests before they reach the route handlers.
            </p>
            <CodeBlock language="typescript">{middlewareCode}</CodeBlock>
          </TabsContent>
          <TabsContent value="database" className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Database</h2>
            <p className="mb-4 text-gray-400">
              Database adapters provide a unified interface for connecting to different database
              systems.
            </p>
            <CodeBlock language="typescript">{databaseCode}</CodeBlock>
          </TabsContent>
          <TabsContent value="authentication" className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Authentication</h2>
            <p className="mb-4 text-gray-400">
              Authentication and authorization features to secure your API endpoints.
            </p>
            <CodeBlock language="typescript">{authenticationCode}</CodeBlock>
          </TabsContent>
          <TabsContent value="plugins" className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Plugins</h2>
            <p className="mb-4 text-gray-400">
              Plugins extend the functionality of your application with reusable modules.
            </p>
            <CodeBlock language="typescript">{pluginsCode}</CodeBlock>
          </TabsContent>
          <TabsContent value="websockets" className="mt-6">
            <h2 className="text-2xl font-bold mb-4">WebSockets</h2>
            <p className="mb-4 text-gray-400">
              WebSocket support for real-time communication between clients and the server.
            </p>
            <CodeBlock language="typescript">{websocketsCode}</CodeBlock>
          </TabsContent>
          <TabsContent value="utilities" className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Utilities</h2>
            <p className="mb-4 text-gray-400">
              Utility functions and classes to help with common tasks in your application.
            </p>
            <CodeBlock language="typescript">{utilitiesCode}</CodeBlock>
          </TabsContent>
          <TabsContent value="interfaces" className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Interfaces</h2>
            <p className="mb-4 text-gray-400">
              TypeScript interfaces that define the structure of objects used in the framework.
            </p>
            <CodeBlock language="typescript">{interfacesCode}</CodeBlock>
          </TabsContent>
        </Tabs>
      </AnimatedSection>

      <AnimatedSection animation="fadeIn" delay={0.3}>
        <h2 className="text-2xl font-bold mb-4">{c.playground}</h2>
        <p className="mb-4 text-gray-400">{c.tryIt}</p>

        <ApiPlayground
          endpoint="/api/users"
          method="GET"
          description="Get a list of users with pagination and filtering options"
          headers={{
            "Content-Type": "application/json",
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
          }}
        />
      </AnimatedSection>
    </div>
  );
}
