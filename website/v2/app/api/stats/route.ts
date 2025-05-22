import { NextResponse } from "next/server";

export async function GET() {
  // Gerar dados aleatórios para demonstração
  const data = [
    { label: "Jan", value: Math.floor(Math.random() * 100) + 20 },
    { label: "Feb", value: Math.floor(Math.random() * 100) + 20 },
    { label: "Mar", value: Math.floor(Math.random() * 100) + 20 },
    { label: "Apr", value: Math.floor(Math.random() * 100) + 20 },
    { label: "May", value: Math.floor(Math.random() * 100) + 20 },
    { label: "Jun", value: Math.floor(Math.random() * 100) + 20 },
  ];

  return NextResponse.json({ data });
}
