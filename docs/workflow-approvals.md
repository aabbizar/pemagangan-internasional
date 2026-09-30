# Multi-Tier Approval Workflows & State Transitions

**Platform:** International Internship Platform (Talenta Vokasi — Kemnaker RI)  
**Governing Authority:** Kementerian Ketenagakerjaan Republik Indonesia  
**Phase:** Phase 2D — Role, Permission, and Access Modeling  
**Status:** SPECIFICATION ONLY (NO CODE / NO DATABASE CREATED)  
**Date:** September 2026  

---

## 1. Executive Summary

This document specifies the five core operational and regulatory approval workflows of the **International Internship Platform**. Every workflow is governed by strict state machine transitions, validation gates, role authorizations, and automated audit logging.

---

## 2. Workflow 1: Participant Verification (Stage 1 & Stage 2)

```
[Candidate Submits Dossier]
            │
            ▼
┌───────────────────────────────┐
│ Stage 1: Document Review      │◄─── (Verifikator BPVP inspects KTP, Diploma, SKCK, Parent Consent)
└───────────────┬───────────────┘
                │
        ┌───────┴───────┐
        ▼               ▼
   [APPROVED]       [REJECTED / FRAUD]
        │               │
        │               └──► (Candidate notified to resubmit within 48h or blacklisted if forged)
        ▼
┌───────────────────────────────┐
│ Stage 2: Selection Batteries  │◄─── (Physical test, basic math, panel interview scored)
└───────────────┬───────────────┘
                │
        ┌───────┴───────┐
        ▼               ▼
[ALL GATES ≥ 70]   [ANY GATE < 70]
        │               │
        │               └──► (Application transitioned to FAILED; candidate notified)
        ▼
[Advance to Stage 3: Pelatihan Terpusat]
```

### 2.1 State Transitions:
1. `PENDING_REVIEW` ➔ Candidate submits dossier in open batch.
2. `UNDER_VERIFICATION` ➔ Assigned `VERIFIKATOR_BPVP` claims application within their regional jurisdiction.
3. `DOCUMENT_VERIFIED` ➔ Verifier signs off that e-KTP, diploma, parent consent, and medical statements meet standards.
4. `SELECTION_SCHEDULED` ➔ Candidate assigned a physical and interview timeslot at regional BPVP.
5. `SELECTION_PASSED` ➔ Scores submitted (Physical ≥ 70, Math ≥ 70, Interview ≥ 75).
6. `PASSED_STAGE_2` ➔ Coordinated sign-off by `TIM_PEMAGANGAN` admitting candidate to Stage 3 boarding.

### 2.2 Rejection & Escalation:
- **Missing / Illegible File:** Application marked `REVISION_REQUIRED`; 48-hour SLA for candidate to re-upload.
- **Suspected Forged Credential:** Verifier marks dossier `SUSPECTED_FRAUD`; escalated immediately to Biro Hukum & Tim Pemagangan. Candidate NIK quarantined pending investigation.

---

## 3. Workflow 2: Program Publication (Alur Penayangan Program)

```
[Draft Authoring] (Tim Pemagangan drafts curriculum & statutory stipend)
        │
        ▼
[Technical & Legal Review] (Biro Hukum validates UU Ketenagakerjaan & Permenaker compliance)
        │
        ▼
[Echelon II Sign-Off] (Direktur Pemagangan issues digital signature BSrE)
        │
        ▼
[Published to Public Portal] (Immediate CDN cache invalidation; open to public search)
```

### 3.1 State Transitions:
1. `DRAFT` ➔ Program created with preliminary bilateral data, partner references, and syllabus.
2. `REVIEW` ➔ Formally submitted to Biro Hukum and Koordinator Pemagangan Luar Negeri.
3. `APPROVED` ➔ `DIREKTUR_ESELON_II` approves decree and ratifies minimum monthly stipend floor.
4. `PUBLISHED` ➔ Program goes live on public portal landing page and program directory.

### 3.2 Governance Gate:
- A program cannot enter `APPROVED` without a recorded government decree (`mou_reference_number`).
- A program cannot enter `PUBLISHED` unless minimum monthly living allowances exceed host nation statutory minimum wage laws.

