"use client";

import { useLanguage } from "@/components/language-provider";
import { CodeBlock } from "@/components/ui/code-block";

export default function DeploymentPage() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "Deployment Guide",
      subtitle: "Learn how to deploy your Azura API to various environments.",
      intro:
        "This guide covers how to deploy your Azura API to different environments, including traditional servers, containerized environments, and serverless platforms.",
      preparation: {
        title: "Preparing for Deployment",
        description: "Before deploying your Azura API, you should prepare your application:",
        steps: [
          {
            title: "1. Set up environment variables",
            description:
              "Use environment variables for configuration instead of hardcoding values:",
            code: `// src/index.ts
import { AzuraServer } from '@atosjs/azura';

const app = new AzuraServer({
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  host: process.env.HOST || 'localhost'
});

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'azura_db'
};`,
          },
          {
            title: "2. Build your application",
            description: "Compile your TypeScript code to JavaScript:",
            code: `# Add build script to package.json
{
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js"
  }
}

# Run the build
npm run build`,
          },
          {
            title: "3. Set up proper error handling",
            description: "Ensure your application handles errors gracefully:",
            code: `// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  // Don't expose stack traces in production
  const error = process.env.NODE_ENV === 'production'
    ? { message: 'Internal Server Error' }
    : { message: err.message, stack: err.stack };
  
  res.status(500).json(error);
});`,
          },
          {
            title: "4. Set up logging",
            description: "Configure proper logging for production:",
            code: `// Configure logging based on environment
if (process.env.NODE_ENV === 'production') {
  // Production logging (e.g., to a file or service)
  app.registerPlugin(logger, {
    level: 'info',
    format: 'json',
    destination: process.env.LOG_DESTINATION || 'stdout'
  });
} else {
  // Development logging (more verbose)
  app.registerPlugin(logger, {
    level: 'debug',
    format: 'pretty',
    destination: 'stdout'
  });
}`,
          },
        ],
      },
      traditional: {
        title: "Traditional Server Deployment",
        description: "Deploy your Azura API to a traditional server or VPS:",
        steps: [
          {
            title: "1. Set up your server",
            description: "Install Node.js and other dependencies on your server:",
            code: `# Update package lists
sudo apt update

# Install Node.js and npm
sudo apt install -y nodejs npm

# Install PM2 globally (process manager)
sudo npm install -g pm2`,
          },
          {
            title: "2. Transfer your code",
            description: "Transfer your code to the server using SCP, Git, or another method:",
            code: `# Using SCP
scp -r ./dist package.json package-lock.json user@your-server:/path/to/app

# Or clone from Git
git clone https://github.com/your-username/your-repo.git
cd your-repo
npm install --production`,
          },
          {
            title: "3. Set up environment variables",
            description: "Create a .env file or set environment variables on your server:",
            code: `# Create .env file
cat > .env << EOL
PORT=3000
NODE_ENV=production
DB_HOST=your-db-host
DB_PORT=5432
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=your-db-name
EOL

# Or set environment variables directly
export PORT=3000
export NODE_ENV=production
# ... other variables`,
          },
          {
            title: "4. Start your application with PM2",
            description: "Use PM2 to manage your Node.js process:",
            code: `# Start the application
pm2 start dist/index.js --name "azura-api"

# Ensure PM2 starts on system boot
pm2 startup
pm2 save

# Monitor your application
pm2 monit

# View logs
pm2 logs azura-api`,
          },
          {
            title: "5. Set up a reverse proxy (optional)",
            description: "Use Nginx or Apache as a reverse proxy:",
            code: `# Nginx configuration example
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}`,
          },
        ],
      },
      docker: {
        title: "Docker Deployment",
        description: "Deploy your Azura API using Docker:",
        steps: [
          {
            title: "1. Create a Dockerfile",
            description: "Create a Dockerfile in your project root:",
            code: `FROM node:18-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy built application
COPY dist/ ./dist/

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose the port
EXPOSE 3000

# Start the application
CMD ["node", "dist/index.js"]`,
          },
          {
            title: "2. Create a .dockerignore file",
            description: "Create a .dockerignore file to exclude unnecessary files:",
            code: `node_modules
npm-debug.log
src
.git
.gitignore
.env
*.md`,
          },
          {
            title: "3. Build and run the Docker image",
            description: "Build and run your Docker container:",
            code: `# Build the Docker image
docker build -t azura-api .

# Run the container
docker run -p 3000:3000 --env-file .env -d --name azura-api azura-api

# View logs
docker logs -f azura-api`,
          },
          {
            title: "4. Using Docker Compose (optional)",
            description: "Create a docker-compose.yml file for more complex setups:",
            code: `version: '3'

services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
      - DB_HOST=db
      - DB_PORT=5432
      - DB_USER=postgres
      - DB_PASSWORD=password
      - DB_NAME=azura_db
    depends_on:
      - db
    restart: always

  db:
    image: postgres:14
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=azura_db
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:`,
          },
          {
            title: "5. Deploy with Docker Compose",
            description: "Deploy your application using Docker Compose:",
            code: `# Start the services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the services
docker-compose down`,
          },
        ],
      },
      kubernetes: {
        title: "Kubernetes Deployment",
        description: "Deploy your Azura API to a Kubernetes cluster:",
        steps: [
          {
            title: "1. Create Kubernetes deployment file",
            description: "Create a deployment.yaml file:",
            code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: azura-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: azura-api
  template:
    metadata:
      labels:
        app: azura-api
    spec:
      containers:
      - name: azura-api
        image: your-registry/azura-api:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        - name: PORT
          value: "3000"
        - name: DB_HOST
          valueFrom:
            configMapKeyRef:
              name: azura-config
              key: db_host
        - name: DB_PORT
          valueFrom:
            configMapKeyRef:
              name: azura-config
              key: db_port
        - name: DB_USER
          valueFrom:
            secretKeyRef:
              name: azura-secrets
              key: db_user
        - name: DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: azura-secrets
              key: db_password
        - name: DB_NAME
          valueFrom:
            configMapKeyRef:
              name: azura-config
              key: db_name
        resources:
          limits:
            cpu: "500m"
            memory: "512Mi"
          requests:
            cpu: "100m"
            memory: "256Mi"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5`,
          },
          {
            title: "2. Create Kubernetes service file",
            description: "Create a service.yaml file:",
            code: `apiVersion: v1
kind: Service
metadata:
  name: azura-api
spec:
  selector:
    app: azura-api
  ports:
  - port: 80
    targetPort: 3000
  type: ClusterIP`,
          },
          {
            title: "3. Create ConfigMap and Secret",
            description: "Create configuration and secrets:",
            code: `# ConfigMap
apiVersion: v1
kind: ConfigMap
metadata:
  name: azura-config
data:
  db_host: "postgres-service"
  db_port: "5432"
  db_name: "azura_db"

---
# Secret
apiVersion: v1
kind: Secret
metadata:
  name: azura-secrets
type: Opaque
data:
  db_user: cG9zdGdyZXM=  # base64 encoded "postgres"
  db_password: cGFzc3dvcmQ=  # base64 encoded "password"`,
          },
          {
            title: "4. Apply Kubernetes configurations",
            description: "Deploy your application to Kubernetes:",
            code: `# Apply ConfigMap and Secret
kubectl apply -f configmap.yaml
kubectl apply -f secret.yaml

# Apply Deployment and Service
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml

# Check deployment status
kubectl get deployments
kubectl get pods
kubectl get services`,
          },
          {
            title: "5. Set up Ingress (optional)",
            description: "Create an Ingress resource for external access:",
            code: `apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: azura-api-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
  - host: api.your-domain.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: azura-api
            port:
              number: 80`,
          },
        ],
      },
      serverless: {
        title: "Serverless Deployment",
        description: "Deploy your Azura API to serverless platforms:",
        platforms: [
          {
            name: "Vercel",
            description: "Deploy to Vercel:",
            steps: [
              {
                title: "1. Create a vercel.json file",
                description: "Create a configuration file for Vercel:",
                code: `{
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
}`,
              },
              {
                title: "2. Deploy to Vercel",
                description: "Deploy using the Vercel CLI:",
                code: `# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# For production deployment
vercel --prod`,
              },
            ],
          },
          {
            name: "AWS Lambda",
            description: "Deploy to AWS Lambda with API Gateway:",
            steps: [
              {
                title: "1. Install Serverless Framework",
                description: "Install the Serverless Framework:",
                code: `npm install -g serverless`,
              },
              {
                title: "2. Create a serverless.yml file",
                description: "Create a configuration file for Serverless Framework:",
                code: `service: azura-api

provider:
  name: aws
  runtime: nodejs18.x
  stage: \${opt:stage, 'dev'}
  region: \${opt:region, 'us-east-1'}
  environment:
    NODE_ENV: production
    DB_HOST: \${env:DB_HOST}
    DB_PORT: \${env:DB_PORT}
    DB_USER: \${env:DB_USER}
    DB_PASSWORD: \${env:DB_PASSWORD}
    DB_NAME: \${env:DB_NAME}

functions:
  api:
    handler: dist/lambda.handler
    events:
      - http:
          path: /{proxy+}
          method: any
          cors: true

plugins:
  - serverless-offline`,
              },
              {
                title: "3. Create a Lambda handler",
                description: "Create a Lambda handler file (src/lambda.ts):",
                code: `// src/lambda.ts
import { AzuraServer } from '@atosjs/azura';
import serverless from 'serverless-http';

// Import your controllers
import { UserController } from './controllers/user.controller';

// Create Azura server
const app = new AzuraServer();

// Register controllers
app.load([UserController]);

// Create serverless handler
export const handler = serverless(app.server);`,
              },
              {
                title: "4. Deploy to AWS",
                description: "Deploy using the Serverless Framework:",
                code: `# Deploy to AWS
serverless deploy

# For a specific stage
serverless deploy --stage production`,
              },
            ],
          },
        ],
      },
      monitoring: {
        title: "Monitoring and Logging",
        description: "Set up monitoring and logging for your deployed API:",
        options: [
          {
            title: "Application Logging",
            description: "Configure proper logging in your application:",
            code: `// Configure logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  
  // Add a listener for when the response finishes
  res.on('finish', () => {
    const duration = Date.now() - start;
    const log = {
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration: \`\${duration}ms\`,
      userAgent: req.get('user-agent'),
      ip: req.ip
    };
    
    console.log(JSON.stringify(log));
  });
  
  next();
});`,
          },
          {
            title: "Health Check Endpoint",
            description: "Add a health check endpoint to your API:",
            code: `// Health check endpoint
app.get('/health', (req, res) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now()
  };
  
  try {
    // Check database connection
    const dbConnected = db.isConnected();
    
    if (!dbConnected) {
      healthcheck.message = 'Database connection failed';
      return res.status(503).json(healthcheck);
    }
    
    res.status(200).json(healthcheck);
  } catch (error) {
    healthcheck.message = error.message;
    res.status(503).json(healthcheck);
  }
});`,
          },
          {
            title: "Metrics Endpoint",
            description: "Add a metrics endpoint for monitoring:",
            code: `// Metrics endpoint
app.get('/metrics', (req, res) => {
  const metrics = {
    memory: process.memoryUsage(),
    cpu: process.cpuUsage(),
    uptime: process.uptime(),
    requests: {
      total: requestCounter.total,
      success: requestCounter.success,
      error: requestCounter.error
    },
    responseTime: {
      average: calculateAverageResponseTime(),
      p95: calculateP95ResponseTime()
    }
  };
  
  res.status(200).json(metrics);
});`,
          },
          {
            title: "Third-Party Monitoring",
            description: "Integrate with third-party monitoring services:",
            code: `// Example integration with a monitoring service
import { monitor } from 'monitoring-service';

// Initialize monitoring
monitor.init({
  apiKey: process.env.MONITORING_API_KEY,
  serviceName: 'azura-api',
  environment: process.env.NODE_ENV
});

// Track requests
app.use((req, res, next) => {
  const transaction = monitor.startTransaction(\`\${req.method} \${req.path}\`);
  
  res.on('finish', () => {
    transaction.result = res.statusCode < 400 ? 'success' : 'error';
    transaction.end();
  });
  
  next();
});

// Track errors
app.use((err, req, res, next) => {
  monitor.captureError(err);
  next(err);
});`,
          },
        ],
      },
      cicd: {
        title: "CI/CD Pipeline",
        description: "Set up a continuous integration and deployment pipeline:",
        examples: [
          {
            title: "GitHub Actions",
            description: "Create a GitHub Actions workflow file (.github/workflows/deploy.yml):",
            code: `name: Deploy Azura API

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Build
      run: npm run build
    
    - name: Deploy to production
      if: success()
      run: |
        # Deploy to your server or cloud platform
        # Example for Vercel
        npm install -g vercel
        vercel --prod --token \${{ secrets.VERCEL_TOKEN }}
      env:
        VERCEL_TOKEN: \${{ secrets.VERCEL_TOKEN }}
        VERCEL_PROJECT_ID: \${{ secrets.VERCEL_PROJECT_ID }}
        VERCEL_ORG_ID: \${{ secrets.VERCEL_ORG_ID }}`,
          },
          {
            title: "GitLab CI/CD",
            description: "Create a GitLab CI/CD configuration file (.gitlab-ci.yml):",
            code: `stages:
  - test
  - build
  - deploy

variables:
  NODE_VERSION: "18"

test:
  stage: test
  image: node:$NODE_VERSION
  script:
    - npm ci
    - npm test
  cache:
    paths:
      - node_modules/

build:
  stage: build
  image: node:$NODE_VERSION
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/
  cache:
    paths:
      - node_modules/

deploy:
  stage: deploy
  image: node:$NODE_VERSION
  script:
    - npm install -g serverless
    - serverless deploy --stage production
  environment:
    name: production
  only:
    - main`,
          },
        ],
      },
      conclusion: {
        title: "Conclusion",
        description:
          "This guide covered various deployment options for your Azura API. Choose the approach that best fits your project requirements and infrastructure preferences.",
        points: [
          "Traditional server deployment is simple but requires more manual maintenance.",
          "Docker deployment provides consistency across environments and easier scaling.",
          "Kubernetes deployment offers advanced orchestration for complex applications.",
          "Serverless deployment reduces infrastructure management but may have limitations for certain use cases.",
          "Always set up proper monitoring and logging for production deployments.",
          "Implement CI/CD pipelines to automate testing and deployment processes.",
        ],
      },
    },
    pt: {
      title: "Guia de Implantação",
      subtitle: "Aprenda como implantar sua API Azura em vários ambientes.",
      intro:
        "Este guia aborda como implantar sua API Azura em diferentes ambientes, incluindo servidores tradicionais, ambientes em contêineres e plataformas serverless.",
      preparation: {
        title: "Preparando para Implantação",
        description: "Antes de implantar sua API Azura, você deve preparar sua aplicação:",
        steps: [
          {
            title: "1. Configure variáveis de ambiente",
            description:
              "Use variáveis de ambiente para configuração em vez de codificar valores diretamente:",
            code: `// src/index.ts
import { AzuraServer } from '@atosjs/azura';

const app = new AzuraServer({
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  host: process.env.HOST || 'localhost'
});

// Configuração do banco de dados
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'azura_db'
};`,
          },
          {
            title: "2. Construa sua aplicação",
            description: "Compile seu código TypeScript para JavaScript:",
            code: `# Adicione script de build ao package.json
{
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js"
  }
}

# Execute o build
npm run build`,
          },
          {
            title: "3. Configure tratamento adequado de erros",
            description: "Garanta que sua aplicação trate erros adequadamente:",
            code: `// Manipulador global de erros
app.use((err, req, res, next) => {
  console.error('Erro:', err);
  
  // Não exponha stack traces em produção
  const error = process.env.NODE_ENV === 'production'
    ? { message: 'Erro Interno do Servidor' }
    : { message: err.message, stack: err.stack };
  
  res.status(500).json(error);
});`,
          },
          {
            title: "4. Configure logging",
            description: "Configure logging adequado para produção:",
            code: `// Configure logging baseado no ambiente
if (process.env.NODE_ENV === 'production') {
  // Logging de produção (ex: para um arquivo ou serviço)
  app.registerPlugin(logger, {
    level: 'info',
    format: 'json',
    destination: process.env.LOG_DESTINATION || 'stdout'
  });
} else {
  // Logging de desenvolvimento (mais detalhado)
  app.registerPlugin(logger, {
    level: 'debug',
    format: 'pretty',
    destination: 'stdout'
  });
}`,
          },
        ],
      },
      traditional: {
        title: "Implantação em Servidor Tradicional",
        description: "Implante sua API Azura em um servidor tradicional ou VPS:",
        steps: [
          {
            title: "1. Configure seu servidor",
            description: "Instale Node.js e outras dependências em seu servidor:",
            code: `# Atualize as listas de pacotes
sudo apt update

# Instale Node.js e npm
sudo apt install -y nodejs npm

# Instale PM2 globalmente (gerenciador de processos)
sudo npm install -g pm2`,
          },
          {
            title: "2. Transfira seu código",
            description: "Transfira seu código para o servidor usando SCP, Git ou outro método:",
            code: `# Usando SCP
scp -r ./dist package.json package-lock.json usuario@seu-servidor:/caminho/para/app

# Ou clone do Git
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo
npm install --production`,
          },
          {
            title: "3. Configure variáveis de ambiente",
            description: "Crie um arquivo .env ou defina variáveis de ambiente em seu servidor:",
            code: `# Crie arquivo .env
cat > .env << EOL
PORT=3000
NODE_ENV=production
DB_HOST=seu-host-db
DB_PORT=5432
DB_USER=seu-usuario-db
DB_PASSWORD=sua-senha-db
DB_NAME=seu-nome-db
EOL

# Ou defina variáveis de ambiente diretamente
export PORT=3000
export NODE_ENV=production
# ... outras variáveis`,
          },
          {
            title: "4. Inicie sua aplicação com PM2",
            description: "Use PM2 para gerenciar seu processo Node.js:",
            code: `# Inicie a aplicação
pm2 start dist/index.js --name "azura-api"

# Garanta que o PM2 inicie na inicialização do sistema
pm2 startup
pm2 save

# Monitore sua aplicação
pm2 monit

# Veja os logs
pm2 logs azura-api`,
          },
          {
            title: "5. Configure um proxy reverso (opcional)",
            description: "Use Nginx ou Apache como proxy reverso:",
            code: `# Exemplo de configuração Nginx
server {
    listen 80;
    server_name seu-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}`,
          },
        ],
      },
      docker: {
        title: "Implantação com Docker",
        description: "Implante sua API Azura usando Docker:",
        steps: [
          {
            title: "1. Crie um Dockerfile",
            description: "Crie um Dockerfile na raiz do seu projeto:",
            code: `FROM node:18-alpine

WORKDIR /app

# Copie arquivos de pacote e instale dependências
COPY package*.json ./
RUN npm install --production

# Copie aplicação construída
COPY dist/ ./dist/

# Defina variáveis de ambiente
ENV NODE_ENV=production
ENV PORT=3000

# Exponha a porta
EXPOSE 3000

# Inicie a aplicação
CMD ["node", "dist/index.js"]`,
          },
          {
            title: "2. Crie um arquivo .dockerignore",
            description: "Crie um arquivo .dockerignore para excluir arquivos desnecessários:",
            code: `node_modules
npm-debug.log
src
.git
.gitignore
.env
*.md`,
          },
          {
            title: "3. Construa e execute a imagem Docker",
            description: "Construa e execute seu contêiner Docker:",
            code: `# Construa a imagem Docker
docker build -t azura-api .

# Execute o contêiner
docker run -p 3000:3000 --env-file .env -d --name azura-api azura-api

# Veja os logs
docker logs -f azura-api`,
          },
          {
            title: "4. Usando Docker Compose (opcional)",
            description: "Crie um arquivo docker-compose.yml para configurações mais complexas:",
            code: `version: '3'

services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
      - DB_HOST=db
      - DB_PORT=5432
      - DB_USER=postgres
      - DB_PASSWORD=password
      - DB_NAME=azura_db
    depends_on:
      - db
    restart: always

  db:
    image: postgres:14
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=azura_db
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:`,
          },
          {
            title: "5. Implante com Docker Compose",
            description: "Implante sua aplicação usando Docker Compose:",
            code: `# Inicie os serviços
docker-compose up -d

# Veja os logs
docker-compose logs -f

# Pare os serviços
docker-compose down`,
          },
        ],
      },
      kubernetes: {
        title: "Implantação com Kubernetes",
        description: "Implante sua API Azura em um cluster Kubernetes:",
        steps: [
          {
            title: "1. Crie arquivo de deployment do Kubernetes",
            description: "Crie um arquivo deployment.yaml:",
            code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: azura-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: azura-api
  template:
    metadata:
      labels:
        app: azura-api
    spec:
      containers:
      - name: azura-api
        image: seu-registro/azura-api:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        - name: PORT
          value: "3000"
        - name: DB_HOST
          valueFrom:
            configMapKeyRef:
              name: azura-config
              key: db_host
        - name: DB_PORT
          valueFrom:
            configMapKeyRef:
              name: azura-config
              key: db_port
        - name: DB_USER
          valueFrom:
            secretKeyRef:
              name: azura-secrets
              key: db_user
        - name: DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: azura-secrets
              key: db_password
        - name: DB_NAME
          valueFrom:
            configMapKeyRef:
              name: azura-config
              key: db_name
        resources:
          limits:
            cpu: "500m"
            memory: "512Mi"
          requests:
            cpu: "100m"
            memory: "256Mi"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5`,
          },
          {
            title: "2. Crie arquivo de serviço do Kubernetes",
            description: "Crie um arquivo service.yaml:",
            code: `apiVersion: v1
kind: Service
metadata:
  name: azura-api
spec:
  selector:
    app: azura-api
  ports:
  - port: 80
    targetPort: 3000
  type: ClusterIP`,
          },
          {
            title: "3. Crie ConfigMap e Secret",
            description: "Crie configuração e segredos:",
            code: `# ConfigMap
apiVersion: v1
kind: ConfigMap
metadata:
  name: azura-config
data:
  db_host: "postgres-service"
  db_port: "5432"
  db_name: "azura_db"

---
# Secret
apiVersion: v1
kind: Secret
metadata:
  name: azura-secrets
type: Opaque
data:
  db_user: cG9zdGdyZXM=  # "postgres" codificado em base64
  db_password: cGFzc3dvcmQ=  # "password" codificado em base64`,
          },
          {
            title: "4. Aplique configurações do Kubernetes",
            description: "Implante sua aplicação no Kubernetes:",
            code: `# Aplique ConfigMap e Secret
kubectl apply -f configmap.yaml
kubectl apply -f secret.yaml

# Aplique Deployment e Service
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml

# Verifique o status do deployment
kubectl get deployments
kubectl get pods
kubectl get services`,
          },
          {
            title: "5. Configure Ingress (opcional)",
            description: "Crie um recurso Ingress para acesso externo:",
            code: `apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: azura-api-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
  - host: api.seu-dominio.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: azura-api
            port:
              number: 80`,
          },
        ],
      },
      serverless: {
        title: "Implantação Serverless",
        description: "Implante sua API Azura em plataformas serverless:",
        platforms: [
          {
            name: "Vercel",
            description: "Implante no Vercel:",
            steps: [
              {
                title: "1. Crie um arquivo vercel.json",
                description: "Crie um arquivo de configuração para o Vercel:",
                code: `{
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
}`,
              },
              {
                title: "2. Implante no Vercel",
                description: "Implante usando a CLI do Vercel:",
                code: `# Instale a CLI do Vercel
npm install -g vercel

# Implante
vercel

# Para implantação em produção
vercel --prod`,
              },
            ],
          },
          {
            name: "AWS Lambda",
            description: "Implante no AWS Lambda com API Gateway:",
            steps: [
              {
                title: "1. Instale o Serverless Framework",
                description: "Instale o Serverless Framework:",
                code: `npm install -g serverless`,
              },
              {
                title: "2. Crie um arquivo serverless.yml",
                description: "Crie um arquivo de configuração para o Serverless Framework:",
                code: `service: azura-api

provider:
  name: aws
  runtime: nodejs18.x
  stage: \${opt:stage, 'dev'}
  region: \${opt:region, 'us-east-1'}
  environment:
    NODE_ENV: production
    DB_HOST: \${env:DB_HOST}
    DB_PORT: \${env:DB_PORT}
    DB_USER: \${env:DB_USER}
    DB_PASSWORD: \${env:DB_PASSWORD}
    DB_NAME: \${env:DB_NAME}

functions:
  api:
    handler: dist/lambda.handler
    events:
      - http:
          path: /{proxy+}
          method: any
          cors: true

plugins:
  - serverless-offline`,
              },
              {
                title: "3. Crie um manipulador Lambda",
                description: "Crie um arquivo manipulador Lambda (src/lambda.ts):",
                code: `// src/lambda.ts
import { AzuraServer } from '@atosjs/azura';
import serverless from 'serverless-http';

// Importe seus controladores
import { UserController } from './controllers/user.controller';

// Crie o servidor Azura
const app = new AzuraServer();

// Registre controladores
app.load([UserController]);

// Crie o manipulador serverless
export const handler = serverless(app.server);`,
              },
              {
                title: "4. Implante na AWS",
                description: "Implante usando o Serverless Framework:",
                code: `# Implante na AWS
serverless deploy

# Para um estágio específico
serverless deploy --stage production`,
              },
            ],
          },
        ],
      },
      monitoring: {
        title: "Monitoramento e Logging",
        description: "Configure monitoramento e logging para sua API implantada:",
        options: [
          {
            title: "Logging de Aplicação",
            description: "Configure logging adequado em sua aplicação:",
            code: `// Configure middleware de logging
app.use((req, res, next) => {
  const start = Date.now();
  
  // Adicione um listener para quando a resposta terminar
  res.on('finish', () => {
    const duration = Date.now() - start;
    const log = {
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration: \`\${duration}ms\`,
      userAgent: req.get('user-agent'),
      ip: req.ip
    };
    
    console.log(JSON.stringify(log));
  });
  
  next();
});`,
          },
          {
            title: "Endpoint de Verificação de Saúde",
            description: "Adicione um endpoint de verificação de saúde à sua API:",
            code: `// Endpoint de verificação de saúde
app.get('/health', (req, res) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now()
  };
  
  try {
    // Verifique a conexão com o banco de dados
    const dbConnected = db.isConnected();
    
    if (!dbConnected) {
      healthcheck.message = 'Falha na conexão com o banco de dados';
      return res.status(503).json(healthcheck);
    }
    
    res.status(200).json(healthcheck);
  } catch (error) {
    healthcheck.message = error.message;
    res.status(503).json(healthcheck);
  }
});`,
          },
          {
            title: "Endpoint de Métricas",
            description: "Adicione um endpoint de métricas para monitoramento:",
            code: `// Endpoint de métricas
app.get('/metrics', (req, res) => {
  const metrics = {
    memory: process.memoryUsage(),
    cpu: process.cpuUsage(),
    uptime: process.uptime(),
    requests: {
      total: requestCounter.total,
      success: requestCounter.success,
      error: requestCounter.error
    },
    responseTime: {
      average: calculateAverageResponseTime(),
      p95: calculateP95ResponseTime()
    }
  };
  
  res.status(200).json(metrics);
});`,
          },
          {
            title: "Monitoramento de Terceiros",
            description: "Integre com serviços de monitoramento de terceiros:",
            code: `// Exemplo de integração com um serviço de monitoramento
import { monitor } from 'monitoring-service';

// Inicialize o monitoramento
monitor.init({
  apiKey: process.env.MONITORING_API_KEY,
  serviceName: 'azura-api',
  environment: process.env.NODE_ENV
});

// Rastreie requisições
app.use((req, res, next) => {
  const transaction = monitor.startTransaction(\`\${req.method} \${req.path}\`);
  
  res.on('finish', () => {
    transaction.result = res.statusCode < 400 ? 'success' : 'error';
    transaction.end();
  });
  
  next();
});

// Rastreie erros
app.use((err, req, res, next) => {
  monitor.captureError(err);
  next(err);
});`,
          },
        ],
      },
      cicd: {
        title: "Pipeline de CI/CD",
        description: "Configure um pipeline de integração e implantação contínua:",
        examples: [
          {
            title: "GitHub Actions",
            description:
              "Crie um arquivo de fluxo de trabalho do GitHub Actions (.github/workflows/deploy.yml):",
            code: `name: Implantar API Azura

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Configurar Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Instalar dependências
      run: npm ci
    
    - name: Executar testes
      run: npm test
    
    - name: Build
      run: npm run build
    
    - name: Deploy to production
      if: success()
      run: |
        # Deploy to your server or cloud platform
        # Example for Vercel
        npm install -g vercel
        vercel --prod --token \${{ secrets.VERCEL_TOKEN }}
      env:
        VERCEL_TOKEN: \${{ secrets.VERCEL_TOKEN }}
        VERCEL_PROJECT_ID: \${{ secrets.VERCEL_PROJECT_ID }}
        VERCEL_ORG_ID: \${{ secrets.VERCEL_ORG_ID }}`,
          },
          {
            title: "GitLab CI/CD",
            description: "Crie um arquivo de configuração GitLab CI/CD (.gitlab-ci.yml):",
            code: `stages:
  - test
  - build
  - deploy

variables:
  NODE_VERSION: "18"

test:
  stage: test
  image: node:$NODE_VERSION
  script:
    - npm ci
    - npm test
  cache:
    paths:
      - node_modules/

build:
  stage: build
  image: node:$NODE_VERSION
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/
  cache:
    paths:
      - node_modules/

deploy:
  stage: deploy
  image: node:$NODE_VERSION
  script:
    - npm install -g serverless
    - serverless deploy --stage production
  environment:
    name: production
  only:
    - main`,
          },
        ],
      },
      conclusion: {
        title: "Conclusão",
        description:
          "Este guia abordou várias opções de implantação para sua API Azura. Escolha a abordagem que melhor se adapta aos requisitos do seu projeto e preferências de infraestrutura.",
        points: [
          "A implantação em servidor tradicional é simples, mas requer mais manutenção manual.",
          "A implantação com Docker fornece consistência entre ambientes e facilita a escalabilidade.",
          "A implantação com Kubernetes oferece orquestração avançada para aplicações complexas.",
          "A implantação serverless reduz o gerenciamento de infraestrutura, mas pode ter limitações para certos casos de uso.",
          "Sempre configure monitoramento e logging adequados para implantações em produção.",
          "Implemente pipelines de CI/CD para automatizar processos de teste e implantação.",
        ],
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

      {/* Preparation */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">{c.preparation.title}</h2>
        <p>{c.preparation.description}</p>

        {c.preparation.steps.map((step, index) => (
          <div key={index} className="space-y-4">
            <h3 className="text-xl font-semibold">{step.title}</h3>
            <p>{step.description}</p>
            <CodeBlock language="typescript">{step.code}</CodeBlock>
          </div>
        ))}
      </div>

      {/* Traditional Server Deployment */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">{c.traditional.title}</h2>
        <p>{c.traditional.description}</p>

        {c.traditional.steps.map((step, index) => (
          <div key={index} className="space-y-4">
            <h3 className="text-xl font-semibold">{step.title}</h3>
            <p>{step.description}</p>
            <CodeBlock language="bash">{step.code}</CodeBlock>
          </div>
        ))}
      </div>

      {/* Docker Deployment */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">{c.docker.title}</h2>
        <p>{c.docker.description}</p>

        {c.docker.steps.map((step, index) => (
          <div key={index} className="space-y-4">
            <h3 className="text-xl font-semibold">{step.title}</h3>
            <p>{step.description}</p>
            <CodeBlock language={step.title.includes("Dockerfile") ? "dockerfile" : "bash"}>
              {step.code}
            </CodeBlock>
          </div>
        ))}
      </div>

      {/* Kubernetes Deployment */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">{c.kubernetes.title}</h2>
        <p>{c.kubernetes.description}</p>

        {c.kubernetes.steps.map((step, index) => (
          <div key={index} className="space-y-4">
            <h3 className="text-xl font-semibold">{step.title}</h3>
            <p>{step.description}</p>
            <CodeBlock language="yaml">{step.code}</CodeBlock>
          </div>
        ))}
      </div>

      {/* Serverless Deployment */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">{c.serverless.title}</h2>
        <p>{c.serverless.description}</p>

        {c.serverless.platforms.map((platform, platformIndex) => (
          <div key={platformIndex} className="space-y-4">
            <h3 className="text-xl font-semibold">{platform.name}</h3>
            <p>{platform.description}</p>

            {platform.steps.map((step, stepIndex) => (
              <div key={stepIndex} className="space-y-2 ml-4">
                <h4 className="text-lg font-medium">{step.title}</h4>
                <p>{step.description}</p>
                <CodeBlock
                  language={
                    step.title.includes("serverless.yml")
                      ? "yaml"
                      : step.title.includes("Lambda")
                      ? "typescript"
                      : "bash"
                  }
                >
                  {step.code}
                </CodeBlock>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Monitoring and Logging */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">{c.monitoring.title}</h2>
        <p>{c.monitoring.description}</p>

        {c.monitoring.options.map((option, index) => (
          <div key={index} className="space-y-4">
            <h3 className="text-xl font-semibold">{option.title}</h3>
            <p>{option.description}</p>
            <CodeBlock language="typescript">{option.code}</CodeBlock>
          </div>
        ))}
      </div>

      {/* CI/CD Pipeline */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">{c.cicd.title}</h2>
        <p>{c.cicd.description}</p>

        {c.cicd.examples.map((example, index) => (
          <div key={index} className="space-y-4">
            <h3 className="text-xl font-semibold">{example.title}</h3>
            <p>{example.description}</p>
            <CodeBlock language="yaml">{example.code}</CodeBlock>
          </div>
        ))}
      </div>

      {/* Conclusion */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">{c.conclusion.title}</h2>
        <p>{c.conclusion.description}</p>

        <ul className="ml-6 space-y-2 list-disc">
          {c.conclusion.points.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
