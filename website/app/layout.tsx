import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"
import Link from "next/link"
import { Github } from "lucide-react"
import { GradientLogo } from "@/components/gradient-logo"

export const metadata: Metadata = {
  title: "Azura - Microframework Web Minimalista",
  description:
    "Um microframework web minimalista, poderoso e moderno, feito para APIs rápidas e modulares usando TypeScript ou JavaScript.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="min-h-screen bg-black text-white">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800/80 bg-black/80 backdrop-blur-sm">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
              <Link href="/" className="flex items-center">
                <GradientLogo size={24} />
                <span className="font-bold text-xl ml-2">Azura</span>
              </Link>
              <nav className="hidden md:flex items-center gap-8">
                <Link href="/docs" className="text-gray-300 hover:text-purple-400 transition-colors">
                  Documentação
                </Link>
                <Link href="/docs/examples" className="text-gray-300 hover:text-purple-400 transition-colors">
                  Exemplos
                </Link>
                <Link href="/docs/api" className="text-gray-300 hover:text-purple-400 transition-colors">
                  API
                </Link>
                <a
                  href="https://github.com/0xviny/AzuraV2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-purple-400 transition-colors"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </a>
              </nav>
            </div>
          </header>
          <div className="pt-16">{children}</div>
          <footer className="bg-black border-t border-gray-800 py-12">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <Link href="/" className="flex items-center mb-4">
                    <GradientLogo size={24} />
                    <span className="font-bold text-xl ml-2">Azura</span>
                  </Link>
                  <p className="text-gray-400 mb-4">
                    Um microframework web minimalista, poderoso e moderno para APIs rápidas e modulares.
                  </p>
                  <div className="flex space-x-4">
                    <a
                      href="https://github.com/0xviny/AzuraV2"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-purple-400 transition-colors"
                    >
                      <Github className="h-5 w-5" />
                      <span className="sr-only">GitHub</span>
                    </a>
                    <a
                      href="https://www.npmjs.com/package/@atosjs/azura"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-purple-400 transition-colors"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M0 0v24h24V0H0zm19.2 19.2H4.8V4.8h14.4v14.4z" />
                        <path d="M15.6 4.8H4.8v14.4h10.8V4.8zm-6 9.6H7.2V7.2h2.4v7.2zm6-2.4h-2.4V7.2h2.4v4.8z" />
                      </svg>
                      <span className="sr-only">NPM</span>
                    </a>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-white mb-4">Documentação</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/docs/introduction" className="text-gray-400 hover:text-purple-400 transition-colors">
                        Introdução
                      </Link>
                    </li>
                    <li>
                      <Link href="/docs/installation" className="text-gray-400 hover:text-purple-400 transition-colors">
                        Instalação
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/docs/getting-started"
                        className="text-gray-400 hover:text-purple-400 transition-colors"
                      >
                        Primeiros Passos
                      </Link>
                    </li>
                    <li>
                      <Link href="/docs/guides" className="text-gray-400 hover:text-purple-400 transition-colors">
                        Guias
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-white mb-4">API</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        href="/docs/api/azura-app"
                        className="text-gray-400 hover:text-purple-400 transition-colors"
                      >
                        AzuraApp
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/docs/api/controllers"
                        className="text-gray-400 hover:text-purple-400 transition-colors"
                      >
                        Controllers
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/docs/api/middlewares"
                        className="text-gray-400 hover:text-purple-400 transition-colors"
                      >
                        Middlewares
                      </Link>
                    </li>
                    <li>
                      <Link href="/docs/api/plugins" className="text-gray-400 hover:text-purple-400 transition-colors">
                        Plugins
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-white mb-4">Comunidade</h3>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="https://github.com/0xviny/AzuraV2"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-purple-400 transition-colors"
                      >
                        GitHub
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.npmjs.com/package/@atosjs/azura"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-purple-400 transition-colors"
                      >
                        NPM Package
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://github.com/0xviny/AzuraV2/issues"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-purple-400 transition-colors"
                      >
                        Issues
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://github.com/0xviny/AzuraV2/blob/main/CONTRIBUTING.md"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-purple-400 transition-colors"
                      >
                        Contribuir
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-12 pt-8 border-t border-gray-800 text-center">
                <p className="text-gray-500 text-sm">
                  &copy; {new Date().getFullYear()} Azura. Distribuído sob a licença ISC.
                </p>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
