# Comprehensive Data Dictionary Specification

**Platform:** International Internship Platform (Talenta Vokasi — Kemnaker RI)  
**Governing Authority:** Kementerian Ketenagakerjaan Republik Indonesia  
**Phase:** Phase 2C — Domain Modeling & Information Architecture  
**Status:** SPECIFICATION ONLY (NO CODE / NO DATABASE CREATED)  
**Date:** September 2026  

---

## 1. Overview & Data Conventions

This data dictionary defines every entity attribute, field type, nullability constraint, and business definition for the planned database schema.

### Standard Conventions:
- **Primary Keys:** UUID v4 format (`VARCHAR(36)` or native `UUID`), immutable.
- **Timestamps:** ISO 8601 UTC with timezone (`TIMESTAMPTZ`), default `NOW()`.
- **Naming Style:** `snake_case` for all database column identifiers.
- **Boolean Flags:** Prefixed with `is_` or `has_`, strictly non-null with explicit default.

---

## 2. Entity: `participants` (Master Data Peserta)

| Field Name | Description | Type | Required | Constraints / Notes |
| :--- | :--- | :--- | :---: | :--- |
| `id` | Unique participant identifier | `UUID` | **Yes** | Primary Key, UUIDv4 |
| `user_id` | Foreign key referencing authenticated account | `UUID` | **Yes** | 1 : 1 Unique, Foreign Key |
| `institution_id` | Foreign key referencing educational origin | `UUID` | **Yes** | Foreign Key referencing `institutions.id` |
| `nik` | 16-digit National Identification Number | `VARCHAR(16)` | **Yes** | Unique, Modulo-10 checksum, Verified via Dukcapil |
| `full_name` | Full legal name matching civil registry/passport | `VARCHAR(150)` | **Yes** | Uppercase normalized |
| `gender` | Biological sex for physical qualification criteria | `ENUM` | **Yes** | Values: `'MALE'`, `'FEMALE'` |
| `birth_date` | Date of birth | `DATE` | **Yes** | Age constraint: 18 ≤ Age ≤ 28 |
| `birth_place` | City or regency of birth | `VARCHAR(100)` | **Yes** | Matches KTP/Dukcapil |
| `phone_number` | Active mobile / WhatsApp contact number | `VARCHAR(20)` | **Yes** | E.164 international format, e.g. `+6281234567890` |
| `address_province` | Provincial administrative code | `VARCHAR(10)` | **Yes** | Kemendagri 2-digit province code |
| `address_regency` | Regency/City administrative code | `VARCHAR(10)` | **Yes** | Kemendagri 4-digit regency code |
| `address_detail` | Detailed street address | `TEXT` | **Yes** | Free text domicile |
| `passport_number` | Republic of Indonesia passport number | `VARCHAR(20)` | No | Optional initially, mandatory before Stage 4 |
| `passport_expiry_date` | Passport expiration date | `DATE` | No | Must be ≥ 18 months beyond departure date |
| `emergency_contact_name` | Primary parent/guardian/spouse name | `VARCHAR(150)` | **Yes** | Emergency next-of-kin |
| `emergency_contact_phone` | Next-of-kin contact phone number | `VARCHAR(20)` | **Yes** | E.164 format |
| `profile_status` | Verification standing of candidate profile | `ENUM` | **Yes** | Values: `'DRAFT'`, `'VERIFIED'`, `'SUSPENDED'`, `'BLACKLISTED'`. Default: `'DRAFT'` |
| `created_at` | Record creation timestamp | `TIMESTAMPTZ` | **Yes** | Default: `CURRENT_TIMESTAMP` |
| `updated_at` | Record last modification timestamp | `TIMESTAMPTZ` | **Yes** | Default: `CURRENT_TIMESTAMP` |

---

## 3. Entity: `programs` (Katalog Program Pemagangan)