---

## 4. Workflow 3: Batch Approval & Quota Allocation (Alur Penetapan Gelombang)

```
[Batch Proposal] (Tim Pemagangan sets dates, target quota, and assigned BPVP balai)
        │
        ▼
[Facility Capacity Audit] (BPVP Training Center confirms dormitory bed capacity)
        │
        ▼
[Echelon II Quota Ratification] (Direktur Pemagangan signs quota decree)
        │
        ▼
[Registration Scheduled] (Batch countdown visible; unlocks at 00:00:01 WIB on start date)
```

### 4.1 State Transitions:
1. `DRAFT_BATCH` ➔ Cohort dates, Sending Organization assignments, and quotas drafted.
2. `CAPACITY_VERIFIED` ➔ Assigned `TRAINING_CENTER` (e.g. BBPVP Bandung) verifies residential bed capacity is adequate for target quota + 10% reserve.
3. `QUOTA_RATIFIED` ➔ `DIREKTUR_ESELON_II` reviews total national quota distribution across provinces and signs off.
4. `REGISTRATION_OPEN` ➔ Batch transitions automatically upon `registration_start_date` reaching current time.
5. `SELECTION_IN_PROGRESS` ➔ At `23:59:59 WIB` on `registration_end_date`, public submissions lock immediately.

---

## 5. Workflow 4: Emergency Suspension (Kill-Switch ProtokoI Darurat)

```
[Diplomatic Advisory / Safety Alert Received from Kemlu]
        │
        ▼
[Emergency Suspension Triggered] (Direktur Eselon II executes Kill-Switch with mandatory rationale)
        │
        ▼
[Global Propagation < 60s]
  ├── Public Portal hides affected program / country
  ├── New application submissions blocked
  ├── Active candidate progression frozen
  └── Consular notification dispatched to KBRI / KJRI
```

### 5.1 Protocol Mechanics:
1. **Trigger Condition:** Severe natural disaster, armed conflict, diplomatic rupture, or systemic labor violations discovered at host companies.
2. **Authority:** Exclusively executable by `DIREKTUR_ESELON_II` or `SUPER_ADMIN_IT` acting on written instruction from Eselon I / Menteri.
3. **Execution Steps:**
   - User navigates to System Governance / Program Management.
   - Enters emergency rationale (minimum 50 characters required).
   - Authenticates via Step-up MFA (One-Time Password).
   - System sets `country.diplomatic_status = 'SUSPENDED'` and `batch.batch_status = 'SUSPENDED'`.
4. **Candidate Protection:**
   - In-flight trainees already dispatched abroad are placed under direct consular monitoring with KBRI/KJRI.
   - Trainees currently in Stage 3 residential training are placed on paid standby; alternative bilateral destination reassignment initiated.

---

## 6. Workflow 5: Independent Audit Review (Alur Pemeriksaan Kepatuhan)

```
[Audit Scheduled / Ad-hoc Inspection] (Itjen Kemnaker / BPK / BPKP initiates review)
        │
        ▼
[Read-Only Data Extraction] (Auditor exports transaction ledgers, score diffs, and quota logs)
        │
        ▼
[Discrepancy Analysis] (Algorithmic reconciliation between selection scores and dispatch rosters)
        │
        ▼
[Audit Finding Issued] (Formal memorandum submitted to Direktur Eselon II)
        │
        ▼
[Management Remediation] (Tim Pemagangan records corrective action; validated by Auditor)
```

### 6.1 Audit Investigation Capabilities:
1. **Selection Integrity Audit:** Verifies that no candidate with a score < 70 was advanced to Stage 3, and that no candidate with a score ≥ 70 was disqualified without a signed `justification_note`.
2. **Quota Discrepancy Audit:** Ensures the total candidates dispatched to a partner company exactly matches the approved ministerial quota.
3. **Immutability Check:** Cryptographic HMAC hash chaining over `audit_logs` ensures zero rows have been deleted, inserted, or edited after the fact.
