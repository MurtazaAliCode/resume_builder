import { Link, useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { categories, generateTemplates } from "../lib/resume-data";
import { useState, useEffect } from "react";

export default function Templates() {
  const { category } = useParams<{ category?: string }>();
  const [, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState(category || "modern");

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      setLocation('/auth/login');
      return;
    }
  }, [setLocation]);

  const categoryInfo = categories.find(c => c.id === selectedCategory);
  const templates = generateTemplates(selectedCategory, 30);

  if (!categoryInfo) {
    return (
      <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Category not found</h1>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Categories
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {categoryInfo.name} Templates
          </h1>
          <p className="text-muted-foreground">Choose from 30 professionally designed templates</p>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(cat.id)}
              className="mb-2"
            >
              {cat.name}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {templates.map((template) => (
            <Card key={template.id} className="template-card">
              <div className="h-64 bg-background border-b border-border relative overflow-hidden">
                {/* Resume Template Preview */}
                <div className="p-4 text-xs space-y-2">
                  <div className="bg-muted h-3 w-20 rounded"></div>
                  <div className="bg-muted/60 h-2 w-16 rounded"></div>
                  <div className="space-y-1 pt-2">
                    <div className="bg-muted h-1.5 w-full rounded"></div>
                    <div className="bg-muted h-1.5 w-3/4 rounded"></div>
                    <div className="bg-muted h-1.5 w-2/3 rounded"></div>
                  </div>
                  <div className="bg-primary/20 h-2 w-12 rounded mt-3"></div>
                  <div className="space-y-1">
                    <div className="bg-muted/40 h-1 w-full rounded"></div>
                    <div className="bg-muted/40 h-1 w-5/6 rounded"></div>
                    <div className="bg-muted/40 h-1 w-4/5 rounded"></div>
                  </div>
                </div>
              </div>

              <CardContent className="p-4">
                <h3 className="font-semibold text-foreground mb-1">{template.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{template.description}</p>

                <div className="space-y-2">
                  <Link href={`/builder/${template.id}?type=trial`}>
                    <Button variant="outline" className="w-full">
                      Free Trial
                    </Button>
                  </Link>
                  <Link href={`/builder/${template.id}?type=paid`}>
                    <Button className="w-full btn-primary">
                      Purchase for $5
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
