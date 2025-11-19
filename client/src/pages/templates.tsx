
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, Star, Crown, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PdfPreview } from "@/components/pdf-preview";

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
    const classic = [
      "classic_01.pdf", "classic_02.pdf", "classic_03.pdf", "classic_04.pdf", "classic_05.pdf",
      "classic_06.pdf", "classic_07.pdf", "classic_08.pdf", "classic_09.pdf", "classic_10.pdf",
      "classic_11.pdf", "classic_12.pdf", "classic_13.pdf", "classic_14.pdf", "classic_15.pdf",
      "classic_16.pdf", "classic_17.pdf", "classic_18.pdf", "classic_19.pdf", "classic_20.pdf",
      "classic_21.pdf", "classic_22.pdf", "classic_23.pdf", "classic_24.pdf", "classic_25.pdf",
      "classic_26.pdf", "classic_27.pdf", "classic_28.pdf", "classic_29.pdf", "classic_30.pdf"
    ];

    const corporate = [
      "corporate_01.pdf", "corporate_02.pdf", "corporate_03.pdf", "corporate_04.pdf", "corporate_05.pdf",
      "corporate_06.pdf", "corporate_07.pdf", "corporate_08.pdf", "corporate_09.pdf", "corporate_10.pdf",
      "corporate_11.pdf", "corporate_12.pdf", "corporate_13.pdf", "corporate_14.pdf", "corporate_15.pdf",
      "corporate_16.pdf", "corporate_17.pdf", "corporate_19.pdf", "corporate_20.pdf",
      "corporate_21.pdf", "corporate_22.pdf", "corporate_23.pdf", "corporate_24.pdf", "corporate_25.pdf",
      "corporate_26.pdf", "corporate_27.pdf", "corporate_28.pdf", "corporate_29.pdf", "corporate_30.pdf"
    ];

    const creative = [
      "creative_21.pdf", "creative_22.pdf", "creative_23.pdf", "creative_25.pdf",
      "creative_26.pdf", "creative_27.pdf", "creative_28.pdf", "creative_29.pdf"
    ];

    const modern = [
      "modern_01.pdf", "modern_02.pdf", "modern_03.pdf", "modern_04.pdf", "modern_05.pdf",
      "modern_06.pdf", "modern_07.pdf", "modern_08.pdf", "modern_09.pdf", "modern_10.pdf",
      "modern_11.pdf", "modern_12.pdf", "modern_13.pdf", "modern_14.pdf", "modern_15.pdf",
      "modern_16.pdf", "modern_17.pdf", "modern_18.pdf", "modern_19.pdf", "modern_20.pdf",
      "modern_21.pdf", "modern_22.pdf", "modern_23.pdf", "modern_24.pdf", "modern_25.pdf",
      "modern_26.pdf", "modern_27.pdf", "modern_28.pdf", "modern_29.pdf", "modern_30.pdf"
    ];

    const generateTemplates = () => {
      const allTemplates: Template[] = [];
      const categories = { classic, corporate, creative, modern };

      Object.entries(categories).forEach(([category, files]) => {
        files.forEach((file, index) => {
          const templateNumber = parseInt(file.split('_')[1].split('.')[0]);
          const fullUrl = new URL(`/resume-templates/${category}/${file}`, window.location.origin).href;
          allTemplates.push({
            id: `${category}_${templateNumber}`,
            name: `${category.charAt(0).toUpperCase() + category.slice(1)} Template ${templateNumber}`,
            category,
            isPremium: index > 14, // First 15 are free
            rating: Math.round((4.5 + Math.random() * 0.5) * 10) / 10,
            downloads: `${Math.floor(Math.random() * 5000) + 1000}+`,
            filePath: fullUrl
          });
        });
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
    return templates
      .filter(template => template.category === category)
      .sort((a, b) => {
        const aNum = parseInt(a.id.split('_')[1]);
        const bNum = parseInt(b.id.split('_')[1]);
        return aNum - bNum;
      });
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
                      {/* Template Preview */}
                      <div className="aspect-[8.5/11] bg-white rounded-lg border overflow-hidden">
                        <PdfPreview filePath={template.filePath} />
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
