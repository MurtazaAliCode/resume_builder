import { ArrowLeft, FileText, CheckCircle, Star, Download } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CoverLetters() {
  const coverLetterTips = [
    {
      title: "Start with a Strong Opening",
      description: "Grab attention from the first sentence. Mention the specific position and show enthusiasm.",
      example: "I am excited to apply for the Software Engineer position at TechCorp, where I can contribute my 5+ years of full-stack development experience."
    },
    {
      title: "Research the Company",
      description: "Show you've done your homework. Mention specific company values, recent news, or projects.",
      example: "I was impressed by TechCorp's recent expansion into AI-driven solutions, which aligns perfectly with my background in machine learning."
    },
    {
      title: "Highlight Relevant Achievements",
      description: "Use specific numbers and metrics to demonstrate your impact in previous roles.",
      example: "In my previous role, I led a team that increased application performance by 40% and reduced server costs by $50,000 annually."
    },
    {
      title: "Address Employment Gaps",
      description: "If you have gaps, address them positively and focus on skills gained during that time.",
      example: "During my career break, I completed advanced certifications in cloud computing and contributed to open-source projects."
    }
  ];

  const templates = [
    { name: "Professional Standard", industry: "General Business", rating: 5 },
    { name: "Tech Industry Focus", industry: "Technology", rating: 5 },
    { name: "Creative Professional", industry: "Design/Marketing", rating: 4.8 },
    { name: "Healthcare Specialist", industry: "Healthcare", rating: 4.9 },
    { name: "Finance Professional", industry: "Finance/Banking", rating: 4.7 }
  ];

  const commonMistakes = [
    "Using a generic template for every application",
    "Repeating everything already on your resume",
    "Making it too long (keep it to one page)",
    "Forgetting to customize for each position",
    "Not including a clear call to action",
    "Poor formatting or spelling errors"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/resources">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Resources
          </Button>
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent mb-6">
            Cover Letter Mastery
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Learn how to write compelling cover letters that get you noticed by employers and land more interviews.
          </p>
        </div>

        {/* Cover Letter Tips */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Essential Cover Letter Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {coverLetterTips.map((tip, index) => (
              <Card key={index} className="template-card">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                    {tip.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{tip.description}</p>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="text-blue-800 text-sm font-medium italic">"{tip.example}"</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Cover Letter Templates */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Industry-Specific Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {templates.map((template, index) => (
              <Card key={index} className="template-card text-center">
                <CardContent className="p-6">
                  <FileText className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{template.name}</h3>
                  <p className="text-gray-600 mb-3">{template.industry}</p>
                  <div className="flex items-center justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < Math.floor(template.rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">{template.rating}</span>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Common Mistakes */}
        <Card className="shadow-2xl border-0 mb-16">
          <CardHeader className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-t-lg">
            <CardTitle className="text-2xl text-center">Common Cover Letter Mistakes to Avoid</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {commonMistakes.map((mistake, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <span className="text-red-600 text-sm font-bold">✗</span>
                  </div>
                  <p className="text-gray-700">{mistake}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 rounded-2xl shadow-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Write Your Perfect Cover Letter?
          </h2>
          <p className="text-xl mb-8 opacity-95">
            Combine your new cover letter knowledge with our professional resume templates
          </p>
          <Link href="/templates">
            <Button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-bold rounded-xl transform hover:scale-105 transition-all duration-300">
              Create Your Resume Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}