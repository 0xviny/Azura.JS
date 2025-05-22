"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Terminal, Package, Server } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"

export default function GettingStarted() {
  const { language } = useLanguage()

  const content = {
    en: {
      title: "Get Started in Minutes",
      subtitle: "Follow these simple steps to create your first Azura API.",
      install: {
        title: "1. Install",
        desc: "Install Azura using npm, yarn, or pnpm.",
        command: "npm install @atosjs/azura",
        note: "Azura includes TypeScript definitions out of the box.",
      },
      create: {
        title: "2. Create",
        desc: "Create your first API endpoint.",
        code: `import { AzuraServer } from '@atosjs/azura';

const app = new AzuraServer();

app.get('/hello', (req, res) => {
  res.json({ message: 'Hello World!' });
});

app.listen(3000);`,
      },
      run: {
        title: "3. Run",
        desc: "Start your server and make requests.",
        command: "npx ts-node index.ts",
        note: "Visit http://localhost:3000/hello to see your API in action.",
      },
      guide: "Complete Getting Started Guide",
    },
    pt: {
      title: "Comece em Minutos",
      subtitle: "Siga estes passos simples para criar sua primeira API Azura.",
      install: {
        title: "1. Instalar",
        desc: "Instale o Azura usando npm, yarn ou pnpm.",
        command: "npm install @atosjs/azura",
        note: "Azura inclui definições de TypeScript prontas para uso.",
      },
      create: {
        title: "2. Criar",
        desc: "Crie seu primeiro endpoint de API.",
        code: `import { AzuraServer } from '@atosjs/azura';

const app = new AzuraServer();

app.get('/hello', (req, res) => {
  res.json({ message: 'Olá Mundo!' });
});

app.listen(3000);`,
      },
      run: {
        title: "3. Executar",
        desc: "Inicie seu servidor e faça requisições.",
        command: "npx ts-node index.ts",
        note: "Visite http://localhost:3000/hello para ver sua API em ação.",
      },
      guide: "Guia Completo de Primeiros Passos",
    },
  }

  const c = content[language]

  return (
    <div className="py-16">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{c.title}</h2>
        <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-600 dark:text-gray-400">{c.subtitle}</p>
      </div>

      <div className="grid gap-8 mt-12 md:grid-cols-3">
        <Card>
          <CardHeader>
            <Terminal className="w-10 h-10 mb-2 text-purple-600 dark:text-purple-400" />
            <CardTitle>{c.install.title}</CardTitle>
            <CardDescription>{c.install.desc}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-3 mb-4 text-sm bg-gray-100 rounded-md dark:bg-gray-800 dark:text-gray-300">
              <code>{c.install.command}</code>
            </div>
            <p className="text-gray-600 dark:text-gray-400">{c.install.note}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Package className="w-10 h-10 mb-2 text-purple-600 dark:text-purple-400" />
            <CardTitle>{c.create.title}</CardTitle>
            <CardDescription>{c.create.desc}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-3 mb-4 text-sm bg-gray-100 rounded-md dark:bg-gray-800 dark:text-gray-300">
              <code className="whitespace-pre-wrap">{c.create.code}</code>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Server className="w-10 h-10 mb-2 text-purple-600 dark:text-purple-400" />
            <CardTitle>{c.run.title}</CardTitle>
            <CardDescription>{c.run.desc}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-3 mb-4 text-sm bg-gray-100 rounded-md dark:bg-gray-800 dark:text-gray-300">
              <code>{c.run.command}</code>
            </div>
            <p className="text-gray-600 dark:text-gray-400">{c.run.note}</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 text-center">
        <Button
          asChild
          size="lg"
          className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800"
        >
          <Link href="/docs/getting-started">
            {c.guide} <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
