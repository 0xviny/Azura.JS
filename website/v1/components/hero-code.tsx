"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const codeExamples = [
  {
    language: "javascript",
    code: `const { AzuraServer } = require('@atosjs/azura');

const app = new AzuraServer();

app.get('/', (req, res) => {
  res.send('Hello World from Azura!');
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});`,
    title: "API Básica",
  },
  {
    language: "typescript",
    code: `import { Controller, Get, Post } from '@atosjs/azura';

@Controller('/api')
export class UserController {
  @Get('/users')
  async getUsers(req, res) {
    const users = await db.users.findAll();
    res.json(users);
  }

  @Post('/users')
  async createUser(req, res) {
    const user = await db.users.create(req.body);
    res.status(201).json(user);
  }
}`,
    title: "Controllers com Decorators",
  },
  {
    language: "typescript",
    code: `import { AzuraServer } from '@atosjs/azura';
import { AuthPlugin } from './plugins/AuthPlugin';

const app = new AzuraServer();

// Registrar plugin de autenticação
app.registerPlugin(AuthPlugin, {
  secret: process.env.JWT_SECRET
});

// Rota protegida
app.get('/protected', 
  app.auth.requireAuth(), 
  (req, res) => {
    res.json({ message: 'Acesso autorizado' });
  }
);`,
    title: "Plugins e Middlewares",
  },
];

export function HeroCode() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [displayedCode, setDisplayedCode] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    setIsTyping(true);
    setDisplayedCode("");
    setCurrentCharIndex(0);

    const code = codeExamples[activeIndex].code;
    let typingInterval: NodeJS.Timeout;
    let changeTimeout: NodeJS.Timeout;

    const typeNextChar = () => {
      setCurrentCharIndex((prev) => {
        const next = prev + 1;

        if (next <= code.length) {
          setDisplayedCode(code.slice(0, next));
          return next;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
          changeTimeout = setTimeout(
            () => setActiveIndex((i) => (i + 1) % codeExamples.length),
            5000
          );
          return prev;
        }
      });
    };

    const startTimeout = setTimeout(() => {
      typingInterval = setInterval(typeNextChar, 25);
    }, 500);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(typingInterval);
      clearTimeout(changeTimeout);
    };
  }, [activeIndex]);

  return (
    <div className="relative bg-black rounded-xl overflow-hidden border border-purple-700/50">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-950 border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-sm text-gray-400 font-mono">{codeExamples[activeIndex].title}</div>
        <div className="text-sm text-gray-500 font-mono">{codeExamples[activeIndex].language}</div>
      </div>
      <div className="p-4 font-mono text-sm overflow-x-auto">
        <pre className="text-gray-300 whitespace-pre-wrap">
          {displayedCode}
          {isTyping && (
            <motion.span
              className="inline-block w-2 h-4 bg-purple-500 align-middle"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
            ></motion.span>
          )}
        </pre>
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center p-2 bg-gradient-to-t from-black to-transparent">
        <div className="flex space-x-2">
          {codeExamples.map((example, index) => (
            <button
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-colors",
                activeIndex === index ? "bg-purple-500" : "bg-gray-600 hover:bg-gray-500"
              )}
              onClick={() => setActiveIndex(index)}
              aria-label={`Exemplo ${index + 1}: ${example.title}`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}
