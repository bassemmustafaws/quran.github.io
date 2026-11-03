import React from 'react';
import { Volume2, Radio, Sparkles } from 'lucide-react';
import { FAMOUS_RECITERS, Reciter } from '../data/quranData';

interface RecitersQuickStripProps {
  selectedReciter: Reciter;
  onSelectReciter: (reciter: Reciter, autoPlay?: boolean) => void;
  isPlaying: boolean;
  onOpenAllModal: () => void;
}

export const RecitersQuickStrip: React.FC<RecitersQuickStripProps> = ({
  selectedReciter,
  onSelectReciter,
  isPlaying,
  onOpenAllModal,
}) => {
  return (
    <div
      className="mb-5 p-3.5 sm:p-4 rounded-2xl border mx-auto max-w-[850px]"
      style={{
        backgroundColor: 'var(--bg-elevated)',
        borderColor: 'var(--border-gold)',
      }}
    >
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-[#0D5C46]" />
          <h2 className="text-xs sm:text-sm font-bold">
            تلاوات أشهر القراء <span className="font-normal opacity-80">(اختر القارئ للاستماع الفوري):</span>
          </h2>
        </div>

        <button
          onClick={onOpenAllModal}
          className="text-xs font-bold flex items-center gap-1 hover:underline cursor-pointer"
          style={{ color: 'var(--accent-emerald)' }}
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
          <span>عرض بطاقات القراء</span>
        </button>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {FAMOUS_RECITERS.map((reciter) => {
          const isSelected = reciter.id === selectedReciter.id;

          return (
            <button
              key={reciter.id}
              onClick={() => onSelectReciter(reciter, true)}
              className="group shrink-0 flex items-center gap-2.5 px-3 py-2 rounded-xl border transition-all cursor-pointer"
              style={{
                backgroundColor: isSelected ? 'var(--accent-emerald)' : 'var(--bg-primary)',
                borderColor: isSelected ? 'var(--accent-gold)' : 'var(--border-gold)',
                color: isSelected ? '#FBF8F1' : 'var(--text-primary)',
              }}
            >
              <span
                className="w-7 h-7 rounded-lg flex items-center justify-center font-amiri font-bold text-xs border shrink-0"
                style={{
                  backgroundColor: isSelected ? 'rgba(255,255,255,0.14)' : 'var(--accent-gold-soft)',
                  borderColor: 'var(--accent-gold)',
                  color: isSelected ? '#FBF8F1' : 'var(--accent-emerald)',
                }}
              >
                {reciter.monogram}
              </span>

              <div className="text-right">
                <div className="text-xs font-bold whitespace-nowrap flex items-center gap-1.5">
                  <span>{reciter.shortName}</span>
                  {isSelected && isPlaying && (
                    <Radio className="w-3 h-3 text-[#D9B146] animate-pulse" />
                  )}
                </div>
                <div
                  className="text-[10px] whitespace-nowrap"
                  style={{
                    color: isSelected ? 'rgba(251, 248, 241, 0.8)' : 'var(--text-muted)',
                  }}
                >
                  {reciter.country} • مرتل
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
