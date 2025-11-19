import { Card, CardContent } from "@/components/ui/card";
import type { ResumeData, Template } from "@shared/schema";
import { getDocument } from 'pdfjs-dist/build/pdf'; // Proper import for pdfjs-dist
import { useState, useEffect } from 'react';

interface ResumePreviewProps {
  resumeData: ResumeData;
  template: Template;
  isPaid: boolean;
}

export function ResumePreview({ resumeData, template, isPaid }: ResumePreviewProps) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Map of template names to their static PDF files (assuming they are in public folder)
  const templateMap: { [key: string]: string } = {
    'modern_01': '/resume-templates/modern/modern_01.pdf',
    'modern_02': '/resume-templates/modern/modern_02.pdf',
    'modern_03': '/resume-templates/modern/modern_03.pdf',
    'modern_04': '/resume-templates/modern/modern_04.pdf',
    'modern_05': '/resume-templates/modern/modern_05.pdf',
    'modern_06': '/resume-templates/modern/modern_06.pdf',
    'modern_07': '/resume-templates/modern/modern_07.pdf',
    'modern_08': '/resume-templates/modern/modern_08.pdf',
  };

  // Load PDF content
  useEffect(() => {
    const loadPdf = async () => {
      setPdfUrl(null);
      setError(null);
      try {
        const pdfPath = templateMap[template.name] || templateMap['modern_01'];
        console.log('Attempting to load PDF from path:', pdfPath);
        const loadingTask = getDocument(pdfPath);
        const pdf = await loadingTask.promise;
        console.log('PDF Document loaded:', pdf);
        if (!pdf || typeof pdf.getPage !== 'function') {
          throw new Error('Invalid PDF document object');
        }
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) throw new Error('Failed to get 2D context');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        await page.render({ canvasContext: context, viewport }).promise;
        setPdfUrl(canvas.toDataURL());
      } catch (err) {
        console.error('Error details:', err);
        setError(`Failed to load PDF: ${err.message}. Check console for details.`);
      }
    };

    loadPdf(); // Directly call since pdfjs-dist is imported
  }, [template.name]);

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white shadow-lg">
      <CardContent className="p-8" style={{ minHeight: '600px' }}>
        {!isPaid && (
          <div className="text-center text-xs text-muted-foreground mb-4 pb-2 border-b border-border opacity-60">
            ResumeBuilder Pro Free Trial - Watermark will appear on PDF
          </div>
        )}

        {error && <p className="text-red-500 text-center">{error}</p>}
        {pdfUrl && <img src={pdfUrl} alt="PDF Preview" className="w-full" />}
        {!pdfUrl && !error && <p>Loading PDF...</p>}

        <div className="space-y-6">
          {/* Header */}
          <div className="text-center border-b border-border pb-4 relative">
            {resumeData.personal.profilePicture && (
              <div className="w-20 h-20 mx-auto mb-4">
                <img
                  src={resumeData.personal.profilePicture}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full border-2 border-gray-200"
                />
              </div>
            )}
            <h1 className="text-2xl font-bold text-foreground mb-1">
              {resumeData.personal.name || 'Your Name'}
            </h1>
            <p className="text-lg text-muted-foreground mb-2">
              {resumeData.personal.title || 'Professional Title'}
            </p>
            <div className="text-sm text-muted-foreground space-x-2">
              {resumeData.personal.email && <span>{resumeData.personal.email}</span>}
              {resumeData.personal.phone && resumeData.personal.email && <span>•</span>}
              {resumeData.personal.phone && <span>{resumeData.personal.phone}</span>}
              {resumeData.personal.linkedin && (resumeData.personal.email || resumeData.personal.phone) && <span>•</span>}
              {resumeData.personal.linkedin && (
                <a href={resumeData.personal.linkedin} className="text-primary hover:underline">
                  LinkedIn
                </a>
              )}
            </div>
          </div>

          {/* Education */}
          {resumeData.education.degree && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3 border-b border-border pb-1">
                Education
              </h3>
              <div className="text-sm space-y-1">
                <p className="font-medium text-foreground">{resumeData.education.degree}</p>
                <p className="text-muted-foreground">{resumeData.education.institution}</p>
                {(resumeData.education.startYear || resumeData.education.endYear) && (
                  <p className="text-muted-foreground">
                    {resumeData.education.startYear} - {resumeData.education.endYear || 'Present'}
                  </p>
                )}
                {resumeData.education.gpa && (
                  <p className="text-muted-foreground">GPA: {resumeData.education.gpa}</p>
                )}
              </div>
            </div>
          )}

          {/* Experience */}
          {resumeData.skills.jobTitle && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3 border-b border-border pb-1">
                Experience
              </h3>
              <div className="text-sm space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-foreground">{resumeData.skills.jobTitle}</p>
                    <p className="text-muted-foreground">{resumeData.skills.company}</p>
                  </div>
                  {resumeData.skills.duration && (
                    <p className="text-muted-foreground text-xs">{resumeData.skills.duration}</p>
                  )}
                </div>
                {resumeData.skills.description && (
                  <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                    {resumeData.skills.description}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Technical Skills */}
          {resumeData.skills.technical && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3 border-b border-border pb-1">
                Technical Skills
              </h3>
              <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                {resumeData.skills.technical}
              </p>
            </div>
          )}

          {/* Languages */}
          {resumeData.additional.languages && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3 border-b border-border pb-1">
                Languages
              </h3>
              <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                {resumeData.additional.languages}
              </p>
            </div>
          )}

          {/* Certifications */}
          {resumeData.additional.certifications && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3 border-b border-border pb-1">
                Certifications
              </h3>
              <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                {resumeData.additional.certifications}
              </p>
            </div>
          )}

          {/* Projects */}
          {resumeData.additional.projects && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3 border-b border-border pb-1">
                Projects
              </h3>
              <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                {resumeData.additional.projects}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
export default ResumePreview; // Moved to top level, outside the function