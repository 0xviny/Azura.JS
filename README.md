# 📖 Azura

> **Azura** é um microframework minimalista e poderoso para criação de APIs web rápidas e modernas, usando **TypeScript** e **JavaScript**.

[![License](https://img.shields.io/badge/license-ISC-blue.svg)](./LICENSE)
[![npm version](https://img.shields.io/npm/v/@atosjs/azura.svg)](https://www.npmjs.com/package/@atosjs/azura)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)

---

## ✨ Features

- 🚀 Rápido, minimalista e moderno.
- 📦 Suporte nativo a **TypeScript** e **JavaScript**.
- 🛠️ CLI poderosa para criar projetos em segundos.
- 🧩 Estrutura modular baseada em **Controllers**, **Services** e **Plugins**.
- 🌎 Ideal para APIs REST e Microservices.
- ⚡ Compatível com Node.js 18+ e Bun.
- 📄 Templates prontos para criar novos projetos (`azura create`).

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

## 🚀 Começando rápido

### Criar um novo projeto

```bash
npx azura create my-api ts
```

- `my-api` → nome do projeto
- `ts` → para criar um projeto em **TypeScript**
- ou `js` → para criar um projeto em **JavaScript**

---

## 🛠️ Exemplo básico (JavaScript)

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

## 🧱 Estrutura de um Projeto Azura

```bash
my-api/
├── src/
│   ├── controllers/
│   │   └── ExampleController.ts
│   ├── services/
│   │   └── ExampleService.ts
│   ├── plugins/
│   │   └── ExamplePlugin.ts
│   └── index.ts
├── package.json
├── tsconfig.json (se TypeScript)
└── README.md
```

---

## 🧩 Principais Conceitos

| Conceito | Descrição |
|:--------|:----------|
| `Controllers` | Camada de entrada (rotas HTTP). |
| `Services` | Camada de regras de negócio e lógica. |
| `Plugins` | Extensões que adicionam funcionalidades extras ao framework. |

---

## 🔥 CLI Commands

| Comando | Descrição |
|:--------|:----------|
| `azura create <nome> <ts|js>` | Cria um novo projeto. |
| `azura serve` | Inicia a aplicação. |

---

## ⚙️ Requisitos

- Node.js **18+**
- Opcional: Bun para desenvolvimento mais rápido.

---

## 📚 Documentação

Em breve: [Documentação Oficial](https://github.com/0xviny/AzuraV2#readme)

---

## 🧑‍💻 Desenvolvimento

Clone o repositório:

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

Contribuições são bem-vindas!  
Siga estes passos:

1. Fork este repositório.
2. Crie uma branch: `git checkout -b minha-feature`.
3. Commit suas mudanças: `git commit -m 'feat: minha nova feature'`.
4. Push: `git push origin minha-feature`.
5. Abra um Pull Request.

---

## 📄 Licença

Distribuído sob a licença **ISC**.  
Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

---

## 💬 Agradecimentos

Azura é inspirado na simplicidade de frameworks como **Express**, mas com uma abordagem moderna para APIs modulares, pequenas e altamente performáticas.  
Obrigado por usar 💙!