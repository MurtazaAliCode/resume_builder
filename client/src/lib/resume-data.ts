import type { Category, Template } from "@shared/schema";

export const categories: Category[] = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean, contemporary designs perfect for tech and creative roles',
    icon: 'Code',
    color: 'bg-blue-500',
    testimonial: 'Got hired at Google using a Modern template! - Sarah K.'
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional, professional layouts ideal for corporate positions',
    icon: 'Briefcase',
    color: 'bg-slate-600',
    testimonial: 'Perfect for my finance job application - Michael R.'
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold, artistic designs for designers and creative professionals',
    icon: 'Palette',
    color: 'bg-purple-500',
    testimonial: 'Landed my dream design job with this template - Emma L.'
  },
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'Executive-level templates for senior management roles',
    icon: 'Building',
    color: 'bg-emerald-500',
    testimonial: 'Impressed the C-suite with this professional look - David M.'
  }
];

export function generateTemplates(category: string, count: number): Template[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `${category}_${i + 1}`,
    name: `${category.charAt(0).toUpperCase() + category.slice(1)} Template ${i + 1}`,
    category: category as any,
    description: `Professional ${category} design optimized for ${i % 2 === 0 ? 'ATS systems' : 'modern recruiters'}`,
    preview: `template_preview_${category}_${i + 1}.png`
  }));
}

export function createEmptyResumeData(): ResumeData {
  return {
    personalInfo: { name: "", email: "", phone: "" },
    experience: [],
    education: [],
    skills: [],
    // Add more fields as per your ResumeData type
  };
}