| Field Name | Description | Type | Required | Constraints / Notes |
| :--- | :--- | :--- | :---: | :--- |
| `id` | Unique program identifier | `UUID` | **Yes** | Primary Key, UUIDv4 |
| `country_id` | Destination host country foreign key | `UUID` | **Yes** | Foreign Key referencing `countries.id` |
| `code` | Unique program alphanumeric code | `VARCHAR(30)` | **Yes** | Unique, e.g. `PRG-JPN-IMJ-2026` |
| `title` | Formal title of the internship scheme | `VARCHAR(200)` | **Yes** | e.g. "Program Pemagangan Bilateral IM Japan Manufaktur Presisi" |
| `scheme_type` | Bilateral partnership governance model | `ENUM` | **Yes** | Values: `'G_TO_G'`, `'G_TO_P'`, `'P_TO_P'`, `'BILATERAL_VET'` |
| `mou_reference_number` | Formal bilateral treaty / decree number | `VARCHAR(100)` | **Yes** | Immutable once approved |
| `description` | Comprehensive program syllabus and scope | `TEXT` | **Yes** | Detailed vocational objectives |
| `stipend_currency` | Currency of living allowance in host nation | `VARCHAR(5)` | **Yes** | ISO 4217, e.g. `'JPY'`, `'EUR'`, `'KRW'`, `'AUD'` |
| `minimum_monthly_stipend` | Statutory floor allowance per month | `DECIMAL(12,2)` | **Yes** | Checked against destination minimum wage laws |
| `editorial_status` | Multi-tier editorial publishing state | `ENUM` | **Yes** | Values: `'DRAFT'`, `'REVIEW'`, `'APPROVED'`, `'PUBLISHED'`, `'ARCHIVED'` |
| `is_active` | Public operational availability flag | `BOOLEAN` | **Yes** | Default: `FALSE` |
| `created_at` | Record creation timestamp | `TIMESTAMPTZ` | **Yes** | Default: `CURRENT_TIMESTAMP` |
| `updated_at` | Record last modification timestamp | `TIMESTAMPTZ` | **Yes** | Default: `CURRENT_TIMESTAMP` |

---

## 4. Entity: `countries` (Negara Tujuan)

| Field Name | Description | Type | Required | Constraints / Notes |
| :--- | :--- | :--- | :---: | :--- |
| `id` | Unique country identifier (ISO alpha-3) | `VARCHAR(3)` | **Yes** | Primary Key, e.g. `'JPN'`, `'DEU'`, `'KOR'`, `'AUS'` |
| `iso_code_2` | ISO 3166-1 alpha-2 country code | `VARCHAR(2)` | **Yes** | Unique, e.g. `'JP'`, `'DE'`, `'KR'`, `'AU'` |
| `name_id` | Country name in Bahasa Indonesia | `VARCHAR(100)` | **Yes** | e.g. "Jepang", "Jerman" |
| `name_en` | Country name in English | `VARCHAR(100)` | **Yes** | e.g. "Japan", "Germany" |
| `capital_city` | Capital city of host country | `VARCHAR(100)` | **Yes** | e.g. "Tokyo", "Berlin" |
| `consular_mission` | Supervising Indonesian embassy / consulate | `VARCHAR(150)` | **Yes** | e.g. "KBRI Tokyo / KJRI Osaka" |
| `primary_language` | Official language required for placement | `VARCHAR(50)` | **Yes** | e.g. "Japanese", "German" |
| `visa_type_category` | Legal visa category code | `VARCHAR(100)` | **Yes** | e.g. "Technical Intern Trainee (Ginou Jisshuusei)" |
| `diplomatic_status` | Bilateral state clearance indicator | `ENUM` | **Yes** | Values: `'ACTIVE'`, `'TRAVEL_ADVISORY'`, `'SUSPENDED'` |
| `flag_svg_url` | Vector asset URI for destination country flag | `VARCHAR(255)` | **Yes** | Stored in public assets |
| `created_at` | Record creation timestamp | `TIMESTAMPTZ` | **Yes** | Default: `CURRENT_TIMESTAMP` |
| `updated_at` | Record last modification timestamp | `TIMESTAMPTZ` | **Yes** | Default: `CURRENT_TIMESTAMP` |

