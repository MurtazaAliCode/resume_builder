export interface Template {
  id: string;
  name: string;
  category: string;
  isPremium: boolean;
  rating: number;
  downloads: string;
  filePath: string;
}

export interface ResumeData {
  personal: {
    name: string;
    email: string;
    phone: string;
    title: string;
    linkedin: string;
    profilePicture: string;
  };
  education: {
    degree: string;
    institution: string;
    startYear: string;
    endYear: string;
    gpa: string;
  };
  skills: {
    jobTitle: string;
    company: string;
    duration: string;
    description: string;
    technical: string;
  };
  additional: {
    languages: string;
    certifications: string;
    projects: string;
  };
}
