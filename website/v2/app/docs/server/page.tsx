import CodeBlock from "@/components/docs/code-block"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ServerPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Server & Routing</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Learn how to define routes and handle requests with Azura.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">The AzuraServer Class</h2>
        <p>
          The <code>AzuraServer</code> class is the core of Azura. It handles HTTP requests, manages plugins, and
          provides a simple API for defining routes.
        </p>

        <CodeBlock language="typescript">
          {`import { AzuraServer } from '@azura/framework';

// Create a new server instance
const app = new AzuraServer();

// Define routes
app.get('/hello', (req, res) => {
  res.json({ message: 'Hello World!' });
});

// Start the server
app.listen(3000);`}
        </CodeBlock>

        <p>
          The server automatically loads configuration from your <code>azura.config.ts</code> file if it exists.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Route Methods</h2>
        <p>Azura provides methods for all common HTTP verbs:</p>

        <CodeBlock language="typescript">
          {`// GET request
app.get('/users', (req, res) => {
  res.json([{ id: 1, name: 'John' }]);
});

// POST request
app.post('/users', (req, res) => {
  // req.body contains the request body
  const newUser = req.body;
  res.status(201).json({ id: 2, ...newUser });
});

// PUT request
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;
  res.json({ id, ...updatedUser });
});

// DELETE request
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  res.status(204).end();
});

// PATCH request
app.patch('/users/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  res.json({ id, ...updates });
});`}
        </CodeBlock>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Route Parameters</h2>
        <p>
          You can define dynamic route parameters using the <code>:paramName</code> syntax:
        </p>

        <CodeBlock language="typescript">
          {`app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  res.json({ id, name: 'User ' + id });
});

app.get('/posts/:year/:month/:day', (req, res) => {
  const { year, month, day } = req.params;
  res.json({ year, month, day });
});`}
        </CodeBlock>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Request Object</h2>
        <p>The request object provides access to all information about the incoming HTTP request:</p>

        <CodeBlock language="typescript">
          {`app.get('/example', (req, res) => {
  console.log(req.method);      // HTTP method (GET, POST, etc.)
  console.log(req.path);        // URL path
  console.log(req.query);       // Query parameters
  console.log(req.params);      // Route parameters
  console.log(req.body);        // Request body (for POST/PUT/PATCH)
  console.log(req.headers);     // HTTP headers
  console.log(req.cookies);     // Parsed cookies
  console.log(req.ip);          // Client IP address
  console.log(req.protocol);    // HTTP or HTTPS
  console.log(req.hostname);    // Host name
  
  // Get a specific header
  const userAgent = req.get('user-agent');
  
  res.json({ received: true });
});`}
        </CodeBlock>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Response Object</h2>
        <p>The response object provides methods for sending data back to the client:</p>

        <CodeBlock language="typescript">
          {`app.get('/example', (req, res) => {
  // Set status code
  res.status(200);
  
  // Set headers
  res.set('Content-Type', 'application/json');
  res.header('X-Custom-Header', 'value');
  
  // Get a response header
  const contentType = res.get('Content-Type');
  
  // Send JSON response
  res.json({ message: 'Hello World' });
  
  // Send plain text
  // res.send('Hello World');
  
  // Redirect
  // res.redirect('/new-location');
  // res.redirect(301, '/permanent-redirect');
  
  // Set cookies
  res.cookie('sessionId', '123456', {
    httpOnly: true,
    maxAge: 3600000,
    secure: true
  });
  
  // Clear cookies
  // res.clearCookie('sessionId');
});`}
        </CodeBlock>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Controllers</h2>
        <p>Controllers provide a class-based approach to organizing your routes:</p>

        <Tabs defaultValue="controller">
          <TabsList>
            <TabsTrigger value="controller">Controller</TabsTrigger>
            <TabsTrigger value="server">Server</TabsTrigger>
          </TabsList>
          <TabsContent value="controller">
            <CodeBlock language="typescript">
              {`import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@azura/framework';

@Controller('/users')
export class UserController {
  private users = [
    { id: '1', name: 'John Doe', email: 'john@example.com' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com' }
  ];

  @Get('/')
  getAllUsers(@Query('sort') sort?: string) {
    if (sort === 'name') {
      return [...this.users].sort((a, b) => a.name.localeCompare(b.name));
    }
    return this.users;
  }

  @Get('/:id')
  getUserById(@Param('id') id: string) {
    const user = this.users.find(u => u.id === id);
    if (!user) {
      throw new Error('User not found');
    }
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

  @Put('/:id')
  updateUser(@Param('id') id: string, @Body() userData: any) {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }
    
    this.users[index] = { ...this.users[index], ...userData };
    return this.users[index];
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }
    
    this.users.splice(index, 1);
    return { deleted: true };
  }
}`}
            </CodeBlock>
          </TabsContent>
          <TabsContent value="server">
            <CodeBlock language="typescript">
              {`import { AzuraServer } from '@azura/framework';
import { UserController } from './user.controller';

const app = new AzuraServer();

// Register the controller
app.load([UserController]);

app.listen(3000);`}
            </CodeBlock>
          </TabsContent>
        </Tabs>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Parameter Decorators</h2>
        <p>Azura provides decorators for extracting data from the request:</p>

        <CodeBlock language="typescript">
          {`@Controller('/api')
class ApiController {
  @Post('/example')
  exampleMethod(
    @Req() request: RequestServer,            // Entire request object
    @Res() response: ResponseServer,          // Entire response object
    @Body() body: any,                        // Request body
    @Body('name') name: string,               // Specific body property
    @Param('id') id: string,                  // Route parameter
    @Query() query: any,                      // All query parameters
    @Query('filter') filter: string,          // Specific query parameter
    @Headers('authorization') auth: string,   // Specific header
    @Ip() clientIp: string,                   // Client IP
    @UserAgent() userAgent: string            // User agent string
  ) {
    // Method implementation
    return { received: true };
  }
}`}
        </CodeBlock>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Error Handling</h2>
        <p>Azura provides a simple way to handle errors:</p>

        <CodeBlock language="typescript">
          {`import { HttpError } from '@azura/framework';

app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  
  // Throw an HTTP error
  if (id === '999') {
    throw new HttpError(404, { message: 'User not found' });
  }
  
  // Regular Error is converted to 500 Internal Server Error
  if (id === '0') {
    throw new Error('Invalid user ID');
  }
  
  res.json({ id, name: 'User ' + id });
});

// Global error handler
app.use((req, res, next) => {
  try {
    next();
  } catch (error) {
    console.error('Error:', error);
    
    if (error instanceof HttpError) {
      res.status(error.status).json(error.payload);
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});`}
        </CodeBlock>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Middleware</h2>
        <p>Middleware functions are executed before your route handlers:</p>

        <CodeBlock language="typescript">
          {`// Global middleware (applies to all routes)
app.use((req, res, next) => {
  console.log(\`\${req.method} \${req.path}\`);
  next(); // Call next to continue to the next middleware or route handler
});

// Route-specific middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  // Validate token...
  next();
};

// Apply middleware to a specific route
app.get('/protected', authenticate, (req, res) => {
  res.json({ message: 'This is protected data' });
});

// Apply middleware to a controller method
@Controller('/admin')
class AdminController {
  @Get('/')
  @Middleware(authenticate) // Apply middleware to this method
  getDashboard() {
    return { /* dashboard data */ };
  }
}`}
        </CodeBlock>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Lifecycle Hooks</h2>
        <p>Lifecycle hooks allow you to execute code at various stages of the request/response cycle:</p>

        <CodeBlock language="typescript">
          {`import { AzuraServer, HookType } from '@azura/framework';

const app = new AzuraServer();

// Register a hook for the onRequest lifecycle event
app.onHook('onRequest', (ctx) => {
  console.log('Request received:', ctx.request.url);
});

// Available hook types:
// - onRequest: Triggered when a request is received
// - preParsing: Before body parsing
// - preValidation: Before input validation
// - preHandler: Before route handler execution
// - onResponse: Before sending the response
// - onError: When an error occurs

// Using the Hook decorator in a controller
@Controller('/api')
class ApiController {
  @Get('/users')
  @Hook('onRequest')
  logRequest(ctx) {
    console.log('User request received');
  }
}`}
        </CodeBlock>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">WebSocket Support</h2>
        <p>Azura provides built-in WebSocket support:</p>

        <CodeBlock language="typescript">
          {`import { AzuraServer, createWebSocket } from '@azura/framework';

const app = new AzuraServer();
const server = app.server;

// Create a WebSocket server
const wss = createWebSocket(server);

// Handle WebSocket connections
wss.on('connection', (socket, req) => {
  console.log('Client connected');
  
  socket.on('message', (data) => {
    console.log('Received message:', data.toString());
    socket.send('Echo: ' + data);
  });
  
  socket.on('close', () => {
    console.log('Client disconnected');
  });
});

app.listen(3000);`}
        </CodeBlock>

        <h3 className="mt-4 text-xl font-semibold">Socket Decorator</h3>
        <CodeBlock language="typescript">
          {`import { Controller, Socket } from '@azura/framework';

@Controller()
class ChatController {
  @Socket('/chat')
  handleChat(socket, req) {
    socket.on('message', (data) => {
      // Broadcast message to all clients
      socket.broadcast.emit('message', data);
    });
  }
}`}
        </CodeBlock>
      </div>
    </div>
  )
}
