# Enterprise Permission Matrix (CRUDAPA)

**Platform:** International Internship Platform (Talenta Vokasi — Kemnaker RI)  
**Phase:** Phase 2D — Role, Permission, and Access Modeling  
**Status:** SPECIFICATION ONLY (NO CODE / NO DATABASE CREATED)  
**Standard:** NIST SP 800-162 ABAC/RBAC Standard & ISO 27001  
**Date:** September 2026  

---

## 1. Overview & Action Taxonomy

This document defines the authoritative access rights across all 8 system roles. Operations are evaluated using the expanded **CRUDAPA** standard:
- **C** (Create): Ability to author or instantiate new records.
- **R** (Read): Ability to view records (scoped by jurisdiction and PII masking).
- **U** (Update): Ability to modify non-terminal attributes or edit drafts.
- **D** (Delete): Ability to soft-delete or archive records (hard deletion is forbidden).
- **A** (Approve): Authority to formally validate, sign off, or advance regulatory states.
- **P** (Publish): Authority to transition content or batch availability to public view.
- **E** (Export): Authority to generate CSV, PDF, or batch dossiers for offline handling.
- **Au** (Audit): Authority to inspect before/after forensic diffs and actor logs.

---

## 2. Consolidated Master Permission Matrix

| Role | Participants | Programs | Applications | Countries | Batches | Reports | System Settings |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **`SUPER_ADMIN_IT`** | `R` (Masked) | `R` | `R` (Masked) | `R` | `R` | `R` | `C, R, U, E, Au` |
| **`DIREKTUR_ESELON_II`** | `R, E, Au` | `R, U, A, P, Au` | `R, A, E, Au` | `R, A, P, Au` | `R, A, P, E, Au` | `R, E, Au` | `R, Au` |
| **`TIM_PEMAGANGAN`** | `R, U, E` | `C, R, U, E` | `R, U, A, E` | `C, R, U` | `C, R, U, E` | `C, R, E` | `R` |
| **`VERIFIKATOR_BPVP`** | `R (Reg), U (Reg)` | `R` | `R (Reg), U (Reg), A (Reg)` | `R` | `R` | `R (Reg)` | `—` |
| **`VERIFIKATOR_LPK`** | `R (Own), U (Own)` | `R` | `R (Own), U (Own)` | `R` | `R` | `—` | `—` |
| **`AUDITOR`** | `R, E, Au` | `R, E, Au` | `R, E, Au` | `R, E, Au` | `R, E, Au` | `R, E, Au` | `R, E, Au` |
| **`VIEWER`** | `R (Anon)` | `R` | `R (Anon)` | `R` | `R` | `R (Agg)` | `—` |
| **`CALON_PESERTA`** | `C (Self), R (Self), U (Self)` | `R (Pub)` | `C (Self), R (Self), U (Self)` | `R (Pub)` | `R (Pub)` | `—` | `—` |

*Legend:*  
- `Reg`: Restricted to assigned regional BPVP jurisdiction.  
- `Own`: Restricted to candidates enrolled under user's licensed Sending Organization.  
- `Self`: Restricted to candidate's own single record.  
- `Anon`: Personally Identifiable Information (NIK, address, phone) masked.  
- `Agg`: Aggregated data only; no individual microdata.  
- `Pub`: Published items only.  
- `—`: No access permitted (HTTP 403 Forbidden).

---

## 3. Entity-by-Entity Granular Access Rules

### 3.1 Entity: Participants (`participants`)

| Operation | Permitted Roles | Business Conditions & Scoping Rules |
| :--- | :--- | :--- |
| **Create** | `CALON_PESERTA` | Candidate creates their own profile during initial SIAPkerja registration. |
| **Read** | `CALON_PESERTA`, `VERIFIKATOR_BPVP`, `VERIFIKATOR_LPK`, `TIM_PEMAGANGAN`, `DIREKTUR_ESELON_II`, `AUDITOR`, `VIEWER`, `SUPER_ADMIN_IT` | • `CALON_PESERTA`: Self only.<br/>• `VERIFIKATOR_BPVP`: Regional candidates only.<br/>• `VERIFIKATOR_LPK`: Sponsored candidates only.<br/>• `VIEWER` / `SUPER_ADMIN_IT`: PII masked (`3201********0001`). |
| **Update** | `CALON_PESERTA`, `VERIFIKATOR_BPVP`, `TIM_PEMAGANGAN` | • `CALON_PESERTA`: Can update personal data while profile is in `DRAFT`.<br/>• `VERIFIKATOR_BPVP`: Can update verification status and add review remarks. |
| **Delete** | None (Soft-delete only via `TIM_PEMAGANGAN`) | Hard deletion prohibited; records can only be marked as `SUSPENDED` or `BLACKLISTED`. |
| **Approve** | `VERIFIKATOR_BPVP`, `TIM_PEMAGANGAN` | Approves candidate identity and demographic verification standing. |
| **Publish** | None | Participant microdata is private and never published publicly. |
| **Export** | `TIM_PEMAGANGAN`, `DIREKTUR_ESELON_II`, `AUDITOR` | Exporting candidate spreadsheets requires automated logging of user ID and export justification. |
| **Audit** | `AUDITOR`, `DIREKTUR_ESELON_II`, `SUPER_ADMIN_IT` | Can inspect before/after diffs of demographic edits and status changes. |

