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
      title: "Kidney Physiology Simulator",
      description: "Explore how different variables affect GFR and clearance through interactive sliders",
      href: "/kidney-sim",
    },
  ]

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Medical Learning Tools</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {tools.map((tool) => (
          <Link href={tool.href} key={tool.href} className="hover:opacity-80">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>{tool.title}</CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  )
}