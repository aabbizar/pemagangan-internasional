import { NavLink, ProgramBenefit, JourneyStep, StatisticMetric, FaqItem } from "@/types";

export const SITE_METADATA = {
  title: "International Internship Platform",
  shortTitle: "Internship Platform",
  description: "Official information and participant management platform for international vocational internship initiatives.",
  statusNotice: "Phase 1A – Structural Demonstration",
  publicationNotice: "Official information pending validation",
  activeYear: 2026,
};

export const NAV_LINKS: NavLink[] = [
  { label: "Manifesto", href: "#manifesto" },
  { label: "Context", href: "#context" },
  { label: "Journey", href: "#journey" },
  { label: "Impact", href: "#impact" },
  { label: "Governance", href: "#governance" },
];

export const PROGRAM_BENEFITS: ProgramBenefit[] = [
  {
    id: "overview-1",
    pilarNumber: "01",
    title: "Program Overview",
    tag: "Publication State",
    description: "Content pending validation.",
    iconName: "Globe",
    statsLabel: "Status",
    statsValue: "Pending Validation",
  },
  {
    id: "overview-2",
    pilarNumber: "02",
    title: "Program Benefits",
    tag: "Review State",
    description: "Content under stakeholder review.",
    iconName: "Award",
    statsLabel: "Status",
    statsValue: "Under Review",
  },
  {
    id: "overview-3",
    pilarNumber: "03",
    title: "International Partners",
    tag: "Approval State",
    description: "Information will be published after approval.",
    iconName: "Briefcase",
    statsLabel: "Status",
    statsValue: "Awaiting Approval",
  },
  {
    id: "overview-4",
    pilarNumber: "04",
    title: "Participant Opportunities",
    tag: "Preparation State",
    description: "Content preparation in progress.",
    iconName: "TrendingUp",
    statsLabel: "Status",
    statsValue: "In Preparation",
  },
];

export const JOURNEY_STEPS: JourneyStep[] = [
  {
    id: 1,
    stageNumber: "01",
    title: "Registrasi",
    subtitle: "Stage 01",
    description: "Description pending validation.",
    duration: "Pending Validation",
    location: "Online Portal",
    keyOutput: "Requirements Pending",
  },
  {
    id: 2,
    stageNumber: "02",
    title: "Seleksi",
    subtitle: "Stage 02",
    description: "Description pending validation.",
    duration: "Pending Validation",
    location: "Designated Assessment Center",
    keyOutput: "Criteria Pending",
  },
  {
    id: 3,
    stageNumber: "03",
    title: "Pelatihan",
    subtitle: "Stage 03",
    description: "Description pending validation.",
    duration: "Pending Validation",
    location: "Designated Training Facility",
    keyOutput: "Curriculum Pending",
  },
  {
    id: 4,
    stageNumber: "04",
    title: "Penempatan",
    subtitle: "Stage 04",
    description: "Description pending validation.",
    duration: "Pending Validation",
    location: "Partner Organization Location",
    keyOutput: "Contract Terms Pending",
  },
  {
    id: 5,
    stageNumber: "05",
    title: "Evaluasi",
    subtitle: "Stage 05",
    description: "Description pending validation.",
    duration: "Pending Validation",
    location: "Evaluation Authority",
    keyOutput: "Certification Terms Pending",
  },
];

export const METRICS_DATA: StatisticMetric[] = [
  {
    id: "metric-participants",
    label: "Demo Metric",
    numericValue: 14850,
    prefix: "",
    suffix: "+",
    description: "Demonstration parameter for structural validation.",
    badge: "Demonstration Data",
  },
  {
    id: "metric-countries",
    label: "Demo Region",
    numericValue: 12,
    prefix: "",
    suffix: "",
    description: "Demonstration parameter for structural validation.",
    badge: "Demonstration Data",
  },
  {
    id: "metric-partners",
    label: "Demo Partner",
    numericValue: 480,
    prefix: "",
    suffix: "+",
    description: "Demonstration parameter for structural validation.",
    badge: "Demonstration Data",
  },
  {
    id: "metric-completion",
    label: "Demo Completion",
    numericValue: 98.4,
    prefix: "",
    suffix: "%",
    description: "Demonstration parameter for structural validation.",
    badge: "Demonstration Data",
  },
];

export const FAQ_DATA: FaqItem[] = [
  {
    id: "faq-01",
    category: "Regulasi & Legalitas",
    question: "When will official information be available?",
    answer: "Content publication schedule is currently being finalized.",
  },
  {
    id: "faq-02",
    category: "Biaya & Fasilitas",
    question: "How will applications be submitted?",
    answer: "Application procedures are under review.",
  },
  {
    id: "faq-03",
    category: "Persyaratan & Dokumen",
    question: "Will participant information be available online?",
    answer: "Data publication policy is currently being evaluated.",
  },
];
