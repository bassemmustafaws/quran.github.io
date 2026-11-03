import React from 'react';
import { toArabicDigits } from '../data/quranData';

export const RubElHizbBadge: React.FC<{
  number: number;
  active?: boolean;
  size?: 'sm' | 'md' | 'lg';
}> = ({ number, active = false, size = 'md' }) => {
  const dimensions = size === 'sm' ? 'w-8 h-8 text-xs' : size === 'lg' ? 'w-12 h-12 text-base' : 'w-10 h-10 text-sm';

  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 select-none ${dimensions}`}>
      <svg
        viewBox="0 0 48 48"
        className="w-full h-full transition-transform duration-300 group-hover:scale-105"
        fill="none"
      >
        {/* First Square */}
        <rect
          x="10"
          y="10"
          width="28"
          height="28"
          rx="2"
          fill={active ? 'var(--accent-emerald)' : 'var(--accent-gold-soft)'}
          stroke={active ? 'var(--accent-gold)' : 'var(--accent-gold)'}
          strokeWidth="1.6"
        />
        {/* Rotated 45deg Square */}
        <rect
          x="10"
          y="10"
          width="28"
          height="28"
          rx="2"
          transform="rotate(45 24 24)"
          fill={active ? 'var(--accent-emerald)' : 'var(--bg-primary)'}
          stroke={active ? 'var(--accent-gold)' : 'var(--accent-gold)'}
          strokeWidth="1.6"
        />
        {/* Inner Circle */}
        <circle
          cx="24"
          cy="24"
          r="11.5"
          fill={active ? 'var(--accent-emerald)' : 'var(--bg-primary)'}
          stroke="var(--accent-gold)"
          strokeWidth="1"
          strokeOpacity="0.7"
        />
      </svg>
      <span
        className={`absolute inset-0 flex items-center justify-center font-bold font-amiri pt-0.5 ${
          active ? 'text-[#FBF8F1]' : 'text-[var(--text-primary)]'
        }`}
      >
        {toArabicDigits(number)}
      </span>
    </div>
  );
};

export const AyahRosetteMarker: React.FC<{
  number: number;
  isPlaying?: boolean;
  isBookmarked?: boolean;
  hasSajda?: boolean;
}> = ({ number, isPlaying = false, isBookmarked = false, hasSajda = false }) => {
  return (
    <span
      className="inline-flex items-center justify-center mx-1.5 align-middle select-none relative"
      style={{ width: '1.45em', height: '1.45em' }}
      title={
        isBookmarked
          ? `الآية ${toArabicDigits(number)} (محفوظة في الفاصلة)`
          : `الآية ${toArabicDigits(number)}`
      }
    >
      <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
        {/* Outer 8-pointed floral rosette */}
        <path
          d="M20 2L24.5 7.2L31.3 6.7L33.3 13.3L38 18L34.8 24L36 30.8L29.5 33.5L25.5 38.5L20 35.8L14.5 38.5L10.5 33.5L4 30.8L5.2 24L2 18L6.7 13.3L8.7 6.7L15.5 7.2L20 2Z"
          fill={
            isBookmarked
              ? 'rgba(184, 51, 42, 0.16)'
              : isPlaying
              ? 'rgba(197, 155, 39, 0.28)'
              : 'rgba(197, 155, 39, 0.10)'
          }
          stroke={
            isBookmarked
              ? 'var(--accent-ruby)'
              : isPlaying
              ? 'var(--accent-emerald)'
              : 'var(--accent-gold)'
          }
          strokeWidth={isBookmarked || isPlaying ? '2.2' : '1.5'}
        />
        <circle
          cx="20"
          cy="20"
          r="12.5"
          stroke={isBookmarked ? 'var(--accent-ruby)' : 'var(--accent-gold)'}
          strokeWidth="0.9"
          strokeDasharray="2 1.5"
        />
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center font-amiri font-bold leading-none"
        style={{
          fontSize: '0.52em',
          color: isBookmarked
            ? 'var(--accent-ruby)'
            : isPlaying
            ? 'var(--accent-emerald)'
            : 'var(--text-primary)',
          paddingTop: '1px',
        }}
      >
        {toArabicDigits(number)}
      </span>
      {hasSajda && (
        <span
          className="absolute -top-2 -left-1 text-[10px] px-1 rounded bg-[#0D5C46] text-white font-cairo"
          title="موضع سجدة تلاوة"
        >
          سجدة
        </span>
      )}
    </span>
  );
};

export const MushafCornerOrnament: React.FC<{
  position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}> = ({ position }) => {
  const rotation =
    position === 'top-right'
      ? 'top-2 right-2 rotate-0'
      : position === 'top-left'
      ? 'top-2 left-2 -scale-x-100'
      : position === 'bottom-right'
      ? 'bottom-2 right-2 -scale-y-100'
      : 'bottom-2 left-2 -scale-x-100 -scale-y-100';

  return (
    <svg
      viewBox="0 0 48 48"
      className={`w-9 h-9 sm:w-11 sm:h-11 absolute pointer-events-none opacity-65 ${rotation}`}
      fill="none"
    >
      <path
        d="M2 2H26C16 2 10 8 10 18C10 10 16 6 24 6H38L44 2H2Z"
        fill="var(--accent-gold)"
        fillOpacity="0.25"
      />
      <path
        d="M2 2V26C2 16 8 10 18 10C10 10 6 16 6 24V38L2 44V2Z"
        fill="var(--accent-gold)"
        fillOpacity="0.25"
      />
      <path
        d="M2 2H32M2 2V32M6 6H22M6 6V22"
        stroke="var(--accent-gold)"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <circle cx="10" cy="10" r="2.5" fill="var(--accent-gold)" />
    </svg>
  );
};

export const BasmalahBanner: React.FC = () => {
  return (
    <div className="my-5 sm:my-7 flex items-center justify-center gap-3 sm:gap-5 select-none">
      <svg viewBox="0 0 90 20" className="w-16 sm:w-24 h-5 shrink-0 opacity-75" fill="none">
        <path
          d="M88 10H18M18 10L10 4L2 10L10 16L18 10Z"
          stroke="var(--accent-gold)"
          strokeWidth="1.3"
        />
        <circle cx="10" cy="10" r="2.5" fill="var(--accent-gold)" />
        <circle cx="32" cy="10" r="1.8" fill="var(--accent-emerald)" />
      </svg>

      <div
        className="font-quran text-2xl sm:text-3xl md:text-4xl text-center tracking-wide px-2"
        style={{ color: 'var(--accent-emerald)' }}
      >
        بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
      </div>

      <svg viewBox="0 0 90 20" className="w-16 sm:w-24 h-5 shrink-0 opacity-75 -scale-x-100" fill="none">
        <path
          d="M88 10H18M18 10L10 4L2 10L10 16L18 10Z"
          stroke="var(--accent-gold)"
          strokeWidth="1.3"
        />
        <circle cx="10" cy="10" r="2.5" fill="var(--accent-gold)" />
        <circle cx="32" cy="10" r="1.8" fill="var(--accent-emerald)" />
      </svg>
    </div>
  );
};
