# Security Governance, Audit, and Identity Architecture

**Platform:** International Internship Platform (Talenta Vokasi — Kemnaker RI)  
**Governing Authority:** Kementerian Ketenagakerjaan Republik Indonesia  
**Phase:** Phase 2D — Role, Permission, and Access Modeling  
**Status:** SPECIFICATION ONLY (NO CODE / NO DATABASE CREATED)  
**Security Standard:** ISO/IEC 27001, BSSN CSIRT Standard, and UU PDP No. 27/2022  
**Date:** September 2026  

---

## 1. Governance Principles & Ethical Mandate

The International Internship Platform manages sensitive citizen biometrics, national civil identity numbers (NIK), foreign diplomatic treaties, and public vocational selection scores. To ensure fairness, prevent corruption, and maintain national data sovereignty, the system enforces three structural security doctrines:

---

## 2. Core Security Doctrines

### 2.1 Separation of Duties (SoD)

Separation of Duties prevents conflicts of interest by ensuring no single individual has total control over critical transactions:

1. **System Administration vs Operational Grading:**  
   `SUPER_ADMIN_IT` manages servers, network parameters, and SSO clients, but has **zero access to grade candidates, alter test scores, or approve program quotas**. Conversely, `VERIFIKATOR_BPVP` and `TIM_PEMAGANGAN` grade candidates but have **zero access to system infrastructure or database administration**.
2. **Authoring vs Approving:**  
   The officer in `TIM_PEMAGANGAN` who prepares a batch quota or creates a program draft cannot be the individual who signs off on its approval. Approval belongs exclusively to `DIREKTUR_ESELON_II`.
3. **Regional Containment:**  
   A verifier at BPVP Bandung has zero operational jurisdiction over candidate dossiers registered at BPVP Medan or BPVP Serang. Cross-regional tampering is blocked at the database query level via Row-Level Security (RLS).

---

### 2.2 Four-Eyes Principle (Dual-Control Authorization)

Critical actions that alter citizen status or government commitments require verification by at least two distinct individuals:

| Sensitive Action | First Eye (Initiator / Author) | Second Eye (Approver / Signer) | Enforcement Mechanism |
| :--- | :--- | :--- | :--- |
| **Publishing New Program Batch** | `TIM_PEMAGANGAN` (Drafts batch, dates, quotas) | `DIREKTUR_ESELON_II` (Ratifies decree) | System blocks publication until distinct Echelon II signature is verified. |
| **Selection Score Override** | `VERIFIKATOR_BPVP` (Enters score correction + justification) | `KOORDINATOR_PEMAGANGAN` (Signs off on correction) | Score change remains uncommitted until second reviewer validates rationale. |
| **Candidate Disqualification** | `VERIFIKATOR_BPVP` (Flags fraudulent or failing candidate) | `TIM_PEMAGANGAN` (Reviews evidence and confirms `FAILED` state) | Prevents unilateral unfair disqualification during regional selection. |
| **Emergency Kill-Switch Suspension** | `TIM_PEMAGANGAN` / Diplomatic Liaison (Submits alert) | `DIREKTUR_ESELON_II` (Executes freeze with MFA) | Prevents accidental or rogue system shutdowns. |

---

### 2.3 Principle of Least Privilege (PoLP)

Every actor receives only the precise access privileges required to perform their immediate job role:
1. Public visitors and candidates have zero access to administrative interfaces (`/dashboard`, `/participants`, etc.).
2. The `VIEWER` role receives aggregated executive statistics without individual candidate Personally Identifiable Information (PII).
3. The `AUDITOR` role receives comprehensive historical and forensic data across all tables, but has **zero write, create, update, or delete privileges**.

---

## 3. Forensic Audit Logging Specifications

Audit logging is implemented as an immutable, cryptographically verifiable append-only ledger (`audit_logs`).

### 3.1 Immutable Ledger Mechanics:
1. **Append-Only Restriction:** The database user account used by application services has `INSERT` and `SELECT` privileges only on the `audit_logs` table. `UPDATE` and `DELETE` privileges are revoked at the database engine level.
2. **Cryptographic HMAC Hash Chaining:**  
   Every audit record computes a SHA-256 HMAC signature that encapsulates:
   ```
   Hash[N] = HMAC_SHA256(
     SecretKey, 
     Hash[N-1] + ActorUserID + ActionType + EntityID + Timestamp + BeforeStateJSON + AfterStateJSON
   )
   ```
   This blockchain-like chaining ensures that any deletion or retroactive tampering with past audit entries immediately breaks the cryptographic verification chain.
