import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function TermsOfService() {
  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Terms of Service</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Add your terms of service content here */}
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <p className="mt-4">
            By accessing and using Medical Learning Tools, you agree to be bound by these terms and conditions...
          </p>
        </CardContent>
      </Card>
    </div>
  )
} 