import { ArrowLeft, Mail, ClipboardList, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CoverLetters() {
  const sections = [
    {
      icon: Mail,
      title: "The Purpose of a Cover Letter",
      content: [
        "Introduce yourself and express your interest in a specific role.",
        "Highlight your most relevant skills and experiences.",
        "Show your personality and enthusiasm for the company.",
        "Explain any gaps in your resume or other potential red flags.",
      ],
    },
    {
      icon: ClipboardList,
      title: "Key Components of a Strong Cover Letter",
      content: [
        "A clear and concise introduction that states the position you are applying for.",
        "A body that highlights your relevant skills and experience, with specific examples.",
        "A conclusion that reiterates your interest in the position and includes a call to action.",
        "Your contact information.",
      ],
    },
    {
      icon: Sparkles,
      title: "Tips for Writing an Effective Cover Letter",
      content: [
        "Keep it to one page.",
        "Use a professional tone and format.",
        "Proofread carefully before sending.",
        "Customize each cover letter for the specific job.",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/resources">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Resources
          </Button>
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent mb-6">
            Crafting Compelling Cover Letters
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A cover letter is your opportunity to make a great first impression on a potential employer.
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
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready to Write Your Cover Letter?</h2>
            <p className="text-gray-600 mb-6">
              Use our AI-powered tools to generate a professional cover letter in minutes.
            </p>
            <Link href="/templates">
              <Button className="btn-primary">Get Started</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
