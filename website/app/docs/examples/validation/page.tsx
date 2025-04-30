import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ChevronRight, Github } from "lucide-react"
import { CodeDemo } from "@/components/code-demo"
import { DocSidebar } from "@/components/doc-sidebar"
import { TableOfContents } from "@/components/table-of-contents"

export default function ValidationPage() {
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
                  <span className="text-gray-300">Validação</span>
                </div>

                <Badge className="mb-4 bg-purple-900/30 text-purple-300 hover:bg-purple-900/40 transition-colors">
                  Exemplo
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Validação</h1>
                <p className="text-xl text-gray-300 max-w-3xl">
                  Aprenda como implementar validação de dados em suas aplicações Azura para garantir a integridade e
                  segurança dos dados.
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
                    href="https://github.com/0xviny/AzuraV2/edit/main/docs/examples/validation.md"
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
                  <a href="https://github.com/0xviny/AzuraV2" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" /> Ver no GitHub
                  </a>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-10">
              <div className="prose prose-invert max-w-none prose-headings:scroll-mt-20 prose-pre:bg-gray-950 prose-pre:border prose-pre:border-purple-900/20">
                <h2 id="introduction">Introdução</h2>
                <p>
                  A validação de dados é uma parte crucial de qualquer aplicação web. Ela garante que os dados recebidos
                  pelo servidor estejam no formato correto e atendam aos requisitos da aplicação antes de serem
                  processados ou armazenados.
                </p>
                <p>
                  O Azura oferece várias maneiras de implementar validação de dados, desde abordagens manuais até o uso
                  de bibliotecas populares como Joi e class-validator. Neste guia, vamos explorar diferentes estratégias
                  de validação e como implementá-las em sua aplicação Azura.
                </p>

                <h2 id="validation-approaches">Abordagens de Validação</h2>
                <p>Existem várias abordagens para validar dados em uma aplicação Azura:</p>

                <ul>
                  <li>
                    <strong>Validação manual</strong>: Escrever código de validação personalizado diretamente em seus
                    controllers ou serviços.
                  </li>
                  <li>
                    <strong>Middlewares de validação</strong>: Criar middlewares reutilizáveis para validar requisições
                    antes que elas cheguem aos controllers.
                  </li>
                  <li>
                    <strong>Bibliotecas de validação</strong>: Usar bibliotecas como Joi ou class-validator para
                    simplificar a validação com esquemas declarativos.
                  </li>
                  <li>
                    <strong>Decorators de validação</strong>: Usar decorators para definir regras de validação
                    diretamente em seus modelos (com TypeScript).
                  </li>
                </ul>

                <p>Vamos explorar cada uma dessas abordagens com exemplos práticos.</p>

                <h2 id="manual-validation">Validação Manual</h2>
                <p>
                  A validação manual é a abordagem mais simples, onde você escreve código de validação diretamente em
                  seus controllers ou serviços. Embora seja mais trabalhosa, ela oferece total controle sobre o processo
                  de validação.
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`// src/controllers/UserController.ts
import { Controller, Post } from '@atosjs/azura';
import { UserService } from '../services/UserService';

@Controller('/api/users')
export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  @Post('/')
  async createUser(req, res) {
    try {
      const { username, email, password, age } = req.body;
      
      // Validação manual
      const errors = [];
      
      if (!username || typeof username !== 'string') {
        errors.push('Username é obrigatório e deve ser uma string');
      } else if (username.length < 3 || username.length > 20) {
        errors.push('Username deve ter entre 3 e 20 caracteres');
      }
      
      if (!email || typeof email !== 'string') {
        errors.push('Email é obrigatório e deve ser uma string');
      } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
        errors.push('Email inválido');
      }
      
      if (!password || typeof password !== 'string') {
        errors.push('Senha é obrigatória e deve ser uma string');
      } else if (password.length < 6) {
        errors.push('Senha deve ter pelo menos 6 caracteres');
      }
      
      if (age !== undefined) {
        if (typeof age !== 'number') {
          errors.push('Idade deve ser um número');
        } else if (age < 18 || age > 120) {
          errors.push('Idade deve estar entre 18 e 120');
        }
      }
      
      // Se houver erros, retorna uma resposta de erro
      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          error: 'Dados inválidos',
          details: errors
        });
      }
      
      // Se a validação passar, cria o usuário
      const newUser = await this.userService.createUser({
        username,
        email,
        password,
        age
      });
      
      res.status(201).json({
        success: true,
        data: newUser
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}`}
                  />
                </div>

                <p>
                  Embora a validação manual funcione, ela pode se tornar repetitiva e difícil de manter à medida que sua
                  aplicação cresce. Vamos explorar abordagens mais escaláveis.
                </p>

                <h2 id="validation-middleware">Middleware de Validação</h2>
                <p>
                  Uma abordagem mais modular é criar middlewares de validação reutilizáveis. Isso permite separar a
                  lógica de validação da lógica de negócios em seus controllers.
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`// src/middlewares/validation.ts
import { Request, Response, NextFunction } from '@atosjs/azura';

// Função de validação genérica
export function validate(schema: Record<string, (value: any) => boolean | string>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors = [];
    
    for (const [field, validator] of Object.entries(schema)) {
      const value = req.body[field];
      const result = validator(value);
      
      if (typeof result === 'string') {
        errors.push(result);
      }
    }
    
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Dados inválidos',
        details: errors
      });
    }
    
    next();
  };
}

// Validadores reutilizáveis
export const validators = {
  required: (field: string) => (value: any) => {
    return value !== undefined && value !== null && value !== '' 
      ? true 
      : \`\${field} é obrigatório\`;
  },
  
  string: (field: string) => (value: any) => {
    return value === undefined || typeof value === 'string' 
      ? true 
      : \`\${field} deve ser uma string\`;
  },
  
  minLength: (field: string, min: number) => (value: any) => {
    return value === undefined || (typeof value === 'string' && value.length >= min) 
      ? true 
      : \`\${field} deve ter pelo menos \${min} caracteres\`;
  },
  
  maxLength: (field: string, max: number) => (value: any) => {
    return value === undefined || (typeof value === 'string' && value.length <= max) 
      ? true 
      : \`\${field} deve ter no máximo \${max} caracteres\`;
  },
  
  email: (field: string) => (value: any) => {
    return value === undefined || (typeof value === 'string' && /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value)) 
      ? true 
      : \`\${field} deve ser um email válido\`;
  },
  
  number: (field: string) => (value: any) => {
    return value === undefined || typeof value === 'number' 
      ? true 
      : \`\${field} deve ser um número\`;
  },
  
  min: (field: string, min: number) => (value: any) => {
    return value === undefined || (typeof value === 'number' && value >= min) 
      ? true 
      : \`\${field} deve ser pelo menos \${min}\`;
  },
  
  max: (field: string, max: number) => (value: any) => {
    return value === undefined || (typeof value === 'number' && value <= max) 
      ? true 
      : \`\${field} deve ser no máximo \${max}\`;
  }
};`}
                  />
                </div>

                <p>Agora, podemos usar esses validadores em nossos controllers:</p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`// src/controllers/UserController.ts
import { Controller, Post, UseMiddleware } from '@atosjs/azura';
import { UserService } from '../services/UserService';
import { validate, validators } from '../middlewares/validation';

const { required, string, minLength, maxLength, email, number, min, max } = validators;

// Esquema de validação para criação de usuário
const createUserSchema = {
  username: (value: any) => {
    const checks = [
      required('Username'),
      string('Username'),
      minLength('Username', 3),
      maxLength('Username', 20)
    ];
    
    for (const check of checks) {
      const result = check(value);
      if (typeof result === 'string') return result;
    }
    
    return true;
  },
  
  email: (value: any) => {
    const checks = [
      required('Email'),
      string('Email'),
      email('Email')
    ];
    
    for (const check of checks) {
      const result = check(value);
      if (typeof result === 'string') return result;
    }
    
    return true;
  },
  
  password: (value: any) => {
    const checks = [
      required('Senha'),
      string('Senha'),
      minLength('Senha', 6)
    ];
    
    for (const check of checks) {
      const result = check(value);
      if (typeof result === 'string') return result;
    }
    
    return true;
  },
  
  age: (value: any) => {
    if (value === undefined) return true;
    
    const checks = [
      number('Idade'),
      min('Idade', 18),
      max('Idade', 120)
    ];
    
    for (const check of checks) {
      const result = check(value);
      if (typeof result === 'string') return result;
    }
    
    return true;
  }
};

@Controller('/api/users')
export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  @Post('/')
  @UseMiddleware(validate(createUserSchema))
  async createUser(req, res) {
    try {
      // A validação já foi feita pelo middleware
      const { username, email, password, age } = req.body;
      
      const newUser = await this.userService.createUser({
        username,
        email,
        password,
        age
      });
      
      res.status(201).json({
        success: true,
        data: newUser
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}`}
                  />
                </div>

                <p>
                  Esta abordagem é mais modular e reutilizável, mas ainda requer bastante código manual. Vamos ver como
                  podemos simplificar ainda mais usando bibliotecas de validação.
                </p>

                <h2 id="joi-validation">Validação com Joi</h2>
                <p>
                  <a
                    href="https://joi.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300"
                  >
                    Joi
                  </a>{" "}
                  é uma biblioteca popular para validação de esquemas em JavaScript. Ela oferece uma API fluente para
                  definir esquemas de validação.
                </p>

                <p>Primeiro, instale o Joi:</p>

                <div className="not-prose">
                  <CodeDemo language="bash" code={`npm install joi`} showLineNumbers={false} />
                </div>

                <p>Agora, vamos criar um middleware de validação usando Joi:</p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`// src/middlewares/joiValidation.ts
import { Request, Response, NextFunction } from '@atosjs/azura';
import Joi from 'joi';

export function validateSchema(schema: Joi.Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false, // Retorna todos os erros, não apenas o primeiro
      stripUnknown: true // Remove campos desconhecidos
    });
    
    if (error) {
      const details = error.details.map(detail => detail.message);
      
      return res.status(400).json({
        success: false,
        error: 'Dados inválidos',
        details
      });
    }
    
    next();
  };
}`}
                  />
                </div>

                <p>Agora, podemos usar este middleware com esquemas Joi em nossos controllers:</p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`// src/controllers/UserController.ts
import { Controller, Post, UseMiddleware } from '@atosjs/azura';
import { UserService } from '../services/UserService';
import { validateSchema } from '../middlewares/joiValidation';
import Joi from 'joi';

// Esquema de validação com Joi
const createUserSchema = Joi.object({
  username: Joi.string()
    .required()
    .min(3)
    .max(20)
    .messages({
      'string.base': 'Username deve ser uma string',
      'string.empty': 'Username é obrigatório',
      'string.min': 'Username deve ter pelo menos {#limit} caracteres',
      'string.max': 'Username deve ter no máximo {#limit} caracteres',
      'any.required': 'Username é obrigatório'
    }),
    
  email: Joi.string()
    .required()
    .email()
    .messages({
      'string.base': 'Email deve ser uma string',
      'string.empty': 'Email é obrigatório',
      'string.email': 'Email deve ser um endereço de email válido',
      'any.required': 'Email é obrigatório'
    }),
    
  password: Joi.string()
    .required()
    .min(6)
    .messages({
      'string.base': 'Senha deve ser uma string',
      'string.empty': 'Senha é obrigatória',
      'string.min': 'Senha deve ter pelo menos {#limit} caracteres',
      'any.required': 'Senha é obrigatória'
    }),
    
  age: Joi.number()
    .optional()
    .min(18)
    .max(120)
    .messages({
      'number.base': 'Idade deve ser um número',
      'number.min': 'Idade deve ser pelo menos {#limit}',
      'number.max': 'Idade deve ser no máximo {#limit}'
    })
});

@Controller('/api/users')
export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  @Post('/')
  @UseMiddleware(validateSchema(createUserSchema))
  async createUser(req, res) {
    try {
      // A validação já foi feita pelo middleware
      const { username, email, password, age } = req.body;
      
      const newUser = await this.userService.createUser({
        username,
        email,
        password,
        age
      });
      
      res.status(201).json({
        success: true,
        data: newUser
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}`}
                  />
                </div>

                <p>
                  O Joi simplifica significativamente a definição de esquemas de validação e fornece mensagens de erro
                  detalhadas. Ele também suporta validação de tipos, validação condicional, transformações e muito mais.
                </p>

                <h2 id="class-validator">Validação com class-validator</h2>
                <p>
                  Se você estiver usando TypeScript, o{" "}
                  <a
                    href="https://github.com/typestack/class-validator"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300"
                  >
                    class-validator
                  </a>{" "}
                  é uma excelente opção. Ele permite definir regras de validação usando decorators diretamente em suas
                  classes.
                </p>

                <p>Primeiro, instale o class-validator e class-transformer:</p>

                <div className="not-prose">
                  <CodeDemo
                    language="bash"
                    code={`npm install class-validator class-transformer`}
                    showLineNumbers={false}
                  />
                </div>

                <p>
                  Certifique-se de habilitar os decorators em seu <code>tsconfig.json</code>:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="json"
                    code={`{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    // outras opções...
  }
}`}
                    showLineNumbers={false}
                  />
                </div>

                <p>Agora, vamos definir uma classe DTO (Data Transfer Object) com decorators de validação:</p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`// src/dtos/CreateUserDto.ts
import { IsString, IsEmail, IsOptional, IsNumber, MinLength, MaxLength, Min, Max } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Username deve ser uma string' })
  @MinLength(3, { message: 'Username deve ter pelo menos 3 caracteres' })
  @MaxLength(20, { message: 'Username deve ter no máximo 20 caracteres' })
  username: string;

  @IsEmail({}, { message: 'Email deve ser um endereço de email válido' })
  email: string;

  @IsString({ message: 'Senha deve ser uma string' })
  @MinLength(6, { message: 'Senha deve ter pelo menos 6 caracteres' })
  password: string;

  @IsOptional()
  @IsNumber({}, { message: 'Idade deve ser um número' })
  @Min(18, { message: 'Idade deve ser pelo menos 18' })
  @Max(120, { message: 'Idade deve ser no máximo 120' })
  age?: number;
}`}
                  />
                </div>

                <p>Em seguida, vamos criar um middleware para validar DTOs:</p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`// src/middlewares/dtoValidation.ts
import { Request, Response, NextFunction } from '@atosjs/azura';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

export function validateDto(dtoClass: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Converte o objeto plano para a classe DTO
    const dtoObject = plainToClass(dtoClass, req.body);
    
    // Valida o objeto
    const errors = await validate(dtoObject, {
      skipMissingProperties: false,
      forbidUnknownValues: true
    });
    
    if (errors.length > 0) {
      // Formata os erros
      const formattedErrors = errors.map(error => {
        const constraints = error.constraints;
        return constraints ? Object.values(constraints) : ['Erro de validação'];
      }).flat();
      
      return res.status(400).json({
        success: false,
        error: 'Dados inválidos',
        details: formattedErrors
      });
    }
    
    // Adiciona o objeto validado à requisição
    req.validatedBody = dtoObject;
    
    next();
  };
}`}
                  />
                </div>

                <p>Agora, podemos usar este middleware em nossos controllers:</p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`// src/controllers/UserController.ts
import { Controller, Post, UseMiddleware } from '@atosjs/azura';
import { UserService } from '../services/UserService';
import { validateDto } from '../middlewares/dtoValidation';
import { CreateUserDto } from '../dtos/CreateUserDto';

@Controller('/api/users')
export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  @Post('/')
  @UseMiddleware(validateDto(CreateUserDto))
  async createUser(req, res) {
    try {
      // A validação já foi feita pelo middleware
      // req.validatedBody contém o objeto validado
      const { username, email, password, age } = req.validatedBody;
      
      const newUser = await this.userService.createUser({
        username,
        email,
        password,
        age
      });
      
      res.status(201).json({
        success: true,
        data: newUser
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}`}
                  />
                </div>

                <p>
                  O class-validator é especialmente útil em projetos TypeScript, pois integra-se bem com o sistema de
                  tipos e oferece uma maneira declarativa de definir regras de validação.
                </p>

                <h2 id="custom-validators">Validadores Personalizados</h2>
                <p>
                  Às vezes, você precisa de validações específicas que não são fornecidas pelas bibliotecas padrão.
                  Vamos ver como criar validadores personalizados com Joi e class-validator.
                </p>

                <h3 id="custom-joi">Validadores Personalizados com Joi</h3>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`// src/validators/customJoiValidators.ts
import Joi from 'joi';

// Validador personalizado para verificar se uma string contém apenas letras e números
export const alphanumericValidator = Joi.extend((joi) => {
  return {
    type: 'string',
    base: joi.string(),
    messages: {
      'string.alphanumeric': '{{#label}} deve conter apenas letras e números'
    },
    validate(value, helpers) {
      if (!/^[a-zA-Z0-9]+$/.test(value)) {
        return { value, errors: helpers.error('string.alphanumeric') };
      }
      return { value };
    }
  };
});

// Validador personalizado para verificar se uma senha é forte
export const passwordValidator = Joi.extend((joi) => {
  return {
    type: 'string',
    base: joi.string(),
    messages: {
      'string.strongPassword': '{{#label}} deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial'
    },
    validate(value, helpers) {
      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':"\\\\|,.<>\\/?]).+$/.test(value)) {
        return { value, errors: helpers.error('string.strongPassword') };
      }
      return { value };
    }
  };
});

// Uso:
// const schema = Joi.object({
//   username: alphanumericValidator.string().alphanumeric().required(),
//   password: passwordValidator.string().strongPassword().required()
// });`}
                  />
                </div>

                <h3 id="custom-class-validator">Validadores Personalizados com class-validator</h3>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`// src/validators/customClassValidators.ts
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

// Decorator para verificar se uma string contém apenas letras e números
export function IsAlphanumeric(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isAlphanumeric',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === 'string' && /^[a-zA-Z0-9]+$/.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return \`\${args.property} deve conter apenas letras e números\`;
        }
      }
    });
  };
}

// Decorator para verificar se uma senha é forte
export function IsStrongPassword(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isStrongPassword',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === 'string' && 
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return \`\${args.property} deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial\`;
        }
      }
    });
  };
}

// Uso:
// export class CreateUserDto {
//   @IsAlphanumeric({ message: 'Username deve conter apenas letras e números' })
//   username: string;
//
//   @IsStrongPassword()
//   password: string;
// }`}
                  />
                </div>

                <h2 id="validation-best-practices">Melhores Práticas de Validação</h2>
                <p>Ao implementar validação em sua aplicação Azura, considere as seguintes melhores práticas:</p>

                <ul>
                  <li>
                    <strong>Valide tanto no cliente quanto no servidor</strong>: A validação no cliente melhora a
                    experiência do usuário, mas a validação no servidor é essencial para segurança.
                  </li>
                  <li>
                    <strong>Forneça mensagens de erro claras e específicas</strong>: Ajude os usuários a entender o que
                    está errado e como corrigir.
                  </li>
                  <li>
                    <strong>Use sanitização</strong>: Além de validar, sanitize os dados para remover conteúdo
                    potencialmente perigoso.
                  </li>
                  <li>
                    <strong>Valide tipos e formatos</strong>: Certifique-se de que os dados estão no formato correto
                    antes de processá-los.
                  </li>
                  <li>
                    <strong>Implemente validação de negócios</strong>: Além da validação de formato, implemente regras
                    de negócios específicas da sua aplicação.
                  </li>
                  <li>
                    <strong>Centralize a lógica de validação</strong>: Use middlewares ou serviços para centralizar a
                    lógica de validação e evitar duplicação.
                  </li>
                  <li>
                    <strong>Teste suas validações</strong>: Escreva testes para garantir que suas validações funcionem
                    corretamente.
                  </li>
                </ul>

                <h2 id="error-handling">Tratamento de Erros de Validação</h2>
                <p>
                  Um bom tratamento de erros de validação é essencial para fornecer feedback útil aos usuários. Aqui
                  está um exemplo de como você pode padronizar o tratamento de erros de validação em sua aplicação:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`// src/utils/errorHandler.ts
export class ValidationError extends Error {
  constructor(public details: string[], message: string = 'Dados inválidos') {
    super(message);
    this.name = 'ValidationError';
  }
}

// src/middlewares/errorHandler.ts
import { Request, Response, NextFunction } from '@atosjs/azura';
import { ValidationError } from '../utils/errorHandler';

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err);
  
  if (err instanceof ValidationError) {
    return res.status(400).json({
      success: false,
      error: err.message,
      details: err.details
    });
  }
  
  // Tratamento de outros tipos de erro
  const isProd = process.env.NODE_ENV === 'production';
  
  res.status(500).json({
    success: false,
    error: 'Erro interno do servidor',
    details: isProd ? undefined : err.message
  });
}`}
                  />
                </div>

                <p>
                  Você pode usar esta classe <code>ValidationError</code> em seus serviços e controllers para lançar
                  erros de validação de forma consistente:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`// src/services/UserService.ts
import { ValidationError } from '../utils/errorHandler';

export class UserService {
  // ...
  
  async createUser(userData: any) {
    // Validação de negócios
    if (await this.findByEmail(userData.email)) {
      throw new ValidationError(['Email já está em uso']);
    }
    
    if (await this.findByUsername(userData.username)) {
      throw new ValidationError(['Username já está em uso']);
    }
    
    // Continua com a criação do usuário
    // ...
  }
}`}
                  />
                </div>

                <h2 id="complex-validation">Validação Complexa</h2>
                <p>
                  Em alguns casos, você precisa de validações mais complexas que dependem de múltiplos campos ou de
                  dados externos, como um banco de dados. Vamos ver como lidar com esses casos:
                </p>

                <h3 id="conditional-validation">Validação Condicional</h3>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`// Validação condicional com Joi
const updateUserSchema = Joi.object({
  username: Joi.string().min(3).max(20),
  email: Joi.string().email(),
  password: Joi.string().min(6),
  confirmPassword: Joi.string().valid(Joi.ref('password'))
    .when('password', {
      is: Joi.exist(), // Quando password está presente
      then: Joi.required(), // confirmPassword é obrigatório
      otherwise: Joi.forbidden() // confirmPassword não é permitido
    })
    .messages({
      'any.only': 'Confirmação de senha deve ser igual à senha',
      'any.required': 'Confirmação de senha é obrigatória quando a senha é fornecida',
      'any.unknown': 'Confirmação de senha não é permitida quando a senha não é fornecida'
    })
}).min(1); // Pelo menos um campo deve ser fornecido`}
                  />
                </div>

                <h3 id="async-validation">Validação Assíncrona</h3>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`// src/middlewares/asyncValidation.ts
import { Request, Response, NextFunction } from '@atosjs/azura';

export function validateAsync(validationFn: (data: any) => Promise<string[]>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = await validationFn(req.body);
      
      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          error: 'Dados inválidos',
          details: errors
        });
      }
      
      next();
    } catch (error) {
      next(error);
    }
  };
}

// Uso:
// @Post('/')
// @UseMiddleware(validateAsync(async (data) => {
//   const errors = [];
//   
//   // Validação síncrona
//   if (!data.username) {
//     errors.push('Username é obrigatório');
//   }
//   
//   // Validação assíncrona
//   if (data.email && await userService.findByEmail(data.email)) {
//     errors.push('Email já está em uso');
//   }
//   
//   return errors;
// }))
// async createUser(req, res) {
//   // ...
// }`}
                  />
                </div>

                <h2 id="complete-example">Exemplo Completo</h2>
                <p>
                  Vamos juntar tudo em um exemplo completo de validação usando class-validator em uma aplicação Azura:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="typescript"
                    code={`// src/dtos/UserDto.ts
import { IsString, IsEmail, IsOptional, IsNumber, MinLength, MaxLength, Min, Max, Matches } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Username deve ser uma string' })
  @MinLength(3, { message: 'Username deve ter pelo menos 3 caracteres' })
  @MaxLength(20, { message: 'Username deve ter no máximo 20 caracteres' })
  @Matches(/^[a-zA-Z0-9]+$/, { message: 'Username deve conter apenas letras e números' })
  username: string;

  @IsEmail({}, { message: 'Email deve ser um endereço de email válido' })
  email: string;

  @IsString({ message: 'Senha deve ser uma string' })
  @MinLength(8, { message: 'Senha deve ter pelo menos 8 caracteres' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':"\\\\|,.<>\\/?]).+$/, {
    message: 'Senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial'
  })
  password: string;

  @IsOptional()
  @IsNumber({}, { message: 'Idade deve ser um número' })
  @Min(18, { message: 'Idade deve ser pelo menos 18' })
  @Max(120, { message: 'Idade deve ser no máximo 120' })
  age?: number;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'Username deve ser uma string' })
  @MinLength(3, { message: 'Username deve ter pelo menos 3 caracteres' })
  @MaxLength(20, { message: 'Username deve ter no máximo 20 caracteres' })
  @Matches(/^[a-zA-Z0-9]+$/, { message: 'Username deve conter apenas letras e números' })
  username?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email deve ser um endereço de email válido' })
  email?: string;

  @IsOptional()
  @IsString({ message: 'Senha deve ser uma string' })
  @MinLength(8, { message: 'Senha deve ter pelo menos 8 caracteres' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':"\\\\|,.<>\\/?]).+$/, {
    message: 'Senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial'
  })
  password?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Idade deve ser um número' })
  @Min(18, { message: 'Idade deve ser pelo menos 18' })
  @Max(120, { message: 'Idade deve ser no máximo 120' })
  age?: number;
}

// src/middlewares/validation.ts
import { Request, Response, NextFunction } from '@atosjs/azura';
import { validate, ValidationArguments, registerDecorator, ValidationOptions } from 'class-validator';
import { plainToClass } from 'class-transformer';

export function validateDto(dtoClass: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoObject = plainToClass(dtoClass, req.body);
    const errors = await validate(dtoObject, {
      skipMissingProperties: false,
      forbidUnknownValues: true
    });
    
    if (errors.length > 0) {
      const formattedErrors = errors.map(error => {
        const constraints = error.constraints;
        return constraints ? Object.values(constraints) : ['Erro de validação'];
      }).flat();
      
      return res.status(400).json({
        success: false,
        error: 'Dados inválidos',
        details: formattedErrors
      });
    }
    
    req.validatedBody = dtoObject;
    next();
  };
}

// src/controllers/UserController.ts
import { Controller, Get, Post, Put, Delete, UseMiddleware } from '@atosjs/azura';
import { UserService } from '../services/UserService';
import { validateDto } from '../middlewares/validation';
import { CreateUserDto, UpdateUserDto } from '../dtos/UserDto';
import { authMiddleware } from '../middlewares/auth';

@Controller('/api/users')
export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  @Post('/')
  @UseMiddleware(validateDto(CreateUserDto))
  async createUser(req, res) {
    try {
      const userData = req.validatedBody;
      
      // Validação adicional (verificação de duplicatas)
      if (await this.userService.findByEmail(userData.email)) {
        return res.status(400).json({
          success: false,
          error: 'Dados inválidos',
          details: ['Email já está em uso']
        });
      }
      
      if (await this.userService.findByUsername(userData.username)) {
        return res.status(400).json({
          success: false,
          error: 'Dados inválidos',
          details: ['Username já está em uso']
        });
      }
      
      const newUser = await this.userService.createUser(userData);
      
      res.status(201).json({
        success: true,
        data: newUser
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  @Put('/:id')
  @UseMiddleware([authMiddleware, validateDto(UpdateUserDto)])
  async updateUser(req, res) {
    try {
      const userId = req.params.id;
      const userData = req.validatedBody;
      
      // Verificar se o usuário existe
      const existingUser = await this.userService.findById(userId);
      if (!existingUser) {
        return res.status(404).json({
          success: false,
          error: 'Usuário não encontrado'
        });
      }
      
      // Verificar se o usuário tem permissão (apenas o próprio usuário ou admin)
      if (req.user.id !== userId && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          error: 'Acesso negado'
        });
      }
      
      // Validação adicional (verificação de duplicatas)
      if (userData.email && userData.email !== existingUser.email) {
        if (await this.userService.findByEmail(userData.email)) {
          return res.status(400).json({
            success: false,
            error: 'Dados inválidos',
            details: ['Email já está em uso']
          });
        }
      }
      
      if (userData.username && userData.username !== existingUser.username) {
        if (await this.userService.findByUsername(userData.username)) {
          return res.status(400).json({
            success: false,
            error: 'Dados inválidos',
            details: ['Username já está em uso']
          });
        }
      }
      
      const updatedUser = await this.userService.updateUser(userId, userData);
      
      res.json({
        success: true,
        data: updatedUser
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}`}
                  />
                </div>

                <h2 id="next-steps">Próximos Passos</h2>
                <p>Agora que você aprendeu como implementar validação em sua aplicação Azura, você pode:</p>

                <ul>
                  <li>
                    <Link href="/docs/examples/database" className="text-purple-400 hover:text-purple-300">
                      Conectar sua aplicação a um banco de dados
                    </Link>
                  </li>
                  <li>
                    <Link href="/docs/examples/authentication" className="text-purple-400 hover:text-purple-300">
                      Implementar autenticação e autorização
                    </Link>
                  </li>
                  <li>
                    <Link href="/docs/guides/deployment" className="text-purple-400 hover:text-purple-300">
                      Implantar sua aplicação em produção
                    </Link>
                  </li>
                  <li>Explorar bibliotecas adicionais de validação, como yup, zod ou ajv</li>
                  <li>Implementar validação no lado do cliente para melhorar a experiência do usuário</li>
                </ul>
              </div>

              <div className="hidden lg:block">
                <div className="sticky top-16">
                  <TableOfContents
                    items={[
                      { id: "introduction", title: "Introdução", level: 2 },
                      { id: "validation-approaches", title: "Abordagens de Validação", level: 2 },
                      { id: "manual-validation", title: "Validação Manual", level: 2 },
                      { id: "validation-middleware", title: "Middleware de Validação", level: 2 },
                      { id: "joi-validation", title: "Validação com Joi", level: 2 },
                      { id: "class-validator", title: "Validação com class-validator", level: 2 },
                      { id: "custom-validators", title: "Validadores Personalizados", level: 2 },
                      { id: "custom-joi", title: "Validadores Personalizados com Joi", level: 3 },
                      {
                        id: "custom-class-validator",
                        title: "Validadores Personalizados com class-validator",
                        level: 3,
                      },
                      { id: "validation-best-practices", title: "Melhores Práticas de Validação", level: 2 },
                      { id: "error-handling", title: "Tratamento de Erros de Validação", level: 2 },
                      { id: "complex-validation", title: "Validação Complexa", level: 2 },
                      { id: "conditional-validation", title: "Validação Condicional", level: 3 },
                      { id: "async-validation", title: "Validação Assíncrona", level: 3 },
                      { id: "complete-example", title: "Exemplo Completo", level: 2 },
                      { id: "next-steps", title: "Próximos Passos", level: 2 },
                    ]}
                  />
                </div>
              </div>
            </div>

            <div className="mt-16 border-t border-gray-800 pt-8 flex items-center justify-between">
              <Link
                href="/docs/examples/authentication"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                ← Autenticação
              </Link>
              <Link href="/docs/examples/database" className="text-purple-400 hover:text-purple-300 transition-colors">
                Banco de Dados →
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
