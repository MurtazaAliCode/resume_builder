import { ArrowLeft, TrendingUp, Briefcase, Users } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CareerAdvice() {
  const sections = [
    {
      icon: TrendingUp,
      title: "Strategies for Career Growth",
      content: [
        "Set clear career goals and create a plan to achieve them.",
        "Seek out new challenges and responsibilities to expand your skills.",
        "Build a strong professional network to open up new opportunities.",
        "Find a mentor who can provide guidance and support.",
      ],
    },
    {
      icon: Briefcase,
      title: "Tips for Professional Development",
      content: [
        "Never stop learning and developing new skills.",
        "Improve your soft skills, such as communication and teamwork.",
        "Stay up-to-date with industry trends and technologies.",
        "Be open to feedback and willing to learn from your mistakes.",
      ],
    },
    {
      icon: Users,
      title: "Networking for Success",
      content: [
        "Attend industry events and conferences.",
        "Connect with people on LinkedIn and other professional networking sites.",
        "Join professional organizations.",
        "Don't be afraid to ask for help or advice.",
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
            Career Advancement Advice
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Take your career to the next level with our expert advice.
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
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready to Advance Your Career?</h2>
            <p className="text-gray-600 mb-6">
              Our tools and resources can help you achieve your career goals.
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
