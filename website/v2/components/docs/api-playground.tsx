"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/components/language-provider"
import { Play, Copy, Check, ChevronDown, ChevronUp } from "lucide-react"
import { AnimatedSection } from "@/components/ui/animated-section"
import { motion } from "framer-motion"

interface ApiPlaygroundProps {
  endpoint?: string
  method?: "GET" | "POST" | "PUT" | "DELETE"
  description?: string
  requestBody?: string
  headers?: Record<string, string>
}

export function ApiPlayground({
  endpoint = "/api/example",
  method = "GET",
  description = "Test this API endpoint with different parameters",
  requestBody = '{\n  "name": "Example",\n  "value": 123\n}',
  headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer YOUR_TOKEN",
  },
}: ApiPlaygroundProps) {
  const { language } = useLanguage()
  const [currentMethod, setCurrentMethod] = useState<string>(method)
  const [currentEndpoint, setCurrentEndpoint] = useState<string>(endpoint)
  const [currentBody, setCurrentBody] = useState<string>(requestBody)
  const [currentHeaders, setCurrentHeaders] = useState<Record<string, string>>(headers)
  const [response, setResponse] = useState<string>("")
  const [status, setStatus] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [copied, setCopied] = useState<boolean>(false)
  const [showHeaders, setShowHeaders] = useState<boolean>(false)

  const content = {
    en: {
      title: "API Playground",
      description: "Test this API endpoint directly in your browser",
      method: "Method",
      endpoint: "Endpoint",
      requestBody: "Request Body",
      headers: "Headers",
      response: "Response",
      status: "Status",
      send: "Send Request",
      copy: "Copy",
      copied: "Copied!",
      showHeaders: "Show Headers",
      hideHeaders: "Hide Headers",
      headerName: "Header Name",
      headerValue: "Header Value",
      addHeader: "Add Header",
    },
    pt: {
      title: "Playground da API",
      description: "Teste este endpoint da API diretamente no seu navegador",
      method: "Método",
      endpoint: "Endpoint",
      requestBody: "Corpo da Requisição",
      headers: "Cabeçalhos",
      response: "Resposta",
      status: "Status",
      send: "Enviar Requisição",
      copy: "Copiar",
      copied: "Copiado!",
      showHeaders: "Mostrar Cabeçalhos",
      hideHeaders: "Ocultar Cabeçalhos",
      headerName: "Nome do Cabeçalho",
      headerValue: "Valor do Cabeçalho",
      addHeader: "Adicionar Cabeçalho",
    },
  }

  const c = content[language]

  const handleSendRequest = async () => {
    setLoading(true)
    setResponse("")
    setStatus("")

    try {
      // Simular uma requisição
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Gerar uma resposta de exemplo
      const exampleResponses = {
        GET: {
          status: "200 OK",
          body: JSON.stringify(
            {
              id: "123",
              name: "Example",
              value: 123,
              createdAt: new Date().toISOString(),
            },
            null,
            2,
          ),
        },
        POST: {
          status: "201 Created",
          body: JSON.stringify(
            {
              id: "456",
              ...JSON.parse(currentBody),
              createdAt: new Date().toISOString(),
            },
            null,
            2,
          ),
        },
        PUT: {
          status: "200 OK",
          body: JSON.stringify(
            {
              id: "123",
              ...JSON.parse(currentBody),
              updatedAt: new Date().toISOString(),
            },
            null,
            2,
          ),
        },
        DELETE: {
          status: "204 No Content",
          body: "",
        },
      }

      const result = exampleResponses[currentMethod as keyof typeof exampleResponses]
      setStatus(result.status)
      setResponse(result.body)
    } catch (error) {
      setStatus("400 Bad Request")
      setResponse(JSON.stringify({ error: "Invalid request" }, null, 2))
    } finally {
      setLoading(false)
    }
  }

  const handleCopyResponse = () => {
    navigator.clipboard.writeText(response)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleAddHeader = () => {
    setCurrentHeaders({
      ...currentHeaders,
      "": "",
    })
  }

  const handleHeaderChange = (key: string, newKey: string, value: string) => {
    const newHeaders = { ...currentHeaders }
    delete newHeaders[key]
    newHeaders[newKey] = value
    setCurrentHeaders(newHeaders)
  }

  const handleRemoveHeader = (key: string) => {
    const newHeaders = { ...currentHeaders }
    delete newHeaders[key]
    setCurrentHeaders(newHeaders)
  }

  return (
    <AnimatedSection animation="fadeIn" className="my-8">
      <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>{c.title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="method">{c.method}</Label>
              <Select value={currentMethod} onValueChange={setCurrentMethod}>
                <SelectTrigger id="method" className="mt-1 bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Method" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="GET">GET</SelectItem>
                  <SelectItem value="POST">POST</SelectItem>
                  <SelectItem value="PUT">PUT</SelectItem>
                  <SelectItem value="DELETE">DELETE</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-3">
              <Label htmlFor="endpoint">{c.endpoint}</Label>
              <Input
                id="endpoint"
                value={currentEndpoint}
                onChange={(e) => setCurrentEndpoint(e.target.value)}
                className="mt-1 bg-gray-800 border-gray-700"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center">
              <Label htmlFor="headers">{c.headers}</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowHeaders(!showHeaders)}
                className="text-gray-400 hover:text-white"
              >
                {showHeaders ? (
                  <>
                    {c.hideHeaders} <ChevronUp className="ml-1 h-4 w-4" />
                  </>
                ) : (
                  <>
                    {c.showHeaders} <ChevronDown className="ml-1 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>

            {showHeaders && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-2 space-y-2"
              >
                {Object.entries(currentHeaders).map(([key, value], index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <Input
                      placeholder={c.headerName}
                      value={key}
                      onChange={(e) => handleHeaderChange(key, e.target.value, value)}
                      className="bg-gray-800 border-gray-700"
                    />
                    <div className="flex gap-2">
                      <Input
                        placeholder={c.headerValue}
                        value={value}
                        onChange={(e) => handleHeaderChange(key, key, e.target.value)}
                        className="bg-gray-800 border-gray-700 flex-1"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleRemoveHeader(key)}
                        className="shrink-0"
                      >
                        &times;
                      </Button>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={handleAddHeader} className="mt-2">
                  {c.addHeader}
                </Button>
              </motion.div>
            )}
          </div>

          {(currentMethod === "POST" || currentMethod === "PUT") && (
            <div>
              <Label htmlFor="body">{c.requestBody}</Label>
              <Textarea
                id="body"
                value={currentBody}
                onChange={(e) => setCurrentBody(e.target.value)}
                className="mt-1 font-mono h-32 bg-gray-800 border-gray-700"
              />
            </div>
          )}

          <Button onClick={handleSendRequest} disabled={loading} className="w-full bg-purple-700 hover:bg-purple-800">
            {loading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" /> {c.send}
              </>
            )}
          </Button>

          {response && (
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <Label>{c.response}</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">{status}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopyResponse}
                    className="text-gray-400 hover:text-white"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    <span className="ml-1">{copied ? c.copied : c.copy}</span>
                  </Button>
                </div>
              </div>
              <pre className="bg-gray-800 p-4 rounded-md overflow-auto max-h-80 text-gray-300 text-sm">{response}</pre>
            </div>
          )}
        </CardContent>
      </Card>
    </AnimatedSection>
  )
}
