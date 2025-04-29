[![Azura](./assets/logo.png)](https://github.com/0xviny/AzuraV2)

# Azura

> **Azura** é um microframework web minimalista, poderoso e moderno, feito para APIs rápidas e modulares usando **TypeScript** ou **JavaScript**.

[![License](https://img.shields.io/badge/license-ISC-blue.svg)](./LICENSE)
[![npm version](https://img.shields.io/npm/v/@atosjs/azura.svg)](https://www.npmjs.com/package/@atosjs/azura)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)

---

## ✨ Features

- 🚀 Rápido, minimalista e extremamente leve.
- 📦 Suporte completo a **TypeScript** e **JavaScript**.
- 🛠️ CLI poderosa para gerar projetos rapidamente.
- 🧩 Arquitetura modular baseada em **Controllers**, **Services** e **Plugins**.
- 🔌 Sistema de middlewares e hooks.
- 🌎 Ideal para APIs REST, aplicações serverless e microservices.
- ⚡ Compatível com Node.js 18+ e Bun.
- 📄 Templates prontos para acelerar o desenvolvimento.

---

## 📦 Instalação

```bash
npm install @atosjs/azura
```

ou

```bash
bun add @atosjs/azura
```

---

## 🚀 Começando Rápido

### Criar um novo projeto

```bash
npm install -g @atosjs/azura

azura create my-api ts
```

> **Argumentos:**
> - `my-api`: Nome da pasta/projeto.
> - `ts`: Tipo de projeto. Use `ts` para TypeScript ou `js` para JavaScript.

---

## 🛠️ Exemplo Básico (JavaScript)

### Servidor HTTP básico

```javascript
const { AzuraApp } = require('@atosjs/azura');

const app = new AzuraApp();

app.get('/', (req, res) => {
  res.send('Hello World from Azura!');
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
```

---

## 🧩 Exemplo Avançado (TypeScript)

### Controladores e Rotas

```typescript
import { Controller, Get } from '@atosjs/azura';

@Controller('/api')
export class ExampleController {
  @Get('/hello')
  hello(req, res) {
    res.json({ message: 'Hello from API!' });
  }
}
```

### Inicializando com Controllers

```typescript
import { AzuraApp } from '@atosjs/azura';
import { ExampleController } from './controllers/ExampleController';

const app = new AzuraApp();

app.load([ExampleController]); // Carrega controladores
app.listen(3000);
```

---

## 📚 API - Documentação Completa

### `new AzuraApp(options?)`
Cria uma nova instância do servidor.

**Parâmetros:**

| Nome | Tipo | Padrão | Descrição |
|:-----|:-----|:-------|:----------|
| `options.port` | `number` | `3000` | Porta que o servidor irá escutar. |
| `options.https` | `boolean` | `false` | Se true, habilita HTTPS. |
| `options.http2` | `boolean` | `false` | Se true, habilita HTTP2. |
| `options.cluster` | `boolean` | `false` | Se true, usa todos os CPUs com cluster. |

---

### Métodos Disponíveis

| Método | Descrição |
|:-------|:----------|
| `app.get(path, handler)` | Registra uma rota GET. |
| `app.post(path, handler)` | Registra uma rota POST. |
| `app.put(path, handler)` | Registra uma rota PUT. |
| `app.delete(path, handler)` | Registra uma rota DELETE. |
| `app.use(middleware)` | Adiciona middlewares globais. |
| `app.load(controllers)` | Carrega controladores usando decorators. |
| `app.listen(port?)` | Inicia o servidor na porta especificada. |
| `app.decorate(name, value)` | Injeta propriedades customizadas na aplicação. |
| `app.registerPlugin(plugin, options?)` | Registra plugins personalizados. |
| `app.onHook(type, handler)` | Adiciona hooks em eventos do ciclo de vida. |

---

### Request (`req`)

| Propriedade | Tipo | Descrição |
|:------------|:-----|:----------|
| `req.query` | `object` | Parâmetros da querystring (`?chave=valor`). |
| `req.params` | `object` | Parâmetros da rota dinâmica (`/user/:id`). |
| `req.body` | `object` | Dados do corpo da requisição (`POST`, `PUT`). |
| `req.cookies` | `object` | Cookies da requisição. |
| `req.ip` | `string` | IP do cliente. |

---

### Response (`res`)

| Método | Descrição |
|:-------|:----------|
| `res.send(body)` | Envia resposta simples (`text/html`). |
| `res.json(object)` | Envia resposta em JSON (`application/json`). |
| `res.status(code)` | Define o status da resposta (`res.status(404)`). |
| `res.set(key, value)` | Define headers. |
| `res.get(key)` | Recupera headers. |

---

## 🧱 Estrutura de Projeto Recomendada

```bash
my-api/
├── src/
│   ├── controllers/
│   │   └── UserController.ts
│   ├── services/
│   │   └── UserService.ts
│   ├── plugins/
│   │   └── AuthPlugin.ts
│   └── index.ts
├── package.json
├── tsconfig.json (se TypeScript)
└── README.md
```

---

## 🔥 CLI Commands

| Comando | Descrição |
|:--------|:----------|
| `azura create <project-name> <ts|js>` | Cria um novo projeto em segundos. |
| `azura serve` | Inicia o servidor em modo desenvolvimento. |

---

## ⚙️ Requisitos

- **Node.js** versão **18 ou superior**
- (Opcional) **Bun** para desenvolvimento mais rápido

---

## 🧑‍💻 Desenvolvimento

Clone o repositório oficial:

```bash
git clone https://github.com/0xviny/AzuraV2
cd atosjs/packages/azura
npm install
npm run dev
```

Build para produção:

```bash
npm run build
```

---

## 🤝 Contribuindo

Contribuições são muito bem-vindas!

1. Faça um fork do projeto.
2. Crie uma branch: `git checkout -b minha-feature`.
3. Commit suas mudanças: `git commit -m 'feat: minha nova feature'`.
4. Push para o seu fork: `git push origin minha-feature`.
5. Abra um Pull Request!

---

## 📄 Licença

Distribuído sob a licença **ISC**.  
Veja o arquivo [LICENSE](./LICENSE) para mais informações.

---

## 💬 Agradecimentos

Azura é inspirado na simplicidade do **Express** e na modularidade do **Fastify**, combinando o melhor dos dois mundos para criar APIs pequenas, rápidas e modernas.

Obrigado por usar **Azura**! 💙