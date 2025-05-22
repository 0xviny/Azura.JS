import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ChevronRight, Github } from "lucide-react"
import { CodeDemo } from "@/components/code-demo"
import { DocSidebar } from "@/components/doc-sidebar"
import { TableOfContents } from "@/components/table-of-contents"

export default function InstallationPage() {
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
                  <Link href="/docs/guides" className="hover:text-purple-400 transition-colors">
                    Guias
                  </Link>
                  <ChevronRight className="h-4 w-4" />
                  <span className="text-gray-300">Instalação</span>
                </div>

                <Badge className="mb-4 bg-purple-900/30 text-purple-300 hover:bg-purple-900/40 transition-colors">
                  Guia
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Instalação</h1>
                <p className="text-xl text-gray-300 max-w-3xl">
                  Aprenda como instalar e configurar o Azura em seu ambiente de desenvolvimento.
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
                    href="https://github.com/0xviny/Azura.JS/edit/main/docs/guides/installation.md"
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
                <h2 id="requirements">Requisitos</h2>
                <p>Antes de instalar o Azura, certifique-se de que seu ambiente atende aos seguintes requisitos:</p>
                <ul>
                  <li>
                    <strong>Node.js</strong> versão 18.0.0 ou superior
                  </li>
                  <li>
                    <strong>npm</strong> versão 7.0.0 ou superior (geralmente vem com o Node.js)
                  </li>
                  <li>
                    Opcionalmente, <strong>Bun</strong> para um desenvolvimento mais rápido
                  </li>
                </ul>

                <h2 id="npm-installation">Instalação via npm</h2>
                <p>
                  A maneira mais comum de instalar o Azura é através do npm (Node Package Manager). Execute o seguinte
                  comando no terminal:
                </p>

                <div className="not-prose">
                  <CodeDemo language="bash" code="npm install @atosjs/azura" showLineNumbers={false} />
                </div>

                <p>
                  Isso instalará o Azura como uma dependência em seu projeto. Você pode verificar se a instalação foi
                  bem-sucedida verificando o arquivo <code>package.json</code> do seu projeto.
                </p>

                <h2 id="bun-installation">Instalação via Bun</h2>
                <p>
                  Se você prefere usar o Bun como gerenciador de pacotes, pode instalar o Azura com o seguinte comando:
                </p>

                <div className="not-prose">
                  <CodeDemo language="bash" code="bun add @atosjs/azura" showLineNumbers={false} />
                </div>

                <h2 id="global-installation">Instalação Global</h2>
                <p>Para usar a CLI do Azura globalmente em seu sistema, você pode instalar o pacote globalmente:</p>

                <div className="not-prose">
                  <CodeDemo language="bash" code="npm install -g @atosjs/azura" showLineNumbers={false} />
                </div>

                <p>
                  Isso permitirá que você use o comando <code>azura</code> em qualquer lugar do seu sistema para criar
                  novos projetos.
                </p>

                <h2 id="verify-installation">Verificando a Instalação</h2>
                <p>Para verificar se o Azura foi instalado corretamente, você pode executar:</p>

                <div className="not-prose">
                  <CodeDemo language="bash" code="npx azura --version" showLineNumbers={false} />
                </div>

                <p>Ou, se você instalou globalmente:</p>

                <div className="not-prose">
                  <CodeDemo language="bash" code="azura --version" showLineNumbers={false} />
                </div>

                <p>
                  Isso deve exibir a versão atual do Azura instalada em seu sistema. Se você vir um número de versão,
                  significa que a instalação foi bem-sucedida.
                </p>

                <h2 id="typescript-setup">Configuração para TypeScript</h2>
                <p>
                  O Azura tem suporte nativo para TypeScript. Se você planeja usar TypeScript em seu projeto,
                  certifique-se de ter o TypeScript instalado:
                </p>

                <div className="not-prose">
                  <CodeDemo language="bash" code="npm install typescript --save-dev" showLineNumbers={false} />
                </div>

                <p>
                  Em seguida, crie um arquivo <code>tsconfig.json</code> na raiz do seu projeto com a seguinte
                  configuração básica:
                </p>

                <div className="not-prose">
                  <CodeDemo
                    language="json"
                    code={`{
  "compilerOptions": {
    "target": "ES2020",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "dist",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}`}
                  />
                </div>

                <p>
                  Note que as opções <code>experimentalDecorators</code> e <code>emitDecoratorMetadata</code> são
                  necessárias para usar os decorators do Azura.
                </p>

                <h2 id="next-steps">Próximos Passos</h2>
                <p>
                  Agora que você instalou o Azura, está pronto para começar a desenvolver sua primeira aplicação.
                  Confira o guia de{" "}
                  <Link href="/docs/guides/getting-started" className="text-purple-400 hover:text-purple-300">
                    Primeiros Passos
                  </Link>{" "}
                  para aprender como criar e executar um projeto básico com Azura.
                </p>
              </div>

              <div className="hidden lg:block">
                <div className="sticky top-16">
                  <TableOfContents
                    items={[
                      { id: "requirements", title: "Requisitos", level: 2 },
                      { id: "npm-installation", title: "Instalação via npm", level: 2 },
                      { id: "bun-installation", title: "Instalação via Bun", level: 2 },
                      { id: "global-installation", title: "Instalação Global", level: 2 },
                      { id: "verify-installation", title: "Verificando a Instalação", level: 2 },
                      { id: "typescript-setup", title: "Configuração para TypeScript", level: 2 },
                      { id: "next-steps", title: "Próximos Passos", level: 2 },
                    ]}
                  />
                </div>
              </div>
            </div>

            <div className="mt-16 border-t border-gray-800 pt-8 flex items-center justify-between">
              <Link href="/docs" className="text-purple-400 hover:text-purple-300 transition-colors">
                ← Documentação
              </Link>
              <Link
                href="/docs/guides/getting-started"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                Primeiros Passos →
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
