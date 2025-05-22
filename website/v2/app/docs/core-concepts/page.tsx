import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import CodeBlock from "@/components/docs/code-block";

export default function CoreConceptsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Core Concepts</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Understand the key concepts and architecture of Azura.JS Framework.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Server Architecture</h2>
        <p>
          Azura is built around a modular architecture that separates concerns and makes your code
          more maintainable:
        </p>

        <ul className="ml-6 space-y-2 list-disc">
          <li>
            <strong>AzuraServer</strong> - The core HTTP server that handles requests and responses
          </li>
          <li>
            <strong>Router</strong> - Responsible for matching URLs to route handlers
          </li>
          <li>
            <strong>Controllers</strong> - Class-based handlers for organizing your API endpoints
          </li>
          <li>
            <strong>Plugins</strong> - Modular extensions that add functionality to the server
          </li>
          <li>
            <strong>Lifecycle Hooks</strong> - Allow you to execute logic at various stages of the
            request/response cycle
          </li>
        </ul>

        <div className="p-4 mt-4 rounded-lg bg-gray-50 dark:bg-gray-900">
          <h3 className="text-lg font-medium">Request Flow</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            1. Client sends HTTP request
            <br />
            2. AzuraServer receives the request
            <br />
            3. Middleware and global plugins process the request
            <br />
            4. Router matches the URL to a handler
            <br />
            5. Controller method executes
            <br />
            6. Response is sent back to the client
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Decorators</h2>
        <p>
          Azura makes extensive use of TypeScript decorators to provide a clean and intuitive API:
        </p>

        <h3 className="mt-4 text-xl font-semibold">Controller Decorators</h3>
        <CodeBlock language="typescript">
          {`@Controller('/users')
class UserController {
  // Controller methods
}`}
        </CodeBlock>

        <h3 className="mt-4 text-xl font-semibold">Route Decorators</h3>
        <CodeBlock language="typescript">
          {`@Controller('/users')
class UserController {
  @Get('/')
  getAllUsers() {
    // Handle GET /users
  }

  @Post('/')
  createUser() {
    // Handle POST /users
  }

  @Get('/:id')
  getUserById(@Param('id') id: string) {
    // Handle GET /users/:id
  }
}`}
        </CodeBlock>

        <h3 className="mt-4 text-xl font-semibold">Parameter Decorators</h3>
        <CodeBlock language="typescript">
          {`@Controller('/users')
class UserController {
  @Post('/')
  createUser(
    @Body() userData: any,
    @Headers('user-agent') userAgent: string,
    @Query('role') role?: string
  ) {
    // Access to parsed body, headers, and query parameters
  }
}`}
        </CodeBlock>

        <Alert>
          <Info className="w-4 h-4" />
          <AlertTitle>Decorator Support</AlertTitle>
          <AlertDescription>
            To use decorators, make sure to enable <code>experimentalDecorators</code> and{" "}
            <code>emitDecoratorMetadata</code> in your <code>tsconfig.json</code>.
          </AlertDescription>
        </Alert>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Plugin System</h2>
        <p>
          Azura's plugin system allows you to extend the framework's functionality in a modular way:
        </p>

        <CodeBlock language="typescript">
          {`import { AzuraServer, cors, rateLimit } from '@azura/framework';

const app = new AzuraServer();

// Register built-in plugins
app.registerPlugin(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

app.registerPlugin(rateLimit, {
  limit: 100,
  timeframe: 60000, // 1 minute
});

// Create and register a custom plugin
const myPlugin = {
  name: 'my-plugin',
  register: (app, options) => {
    app.use((req, res, next) => {
      console.log('Request to', req.url);
      next();
    });
    
    return {
      // Plugin API that other plugins can use
      logMessage: (msg: string) => console.log('[MyPlugin]', msg)
    };
  }
};

app.registerPlugin(myPlugin);`}
        </CodeBlock>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Configuration</h2>
        <p>Azura uses a configuration system that supports multiple formats:</p>

        <ul className="ml-6 space-y-2 list-disc">
          <li>
            <code>azura.config.ts</code> - TypeScript configuration
          </li>
          <li>
            <code>azura.config.js</code> - JavaScript configuration
          </li>
          <li>
            <code>azura.config.json</code> - JSON configuration
          </li>
          <li>
            <code>azura.config.yaml</code> - YAML configuration
          </li>
        </ul>

        <CodeBlock language="typescript">
          {`// azura.config.ts
import { AzuraConfig } from '@azura/framework';

const config: AzuraConfig = {
  server: {
    port: 8080,
    cluster: true, // Enable cluster mode
    ipHost: true,  // Show IP addresses on startup
  },
  plugins: {
    cors: {
      enabled: true,
      origin: '*',
    },
    compression: {
      enabled: true,
      level: 6,
    },
    rateLimit: {
      enabled: true,
      limit: 100,
      timeframe: 60000, // 1 minute
    },
  },
};

export default config;`}
        </CodeBlock>

        <p>Azura automatically loads this configuration when you create a new server instance.</p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Database Adapters</h2>
        <p>
          Azura provides a unified interface for working with different databases through adapters:
        </p>

        <CodeBlock language="typescript">
          {`import { JSONAdapter, MongoAdapter, PostgresAdapter } from '@azura/framework';

// Simple JSON file database
const jsonDB = new JSONAdapter('database.json');
await jsonDB.connect();

// MongoDB adapter
const mongoDB = new MongoAdapter('mongodb://localhost:27017', 'my-app');
await mongoDB.connect();

// PostgreSQL adapter
const pgDB = new PostgresAdapter({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'secret',
  database: 'my-app'
});
await pgDB.connect();

// All adapters share the same API
const users = await mongoDB.find('users', { active: true });
await pgDB.insert('users', { name: 'John', email: 'john@example.com' });
await jsonDB.update('users', { id: '123' }, { lastLogin: new Date() });`}
        </CodeBlock>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Authentication</h2>
        <p>Azura provides built-in support for JWT-based authentication and API keys:</p>

        <CodeBlock language="typescript">
          {`import { JwtManager, KeyManager, Auth, Public, Roles } from '@azura/framework';

// JWT authentication
const jwt = new JwtManager();
const token = jwt.sign({ userId: '123', role: 'admin' });
const payload = jwt.verify(token);

// API key management
const keyManager = new KeyManager(['key1', 'key2', 'key3']);
keyManager.check('key1'); // Passes
keyManager.check('invalid'); // Throws HttpError

// Using auth decorators
@Controller('/admin')
class AdminController {
  @Get('/')
  @Auth('admin') // Requires authentication with 'admin' role
  getDashboard() {
    return { /* dashboard data */ };
  }

  @Get('/public-stats')
  @Public() // No authentication required
  getPublicStats() {
    return { /* public stats */ };
  }
}`}
        </CodeBlock>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Middleware</h2>
        <p>
          Middleware functions can be used to process requests before they reach your route
          handlers:
        </p>

        <CodeBlock language="typescript">
          {`import { AzuraServer } from '@azura/framework';

const app = new AzuraServer();

// Global middleware
app.use((req, res, next) => {
  console.log(\`\${req.method} \${req.path}\`);
  next();
});

// Error handling middleware
app.use((req, res, next) => {
  try {
    next();
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route-specific middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

app.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'This is protected' });
});`}
        </CodeBlock>
      </div>

      <div className="mt-8">
        <Alert>
          <Info className="w-4 h-4" />
          <AlertTitle>Next Steps</AlertTitle>
          <AlertDescription>
            Now that you understand the core concepts, explore the detailed API reference for each
            module or continue with the guides for specific features.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
