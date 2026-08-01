export interface Product {
  id: string;
  title: string;
  category: string;
  year: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  client: string;
  specs: { label: string; value: string }[];
  tags: string[];
  downloadUrl?: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface ExperienceItem {
  year: string;
  role: string;
  company: string;
  description: string;
}

export interface EducationItem {
  year: string;
  degree: string;
  institution: string;
  description: string;
}

export interface CertificationItem {
  name: string;
  issuer: string;
  year: string;
  credentialId?: string;
}

export interface LanguageItem {
  language: string;
  level: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  category: string;
  iconName: string;
  deliverables?: string[];
  actionType?: 'request' | 'link' | 'download';
  actionUrl?: string;
  actionLabel?: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  services: ServiceItem[];
}

export interface PromptItem {
  id: string;
  title: string;
  image: string;
  promptText: string;
}

export interface PromptCategory {
  id: string;
  title: string;
  iconName: string;
  prompts: PromptItem[];
}

