import { ArrowLeft, MessageCircle, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function InterviewPrep() {
  const topQuestions = [
    {
      question: "Tell me about yourself",
      tips: "Focus on professional journey, key achievements, and why you're interested in this role",
      example: "I'm a software engineer with 5 years of experience building scalable web applications. In my current role at TechCorp, I led a team that increased system performance by 40%. I'm excited about this opportunity because..."
    },
    {
      question: "Why do you want to work here?",
      tips: "Research the company, mention specific values or projects that align with your goals",
      example: "I'm impressed by your company's commitment to innovation and sustainability. Your recent launch of the green technology initiative aligns perfectly with my passion for environmental impact through technology."
    },
    {
      question: "What are your greatest strengths?",
      tips: "Choose strengths relevant to the job and provide specific examples",
      example: "My greatest strength is problem-solving. Last year, I identified a critical bug that was causing 20% performance loss and developed a solution that improved overall system efficiency."
    },
    {
      question: "Where do you see yourself in 5 years?",
      tips: "Show ambition while demonstrating commitment to growing with the company",
      example: "I see myself as a senior technical lead, mentoring junior developers and driving architectural decisions that scale with company growth."
    }
  ];

  const interviewTypes = [
    {
      type: "Behavioral Interview",
      description: "Focus on past experiences and how you handled specific situations",
      tips: ["Use the STAR method (Situation, Task, Action, Result)", "Prepare 5-7 detailed examples", "Focus on your role and impact"],
      color: "bg-blue-500"
    },
    {
      type: "Technical Interview",
      description: "Assess your technical skills through coding problems or system design",
      tips: ["Practice coding problems daily", "Think out loud during problem-solving", "Ask clarifying questions"],
      color: "bg-purple-500"
    },
    {
      type: "Cultural Fit Interview",
      description: "Evaluate how well you align with company values and team dynamics",
      tips: ["Research company culture thoroughly", "Be authentic and genuine", "Ask thoughtful questions about team dynamics"],
      color: "bg-teal-500"
    }
  ];

  const bodyLanguageTips = [
    "Maintain eye contact (70-80% of the time)",
    "Sit up straight with shoulders back",
    "Use open gestures, avoid crossing arms",
    "Mirror the interviewer's energy level",
    "Smile genuinely when appropriate",
    "Take notes to show engagement"
  ];

  const followUpSteps = [
    {
      timing: "Within 24 hours",
      action: "Send a personalized thank-you email",
      details: "Reference specific conversation points and reiterate your interest"
    },
    {
      timing: "1 week later",
      action: "Follow up if you haven't heard back",
      details: "Keep it brief and professional, expressing continued interest"
    },
    {
      timing: "2-3 weeks later",
      action: "Final follow-up",
      details: "If still no response, send one last polite email before moving on"
    }
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
            Interview Preparation Guide
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Master the art of interviewing with our comprehensive guide to common questions, techniques, and strategies.
          </p>
        </div>

        {/* Top Interview Questions */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Top Interview Questions & How to Answer</h2>
          <div className="space-y-8">
            {topQuestions.map((item, index) => (
              <Card key={index} className="template-card">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <MessageCircle className="h-6 w-6 text-blue-500 mr-3" />
                    "{item.question}"
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Strategy:</h4>
                      <p className="text-gray-600">{item.tips}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-green-800 mb-2">Example Answer:</h4>
                      <p className="text-green-700 italic">"{item.example}"</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Interview Types */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Types of Interviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {interviewTypes.map((type, index) => (
              <Card key={index} className="template-card">
                <CardHeader>
                  <div className={`${type.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{type.type}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{type.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-800">Key Tips:</h4>
                    {type.tips.map((tip, tipIndex) => (
                      <div key={tipIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700 text-sm">{tip}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Body Language */}
        <Card className="shadow-2xl border-0 mb-16">
          <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-t-lg">
            <CardTitle className="text-2xl text-center">Body Language & Presentation</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bodyLanguageTips.map((tip, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">{tip}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Follow-up Strategy */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Post-Interview Follow-up</h2>
          <div className="space-y-6">
            {followUpSteps.map((step, index) => (
              <Card key={index} className="template-card">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mr-4 flex-shrink-0">
                      <Clock className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium mr-3">
                          {step.timing}
                        </span>
                        <h3 className="text-lg font-semibold text-gray-800">{step.action}</h3>
                      </div>
                      <p className="text-gray-600">{step.details}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 rounded-2xl shadow-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Ace Your Next Interview?
          </h2>
          <p className="text-xl mb-8 opacity-95">
            Start with a professional resume that gets you in the door
          </p>
          <Link href="/templates">
            <Button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-bold rounded-xl transform hover:scale-105 transition-all duration-300">
              Build Your Resume Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}