---

## 5. Entity: `batches` (Gelombang / Angkatan Rekrutmen)

| Field Name | Description | Type | Required | Constraints / Notes |
| :--- | :--- | :--- | :---: | :--- |
| `id` | Unique cohort batch identifier | `UUID` | **Yes** | Primary Key, UUIDv4 |
| `program_id` | Foreign key referencing parent program | `UUID` | **Yes** | Foreign Key referencing `programs.id` |
| `sending_organization_id`| Designated sending body / SO | `UUID` | No | Optional for direct G-to-G government batches |
| `training_center_id` | Assigned residential training center / BPVP | `UUID` | **Yes** | Foreign Key referencing `training_centers.id` |
| `batch_number` | Sequential batch designation string | `VARCHAR(50)` | **Yes** | e.g. "BATCH-2026-II" |
| `target_quota` | Approved ceiling number of participants | `INTEGER` | **Yes** | Quota verified by Echelon II decree |
| `registration_start_date` | Registration opening timestamp | `TIMESTAMPTZ` | **Yes** | Start of candidate submissions |
| `registration_end_date` | Registration closing timestamp | `TIMESTAMPTZ` | **Yes** | Hard cutoff for candidate applications |
| `selection_start_date` | Start date of physical & academic tests | `DATE` | **Yes** | Stage 2 commencement |
| `centralized_training_start_date`| Date candidates report to BPVP | `DATE` | **Yes** | Stage 3 commencement |
| `target_departure_date` | Projected flight dispatch date | `DATE` | **Yes** | Stage 4 commencement |
| `batch_status` | Operational lifecycle standing of the batch | `ENUM` | **Yes** | Values: `'UPCOMING'`, `'REGISTRATION_OPEN'`, `'SELECTION_IN_PROGRESS'`, `'TRAINING_IN_PROGRESS'`, `'DISPATCHED'`, `'COMPLETED'` |
| `created_at` | Record creation timestamp | `TIMESTAMPTZ` | **Yes** | Default: `CURRENT_TIMESTAMP` |
| `updated_at` | Record last modification timestamp | `TIMESTAMPTZ` | **Yes** | Default: `CURRENT_TIMESTAMP` |

---

## 6. Entity: `applications` (Pendaftaran & Progres Liveline)

| Field Name | Description | Type | Required | Constraints / Notes |
| :--- | :--- | :--- | :---: | :--- |
| `id` | Unique application tracking number | `VARCHAR(36)` | **Yes** | Format: `APP-YYYY-MM-XXXXX` |
| `participant_id` | Foreign key referencing applicant | `UUID` | **Yes** | Foreign Key referencing `participants.id` |
| `batch_id` | Foreign key referencing targeted cohort batch | `UUID` | **Yes** | Foreign Key referencing `batches.id` |
| `current_stage` | Active numerical stage on 5-stage Liveline | `SMALLINT` | **Yes** | Range: `1` to `5` |
| `stage_status` | Status within the current stage | `ENUM` | **Yes** | Values: `'PENDING'`, `'IN_PROGRESS'`, `'PASSED'`, `'FAILED'`, `'ESCALATED'` |
| `selection_physical_score`| Physical agility test score | `DECIMAL(5,2)` | No | Range: 0.00 – 100.00 |
| `selection_math_score` | Computational & logic test score | `DECIMAL(5,2)` | No | Range: 0.00 – 100.00 |
| `selection_interview_score`| Interview and motivation panel score | `DECIMAL(5,2)` | No | Range: 0.00 – 100.00 |
| `medical_checkup_result` | Hospital fit-to-work result code | `ENUM` | No | Values: `'PENDING'`, `'FIT'`, `'FIT_WITH_RESTRICTION'`, `'UNFIT'` |
| `host_company_name` | Name of assigned foreign enterprise | `VARCHAR(150)` | No | Populated during Stage 4 |
| `host_company_prefecture` | Province / Prefecture / State abroad | `VARCHAR(100)` | No | Populated during Stage 4 |
| `coe_reference_number` | Foreign Certificate of Eligibility number | `VARCHAR(100)` | No | Mandatory before visa issuance |
| `visa_grant_number` | Issued entry visa tracking number | `VARCHAR(100)` | No | Issued by foreign embassy |
| `submitted_at` | Timestamp of initial dossier submission | `TIMESTAMPTZ` | **Yes** | Timestamp |
| `completed_at` | Timestamp of program graduation / finish | `TIMESTAMPTZ` | No | Null until final completion |
| `updated_at` | Last stage mutation timestamp | `TIMESTAMPTZ` | **Yes** | Default: `CURRENT_TIMESTAMP` |

