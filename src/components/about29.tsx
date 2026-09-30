'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface AboutBasicSection {
  title: string;
  content: string;
  label?: string;
}

export interface AboutImage {
  src: string;
  alt: string;
  srcDark?: string;
}

export interface About29Props {
  badge?: string;
  heading?: string;
  description?: string;
  images?: AboutImage[];
  sections?: AboutBasicSection[];
  valuesTitle?: string;
  valuesBody?: string;
  ctaText?: string;
  ctaHref?: string;
  className?: string;
}

const defaultProps: About29Props = {
  heading: 'Tentang Kami',
  description:
    'Kami adalah lembaga resmi di bawah naungan Ditjen Binalavotas, Kementerian Ketenagakerjaan Republik Indonesia. Kami berdedikasi membangun ekosistem pelatihan vokasi berstandar global, pembinaan karakter intensif, serta penempatan pemagangan kerja bilateral yang terpercaya ke Jepang, Jerman, dan Korea Selatan.',
  images: [
    {
      src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      alt: 'Gedung dan Fasilitas Pelatihan Modern Kemnaker RI',
    },
    {
      src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
      alt: 'Kolaborasi dan Bimbingan Mentor Internasional',
    },
  ],
  valuesTitle: 'Komitmen & Fondasi Nilai Kami',
  valuesBody:
    'Tiga pilar integritas yang mendasari setiap tahapan seleksi, kurikulum terpadu, dan perlindungan resmi tenaga kerja Indonesia di luar negeri.',
  sections: [
    {
      title: 'Transparansi Penuh',
      content:
        'Seleksi berbasis meritokrasi objektif dengan standarisasi nasional. Seluruh tahapan pendaftaran dan penilaian terverifikasi secara terbuka tanpa calo.',
    },
    {
      title: 'Standar Vokasi Global',
      content:
        'Pelatihan hybrid terpadu (80% daring LMS & 20% karantina luring) yang dirancang selaras dengan regulasi industri di negara tujuan.',
    },
    {
      title: 'Perlindungan Bilateral',
      content:
        'Jaminan kontrak kerja legal, hak upah setara standar industri setempat, serta perlindungan diplomasi berkesinambungan melalui KBRI.',
    },
    {
      label: 'MISI KAMI',
      title: 'Misi Utama Lembaga',
      content:
        'Mewujudkan jembatan bilateral terpercaya yang mentransformasi talenta vokasi Indonesia menjadi tenaga ahli profesional berkualifikasi global.',
    },
  ],
  ctaText: 'Akses Registri Pemagangan',
  ctaHref: '/login',
};

const MAX_COLUMNS = 3;
const MAX_IMAGES = 2;
const COLUMN_CHARS = 175;

const truncate = (content: string) => {
  if (content.length <= COLUMN_CHARS) {
    return content;
  }
  return `${content.slice(0, COLUMN_CHARS).trimEnd()}…`;
};

export function About29(props: About29Props): React.ReactElement {
  const {
    badge,
    heading,
    description,
    images,
    sections,
    valuesTitle,
    valuesBody,
    ctaText,
    ctaHref,
    className,
  } = {
    ...defaultProps,
    ...props,
  };

  const gallery = (images ?? []).slice(0, MAX_IMAGES);
  const columns = (sections ?? []).slice(0, MAX_COLUMNS);
  const mission = sections?.[3] ?? sections?.[2];
  const finalValuesTitle = valuesTitle ?? sections?.[2]?.title;
  const finalValuesBody = valuesBody ?? sections?.[3]?.content;

  return (
    <section className={cn('py-24 sm:py-32 bg-black text-white relative w-full overflow-hidden', className)}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col gap-16 lg:gap-24">
          
          {/* Header Block: Clean 'Tentang Kami' Title + Grayish-White Explanation (No Badges) */}
          <div className="flex flex-col gap-5 lg:gap-6">
            {badge && (
              <div>
                <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-cyan-400 border border-cyan-500/30 bg-neutral-900/80 px-3.5 py-1.5 backdrop-blur-sm inline-block rounded">
                  {badge}
                </span>
              </div>
            )}
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05]">
              {heading}
            </h2>
            {description && (
              <p className="max-w-2xl text-lg sm:text-xl text-neutral-300 leading-relaxed font-normal">
                {description}
              </p>
            )}
          </div>

          {/* Media Grid: Image 1 (Minimal Modern Building) + Image 2 (Mission Card with Overlay) */}
          <div className="grid gap-6 md:grid-cols-2">
            {gallery[0] && (
              <div className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 shadow-2xl h-80 sm:h-96">
                <Image
                  src={gallery[0].src}
                  alt={gallery[0].alt}
                  width={1200}
                  height={800}
                  className="w-full h-full object-cover filter brightness-95 hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
              </div>
            )}
            
            <div
              className="relative flex flex-col justify-between gap-10 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 bg-cover bg-center p-8 sm:p-10 shadow-2xl h-80 sm:h-96"
              style={
                gallery[1]
                  ? { backgroundImage: `url(${gallery[1].src})` }
                  : undefined
              }
            >
              {/* Deep dark overlay to ensure readability */}
              <div className="absolute inset-0 bg-black/75 backdrop-blur-[1px]" />
              
              <div className="relative z-10 flex h-full flex-col justify-between gap-6">
                {mission?.label && (
                  <p className="text-xs font-mono font-bold tracking-[0.2em] text-neutral-300 uppercase">
                    {mission.label}
                  </p>
                )}
                {mission?.content && (
                  <p className="text-lg sm:text-xl font-medium text-white leading-relaxed">
                    &ldquo;{mission.content}&rdquo;
                  </p>
                )}
                <div className="h-1 w-12 bg-white/70 rounded-full" />
              </div>
            </div>
          </div>

          {/* Values Section: Title, Subtitle, & 3-Column Grid */}
          <div className="flex flex-col gap-10 lg:gap-14 border-t border-neutral-800/80 pt-12 sm:pt-16">
            <div className="flex max-w-2xl flex-col gap-3">
              {finalValuesTitle && (
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
                  {finalValuesTitle}
                </h3>
              )}
              {finalValuesBody && (
                <p className="text-base text-neutral-400 leading-relaxed font-normal">
                  {finalValuesBody}
                </p>
              )}
            </div>

            <div className="grid gap-8 sm:gap-10 md:grid-cols-3">
              {columns.map((section) => (
                <div
                  key={section.title}
                  className="flex flex-col gap-3 border-t border-neutral-800 pt-6 group"
                >
                  <h4 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {section.title}
                  </h4>
                  <p className="text-sm sm:text-[15px] text-neutral-400 leading-relaxed">
                    {truncate(section.content)}
                  </p>
                </div>
              ))}
            </div>

            {/* Clean Minimalist CTA Button */}
            {ctaText && ctaHref && (
              <div className="pt-6 flex items-center justify-between flex-wrap gap-4 border-t border-neutral-900">
                <Link
                  href={ctaHref}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-black font-bold text-sm hover:bg-neutral-200 transition-all shadow-xl hover:scale-105"
                >
                  <span>{ctaText}</span>
                  <span>↗</span>
                </Link>

                <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
                  &copy; 2026 Ditjen Binalavotas &bull; Kemnaker RI
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

export default About29;
