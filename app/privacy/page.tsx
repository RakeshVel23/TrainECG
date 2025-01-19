import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h3>Introduction</h3>
          <p>
            MedSandbox ("we", "our", or "us") is committed to protecting your privacy. This policy explains how we handle information when you use our website.
          </p>

          <h3>Information Collection</h3>
          <p>
            We do not directly collect any personal information. However, our hosting platform (Vercel) collects basic analytics data including:
          </p>
          <ul>
            <li>Pages visited</li>
            <li>Time spent on pages</li>
            <li>Browser type and version</li>
            <li>Device type and screen size</li>
            <li>Approximate geographic location (country/region level)</li>
          </ul>

          <h3>Data Usage</h3>
          <p>
            The analytics data is used solely to understand how our educational tools are being used and to improve their functionality and user experience.
          </p>

          <h3>Third-Party Services</h3>
          <p>
            Our website is hosted on Vercel, which provides hosting and analytics services. Please refer to <a href="https://vercel.com/legal/privacy-policy" className="text-primary hover:underline">Vercel's Privacy Policy</a> for more information about their data practices.
          </p>

          <h3>Data Storage</h3>
          <p>
            All simulation parameters and calculations are performed client-side and are not stored or transmitted to any servers.
          </p>

          <h3>Changes to This Policy</h3>
          <p>
            We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.
          </p>

          <h3>Contact Us</h3>
          <p>
            If you have any questions about this privacy policy, please contact us.
          </p>
        </CardContent>
      </Card>
    </div>
  )
} 