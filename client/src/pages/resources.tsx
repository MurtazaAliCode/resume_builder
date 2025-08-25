import { ArrowLeft, BookOpen, Users, Target, Search, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Resources() {
  const resourceCategories = [
    {
      icon: BookOpen,
      title: "Cover Letters",
      description: "Master the art of compelling cover letters",
      color: "bg-blue-500",
      articles: [
        "How to Write a Winning Cover Letter That Gets Results",
        "Cover Letter Templates for Every Industry",
        "Common Cover Letter Mistakes to Avoid",
        "Customizing Your Cover Letter for Each Job",
        "How to Address Employment Gaps in Cover Letters"
      ]
    },
    {
      icon: Users,
      title: "Interview Prep",
      description: "Master your interviews with expert tips",
      color: "bg-purple-500",
      articles: [
        "Top 20 Interview Questions and Answers",
        "How to Handle Difficult Interview Scenarios",
        "Body Language Tips for Interview Success",
        "Preparing for Technical Interviews",
        "Follow-up Strategies After Interviews"
      ]
    },
    {
      icon: Target,
      title: "Career Advice",
      description: "Strategic guidance for career advancement",
      color: "bg-teal-500",
      articles: [
        "Building a Strategic Career Development Plan",
        "How to Transition to a New Industry Successfully",
        "Networking Strategies That Actually Work",
        "Salary Negotiation Tactics for Maximum Results",
        "Building Your Personal Brand for Career Growth"
      ]
    },
    {
      icon: Search,
      title: "Job Search Tools",
      description: "Resources to accelerate your job search",
      color: "bg-orange-500",
      articles: [
        "Top Job Boards for Your Industry",
        "LinkedIn Optimization Checklist",
        "Building a Strong Professional Network",
        "Remote Work Opportunities Guide",
        "Freelancing vs Full-time: Making the Choice"
      ]
    }
  ];

  const featuredResources = [
    {
      title: "2024 Salary Report",
      description: "Comprehensive salary data across industries and locations",
      type: "Report",
      isExternal: true
    },
    {
      title: "Resume Templates Gallery",
      description: "Browse our collection of 120+ professional templates",
      type: "Templates",
      isExternal: false,
      link: "/templates"
    },
    {
      title: "Career Assessment Tool",
      description: "Discover your ideal career path with our free assessment",
      type: "Tool",
      isExternal: true
    }
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
            Career Resources
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Everything you need to succeed in your career journey - from resume building to interview mastery.
          </p>
        </div>

        {/* Featured Resources */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Featured Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredResources.map((resource, index) => (
              <Card key={index} className="template-card group cursor-pointer">
                <CardContent className="p-6">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                    {resource.type}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{resource.title}</h3>
                  <p className="text-gray-600 mb-4">{resource.description}</p>
                  {resource.isExternal ? (
                    <Button variant="outline" className="w-full group-hover:bg-blue-50">
                      Learn More <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Link href={resource.link || "#"}>
                      <Button variant="outline" className="w-full group-hover:bg-blue-50">
                        Explore Now
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Resource Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {resourceCategories.map((category, index) => (
            <Card key={index} className="shadow-2xl border-0">
              <CardHeader className="bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 text-white rounded-t-lg">
                <div className="flex items-center">
                  <div className={`${category.color} w-12 h-12 rounded-lg flex items-center justify-center mr-4`}>
                    <category.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{category.title}</CardTitle>
                    <p className="text-blue-100 mt-1">{category.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {category.articles.map((article, articleIndex) => (
                    <Link key={articleIndex} href={`/resources/${category.title.toLowerCase().replace(' ', '-')}`}>
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-4"></div>
                        <span className="text-gray-700 group-hover:text-blue-600 flex-1">{article}</span>
                        <ExternalLink className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t">
                  <Link href={`/resources/${category.title.toLowerCase().replace(' ', '-')}`}>
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                      View All {category.title}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 rounded-2xl shadow-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Put These Tips into Action?
          </h2>
          <p className="text-xl mb-8 opacity-95">
            Start building your professional resume with our AI-powered platform
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