3. **Mandatory Human-Readable Justification:**  
   Any transaction classified as a score mutation, stage override, or quota deviation requires a non-empty `justification_note` of at least 25 characters. Submissions lacking justification are aborted at the API gateway.

---

## 4. Session Governance & Access Lifecycles

### 4.1 Inactivity Timeouts & Token Lifetimes:
- **Public & Candidate Sessions (`CALON_PESERTA`):**
  - Access Token Lifetime: **15 minutes**.
  - Inactivity Timeout: **60 minutes** (forces automated session cleanup).
  - Refresh Token Lifetime: **7 days** (with single-use token rotation).
- **Administrative Personnel (`VERIFIKATOR_BPVP`, `TIM_PEMAGANGAN`):**
  - Access Token Lifetime: **10 minutes**.
  - Inactivity Timeout: **30 minutes** of idle keyboard/mouse activity.
  - Refresh Token Lifetime: **12 hours** (revoked at end of working day).
- **Executive & High-Privilege Sessions (`DIREKTUR_ESELON_II`, `SUPER_ADMIN_IT`):**
  - Access Token Lifetime: **5 minutes**.
  - Inactivity Timeout: **15 minutes**.
  - Step-Up MFA: Mandatory re-authentication via SMS/Email OTP before executing program publication or emergency suspension.

### 4.2 Concurrent Session Control:
Administrative staff accounts are restricted to **one (1) active concurrent session**. Logging in from a second browser or device automatically terminates the prior session token and logs an entry in the security audit ledger.

---

## 5. Future SIAPkerja OpenID Connect (OIDC) Claims Mapping

When Phase 3 production backend integration commences, identity federation will map authoritative claims from **Kemnaker SIAPkerja** into application permissions.

### 5.1 OIDC Token Claims Architecture:

```json
{
  "iss": "https://account.kemnaker.go.id",
  "sub": "SK-2026-992140",
  "aud": "internship-talenta-vokasi-kemnaker",
  "exp": 1790568000,
  "iat": 1790564400,
  "auth_time": 1790564390,
  "nonce": "c9284fae1082",
  "amr": ["pwd", "otp"],
  "acr": "urn:kemnaker:assurance:high",
  "user_metadata": {
    "nik": "3201123456780001",
    "name": "Budi Santoso, S.Tr.T",
    "email": "budi.santoso@kemnaker.go.id",
    "email_verified": true,
    "phone": "+6281234567890",
    "nip": "198804152010121002",
    "organization_unit": "Direktorat Bina Penyelenggaraan Pelatihan Vokasi dan Pemagangan",
    "regional_center_code": "BBPVP-BDG-01"
  },
  "roles": [
    "VERIFIKATOR_BPVP"
  ]
}
```

### 5.2 Claims-to-Role Mapping Engine:

| SIAPkerja Claim Attribute | Match Rule / Value | Mapped Application Role | Permitted Scope |
| :--- | :--- | :--- | :--- |
| `roles` contains `"SUPERADMIN_PUSDATIN"` | Exact Match | `SUPER_ADMIN_IT` | Global infrastructure |
| `roles` contains `"DIREKTUR_PEMAGANGAN"` | Exact Match | `DIREKTUR_ESELON_II` | Global executive sign-off |
| `roles` contains `"STAF_PEMAGANGAN_LN"` | Exact Match | `TIM_PEMAGANGAN` | Global operations & batches |
| `roles` contains `"VERIFIKATOR_BALAI"` | Matches + `regional_center_code` | `VERIFIKATOR_BPVP` | Regional scope (`BBPVP-BDG-01`) |
| `roles` contains `"PENGURUS_LPK_SO"` | Matches + `so_license_number` | `VERIFIKATOR_LPK` | Organization scope (`SO-LIC-420`) |
| `roles` contains `"AUDITOR_ITJEN"` | Exact Match | `AUDITOR` | Global read-only |
| Default (Public Registrant with NIK) | Fallback | `CALON_PESERTA` | Self records only |

---

## 6. Personal Data Protection (UU PDP No. 27/2022) Compliance

1. **Lawful Basis for Processing:** Processing of candidate demographic and biometric data is conducted pursuant to national employment mandates under UU No. 13/2003 and bilateral international agreements.
2. **Right to Rectification:** Candidates have the right to request correction of inaccurate demographic records prior to official document verification.
3. **Data Retention & Disposal:** Candidate application dossiers are retained for 5 years post-program completion to comply with state audit regulations, after which personal biometrics are purged and anonymized into longitudinal statistics.
4. **Data Breach Notification:** In the event of an infrastructure anomaly, the CSIRT Kemnaker and BSSN must be formally notified within **< 72 hours** in compliance with national cybersecurity regulations.
