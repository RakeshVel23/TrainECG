import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Link from "next/link"

export default function HomePage() {
  const tools = [
    {
      title: "ECG Axis Interpretation",
      description: "Practice identifying electrical axis using interactive QRS complexes",
      href: "/ecg-axis",
    },
    {
      title: "GFR Simulator",
      description: "Explore how different variables affect GFR through interactive sliders",
      href: "/kidney-sim",
    },
  ]

  return (
    <main className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-4 text-gray-800">MedSandbox</h1>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Interactive medical learning tools for students and educators
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {tools.map((tool) => (
            <Link href={tool.href} key={tool.href} className="transition-transform hover:scale-105">
              <Card className="h-full bg-white/80 backdrop-blur border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">{tool.title}</CardTitle>
                  <CardDescription className="text-gray-600">{tool.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}