---

## 7. Entity: `institutions` (Lembaga Pendidikan Asal)

| Field Name | Description | Type | Required | Constraints / Notes |
| :--- | :--- | :--- | :---: | :--- |
| `id` | Unique institution identifier | `UUID` | **Yes** | Primary Key, UUIDv4 |
| `npsn_or_code` | Official Kemendikbud NPSN or Higher Ed code | `VARCHAR(20)` | **Yes** | Unique, e.g. `20104820` |
| `name` | Official registered institution title | `VARCHAR(200)` | **Yes** | e.g. "SMK Negeri 1 Cimahi" |
| `institution_type` | Category of vocational education provider | `ENUM` | **Yes** | Values: `'SMK'`, `'POLITEKNIK'`, `'BLK_BPVP'`, `'UNIVERSITAS'` |
| `accreditation_grade` | BAN-PT / BAN-SM accreditation standing | `VARCHAR(5)` | **Yes** | Values: `'A'`, `'B'`, `'C'`, `'UNGGUL'`, `'UNACCREDITED'` |
| `province` | Province location | `VARCHAR(100)` | **Yes** | e.g. "Jawa Barat" |
| `regency` | Regency/City location | `VARCHAR(100)` | **Yes** | e.g. "Kota Cimahi" |
| `is_vocational_partner` | Formal bilateral MoU partnership flag | `BOOLEAN` | **Yes** | Default: `FALSE` |
| `created_at` | Record creation timestamp | `TIMESTAMPTZ` | **Yes** | Default: `CURRENT_TIMESTAMP` |
| `updated_at` | Record last modification timestamp | `TIMESTAMPTZ` | **Yes** | Default: `CURRENT_TIMESTAMP` |

---

## 8. Entity: `sending_organizations` (Lembaga Pengirim / SO / LPK)

| Field Name | Description | Type | Required | Constraints / Notes |
| :--- | :--- | :--- | :---: | :--- |
| `id` | Unique sending organization identifier | `UUID` | **Yes** | Primary Key, UUIDv4 |
| `license_number` | Official Kemnaker SO/LPK license code | `VARCHAR(100)` | **Yes** | Unique, e.g. `KEP.420/LAVOTAS/2024` |
| `organization_name` | Legal corporate name (PT / Yayasan) | `VARCHAR(200)` | **Yes** | Matches AHU Kemenkumham record |
| `brand_name` | Public trade name | `VARCHAR(150)` | **Yes** | e.g. "LPK Global Vokasi Nusantara" |
| `pic_name` | Designated legal director / person-in-charge | `VARCHAR(150)` | **Yes** | Full name |
| `pic_phone` | Director mobile phone number | `VARCHAR(20)` | **Yes** | E.164 format |
| `office_address` | Registered physical office address | `TEXT` | **Yes** | Full address |
| `license_expiry_date` | Expiration date of Kemnaker operating license | `DATE` | **Yes** | Must be renewed every 3 years |
| `accreditation_status` | Current supervisory regulatory standing | `ENUM` | **Yes** | Values: `'ACCREDITED'`, `'PROBATION'`, `'REVOKED'`, `'EXPIRED'` |
| `created_at` | Record creation timestamp | `TIMESTAMPTZ` | **Yes** | Default: `CURRENT_TIMESTAMP` |
| `updated_at` | Record last modification timestamp | `TIMESTAMPTZ` | **Yes** | Default: `CURRENT_TIMESTAMP` |

