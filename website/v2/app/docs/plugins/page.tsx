import CodeBlock from "@/components/docs/code-block"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react"

export default function PluginsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Plugins System</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Extend Azura with built-in and custom plugins.</p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Plugin Architecture</h2>
        <p>
          Azura's plugin system allows you to extend the framework's functionality in a modular way. Plugins can add
          middleware, routes, hooks, and more to your application.
        </p>

        <CodeBlock language="typescript">
          {`import { Plugin } from '@azura/framework';

// Plugin interface
interface Plugin<API = unknown, Options = unknown> {
  name: string;
  register(app: AzuraServer, opts: Options): API;
  dependencies?: string[];
}`}
        </CodeBlock>

        <p>
          Each plugin has a unique name, a register function that receives the server instance and options, and an
          optional list of dependencies.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Built-in Plugins</h2>
        <p>Azura comes with several built-in plugins that you can use out of the box:</p>

        <h3 className="mt-4 text-xl font-semibold">CORS Plugin</h3>
        <CodeBlock language="typescript">
          {`import { AzuraServer, cors } from '@azura/framework';

const app = new AzuraServer();

// Register the CORS plugin
app.registerPlugin(cors, {
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
});`}
        </CodeBlock>

        <h3 className="mt-4 text-xl font-semibold">Compression Plugin</h3>
        <CodeBlock language="typescript">
          {`import { AzuraServer, compress } from '@azura/framework';

const app = new AzuraServer();

// Register the compression plugin
app.registerPlugin(compress, {
  threshold: 1024 // Only compress responses larger than 1KB
});`}
        </CodeBlock>

        <h3 className="mt-4 text-xl font-semibold">Rate Limiting Plugin</h3>
        <CodeBlock language="typescript">
          {`import { AzuraServer, rateLimit } from '@azura/framework';

const app = new AzuraServer();

// Register the rate limiting plugin
app.registerPlugin(rateLimit, {
  limit: 100, // 100 requests
  timeframe: 60000 // per minute (60000ms)
});`}
        </CodeBlock>

        <h3 className="mt-4 text-xl font-semibold">Static Files Plugin</h3>
        <CodeBlock language="typescript">
          {`import { AzuraServer, serveStatic } from '@azura/framework';

const app = new AzuraServer();

// Register the static files plugin
app.registerPlugin(serveStatic, {
  root: './public' // Serve files from the public directory
});`}
        </CodeBlock>

        <h3 className="mt-4 text-xl font-semibold">Metrics Plugin</h3>
        <CodeBlock language="typescript">
          {`import { AzuraServer, metrics, metricsEndpoint } from '@azura/framework';

const app = new AzuraServer();

// Register the metrics plugin
app.registerPlugin(metrics);

// Add a metrics endpoint
app.get('/metrics', metricsEndpoint());`}
        </CodeBlock>

        <h3 className="mt-4 text-xl font-semibold">Health Check Plugin</h3>
        <CodeBlock language="typescript">
          {`import { AzuraServer, health } from '@azura/framework';

const app = new AzuraServer();

// Register the health check plugin
app.get('/health', health());`}
        </CodeBlock>

        <h3 className="mt-4 text-xl font-semibold">Cache Plugin</h3>
        <CodeBlock language="typescript">
          {`import { AzuraServer, LRUCache } from '@azura/framework';

const app = new AzuraServer();

// Create an LRU cache
const cache = new LRUCache(1000); // Cache up to 1000 items

// Use the cache in a route
app.get('/cached-data', (req, res) => {
  const cacheKey = req.path;
  const cachedData = cache.get(cacheKey);
  
  if (cachedData) {
    return res.json(cachedData);
  }
  
  // Get fresh data
  const data = { /* ... */ };
  
  // Cache the data
  cache.set(cacheKey, data);
  
  res.json(data);
});`}
        </CodeBlock>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Creating Custom Plugins</h2>
        <p>You can create your own plugins to extend Azura's functionality:</p>

        <CodeBlock language="typescript">
          {`import { AzuraServer } from '@azura/framework';

// Define a plugin
const loggerPlugin = {
  name: 'logger',
  register: (app, options = { level: 'info' }) => {
    // Add middleware to log requests
    app.use((req, res, next) => {
      const start = Date.now();
      
      // Add a listener for when the response finishes
      res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(
          \`[\${options.level.toUpperCase()}] \${req.method} \${req.path} - \${res.statusCode} (\${duration}ms)\`
        );
      });
      
      next();
    });
    
    // Return an API that other plugins can use
    return {
      log: (message: string, level = options.level) => {
        console.log(\`[\${level.toUpperCase()}] \${message}\`);
      }
    };
  }
};

// Use the plugin
const app = new AzuraServer();
const logger = app.registerPlugin(loggerPlugin, { level: 'debug' });

// Use the plugin's API
logger.log('Server started', 'info');`}
        </CodeBlock>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Plugin Dependencies</h2>
        <p>
          Plugins can depend on other plugins. The plugin loader will automatically load dependencies in the correct
          order:
        </p>

        <CodeBlock language="typescript">
          {`import { AzuraServer } from '@azura/framework';

// Define plugins
const databasePlugin = {
  name: 'database',
  register: (app, options) => {
    // Connect to database...
    return {
      query: (sql: string) => {
        // Execute query...
        return [];
      }
    };
  }
};

const userPlugin = {
  name: 'users',
  dependencies: ['database'], // This plugin depends on the database plugin
  register: (app, options) => {
    // Get the database plugin
    const db = app.plugins.get('database');
    
    // Add routes that use the database
    app.get('/users', (req, res) => {
      const users = db.query('SELECT * FROM users');
      res.json(users);
    });
    
    return {
      getUser: (id: string) => {
        return db.query('SELECT * FROM users WHERE id = ?', [id])[0];
      }
    };
  }
};

// Register plugins
const app = new AzuraServer();
app.registerPlugin(databasePlugin, { /* database options */ });
app.registerPlugin(userPlugin);`}
        </CodeBlock>

        <p>
          In this example, the <code>userPlugin</code> depends on the <code>databasePlugin</code>. The plugin loader
          will ensure that <code>databasePlugin</code> is registered before <code>userPlugin</code>.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Plugin Loader</h2>
        <p>
          Azura uses a <code>PluginLoader</code> class to manage plugins and their dependencies:
        </p>

        <CodeBlock language="typescript">
          {`import { AzuraServer, PluginLoader } from '@azura/framework';

// Create a server
const app = new AzuraServer();

// The server has a built-in plugin loader
const plugins = app.plugins;

// Register a plugin
const loggerApi = plugins.register('logger', loggerPlugin, { level: 'debug' });

// Get a plugin's API
const logger = plugins.get('logger');
logger.log('Hello, world!');`}
        </CodeBlock>

        <p>
          The plugin loader ensures that plugins are only registered once, even if they are requested multiple times by
          different dependencies.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Lifecycle Hooks Plugin</h2>
        <p>The lifecycle hooks plugin allows you to execute code at various stages of the request/response cycle:</p>

        <CodeBlock language="typescript">
          {`import { AzuraServer, Lifecycle, HookType } from '@azura/framework';

const app = new AzuraServer();

// Get the lifecycle plugin
const lifecycle = app.plugins.get('lifecycle');

// Add hooks
lifecycle.add('onRequest', (ctx) => {
  console.log('Request received:', ctx.request.url);
});

lifecycle.add('preHandler', (ctx) => {
  console.log('Before handler execution');
});

lifecycle.add('onResponse', (ctx) => {
  console.log('Response sent:', ctx.response.statusCode);
});

// Available hook types:
// - onRequest: Triggered when a request is received
// - preParsing: Before body parsing
// - preValidation: Before input validation
// - preHandler: Before route handler execution
// - onResponse: Before sending the response
// - onError: When an error occurs`}
        </CodeBlock>
      </div>

      <div className="mt-8">
        <Alert>
          <Info className="w-4 h-4" />
          <AlertTitle>Plugin Best Practices</AlertTitle>
          <AlertDescription>
            <ul className="ml-4 list-disc">
              <li>Give your plugins descriptive names</li>
              <li>Document your plugin's API and options</li>
              <li>Use dependencies to ensure plugins are loaded in the correct order</li>
              <li>Return an API object from your plugin's register function</li>
              <li>Handle errors gracefully within your plugins</li>
              <li>Make your plugins configurable through options</li>
            </ul>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}