---

### 3.2 Entity: Programs (`programs`)

| Operation | Permitted Roles | Business Conditions & Scoping Rules |
| :--- | :--- | :--- |
| **Create** | `TIM_PEMAGANGAN` | Prepares initial draft program dossiers with bilateral treaties. |
| **Read** | All Roles | Internal roles see all states; `CALON_PESERTA` and public see `PUBLISHED` only. |
| **Update** | `TIM_PEMAGANGAN`, `DIREKTUR_ESELON_II` | Can update terms, descriptions, and statutory allowances in `DRAFT` or `REVIEW`. |
| **Delete** | None | Programs cannot be deleted once ratified; can only be transitioned to `ARCHIVED`. |
| **Approve** | `DIREKTUR_ESELON_II` | Echelon II sign-off required to transition program to `APPROVED`. |
| **Publish** | `DIREKTUR_ESELON_II` | Electronic signature (BSrE) required to push program to public view. |
| **Export** | `TIM_PEMAGANGAN`, `DIREKTUR_ESELON_II`, `AUDITOR` | Export program dossiers and curriculum frameworks to PDF/Word. |
| **Audit** | `AUDITOR`, `DIREKTUR_ESELON_II`, `SUPER_ADMIN_IT` | Inspect immutable treaty reference modifications and author logs. |

---

### 3.3 Entity: Applications (`applications`)

| Operation | Permitted Roles | Business Conditions & Scoping Rules |
| :--- | :--- | :--- |
| **Create** | `CALON_PESERTA` | Candidate initiates single application within open batch window. |
| **Read** | `CALON_PESERTA` (Self), `VERIFIKATOR_BPVP` (Reg), `VERIFIKATOR_LPK` (Own), `TIM_PEMAGANGAN`, `DIREKTUR_ESELON_II`, `AUDITOR` | Scoped by regional jurisdiction or organizational ownership. |
| **Update** | `CALON_PESERTA` (Self), `VERIFIKATOR_BPVP`, `TIM_PEMAGANGAN` | • `CALON_PESERTA`: Edit files while stage is `PENDING`.<br/>• `VERIFIKATOR_BPVP`: Record test scores and medical grades. |
| **Delete** | `CALON_PESERTA` (Withdrawal only) | Candidate can withdraw unreviewed application; cannot delete completed stages. |
| **Approve** | `VERIFIKATOR_BPVP`, `TIM_PEMAGANGAN`, `DIREKTUR_ESELON_II` | • `VERIFIKATOR_BPVP`: Approves Stage 1 and Stage 2 test batteries.<br/>• `DIREKTUR_ESELON_II`: Final dispatch approval (Stage 4). |
| **Publish** | `TIM_PEMAGANGAN`, `DIREKTUR_ESELON_II` | Publishes national candidate graduation and selection pass lists. |
| **Export** | `TIM_PEMAGANGAN`, `DIREKTUR_ESELON_II`, `AUDITOR` | Export pass lists and visa rosters for KBRI / KJRI consular dispatches. |
| **Audit** | `AUDITOR`, `DIREKTUR_ESELON_II`, `SUPER_ADMIN_IT` | Full score adjustment history, panellist user IDs, and timestamps. |

---

### 3.4 Entity: Countries (`countries`)

