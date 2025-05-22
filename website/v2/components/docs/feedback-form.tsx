"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/components/language-provider"
import { AnimatedSection } from "@/components/ui/animated-section"
import { ThumbsUp, ThumbsDown, Send, CheckCircle } from "lucide-react"

interface FeedbackFormProps {
  pageId: string
}

export function FeedbackForm({ pageId }: FeedbackFormProps) {
  const { language } = useLanguage()
  const [feedback, setFeedback] = useState("")
  const [rating, setRating] = useState<"positive" | "negative" | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const content = {
    en: {
      title: "Was this helpful?",
      description: "Your feedback helps us improve our documentation.",
      placeholder: "Tell us what you think or how we can improve this page...",
      submit: "Submit Feedback",
      thanks: "Thank you for your feedback!",
      positive: "Yes, it was helpful",
      negative: "No, it needs improvement",
    },
    pt: {
      title: "Isso foi útil?",
      description: "Seu feedback nos ajuda a melhorar nossa documentação.",
      placeholder: "Diga-nos o que você pensa ou como podemos melhorar esta página...",
      submit: "Enviar Feedback",
      thanks: "Obrigado pelo seu feedback!",
      positive: "Sim, foi útil",
      negative: "Não, precisa de melhorias",
    },
  }

  const c = content[language]

  const handleSubmit = async () => {
    if (!rating) return

    setLoading(true)
    // Simular envio de feedback
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("Feedback submitted:", {
      pageId,
      rating,
      feedback,
      language,
    })

    setSubmitted(true)
    setLoading(false)
  }

  if (submitted) {
    return (
      <AnimatedSection animation="fadeIn" className="my-8">
        <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm overflow-hidden">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center text-center p-6">
              <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">{c.thanks}</h3>
            </div>
          </CardContent>
        </Card>
      </AnimatedSection>
    )
  }

  return (
    <AnimatedSection animation="fadeIn" className="my-8">
      <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm overflow-hidden">
        <CardHeader>
          <CardTitle>{c.title}</CardTitle>
          <CardDescription>{c.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center space-x-4 mb-6">
            <Button
              variant={rating === "positive" ? "default" : "outline"}
              className={`flex items-center ${rating === "positive" ? "bg-green-700 hover:bg-green-800" : ""}`}
              onClick={() => setRating("positive")}
            >
              <ThumbsUp className="mr-2 h-4 w-4" />
              {c.positive}
            </Button>
            <Button
              variant={rating === "negative" ? "default" : "outline"}
              className={`flex items-center ${rating === "negative" ? "bg-red-700 hover:bg-red-800" : ""}`}
              onClick={() => setRating("negative")}
            >
              <ThumbsDown className="mr-2 h-4 w-4" />
              {c.negative}
            </Button>
          </div>
          {rating && (
            <Textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder={c.placeholder}
              className="min-h-[100px]"
            />
          )}
        </CardContent>
        {rating && (
          <CardFooter className="flex justify-end">
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {c.submit}
                </span>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  {c.submit}
                </>
              )}
            </Button>
          </CardFooter>
        )}
      </Card>
    </AnimatedSection>
  )
}
