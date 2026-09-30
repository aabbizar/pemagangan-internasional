# Content Governance & Publishing Workflow

**Project:** International Internship Platform (Talenta Vokasi — Kemnaker RI)  
**Phase:** Phase 1B — Design Freeze  
**Document:** Content Governance & Editorial Lifecycle  
**Governing Authority:** Kementerian Ketenagakerjaan Republik Indonesia (Kemnaker RI)  
**Implementing Directorate:** Direktorat Jenderal Pembinaan Pelatihan Vokasi dan Produktivitas (Binalavotas)  
**Date:** September 2026  

---

## 1. Governance Principles & Objectives

The International Internship Platform serves as the official digital gateway for international vocational internship programs (e.g., Japan IM Japan, Germany Ausbildung, South Korea, Taiwan, Australia). Because information published here has legal, diplomatic, and bilateral implications, strict content governance is mandatory.

### Guiding Principles:
1. **Zero Hallucination / Zero Speculation:** No unauthorized or speculative quotas, criteria, or foreign agreements may appear in public view. Placeholder states ("Content pending validation", "Under review") must remain until formal ratification.
2. **Clear Institutional Accountability:** Every piece of copy, programmatic quota, eligibility guideline, and partner listing must have an assigned owner and an immutable audit trail.
3. **Multi-Tiered Bureaucratic Approvals:** Publishing authority follows official echelon approval hierarchies within Kemnaker RI.

---

## 2. Content Lifecycle States

All platform content assets (landing page copy, program briefs, eligibility criteria, partner institution dossiers, FAQ entries, statistical reports) progress through five distinct lifecycle states:

```
┌─────────┐      ┌──────────┐      ┌────────────┐      ┌─────────────┐      ┌────────────┐
│  DRAFT  │ ───► │  REVIEW  │ ───► │  APPROVED  │ ───► │  PUBLISHED  │ ───► │  ARCHIVED  │
└─────────┘      └──────────┘      └────────────┘      └─────────────┘      └────────────┘
     ▲                 │                  │
     └─────────────────┴──────────────────┘
                 (Revision Requested)
```

### 2.1 State 1: DRAFT (Konsep Awal)
- **Definition:** Content created or edited by the working group or program staff. Visible only within internal staging environments with watermark indicators.
- **Access Level:** Content Author / Staf Substansi Pemagangan.
- **UI State on Landing Page (Phase 1A/1B):** Displayed with notice `"Content in preparation"` or `"Draft state"`.
- **System Constraints:**
  - Cannot be indexed by public search engines (`noindex, nofollow`).
  - Cannot be viewed on production domain without administrative authentication.

### 2.2 State 2: REVIEW (Penelaahan Substansi & Hukum)
- **Definition:** The content draft is formally submitted for review by technical, legal, and public relations stakeholders within the ministry.
- **Reviewing Parties:**
  1. **Substansi Teknis:** Koordinator Penyelenggaraan Pemagangan Luar Negeri (validates partner agreements, allowance structures, working hours, and visa codes).
  2. **Biro Hukum Kemnaker:** Legal verification to ensure compliance with UU Ketenagakerjaan and Permenaker regarding overseas apprenticeships.
  3. **Biro Humas:** Public communication review (tonality, clarity, accessibility, bilateral sensitivity).
- **UI State on Landing Page:** Displayed with notice `"Content under review"` or `"Under stakeholder validation"`.

### 2.3 State 3: APPROVED (Persetujuan Eselon)
- **Definition:** Content has passed all substantive reviews and received formal sign-off from designated echelon officials.
- **Approval Sign-Off Authority:**
  - **Program Dossiers & Quotas:** Direktur Bina Penyelenggaraan Pelatihan Vokasi dan Pemagangan (Eselon II).
  - **Strategic Bilateral Policies:** Direktur Jenderal Pembinaan Pelatihan Vokasi dan Produktivitas / Sekretaris Jenderal (Eselon I).
- **Audit Requirement:** Approval requires digital signature (Tanda Tangan Elektronik BSrE) or formal Nota Dinas reference number recorded in metadata.
- **UI State on Landing Page:** Ready in staging; queued for publication window.

### 2.4 State 4: PUBLISHED (Penayangan Resmi)
- **Definition:** Content is live and publicly accessible on the production platform.
- **Publishing Authority:** Administrator Portal / Tim Pengelola Sistem Informasi Ketenagakerjaan.
- **System Constraints:**
  - Automated cache invalidation across CDN nodes.
  - Snapshot archived in version control with timestamp and author metadata.
  - Automated open graph and SEO metadata regeneration.
- **Current Phase 1B Status:** Content placeholders currently hold publication-ready structure awaiting official finalization of text copy by Kemnaker.

### 2.5 State 5: ARCHIVED (Pengarsipan & Riwayat)
- **Definition:** Superseded policies, expired program batch registrations, or outdated regulatory criteria moved to historical archives.
- **Access Level:** Read-only historical access for internal audit or public transparency archive.
- **System Behavior:**
  - Landing page routes redirect to the active successor batch or display archival notice.
  - Historical participant applications linked to the archived batch retain immutable point-in-time references.

---

## 3. Ministry Organizational Approval Matrix

| Content Category | Author (Draft) | Substantive Reviewer | Final Approver (Sign-off) | Publisher |
| :--- | :--- | :--- | :--- | :--- |
| **Landing Hero & Vision Statements** | Tim Humas & IT | Subbag Kerja Sama Luar Negeri | Sesditjen Binalavotas | Portal Admin |
| **Program Batches & Country Quotas** | Pengelola Program Luar Negeri | Koordinator Pemagangan | Direktur Pemagangan (Eselon II) | Portal Admin |
| **Partner Company / Sending Org (SO)** | Tim Verifikasi Mitra | Tim Hukum Ketenagakerjaan | Direktur Pemagangan | Portal Admin |
| **Selection Criteria & Schedule** | Tim Seleksi Vokasi | Panitia Seleksi Nasional | Direktur Pemagangan | Portal Admin |
| **FAQ & Public Guidance** | Call Center / Tim Helpdesk | Tim Humas Kemnaker | Koordinator Pemagangan | Content Editor |
| **Statistical Performance Metrics** | Tim Data & Evaluasi | Bagian Perencanaan Binalavotas | Sesditjen Binalavotas | Data Operator |

---

## 4. Editorial Enforcement in Code & Schema

To guarantee strict compliance before backend integration, the platform's frontend types (`src/types/index.ts`) already enforce status enumerations:

```typescript
export type EditorialStatus = 
  | "draft"
  | "under_review"
  | "approved"
  | "published"
  | "archived";

export interface GovernedContentMetadata {
  id: string;
  status: EditorialStatus;
  version: string;
  authorId: string;
  reviewedBy?: string[];
  approvedBy?: string;
  approvalReferenceNo?: string; // e.g. "ND-420/BINALAVOTAS/IX/2026"
  publishedAt?: string;
  lastUpdatedAt: string;
}
```

### Publication Safeguards:
1. **No Direct Production Commits:** Public-facing content strings may not be hardcoded in component files once backend CMS integration is active.
2. **Audit Logging:** Every status change triggers an audit trail record capturing `userId`, `timestamp`, `previousStatus`, `newStatus`, and `changeJustification`.
3. **Emergency Takedown (Kill-Switch):** Administrators have instantaneous authority to revert any published article or program batch to `REVIEW` or `ARCHIVED` within < 60 seconds.
