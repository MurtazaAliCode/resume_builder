import { ArrowLeft, TrendingUp, Target, Users, DollarSign, Lightbulb, Award } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CareerAdvice() {
  const careerStages = [
    {
      stage: "Early Career (0-3 years)",
      icon: Lightbulb,
      color: "bg-green-500",
      advice: [
        "Focus on skill development and learning",
        "Seek mentorship and feedback",
        "Build a strong professional network",
        "Take on stretch assignments",
        "Document your achievements"
      ]
    },
    {
      stage: "Mid Career (4-10 years)",
      icon: TrendingUp,
      color: "bg-blue-500",
      advice: [
        "Develop leadership and management skills",
        "Consider specialization vs. generalization",
        "Build your personal brand",
        "Negotiate salary and benefits strategically",
        "Explore different companies and roles"
      ]
    },
    {
      stage: "Senior Career (10+ years)",
      icon: Award,
      color: "bg-purple-500",
      advice: [
        "Focus on strategic thinking and vision",
        "Mentor others and give back",
        "Consider executive education",
        "Build industry thought leadership",
        "Plan for succession and legacy"
      ]
    }
  ];

  const industryTransitionTips = [
    {
      title: "Research the Target Industry",
      description: "Understand market trends, key players, required skills, and growth opportunities",
      action: "Spend 2-3 months learning about the industry through reports, podcasts, and networking"
    },
    {
      title: "Identify Transferable Skills",
      description: "Map your current skills to what's valued in the new industry",
      action: "Create a skills inventory and highlight relevant experience in your resume"
    },
    {
      title: "Build Industry Knowledge",
      description: "Take courses, earn certifications, or complete projects relevant to your target field",
      action: "Invest in 1-2 key certifications or complete online courses from recognized institutions"
    },
    {
      title: "Network Strategically",
      description: "Connect with professionals in your target industry through LinkedIn and events",
      action: "Attend 2-3 industry events monthly and conduct informational interviews"
    },
    {
      title: "Start with Adjacent Roles",
      description: "Consider roles that bridge your current and target industries",
      action: "Look for positions that value your experience while moving toward your goal"
    }
  ];

  const networkingStrategies = [
    {
      strategy: "LinkedIn Optimization",
      description: "Create a compelling profile that showcases your expertise and attracts opportunities",
      tips: ["Professional headshot", "Keyword-rich headline", "Detailed experience section", "Regular content sharing"]
    },
    {
      strategy: "Industry Events & Conferences",
      description: "Attend relevant events to meet professionals and stay current with trends",
      tips: ["Prepare elevator pitch", "Bring business cards", "Follow up within 48 hours", "Volunteer or speak at events"]
    },
    {
      strategy: "Informational Interviews",
      description: "Learn about roles and companies while building relationships",
      tips: ["Ask for 15-20 minutes", "Come prepared with questions", "Show genuine interest", "Always send thank you notes"]
    },
    {
      strategy: "Professional Associations",
      description: "Join industry groups to access resources and networking opportunities",
      tips: ["Attend monthly meetings", "Volunteer for committees", "Participate in online forums", "Pursue leadership roles"]
    }
  ];

  const salaryNegotiationTips = [
    {
      phase: "Research Phase",
      actions: [
        "Use salary comparison websites (Glassdoor, PayScale, Levels.fyi)",
        "Network with professionals in similar roles",
        "Consider total compensation, not just base salary",
        "Factor in location and company size"
      ]
    },
    {
      phase: "Preparation Phase",
      actions: [
        "Document your achievements and quantifiable results",
        "Prepare your value proposition",
        "Practice your negotiation conversation",
        "Determine your minimum acceptable offer"
      ]
    },
    {
      phase: "Negotiation Phase",
      actions: [
        "Let them make the first offer",
        "Ask for time to consider the offer",
        "Negotiate total package, not just salary",
        "Be prepared to walk away if necessary"
      ]
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
            Career Advancement Guide
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Strategic advice to accelerate your career growth, from early career development to senior leadership.
          </p>
        </div>

        {/* Career Stages */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Career Stage Strategies</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {careerStages.map((stage, index) => (
              <Card key={index} className="template-card">
                <CardHeader>
                  <div className={`${stage.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                    <stage.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{stage.stage}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {stage.advice.map((advice, adviceIndex) => (
                      <div key={adviceIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700 text-sm">{advice}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Industry Transition */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Successful Industry Transitions</h2>
          <div className="space-y-6">
            {industryTransitionTips.map((tip, index) => (
              <Card key={index} className="template-card">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mr-4 flex-shrink-0">
                      <Target className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{tip.title}</h3>
                      <p className="text-gray-600 mb-3">{tip.description}</p>
                      <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                        <p className="text-blue-800 text-sm font-medium">Action Step: {tip.action}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Networking Strategies */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Networking That Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {networkingStrategies.map((strategy, index) => (
              <Card key={index} className="template-card">
                <CardHeader>
                  <div className="flex items-center mb-2">
                    <Users className="h-6 w-6 text-purple-600 mr-3" />
                    <CardTitle className="text-xl">{strategy.strategy}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{strategy.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-800">Key Actions:</h4>
                    {strategy.tips.map((tip, tipIndex) => (
                      <div key={tipIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700 text-sm">{tip}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Salary Negotiation */}
        <Card className="shadow-2xl border-0 mb-16">
          <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-t-lg">
            <CardTitle className="text-2xl text-center flex items-center justify-center">
              <DollarSign className="h-6 w-6 mr-3" />
              Salary Negotiation Strategy
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {salaryNegotiationTips.map((phase, index) => (
                <div key={index}>
                  <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">{phase.phase}</h3>
                  <div className="space-y-3">
                    {phase.actions.map((action, actionIndex) => (
                      <div key={actionIndex} className="flex items-start">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                          <span className="text-green-600 text-sm font-bold">{actionIndex + 1}</span>
                        </div>
                        <p className="text-gray-700 text-sm">{action}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 rounded-2xl shadow-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Advance Your Career?
          </h2>
          <p className="text-xl mb-8 opacity-95">
            Start with a professional resume that opens doors to new opportunities
          </p>
          <Link href="/templates">
            <Button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-bold rounded-xl transform hover:scale-105 transition-all duration-300">
              Build Your Professional Resume
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}