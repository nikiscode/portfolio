export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  isTyping?: boolean;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  features: string[];
  links: {
    github?: string;
    demo?: string;
    caseStudy?: string;
    appStore?: string;
    playStore?: string;
    documentation?: string;
    pypi?: string;
    website?: string;
    blog?: string;
  };
  status: string;
  impact: string;
}

export interface Achievement {
  title: string;
  description: string;
  date: string;
  type: string;
  impact: string;
  links?: {
    linkedin?: string;
    github?: string;
    demo?: string;
    certificate?: string;
  };
}

export interface Skill {
  category: string;
  skills: string[];
}

export interface Experience {
  title: string;
  company: string;
  duration: string;
  description: string;
  technologies: string[];
}

export interface Student {
  name: string;
  title: string;
  university: string;
  year: string;
  major: string;
  location: string;
  email: string;
  linkedin: string;
  github: string;
  twitter: string;
}

export interface About {
  summary: string;
  interests: string[];
  goals: string[];
}

export interface Education {
  degree: string;
  university: string;
  expectedGraduation: string;
  gpa: string;
  relevantCoursework: string[];
}

export interface PortfolioData {
  student: Student;
  about: About;
  projects: Project[];
  achievements: Achievement[];
  skills: {
    programmingLanguages: string[];
    webTechnologies: string[];
    databases: string[];
    cloudPlatforms: string[];
    aiMl: string[];
    tools: string[];
  };
  experience: Experience[];
  education: Education;
  google_ambassador_highlights?: GoogleAmbassadorHighlights;
}

export interface GoogleAmbassadorHighlights {
  certifications: Certification[];
  leadership_experience: LeadershipExperience[];
  innovation_showcase: InnovationShowcase[];
  community_impact: CommunityImpact[];
  ambassador_vision: AmbassadorVision;
}

export interface Certification {
  name: string;
  date: string;
  description: string;
  project: string;
  impact: string;
}

export interface LeadershipExperience {
  role: string;
  description: string;
  impact: string;
  skills: string[];
}

export interface InnovationShowcase {
  project: string;
  innovation: string;
  technologies: string[];
  impact: string;
}

export interface CommunityImpact {
  initiative: string;
  description: string;
  beneficiaries: string;
  impact: string;
}

export interface AmbassadorVision {
  mission: string;
  goals: string[];
  why_google: string;
  unique_value: string;
}

export interface ChatContext {
  messages: Message[];
  isLoading: boolean;
  portfolioData: PortfolioData;
}
