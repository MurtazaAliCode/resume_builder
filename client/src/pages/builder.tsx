import { useParams, Link } from "wouter";
import { useState, useEffect } from "react";
import { ArrowLeft, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PdfPreview } from "@/components/pdf-preview";
import { Template } from "@shared/schema";

export default function Builder() {
  const { templateId: paramTemplateId } = useParams<{ templateId?: string }>();
  const urlParams = new URLSearchParams(window.location.search);
  const templateId = urlParams.get('template') || paramTemplateId || 'default';
  const templateCategory = urlParams.get('category') || 'classic';
  const isPremium = urlParams.get('premium') === 'true';

  const templateNumber = templateId.split('_')[1];
  const paddedNumber = String(templateNumber).padStart(2, '0');
  const fileName = `${templateCategory}_${paddedNumber}.pdf`;

  const fetchedTemplate: Template = {
    id: templateId,
    name: templateId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    category: templateCategory,
    isPremium: isPremium,
    rating: 5,
    downloads: "1000+",
    filePath: `/resume-templates/${templateCategory}/${fileName}`,
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center">
          <Link href="/templates">
            <Button variant="ghost">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Templates
            </Button>
          </Link>
          <a href={fetchedTemplate.filePath} download>
            <Button className="btn-primary px-8 py-3 text-lg">
              <Download className="mr-2 h-5 w-5" />
              Download PDF
            </Button>
          </a>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Resume Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <PdfPreview filePath={fetchedTemplate.filePath} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}