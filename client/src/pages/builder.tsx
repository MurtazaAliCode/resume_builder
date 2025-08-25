import { useParams, useLocation, Link } from "wouter";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";
import { generateTemplates } from "../lib/resume-data";
import { ResumePreview } from "../components/resume-preview";
import { generateAISuggestions } from "../lib/ai-suggestions";
import { generatePDF } from "../lib/pdf-generator";
import { ProfileUpload } from "../components/profile-upload";
import { AIChatbot } from "../components/ai-chatbot";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { ResumeData } from "@shared/schema";

export default function Builder() {
  const { templateId } = useParams<{ templateId?: string }>();
  const [location] = useLocation();
  const urlParams = new URLSearchParams(location.split('?')[1] || '');
  const isPaid = urlParams.get('type') === 'paid';

  const [currentStep, setCurrentStep] = useState(1);
  const [showRanking, setShowRanking] = useState(false);
  const [suggestions, setSuggestions] = useState<Record<string, string[]>>({});
  
  const [resumeData, setResumeData] = useState<ResumeData>({
    personal: {},
    education: {},
    skills: {},
    additional: {},
  });

  // Check authentication and load saved data
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      window.location.href = '/auth/login';
      return;
    }

    const saved = localStorage.getItem('resumeBuilder_data');
    if (saved) {
      try {
        setResumeData(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to load saved data:', error);
      }
    }
  }, []);

  // Save to localStorage whenever resumeData changes
  useEffect(() => {
    localStorage.setItem('resumeBuilder_data', JSON.stringify(resumeData));
  }, [resumeData]);

  const template = templateId ? generateTemplates("modern", 30).find(t => t.id === templateId) : null;

  if (!template) {
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
    { id: 5, name: 'Review & Finalize', icon: '✅' },
  ];

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
    if (value.length > 2 && ['title', 'description', 'technical'].includes(field)) {
      const suggestionKey = `${section}_${field}`;
      const aiSuggestions = await generateAISuggestions(field, value);
      setSuggestions(prev => ({ ...prev, [suggestionKey]: aiSuggestions }));
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
    generatePDF(resumeData, template, isPaid);
  };

  const getMissingFields = () => {
    const missing = [];
    if (!resumeData.personal.name) missing.push('Name');
    if (!resumeData.personal.email) missing.push('Email');
    if (!resumeData.education.degree) missing.push('Education');
    if (!resumeData.skills.technical) missing.push('Skills');
    return missing;
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoForm
            data={resumeData.personal}
            onChange={(field, value) => handleInputChange('personal', field, value)}
            suggestions={suggestions}
            onApplySuggestion={(field, suggestion) => applySuggestion('personal', field, suggestion)}
          />
        );
      case 2:
        return (
          <EducationForm
            data={resumeData.education}
            onChange={(field, value) => handleInputChange('education', field, value)}
          />
        );
      case 3:
        return (
          <SkillsForm
            data={resumeData.skills}
            onChange={(field, value) => handleInputChange('skills', field, value)}
            suggestions={suggestions}
            onApplySuggestion={(field, suggestion) => applySuggestion('skills', field, suggestion)}
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
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
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
                Template: {template.name} ({isPaid ? 'Paid' : 'Free Trial'})
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
                  <div className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-primary' : 'text-muted-foreground'
                  }`}>
                    {step.name}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-primary' : 'bg-border'
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
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                <Button
                  onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
                  disabled={currentStep === 5}
                  className="btn-primary"
                >
                  {currentStep === 5 ? 'Complete' : 'Next'}
                  <ChevronRight className="ml-2 h-4 w-4" />
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
              <ResumePreview resumeData={resumeData} template={template} isPaid={isPaid} />
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
            // Apply suggestion to current active field
            console.log('Chatbot suggestion:', suggestion);
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
  suggestions?: Record<string, string[]>;
  onApplySuggestion?: (field: string, suggestion: string) => void;
}

function PersonalInfoForm({ data, onChange, suggestions, onApplySuggestion }: FormProps) {
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
          {suggestions && suggestions.personal_title && (
            <SuggestionBox
              suggestions={suggestions.personal_title}
              onApply={(suggestion) => onApplySuggestion && onApplySuggestion('title', suggestion)}
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
        value={data.profilePicture}
        onChange={(imageData) => onChange('profilePicture', imageData)}
      />

      <ProfileUpload 
        value={data.profilePicture}
        onChange={(imageData) => onChange('profilePicture', imageData)}
      />
    </div>
  );
}

function EducationForm({ data, onChange }: Omit<FormProps, 'suggestions' | 'onApplySuggestion'>) {
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

function SkillsForm({ data, onChange, suggestions, onApplySuggestion }: FormProps) {
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
          {suggestions && suggestions.skills_technical && (
            <SuggestionBox
              suggestions={suggestions.skills_technical}
              onApply={(suggestion) => onApplySuggestion && onApplySuggestion('technical', suggestion)}
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
          {suggestions && suggestions.skills_description && (
            <SuggestionBox
              suggestions={suggestions.skills_description}
              onApply={(suggestion) => onApplySuggestion && onApplySuggestion('description', suggestion)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function AdditionalForm({ data, onChange }: Omit<FormProps, 'suggestions' | 'onApplySuggestion'>) {
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

function ReviewForm({ resumeData, isPaid, onDownload }: { resumeData: ResumeData; isPaid: boolean; onDownload: () => void }) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Review & Finalize</h3>
      
      <div className="space-y-4">
        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium text-foreground mb-3">Resume Summary</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p><strong>Name:</strong> {resumeData.personal.name || 'Not provided'}</p>
              <p><strong>Email:</strong> {resumeData.personal.email || 'Not provided'}</p>
              <p><strong>Education:</strong> {resumeData.education.degree || 'Not provided'}</p>
              <p><strong>Experience:</strong> {resumeData.skills.jobTitle || 'Not provided'}</p>
            </div>
          </CardContent>
        </Card>

        <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
          <div className="flex items-center text-primary">
            <span className="text-sm">
              {isPaid ? 'Premium version - No watermark on PDF' : 'Free trial - PDF will include watermark'}
            </span>
          </div>
        </div>

        <Button onClick={onDownload} className="w-full bg-emerald-600 hover:bg-emerald-700">
          Download Resume PDF
        </Button>
      </div>
    </div>
  );
}

function SuggestionBox({ suggestions, onApply }: { suggestions: string[], onApply: (suggestion: string) => void }) {
  return (
    <div className="mt-2 space-y-1">
      <p className="text-xs text-muted-foreground">AI Suggestions:</p>
      {suggestions.slice(0, 4).map((suggestion, i) => (
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

function RankingModal({ score, missingFields, onClose }: { score: number; missingFields: string[]; onClose: () => void }) {
  return (
    <div className="text-center p-4">
      <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <TrendingUp className="h-10 w-10 text-emerald-600" />
      </div>
      
      <div className="text-4xl font-bold text-emerald-600 mb-4">
        {score}%
      </div>
      
      <p className="text-muted-foreground mb-6">
        Your resume has a <strong>{score}% chance</strong> of securing a job interview!
      </p>

      {missingFields.length > 0 && (
        <div className="bg-amber-50 p-4 rounded-lg mb-6 border border-amber-200">
          <p className="text-sm text-amber-800 mb-2">
            <strong>Improve your score by adding:</strong>
          </p>
          <ul className="text-sm text-amber-700">
            {missingFields.map((field: string) => (
              <li key={field}>• {field}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-3">
        <Button onClick={onClose} className="w-full">
          Continue Editing
        </Button>
      </div>
    </div>
  );
}
