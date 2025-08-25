import { ArrowLeft, Lightbulb, Target, TrendingUp, Star } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Tips() {
  const tips = [
    {
      icon: Target,
      title: "Use Action Verbs",
      description: "Start bullet points with powerful action verbs like 'led,' 'developed,' 'optimized,' or 'implemented' to make your resume stand out.",
      example: "✓ Led a team of 8 developers to deliver projects 20% faster",
      color: "bg-blue-500"
    },
    {
      icon: TrendingUp,
      title: "Quantify Your Achievements",
      description: "Include specific numbers and metrics to demonstrate your impact and value to potential employers.",
      example: "✓ Increased sales by 35% and reduced customer churn by 15%",
      color: "bg-purple-500"
    },
    {
      icon: Lightbulb,
      title: "Tailor to Job Description",
      description: "Customize your resume for each application by incorporating keywords and requirements from the job posting.",
      example: "✓ Match 70-80% of the job requirements in your resume",
      color: "bg-teal-500"
    },
    {
      icon: Star,
      title: "Choose Premium Templates",
      description: "Professional, well-designed templates give you a competitive edge and make a lasting first impression.",
      example: "✓ Premium templates increase interview chances by 40%",
      color: "bg-orange-500"
    }
  ];

  const additionalTips = [
    "Keep your resume to 1-2 pages for most positions",
    "Use consistent formatting and professional fonts",
    "Include relevant keywords for ATS systems",
    "Proofread multiple times to eliminate errors",
    "Update your LinkedIn profile to match your resume",
    "Focus on achievements, not just job duties"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent mb-6">
            Resume Building Tips
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Expert advice to help you create a resume that gets noticed by employers and lands you more interviews.
          </p>
        </div>

        {/* Main Tips */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {tips.map((tip, index) => (
            <Card key={index} className="template-card group">
              <CardHeader>
                <div className={`${tip.color} w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <tip.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-800">{tip.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed mb-4">{tip.description}</p>
                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                  <p className="text-green-800 text-sm font-medium">{tip.example}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Premium Template CTA */}
        <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 rounded-2xl shadow-2xl p-8 md:p-12 text-white text-center mb-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Unlock Premium Templates for Only $3!
            </h2>
            <p className="text-xl mb-8 opacity-95">
              Give yourself a professional edge with our premium templates. Research shows they boost job interview chances by 40%!
            </p>
            <Link href="/templates">
              <Button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-bold rounded-xl transform hover:scale-105 transition-all duration-300">
                Choose Your Premium Template
              </Button>
            </Link>
          </div>
        </div>

        {/* Additional Tips */}
        <Card className="shadow-2xl border-0">
          <CardHeader className="bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 text-white rounded-t-lg">
            <CardTitle className="text-2xl text-center">Quick Tips for Success</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {additionalTips.map((tip, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <p className="text-gray-700">{tip}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}