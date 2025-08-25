
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, Star, Crown, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Template {
  id: string;
  name: string;
  category: string;
  isPremium: boolean;
  rating: number;
  downloads: string;
  filePath: string;
}

export default function Templates() {
  const [templates, setTemplates] = useState<Template[]>([]);

  useEffect(() => {
    // Generate templates from the resume-templates folder structure
    const generateTemplates = () => {
      const categories = ['classic', 'corporate', 'creative', 'modern'];
      const allTemplates: Template[] = [];

      categories.forEach(category => {
        // Generate 30 templates per category based on the PDF files in each folder
        for (let i = 1; i <= 30; i++) {
          const templateNumber = i.toString().padStart(2, '0');
          allTemplates.push({
            id: `${category}_${templateNumber}`,
            name: `${category.charAt(0).toUpperCase() + category.slice(1)} Template ${i}`,
            category,
            isPremium: i > 15, // First 15 are free, rest are premium
            rating: Math.round((4.5 + Math.random() * 0.5) * 10) / 10,
            downloads: `${Math.floor(Math.random() * 5000) + 1000}+`,
            filePath: `/src/resume-templates/${category}/${category}_${templateNumber}.pdf`
          });
        }
      });

      return allTemplates;
    };

    setTemplates(generateTemplates());
  }, []);

  const categories = [
    { id: 'classic', name: 'Classic', description: 'Traditional and professional designs' },
    { id: 'modern', name: 'Modern', description: 'Contemporary and sleek layouts' },
    { id: 'creative', name: 'Creative', description: 'Unique and artistic designs' },
    { id: 'corporate', name: 'Corporate', description: 'Business-focused professional templates' }
  ];

  const getTemplatesByCategory = (category: string) => {
    return templates.filter(template => template.category === category);
  };

  const handleTemplateSelect = (template: Template) => {
    // Navigate to builder with template data
    window.location.href = `/builder?template=${template.id}&category=${template.category}&premium=${template.isPremium}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent mb-6">
            Choose Your Template
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            120+ professionally designed resume templates organized by category. Start with free templates or upgrade to premium for $3.
          </p>
        </div>

        {/* Premium CTA */}
        <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 rounded-2xl shadow-2xl p-8 text-white text-center mb-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Unlock All Premium Templates for Only $3!</h2>
            <p className="text-lg opacity-95 mb-6">
              Get access to our complete library with advanced customization, watermark-free downloads, and premium features.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 px-3 py-1 rounded-full">✓ Watermark-free PDF download</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">✓ Advanced customization options</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">✓ Premium font & color choices</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">✓ 90%+ job success optimization</span>
            </div>
          </div>
        </div>

        {/* Template Categories */}
        <Tabs defaultValue="classic" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="text-sm">
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{category.name} Templates</h2>
                <p className="text-gray-600">{category.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {getTemplatesByCategory(category.id).map((template) => (
                  <Card 
                    key={template.id} 
                    className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-blue-300"
                    onClick={() => handleTemplateSelect(template)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <Badge variant={template.isPremium ? "default" : "secondary"} className="mb-2">
                          {template.isPremium ? (
                            <>
                              <Crown className="h-3 w-3 mr-1" />
                              Premium $3
                            </>
                          ) : (
                            "Free"
                          )}
                        </Badge>
                        <div className="flex items-center text-sm text-gray-500">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                          {template.rating}
                        </div>
                      </div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Template Preview Placeholder */}
                      <div className="aspect-[8.5/11] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center border">
                        <div className="text-center text-gray-500">
                          <Eye className="h-8 w-8 mx-auto mb-2" />
                          <p className="text-sm">PDF Preview</p>
                          <p className="text-xs">{template.id}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span className="flex items-center">
                          <Download className="h-4 w-4 mr-1" />
                          {template.downloads}
                        </span>
                        <span className="capitalize">{template.category}</span>
                      </div>

                      <Button 
                        className="w-full group-hover:bg-blue-600 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTemplateSelect(template);
                        }}
                      >
                        {template.isPremium ? "Select Premium ($3)" : "Use Free Template"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
