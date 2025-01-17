import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Add your privacy policy content here */}
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <p className="mt-4">
            This privacy policy describes how Medical Learning Tools collects, uses, and protects your information...
          </p>
        </CardContent>
      </Card>
    </div>
  )
} 