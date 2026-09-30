# Business Rules & Regulatory Logic Specification

**Platform:** International Internship Platform (Talenta Vokasi — Kemnaker RI)  
**Governing Authority:** Kementerian Ketenagakerjaan Republik Indonesia  
**Phase:** Phase 2C — Domain Modeling & Information Architecture  
**Status:** SPECIFICATION ONLY (NO CODE / NO DB CREATED)  
**Date:** September 2026  

---

## 1. Executive Summary

This document establishes the comprehensive business rules, eligibility criteria, approval workflows, and regulatory constraints governing the **International Internship Platform**. These rules reflect the legal mandates of **UU Ketenagakerjaan (UU No. 13/2003 & modifications)**, **Permenaker regarding Overseas Apprenticeship (Pemagangan Luar Negeri)**, and bilateral government agreements (MoUs).

---

## 2. Eligibility Rules (Aturan Kelayakan Calon Peserta)

```
[Candidate Age: 18 - 28] ──► [Indonesian Citizen (WNI)] ──► [Vocational Diploma (SMK/Poltek)] ──► [Medical Clearance (Fit)]
                                                                                                        │
                                                                                                        ▼
                                                                                              [Eligible for Batch]
```

### BR-EL-01: Citizenship & Legal Identity
1. Candidates must be citizens of the Republic of Indonesia (Warga Negara Indonesia / WNI).
2. The candidate's 16-digit **NIK** must exist in the Dukcapil master population database and match their registered name and birth date.
3. Candidate must possess a valid e-KTP.

### BR-EL-02: Age Boundaries
1. Candidates must be at least **18 years and 0 days** old on the registration closing date of the target batch.
2. Candidates must not exceed **28 years and 364 days** old on the date of departure (unless a specific bilateral scheme explicitly ratifies an extended age ceiling, e.g., Caregiver pathways up to 35 years).

### BR-EL-03: Educational Credentials
1. Candidates must hold a minimum qualification of **Sekolah Menengah Kejuruan (SMK)**, **Madrasah Aliyah Kejuruan (MAK)**, **Diploma (D3/D4)**, or **Sarjana Terapan (S.Tr)** in an accredited vocational field.
2. Candidates with non-vocational high school backgrounds (SMA) are eligible **only** if accompanied by an accredited training certificate (Sertifikat Pelatihan Berbasis Kompetensi / PBK) from a government BLK/BPVP with a minimum of 480 instructional hours.

### BR-EL-04: Health & Physical Standards
1. Candidates must achieve a **"FIT"** classification on the comprehensive pre-selection Medical Check-Up (MCU).
2. Physical requirements for manufacturing & industrial technical schemes:
   - Minimum height: **160 cm (Male)**, **150 cm (Female)**.
   - Non-colorblind (tidak buta warna total maupun parsial).
   - No tattoos, body piercings (for males), or visible major surgical scars that impede strenuous physical activity.
   - Clean pulmonary and cardiac clearance (no active tuberculosis, hepatitis B/C, or cardiovascular impairment).

### BR-EL-05: Non-Duplication & Prior Dispatch Restriction
1. A candidate who has previously participated in a government-funded international internship program (e.g., completed 3 years in IM Japan) cannot reapply for the same scheme at trainee level.
2. A candidate who withdrew voluntarily or was dishonorably discharged during Stage 3 (Pelatihan Terpusat) is disqualified from reapplying for a mandatory lockout period of **24 calendar months**.

---

## 3. Application Rules (Aturan Pengajuan & Tahapan Seleksi)

### BR-AP-01: Single Active Application Invariant
1. A candidate may only have **one (1) active application** in progress at any given time across all destination countries and batches.
2. A new application cannot be initiated until the prior application has reached a terminal status (`COMPLETED`, `FAILED`, or formally `WITHDRAWN`).

### BR-AP-02: Strict Registration Windows
1. Applications can only be created and submitted while the target Batch is in `REGISTRATION_OPEN` status.
2. At `23:59:59 WIB` on the published `registration_end_date`, the system must reject any new submissions and transition the batch to `SELECTION_IN_PROGRESS`.

### BR-AP-03: Mandatory Document Completeness Gate (Stage 1)
To advance from **Stage 1 (Registrasi)** to **Stage 2 (Seleksi)**, the application must possess verified uploads of:
- e-KTP scan.
- Kartu Keluarga (KK).
- Legalized Diploma & Academic Transcript.
- Surat Izin Orang Tua / Wali / Pasangan bermaterai Rp 10.000.
- Surat Keterangan Catatan Kepolisian (SKCK) for overseas travel.
- Preliminary health statement from a government clinic (Puskesmas/RSUD).

