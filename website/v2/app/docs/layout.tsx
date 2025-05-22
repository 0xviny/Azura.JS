import type React from "react";
import DocsHeader from "@/components/docs/header";
import { Sidebar } from "@/components/docs/sidebar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <DocsHeader />
      <div className="flex flex-1">
        <Sidebar className="hidden lg:block" />
        <main className="flex-1 overflow-auto">
          <div className="container max-w-4xl py-6 md:py-10">
            <div className="glass-effect p-6 rounded-lg gradient-border">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
