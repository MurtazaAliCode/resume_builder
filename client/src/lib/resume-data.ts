import type { ResumeData, Template } from "@shared/schema";

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  testimonial: string;
}

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
    category,
    isPremium: i > 14, // First 15 are free
    rating: Math.round((4.5 + Math.random() * 0.5) * 10) / 10,
    downloads: `${Math.floor(Math.random() * 5000) + 1000}+`,
    filePath: `/resume-templates/${category}/${category}_${String(i + 1).padStart(2, '0')}.pdf`
  }));
}

export function createEmptyResumeData(): ResumeData {
  return {
    personal: { name: "", email: "", phone: "", title: "", linkedin: "", profilePicture: "" },
    education: { degree: "", institution: "", startYear: "", endYear: "", gpa: "" },
    skills: { jobTitle: "", company: "", duration: "", description: "", technical: "" },
    additional: { languages: "", certifications: "", projects: "" },
  };
}

export function getPlaceholderData(templateId: string): ResumeData {
  // For now, return generic placeholder data.
  // This can be expanded to return different data based on the templateId.
  return {
    personal: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      title: "Software Engineer",
      linkedin: "linkedin.com/in/johndoe",
      profilePicture: "",
    },
    education: {
      degree: "Bachelor of Science in Computer Science",
      institution: "University of Example",
      startYear: "2018",
      endYear: "2022",
      gpa: "3.8",
    },
    skills: {
      jobTitle: "Software Engineer Intern",
      company: "Tech Company Inc.",
      duration: "May 2021 - Aug 2021",
      description: "Developed and maintained web applications using React and Node.js.",
      technical: "JavaScript, React, Node.js, Python, SQL",
    },
    additional: {
      languages: "English (Native), Spanish (Conversational)",
      certifications: "AWS Certified Cloud Practitioner",
      projects: "Personal portfolio website built with React.",
    },
  };
}