### BR-AP-04: Selection Passing Thresholds (Stage 2)
Advancement to **Stage 3 (Pelatihan Terpusat)** requires passing all three independent selection batteries:
1. **Tes Fisik & Kesamaptaan:** Push-up, sit-up, and 3,000m run within statutory time limits (Passing threshold: ≥ 70/100).
2. **Tes Matematika Dasar & Logika:** Basic computational test (Passing threshold: ≥ 70/100).
3. **Wawancara & Minat Bakat:** Conducted by Kemnaker and bilateral partner panellists (Passing threshold: ≥ 75/100).
*Rule: Failure in any single battery results in immediate application status transition to `FAILED`.*

---

## 4. Program & Quota Rules (Aturan Program & Kuota Bilateral)

### BR-PR-01: Bilateral Agreement Mandate
1. No program or destination batch may be created without a validated bilateral Memorandum of Understanding (MoU), Memorandum of Cooperation (MoC), or decree issued by the Ministry of Manpower.
2. The `mou_reference_number` is an immutable attribute once approved.

### BR-PR-02: Statutory Stipend Floors
1. Every program must specify a guaranteed minimum monthly living allowance (stipend) that complies with the destination country's legal statutory wage regulations.
2. Programs where host company allowances fall below the statutory floor cannot be published.

### BR-PR-03: Quota Hard-Cap
1. The total number of candidates accepted into Stage 3 (Pelatihan Terpusat) for a given batch may not exceed `target_quota * 1.10` (maximum 10% candidate reserve pool).
2. The total number of trainees dispatched to host companies cannot exceed the ratified bilateral allocation without a formal addendum signed by Echelon II officials.

---

## 5. Approval & Workflow Governance Rules (Aturan Persetujuan Eselon)

```
[Draft Created by Staff] ──► [Legal & Technical Review] ──► [Echelon II Approval (BSrE)] ──► [Published to Portal]
```

### BR-GO-01: Separation of Duties (Four-Eyes Principle)
1. The user who authors a program dossier, quota allocation, or score sheet cannot be the user who approves or signs off on that item.
2. Administrative verifiers can only grade dossiers within their assigned regional jurisdiction (BPVP territory).

### BR-GO-02: Echelon II Approval Requirement
1. Publishing a new batch to the public portal requires electronic sign-off from the **Direktur Bina Penyelenggaraan Pelatihan Vokasi dan Pemagangan** (Eselon II).
2. The sign-off must record:
   - Approver user ID and NIP.
   - Timestamp.
   - Digital certificate identifier (Tanda Tangan Elektronik BSrE).

### BR-GO-03: Disqualification & Score Modification Justification
1. Any score modification, test re-evaluation, or candidate disqualification after initial submission requires an explicit `justification_note` containing at least 25 characters.
2. The modification is automatically logged in the immutable `Audit Log`.

---

## 6. Publication Rules (Aturan Penayangan Publik)

### BR-PB-01: Zero Hallucination Standard
1. Public portal landing pages, overview cards, and program directories must only display content in `PUBLISHED` state.
2. Items in `DRAFT`, `REVIEW`, or `APPROVED` states are strictly isolated from unauthenticated visitors.

### BR-PB-02: Emergency Takedown (Kill-Switch)
1. If a diplomatic alert, safety advisory, or bilateral dispute arises, Echelon II officials have the authority to trigger an immediate program suspension.
2. Takedown propagates globally within **< 60 seconds**, converting the public batch status to `SUSPENDED` and disabling new application submissions.

---

## 7. Future Authentication & Security Rules (Aturan Keamanan)

### BR-SE-01: Federated SIAPkerja Authentication
1. Identity authentication must federate exclusively through **Kemnaker SIAPkerja SSO** utilizing OpenID Connect (OIDC).
2. The platform will not store candidate passwords locally; passwords remain managed by SIAPkerja.

### BR-SE-02: Session Expiration & Re-Authentication
1. Candidate public sessions expire after **60 minutes** of inactivity.
2. Administrative staff sessions expire after **30 minutes** of inactivity.
3. Sensitive actions (approving batch quotas, publishing program decrees, or disqualifying applicants) require **Step-Up Multi-Factor Authentication (MFA)** via one-time SMS/Email code.

### BR-SE-03: Data Sovereignty & Masking (UU PDP Compliance)
1. All Personally Identifiable Information (PII) including NIK, passport numbers, and phone numbers must be masked when displayed on multi-record tables (`3201********0001`).
2. Data must reside exclusively on sovereign Indonesian infrastructure within the **Pusat Data Nasional (PDN)**.
