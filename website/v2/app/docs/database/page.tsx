import CodeBlock from "@/components/docs/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

export default function DatabasePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Database Integration</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Connect your Azura API to different databases using our adapters.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Database Adapters</h2>
        <p>
          Azura provides a unified interface for working with different databases through adapters.
          Each adapter implements the same methods, making it easy to switch between database
          systems.
        </p>

        <CodeBlock language="typescript">
          {`export interface DBAdapter {
  connect(): Promise<void>;
  find<T = any>(collection: string, query?: any): Promise<T[]>;
  insert<T = any>(collection: string, doc: T): Promise<T>;
  update(collection: string, query: any, update: any): Promise<number>;
  delete(collection: string, query: any): Promise<number>;
}`}
        </CodeBlock>

        <p>
          This consistent interface allows you to build database-agnostic applications that can work
          with different database backends without changing your core code.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Available Adapters</h2>

        <h3 className="mt-4 text-xl font-semibold">JSONAdapter</h3>
        <p>A simple file-based JSON database adapter for development and small applications:</p>

        <CodeBlock language="typescript">
          {`import { JSONAdapter } from '@azura/framework';

// Create a JSON database that stores data in db.json
const db = new JSONAdapter('db.json');

// Connect to the database (creates file if it doesn't exist)
await db.connect();

// Use the database
const users = await db.find('users');
const newUser = await db.insert('users', { name: 'John', email: 'john@example.com' });
const updated = await db.update('users', { name: 'John' }, { verified: true });
const deleted = await db.delete('users', { name: 'John' });`}
        </CodeBlock>

        <h3 className="mt-4 text-xl font-semibold">MongoAdapter</h3>
        <p>Connect to a MongoDB database:</p>

        <CodeBlock language="typescript">
          {`import { MongoAdapter } from '@azura/framework';

// Create a MongoDB adapter
const db = new MongoAdapter('mongodb://localhost:27017', 'my-app');

// Connect to the database
await db.connect();

// Use the database
const users = await db.find('users', { active: true });
const newUser = await db.insert('users', { name: 'John', email: 'john@example.com' });
const updated = await db.update('users', { name: 'John' }, { verified: true });
const deleted = await db.delete('users', { name: 'John' });`}
        </CodeBlock>

        <Alert>
          <Info className="w-4 h-4" />
          <AlertTitle>MongoDB Driver</AlertTitle>
          <AlertDescription>
            Make sure to install the MongoDB driver: <code>npm install mongodb</code>
          </AlertDescription>
        </Alert>

        <h3 className="mt-4 text-xl font-semibold">PostgresAdapter</h3>
        <p>Connect to a PostgreSQL database:</p>

        <CodeBlock language="typescript">
          {`import { PostgresAdapter } from '@azura/framework';

// Create a PostgreSQL adapter
const db = new PostgresAdapter({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'secret',
  database: 'my-app'
});

// Connect to the database
await db.connect();

// Use the database (tables must already exist)
const users = await db.find('users');
const newUser = await db.insert('users', { name: 'John', email: 'john@example.com' });
const updated = await db.update('users', { id: 1 }, { verified: true });
const deleted = await db.delete('users', { id: 1 });`}
        </CodeBlock>

        <Alert>
          <Info className="w-4 h-4" />
          <AlertTitle>PostgreSQL Driver</AlertTitle>
          <AlertDescription>
            Make sure to install the PostgreSQL driver: <code>npm install pg</code>
          </AlertDescription>
        </Alert>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Using Adapters with Controllers</h2>
        <p>Here's how to use database adapters in your controllers:</p>

        <Tabs defaultValue="controller">
          <TabsList>
            <TabsTrigger value="controller">User Controller</TabsTrigger>
            <TabsTrigger value="app">Application</TabsTrigger>
          </TabsList>
          <TabsContent value="controller">
            <CodeBlock language="typescript">
              {`import { Controller, Get, Post, Put, Delete, Param, Body } from '@azura/framework';
import { DBAdapter } from '@azura/framework';

@Controller('/users')
export class UserController {
  constructor(private db: DBAdapter) {}

  @Get('/')
  async getAllUsers() {
    return await this.db.find('users');
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string) {
    const users = await this.db.find('users', { id });
    if (!users.length) {
      throw new Error('User not found');
    }
    return users[0];
  }

  @Post('/')
  async createUser(@Body() userData: any) {
    return await this.db.insert('users', userData);
  }

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() userData: any) {
    const updated = await this.db.update('users', { id }, userData);
    if (!updated) {
      throw new Error('User not found');
    }
    return { id, ...userData };
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const deleted = await this.db.delete('users', { id });
    if (!deleted) {
      throw new Error('User not found');
    }
    return { deleted: true };
  }
}`}
            </CodeBlock>
          </TabsContent>
          <TabsContent value="app">
            <CodeBlock language="typescript">
              {`import { AzuraServer, MongoAdapter } from '@azura/framework';
import { UserController } from './user.controller';

async function bootstrap() {
  const app = new AzuraServer();
  
  // Create and connect to the database
  const db = new MongoAdapter('mongodb://localhost:27017', 'my-app');
  await db.connect();
  
  // Create controller instance with database
  const userController = new UserController(db);
  
  // Register the controller
  app.load([userController]);
  
  app.listen(3000);
}

bootstrap().catch(console.error);`}
            </CodeBlock>
          </TabsContent>
        </Tabs>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Creating a Custom Adapter</h2>
        <p>
          You can create a custom adapter for any database system by implementing the{" "}
          <code>DBAdapter</code> interface:
        </p>

        <CodeBlock language="typescript">
          {`import { DBAdapter } from '@azura/framework';
import { Client } from 'your-database-client';

export class CustomAdapter implements DBAdapter {
  private client: Client;

  constructor(connectionString: string) {
    this.client = new Client(connectionString);
  }

  async connect(): Promise<void> {
    await this.client.connect();
  }

  async find<T = any>(collection: string, query?: any): Promise<T[]> {
    return await this.client.find(collection, query);
  }

  async insert<T = any>(collection: string, doc: T): Promise<T> {
    await this.client.insert(collection, doc);
    return doc;
  }

  async update(collection: string, query: any, update: any): Promise<number> {
    return await this.client.update(collection, query, update);
  }

  async delete(collection: string, query: any): Promise<number> {
    return await this.client.delete(collection, query);
  }
}`}
        </CodeBlock>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Advanced Usage</h2>

        <h3 className="mt-4 text-xl font-semibold">Transactions</h3>
        <p>Some database adapters support transactions for atomic operations:</p>

        <CodeBlock language="typescript">
          {`// Example with PostgreSQL adapter (requires custom implementation)
import { PostgresAdapter } from '@azura/framework';

const db = new PostgresAdapter({
  /* connection options */
});
await db.connect();

// Start a transaction
const client = await db.pool.connect();

try {
  await client.query('BEGIN');
  
  // Perform multiple operations
  await client.query('INSERT INTO users(name, email) VALUES($1, $2)', ['John', 'john@example.com']);
  await client.query('UPDATE accounts SET balance = balance - $1 WHERE user_id = $2', [100, 1]);
  
  // Commit the transaction
  await client.query('COMMIT');
} catch (e) {
  // Rollback on error
  await client.query('ROLLBACK');
  throw e;
} finally {
  // Release the client back to the pool
  client.release();
}`}
        </CodeBlock>

        <h3 className="mt-4 text-xl font-semibold">Connection Pooling</h3>
        <p>
          The PostgreSQL adapter uses connection pooling by default. You can configure the pool
          size:
        </p>

        <CodeBlock language="typescript">
          {`import { PostgresAdapter } from '@azura/framework';

const db = new PostgresAdapter({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'secret',
  database: 'my-app',
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
});`}
        </CodeBlock>

        <h3 className="mt-4 text-xl font-semibold">Raw Queries</h3>
        <p>You can access the underlying database client for raw queries:</p>

        <CodeBlock language="typescript">
          {`// MongoDB raw queries
const mongoAdapter = new MongoAdapter('mongodb://localhost:27017', 'my-app');
await mongoAdapter.connect();

// Access the MongoDB client directly
const collection = mongoAdapter.db.collection('users');
const result = await collection.aggregate([
  { $match: { age: { $gt: 30 } } },
  { $group: { _id: '$city', count: { $sum: 1 } } }
]).toArray();

// PostgreSQL raw queries
const pgAdapter = new PostgresAdapter({ /* connection options */ });
await pgAdapter.connect();

const result = await pgAdapter.pool.query(
  'SELECT * FROM users WHERE age > $1 ORDER BY name',
  [30]
);`}
        </CodeBlock>
      </div>

      <div className="mt-8">
        <Alert>
          <Info className="w-4 h-4" />
          <AlertTitle>Best Practices</AlertTitle>
          <AlertDescription>
            <ul className="ml-4 list-disc">
              <li>Use connection pooling for production applications</li>
              <li>Handle database errors gracefully in your controllers</li>
              <li>Use transactions for operations that require atomicity</li>
              <li>Consider using an ORM like TypeORM or Prisma for complex applications</li>
            </ul>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
