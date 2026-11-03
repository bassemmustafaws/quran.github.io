import React from 'react';
import { X, Volume2, Check, Play, Radio } from 'lucide-react';
import { FAMOUS_RECITERS, Reciter } from '../data/quranData';

interface RecitersModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedReciter: Reciter;
  onSelectReciter: (reciter: Reciter, autoPlay?: boolean) => void;
  isPlaying: boolean;
}

export const RecitersModal: React.FC<RecitersModalProps> = ({
  isOpen,
  onClose,
  selectedReciter,
  onSelectReciter,
  isPlaying,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto rounded-2xl border p-5 sm:p-7 shadow-2xl"
        style={{
          backgroundColor: 'var(--bg-primary)',
          borderColor: 'var(--accent-gold)',
          color: 'var(--text-primary)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-start justify-between gap-4 pb-4 border-b"
          style={{ borderColor: 'var(--border-gold)' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border"
              style={{
                backgroundColor: 'var(--accent-emerald)',
                borderColor: 'var(--accent-gold)',
                color: '#FBF8F1',
              }}
            >
              <Volume2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold font-amiri">
                أشهر قراء القرآن الكريم في العالم الإسلامي
              </h2>
              <p className="text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>
                اختر القارئ المفضل لديك للاستماع إلى الآيات متزامنة مع التتبع التلقائي في المصحف
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-black/5 transition-colors cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Reciters Grid */}
        <div className="my-5 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {FAMOUS_RECITERS.map((reciter) => {
            const isSelected = reciter.id === selectedReciter.id;

            return (
              <div
                key={reciter.id}
                onClick={() => {
                  onSelectReciter(reciter, false);
                }}
                className="group relative flex items-center justify-between gap-3.5 p-4 rounded-xl border transition-all cursor-pointer"
                style={{
                  backgroundColor: isSelected ? 'var(--accent-gold-soft)' : 'var(--bg-elevated)',
                  borderColor: isSelected ? 'var(--accent-gold)' : 'var(--border-gold)',
                  boxShadow: isSelected ? '0 6px 20px -6px rgba(197, 155, 39, 0.25)' : 'none',
                }}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  {/* Calligraphic Monogram Rosette */}
                  <div className="relative w-13 h-13 shrink-0 flex items-center justify-center">
                    <svg viewBox="0 0 52 52" className="w-full h-full" fill="none">
                      <rect
                        x="9"
                        y="9"
                        width="34"
                        height="34"
                        rx="4"
                        fill={isSelected ? 'var(--accent-emerald)' : 'var(--bg-primary)'}
                        stroke="var(--accent-gold)"
                        strokeWidth="1.6"
                      />
                      <rect
                        x="9"
                        y="9"
                        width="34"
                        height="34"
                        rx="4"
                        transform="rotate(45 26 26)"
                        fill={isSelected ? 'var(--accent-emerald)' : 'var(--bg-primary)'}
                        stroke="var(--accent-gold)"
                        strokeWidth="1.6"
                      />
                    </svg>
                    <span
                      className="absolute inset-0 flex items-center justify-center font-amiri font-bold text-base"
                      style={{
                        color: isSelected ? '#FBF8F1' : 'var(--accent-emerald)',
                      }}
                    >
                      {reciter.monogram}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm sm:text-base truncate">
                        الشيخ {reciter.name}
                      </h3>
                      {isSelected && (
                        <span
                          className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full font-bold"
                          style={{
                            backgroundColor: 'var(--accent-emerald)',
                            color: '#FBF8F1',
                          }}
                        >
                          {isPlaying ? (
                            <>
                              <Radio className="w-3 h-3 animate-pulse" />
                              <span>يتلو الآن</span>
                            </>
                          ) : (
                            <>
                              <Check className="w-3 h-3" />
                              <span>مختار</span>
                            </>
                          )}
                        </span>
                      )}
                    </div>
                    <p
                      className="text-xs truncate mt-0.5"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {reciter.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span
                        className="text-[11px] px-2 py-0.5 rounded-md border"
                        style={{
                          borderColor: 'var(--border-gold)',
                          backgroundColor: 'var(--bg-primary)',
                          color: 'var(--text-muted)',
                        }}
                      >
                        {reciter.style}
                      </span>
                      <span
                        className="text-[11px]"
                        style={{ color: 'var(--accent-gold)' }}
                      >
                        • {reciter.country}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Instant Play Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectReciter(reciter, true);
                    onClose();
                  }}
                  className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center border transition-transform hover:scale-105 cursor-pointer"
                  style={{
                    backgroundColor: 'var(--accent-emerald)',
                    borderColor: 'var(--accent-gold)',
                    color: '#FBF8F1',
                  }}
                  title={`استماع بصوت الشيخ ${reciter.name}`}
                >
                  <Play className="w-4 h-4 fill-current" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between pt-3 border-t text-xs"
          style={{ borderColor: 'var(--border-gold)', color: 'var(--text-secondary)' }}
        >
          <span>رواية حفص عن عاصم • بث صوتي عالي النقاء (MP3 128kbps)</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg font-bold border cursor-pointer"
            style={{
              backgroundColor: 'var(--bg-elevated)',
              borderColor: 'var(--border-gold)',
              color: 'var(--text-primary)',
            }}
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
