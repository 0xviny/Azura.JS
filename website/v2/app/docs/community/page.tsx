"use client";

import { useLanguage } from "@/components/language-provider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Github, Twitter, MessageCircle, BookOpen, Heart, Users } from "lucide-react";
import Link from "next/link";

export default function CommunityPage() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "Community & Support",
      subtitle: "Join the Azura community and get help when you need it",
      intro:
        "Azura has a growing community of developers who are building amazing applications. Join us to share your experiences, get help, and contribute to the project.",
      github: {
        title: "GitHub",
        description: "Star the project, report issues, and contribute to the codebase.",
        button: "Visit GitHub",
      },
      discord: {
        title: "Discord",
        description:
          "Join our Discord server to chat with other developers and get real-time help.",
        button: "Join Discord",
      },
      twitter: {
        title: "Twitter",
        description: "Follow us on Twitter for announcements, tips, and community highlights.",
        button: "Follow @azuraframework",
      },
      documentation: {
        title: "Documentation",
        description: "Comprehensive documentation with guides, API reference, and examples.",
        button: "Read Docs",
      },
      contributing: {
        title: "Contributing",
        description: "Learn how to contribute to Azura and help make it better.",
        button: "Contribution Guide",
      },
      showcase: {
        title: "Showcase",
        description: "See what others are building with Azura and share your own projects.",
        button: "View Showcase",
      },
      supportTitle: "Support Options",
      supportDescription: "Need help with your Azura project? We offer several support options:",
      community: "Community Support",
      communityDescription:
        "Get help from the community on Discord, GitHub Discussions, or Stack Overflow. This is free and often the fastest way to get answers to common questions.",
      premium: "Premium Support",
      premiumDescription:
        "For businesses and teams that need guaranteed response times and priority support, we offer premium support plans.",
      consulting: "Consulting",
      consultingDescription:
        "Need help with a specific project or feature? Our team of experts can help you implement Azura in your project.",
      training: "Training",
      trainingDescription:
        "We offer training sessions for teams that want to learn how to use Azura effectively.",
    },
    pt: {
      title: "Comunidade & Suporte",
      subtitle: "Junte-se à comunidade Azura e obtenha ajuda quando precisar",
      intro:
        "Azura tem uma comunidade crescente de desenvolvedores que estão construindo aplicações incríveis. Junte-se a nós para compartilhar suas experiências, obter ajuda e contribuir para o projeto.",
      github: {
        title: "GitHub",
        description: "Dê uma estrela ao projeto, reporte problemas e contribua com o código.",
        button: "Visitar GitHub",
      },
      discord: {
        title: "Discord",
        description:
          "Junte-se ao nosso servidor Discord para conversar com outros desenvolvedores e obter ajuda em tempo real.",
        button: "Entrar no Discord",
      },
      twitter: {
        title: "Twitter",
        description: "Siga-nos no Twitter para anúncios, dicas e destaques da comunidade.",
        button: "Seguir @azuraframework",
      },
      documentation: {
        title: "Documentação",
        description: "Documentação abrangente com guias, referência de API e exemplos.",
        button: "Ler Documentação",
      },
      contributing: {
        title: "Contribuindo",
        description: "Aprenda como contribuir para o Azura e ajudar a torná-lo melhor.",
        button: "Guia de Contribuição",
      },
      showcase: {
        title: "Showcase",
        description:
          "Veja o que outros estão construindo com Azura e compartilhe seus próprios projetos.",
        button: "Ver Showcase",
      },
      supportTitle: "Opções de Suporte",
      supportDescription:
        "Precisa de ajuda com seu projeto Azura? Oferecemos várias opções de suporte:",
      community: "Suporte da Comunidade",
      communityDescription:
        "Obtenha ajuda da comunidade no Discord, GitHub Discussions ou Stack Overflow. Isso é gratuito e geralmente a maneira mais rápida de obter respostas para perguntas comuns.",
      premium: "Suporte Premium",
      premiumDescription:
        "Para empresas e equipes que precisam de tempos de resposta garantidos e suporte prioritário, oferecemos planos de suporte premium.",
      consulting: "Consultoria",
      consultingDescription:
        "Precisa de ajuda com um projeto ou recurso específico? Nossa equipe de especialistas pode ajudá-lo a implementar o Azura em seu projeto.",
      training: "Treinamento",
      trainingDescription:
        "Oferecemos sessões de treinamento para equipes que desejam aprender a usar o Azura de forma eficaz.",
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

      <AnimatedSection animation="fadeIn" delay={0.2}>
        <div className="grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-800/50 transition-all duration-300">
            <CardHeader>
              <Github className="w-8 h-8 mb-2 text-purple-400" />
              <CardTitle>{c.github.title}</CardTitle>
              <CardDescription>{c.github.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                asChild
                variant="outline"
                className="w-full border-purple-700 text-purple-400 hover:bg-purple-900/20"
              >
                <a href="https://github.com/0xviny/Azura.JS" target="_blank" rel="noreferrer noopener">
                  {c.github.button}
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-800/50 transition-all duration-300">
            <CardHeader>
              <MessageCircle className="w-8 h-8 mb-2 text-purple-400" />
              <CardTitle>{c.discord.title}</CardTitle>
              <CardDescription>{c.discord.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                asChild
                variant="outline"
                className="w-full border-purple-700 text-purple-400 hover:bg-purple-900/20"
              >
                <a href="https://discord.gg/azura" target="_blank" rel="noreferrer noopener">
                  {c.discord.button}
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-800/50 transition-all duration-300">
            <CardHeader>
              <Twitter className="w-8 h-8 mb-2 text-purple-400" />
              <CardTitle>{c.twitter.title}</CardTitle>
              <CardDescription>{c.twitter.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                asChild
                variant="outline"
                className="w-full border-purple-700 text-purple-400 hover:bg-purple-900/20"
              >
                <a
                  href="https://twitter.com/azuraframework"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {c.twitter.button}
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-800/50 transition-all duration-300">
            <CardHeader>
              <BookOpen className="w-8 h-8 mb-2 text-purple-400" />
              <CardTitle>{c.documentation.title}</CardTitle>
              <CardDescription>{c.documentation.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                asChild
                variant="outline"
                className="w-full border-purple-700 text-purple-400 hover:bg-purple-900/20"
              >
                <Link href="/docs">{c.documentation.button}</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-800/50 transition-all duration-300">
            <CardHeader>
              <Heart className="w-8 h-8 mb-2 text-purple-400" />
              <CardTitle>{c.contributing.title}</CardTitle>
              <CardDescription>{c.contributing.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                asChild
                variant="outline"
                className="w-full border-purple-700 text-purple-400 hover:bg-purple-900/20"
              >
                <a
                  href="https://github.com/0xviny/Azura.JS/blob/main/CONTRIBUTING.md"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {c.contributing.button}
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-800/50 transition-all duration-300">
            <CardHeader>
              <Users className="w-8 h-8 mb-2 text-purple-400" />
              <CardTitle>{c.showcase.title}</CardTitle>
              <CardDescription>{c.showcase.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                asChild
                variant="outline"
                className="w-full border-purple-700 text-purple-400 hover:bg-purple-900/20"
              >
                <a
                  href="https://github.com/0xviny/Azura.JS/blob/main/SHOWCASE.md"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {c.showcase.button}
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </AnimatedSection>

      <AnimatedSection animation="fadeIn" delay={0.3}>
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-4">{c.supportTitle}</h2>
          <p className="text-gray-400 mb-8">{c.supportDescription}</p>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle>{c.community}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">{c.communityDescription}</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle>{c.premium}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">{c.premiumDescription}</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle>{c.consulting}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">{c.consultingDescription}</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle>{c.training}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">{c.trainingDescription}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