---

## 9. Entity: `training_centers` (Balai Pelatihan Terpusat)

| Field Name | Description | Type | Required | Constraints / Notes |
| :--- | :--- | :--- | :---: | :--- |
| `id` | Unique training center identifier | `UUID` | **Yes** | Primary Key, UUIDv4 |
| `bpvp_code` | Official Kemnaker Binalavotas balai code | `VARCHAR(30)` | **Yes** | Unique, e.g. `BBPVP-BDG-01` |
| `name` | Official institutional title | `VARCHAR(200)` | **Yes** | e.g. "BBPVP Bandung" |
| `city` | City location | `VARCHAR(100)` | **Yes** | e.g. "Bandung" |
| `province` | Province location | `VARCHAR(100)` | **Yes** | e.g. "Jawa Barat" |
| `dormitory_bed_capacity`| Total residential boarding capacity | `INTEGER` | **Yes** | Must be > 0 |
| `language_lab_capacity` | Total multimedia language learning desks | `INTEGER` | **Yes** | Must be > 0 |
| `head_of_center_nip` | NIP of the head of BPVP (Eselon II/III) | `VARCHAR(25)` | **Yes** | 18-digit ASN NIP |
| `created_at` | Record creation timestamp | `TIMESTAMPTZ` | **Yes** | Default: `CURRENT_TIMESTAMP` |
| `updated_at` | Record last modification timestamp | `TIMESTAMPTZ` | **Yes** | Default: `CURRENT_TIMESTAMP` |

---

## 10. Entity: `certifications` (Sertifikat & Dokumen Pendukung)

| Field Name | Description | Type | Required | Constraints / Notes |
| :--- | :--- | :--- | :---: | :--- |
| `id` | Unique certification document identifier | `UUID` | **Yes** | Primary Key, UUIDv4 |
| `participant_id` | Foreign key referencing candidate owner | `UUID` | **Yes** | Foreign Key referencing `participants.id` |
| `certification_type` | Functional category of credential | `ENUM` | **Yes** | Values: `'LANGUAGE'`, `'VOCATIONAL_SKILL'`, `'MEDICAL_CLEARANCE'`, `'PASSPORT'`, `'POLICE_CLEARANCE_SKCK'` |
| `issuer_name` | Organization issuing the credential | `VARCHAR(150)` | **Yes** | e.g. "The Japan Foundation", "BNSP" |
| `certificate_number` | External certificate or registry code | `VARCHAR(100)` | **Yes** | e.g. "JLPT-2025-091482" |
| `score_or_grade` | Score, grade, or competency level awarded | `VARCHAR(50)` | **Yes** | e.g. "N4 (124/180)", "Kompeten" |
| `issued_date` | Date credential was awarded | `DATE` | **Yes** | Date |
| `expiry_date` | Date credential expires | `DATE` | No | Null if lifetime validity |
| `verification_status` | Verification standing by Kemnaker verifier | `ENUM` | **Yes** | Values: `'PENDING'`, `'VERIFIED'`, `'REJECTED'`, `'FORGED_FRAUD'` |
| `document_file_url` | Secure cloud storage URL | `VARCHAR(255)` | **Yes** | Private encrypted object URI in PDN |
| `verified_by_user_id` | Foreign key of administrative verifier | `UUID` | No | Null until review completed |
| `verified_at` | Timestamp of verification action | `TIMESTAMPTZ` | No | Null until review completed |
| `created_at` | Record upload timestamp | `TIMESTAMPTZ` | **Yes** | Default: `CURRENT_TIMESTAMP` |
| `updated_at` | Record last modification timestamp | `TIMESTAMPTZ` | **Yes** | Default: `CURRENT_TIMESTAMP` |

---

## 11. Entity: `users` (Akun Pengguna Terautentikasi)

