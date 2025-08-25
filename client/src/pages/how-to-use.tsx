import { ArrowLeft, Play, FileText, Download, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function HowToUse() {
  const steps = [
    {
      number: "01",
      title: "Choose Your Template",
      description: "Browse through 120+ professional templates across 4 categories. Pick the one that matches your industry and style.",
      icon: FileText,
      color: "bg-blue-500"
    },
    {
      number: "02", 
      title: "Select Trial or Purchase",
      description: "Start with a free trial (includes watermark) or purchase for $5 to get a clean, professional PDF.",
      icon: Play,
      color: "bg-purple-500"
    },
    {
      number: "03",
      title: "Follow AI Guidance",
      description: "Our AI assistant helps you write compelling content. Get 4 optimized suggestions for each field to make your resume stand out.",
      icon: Sparkles,
      color: "bg-teal-500"
    },
    {
      number: "04",
      title: "Download Your Resume",
      description: "Review your completed resume and download it as a professional PDF. Ready to land your dream job!",
      icon: Download,
      color: "bg-orange-500"
    }
  ];

  const tips = [
    "Use action verbs like 'developed', 'led', 'implemented' to start your bullet points",
    "Include specific numbers and metrics to quantify your achievements",
    "Tailor your resume for each job application using our AI suggestions",
    "Keep your resume to 1-2 pages for most positions",
    "Proofread carefully before downloading your final PDF"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent mb-6">
            How to Use ResumeBuilder Pro
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Follow these simple steps to create a professional resume that gets you noticed by employers.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <Card key={index} className="template-card text-center group">
              <CardContent className="p-8">
                <div className="text-4xl font-bold text-gray-200 mb-4">{step.number}</div>
                <div className={`${step.color} w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tips Section */}
        <Card className="shadow-2xl border-0 mb-12">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
              Pro Tips for Success
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tips.map((tip, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <span className="text-white text-sm font-bold">{index + 1}</span>
                  </div>
                  <p className="text-gray-700">{tip}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to Create Your Resume?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Start building your professional resume now and land your dream job faster.
            </p>
            <Link href="/templates">
              <Button className="btn-primary text-lg mr-4">
                Start Building Now
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" className="text-lg">
                Learn More About Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}