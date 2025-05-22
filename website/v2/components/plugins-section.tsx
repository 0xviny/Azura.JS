"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/components/language-provider"

export default function PluginsSection() {
  const { language } = useLanguage()

  const content = {
    en: {
      title: "Extend with Plugins",
      subtitle: "Azura comes with a powerful plugin system to extend your API's functionality.",
      plugins: {
        cors: {
          title: "CORS",
          desc: "Enable Cross-Origin Resource Sharing",
          code: `app.registerPlugin(cors, {
  origin: '*',
  methods: ['GET', 'POST']
});`,
        },
        rateLimit: {
          title: "Rate Limiting",
          desc: "Protect your API from abuse",
          code: `app.registerPlugin(rateLimit, {
  limit: 100,
  timeframe: 60000
});`,
        },
        compression: {
          title: "Compression",
          desc: "Compress responses for faster delivery",
          code: `app.registerPlugin(compress, {
  threshold: 1024
});`,
        },
        static: {
          title: "Static Files",
          desc: "Serve static files from a directory",
          code: `app.registerPlugin(serveStatic, {
  root: './public'
});`,
        },
        metrics: {
          title: "Metrics",
          desc: "Monitor your API's performance",
          code: `app.registerPlugin(metrics);
app.get('/metrics', metricsEndpoint());`,
        },
        custom: {
          title: "Custom Plugins",
          desc: "Create your own plugins",
          code: `const myPlugin = {
  name: 'my-plugin',
  register: (app, options) => {
    // Plugin logic here
  }
};`,
        },
      },
    },
    pt: {
      title: "Estenda com Plugins",
      subtitle: "Azura vem com um poderoso sistema de plugins para estender a funcionalidade da sua API.",
      plugins: {
        cors: {
          title: "CORS",
          desc: "Habilite o Compartilhamento de Recursos de Origem Cruzada",
          code: `app.registerPlugin(cors, {
  origin: '*',
  methods: ['GET', 'POST']
});`,
        },
        rateLimit: {
          title: "Limitação de Taxa",
          desc: "Proteja sua API contra abusos",
          code: `app.registerPlugin(rateLimit, {
  limit: 100,
  timeframe: 60000
});`,
        },
        compression: {
          title: "Compressão",
          desc: "Comprima respostas para entrega mais rápida",
          code: `app.registerPlugin(compress, {
  threshold: 1024
});`,
        },
        static: {
          title: "Arquivos Estáticos",
          desc: "Sirva arquivos estáticos de um diretório",
          code: `app.registerPlugin(serveStatic, {
  root: './public'
});`,
        },
        metrics: {
          title: "Métricas",
          desc: "Monitore o desempenho da sua API",
          code: `app.registerPlugin(metrics);
app.get('/metrics', metricsEndpoint());`,
        },
        custom: {
          title: "Plugins Personalizados",
          desc: "Crie seus próprios plugins",
          code: `const meuPlugin = {
  name: 'meu-plugin',
  register: (app, options) => {
    // Lógica do plugin aqui
  }
};`,
        },
      },
    },
  }

  const c = content[language]
  const p = c.plugins

  return (
    <div className="py-16">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{c.title}</h2>
        <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-600 dark:text-gray-400">{c.subtitle}</p>
      </div>

      <div className="grid gap-6 mt-12 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>{p.cors.title}</CardTitle>
            <CardDescription>{p.cors.desc}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-3 text-sm bg-gray-100 rounded-md dark:bg-gray-800 dark:text-gray-300">
              <code>{p.cors.code}</code>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{p.rateLimit.title}</CardTitle>
            <CardDescription>{p.rateLimit.desc}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-3 text-sm bg-gray-100 rounded-md dark:bg-gray-800 dark:text-gray-300">
              <code>{p.rateLimit.code}</code>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{p.compression.title}</CardTitle>
            <CardDescription>{p.compression.desc}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-3 text-sm bg-gray-100 rounded-md dark:bg-gray-800 dark:text-gray-300">
              <code>{p.compression.code}</code>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{p.static.title}</CardTitle>
            <CardDescription>{p.static.desc}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-3 text-sm bg-gray-100 rounded-md dark:bg-gray-800 dark:text-gray-300">
              <code>{p.static.code}</code>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{p.metrics.title}</CardTitle>
            <CardDescription>{p.metrics.desc}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-3 text-sm bg-gray-100 rounded-md dark:bg-gray-800 dark:text-gray-300">
              <code>{p.metrics.code}</code>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{p.custom.title}</CardTitle>
            <CardDescription>{p.custom.desc}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-3 text-sm bg-gray-100 rounded-md dark:bg-gray-800 dark:text-gray-300">
              <code>{p.custom.code}</code>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