| Operation | Permitted Roles | Business Conditions & Scoping Rules |
| :--- | :--- | :--- |
| **Create** | `TIM_PEMAGANGAN` | Adds new destination nation profile upon formal diplomatic protocol. |
| **Read** | All Roles | Public and candidate see `ACTIVE` countries; staff see risk advisories. |
| **Update** | `TIM_PEMAGANGAN`, `DIREKTUR_ESELON_II` | Updates consular mission data, minimum wage floors, and visa guidelines. |
| **Delete** | None | Prohibited. Nations can be marked `SUSPENDED` if diplomatic ties are halted. |
| **Approve** | `DIREKTUR_ESELON_II` | Approves destination country readiness for active student placement. |
| **Publish** | `DIREKTUR_ESELON_II` | Publishes country guide and cultural orientation briefs. |
| **Export** | `TIM_PEMAGANGAN`, `AUDITOR` | Exports bilateral country parameters for inter-ministerial meetings. |
| **Audit** | `AUDITOR`, `DIREKTUR_ESELON_II` | History of wage floor modifications and risk index adjustments. |

---

### 3.5 Entity: Batches (`batches`)

| Operation | Permitted Roles | Business Conditions & Scoping Rules |
| :--- | :--- | :--- |
| **Create** | `TIM_PEMAGANGAN` | Instantiates recruitment wave with dates, quotas, and assigned BPVP balai. |
| **Read** | All Roles | Public sees `REGISTRATION_OPEN` batches; staff see all operational statuses. |
| **Update** | `TIM_PEMAGANGAN` | Can adjust timelines prior to registration launch; quotas locked once open. |
| **Delete** | None | Cancelled batches marked as `CANCELLED` with mandatory justification note. |
| **Approve** | `DIREKTUR_ESELON_II` | Formal decree assigning national quotas and BPVP dormitory allocations. |
| **Publish** | `DIREKTUR_ESELON_II`, `TIM_PEMAGANGAN` | Opens registration publicly on landing page portal. |
| **Export** | `TIM_PEMAGANGAN`, `DIREKTUR_ESELON_II`, `AUDITOR` | Export batch registration statistics and demographic breakdowns. |
| **Audit** | `AUDITOR`, `DIREKTUR_ESELON_II`, `SUPER_ADMIN_IT` | Audit quota variance, date shifts, and applicant cutoff timestamps. |

---

### 3.6 Entity: Reports (`reports`)

| Operation | Permitted Roles | Business Conditions & Scoping Rules |
| :--- | :--- | :--- |
| **Create** | `TIM_PEMAGANGAN` | Prepares executive analytical briefs and quarterly bilateral summaries. |
| **Read** | `TIM_PEMAGANGAN`, `DIREKTUR_ESELON_II`, `AUDITOR`, `VIEWER`, `VERIFIKATOR_BPVP` (Regional) | Scoped to jurisdictional responsibilities. |
| **Update** | `TIM_PEMAGANGAN` | Edits draft narrative observations and policy recommendations. |
| **Delete** | None | Historical reports archived for longitudinal analysis. |
| **Approve** | `DIREKTUR_ESELON_II` | Formal ministerial clearance before dissemination to the Menteri. |
| **Publish** | `DIREKTUR_ESELON_II` | Authorizes public release of annual apprenticeship statistical yearbooks. |
| **Export** | `TIM_PEMAGANGAN`, `DIREKTUR_ESELON_II`, `AUDITOR`, `VIEWER` | Exports to PDF, XLSX, and machine-readable JSON datasets. |
| **Audit** | `AUDITOR` | Validates that report calculations reconcile with raw transaction tables. |

---

### 3.7 Entity: System Settings (`system_settings`)

| Operation | Permitted Roles | Business Conditions & Scoping Rules |
| :--- | :--- | :--- |
| **Create** | `SUPER_ADMIN_IT` | Defines new OAuth client configurations and infrastructure rate limits. |
| **Read** | `SUPER_ADMIN_IT`, `AUDITOR`, `DIREKTUR_ESELON_II` | View system health, security parameters, and encryption certificates. |
| **Update** | `SUPER_ADMIN_IT` | Modifies API timeout thresholds, rate limiting, and SIAPkerja token URIs. |
| **Delete** | None | Critical parameters cannot be deleted; deprecated keys are rotated. |
| **Approve** | `SUPER_ADMIN_IT` (Technical) / `DIREKTUR_ESELON_II` (Policy) | Joint technical and managerial sign-off on security baseline alterations. |
| **Publish** | None | System configurations are private internal infrastructure attributes. |
| **Export** | `SUPER_ADMIN_IT`, `AUDITOR` | Export system configuration audits for BSSN security certification. |
| **Audit** | `AUDITOR`, `SUPER_ADMIN_IT` | Full audit trail of every configuration mutation and admin session grant. |
