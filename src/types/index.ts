export interface NavLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface ProgramBenefit {
  id: string;
  pilarNumber: string;
  title: string;
  description: string;
  tag: string;
  iconName: "Globe" | "Briefcase" | "Award" | "TrendingUp";
  statsLabel: string;
  statsValue: string;
}

export interface JourneyStep {
  id: number;
  stageNumber: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  location: string;
  keyOutput: string;
}

export interface StatisticMetric {
  id: string;
  label: string;
  numericValue: number;
  prefix?: string;
  suffix?: string;
  description: string;
  badge: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: "Regulasi & Legalitas" | "Biaya & Fasilitas" | "Persyaratan & Dokumen" | "Penempatan Kerja";
}

export interface UserSession {
  email: string;
  role: "admin_verifikator" | "calon_peserta";
  authenticatedAt: string;
}
