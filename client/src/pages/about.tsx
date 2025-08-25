import { ArrowLeft, Users, Target, Award, Zap } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  const features = [
    {
      icon: Target,
      title: "Our Mission",
      description: "Empowering job seekers with premium, AI-guided resume-building tools to achieve their career goals and land their dream jobs.",
      color: "bg-blue-500"
    },
    {
      icon: Users,
      title: "50,000+ Success Stories",
      description: "Thousands of professionals have successfully landed interviews and job offers using our platform.",
      color: "bg-purple-500"
    },
    {
      icon: Award,
      title: "Premium Quality",
      description: "120+ professionally designed templates optimized for ATS systems and modern recruiters.",
      color: "bg-teal-500"
    },
    {
      icon: Zap,
      title: "AI-Powered",
      description: "Advanced AI technology provides personalized suggestions to make your resume stand out.",
      color: "bg-orange-500"
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
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent mb-6">
            About ResumeBuilder Pro
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're passionate about helping professionals create outstanding resumes that open doors to new opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="template-card group">
              <CardContent className="p-8">
                <div className={`${feature.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of successful job seekers who transformed their careers with our platform.
            </p>
            <Link href="/templates">
              <Button className="btn-primary text-lg">
                Start Building Your Resume
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}