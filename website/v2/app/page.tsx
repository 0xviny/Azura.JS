"use client";

import { Button } from "@/components/ui/button";
import HeroSection from "@/components/hero-section";
import FeatureSection from "@/components/feature-section";
import CodeExample from "@/components/code-example";
import GettingStarted from "@/components/getting-started";
import PluginsSection from "@/components/plugins-section";
import Footer from "@/components/footer";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-white">
      <HeroSection />

      <div className="container px-4 py-24 mx-auto">
        <AnimatedSection animation="fadeIn">
          <FeatureSection />
        </AnimatedSection>

        <AnimatedSection animation="slideInFromBottom" delay={0.2}>
          <div className="mt-24 text-center">
            <h2 className="mb-6 text-3xl font-bold text-white">Built for Developer Experience</h2>
            <p className="max-w-2xl mx-auto mb-12 text-lg text-gray-400">
              Create powerful APIs with less code. Azura helps you focus on your business logic
              instead of boilerplate code.
            </p>

            <CodeExample />
          </div>
        </AnimatedSection>

        <AnimatedSection animation="fadeIn" delay={0.3}>
          <GettingStarted />
        </AnimatedSection>

        <AnimatedSection animation="slideInFromBottom" delay={0.4}>
          <PluginsSection />
        </AnimatedSection>

        <AnimatedSection animation="scaleUp" delay={0.5}>
          <div className="mt-24 text-center">
            <h2 className="mb-6 text-3xl font-bold text-white">Ready to Build Your API?</h2>
            <p className="max-w-2xl mx-auto mb-12 text-lg text-gray-400">
              Get started with Azura today and experience the fastest way to build scalable APIs.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  className="px-8 py-6 text-lg bg-purple-700 hover:bg-purple-800 text-white"
                >
                  <a href="/docs/getting-started">
                    Get Started <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  variant="outline"
                  className="px-8 py-6 text-lg border-purple-700 text-purple-400 hover:bg-purple-900/20"
                >
                  <a
                    href="https://github.com/0xviny/Azura.JS"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    GitHub
                  </a>
                </Button>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>
      </div>

      <Footer />
    </div>
  );
}
