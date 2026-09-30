/**
 * Simulated Auth Session Store (Phase 2A PoC)
 *
 * Batasan yang dipenuhi:
 * - Tidak ada API call, tidak ada database.
 * - Tidak memakai localStorage / sessionStorage (dilarang oleh
 *   docs/system-boundaries.md §3.1).
 * - Persistensi memakai cookie `auth_session` sesuai skema mock yang
 *   ditentukan docs/future-backend-notes.md §2.1.3, agar sesi tetap ada
 *   saat halaman di-refresh dan agar `src/proxy.ts` bisa memverifikasi
 *   akses rute di sisi server.
 *
 * Catatan: cookie ini adalah SIMULASI PoC — bukan token keamanan sungguhan.
 */

export interface SimulatedAuthSession {
  email: string;
  role: string;
  authenticatedAt: string;
  isAuthenticated: boolean;
}

const SESSION_COOKIE = "auth_session";

let inMemorySession: SimulatedAuthSession | null = null;
let hydrated = typeof document === "undefined";
const listeners = new Set<() => void>();

function parseCookieSession(): SimulatedAuthSession | null {
  const raw = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${SESSION_COOKIE}=`))
    ?.slice(SESSION_COOKIE.length + 1);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(raw)) as SimulatedAuthSession;
    return parsed && parsed.isAuthenticated ? parsed : null;
  } catch {
    return null;
  }
}

/** Baca cookie sekali lalu kunci ke memori agar referensi snapshot stabil. */
function hydrate(): void {
  if (hydrated || typeof document === "undefined") return;
  hydrated = true;
  inMemorySession = parseCookieSession();
}

function emit(): void {
  listeners.forEach((listener) => listener());
}

export const authSessionStore = {
  getSession: (): SimulatedAuthSession | null => {
    hydrate();
    return inMemorySession;
  },

  setSession: (email: string, role = "Administrator Verifikator"): void => {
    hydrate();
    inMemorySession = {
      email,
      role,
      authenticatedAt: new Date().toISOString(),
      isAuthenticated: true,
    };
    document.cookie = `${SESSION_COOKIE}=${encodeURIComponent(
      JSON.stringify(inMemorySession),
    )}; path=/; max-age=43200; samesite=lax`;
    emit();
  },

  clearSession: (): void => {
    hydrate();
    inMemorySession = null;
    document.cookie = `${SESSION_COOKIE}=; path=/; max-age=0; samesite=lax`;
    emit();
  },

  isAuthenticated: (): boolean => {
    hydrate();
    return inMemorySession !== null && inMemorySession.isAuthenticated;
  },

  /** Dipakai React.useSyncExternalStore — wajib referensi fungsi yang stabil. */
  subscribe: (onStoreChange: () => void): (() => void) => {
    listeners.add(onStoreChange);
    return () => {
      listeners.delete(onStoreChange);
    };
  },
};

/** Snapshot untuk render server: selalu null (cookie tidak tersedia). */
export const getServerSnapshot = (): SimulatedAuthSession | null => null;
