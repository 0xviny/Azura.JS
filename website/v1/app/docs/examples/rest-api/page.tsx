import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ChevronRight, Github } from "lucide-react"
import { CodeDemo } from "@/components/code-demo"
import { DocSidebar } from "@/components/doc-sidebar"
import { TableOfContents } from "@/components/table-of-contents"

export default function RestApiPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <div className="container max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar */}
          <DocSidebar className="w-full lg:w-64 shrink-0" />

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-10">
              <div>
                <Link href="/docs" className="inline-flex mb-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-purple-700/50 text-white hover:bg-purple-950/20"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para Documentação
                  </Button>
                </Link>

                <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                  <Link href="/docs" className="hover:text-purple-400 transition-colors">
                    Docs
                  </Link>
                  <ChevronRight className="h-4 w-4" />
                  <Link href="/docs/examples" className="hover:text-purple-400 transition-colors">
                    Exemplos
                  </Link>
                  <ChevronRight className="h-4 w-4" />
                  <span className="text-gray-300">API REST</span>
                </div>

                <Badge className="mb-4 bg-purple-900/30 text-purple-300 hover:bg-purple-900/40 transition-colors">
                  Exemplo
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">API REST</h1>
                <p className="text-xl text-gray-300 max-w-3xl">
                  Aprenda como construir uma API REST completa com CRUD usando o Azura.
                </p>
              </div>

              <div className="flex gap-3">
                {/* <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-purple-700/50 text-white hover:bg-purple-950/20 transition-all duration-300"
                >
                  <a
                    href="https://github.com/0xviny/Azura.JS/edit/main/docs/examples/rest-api.md"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Editar esta página
                  </a>
                </Button> */}
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-purple-700/50 text-white hover:bg-purple-950/20 transition-all duration-300"
                >
                  <a href="https://github.com/0xviny/Azura.JS" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" /> Ver no GitHub
                  </a>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-10">
              <div className="prose prose-invert max-w-none prose-headings:scroll-mt-20 prose-pre:bg-gray-950 prose-pre:border prose-pre:border-purple-900/20">
                <h2 id="introduction">Introdução</h2>
                <p>
                  Uma API REST (Representational State Transfer) é um estilo de arquitetura para projetar aplicações em
                  rede. As APIs REST usam métodos HTTP padrão (GET, POST, PUT, DELETE) para realizar operações CRUD
                  (Create, Read, Update, Delete) em recursos.
                </p>
                <p>
                  O Azura facilita a criação de APIs REST com sua sintaxe intuitiva e suporte completo para todos os
                  métodos HTTP. Neste guia, vamos construir uma API REST completa para gerenciar uma coleção de
                  produtos.
                </p>

                <h2 id="project-setup">Configuração do Projeto</h2>
                <p>
                  Primeiro, vamos configurar um novo projeto Azura. Certifique-se de ter o Azura instalado conforme
                  descrito na página de{" "}
                  <Link href="/docs/guides/installation" className="text-purple-400 hover:text-purple-300">
                    Instalação
                  </Link>
                  .
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="bash"
                    code={`mkdir product-api
cd product-api
npm init -y
npm install @atosjs/azura
npm install typescript ts-node-dev @types/node --save-dev
npx tsc --init`}
                    showLineNumbers={false}
                  />
                </div>

                <p>Crie uma estrutura básica de diretórios para o projeto:</p>

                <div className="not-prose">
                  <CodeDemo
                    language="bash"
                    code={`mkdir -p src/controllers src/services src/models`}
                    showLineNumbers={false}
                  />
                </div>

                <h2 id="data-model">Modelo de Dados</h2>
                <p>
                  Vamos começar definindo nosso modelo de produto. Crie um arquivo chamado{" "}
                  <code>src/models/Product.ts</code>:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`// src/models/Product.ts
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}`}
                  />
                </div>

                <h2 id="service-layer">Camada de Serviço</h2>
                <p>
                  Em seguida, vamos criar um serviço para gerenciar as operações relacionadas aos produtos. Crie um
                  arquivo chamado <code>src/services/ProductService.ts</code>:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`// src/services/ProductService.ts
import { Product } from '../models/Product';

export class ProductService {
  private products: Product[] = [];

  constructor() {
    // Adiciona alguns produtos de exemplo
    this.products = [
      {
        id: '1',
        name: 'Smartphone',
        description: 'Um smartphone de última geração',
        price: 1299.99,
        stock: 50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        name: 'Notebook',
        description: 'Notebook leve e potente',
        price: 4500.00,
        stock: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
  }

  async findAll(): Promise<Product[]> {
    return this.products;
  }

  async findById(id: string): Promise<Product | null> {
    const product = this.products.find(p => p.id === id);
    return product || null;
  }

  async create(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    const newProduct: Product = {
      id: Date.now().toString(),
      ...productData,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.products.push(newProduct);
    return newProduct;
  }

  async update(id: string, productData: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Product | null> {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) return null;

    this.products[index] = {
      ...this.products[index],
      ...productData,
      updatedAt: new Date()
    };

    return this.products[index];
  }

  async delete(id: string): Promise<boolean> {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) return false;

    this.products.splice(index, 1);
    return true;
  }
}`}
                  />
                </div>

                <h2 id="controller-layer">Camada de Controller</h2>
                <p>
                  Agora, vamos criar um controller para lidar com as requisições HTTP. Crie um arquivo chamado{" "}
                  <code>src/controllers/ProductController.ts</code>:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`// src/controllers/ProductController.ts
import { Controller, Get, Post, Put, Delete } from '@atosjs/azura';
import { ProductService } from '../services/ProductService';

@Controller('/api/products')
export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  @Get('/')
  async getAllProducts(req, res) {
    try {
      const products = await this.productService.findAll();
      res.json({
        success: true,
        data: products
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao buscar produtos',
        details: error.message
      });
    }
  }

  @Get('/:id')
  async getProductById(req, res) {
    try {
      const product = await this.productService.findById(req.params.id);
      
      if (!product) {
        return res.status(404).json({
          success: false,
          error: 'Produto não encontrado'
        });
      }

      res.json({
        success: true,
        data: product
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao buscar produto',
        details: error.message
      });
    }
  }

  @Post('/')
  async createProduct(req, res) {
    try {
      // Validação básica
      const { name, description, price, stock } = req.body;
      
      if (!name || !description || typeof price !== 'number' || typeof stock !== 'number') {
        return res.status(400).json({
          success: false,
          error: 'Dados inválidos',
          details: 'Campos obrigatórios: name (string), description (string), price (number), stock (number)'
        });
      }

      const newProduct = await this.productService.create({ name, description, price, stock });
      
      res.status(201).json({
        success: true,
        data: newProduct
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao criar produto',
        details: error.message
      });
    }
  }

  @Put('/:id')
  async updateProduct(req, res) {
    try {
      const productId = req.params.id;
      const updates = req.body;
      
      // Validação básica
      if (Object.keys(updates).length === 0) {
        return res.status(400).json({
          success: false,
          error: 'Nenhum dado fornecido para atualização'
        });
      }

      const updatedProduct = await this.productService.update(productId, updates);
      
      if (!updatedProduct) {
        return res.status(404).json({
          success: false,
          error: 'Produto não encontrado'
        });
      }

      res.json({
        success: true,
        data: updatedProduct
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao atualizar produto',
        details: error.message
      });
    }
  }

  @Delete('/:id')
  async deleteProduct(req, res) {
    try {
      const productId = req.params.id;
      const deleted = await this.productService.delete(productId);
      
      if (!deleted) {
        return res.status(404).json({
          success: false,
          error: 'Produto não encontrado'
        });
      }

      res.json({
        success: true,
        message: \`Produto \${productId} excluído com sucesso\`
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao excluir produto',
        details: error.message
      });
    }
  }
}`}
                  />
                </div>

                <h2 id="server-setup">Configuração do Servidor</h2>
                <p>
                  Agora, vamos configurar nosso servidor principal. Crie um arquivo chamado <code>src/index.ts</code>:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`// src/index.ts
import { AzuraServer } from '@atosjs/azura';
import { ProductController } from './controllers/ProductController';

async function bootstrap() {
  const app = new AzuraServer({
    port: parseInt(process.env.PORT || '3000')
  });

  // Middleware para processar JSON
  app.use((req, res, next) => {
    if (req.headers['content-type'] === 'application/json') {
      let data = '';
      req.on('data', chunk => {
        data += chunk;
      });
      req.on('end', () => {
        try {
          req.body = JSON.parse(data);
          next();
        } catch (e) {
          res.status(400).json({ success: false, error: 'JSON inválido' });
        }
      });
    } else {
      next();
    }
  });

  // Carrega o controller de produtos
  app.load([ProductController]);

  // Middleware para rotas não encontradas
  app.use((req, res) => {
    res.status(404).json({
      success: false,
      error: 'Rota não encontrada'
    });
  });

  // Inicia o servidor
  app.listen(() => {
    console.log(\`Servidor rodando na porta \${app.getPort()}\`);
    console.log(\`API disponível em http://localhost:\${app.getPort()}/api/products\`);
  });
}

bootstrap().catch(console.error);`}
                  />
                </div>

                <p>
                  Adicione os scripts necessários ao seu <code>package.json</code>:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="json"
                    code={`{
  "scripts": {
    "start": "node dist/index.js",
    "dev": "ts-node-dev --respawn src/index.ts",
    "build": "tsc"
  }
}`}
                    showLineNumbers={false}
                  />
                </div>

                <h2 id="running-api">Executando a API</h2>
                <p>Agora você pode iniciar sua API REST:</p>

                <div className="not-prose">
                  <CodeDemo language="bash" code={`npm run dev`} showLineNumbers={false} />
                </div>

                <h2 id="testing-api">Testando a API</h2>
                <p>Vamos testar nossa API usando cURL ou qualquer cliente HTTP como Postman ou Insomnia.</p>

                <h3 id="get-all-products">Listar todos os produtos</h3>

                <div className="not-prose">
                  <CodeDemo
                    language="bash"
                    code={`curl -X GET http://localhost:3000/api/products`}
                    showLineNumbers={false}
                  />
                </div>

                <h3 id="get-product-by-id">Buscar um produto por ID</h3>

                <div className="not-prose">
                  <CodeDemo
                    language="bash"
                    code={`curl -X GET http://localhost:3000/api/products/1`}
                    showLineNumbers={false}
                  />
                </div>

                <h3 id="create-product">Criar um novo produto</h3>

                <div className="not-prose">
                  <CodeDemo
                    language="bash"
                    code={`curl -X POST http://localhost:3000/api/products \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Monitor",
    "description": "Monitor 27 polegadas 4K",
    "price": 2500.00,
    "stock": 15
  }'`}
                    showLineNumbers={false}
                  />
                </div>

                <h3 id="update-product">Atualizar um produto</h3>

                <div className="not-prose">
                  <CodeDemo
                    language="bash"
                    code={`curl -X PUT http://localhost:3000/api/products/1 \\
  -H "Content-Type: application/json" \\
  -d '{
    "price": 1199.99,
    "stock": 45
  }'`}
                    showLineNumbers={false}
                  />
                </div>

                <h3 id="delete-product">Excluir um produto</h3>

                <div className="not-prose">
                  <CodeDemo
                    language="bash"
                    code={`curl -X DELETE http://localhost:3000/api/products/1`}
                    showLineNumbers={false}
                  />
                </div>

                <h2 id="advanced-features">Recursos Avançados</h2>

                <h3 id="pagination">Paginação</h3>
                <p>
                  Para APIs que retornam muitos recursos, é uma boa prática implementar paginação. Vamos adicionar
                  suporte para paginação no método <code>findAll</code> do nosso serviço:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`// Adicione este método ao ProductService
async findAllPaginated(page: number = 1, limit: number = 10): Promise<{ products: Product[], total: number, page: number, totalPages: number }> {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedProducts = this.products.slice(startIndex, endIndex);
  
  return {
    products: paginatedProducts,
    total: this.products.length,
    page,
    totalPages: Math.ceil(this.products.length / limit)
  };
}

// E modifique o método getAllProducts no ProductController
@Get('/')
async getAllProducts(req, res) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const result = await this.productService.findAllPaginated(page, limit);
    
    res.json({
      success: true,
      data: result.products,
      pagination: {
        page: result.page,
        limit,
        total: result.total,
        totalPages: result.totalPages
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erro ao buscar produtos',
      details: error.message
    });
  }
}`}
                  />
                </div>

                <h3 id="filtering">Filtragem</h3>
                <p>Vamos adicionar suporte para filtragem de produtos por nome ou preço:</p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`// Adicione este método ao ProductService
async findWithFilters(filters: { name?: string, minPrice?: number, maxPrice?: number }): Promise<Product[]> {
  return this.products.filter(product => {
    // Filtrar por nome (case insensitive)
    if (filters.name && !product.name.toLowerCase().includes(filters.name.toLowerCase())) {
      return false;
    }
    
    // Filtrar por preço mínimo
    if (filters.minPrice !== undefined && product.price < filters.minPrice) {
      return false;
    }
    
    // Filtrar por preço máximo
    if (filters.maxPrice !== undefined && product.price > filters.maxPrice) {
      return false;
    }
    
    return true;
  });
}

// E adicione um novo endpoint no ProductController
@Get('/search')
async searchProducts(req, res) {
  try {
    const name = req.query.name as string;
    const minPrice = req.query.minPrice ? parseFloat(req.query.minPrice as string) : undefined;
    const maxPrice = req.query.maxPrice ? parseFloat(req.query.maxPrice as string) : undefined;
    
    const filteredProducts = await this.productService.findWithFilters({ name, minPrice, maxPrice });
    
    res.json({
      success: true,
      data: filteredProducts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erro ao buscar produtos',
      details: error.message
    });
  }
}`}
                  />
                </div>

                <h3 id="validation">Validação Robusta</h3>
                <p>
                  Para uma API em produção, você deve implementar uma validação mais robusta. Você pode usar bibliotecas
                  como Joi ou class-validator:
                </p>

                <div className="not-prose">
                  <CodeDemo language="bash" code={`npm install joi`} showLineNumbers={false} />
                </div>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`// Middleware de validação usando Joi
import Joi from 'joi';

export function validateSchema(schema: Joi.Schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        success: false,
        error: 'Dados inválidos',
        details: error.details.map(detail => detail.message)
      });
    }
    
    next();
  };
}

// Schema para validação de produto
const productSchema = Joi.object({
  name: Joi.string().required().min(3).max(100),
  description: Joi.string().required().min(10).max(500),
  price: Joi.number().required().min(0),
  stock: Joi.number().required().min(0).integer()
});

// Uso no controller
@Post('/')
@UseMiddleware(validateSchema(productSchema))
async createProduct(req, res) {
  try {
    const newProduct = await this.productService.create(req.body);
    
    res.status(201).json({
      success: true,
      data: newProduct
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erro ao criar produto',
      details: error.message
    });
  }
}`}
                  />
                </div>

                <h2 id="best-practices">Melhores Práticas</h2>
                <p>Ao desenvolver APIs REST com Azura, considere as seguintes melhores práticas:</p>

                <ul>
                  <li>Use métodos HTTP apropriados para cada operação (GET, POST, PUT, DELETE)</li>
                  <li>Implemente validação robusta para todas as entradas do usuário</li>
                  <li>Use códigos de status HTTP adequados para diferentes situações</li>
                  <li>Forneça mensagens de erro claras e informativas</li>
                  <li>Implemente paginação para endpoints que retornam muitos recursos</li>
                  <li>Use autenticação e autorização para proteger endpoints sensíveis</li>
                  <li>Documente sua API usando ferramentas como Swagger ou OpenAPI</li>
                  <li>Implemente rate limiting para prevenir abusos</li>
                  <li>Use CORS para controlar o acesso à sua API</li>
                  <li>Adicione logging para depuração e monitoramento</li>
                </ul>

                <h2 id="next-steps">Próximos Passos</h2>
                <p>Agora que você tem uma API REST básica funcionando, você pode:</p>

                <ul>
                  <li>
                    <Link href="/docs/examples/authentication" className="text-purple-400 hover:text-purple-300">
                      Adicionar autenticação
                    </Link>{" "}
                    à sua API
                  </li>
                  <li>
                    <Link href="/docs/examples/database" className="text-purple-400 hover:text-purple-300">
                      Conectar a um banco de dados real
                    </Link>{" "}
                    como MongoDB ou PostgreSQL
                  </li>
                  <li>
                    <Link href="/docs/guides/deployment" className="text-purple-400 hover:text-purple-300">
                      Implantar sua API
                    </Link>{" "}
                    em um ambiente de produção
                  </li>
                  <li>
                    <Link href="/docs/examples/validation" className="text-purple-400 hover:text-purple-300">
                      Implementar validação avançada
                    </Link>{" "}
                    usando bibliotecas como Joi ou class-validator
                  </li>
                </ul>
              </div>

              <div className="hidden lg:block">
                <div className="sticky top-16">
                  <TableOfContents
                    items={[
                      { id: "introduction", title: "Introdução", level: 2 },
                      { id: "project-setup", title: "Configuração do Projeto", level: 2 },
                      { id: "data-model", title: "Modelo de Dados", level: 2 },
                      { id: "service-layer", title: "Camada de Serviço", level: 2 },
                      { id: "controller-layer", title: "Camada de Controller", level: 2 },
                      { id: "server-setup", title: "Configuração do Servidor", level: 2 },
                      { id: "running-api", title: "Executando a API", level: 2 },
                      { id: "testing-api", title: "Testando a API", level: 2 },
                      { id: "get-all-products", title: "Listar todos os produtos", level: 3 },
                      { id: "get-product-by-id", title: "Buscar um produto por ID", level: 3 },
                      { id: "create-product", title: "Criar um novo produto", level: 3 },
                      { id: "update-product", title: "Atualizar um produto", level: 3 },
                      { id: "delete-product", title: "Excluir um produto", level: 3 },
                      { id: "advanced-features", title: "Recursos Avançados", level: 2 },
                      { id: "pagination", title: "Paginação", level: 3 },
                      { id: "filtering", title: "Filtragem", level: 3 },
                      { id: "validation", title: "Validação Robusta", level: 3 },
                      { id: "best-practices", title: "Melhores Práticas", level: 2 },
                      { id: "next-steps", title: "Próximos Passos", level: 2 },
                    ]}
                  />
                </div>
              </div>
            </div>

            <div className="mt-16 border-t border-gray-800 pt-8 flex items-center justify-between">
              <Link href="/docs/api/plugins" className="text-purple-400 hover:text-purple-300 transition-colors">
                ← Plugins
              </Link>
              <Link
                href="/docs/examples/authentication"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                Autenticação →
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
