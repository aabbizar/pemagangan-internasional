# Simulated Authentication Architecture & Flow Specification

**Project:** International Internship Platform (Talenta Vokasi — Kemnaker RI)  
**Phase:** Phase 2A — Dummy Authentication Experience  
**Document:** Authentication Flow & Identity Verification Specification  
**Status:** IMPLEMENTED (FRONTEND SIMULATION ONLY)  
**Standard:** WCAG 2.1 Level AA & Zero-Persistence In-Memory State  
**Date:** September 2026  

---

## 1. Executive Summary & Architectural Scope

Phase 2A delivers a complete, simulated passwordless authentication experience designed to validate:
1. **User Experience (UX):** Rapid passwordless authentication flow via 6-digit one-time code (OTP).
2. **Information Architecture (IA):** Coherent transition from public landing page to administrative verification dashboard.
3. **Future Integration Readiness:** Clear interface contracts for eventual integration with **SIAPkerja Single Sign-On (SSO)** and **OpenID Connect (OIDC)** identity providers.

### Strict Governance Compliance:
- **Zero Backend / API Calls:** No network requests to authentication servers.
- **Zero Persistent Storage:** Neither `localStorage` nor `sessionStorage` nor HTTP cookies are used.
- **In-Memory State Store:** Handled exclusively via a reactive TypeScript in-memory singleton module ([`src/lib/auth-session.ts`](file:///c:/Users/aabbizar/Documents/antigravity/pemagangan_paasep/src/lib/auth-session.ts)).
- **Zero New Dependencies:** Implemented strictly with installed packages (`input-otp`, `motion/react`, `sonner`, `lucide-react`).

---

## 2. End-to-End User Journey

```
┌────────────────────────────────┐
│      PUBLIC LANDING PAGE       │  (Route: /)
│   (Click "Admin Access" CTA)   │
└───────────────┬────────────────┘
                │
                ▼
┌────────────────────────────────┐
│      STEP 1: EMAIL ENTRY       │  (Route: /login)
│  • Field: "Email Address"      │
│  • Format Validation (Regex)   │
│  • Accepted: admin@demo.id     │
│  • Action: "Continue"          │
└───────────────┬────────────────┘
                │  (Email format verified & demo credentials match)
                ▼
┌────────────────────────────────┐
│    STEP 2: OTP VERIFICATION    │  (Component: input-otp)
│  • Display: "Verification Code │
│    Sent"                       │
│  • 6-Digit Slot Input          │
│  • Demo Code: 123456           │
│  • 30s Mock Resend Countdown   │
└───────────────┬────────────────┘
                │  (OTP matches 123456)
                ▼
┌────────────────────────────────┐
│      STEP 3: SUCCESS STATE     │  (Motion: 150ms–250ms subtle curve)
│  • Display: "Access Granted"   │
│  • "Authentication Successful" │
│  • Sonner Toast Notification   │
│  • In-Memory Session Created   │
└───────────────┬────────────────┘
                │  (Auto-redirect after 750ms)
                ▼
┌────────────────────────────────┐
│    STEP 4: DASHBOARD ENTRY     │  (Route: /dashboard)
│  • Header: admin@demo.id       │
│  • Role: Administrator         │
│  • Action: "Keluar Sesi"       │
└────────────────────────────────┘
```

---

## 3. Screen-by-Screen Behavioral Specifications

### 3.1 Step 1 — Email Entry (`/login`)
- **Visual Presentation:** Clean, architectural Government-Tech card styled with high-contrast typography, subtle grid texture, and high-trust gov-tech badging (`Government-Tech Authentication • SIAPkerja Unified Identity Protocol`).
- **Interactive Controls:**
  - `Email Address` input with autofocus and keyboard submission on `Enter`.
  - Accessible helper badge providing a one-click demo email fill (`admin@demo.id`).
  - Primary button: `Continue` (includes disabled and loading states).
- **Validation Rules:**
  - Standard RFC 5322 email regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`.
  - Demo Account Restriction: Must match `admin@demo.id`.

### 3.2 Step 2 — OTP Verification (`input-otp`)
- **Visual Presentation:** 6 distinct monospace slot inputs with active border ring highlighting, animated focus caret, and subtle scale transitions.
- **Interactive Controls:**
  - 6 individual slots handled seamlessly by `input-otp` with auto-focus and full keyboard arrow/backspace navigation.
  - One-click demo OTP helper badge (`123456`).
  - `Change Email` link enabling return to Step 1 without page reload.
  - `Resend Verification Code` trigger with a **30-second mock countdown timer**.
- **Automated Trigger:** Typing the 6th digit automatically initiates validation without requiring an explicit button click.

### 3.3 Step 3 — Success State
- **Visual Presentation:** Minimalist architectural confirmation modal featuring an emerald verification icon, animated progress bar, and official clearance metadata.
- **Copy Mandate:**
  - Heading: **"Access Granted"**
  - Sub-heading: **"Authentication Successful"**
- **Motion Parameters:** Subtle 180ms ease-out fade and scale transition strictly adhering to the 150ms–250ms motion limit.
- **Toast Integration:** Sonner notification dispatched:  
  `toast.success("Access Granted", { description: "Authentication Successful" })`.

### 3.4 Step 4 — Dashboard Session Establishment (`/dashboard`)
- **Session Handshake:** Reads active user from `authSessionStore.getSession()`.
- **Rendered Attributes:**
  - User identity: `admin@demo.id`
  - Access role: `Administrator Verifikator`
  - Access tier: `Executive Oversight`
- **Logout Action:** Clicking `Keluar Sesi` triggers `authSessionStore.clearSession()`, clears memory state, displays Sonner toast, and redirects cleanly back to `/login`.

---

## 4. State Matrix & Error Handling

| Scenario | Trigger / Condition | UI Behavior | Screen Reader & Toast Feedback |
| :--- | :--- | :--- | :--- |
| **Empty Email** | User clicks "Continue" with empty field. | Field displays red border (`border-rose-400`); inline error message renders below input. | `aria-invalid="true"`; `role="alert"` announces "Please enter a valid email format". Sonner error toast displayed. |
| **Malformed Email** | Input missing `@` or domain (e.g., `admin`). | Form submission blocked; inline error message shown. | Sonner error: *"Invalid email format"*. |
| **Unaccepted Email** | Valid email format but not `admin@demo.id` (e.g., `user@domain.com`). | Inline warning displayed indicating restricted demo access. | Sonner error: *"Demo Access Restriction — Accepted email: admin@demo.id"*. |
| **Incomplete OTP** | Submitting with fewer than 6 digits typed. | Form highlights missing slots; inline alert displayed. | Sonner error: *"Please enter all 6 digits"*. |
| **Invalid OTP Code** | 6 digits entered but value !== `123456`. | Slots clear automatically; active focus resets to slot 1; red error message appears. | `aria-live="polite"` announces verification failure. Sonner error: *"Invalid code. Use demo code: 123456"*. |
| **Timer Active** | User clicks "Resend Code" while countdown > 0. | Button disabled (`cursor-not-allowed`); countdown updates every 1000ms. | Button indicates remaining seconds (e.g. `Resend Code in 24s`). |
| **Timer Expired** | Countdown reaches 0. | Button activates (`text-cyan-700`); icon changes to active state. | Clicking dispatches Sonner info toast: *"Verification code resent (Demo OTP: 123456)"*. |
| **Valid OTP** | OTP === `123456`. | Form transitions to Step 3 (Success State); session established in-memory. | Sonner success: *"Access Granted — Authentication Successful"*. |

---

## 5. Accessibility Compliance (WCAG 2.1 AA)

1. **Keyboard Navigation:**
   - Full keyboard operability via `Tab`, `Shift+Tab`, `Enter`, and arrow keys.
   - `input-otp` maintains focused position and manages caret navigation without mouse reliance.
2. **Visible Focus States:**
   - Universal high-contrast cyan ring (`focus-visible:ring-2 focus-visible:ring-cyan-500`) across all interactive inputs, buttons, and links.
3. **Screen Reader Announcements:**
   - Error messages leverage `role="alert"` and `aria-live="polite"`.
   - Email input links dynamically to error states via `aria-describedby` and `aria-invalid`.
4. **Reduced Motion Compliance:**
   - Motion transitions constrained to 180ms–200ms.
   - Bypassed completely if the operating system requests `prefers-reduced-motion: reduce`.

---

## 6. Future Integration Blueprint: OIDC & SIAPkerja SSO

When the platform transitions from Phase 2 PoC to Phase 3 Production Implementation, this simulated flow will be replaced by an enterprise OAuth 2.0 / OpenID Connect (OIDC) architecture connected to **SIAPkerja** (Sistem Informasi dan Pelayanan Ketenagakerjaan).

### 6.1 Authentication Sequence Diagram (Future OIDC)

```
┌─────────┐              ┌────────────────────────┐              ┌───────────────────────┐
│ Browser │              │ Next.js Backend / Auth │              │ Kemnaker SIAPkerja    │
│ (Client)│              │ Route Handlers         │              │ Identity Provider     │
└────┬────┘              └───────────┬────────────┘              └───────────┬───────────┘
     │                               │                                       │
     │ 1. Initiate Login             │                                       │
     │──────────────────────────────►│                                       │
     │                               │ 2. Generate PKCE & State              │
     │                               │ 3. 302 Redirect to SIAPkerja Auth URI │
     │ 4. Redirect                   │──────────────────────────────────────►│
     │◄──────────────────────────────│                                       │
     │                                                                       │
     │ 5. User Enters NIK / Email & OTP on Official Kemnaker SSO             │
     │──────────────────────────────────────────────────────────────────────►│
     │                                                                       │
     │ 6. Authorization Code Callback (/api/auth/siapkerja/callback)         │
     │──────────────────────────────►│                                       │
     │                               │ 7. Exchange Code + PKCE for Tokens    │
     │                               │──────────────────────────────────────►│
     │                               │ 8. Return ID Token & Access Token     │
     │                               │◄──────────────────────────────────────│
     │                               │ 9. Set HttpOnly Secure Session Cookie │
     │ 10. Redirect to /dashboard    │                                       │
     │◄──────────────────────────────│                                       │
```

### 6.2 OIDC Token Payload Specifications (`ID Token`)

Future identity claims returned by the SIAPkerja OpenID Provider will map to the internal `UserAccount` entity:

```json
{
  "iss": "https://account.kemnaker.go.id",
  "sub": "SK-99120481",
  "aud": "talenta-vokasi-portal-client-id",
  "exp": 1790568000,
  "iat": 1790564400,
  "email": "admin@demo.id",
  "email_verified": true,
  "name": "Raden Mas Bagus",
  "nik": "3201123456780001",
  "roles": [
    "KEMNAKER_STAFF",
    "BINALAVOTAS_VERIFIER",
    "INTERNATIONAL_INTERNSHIP_ADMIN"
  ],
  "work_unit": {
    "directorate": "Direktorat Bina Penyelenggaraan Pelatihan Vokasi dan Pemagangan",
    "echelon": "II"
  },
  "amr": ["pwd", "otp"],
  "acr": "urn:mace:incommon:iap:silver"
}
```

### 6.3 Security & Infrastructure Safeguards for Phase 3:
1. **PKCE Enforcement:** Proof Key for Code Exchange (RFC 7636) mandatory on all client authorization grants.
2. **HttpOnly, SameSite=Lax, Secure Cookies:** Tokens will never be exposed to browser JavaScript or stored in client storage.
3. **Hardware Security Module (HSM) Token Signing:** JWTs cryptographically signed using RS256 with rotation managed by BSrE / BSSN.
4. **Step-up Authentication:** Sensitive administrative operations (e.g., approving international quota disbursements) will trigger mandatory re-authentication via SIAPkerja authenticator app.
