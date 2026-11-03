import React, { useMemo, useState } from 'react';
import { Search, X, Bookmark, Sparkles } from 'lucide-react';
import {
  ALL_SURAHS,
  QUICK_SURAHS,
  SurahMeta,
  BookmarkRecord,
  toArabicDigits,
  normalizeArabicSearch,
} from '../data/quranData';
import { RubElHizbBadge } from './IslamicOrnaments';

interface SurahSidebarProps {
  currentSurahNumber: number;
  onSelectSurah: (surahNumber: number) => void;
  primaryBookmark: BookmarkRecord | null;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const SurahSidebar: React.FC<SurahSidebarProps> = ({
  currentSurahNumber,
  onSelectSurah,
  primaryBookmark,
  isOpenMobile,
  onCloseMobile,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'Meccan' | 'Medinan'>('all');

  const filteredSurahs = useMemo(() => {
    const cleanQuery = normalizeArabicSearch(searchQuery);
    return ALL_SURAHS.filter((surah) => {
      if (filterType !== 'all' && surah.revelationType !== filterType) {
        return false;
      }
      if (!cleanQuery) return true;
      const normalizedName = normalizeArabicSearch(surah.name);
      const matchesArabicName = normalizedName.includes(cleanQuery);
      const matchesNumber =
        String(surah.number) === cleanQuery ||
        toArabicDigits(surah.number) === cleanQuery;
      const matchesEnglish = surah.englishName.toLowerCase().includes(cleanQuery);
      return matchesArabicName || matchesNumber || matchesEnglish;
    });
  }, [searchQuery, filterType]);

  const sidebarContent = (
    <div
      className="flex flex-col h-full rounded-2xl border overflow-hidden"
      style={{
        backgroundColor: 'var(--bg-elevated)',
        borderColor: 'var(--border-gold)',
      }}
    >
      {/* Top Search & Filter Header */}
      <div
        className="p-3.5 border-b space-y-3"
        style={{
          backgroundColor: 'var(--bg-primary)',
          borderColor: 'var(--border-gold)',
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C59B27]" />
            <h2 className="font-amiri font-bold text-lg">فهرس سور القرآن الكريم</h2>
          </div>
          <span
            className="text-xs px-2 py-0.5 rounded-full font-semibold"
            style={{
              backgroundColor: 'var(--accent-gold-soft)',
              color: 'var(--accent-emerald)',
            }}
          >
            {toArabicDigits(filteredSurahs.length)} سورة
          </span>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search
            className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: 'var(--text-muted)' }}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث باسم السورة أو رقمها (مثال: الكهف، ٣٦)..."
            className="w-full pr-9 pl-8 py-2 rounded-xl text-xs sm:text-sm border outline-none transition-colors focus:border-[#C59B27]"
            style={{
              backgroundColor: 'var(--bg-elevated)',
              borderColor: 'var(--border-gold)',
              color: 'var(--text-primary)',
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-black/10 cursor-pointer"
              aria-label="مسح البحث"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Tabs: All / Meccan / Medinan */}
        <div
          className="grid grid-cols-3 gap-1 p-1 rounded-xl border text-xs font-bold"
          style={{
            backgroundColor: 'var(--bg-elevated)',
            borderColor: 'var(--border-gold)',
          }}
        >
          <button
            onClick={() => setFilterType('all')}
            className="py-1.5 rounded-lg transition-all cursor-pointer"
            style={{
              backgroundColor: filterType === 'all' ? 'var(--accent-emerald)' : 'transparent',
              color: filterType === 'all' ? '#FBF8F1' : 'var(--text-secondary)',
            }}
          >
            الكل ({toArabicDigits(114)})
          </button>
          <button
            onClick={() => setFilterType('Meccan')}
            className="py-1.5 rounded-lg transition-all cursor-pointer"
            style={{
              backgroundColor: filterType === 'Meccan' ? 'var(--accent-emerald)' : 'transparent',
              color: filterType === 'Meccan' ? '#FBF8F1' : 'var(--text-secondary)',
            }}
          >
            مكية ({toArabicDigits(86)})
          </button>
          <button
            onClick={() => setFilterType('Medinan')}
            className="py-1.5 rounded-lg transition-all cursor-pointer"
            style={{
              backgroundColor: filterType === 'Medinan' ? 'var(--accent-emerald)' : 'transparent',
              color: filterType === 'Medinan' ? '#FBF8F1' : 'var(--text-secondary)',
            }}
          >
            مدنية ({toArabicDigits(28)})
          </button>
        </div>

        {/* Quick-Access Popular Surahs */}
        <div>
          <div className="text-[11px] font-semibold mb-1.5" style={{ color: 'var(--text-muted)' }}>
            وصول سريع للسور الأكثر قراءة:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {QUICK_SURAHS.map((q) => {
              const isCurrent = currentSurahNumber === q.number;
              return (
                <button
                  key={q.number}
                  onClick={() => {
                    onSelectSurah(q.number);
                    onCloseMobile();
                  }}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer"
                  style={{
                    backgroundColor: isCurrent ? 'var(--accent-emerald)' : 'var(--bg-primary)',
                    borderColor: isCurrent ? 'var(--accent-gold)' : 'var(--border-gold)',
                    color: isCurrent ? '#FBF8F1' : 'var(--text-primary)',
                  }}
                >
                  {q.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scrollable 114 Surahs List */}
      <div className="flex-1 overflow-y-auto p-2.5 space-y-1.5">
        {filteredSurahs.length > 0 ? (
          filteredSurahs.map((surah: SurahMeta) => {
            const isSelected = surah.number === currentSurahNumber;
            const hasPrimaryBookmark = primaryBookmark?.surahNumber === surah.number;

            return (
              <button
                key={surah.number}
                onClick={() => {
                  onSelectSurah(surah.number);
                  onCloseMobile();
                }}
                className="group w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl border text-right transition-all cursor-pointer"
                style={{
                  backgroundColor: isSelected ? 'var(--accent-gold-soft)' : 'var(--bg-primary)',
                  borderColor: isSelected ? 'var(--accent-gold)' : 'transparent',
                }}
              >
                {/* 1. Rub el Hizb Badge + 2. Surah Arabic Name */}
                <div className="flex items-center gap-3 min-w-0">
                  <RubElHizbBadge number={surah.number} active={isSelected} size="md" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="font-amiri font-bold text-base sm:text-lg truncate"
                        style={{
                          color: isSelected ? 'var(--accent-emerald)' : 'var(--text-primary)',
                        }}
                      >
                        سورة {surah.name}
                      </span>
                      {hasPrimaryBookmark && (
                        <span
                          className="inline-flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded-full text-white font-cairo font-bold"
                          style={{ backgroundColor: 'var(--accent-ruby)' }}
                          title={`الفاصلة المحفوظة هنا عند الآية ${toArabicDigits(primaryBookmark.ayahNumber)}`}
                        >
                          <Bookmark className="w-2.5 h-2.5 fill-current" />
                          <span>آية {toArabicDigits(primaryBookmark.ayahNumber)}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* 3. Revelation Type & Verse Count Badge */}
                <span
                  className="shrink-0 text-xs px-2.5 py-1 rounded-lg border font-medium"
                  style={{
                    backgroundColor: 'var(--bg-elevated)',
                    borderColor: 'var(--border-gold)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {surah.revelationArabic} • {toArabicDigits(surah.numberOfAyahs)} آية
                </span>
              </button>
            );
          })
        ) : (
          <div className="py-12 text-center text-sm" style={{ color: 'var(--text-muted)' }}>
            لا توجد سورة مطابقة للبحث «{searchQuery}»
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:block w-[320px] shrink-0">
        <div className="sticky top-[80px] h-[calc(100vh-168px)]">{sidebarContent}</div>
      </aside>

      {/* Mobile / Tablet Slide-over Drawer */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-50 lg:hidden flex bg-black/60 backdrop-blur-xs"
          onClick={onCloseMobile}
        >
          <div
            className="w-[88%] max-w-[350px] h-full p-2.5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-full">
              <button
                onClick={onCloseMobile}
                className="absolute left-5 top-5 z-10 p-1.5 rounded-lg border"
                style={{
                  backgroundColor: 'var(--bg-elevated)',
                  borderColor: 'var(--border-gold)',
                }}
                aria-label="إغلاق الفهرس"
              >
                <X className="w-4 h-4" />
              </button>
              {sidebarContent}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
