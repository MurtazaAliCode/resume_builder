import { ArrowLeft, Check, Crown, Star, Zap } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Pricing() {
  const plans = [
    {
      name: "Free Trial",
      price: "$0",
      description: "Perfect for testing our platform",
      features: [
        "Access to all 120+ templates",
        "AI-powered resume suggestions",
        "Profile picture upload",
        "Real-time preview",
        "5-step guided process",
        "Watermarked PDF download"
      ],
      limitations: [
        "Watermarked PDF",
        "Limited customization",
        "Basic template access"
      ],
      color: "border-gray-300",
      bgColor: "bg-gray-50",
      textColor: "text-gray-600",
      buttonStyle: "bg-gray-200 text-gray-800 hover:bg-gray-300"
    },
    {
      name: "Premium",
      price: "$3",
      description: "Invest in your career success",
      features: [
        "Everything in Free Trial",
        "Watermark-free PDF download",
        "Advanced customization options",
        "Premium font & color choices",
        "Professional template designs",
        "Priority AI suggestions",
        "90%+ job success optimization"
      ],
      limitations: [],
      color: "border-yellow-400",
      bgColor: "bg-gradient-to-br from-yellow-50 to-orange-50",
      textColor: "text-yellow-800",
      buttonStyle: "btn-primary",
      popular: true,
      badge: "Most Popular"
    }
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
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent mb-6">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Start with our free trial or invest $3 for a resume that lands your dream job!
          </p>
        </div>

        {/* Value Proposition */}
        <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl shadow-2xl p-8 md:p-12 text-white text-center mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Crown className="h-12 w-12 text-yellow-300 mr-4" />
              <h2 className="text-3xl md:text-4xl font-bold">
                Why Invest $3 in Your Career?
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">40%</div>
                <p className="text-lg opacity-90">Higher interview rate with premium templates</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">90%+</div>
                <p className="text-lg opacity-90">Job success rate optimization</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">$50K+</div>
                <p className="text-lg opacity-90">Average salary increase our users achieve</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <Card key={index} className={`${plan.color} ${plan.bgColor} relative overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 ${plan.popular ? 'transform scale-105 ring-4 ring-yellow-400' : ''}`}>
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-bl-lg font-bold text-sm">
                  <Star className="inline h-4 w-4 mr-1" />
                  {plan.badge}
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className={`text-3xl font-bold ${plan.textColor}`}>
                  {plan.name}
                </CardTitle>
                <div className="mt-4">
                  <span className={`text-5xl font-bold ${plan.textColor}`}>{plan.price}</span>
                  {plan.price !== "$0" && <span className="text-lg opacity-60"> one-time</span>}
                </div>
                <p className="text-gray-600 mt-2">{plan.description}</p>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {plan.limitations.length > 0 && (
                  <div className="border-t pt-4">
                    <p className="text-sm font-medium text-red-600 mb-2">Limitations:</p>
                    <div className="space-y-2">
                      {plan.limitations.map((limitation, limitIndex) => (
                        <div key={limitIndex} className="flex items-center">
                          <div className="w-2 h-2 bg-red-400 rounded-full mr-3 flex-shrink-0"></div>
                          <span className="text-red-600 text-sm">{limitation}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Link href="/templates">
                  <Button className={`w-full py-4 text-lg font-bold ${plan.buttonStyle} ${plan.popular ? 'animate-pulse' : ''}`}>
                    {plan.price === "$0" ? "Start Free Trial" : "Get Premium Access"}
                    {plan.popular && <Zap className="ml-2 h-5 w-5" />}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Ready to Land Your Dream Job?
          </h3>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of successful professionals who invested in their career
          </p>
          <Link href="/templates">
            <Button className="btn-primary text-xl px-12 py-4">
              Start Building Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}