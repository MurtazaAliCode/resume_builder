import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Plus, Layout, User, LogOut, Crown, PlusCircle } from "lucide-react";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      setLocation('/auth/login');
      return;
    }

    const name = localStorage.getItem('userName') || 'User';
    setUserName(name);
  }, [setLocation]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    setLocation('/');
  };

  const options = [
    {
      icon: Layout,
      title: "Choose from Templates",
      description: "Browse 120+ professional templates across 4 categories",
      features: ["Modern designs", "ATS-optimized", "Industry-specific"],
      color: "bg-blue-500",
      href: "/templates"
    },
    {
      icon: Plus,
      title: "Create from Scratch",
      description: "Build your resume from ground up with AI assistance",
      features: ["Complete customization", "AI-powered suggestions", "Real-time preview"],
      color: "bg-purple-500",
      href: "/builder"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="h-8 w-8 text-purple-600" />
              <span className="text-2xl font-bold text-gray-800">ResumeBuilder Pro</span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-gray-600" />
                <span className="text-gray-700">Welcome, {userName}</span>
              </div>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Ready to Build Your
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent block">
              Professional Resume?
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose how you'd like to create your resume. Both options include our premium features and AI assistance.
          </p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {options.map((option, index) => (
            <Card key={index} className="template-card group relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 opacity-50"></div>

              <CardHeader className="relative z-10 text-center pb-4">
                <div className={`${option.color} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-xl`}>
                  <option.icon className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-800 mb-3">
                  {option.title}
                </CardTitle>
                <p className="text-gray-600 leading-relaxed">
                  {option.description}
                </p>
              </CardHeader>

              <CardContent className="relative z-10 space-y-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800 text-center">Includes:</h4>
                  {option.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
                  <div className="flex items-center justify-center mb-2">
                    <Crown className="h-5 w-5 text-yellow-600 mr-2" />
                    <span className="font-semibold text-yellow-800">Premium Option</span>
                  </div>
                  <p className="text-center text-yellow-700 text-sm">
                    Free trial with watermark or $5 for watermark-free PDF
                  </p>
                </div>

                <Link href={option.href}>
                  <Button className="w-full btn-primary text-lg py-4">
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Why Choose ResumeBuilder Pro?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">85%</div>
                <p className="text-gray-600">Average Success Rate</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">120+</div>
                <p className="text-gray-600">Professional Templates</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-teal-600 mb-2">50K+</div>
                <p className="text-gray-600">Successful Users</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}