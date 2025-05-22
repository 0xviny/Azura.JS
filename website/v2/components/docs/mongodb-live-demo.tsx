"use client"

import { useState, useEffect } from "react"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/components/language-provider"
import { AnimatedSection } from "@/components/ui/animated-section"
import { Database, RefreshCw, Plus, Trash2, AlertCircle, CheckCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import CodeBlock from "@/components/docs/code-block"

interface MongoDBLiveDemoProps {
  collectionName?: string
}

export function MongoDBLiveDemo({ collectionName = "demo_items" }: MongoDBLiveDemoProps) {
  const { language } = useLanguage()
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [newItem, setNewItem] = useState({ name: "", value: "" })
  const [connectionStatus, setConnectionStatus] = useState<"connecting" | "connected" | "error">("connecting")

  const content = {
    en: {
      title: "MongoDB Live Demo",
      description: "This is a live demonstration of MongoDB integration with Azura.JS Framework.",
      connectionStatus: "Connection Status",
      connecting: "Connecting to MongoDB...",
      connected: "Connected to MongoDB",
      connectionError: "Connection Error",
      items: "Items",
      noItems: "No items found. Add your first item!",
      operations: "Operations",
      addItem: "Add Item",
      refreshItems: "Refresh Items",
      deleteAll: "Delete All",
      name: "Name",
      value: "Value",
      add: "Add",
      delete: "Delete",
      code: "Code",
      itemAdded: "Item added successfully!",
      itemsDeleted: "All items deleted successfully!",
      itemsRefreshed: "Items refreshed successfully!",
      nameRequired: "Name is required",
      valueRequired: "Value is required",
      connectionCode: "Connection Code",
      findCode: "Find Items Code",
      insertCode: "Insert Item Code",
      deleteCode: "Delete Items Code",
    },
    pt: {
      title: "Demonstração ao Vivo do MongoDB",
      description: "Esta é uma demonstração ao vivo da integração do MongoDB com o Azura.JS Framework.",
      connectionStatus: "Status da Conexão",
      connecting: "Conectando ao MongoDB...",
      connected: "Conectado ao MongoDB",
      connectionError: "Erro de Conexão",
      items: "Itens",
      noItems: "Nenhum item encontrado. Adicione seu primeiro item!",
      operations: "Operações",
      addItem: "Adicionar Item",
      refreshItems: "Atualizar Itens",
      deleteAll: "Excluir Todos",
      name: "Nome",
      value: "Valor",
      add: "Adicionar",
      delete: "Excluir",
      code: "Código",
      itemAdded: "Item adicionado com sucesso!",
      itemsDeleted: "Todos os itens excluídos com sucesso!",
      itemsRefreshed: "Itens atualizados com sucesso!",
      nameRequired: "Nome é obrigatório",
      valueRequired: "Valor é obrigatório",
      connectionCode: "Código de Conexão",
      findCode: "Código para Buscar Itens",
      insertCode: "Código para Inserir Item",
      deleteCode: "Código para Excluir Itens",
    },
  }

  const c = content[language]

  const connectionCode = `// Connect to MongoDB
import { Azura } from '@atosjs/azura';
import { Database } from '@atosjs/azura/database';

const app = new Azura();

// Configure database connection
const db = new Database({
  type: 'mongodb',
  url: process.env.MONGO_URL,
});

// Connect to the database
await db.connect();
console.log('Connected to MongoDB');

// Get collection
const collection = db.collection('${collectionName}');`

  const findCode = `// Find all items in the collection
const items = await collection.find({}).toArray();
console.log('Found items:', items);`

  const insertCode = `// Insert a new item
const newItem = { name: 'Example Item', value: 'Example Value' };
const result = await collection.insertOne(newItem);
console.log('Inserted item with ID:', result.insertedId);`

  const deleteCode = `// Delete all items
const result = await collection.deleteMany({});
console.log('Deleted items count:', result.deletedCount);`

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/mongodb/items")
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }
      const data = await response.json()
      setItems(data.items)
      setConnectionStatus("connected")
      setSuccess(c.itemsRefreshed)
      setTimeout(() => setSuccess(null), 3000)
    } catch (err: any) {
      console.error("Failed to fetch items:", err)
      setError(err.message)
      setConnectionStatus("error")
    } finally {
      setLoading(false)
    }
  }

  const handleAddItem = async () => {
    if (!newItem.name.trim()) {
      setError(c.nameRequired)
      return
    }
    if (!newItem.value.trim()) {
      setError(c.valueRequired)
      return
    }

    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/mongodb/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      })
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }
      await fetchItems()
      setNewItem({ name: "", value: "" })
      setSuccess(c.itemAdded)
      setTimeout(() => setSuccess(null), 3000)
    } catch (err: any) {
      console.error("Failed to add item:", err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteAll = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/mongodb/items", {
        method: "DELETE",
      })
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }
      setItems([])
      setSuccess(c.itemsDeleted)
      setTimeout(() => setSuccess(null), 3000)
    } catch (err: any) {
      console.error("Failed to delete items:", err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatedSection animation="fadeIn" className="my-8">
      <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm overflow-hidden">
        <CardHeader className="bg-gray-900 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Database className="mr-2 h-5 w-5 text-purple-400" />
                {c.title}
              </CardTitle>
              <CardDescription>{c.description}</CardDescription>
            </div>
            <div
              className={`flex items-center px-3 py-1 rounded-full text-sm ${
                connectionStatus === "connected"
                  ? "bg-green-900/20 text-green-400"
                  : connectionStatus === "connecting"
                    ? "bg-yellow-900/20 text-yellow-400"
                    : "bg-red-900/20 text-red-400"
              }`}
            >
              {connectionStatus === "connected" ? (
                <CheckCircle className="mr-1 h-3 w-3" />
              ) : connectionStatus === "connecting" ? (
                <RefreshCw className="mr-1 h-3 w-3 animate-spin" />
              ) : (
                <AlertCircle className="mr-1 h-3 w-3" />
              )}
              <span>
                {connectionStatus === "connected"
                  ? c.connected
                  : connectionStatus === "connecting"
                    ? c.connecting
                    : c.connectionError}
              </span>
            </div>
          </div>
        </CardHeader>

        <Tabs defaultValue="demo" className="w-full">
          <TabsList className="w-full justify-start rounded-none border-b border-gray-800 bg-gray-900 p-0">
            <TabsTrigger
              value="demo"
              className="rounded-none border-r border-gray-800 data-[state=active]:bg-gray-950 data-[state=active]:text-purple-400 py-3 px-4"
            >
              Demo
            </TabsTrigger>
            <TabsTrigger
              value="code"
              className="rounded-none data-[state=active]:bg-gray-950 data-[state=active]:text-purple-400 py-3 px-4"
            >
              {c.code}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="demo" className="p-0 m-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
              <div>
                <h3 className="text-lg font-medium mb-4">{c.items}</h3>
                <div className="border border-gray-800 rounded-md bg-gray-950 p-4 h-[300px] overflow-y-auto">
                  {loading ? (
                    <div className="flex items-center justify-center h-full">
                      <RefreshCw className="h-6 w-6 text-purple-400 animate-spin" />
                    </div>
                  ) : items.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-gray-500 text-center">{c.noItems}</div>
                  ) : (
                    <div className="space-y-2">
                      {items.map((item, index) => (
                        <div
                          key={index}
                          className="border border-gray-800 rounded-md p-3 bg-gray-900 hover:bg-gray-900/80 transition-colors"
                        >
                          <div className="font-medium text-white">{item.name}</div>
                          <div className="text-sm text-gray-400">{item.value}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">{c.operations}</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{c.name}</Label>
                    <Input
                      id="name"
                      value={newItem.name}
                      onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                      placeholder="Item name"
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="value">{c.value}</Label>
                    <Input
                      id="value"
                      value={newItem.value}
                      onChange={(e) => setNewItem({ ...newItem, value: e.target.value })}
                      placeholder="Item value"
                      disabled={loading}
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Button onClick={handleAddItem} disabled={loading}>
                      <Plus className="mr-2 h-4 w-4" />
                      {c.addItem}
                    </Button>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" onClick={fetchItems} disabled={loading}>
                        <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                        {c.refreshItems}
                      </Button>
                      <Button variant="outline" onClick={handleDeleteAll} disabled={loading}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        {c.deleteAll}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {(error || success) && (
              <div
                className={`p-4 border-t ${
                  error ? "border-red-800 bg-red-900/20" : "border-green-800 bg-green-900/20"
                }`}
              >
                <div className={`flex items-center ${error ? "text-red-400" : "text-green-400"}`}>
                  {error ? <AlertCircle className="mr-2 h-4 w-4" /> : <CheckCircle className="mr-2 h-4 w-4" />}
                  <span>{error || success}</span>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="code" className="p-0 m-0">
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">{c.connectionCode}</h3>
                <CodeBlock language="typescript">{connectionCode}</CodeBlock>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">{c.findCode}</h3>
                <CodeBlock language="typescript">{findCode}</CodeBlock>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">{c.insertCode}</h3>
                <CodeBlock language="typescript">{insertCode}</CodeBlock>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">{c.deleteCode}</h3>
                <CodeBlock language="typescript">{deleteCode}</CodeBlock>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <CardFooter className="flex justify-between border-t border-gray-800 bg-gray-900 p-4">
          <div className="text-sm text-gray-400">
            Collection: <span className="font-mono text-purple-400">{collectionName}</span>
          </div>
          <Button variant="outline" size="sm" onClick={fetchItems} disabled={loading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            {c.refreshItems}
          </Button>
        </CardFooter>
      </Card>
    </AnimatedSection>
  )
}
