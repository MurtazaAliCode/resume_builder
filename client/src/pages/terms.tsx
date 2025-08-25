import { ArrowLeft, FileText, Shield, CreditCard, Users } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Terms() {
  const sections = [
    {
      icon: Users,
      title: "User Accounts & Data",
      content: [
        "You must create an account to access our resume building services.",
        "You retain full ownership of all resume data you create on our platform.",
        "Account information is securely stored and never shared with third parties.",
        "You can delete your account and data at any time through your dashboard.",
        "We use industry-standard security measures to protect your information."
      ]
    },
    {
      icon: CreditCard,
      title: "Payment and Services",
      content: [
        "Two service options: (1) Edit existing templates or (2) Create resumes from scratch.",
        "Each option costs $5 for watermark-free PDF download and premium features.",
        "Free trial available with watermark on downloaded PDFs.",
        "Payments are processed securely through industry-standard providers.",
        "Template purchases and custom resume creations are final and non-refundable.",
        "In case of technical issues preventing download, contact support for assistance."
      ]
    },
    {
      icon: FileText,
      title: "Service Access & Features",
      content: [
        "Account registration required to access all platform features.",
        "Choose between editing existing templates or creating from scratch.",
        "Free trial includes watermarked PDF downloads and limited customization.",
        "Premium ($3) service provides watermark-free PDFs and full customization.",
        "All users get access to AI-powered suggestions and real-time preview.",
        "Template library contains 130+ professionally designed resumes."
      ]
    },
    {
      icon: Shield,
      title: "Fair Use Policy",
      content: [
        "Our service is intended for personal job search and career advancement.",
        "Bulk downloading or automated access is prohibited.",
        "Reselling or redistributing our templates is not permitted.",
        "We reserve the right to limit usage that impacts service performance."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent mb-6">
            Terms & Conditions
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Please read these terms carefully. By using our service, you agree to these conditions.
          </p>
        </div>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <Card key={index} className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 text-white rounded-t-lg">
                <CardTitle className="flex items-center text-xl">
                  <section.icon className="mr-3 h-6 w-6" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Questions About Our Terms?</h2>
            <p className="text-gray-600 mb-6">
              If you have any questions about these terms and conditions, please don't hesitate to contact us.
            </p>
            <Link href="/contact">
              <Button className="btn-primary">Contact Support</Button>
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Last updated: January 2024</p>
        </div>
      </div>
    </div>
  );
}