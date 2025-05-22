"use client";

import { useLanguage } from "@/components/language-provider";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CodeBlock from "@/components/docs/code-block";

export default function RestApiExamplePage() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "RESTful API Example",
      subtitle: "Learn how to build a complete RESTful API with Azura.",
      intro:
        "This example demonstrates how to create a RESTful API for a blog with posts and comments. It includes CRUD operations, validation, error handling, and more.",
      projectStructure: {
        title: "Project Structure",
        description: "Let's start by setting up the project structure:",
        structure: `blog-api/
├── src/
│   ├── controllers/
│   │   ├── post.controller.ts
│   │   └── comment.controller.ts
│   ├── models/
│   │   ├── post.model.ts
│   │   └── comment.model.ts
│   ├── services/
│   │   ├── post.service.ts
│   │   └── comment.service.ts
│   ├── middleware/
│   │   ├── error.middleware.ts
│   │   └── validation.middleware.ts
│   ├── config/
│   │   └── database.ts
│   └── index.ts
├── package.json
└── tsconfig.json`,
      },
      setup: {
        title: "Setup",
        description: "First, let's set up the project and install the necessary dependencies:",
        npm: "npm init -y\nnpm install @atosjs/azura\nnpm install --save-dev typescript ts-node @types/node",
        tsconfig: `{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  },
  "include": ["src/**/*"]
}`,
      },
      models: {
        title: "Models",
        description: "Let's define the data models for our blog API:",
        postModel: `// src/models/post.model.ts
export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePostDto {
  title: string;
  content: string;
  author: string;
}

export interface UpdatePostDto {
  title?: string;
  content?: string;
}`,
        commentModel: `// src/models/comment.model.ts
export interface Comment {
  id: string;
  postId: string;
  content: string;
  author: string;
  createdAt: Date;
}

export interface CreateCommentDto {
  postId: string;
  content: string;
  author: string;
}`,
      },
      services: {
        title: "Services",
        description: "Now, let's create the services that will handle the business logic:",
        postService: `// src/services/post.service.ts
import { Post, CreatePostDto, UpdatePostDto } from '../models/post.model';

// In-memory database for this example
const posts: Post[] = [];

export class PostService {
  getAllPosts(): Post[] {
    return posts;
  }

  getPostById(id: string): Post | undefined {
    return posts.find(post => post.id === id);
  }

  createPost(createPostDto: CreatePostDto): Post {
    const newPost: Post = {
      id: Date.now().toString(),
      ...createPostDto,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    posts.push(newPost);
    return newPost;
  }

  updatePost(id: string, updatePostDto: UpdatePostDto): Post | undefined {
    const postIndex = posts.findIndex(post => post.id === id);
    
    if (postIndex === -1) {
      return undefined;
    }
    
    const updatedPost = {
      ...posts[postIndex],
      ...updatePostDto,
      updatedAt: new Date()
    };
    
    posts[postIndex] = updatedPost;
    return updatedPost;
  }

  deletePost(id: string): boolean {
    const initialLength = posts.length;
    const newPosts = posts.filter(post => post.id !== id);
    
    if (newPosts.length === initialLength) {
      return false;
    }
    
    // Update the posts array
    posts.length = 0;
    posts.push(...newPosts);
    
    return true;
  }
}`,
        commentService: `// src/services/comment.service.ts
import { Comment, CreateCommentDto } from '../models/comment.model';

// In-memory database for this example
const comments: Comment[] = [];

export class CommentService {
  getCommentsByPostId(postId: string): Comment[] {
    return comments.filter(comment => comment.postId === postId);
  }

  createComment(createCommentDto: CreateCommentDto): Comment {
    const newComment: Comment = {
      id: Date.now().toString(),
      ...createCommentDto,
      createdAt: new Date()
    };
    
    comments.push(newComment);
    return newComment;
  }

  deleteComment(id: string): boolean {
    const initialLength = comments.length;
    const newComments = comments.filter(comment => comment.id !== id);
    
    if (newComments.length === initialLength) {
      return false;
    }
    
    // Update the comments array
    comments.length = 0;
    comments.push(...newComments);
    
    return true;
  }
}`,
      },
      controllers: {
        title: "Controllers",
        description: "Now, let's create the controllers that will handle the HTTP requests:",
        postController: `// src/controllers/post.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param } from '@atosjs/azura';
import { PostService } from '../services/post.service';
import { CreatePostDto, UpdatePostDto } from '../models/post.model';
import { HttpError } from '@atosjs/azura';

@Controller('/posts')
export class PostController {
  private postService: PostService;

  constructor() {
    this.postService = new PostService();
  }

  @Get('/')
  getAllPosts() {
    return this.postService.getAllPosts();
  }

  @Get('/:id')
  getPostById(@Param('id') id: string) {
    const post = this.postService.getPostById(id);
    
    if (!post) {
      throw new HttpError(404, { message: 'Post not found' });
    }
    
    return post;
  }

  @Post('/')
  createPost(@Body() createPostDto: CreatePostDto) {
    // Validate input
    if (!createPostDto.title || !createPostDto.content || !createPostDto.author) {
      throw new HttpError(400, { message: 'Title, content, and author are required' });
    }
    
    return this.postService.createPost(createPostDto);
  }

  @Put('/:id')
  updatePost(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    // Validate input
    if (Object.keys(updatePostDto).length === 0) {
      throw new HttpError(400, { message: 'No update data provided' });
    }
    
    const updatedPost = this.postService.updatePost(id, updatePostDto);
    
    if (!updatedPost) {
      throw new HttpError(404, { message: 'Post not found' });
    }
    
    return updatedPost;
  }

  @Delete('/:id')
  deletePost(@Param('id') id: string) {
    const deleted = this.postService.deletePost(id);
    
    if (!deleted) {
      throw new HttpError(404, { message: 'Post not found' });
    }
    
    return { message: 'Post deleted successfully' };
  }
}`,
        commentController: `// src/controllers/comment.controller.ts
import { Controller, Get, Post, Delete, Body, Param } from '@atosjs/azura';
import { CommentService } from '../services/comment.service';
import { PostService } from '../services/post.service';
import { CreateCommentDto } from '../models/comment.model';
import { HttpError } from '@atosjs/azura';

@Controller('/comments')
export class CommentController {
  private commentService: CommentService;
  private postService: PostService;

  constructor() {
    this.commentService = new CommentService();
    this.postService = new PostService();
  }

  @Get('/post/:postId')
  getCommentsByPostId(@Param('postId') postId: string) {
    // Check if post exists
    const post = this.postService.getPostById(postId);
    
    if (!post) {
      throw new HttpError(404, { message: 'Post not found' });
    }
    
    return this.commentService.getCommentsByPostId(postId);
  }

  @Post('/')
  createComment(@Body() createCommentDto: CreateCommentDto) {
    // Validate input
    if (!createCommentDto.postId || !createCommentDto.content || !createCommentDto.author) {
      throw new HttpError(400, { message: 'PostId, content, and author are required' });
    }
    
    // Check if post exists
    const post = this.postService.getPostById(createCommentDto.postId);
    
    if (!post) {
      throw new HttpError(404, { message: 'Post not found' });
    }
    
    return this.commentService.createComment(createCommentDto);
  }

  @Delete('/:id')
  deleteComment(@Param('id') id: string) {
    const deleted = this.commentService.deleteComment(id);
    
    if (!deleted) {
      throw new HttpError(404, { message: 'Comment not found' });
    }
    
    return { message: 'Comment deleted successfully' };
  }
}`,
      },
      middleware: {
        title: "Middleware",
        description: "Let's create some middleware for error handling and request logging:",
        errorMiddleware: `// src/middleware/error.middleware.ts
import { Request, Response, NextFunction } from '@atosjs/azura';
import { HttpError } from '@atosjs/azura';

export function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error('Error:', err);
  
  if (err instanceof HttpError) {
    return res.status(err.status).json(err.payload);
  }
  
  // Default error response for unhandled errors
  return res.status(500).json({
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'production' ? undefined : err.message
  });
}`,
        loggingMiddleware: `// src/middleware/logging.middleware.ts
import { Request, Response, NextFunction } from '@atosjs/azura';

export function loggingMiddleware(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();
  
  // Add a listener for when the response finishes
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(\`\${req.method} \${req.path} - \${res.statusCode} (\${duration}ms)\`);
  });
  
  next();
}`,
      },
      mainFile: {
        title: "Main Application File",
        description:
          "Finally, let's create the main application file that ties everything together:",
        index: `// src/index.ts
import { AzuraServer } from '@atosjs/azura';
import { PostController } from './controllers/post.controller';
import { CommentController } from './controllers/comment.controller';
import { errorMiddleware } from './middleware/error.middleware';
import { loggingMiddleware } from './middleware/logging.middleware';

async function bootstrap() {
  const app = new AzuraServer({
    port: process.env.PORT ? parseInt(process.env.PORT) : 3000
  });
  
  // Register middleware
  app.use(loggingMiddleware);
  
  // Register controllers
  app.load([
    PostController,
    CommentController
  ]);
  
  // Register error middleware (should be last)
  app.use(errorMiddleware);
  
  // Start the server
  app.listen();
  console.log(\`Server is running on http://localhost:\${app.config.port}\`);
}

bootstrap().catch(console.error);`,
      },
      testing: {
        title: "Testing the API",
        description: "Now that we have our API set up, let's test it with some HTTP requests:",
        createPost: `# Create a post
curl -X POST http://localhost:3000/posts \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Hello Azura",
    "content": "This is my first post with Azura.JS Framework",
    "author": "John Doe"
  }'`,
        getPosts: `# Get all posts
curl http://localhost:3000/posts`,
        getPost: `# Get a specific post
curl http://localhost:3000/posts/1234567890`,
        updatePost: `# Update a post
curl -X PUT http://localhost:3000/posts/1234567890 \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Updated Title",
    "content": "Updated content for my post"
  }'`,
        deletePost: `# Delete a post
curl -X DELETE http://localhost:3000/posts/1234567890`,
        createComment: `# Create a comment
curl -X POST http://localhost:3000/comments \\
  -H "Content-Type: application/json" \\
  -d '{
    "postId": "1234567890",
    "content": "Great post!",
    "author": "Jane Smith"
  }'`,
        getComments: `# Get comments for a post
curl http://localhost:3000/comments/post/1234567890`,
      },
      conclusion: {
        title: "Conclusion",
        description:
          "In this example, we've built a complete RESTful API for a blog with posts and comments. We've covered:",
        points: [
          "Setting up the project structure",
          "Defining data models and DTOs",
          "Creating services for business logic",
          "Implementing controllers with decorators",
          "Adding middleware for error handling and logging",
          "Testing the API with HTTP requests",
        ],
        next: "This is a simple example using in-memory storage. In a real application, you would connect to a database using one of Azura's database adapters.",
      },
    },
    pt: {
      title: "Exemplo de API RESTful",
      subtitle: "Aprenda como construir uma API RESTful completa com Azura.",
      intro:
        "Este exemplo demonstra como criar uma API RESTful para um blog com posts e comentários. Inclui operações CRUD, validação, tratamento de erros e muito mais.",
      projectStructure: {
        title: "Estrutura do Projeto",
        description: "Vamos começar configurando a estrutura do projeto:",
        structure: `blog-api/
├── src/
│   ├── controllers/
│   │   ├── post.controller.ts
│   │   └── comment.controller.ts
│   ├── models/
│   │   ├── post.model.ts
│   │   └── comment.model.ts
│   ├── services/
│   │   ├── post.service.ts
│   │   └── comment.service.ts
│   ├── middleware/
│   │   ├── error.middleware.ts
│   │   └── validation.middleware.ts
│   ├── config/
│   │   └── database.ts
│   └── index.ts
├── package.json
└── tsconfig.json`,
      },
      setup: {
        title: "Configuração",
        description: "Primeiro, vamos configurar o projeto e instalar as dependências necessárias:",
        npm: "npm init -y\nnpm install @atosjs/azura\nnpm install --save-dev typescript ts-node @types/node",
        tsconfig: `{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  },
  "include": ["src/**/*"]
}`,
      },
      models: {
        title: "Modelos",
        description: "Vamos definir os modelos de dados para nossa API de blog:",
        postModel: `// src/models/post.model.ts
export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePostDto {
  title: string;
  content: string;
  author: string;
}

export interface UpdatePostDto {
  title?: string;
  content?: string;
}`,
        commentModel: `// src/models/comment.model.ts
export interface Comment {
  id: string;
  postId: string;
  content: string;
  author: string;
  createdAt: Date;
}

export interface CreateCommentDto {
  postId: string;
  content: string;
  author: string;
}`,
      },
      services: {
        title: "Serviços",
        description: "Agora, vamos criar os serviços que lidarão com a lógica de negócios:",
        postService: `// src/services/post.service.ts
import { Post, CreatePostDto, UpdatePostDto } from '../models/post.model';

// Banco de dados em memória para este exemplo
const posts: Post[] = [];

export class PostService {
  getAllPosts(): Post[] {
    return posts;
  }

  getPostById(id: string): Post | undefined {
    return posts.find(post => post.id === id);
  }

  createPost(createPostDto: CreatePostDto): Post {
    const newPost: Post = {
      id: Date.now().toString(),
      ...createPostDto,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    posts.push(newPost);
    return newPost;
  }

  updatePost(id: string, updatePostDto: UpdatePostDto): Post | undefined {
    const postIndex = posts.findIndex(post => post.id === id);
    
    if (postIndex === -1) {
      return undefined;
    }
    
    const updatedPost = {
      ...posts[postIndex],
      ...updatePostDto,
      updatedAt: new Date()
    };
    
    posts[postIndex] = updatedPost;
    return updatedPost;
  }

  deletePost(id: string): boolean {
    const initialLength = posts.length;
    const newPosts = posts.filter(post => post.id !== id);
    
    if (newPosts.length === initialLength) {
      return false;
    }
    
    // Atualiza o array de posts
    posts.length = 0;
    posts.push(...newPosts);
    
    return true;
  }
}`,
        commentService: `// src/services/comment.service.ts
import { Comment, CreateCommentDto } from '../models/comment.model';

// Banco de dados em memória para este exemplo
const comments: Comment[] = [];

export class CommentService {
  getCommentsByPostId(postId: string): Comment[] {
    return comments.filter(comment => comment.postId === postId);
  }

  createComment(createCommentDto: CreateCommentDto): Comment {
    const newComment: Comment = {
      id: Date.now().toString(),
      ...createCommentDto,
      createdAt: new Date()
    };
    
    comments.push(newComment);
    return newComment;
  }

  deleteComment(id: string): boolean {
    const initialLength = comments.length;
    const newComments = comments.filter(comment => comment.id !== id);
    
    if (newComments.length === initialLength) {
      return false;
    }
    
    // Atualiza o array de comentários
    comments.length = 0;
    comments.push(...newComments);
    
    return true;
  }
}`,
      },
      controllers: {
        title: "Controladores",
        description: "Agora, vamos criar os controladores que lidarão com as requisições HTTP:",
        postController: `// src/controllers/post.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param } from '@atosjs/azura';
import { PostService } from '../services/post.service';
import { CreatePostDto, UpdatePostDto } from '../models/post.model';
import { HttpError } from '@atosjs/azura';

@Controller('/posts')
export class PostController {
  private postService: PostService;

  constructor() {
    this.postService = new PostService();
  }

  @Get('/')
  getAllPosts() {
    return this.postService.getAllPosts();
  }

  @Get('/:id')
  getPostById(@Param('id') id: string) {
    const post = this.postService.getPostById(id);
    
    if (!post) {
      throw new HttpError(404, { message: 'Post não encontrado' });
    }
    
    return post;
  }

  @Post('/')
  createPost(@Body() createPostDto: CreatePostDto) {
    // Valida a entrada
    if (!createPostDto.title || !createPostDto.content || !createPostDto.author) {
      throw new HttpError(400, { message: 'Título, conteúdo e autor são obrigatórios' });
    }
    
    return this.postService.createPost(createPostDto);
  }

  @Put('/:id')
  updatePost(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    // Valida a entrada
    if (Object.keys(updatePostDto).length === 0) {
      throw new HttpError(400, { message: 'Nenhum dado de atualização fornecido' });
    }
    
    const updatedPost = this.postService.updatePost(id, updatePostDto);
    
    if (!updatedPost) {
      throw new HttpError(404, { message: 'Post não encontrado' });
    }
    
    return updatedPost;
  }

  @Delete('/:id')
  deletePost(@Param('id') id: string) {
    const deleted = this.postService.deletePost(id);
    
    if (!deleted) {
      throw new HttpError(404, { message: 'Post não encontrado' });
    }
    
    return { message: 'Post excluído com sucesso' };
  }
}`,
        commentController: `// src/controllers/comment.controller.ts
import { Controller, Get, Post, Delete, Body, Param } from '@atosjs/azura';
import { CommentService } from '../services/comment.service';
import { PostService } from '../services/post.service';
import { CreateCommentDto } from '../models/comment.model';
import { HttpError } from '@atosjs/azura';

@Controller('/comments')
export class CommentController {
  private commentService: CommentService;
  private postService: PostService;

  constructor() {
    this.commentService = new CommentService();
    this.postService = new PostService();
  }

  @Get('/post/:postId')
  getCommentsByPostId(@Param('postId') postId: string) {
    // Verifica se o post existe
    const post = this.postService.getPostById(postId);
    
    if (!post) {
      throw new HttpError(404, { message: 'Post não encontrado' });
    }
    
    return this.commentService.getCommentsByPostId(postId);
  }

  @Post('/')
  createComment(@Body() createCommentDto: CreateCommentDto) {
    // Valida a entrada
    if (!createCommentDto.postId || !createCommentDto.content || !createCommentDto.author) {
      throw new HttpError(400, { message: 'PostId, conteúdo e autor são obrigatórios' });
    }
    
    // Verifica se o post existe
    const post = this.postService.getPostById(createCommentDto.postId);
    
    if (!post) {
      throw new HttpError(404, { message: 'Post não encontrado' });
    }
    
    return this.commentService.createComment(createCommentDto);
  }

  @Delete('/:id')
  deleteComment(@Param('id') id: string) {
    const deleted = this.commentService.deleteComment(id);
    
    if (!deleted) {
      throw new HttpError(404, { message: 'Comentário não encontrado' });
    }
    
    return { message: 'Comentário excluído com sucesso' };
  }
}`,
      },
      middleware: {
        title: "Middleware",
        description:
          "Vamos criar alguns middlewares para tratamento de erros e registro de requisições:",
        errorMiddleware: `// src/middleware/error.middleware.ts
import { Request, Response, NextFunction } from '@atosjs/azura';
import { HttpError } from '@atosjs/azura';

export function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error('Erro:', err);
  
  if (err instanceof HttpError) {
    return res.status(err.status).json(err.payload);
  }
  
  // Resposta de erro padrão para erros não tratados
  return res.status(500).json({
    message: 'Erro Interno do Servidor',
    error: process.env.NODE_ENV === 'production' ? undefined : err.message
  });
}`,
        loggingMiddleware: `// src/middleware/logging.middleware.ts
import { Request, Response, NextFunction } from '@atosjs/azura';

export function loggingMiddleware(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();
  
  // Adiciona um listener para quando a resposta terminar
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(\`\${req.method} \${req.path} - \${res.statusCode} (\${duration}ms)\`);
  });
  
  next();
}`,
      },
      mainFile: {
        title: "Arquivo Principal da Aplicação",
        description: "Finalmente, vamos criar o arquivo principal da aplicação que une tudo:",
        index: `// src/index.ts
import { AzuraServer } from '@atosjs/azura';
import { PostController } from './controllers/post.controller';
import { CommentController } from './controllers/comment.controller';
import { errorMiddleware } from './middleware/error.middleware';
import { loggingMiddleware } from './middleware/logging.middleware';

async function bootstrap() {
  const app = new AzuraServer({
    port: process.env.PORT ? parseInt(process.env.PORT) : 3000
  });
  
  // Registra middleware
  app.use(loggingMiddleware);
  
  // Registra controladores
  app.load([
    PostController,
    CommentController
  ]);
  
  // Registra middleware de erro (deve ser o último)
  app.use(errorMiddleware);
  
  // Inicia o servidor
  app.listen();
  console.log(\`Servidor está rodando em http://localhost:\${app.config.port}\`);
}

bootstrap().catch(console.error);`,
      },
      testing: {
        title: "Testando a API",
        description:
          "Agora que temos nossa API configurada, vamos testá-la com algumas requisições HTTP:",
        createPost: `# Criar um post
curl -X POST http://localhost:3000/posts \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Olá Azura",
    "content": "Este é meu primeiro post com o Azura.JS Framework",
    "author": "João Silva"
  }'`,
        getPosts: `# Obter todos os posts
curl http://localhost:3000/posts`,
        getPost: `# Obter um post específico
curl http://localhost:3000/posts/1234567890`,
        updatePost: `# Atualizar um post
curl -X PUT http://localhost:3000/posts/1234567890 \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Título Atualizado",
    "content": "Conteúdo atualizado para meu post"
  }'`,
        deletePost: `# Excluir um post
curl -X DELETE http://localhost:3000/posts/1234567890`,
        createComment: `# Criar um comentário
curl -X POST http://localhost:3000/comments \\
  -H "Content-Type: application/json" \\
  -d '{
    "postId": "1234567890",
    "content": "Ótimo post!",
    "author": "Maria Souza"
  }'`,
        getComments: `# Obter comentários para um post
curl http://localhost:3000/comments/post/1234567890`,
      },
      conclusion: {
        title: "Conclusão",
        description:
          "Neste exemplo, construímos uma API RESTful completa para um blog com posts e comentários. Abordamos:",
        points: [
          "Configuração da estrutura do projeto",
          "Definição de modelos de dados e DTOs",
          "Criação de serviços para lógica de negócios",
          "Implementação de controladores com decoradores",
          "Adição de middleware para tratamento de erros e registro",
          "Teste da API com requisições HTTP",
        ],
        next: "Este é um exemplo simples usando armazenamento em memória. Em uma aplicação real, você se conectaria a um banco de dados usando um dos adaptadores de banco de dados do Azura.",
      },
    },
  };

  const c = content[language];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">{c.title}</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">{c.subtitle}</p>
      </div>

      <p className="text-lg">{c.intro}</p>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold">{c.projectStructure.title}</h2>
        <p>{c.projectStructure.description}</p>
        <CodeBlock language="plaintext">{c.projectStructure.structure}</CodeBlock>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold">{c.setup.title}</h2>
        <p>{c.setup.description}</p>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">package.json</h3>
          <CodeBlock language="bash">{c.setup.npm}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">tsconfig.json</h3>
          <CodeBlock language="json">{c.setup.tsconfig}</CodeBlock>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold">{c.models.title}</h2>
        <p>{c.models.description}</p>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">post.model.ts</h3>
          <Tabs defaultValue="typescript">
            <TabsList>
              <TabsTrigger value="typescript">TypeScript</TabsTrigger>
              <TabsTrigger value="javascript">JavaScript</TabsTrigger>
            </TabsList>
            <TabsContent value="typescript">
              <CodeBlock language="typescript">{c.models.postModel}</CodeBlock>
            </TabsContent>
            <TabsContent value="javascript">
              <CodeBlock language="javascript">
                {c.models.postModel
                  .replace(/: \w+/g, "")
                  .replace(/interface/g, "const")
                  .replace(/export interface/g, "export const")}
              </CodeBlock>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">comment.model.ts</h3>
          <Tabs defaultValue="typescript">
            <TabsList>
              <TabsTrigger value="typescript">TypeScript</TabsTrigger>
              <TabsTrigger value="javascript">JavaScript</TabsTrigger>
            </TabsList>
            <TabsContent value="typescript">
              <CodeBlock language="typescript">{c.models.commentModel}</CodeBlock>
            </TabsContent>
            <TabsContent value="javascript">
              <CodeBlock language="javascript">
                {c.models.commentModel
                  .replace(/: \w+/g, "")
                  .replace(/interface/g, "const")
                  .replace(/export interface/g, "export const")}
              </CodeBlock>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold">{c.services.title}</h2>
        <p>{c.services.description}</p>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">post.service.ts</h3>
          <Tabs defaultValue="typescript">
            <TabsList>
              <TabsTrigger value="typescript">TypeScript</TabsTrigger>
              <TabsTrigger value="javascript">JavaScript</TabsTrigger>
            </TabsList>
            <TabsContent value="typescript">
              <CodeBlock language="typescript">{c.services.postService}</CodeBlock>
            </TabsContent>
            <TabsContent value="javascript">
              <CodeBlock language="javascript">
                {c.services.postService
                  .replace(/: \w+/g, "")
                  .replace(/: \w+\[\]/g, "")
                  .replace(/: \w+ \| \w+/g, "")}
              </CodeBlock>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">comment.service.ts</h3>
          <Tabs defaultValue="typescript">
            <TabsList>
              <TabsTrigger value="typescript">TypeScript</TabsTrigger>
              <TabsTrigger value="javascript">JavaScript</TabsTrigger>
            </TabsList>
            <TabsContent value="typescript">
              <CodeBlock language="typescript">{c.services.commentService}</CodeBlock>
            </TabsContent>
            <TabsContent value="javascript">
              <CodeBlock language="javascript">
                {c.services.commentService
                  .replace(/: \w+/g, "")
                  .replace(/: \w+\[\]/g, "")
                  .replace(/: \w+ \| \w+/g, "")}
              </CodeBlock>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold">{c.controllers.title}</h2>
        <p>{c.controllers.description}</p>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">post.controller.ts</h3>
          <Tabs defaultValue="typescript">
            <TabsList>
              <TabsTrigger value="typescript">TypeScript</TabsTrigger>
              <TabsTrigger value="javascript">JavaScript</TabsTrigger>
            </TabsList>
            <TabsContent value="typescript">
              <CodeBlock language="typescript">{c.controllers.postController}</CodeBlock>
            </TabsContent>
            <TabsContent value="javascript">
              <CodeBlock language="javascript">
                {c.controllers.postController
                  .replace(/: \w+/g, "")
                  .replace(/: \w+\[\]/g, "")
                  .replace(/: \w+ \| \w+/g, "")}
              </CodeBlock>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">comment.controller.ts</h3>
          <Tabs defaultValue="typescript">
            <TabsList>
              <TabsTrigger value="typescript">TypeScript</TabsTrigger>
              <TabsTrigger value="javascript">JavaScript</TabsTrigger>
            </TabsList>
            <TabsContent value="typescript">
              <CodeBlock language="typescript">{c.controllers.commentController}</CodeBlock>
            </TabsContent>
            <TabsContent value="javascript">
              <CodeBlock language="javascript">
                {c.controllers.commentController
                  .replace(/: \w+/g, "")
                  .replace(/: \w+\[\]/g, "")
                  .replace(/: \w+ \| \w+/g, "")}
              </CodeBlock>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold">{c.middleware.title}</h2>
        <p>{c.middleware.description}</p>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">error.middleware.ts</h3>
          <Tabs defaultValue="typescript">
            <TabsList>
              <TabsTrigger value="typescript">TypeScript</TabsTrigger>
              <TabsTrigger value="javascript">JavaScript</TabsTrigger>
            </TabsList>
            <TabsContent value="typescript">
              <CodeBlock language="typescript">{c.middleware.errorMiddleware}</CodeBlock>
            </TabsContent>
            <TabsContent value="javascript">
              <CodeBlock language="javascript">
                {c.middleware.errorMiddleware.replace(/: \w+/g, "")}
              </CodeBlock>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">logging.middleware.ts</h3>
          <Tabs defaultValue="typescript">
            <TabsList>
              <TabsTrigger value="typescript">TypeScript</TabsTrigger>
              <TabsTrigger value="javascript">JavaScript</TabsTrigger>
            </TabsList>
            <TabsContent value="typescript">
              <CodeBlock language="typescript">{c.middleware.loggingMiddleware}</CodeBlock>
            </TabsContent>
            <TabsContent value="javascript">
              <CodeBlock language="javascript">
                {c.middleware.loggingMiddleware.replace(/: \w+/g, "")}
              </CodeBlock>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold">{c.mainFile.title}</h2>
        <p>{c.mainFile.description}</p>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">index.ts</h3>
          <Tabs defaultValue="typescript">
            <TabsList>
              <TabsTrigger value="typescript">TypeScript</TabsTrigger>
              <TabsTrigger value="javascript">JavaScript</TabsTrigger>
            </TabsList>
            <TabsContent value="typescript">
              <CodeBlock language="typescript">{c.mainFile.index}</CodeBlock>
            </TabsContent>
            <TabsContent value="javascript">
              <CodeBlock language="javascript">{c.mainFile.index.replace(/: \w+/g, "")}</CodeBlock>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold">{c.testing.title}</h2>
        <p>{c.testing.description}</p>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Create a Post</h3>
          <CodeBlock language="bash">{c.testing.createPost}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Get All Posts</h3>
          <CodeBlock language="bash">{c.testing.getPosts}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Get a Specific Post</h3>
          <CodeBlock language="bash">{c.testing.getPost}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Update a Post</h3>
          <CodeBlock language="bash">{c.testing.updatePost}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Delete a Post</h3>
          <CodeBlock language="bash">{c.testing.deletePost}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Create a Comment</h3>
          <CodeBlock language="bash">{c.testing.createComment}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Get Comments for a Post</h3>
          <CodeBlock language="bash">{c.testing.getComments}</CodeBlock>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold">{c.conclusion.title}</h2>
        <p>{c.conclusion.description}</p>

        <ul className="ml-6 space-y-2 list-disc">
          {c.conclusion.points.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>

        <Alert>
          <Info className="w-4 h-4" />
          <AlertTitle>Note</AlertTitle>
          <AlertDescription>{c.conclusion.next}</AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
