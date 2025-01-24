import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Link from "next/link"

export default function HomePage() {
  const tools = {
    pathology: [
      {
        title: "Full Blood Count",
        description: "Interpret blood counts and identify haematological conditions",
        href: "/pathology/blood-test",
      },
      {
        title: "Arterial Blood Gas",
        description: "Analyze acid-base status and oxygenation",
        href: "/pathology/abg",
      },
      {
        title: "Liver Function Tests",
        description: "Analyze liver enzymes and identify hepatic conditions",
        href: "/pathology/lft",
      },
      {
        title: "Renal Profile",
        description: "Interpret renal function and urine tests",
        href: "/pathology/renal",
      },
      {
        title: "Thyroid Function",
        description: "Analyze thyroid hormones and identify thyroid disorders",
        href: "/pathology/thyroid",
      },
      {
        title: "Diabetes Screen",
        description: "Interpret glucose and HbA1c results",
        href: "/pathology/diabetes",
      },
    ],
    physiology: [
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
    ],
  }

  return (
    <main className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-4 text-gray-800">MedSandbox</h1>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Interactive medical learning tools for students and educators 
          This website is in its early stages of development. There may be bugs and errors.
        </p>

        {/* Physiology Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">Physiology Simulators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tools.physiology.map((tool) => (
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

        {/* Pathology Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">Pathology Interpretation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tools.pathology.map((tool) => (
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
      </div>
    </main>
  )
}