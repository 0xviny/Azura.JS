"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/components/language-provider"
import { AnimatedSection } from "@/components/ui/animated-section"
import { ChevronLeft, ChevronRight, CheckCircle, Play, Code, BookOpen } from "lucide-react"
import CodeBlock from "@/components/docs/code-block"

interface TutorialStep {
  title: {
    en: string
    pt: string
  }
  description: {
    en: string
    pt: string
  }
  code: {
    typescript: string
    javascript: string
  }
  explanation: {
    en: string
    pt: string
  }
}

interface InteractiveTutorialProps {
  title: {
    en: string
    pt: string
  }
  description: {
    en: string
    pt: string
  }
  steps: TutorialStep[]
}

export function InteractiveTutorial({ title, description, steps }: InteractiveTutorialProps) {
  const { language } = useLanguage()
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const c = {
    en: {
      next: "Next Step",
      previous: "Previous Step",
      runCode: "Run Code",
      step: "Step",
      of: "of",
      code: "Code",
      explanation: "Explanation",
      completed: "Completed",
      progress: "Progress",
    },
    pt: {
      next: "Próximo Passo",
      previous: "Passo Anterior",
      runCode: "Executar Código",
      step: "Passo",
      of: "de",
      code: "Código",
      explanation: "Explicação",
      completed: "Concluído",
      progress: "Progresso",
    },
  }[language]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep])
      }
    } else {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep])
      }
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleRunCode = () => {
    // Simulate running code
    const runningToast = document.createElement("div")
    runningToast.className =
      "fixed bottom-4 right-4 bg-purple-700 text-white px-4 py-2 rounded-md shadow-lg z-50 animate-in fade-in-0 slide-in-from-bottom-5"
    runningToast.textContent = language === "en" ? "Running code..." : "Executando código..."
    document.body.appendChild(runningToast)

    setTimeout(() => {
      runningToast.remove()
      const successToast = document.createElement("div")
      successToast.className =
        "fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-md shadow-lg z-50 animate-in fade-in-0 slide-in-from-bottom-5"
      successToast.textContent = language === "en" ? "Code executed successfully!" : "Código executado com sucesso!"
      document.body.appendChild(successToast)

      setTimeout(() => {
        successToast.remove()
      }, 3000)

      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep])
      }
    }, 2000)
  }

  const currentStepData = steps[currentStep]

  return (
    <AnimatedSection animation="fadeIn" className="my-8">
      <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm overflow-hidden">
        <CardHeader className="bg-gray-900 border-b border-gray-800">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>{title[language]}</CardTitle>
              <CardDescription>{description[language]}</CardDescription>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>{c.progress}:</span>
              <div className="flex space-x-1">
                {steps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStep(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      completedSteps.includes(index)
                        ? "bg-green-500"
                        : index === currentStep
                          ? "bg-purple-500"
                          : "bg-gray-700"
                    }`}
                    aria-label={`${c.step} ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="p-6 border-b border-gray-800 bg-gray-950">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium flex items-center">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-700 text-white text-xs mr-2">
                  {currentStep + 1}
                </span>
                {currentStepData.title[language]}
                {completedSteps.includes(currentStep) && <CheckCircle className="ml-2 h-4 w-4 text-green-500" />}
              </h3>
              <div className="text-sm text-gray-400">
                {c.step} {currentStep + 1} {c.of} {steps.length}
              </div>
            </div>
            <p className="text-gray-300">{currentStepData.description[language]}</p>
          </div>

          <Tabs defaultValue="code" className="w-full">
            <div className="border-b border-gray-800">
              <TabsList className="w-full justify-start rounded-none border-b border-gray-800 bg-gray-900 p-0">
                <TabsTrigger
                  value="code"
                  className="rounded-none border-r border-gray-800 data-[state=active]:bg-gray-950 data-[state=active]:text-purple-400 py-3 px-4"
                >
                  <Code className="mr-2 h-4 w-4" />
                  {c.code}
                </TabsTrigger>
                <TabsTrigger
                  value="explanation"
                  className="rounded-none data-[state=active]:bg-gray-950 data-[state=active]:text-purple-400 py-3 px-4"
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  {c.explanation}
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="code" className="p-0 m-0">
              <div className="p-6">
                <Tabs defaultValue="typescript" className="w-full">
                  <TabsList className="w-full justify-start mb-4">
                    <TabsTrigger value="typescript">TypeScript</TabsTrigger>
                    <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                  </TabsList>
                  <TabsContent value="typescript" className="p-0 m-0">
                    <CodeBlock language="typescript">{currentStepData.code.typescript}</CodeBlock>
                  </TabsContent>
                  <TabsContent value="javascript" className="p-0 m-0">
                    <CodeBlock language="javascript">{currentStepData.code.javascript}</CodeBlock>
                  </TabsContent>
                </Tabs>
              </div>
            </TabsContent>

            <TabsContent value="explanation" className="p-0 m-0">
              <div className="p-6 prose prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: currentStepData.explanation[language] }} />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between border-t border-gray-800 bg-gray-900 p-4">
          <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0}>
            <ChevronLeft className="mr-2 h-4 w-4" /> {c.previous}
          </Button>
          <div className="flex space-x-2">
            <Button variant="secondary" onClick={handleRunCode}>
              <Play className="mr-2 h-4 w-4" /> {c.runCode}
            </Button>
            <Button
              onClick={handleNext}
              disabled={currentStep === steps.length - 1 && completedSteps.includes(currentStep)}
            >
              {currentStep === steps.length - 1 ? (
                completedSteps.includes(currentStep) ? (
                  <span className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4" /> {c.completed}
                  </span>
                ) : (
                  <span className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4" /> {c.completed}
                  </span>
                )
              ) : (
                <>
                  {c.next} <ChevronRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </AnimatedSection>
  )
}
