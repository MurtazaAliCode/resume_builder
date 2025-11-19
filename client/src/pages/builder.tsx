import { useParams, useLocation, Link } from "wouter";
import { useState, useEffect } from "react";
import { ArrowLeft, Save, Download, TrendingUp, Users, Star, Crown, ImageIcon, Type, Palette, ArrowRight } from "lucide-react"; // Added ArrowRightimport { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generatePDF } from "../lib/pdf-generator";
import { ResumeData, createEmptyResumeData } from "../lib/resume-data";
import { getSuggestion } from "../lib/ai-suggestions";
import RankingModal from "../components/ranking-modal";
import AIChatbot from "../components/ai-chatbot";
import ProfileUpload from "../components/profile-upload";
import ResumePreview from "../components/resume-preview";

export default function Builder() {
  const { templateId: paramTemplateId } = useParams<{ templateId?: string }>(); // Renamed to avoid conflict
  const [location] = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [resumeData, setResumeData] = useState<ResumeData>(createEmptyResumeData());
  const [showRanking, setShowRanking] = useState(false);
  const [suggestions, setSuggestions] = useState<Record<string, string[]>>({});
  const [isGeneratingSuggestion, setIsGeneratingSuggestion] = useState<string | null>(null);
  const [templateCustomization, setTemplateCustomization] = useState({
    fontFamily: 'Arial',
    fontSize: '12',
    primaryColor: '#3B82F6',
    secondaryColor: '#6B7280',
    layout: 'standard'
  });

  // Get template info from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const templateId = urlParams.get('template') || paramTemplateId || 'default'; // Use paramTemplateId if available
  const templateCategory = urlParams.get('category') || 'classic';
  const isPremium = urlParams.get('premium') === 'true';

  const template = {
    id: templateId,
    name: templateId.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
    category: templateCategory,
    isPaid: isPremium
  };
  const isPaid = template.isPaid;

  // Check authentication and load saved data
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      window.location.href = '/auth/login';
      return;
    }

    const saved = localStorage.getItem(`resumeBuilder_data_${templateId}`); // Save data per template
    if (saved) {
      try {
        setResumeData(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to load saved data:', error);
      }
    } else {
      // If no saved data for this template, initialize with empty data
      setResumeData(createEmptyResumeData());
    }
  }, [templateId]); // Re-run when templateId changes

  // Save to localStorage whenever resumeData changes
  useEffect(() => {
    localStorage.setItem(`resumeBuilder_data_${templateId}`, JSON.stringify(resumeData));
  }, [resumeData, templateId]);

  // TODO: Replace with actual template fetching based on templateId
  // For now, using a mock template object based on URL params
  const fetchedTemplate = {
    id: templateId,
    name: templateId.charAt(0).toUpperCase() + templateId.slice(1).replace('_', ' '),
    description: "A professionally designed resume template.",
    category: templateCategory,
    isPaid: isPremium,
    previewImage: "/path/to/preview.jpg" // Placeholder
  };

  if (!fetchedTemplate) { // This check might be redundant if we always provide a default
    return (
      <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Template not found</h1>
          <Link href="/templates">
            <Button>Back to Templates</Button>
          </Link>
        </div>
      </div>
    );
  }

  const steps = [
    { id: 1, name: 'Personal Info', icon: '👤' },
    { id: 2, name: 'Education', icon: '🎓' },
    { id: 3, name: 'Skills & Experience', icon: '💼' },
    { id: 4, name: 'Languages & Additional', icon: '🌍' },
    { id: 5, name: 'Review & Customize', icon: '✨' }, // Changed icon for customization
  ];

  const calculateCompleteness = () => {
    let score = 0;
    let totalFields = 0;

    // Personal Info
    totalFields += 4;
    if (resumeData.personal.name) score += 1;
    if (resumeData.personal.email) score += 1;
    if (resumeData.personal.title) score += 1;
    if (resumeData.personal.phone) score += 1;

    // Education
    totalFields += 4;
    if (resumeData.education.degree) score += 1;
    if (resumeData.education.institution) score += 1;
    if (resumeData.education.startYear) score += 1;
    if (resumeData.education.endYear) score += 1;

    // Skills & Experience
    totalFields += 5; // Assuming jobTitle, company, duration, description, technical skills
    if (resumeData.skills.jobTitle) score += 1;
    if (resumeData.skills.company) score += 1;
    if (resumeData.skills.duration) score += 1;
    if (resumeData.skills.description) score += 1;
    if (resumeData.skills.technical) score += 1;

    // Languages & Additional
    totalFields += 3; // Assuming languages, certifications, projects
    if (resumeData.additional.languages) score += 1;
    if (resumeData.additional.certifications) score += 1;
    if (resumeData.additional.projects) score += 1;

    return Math.min(Math.round((score / totalFields) * 100), 100);
  };

  const calculateRanking = () => {
    let score = 70; // Base score
    if (resumeData.personal.name) score += 5;
    if (resumeData.personal.email) score += 5;
    if (resumeData.education.degree) score += 5;
    if (resumeData.skills.technical) score += 5;
    if (resumeData.skills.jobTitle) score += 5;
    return Math.min(score, 90);
  };

  const handleInputChange = async (section: keyof ResumeData, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));

    // Generate AI suggestions for certain fields
    if (value.length > 2 && ['title', 'description', 'technical', 'personal_title', 'education_degree'].includes(field)) {
      const suggestionKey = `${section}_${field}`;
      setIsGeneratingSuggestion(suggestionKey);
      try {
        // Mock AI suggestion generation
        const aiSuggestions = await getSuggestion(field, value);
        setSuggestions(prev => ({ ...prev, [suggestionKey]: aiSuggestions }));
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      } finally {
        setIsGeneratingSuggestion(null);
      }
    }
  };

  const applySuggestion = (section: keyof ResumeData, field: string, suggestion: string) => {
    setResumeData(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: suggestion }
    }));
    // Clear suggestions after applying
    const suggestionKey = `${section}_${field}`;
    setSuggestions(prev => {
      const newSuggestions = { ...prev };
      delete newSuggestions[suggestionKey];
      return newSuggestions;
    });
  };

  const handleDownloadPDF = () => {
    // Pass customization options to the PDF generator
    generatePDF(resumeData, fetchedTemplate, isPaid, templateCustomization);
  };

  const getMissingFields = () => {
    const missing = [];
    if (!resumeData.personal.name) missing.push('Name');
    if (!resumeData.personal.email) missing.push('Email');
    if (!resumeData.education.degree) missing.push('Education Degree');
    if (!resumeData.skills.technical) missing.push('Technical Skills');
    if (!resumeData.skills.jobTitle) missing.push('Job Title');
    if (!resumeData.skills.company) missing.push('Company Name');
    if (!resumeData.skills.duration) missing.push('Job Duration');
    if (!resumeData.skills.description) missing.push('Job Description');
    return missing;
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoForm
            data={resumeData.personal}
            onChange={(field, value) => handleInputChange('personal', field, value)}
            suggestions={suggestions.personal_title} // Pass specific suggestion
            onApplySuggestion={(field, suggestion) => applySuggestion('personal', field, suggestion)}
            isGenerating={isGeneratingSuggestion === 'personal_title'}
          />
        );
      case 2:
        return (
          <EducationForm
            data={resumeData.education}
            onChange={(field, value) => handleInputChange('education', field, value)}
            suggestions={suggestions.education_degree} // Pass specific suggestion
            onApplySuggestion={(field, suggestion) => applySuggestion('education', field, suggestion)}
            isGenerating={isGeneratingSuggestion === 'education_degree'}
          />
        );
      case 3:
        return (
          <SkillsForm
            data={resumeData.skills}
            onChange={(field, value) => handleInputChange('skills', field, value)}
            suggestions={suggestions.skills_technical || suggestions.skills_description} // Combine or select appropriate
            onApplySuggestion={(field, suggestion) => applySuggestion('skills', field, suggestion)}
            isGenerating={isGeneratingSuggestion === 'skills_technical' || isGeneratingSuggestion === 'skills_description'}
          />
        );
      case 4:
        return (
          <AdditionalForm
            data={resumeData.additional}
            onChange={(field, value) => handleInputChange('additional', field, value)}
          />
        );
      case 5:
        return (
          <ReviewForm
            resumeData={resumeData}
            isPaid={isPaid}
            onDownload={handleDownloadPDF}
            calculateCompleteness={calculateCompleteness}
            getMissingFields={getMissingFields}
            templateCustomization={templateCustomization}
            onTemplateCustomizationChange={setTemplateCustomization}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-muted/30" style={{ fontFamily: templateCustomization.fontFamily }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/templates">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Templates
            </Button>
          </Link>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Resume Builder</h1>
              <p className="text-muted-foreground">
                Template: {fetchedTemplate.name} ({isPaid ? 'Premium' : 'Free'})
              </p>
            </div>
            {currentStep === 5 && (
              <Button onClick={() => setShowRanking(true)} className="bg-emerald-600 hover:bg-emerald-700">
                <TrendingUp className="mr-2 h-4 w-4" />
                Check Success Rate
              </Button>
            )}
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex items-center justify-between min-w-max">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`step-indicator ${currentStep >= step.id ? 'step-active' : 'step-inactive'}`}>
                  <span className="text-lg">{step.icon}</span>
                </div>
                <div className="ml-3 hidden md:block">
                  <div className={`text-sm font-medium ${currentStep >= step.id ? 'text-primary' : 'text-muted-foreground'
                    }`}>
                    {step.name}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-0.5 mx-4 ${currentStep > step.id ? 'bg-primary' : 'bg-border'
                    }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <Card>
            <CardContent className="p-6">
              {renderCurrentStep()}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                <Button
                  onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
                  disabled={currentStep === 5}
                  className="btn-primary"
                >
                  {currentStep === 5 ? 'Download' : 'Next'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Preview Section */}
          <Card>
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResumePreview
                resumeData={resumeData}
                template={fetchedTemplate}
                isPaid={isPaid}
                customization={templateCustomization}
              />
            </CardContent>
          </Card>
        </div>

        {/* Ranking Modal */}
        <Dialog open={showRanking} onOpenChange={setShowRanking}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center">Success Rate Analysis</DialogTitle>
            </DialogHeader>
            <RankingModal
              score={calculateRanking()}
              missingFields={getMissingFields()}
              onClose={() => setShowRanking(false)}
            />
          </DialogContent>
        </Dialog>

        {/* AI Chatbot */}
        <AIChatbot
          onSuggestion={(suggestion) => {
            // This basic example applies to the current field being edited.
            // A more sophisticated implementation would identify the target field.
            console.log('Chatbot suggestion:', suggestion);
            // For now, let's assume it applies to the 'description' field in the current step if available.
            if (currentStep === 3) { // Skills & Experience step
              applySuggestion('skills', 'description', suggestion);
            } else if (currentStep === 1) { // Personal Info step
              applySuggestion('personal', 'title', suggestion);
            }
          }}
          context={{
            field: 'general',
            value: 'resume help'
          }}
        />
      </div>
    </div>
  );
}

