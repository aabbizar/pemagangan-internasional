"use client";

import * as React from "react";
import GlyphPortal from "@/components/ui/glyph-portal";
import { BackgroundShader } from "@/components/ui/background-shader";

export function Chapter01Manifesto() {
  return (
    <div
      id="manifesto"
      className="relative w-full bg-[#041222] text-white"
      style={{
        "--gp-paper": "transparent",
        "--gp-ink": "#FFFFFF",
        "--gp-field": "#061A30",
        "--gp-foreground": "#FBFBFA",
        fontFamily: "'Futura', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
      } as React.CSSProperties}
    >
      <style>{`
        [data-kemnaker-demo] {
          font-family: 'Futura', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
        }
        [data-kemnaker-demo] * {
          font-family: inherit;
        }
        [data-kemnaker-demo] [data-gp-caption]{inset:calc(var(--gp-word-bottom,50%) + 82px) 24px auto;justify-content:center;}
        [data-kemnaker-demo] [data-gp-hint]{display:none;}
        [data-kemnaker-demo] [data-gp-enter]{min-height:46px;padding:0 24px;gap:20px;background:rgba(10,37,64,0.8);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.25);border-radius:10px;color:#fff;font-size:13px;font-weight:500;box-shadow:0 4px 18px rgba(0,0,0,0.25);transition:all .2s ease;}
        [data-kemnaker-demo] [data-gp-enter]:hover{background:#0284C7;border-color:rgba(255,255,255,0.5);box-shadow:0 6px 24px rgba(2,132,199,0.4);transform:translateY(-1px);}
        [data-kemnaker-demo] [data-gp-enter]:focus-visible{outline:2px solid #38BDF8;outline-offset:4px;}
        [data-kemnaker-demo] [data-gp-touch-picker]{top:auto;bottom:18px;left:50%;}
        [data-kemnaker-demo] [data-gp-select]{border:1px solid rgba(255,255,255,0.2);border-radius:8px;font-size:12px;color:#ffffff;background:rgba(10,37,64,0.85);backdrop-filter:blur(8px);}

        [data-sublime-eyebrow]{position:absolute;inset:auto 24px calc(100% - var(--gp-word-top,35%) + 34px);margin:0;text-align:center;font-size:13px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:#E0F2FE;text-shadow:0 2px 12px rgba(4,18,34,0.7);}
        [data-sublime-support]{position:absolute;inset:calc(var(--gp-word-bottom,50%) + 32px) 24px auto;margin:0;text-align:center;font-size:16px;font-weight:400;line-height:1.5;color:rgba(255,255,255,0.92);text-shadow:0 2px 12px rgba(4,18,34,0.6);}
        @container(max-width:450px){
          [data-sublime-eyebrow]{font-size:11px;letter-spacing:.12em;}
          [data-sublime-support]{font-size:14px;}
          [data-kemnaker-demo] [data-gp-caption]{top:calc(var(--gp-word-bottom,50%) + 76px);}
        }
        @container(max-height:479px){
          [data-sublime-support]{top:calc(var(--gp-word-bottom,50%) + 16px);}
          [data-kemnaker-demo] [data-gp-caption]{top:calc(var(--gp-word-bottom,50%) + 60px);}
        }

        [data-kemnaker-demo] [data-gp-content]{padding:5.5rem clamp(1.25rem,5cqw,5rem) 6.5rem;font-family:inherit;}
        [data-slipstream-copy]{display:flex;width:min(100%,80rem);margin:auto;flex-direction:column;align-items:flex-start;gap:clamp(2rem,5svh,3.5rem);}
        [data-slipstream-copy] h2{max-width:52rem;margin:0;color:inherit;font-size:clamp(1.75rem,1.1rem + 2.1cqw,2.25rem);font-weight:400;line-height:1.25;letter-spacing:0;text-wrap:balance;}
        [data-slipstream-features]{display:grid;width:100%;grid-template-columns:1fr;gap:1.75rem;}
        [data-slipstream-feature]{border-top:1px solid rgba(251,251,250,.22);padding-top:1.1rem;}
        [data-slipstream-feature] h3{margin:0;color:inherit;font-size:1.125rem;font-weight:500;line-height:1.2;letter-spacing:0;}
        [data-slipstream-feature] p{margin:.55rem 0 0;color:rgba(251,251,250,.85);font-size:.9375rem;line-height:1.55;font-weight:400;}
        [data-slipstream-no]{display:inline-block;margin-right:.7rem;color:rgba(251,251,250,.85);font:500 .75rem 'Futura', 'Plus Jakarta Sans', monospace;letter-spacing:.08em;transform:translateY(-.1em);}
        @media(min-width:768px){[data-slipstream-features]{grid-template-columns:repeat(3,minmax(0,1fr));gap:3.5rem;}}
      `}</style>

      <div data-kemnaker-demo>
        <GlyphPortal
          word="TALENTA"
          focusChar="T"
          scrollLength={2.6}
          interactive={true}
          annotations={false}
          enterLabel="Masuk Portal LMS"
          fontFamily="'Futura', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
          fontWeight={700}
          paperBackground={
            <BackgroundShader
              colors={["#041222", "#0A2540", "#0284C7", "#1E40AF", "#38BDF8"]}
              speed={0.35}
              distortion={0.8}
              swirl={0.6}
            />
          }
          background={
            <div style={{ position: "absolute", inset: 0, overflow: "hidden", transform: "translateZ(0)" }}>
              {/* Pure crisp white for the letter TALENTA before scroll */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, #FFFFFF 0%, #F0F9FF 100%)",
                  opacity: "calc(1 - var(--gp-reveal, 0))",
                  transition: "opacity 0.15s ease",
                  transform: "translateZ(0)",
                  willChange: "opacity",
                }}
              />
              {/* Deep Navy LMS world revealed when zooming in */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "radial-gradient(circle at 18% 10%, rgba(14,116,144,0.65), transparent 40%), radial-gradient(circle at 82% 25%, rgba(2,132,199,0.4), transparent 35%), radial-gradient(circle at 50% 80%, rgba(3,105,161,0.45), transparent 45%), linear-gradient(135deg, #041222 0%, #0A2540 50%, #020C18 100%)",
                  opacity: "var(--gp-reveal, 0)",
                  transform: "translateZ(0)",
                  willChange: "opacity",
                }}
              />
            </div>
          }
          front={
            <>
              {/* Center eyebrow - No navbar collision */}
              <p data-sublime-eyebrow>Lembaga Pemagangan Berbasis LMS</p>
              <p data-sublime-support>Akses pembelajaran terpadu menuju karier global.</p>
            </>
          }
        >
          {/* Inside the Letter: Clean LMS Explanation */}
          <div data-slipstream-copy>
            <h2>Apa itu Learning Management System (LMS)?</h2>

            <div data-slipstream-features>
              <div data-slipstream-feature>
                <h3>
                  <span data-slipstream-no>01</span>Pusat Belajar Terpadu
                </h3>
                <p>
                  Platform digital mandiri untuk mengakses kurikulum vokasi, modul bahasa asing dwibahasa, dan simulasi industri secara terstruktur kapan saja.
                </p>
              </div>

              <div data-slipstream-feature>
                <h3>
                  <span data-slipstream-no>02</span>Monitoring & Evaluasi Real-Time
                </h3>
                <p>
                  Sistem pelacakan otomatis yang mengevaluasi progres belajar harian, presensi pelatihan karantina, dan kesiapan mental-fisik peserta secara objektif.
                </p>
              </div>

              <div data-slipstream-feature>
                <h3>
                  <span data-slipstream-no>03</span>Standardisasi Sertifikasi Global
                </h3>
                <p>
                  Pusat validasi kompetensi resmi yang terhubung langsung dengan registri Kemnaker RI dan standar kualifikasi industri mitra di luar negeri.
                </p>
              </div>
            </div>
          </div>
        </GlyphPortal>
      </div>
    </div>
  );
}

export default Chapter01Manifesto;