| Field Name | Description | Type | Required | Constraints / Notes |
| :--- | :--- | :--- | :---: | :--- |
| `id` | Unique user account identifier | `UUID` | **Yes** | Primary Key, UUIDv4 |
| `siapkerja_uuid` | External OpenID Connect subject ID | `VARCHAR(100)` | **Yes** | Unique federated SSO key |
| `email` | Registered primary email address | `VARCHAR(150)` | **Yes** | Unique, lowercase normalized |
| `nik` | 16-digit civil identity number | `VARCHAR(16)` | **Yes** | Unique, verified against Dukcapil |
| `full_name` | Name of account holder | `VARCHAR(150)` | **Yes** | Full name |
| `role_id` | Foreign key referencing assigned role | `UUID` | **Yes** | Foreign Key referencing `roles.id` |
| `is_active` | Account status flag | `BOOLEAN` | **Yes** | Default: `TRUE` |
| `last_login_at` | Timestamp of most recent authentication | `TIMESTAMPTZ` | No | Updated on every token issuance |
| `created_at` | Account creation timestamp | `TIMESTAMPTZ` | **Yes** | Default: `CURRENT_TIMESTAMP` |
| `updated_at` | Account last modification timestamp | `TIMESTAMPTZ` | **Yes** | Default: `CURRENT_TIMESTAMP` |

---

## 12. Entity: `roles` (Peran Hak Akses RBAC)

| Field Name | Description | Type | Required | Constraints / Notes |
| :--- | :--- | :--- | :---: | :--- |
| `id` | Unique role identifier | `UUID` | **Yes** | Primary Key, UUIDv4 |
| `code` | Unique machine-readable role code | `VARCHAR(50)` | **Yes** | Unique, e.g. `'CALON_PESERTA'`, `'VERIFIKATOR_BPVP'`, `'DIREKTUR_ESELON_II'` |
| `name` | Human-readable role designation | `VARCHAR(100)` | **Yes** | e.g. "Administrator Verifikator Balai" |
| `description` | Comprehensive description of operational scope | `TEXT` | **Yes** | Detailed responsibilities |
| `permissions_json` | Serialized array of granular permission keys | `JSONB` | **Yes** | e.g. `["dossier:verify", "scores:input"]` |
| `created_at` | Record creation timestamp | `TIMESTAMPTZ` | **Yes** | Default: `CURRENT_TIMESTAMP` |
| `updated_at` | Record last modification timestamp | `TIMESTAMPTZ` | **Yes** | Default: `CURRENT_TIMESTAMP` |

---

## 13. Entity: `audit_logs` (Jejak Rekam Audit Forensik)

| Field Name | Description | Type | Required | Constraints / Notes |
| :--- | :--- | :--- | :---: | :--- |
| `id` | Unique audit log entry identifier | `UUID` | **Yes** | Primary Key, UUIDv4 |
| `actor_user_id` | User who initiated the transaction | `UUID` | **Yes** | Foreign Key referencing `users.id` |
| `actor_ip_address` | IPv4 or IPv6 address of the client | `VARCHAR(45)` | **Yes** | Client connection IP |
| `action_type` | Category of database transaction | `VARCHAR(30)` | **Yes** | e.g. `'SCORE_MUTATION'`, `'STAGE_ADVANCE'`, `'QUOTA_APPROVE'` |
| `entity_name` | Name of the mutated table | `VARCHAR(50)` | **Yes** | e.g. `'applications'`, `'programs'` |
| `entity_id` | Primary key of the mutated entity | `VARCHAR(50)` | **Yes** | Target record ID |
| `before_state_json` | JSON serialization prior to mutation | `JSONB` | No | Null for `CREATE` actions |
| `after_state_json` | JSON serialization following mutation | `JSONB` | **Yes** | Current resulting state |
| `justification_note`| Mandatory human-readable explanation | `TEXT` | **Yes** | Minimum 25 characters for overrides |
| `hash_signature` | Cryptographic HMAC-SHA256 signature | `VARCHAR(64)` | **Yes** | Computes hash over entry + previous log hash for blockchain-like immutability |
| `created_at` | Timestamp of transaction | `TIMESTAMPTZ` | **Yes** | Microsecond precision |
