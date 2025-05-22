"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CodeBlock from "@/components/docs/code-block"

interface CodeTabsProps {
  typescript: string
  javascript: string
}

export function CodeTabs({ typescript, javascript }: CodeTabsProps) {
  return (
    <Tabs defaultValue="typescript">
      <TabsList>
        <TabsTrigger value="typescript">TypeScript</TabsTrigger>
        <TabsTrigger value="javascript">JavaScript</TabsTrigger>
      </TabsList>
      <TabsContent value="typescript">
        <CodeBlock language="typescript">{typescript}</CodeBlock>
      </TabsContent>
      <TabsContent value="javascript">
        <CodeBlock language="javascript">{javascript}</CodeBlock>
      </TabsContent>
    </Tabs>
  )
}
