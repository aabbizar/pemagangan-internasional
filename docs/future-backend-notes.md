# Future Backend Architecture & Integration Specifications

**Project:** International Internship Platform (Talenta Vokasi — Kemnaker RI)  
**Phase:** Phase 1B — Design Freeze  
**Document:** Future Backend Technical Notes  
**Status:** ARCHITECTURAL SPECIFICATION ONLY (NOT IMPLEMENTED IN PHASE 1)  
**Target Phase:** Phase 2A (Simulated Auth) / Phase 3 (Full API & Database Integration)  
**Date:** September 2026  

---

## 1. Architectural Scope & Non-Implementation Notice

> [!IMPORTANT]
> **STRICT COMPLIANCE NOTICE:**  
> In accordance with Phase 1 constraints, **NO backend services, databases, or API routes are implemented in this repository**.  
> This document serves as the formal architectural blueprint and entity relational specification for future engineering teams connecting the frozen frontend UI to ministerial backend services.

---

## 2. Core Domain Entities & Schemas

The system domain consists of five core domain models reflecting the operational reality of international vocational internships under Kemnaker RI:

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│  AUTHENTICATION │       │    COUNTRIES    │       │    PROGRAMS     │
│   (SIAPkerja)   │       │   (Destinations)│       │ (Batches & SO)  │
└────────┬────────┘       └────────┬────────┘       └────────┬────────┘
         │                         │                         │
         ▼                         ▼                         ▼
┌─────────────────┐       ┌───────────────────────────────────────────┐
│  PARTICIPANTS   │ ────► │               APPLICATIONS                │
│   (Profil NIK)  │       │         (Stages 1 to 5 Tracking)          │
└─────────────────┘       └───────────────────────────────────────────┘
```

---

### 2.1 Domain 1: Authentication & Identity Management

#### 2.1.1 Overview
Future identity verification must bridge with **SIAPkerja** (Sistem Informasi dan Pelayanan Ketenagakerjaan) and **Satu Data Ketenagakerjaan**, utilizing Single Sign-On (SSO) via OAuth 2.0 / OpenID Connect.

#### 2.1.2 Conceptual Data Model (`UserAccount`)
```json
{
  "id": "uuid-v4",
  "siapkerja_id": "SK-2026-992140",
  "nik": "3201123456780001",
  "full_name": "Raden Mas Bagus",
  "email": "peserta@kemnaker.go.id",
  "phone": "+6281234567890",
  "role": "PARTICIPANT", // PARTICIPANT | VERIFIER | SELECTION_COMMITTEE | ADMIN_KEMNAKER | SUPERADMIN
  "is_verified_nik": true,
  "last_login_at": "2026-09-28T02:30:00Z",
  "created_at": "2026-09-28T02:00:00Z"
}
```

#### 2.1.3 Integration Points
- **OAuth 2.0 Auth Server:** `https://account.kemnaker.go.id/oauth2/authorize`
- **Token Endpoint:** `https://account.kemnaker.go.id/oauth2/token`
- **Phase 2A Mock:** Frontend will simulate this flow via client-side cookie/localStorage token mock (`auth_session=dummy_token_participant`) without contacting live servers.

---

### 2.2 Domain 2: Participants (`Participants`)

#### 2.2.1 Overview
Stores the comprehensive vocational profile, academic origin (SMK, Politeknik, Balai Latihan Kerja/BPVP), language certifications, and physical health clearances.

#### 2.2.2 Conceptual Data Model (`ParticipantProfile`)
```json
{
  "id": "uuid-v4",
  "user_id": "ref(UserAccount.id)",
  "nik": "3201123456780001",
  "institution_type": "POLITEKNIK", // SMK | POLITEKNIK | BPVP | UNIVERSITAS
  "institution_name": "Politeknik Negeri Jakarta",
  "major": "Teknik Manufaktur & Mekatronika",
  "graduation_year": 2025,
  "gpa": 3.78,
  "language_competencies": [
    {
      "language": "Japanese",
      "certification": "JLPT N4",
      "score": 124,
      "issued_date": "2025-12-10"
    }
  ],
  "medical_checkup_status": "FIT_WITH_NOTES", // PENDING | FIT | UNFIT
  "passport_number": "X1298472",
  "passport_expiry": "2031-08-15",
  "created_at": "2026-09-28T02:00:00Z"
}
```

#### 2.2.3 Integration Points
- **Dukcapil NIK Validation API:** Real-time identity verification against Kemendagri records.
- **Pangkalan Data Pendidikan Tinggi (PDDikti) / Dapodik:** Automated verification of diploma authenticity.

---

### 2.3 Domain 3: Countries (`Countries`)

#### 2.3.1 Overview
Maintains destination country profiles, bilateral agreements (MoU G-to-G, G-to-P), minimum wage/allowance standards, visa categories, and living condition parameters.

#### 2.3.2 Conceptual Data Model (`Country`)
```json
{
  "id": "country-jpn",
  "code": "JPN",
  "name": "Jepang",
  "flag_svg": "/assets/flags/jp.svg",
  "active_programs_count": 4,
  "bilateral_mou_reference": "MoU-KEMNAKER-IM-JAPAN-2024",
  "visa_category": "Specified Skilled Worker / Technical Intern (Ginou Jisshuusei)",
  "average_monthly_stipend_idr": 18500000,
  "primary_industries": ["Manufaktur Otomotif", "Konstruksi Presisi", "Caregiver / Perawat Lansia"],
  "health_insurance_mandate": "National Health Insurance (NHI) Covered",
  "is_accepting_applications": true
}
```

