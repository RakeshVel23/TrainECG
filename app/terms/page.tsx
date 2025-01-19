import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function TermsOfService() {
  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Terms of Service</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm">
          <p>Last updated: {new Date().toLocaleDateString()}</p>

          <h3>1. Terms</h3>
          <p>
            By accessing MedSandbox, you agree to be bound by these terms of service and comply with all applicable laws and regulations.
          </p>

          <h3>2. Educational Purpose</h3>
          <p>
            MedSandbox is an educational tool designed to support learning. The simulations and information provided should not be used for medical diagnosis or treatment decisions.
          </p>

          <h3>3. Use License</h3>
          <p>
            Permission is granted to temporarily access the materials on MedSandbox for personal, non-commercial educational use only.
          </p>

          <h3>4. Disclaimer</h3>
          <p>
            The materials on MedSandbox are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
          </p>

          <h3>5. Limitations</h3>
          <p>
            In no event shall MedSandbox or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.
          </p>

          <h3>6. Accuracy of Materials</h3>
          <p>
            While we strive for accuracy, the materials appearing on MedSandbox could include technical, typographical, or photographic errors. We do not warrant that any of the materials are accurate, complete, or current.
          </p>

          <h3>7. Links</h3>
          <p>
            We have not reviewed all of the sites linked to our website and are not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by MedSandbox.
          </p>

          <h3>8. Modifications</h3>
          <p>
            We may revise these terms of service at any time without notice. By using this website, you agree to be bound by the current version of these terms of service.
          </p>
        </CardContent>
      </Card>
    </div>
  )
} 