// Form Components  
interface FormProps {
  data: any;
  onChange: (field: string, value: string) => void;
  suggestions?: string[];
  onApplySuggestion?: (field: string, suggestion: string) => void;
  isGenerating?: boolean;
}

function PersonalInfoForm({ data, onChange, suggestions, onApplySuggestion, isGenerating }: FormProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            placeholder="Enter your full name"
            value={data.name || ''}
            onChange={(e) => onChange('name', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            value={data.email || ''}
            onChange={(e) => onChange('email', e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={data.phone || ''}
            onChange={(e) => onChange('phone', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Professional Title</Label>
          <Input
            id="title"
            placeholder="e.g. Software Engineer"
            value={data.title || ''}
            onChange={(e) => onChange('title', e.target.value)}
          />
          {suggestions && suggestions.length > 0 && (
            <SuggestionBox
              suggestions={suggestions}
              onApply={(suggestion) => onApplySuggestion && onApplySuggestion('title', suggestion)}
              isGenerating={isGenerating}
            />
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="linkedin">LinkedIn Profile</Label>
        <Input
          id="linkedin"
          type="url"
          placeholder="https://linkedin.com/in/yourname"
          value={data.linkedin || ''}
          onChange={(e) => onChange('linkedin', e.target.value)}
          className="input-glow"
        />
      </div>

      <ProfileUpload
        label="Profile Picture"
        value={data.profilePicture}
        onChange={(imageData) => onChange('profilePicture', imageData)}
      />
    </div>
  );
}

function EducationForm({ data, onChange, suggestions, onApplySuggestion, isGenerating }: FormProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Education</h3>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="degree">Degree *</Label>
          <Input
            id="degree"
            placeholder="e.g. Bachelor of Science in Computer Science"
            value={data.degree || ''}
            onChange={(e) => onChange('degree', e.target.value)}
          />
          {suggestions && suggestions.length > 0 && (
            <SuggestionBox
              suggestions={suggestions}
              onApply={(suggestion) => onApplySuggestion && onApplySuggestion('degree', suggestion)}
              isGenerating={isGenerating}
            />
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="institution">Institution *</Label>
          <Input
            id="institution"
            placeholder="University name"
            value={data.institution || ''}
            onChange={(e) => onChange('institution', e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startYear">Start Year</Label>
            <Input
              id="startYear"
              type="number"
              placeholder="2018"
              value={data.startYear || ''}
              onChange={(e) => onChange('startYear', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endYear">End Year</Label>
            <Input
              id="endYear"
              type="number"
              placeholder="2022"
              value={data.endYear || ''}
              onChange={(e) => onChange('endYear', e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="gpa">GPA (Optional)</Label>
          <Input
            id="gpa"
            placeholder="3.8/4.0"
            value={data.gpa || ''}
            onChange={(e) => onChange('gpa', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

function SkillsForm({ data, onChange, suggestions, onApplySuggestion, isGenerating }: FormProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Skills & Experience</h3>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="technical">Technical Skills</Label>
          <Textarea
            id="technical"
            rows={3}
            placeholder="e.g. JavaScript, React, Node.js, Python, SQL"
            value={data.technical || ''}
            onChange={(e) => onChange('technical', e.target.value)}
          />
          {suggestions && suggestions.length > 0 && (
            <SuggestionBox
              suggestions={suggestions}
              onApply={(suggestion) => onApplySuggestion && onApplySuggestion('technical', suggestion)}
              isGenerating={isGenerating}
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="jobTitle">Job Title</Label>
            <Input
              id="jobTitle"
              placeholder="Software Engineer"
              value={data.jobTitle || ''}
              onChange={(e) => onChange('jobTitle', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Company Name</Label>
            <Input
              id="company"
              placeholder="Company Name"
              value={data.company || ''}
              onChange={(e) => onChange('company', e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Duration</Label>
          <Input
            id="duration"
            placeholder="e.g. Jan 2020 - Present"
            value={data.duration || ''}
            onChange={(e) => onChange('duration', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Job Description</Label>
          <Textarea
            id="description"
            rows={4}
            placeholder="Describe your responsibilities and achievements..."
            value={data.description || ''}
            onChange={(e) => onChange('description', e.target.value)}
          />
          {suggestions && suggestions.length > 0 && (
            <SuggestionBox
              suggestions={suggestions}
              onApply={(suggestion) => onApplySuggestion && onApplySuggestion('description', suggestion)}
              isGenerating={isGenerating}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function AdditionalForm({ data, onChange }: Omit<FormProps, 'suggestions' | 'onApplySuggestion' | 'isGenerating'>) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Languages & Additional Information</h3>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="languages">Languages</Label>
          <Textarea
            id="languages"
            rows={2}
            placeholder="e.g. English (Native), Spanish (Fluent), French (Intermediate)"
            value={data.languages || ''}
            onChange={(e) => onChange('languages', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="certifications">Certifications</Label>
          <Textarea
            id="certifications"
            rows={3}
            placeholder="List your professional certifications..."
            value={data.certifications || ''}
            onChange={(e) => onChange('certifications', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="projects">Projects</Label>
          <Textarea
            id="projects"
            rows={4}
            placeholder="Describe your notable projects..."
            value={data.projects || ''}
            onChange={(e) => onChange('projects', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

function ReviewForm({
  resumeData,
  isPaid,
  onDownload,
  calculateCompleteness,
  getMissingFields,
  templateCustomization,
  onTemplateCustomizationChange
}: {
  resumeData: ResumeData;
  isPaid: boolean;
  onDownload: () => void;
  calculateCompleteness: () => number;
  getMissingFields: () => string[];
  templateCustomization: { fontFamily: string; fontSize: string; primaryColor: string; secondaryColor: string; layout: string };
  onTemplateCustomizationChange: (customization: { fontFamily: string; fontSize: string; primaryColor: string; secondaryColor: string; layout: string }) => void;
}) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Review & Customize</h3>

      <div className="space-y-4">
        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium text-foreground mb-3">Resume Summary</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p><strong>Name:</strong> {resumeData.personal.name || 'Not provided'}</p>
              <p><strong>Email:</strong> {resumeData.personal.email || 'Not provided'}</p>
              <p><strong>Education:</strong> {resumeData.education.degree || 'Not provided'}</p>
              <p><strong>Experience:</strong> {resumeData.skills.jobTitle || resumeData.skills.company || 'Not provided'}</p>
            </div>
          </CardContent>
        </Card>

        {/* Advanced Customization Panel */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Palette className="mr-2 h-5 w-5" />
              Design Customization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fontFamily">Font Family</Label>
                <Select value={templateCustomization.fontFamily} onValueChange={(value) =>
                  onTemplateCustomizationChange({ ...templateCustomization, fontFamily: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Arial">Arial</SelectItem>
                    <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                    <SelectItem value="Calibri">Calibri</SelectItem>
                    <SelectItem value="Georgia">Georgia</SelectItem>
                    <SelectItem value="Helvetica">Helvetica</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fontSize">Font Size</Label>
                <Select value={templateCustomization.fontSize} onValueChange={(value) =>
                  onTemplateCustomizationChange({ ...templateCustomization, fontSize: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10pt</SelectItem>
                    <SelectItem value="11">11pt</SelectItem>
                    <SelectItem value="12">12pt</SelectItem>
                    <SelectItem value="13">13pt</SelectItem>
                    <SelectItem value="14">14pt</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="primaryColor">Primary Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={templateCustomization.primaryColor}
                    onChange={(e) => onTemplateCustomizationChange({ ...templateCustomization, primaryColor: e.target.value })}
                    className="w-16 h-10 p-0"
                  />
                  <Input
                    value={templateCustomization.primaryColor}
                    onChange={(e) => onTemplateCustomizationChange({ ...templateCustomization, primaryColor: e.target.value })}
                    placeholder="#3B82F6"
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="layout">Layout Style</Label>
                <Select value={templateCustomization.layout} onValueChange={(value) =>
                  onTemplateCustomizationChange({ ...templateCustomization, layout: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="modern">Modern</SelectItem>
                    <SelectItem value="creative">Creative</SelectItem>
                    <SelectItem value="minimal">Minimal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="bg-card rounded-lg border p-6">
          <h4 className="text-lg font-semibold mb-4 flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-emerald-600" />
            Resume Completeness: {calculateCompleteness()}%
          </h4>
          <Progress value={calculateCompleteness()} className="mb-4" />

          {getMissingFields().length > 0 && (
            <Alert className="mb-4">
              <AlertDescription>
                <strong>Suggestion:</strong> Consider adding {getMissingFields().join(', ')} to improve your resume's effectiveness.
              </AlertDescription>
            </Alert>
          )}
        </div>

        <div className="flex gap-4 justify-center">
          <Button onClick={onDownload} className="btn-primary px-8 py-3">
            <Download className="mr-2 h-5 w-5" />
            Download PDF {!isPaid && "(Watermarked)"}
          </Button>
          {!isPaid && (
            <Button variant="outline" className="px-8 py-3">
              <Crown className="mr-2 h-5 w-5" />
              Upgrade for $3
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function SuggestionBox({ suggestions, onApply, isGenerating }: { suggestions: string[], onApply: (suggestion: string) => void, isGenerating?: boolean }) {
  return (
    <div className="mt-2 space-y-1">
      <p className="text-xs text-muted-foreground flex items-center">
        AI Suggestions: {isGenerating && <span className="ml-2 animate-pulse">Generating...</span>}
      </p>
      {!isGenerating && suggestions.length > 0 && suggestions.slice(0, 4).map((suggestion, i) => (
        <button
          key={i}
          className="block w-full text-left p-2 text-sm bg-muted hover:bg-muted/80 rounded border transition-colors"
          onClick={() => onApply(suggestion)}
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
}