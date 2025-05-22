"use client";

import { useLanguage } from "@/components/language-provider";
import { MongoDBLiveDemo } from "@/components/docs/mongodb-live-demo";
import { DataVisualization } from "@/components/docs/data-visualization";
import { FeedbackForm } from "@/components/docs/feedback-form";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MongoDBDemoPage() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "MongoDB Integration Demo",
      subtitle: "Interactive demonstration of MongoDB integration with Azura",
      intro:
        "This page provides a live demonstration of how to integrate MongoDB with the Azura.JS Framework. You can perform basic CRUD operations and see the code required to implement them.",
      note: "Note",
      noteText:
        "This demo uses a real MongoDB connection. Any changes you make will be reflected in the database. Feel free to experiment with adding and deleting items.",
      liveDemo: "Live Demo",
      dataVisualization: "Data Visualization",
      visualizationTitle: "MongoDB Usage Statistics",
      visualizationDescription: "Visualize your MongoDB usage statistics in real-time",
    },
    pt: {
      title: "Demonstração de Integração com MongoDB",
      subtitle: "Demonstração interativa da integração do MongoDB com Azura",
      intro:
        "Esta página fornece uma demonstração ao vivo de como integrar o MongoDB com o Azura.JS Framework. Você pode realizar operações CRUD básicas e ver o código necessário para implementá-las.",
      note: "Nota",
      noteText:
        "Esta demonstração usa uma conexão real com o MongoDB. Quaisquer alterações que você fizer serão refletidas no banco de dados. Sinta-se à vontade para experimentar adicionar e excluir itens.",
      liveDemo: "Demonstração ao Vivo",
      dataVisualization: "Visualização de Dados",
      visualizationTitle: "Estatísticas de Uso do MongoDB",
      visualizationDescription: "Visualize suas estatísticas de uso do MongoDB em tempo real",
    },
  };

  const c = content[language];

  return (
    <div className="space-y-8">
      <AnimatedSection animation="fadeIn">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">{c.title}</h1>
          <p className="mt-2 text-lg text-gray-400">{c.subtitle}</p>
        </div>
      </AnimatedSection>

      <AnimatedSection animation="slideInFromLeft" delay={0.1}>
        <p className="text-lg">{c.intro}</p>
      </AnimatedSection>

      <AnimatedSection animation="slideInFromRight" delay={0.2}>
        <Alert variant="default" className="bg-blue-900/20 border-blue-800 text-blue-300">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{c.note}</AlertTitle>
          <AlertDescription>{c.noteText}</AlertDescription>
        </Alert>
      </AnimatedSection>

      <Tabs defaultValue="demo" className="w-full">
        <TabsList className="w-full justify-start mb-6">
          <TabsTrigger value="demo">{c.liveDemo}</TabsTrigger>
          <TabsTrigger value="visualization">{c.dataVisualization}</TabsTrigger>
        </TabsList>
        <TabsContent value="demo" className="mt-0">
          <MongoDBLiveDemo collectionName="azura_docs_demo" />
        </TabsContent>
        <TabsContent value="visualization" className="mt-0">
          <DataVisualization
            title={{
              en: c.visualizationTitle,
              pt: c.visualizationTitle,
            }}
            description={{
              en: c.visualizationDescription,
              pt: c.visualizationDescription,
            }}
            endpoint="/api/stats"
            refreshInterval={5000}
          />
        </TabsContent>
      </Tabs>

      <FeedbackForm pageId="mongodb-demo" />
    </div>
  );
}
