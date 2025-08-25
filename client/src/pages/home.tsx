import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Smartphone, Bot, Briefcase, Palette, Building, Code, Star } from "lucide-react";
import { categories } from "../lib/resume-data";

export default function Home() {
  const stats = [
    { label: "Resumes Created", value: "50,000+" },
    { label: "Average Success Rate", value: "85%" },
    { label: "Professional Templates", value: "120+" },
    { label: "AI Assistance", value: "24/7" },
  ];

  const features = [
    { icon: CheckCircle, label: "120+ Templates", color: "text-emerald-500" },
    { icon: Bot, label: "AI-Powered", color: "text-primary" },
    { icon: Smartphone, label: "Mobile Friendly", color: "text-purple-500" },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance animate-fade-in">
              Create a Professional Resume with{" "}
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 bg-clip-text text-transparent block animate-pulse">80-90% Job Success Rate in Minutes!</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Join thousands of professionals who landed their dream jobs using our AI-powered resume builder. 
              Choose from 120+ professionally designed templates.
            </p>
            <Link href="/templates">
              <Button className="btn-primary text-lg">
                Start Building Your Resume Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-muted-foreground">
              {features.map((feature) => (
                <div key={feature.label} className="flex items-center">
                  <feature.icon className={`h-5 w-5 mr-2 ${feature.color}`} />
                  <span className="text-sm font-medium">{feature.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Choose Your Resume Style
            </h2>
            <p className="text-xl text-muted-foreground">
              Each category contains 30+ professionally designed templates
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => {
              const iconMap = {
                "Code": Code,
                "Briefcase": Briefcase,
                "Palette": Palette,
                "Building": Building,
              };
              const IconComponent = iconMap[category.icon as keyof typeof iconMap] || Code;

              return (
                <Card key={category.id} className="template-card card-hover group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-100 to-teal-100 opacity-50"></div>
                  <CardContent className="p-6 relative z-10">
                    <div className={`${category.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">{category.name}</h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">{category.description}</p>
                    <div className="bg-white/80 p-4 rounded-xl mb-6 border border-gray-200">
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                        ))}
                      </div>
                      <p className="text-sm text-gray-700 italic">"{category.testimonial}"</p>
                    </div>
                    <Link href={`/templates/${category.id}`}>
                      <Button className="w-full btn-primary text-lg py-3">View Templates</Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