#### 2.3.3 Integration Points
- **Kementerian Luar Negeri (Kemlu RI / KBRI / KJRI):** Real-time advisory warnings and consular registration validation.

---

### 2.4 Domain 4: Programs & Batches (`Programs`)

#### 2.4.1 Overview
Defines specific internship offerings (e.g., "Program Pemagangan Magang Jepang Batch 2026-B", "Ausbildung Industri Hotel Jerman 2026"), including sending organizations (SO), host companies (Accepting Organizations / AO), quotas, and timeline dates.

#### 2.4.2 Conceptual Data Model (`ProgramBatch`)
```json
{
  "id": "prog-jp-2026-02",
  "country_id": "country-jpn",
  "title": "Program Pemagangan Manufaktur Presisi IM Japan Batch II/2026",
  "sending_organization": "IM Japan / Ditjen Binalavotas",
  "target_participants_quota": 500,
  "current_applicants_count": 1840,
  "registration_start": "2026-10-01T00:00:00Z",
  "registration_end": "2026-10-31T23:59:59Z",
  "departure_target": "2027-04-15",
  "editorial_status": "APPROVED", // DRAFT | REVIEW | APPROVED | PUBLISHED | ARCHIVED
  "stages_config": [
    { "stage": 1, "name": "Registrasi Dokumen", "deadline": "2026-10-31" },
    { "stage": 2, "name": "Seleksi Fisik & Matematika", "deadline": "2026-11-20" },
    { "stage": 3, "name": "Pelatihan Bahasa Terpusat", "duration_weeks": 12 },
    { "stage": 4, "name": "Penempatan Perusahaan", "target_date": "2027-03-01" },
    { "stage": 5, "name": "Evaluasi & Pasca-Magang", "duration_years": 3 }
  ]
}
```

#### 2.4.3 Integration Points
- Feeds directly into landing page `StatsSection` (total participants, countries, active partners) and `Liveline` stage configurations.

---

### 2.5 Domain 5: Applications & Progression Tracker (`Applications`)

#### 2.5.1 Overview
Represents a participant's submission to a specific program batch. Tracks progression through the 5 stages showcased in the `Liveline` component.

#### 2.5.2 Conceptual Data Model (`ApplicationRecord`)
```json
{
  "id": "app-2026-00481",
  "participant_id": "ref(ParticipantProfile.id)",
  "program_id": "ref(ProgramBatch.id)",
  "current_stage": 3, // Corresponds to Liveline Stage ID (1..5)
  "stage_status": "IN_PROGRESS", // PENDING | IN_PROGRESS | PASSED | REJECTED | ESCALATED
  "submission_date": "2026-10-05T08:14:00Z",
  "stages_history": [
    {
      "stage_id": 1,
      "title": "Registrasi",
      "completed_at": "2026-10-12T14:20:00Z",
      "verifier_id": "admin-kemnaker-09",
      "status": "PASSED"
    },
    {
      "stage_id": 2,
      "title": "Seleksi",
      "completed_at": "2026-11-18T10:00:00Z",
      "score": 88.5,
      "status": "PASSED"
    },
    {
      "stage_id": 3,
      "title": "Pelatihan",
      "commenced_at": "2026-12-01T08:00:00Z",
      "location": "BBVP Bandung - Kampus Otomasi",
      "status": "IN_PROGRESS"
    }
  ],
  "host_company_assigned": {
    "name": "Mitsubishi Heavy Industries, Ltd.",
    "prefecture": "Aichi, Japan"
  }
}
```

#### 2.5.3 Integration Points
- **Liveline Component Dynamic Binding:** The participant dashboard will render `<Liveline steps={dynamicSteps} activeStepId={application.current_stage} />` using this data contract.

---

## 3. Future API Route Specifications (REST / Next.js Route Handlers)

When backend development commences in Phase 3, the following endpoints will be implemented:

| Method | Endpoint Route | Description | Auth Requirement |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/siapkerja/callback` | Exchanges authorization code for session JWT token. | Public |
| `GET` | `/api/v1/participants/me` | Retrieves active participant profile and application list. | Bearer Token |
| `GET` | `/api/v1/programs/public` | Fetches published program batches for the landing page. | Public / CDN Cached |
| `GET` | `/api/v1/programs/:id` | Detailed program batch dossier and quota metrics. | Public |
| `POST`| `/api/v1/applications/apply` | Submits initial dossier application for a program batch. | Authenticated Peserta |
| `GET` | `/api/v1/applications/:id/timeline` | Fetches live 5-stage progression data for `Liveline`. | Authenticated Peserta |
| `PATCH`| `/api/v1/admin/applications/:id/stage`| Advances or reverts participant stage status. | Verifikator / Admin |
| `GET` | `/api/v1/metrics/platform-summary` | Supplies live counts for the landing `StatsSection`. | Public / Revalidated |

---

## 4. Security, Privacy & Data Sovereignty Architecture

1. **Undang-Undang Perlindungan Data Pribadi (UU PDP No. 27/2022):**  
   All PII (NIK, passport, phone, health records) must be encrypted at rest utilizing AES-256 and masked in UI displays (`3201********0001`).
2. **Pusat Data Nasional (PDN) Mandate:**  
   Future database nodes (PostgreSQL with Row Level Security) and microservices must reside exclusively on sovereign Indonesian soil within Kominfo/BSSN-certified government cloud zones.
3. **Audit Immutability:**  
   Every verification decision (pass/fail in selection stages) must write to append-only audit tables with cryptographic hash verification to ensure zero tampering in public vocational selection.
