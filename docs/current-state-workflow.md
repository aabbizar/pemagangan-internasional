# Current-State Operational Workflow (As-Is Reality)

**Entity:** Direktorat Bina Penyelenggaraan Pelatihan Vokasi dan Pemagangan, Ditjen Binalavotas, Kemnaker RI  
**Working Group:** Tim Kerja Pemagangan Luar Negeri & Subdit Penyelenggaraan  
**Phase:** Phase 2E — Real Operational Workflow Discovery  
**Purpose:** Documenting the actual human workflow, manual tooling, and day-to-day administrative reality before designing future backend systems.  
**Date:** September 2026  

---

## 1. Executive Summary: The Operational Reality Today

While previous architectural documents specify target-state digital automation, **the operational reality today is overwhelmingly manual, paper-intensive, spreadsheet-driven, and fragmented across ad-hoc communication channels.**

There is currently **no unified database**, no central candidate tracking engine, and no automated verification pipeline. Operations depend on the dedication of individual civil servants (ASN) and contract technical staff (PPNPN) manually bridging disconnected Google Forms, WhatsApp groups, printed paper folders (*map snelhefter*), desktop Excel workbooks, and physical memo routing (*Nota Dinas fisik*).

---

## 2. Core Operational Discovery: Who Does What Today?

### 2.1 Who currently collects participant data?
- **Current Actors:**
  - **Staf Administrasi Subdit Pemagangan LN (Pusat):** Creates one-off Google Forms or collects emailed Excel rosters from sending partners.
  - **Petugas Pendaftaran BPVP Daerah (Balai):** Receives walk-in physical folders (*berkas fisik*) and manually types applicant data into local spreadsheets.
  - **Pengurus LPK / Sending Organization (SO):** Collects physical documents from vocational students in the regions and compiles batch spreadsheets to be submitted to Kemnaker via email or USB flash drives.
- **Tools Used:** Google Forms, WhatsApp chat submissions, paper application forms, Microsoft Excel desktop files, Google Drive links.

---

### 2.2 Who validates participant documents?
- **Current Actors:**
  - **Petugas Verifikator di Balai (BPVP/BBPVP):** Physical verification desk. 2 to 4 staff members manually flip through printed paper dossiers:
    - Visually comparing photocopied e-KTP with Family Cards (Kartu Keluarga).
    - Verifying legalization stamps (*cap basah legalisir*) on SMK/Polytechnic diplomas.
    - Inspecting physical parent permission letters (*Surat Izin Orang Tua*) to confirm a Rp 10.000 revenue stamp (*meterai*) is affixed and signed.
    - Checking hospital Medical Check-Up (MCU) physical printouts line-by-line for exclusions (hepatitis, color blindness, scars, tattoos).
  - **Staf Teknis Kemnaker Pusat:** Conducts secondary manual cross-checks on short-listed candidate spreadsheets before batch selection starts.
- **Tools Used:** Physical checklists with ballpoint pens, desktop PDF viewers, WhatsApp photo consultations with candidates to request clearer resubmissions.

---

### 2.3 Who communicates with candidates?
- **Current Actors:**
  - **Pengelola Media Sosial & Admin WhatsApp BPVP:** Handles thousands of incoming inquiries.
  - **Staf Pelaksana Tim Pemagangan:** Manages temporary broadcast lists.
  - **Instruktur & Pengurus LPK / Sending Organizations:** Acts as the primary informal intermediary.
- **Communication Channels:**
  - **WhatsApp Groups (WAG):** Large, chaotic groups (e.g., *"Seleksi Magang Jepang Batch II 2026 - Gel 1"*, *"Peserta Pelatihan Pra-Pemberangkatan"*) created per cohort. Staff numbers are often overwhelmed by repetitive candidate inquiries.
  - **Instagram Direct Messages (@kemnaker / @binalavotas / @bbpvp):** Candidates ask regarding announcements, exam schedules, and document status.
  - **Physical Notice Boards:** Printed PDF lists pinned on notice boards at BPVP regional campuses.
  - **Unstructured Phone Calls:** Direct calls to BPVP front-desk landlines.

---

### 2.4 Who manages batches?
- **Current Actors:**
  - **Koordinator Penyelenggaraan Pemagangan Luar Negeri:** Sets recruitment quotas, schedules, and test dates based on bilateral partner requests.
  - **Subkoordinator & Staf Teknis Pusat:** Manages the operational batch timeline manually.
- **Tools Used:**
  - Microsoft Excel master schedule files circulated via WhatsApp or shared Google Drive.
  - Paper schedule sheets discussed during weekly physical coordination meetings.
  - Physical calendar printouts mounted on directorate office walls.

---

### 2.5 Who approves programs?
- **Current Actors:**
  - **Direktur Bina Penyelenggaraan Pelatihan Vokasi dan Pemagangan (Eselon II):** Official approval authority.
  - **Direktur Jenderal Binalavotas (Eselon I):** High-level bilateral approval for new country MoUs.
  - **Biro Hukum Kemnaker:** Manual legal scrutiny of bilateral agreement text.
- **Process Today:**
  - Physical paper file folders (*Berkas Usulan Program*) containing printed MoUs, draft curriculum, partner profile, and budget calculations.
  - Circulated through physical internal mail (*Disposisi Surat Masuk/Keluar*) with green/yellow routing slips signed by hand (*paraf koordinasi*).

---

### 2.6 Who publishes information?
- **Current Actors:**
  - **Biro Humas Kemnaker (Pusat):** Publishes official press releases and infographics on national social media channels.
  - **Tim IT & Pengelola Website Ditjen Binalavotas:** Uploads static announcement PDF files (e.g., *"Pengumuman_Hasil_Seleksi_Batch_II_2026.pdf"*) to the Kemnaker website.
  - **Admin Akun Instagram BPVP Daerah:** Posts carousel images containing JPEG screenshots of selection schedules and participant guidelines.
- **Tools Used:** WordPress CMS, PDF uploaders, Canva, Instagram, Facebook.

---

### 2.7 Who maintains spreadsheets?
- **Current Actors:**
  - **Multiple individual staff members in parallel:**
    - Staff A at Pusat maintains `Master_Data_IM_Japan_2026_v3.xlsx`.
    - Staff B at BPVP Bandung maintains `Data_Peserta_Lolos_Fisik_Bdg_Final.xlsx`.
    - Staff C at BPVP Semarang maintains `Peserta_Cadangan_Semarang_Rev2.xlsx`.
    - Staff D at Sending Organization maintains `List_Pengiriman_Siswa_PT_ABC.xlsx`.
- **Reality of Maintenance:**
  - Spreadsheets are stored locally on personal laptops and exchanged via WhatsApp attachments and USB flash drives.
  - No central file locking. When multiple staff make edits, copy-paste consolidation must be performed manually by a junior staff member late at night before briefings.

---

### 2.8 Who generates reports?
- **Current Actors:**
  - **Staf Data & Informasi Subdit Pemagangan:** Assigned to consolidate disparate spreadsheets when Echelon leadership requests statistics.
  - **Subkoordinator:** Reviews and formats consolidated data into executive slides.
- **Tools Used:** Microsoft Excel pivot tables, manual sum formulas, Microsoft PowerPoint, Microsoft Word (*Laporan Akuntabilitas Kinerja Instansi Pemerintah / LAKIP*).
- **Time Required:** Generating an authoritative count of active participants across all batches and countries currently takes **3 to 7 working days** of manual spreadsheet gathering and phone calls to regional balai.
