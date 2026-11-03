import React, { useEffect, useState } from 'react';
import {
  Play,
  Pause,
  Bookmark,
  BookmarkCheck,
  Copy,
  Check,
  BookOpen,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Star,
  Volume2,
  AlignJustify,
  List,
  Search,
} from 'lucide-react';
import {
  SurahMeta,
  AyahData,
  Reciter,
  BookmarkRecord,
  ALL_SURAHS,
  toArabicDigits,
  cleanAyahText,
  normalizeArabicSearch,
} from '../data/quranData';
import {
  AyahRosetteMarker,
  BasmalahBanner,
  MushafCornerOrnament,
  RubElHizbBadge,
} from './IslamicOrnaments';

interface MushafReaderProps {
  surah: SurahMeta;
  ayahs: AyahData[];
  isLoading: boolean;
  fontSize: number;
  viewMode: 'mushaf' | 'list';
  onToggleViewMode: (mode: 'mushaf' | 'list') => void;
  playingAyahNumber: number | null;
  isPlaying: boolean;
  selectedReciter: Reciter;
  primaryBookmark: BookmarkRecord | null;
  savedBookmarks: BookmarkRecord[];
  highlightedAyah: number | null;
  onPlayAyah: (ayahInSurah: number) => void;
  onPauseAudio: () => void;
  onSetPrimaryBookmark: (ayah: AyahData) => void;
  onToggleSavedBookmark: (ayah: AyahData) => void;
  onSelectSurah: (surahNumber: number) => void;
  onOpenRecitersModal: () => void;
}

export const MushafReader: React.FC<MushafReaderProps> = ({
  surah,
  ayahs,
  isLoading,
  fontSize,
  viewMode,
  onToggleViewMode,
  playingAyahNumber,
  isPlaying,
  selectedReciter,
  primaryBookmark,
  savedBookmarks,
  highlightedAyah,
  onPlayAyah,
  onPauseAudio,
  onSetPrimaryBookmark,
  onToggleSavedBookmark,
  onSelectSurah,
  onOpenRecitersModal,
}) => {
  const [selectedAyahNum, setSelectedAyahNum] = useState<number | null>(null);
  const [copiedAyahNum, setCopiedAyahNum] = useState<number | null>(null);
  const [tafsirAyahNum, setTafsirAyahNum] = useState<number | null>(null);
  const [tafsirText, setTafsirText] = useState<string>('');
  const [tafsirLoading, setTafsirLoading] = useState<boolean>(false);
  const [verseFilter, setVerseFilter] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Reset selected ayah when surah changes
  useEffect(() => {
    setSelectedAyahNum(null);
    setTafsirAyahNum(null);
    setTafsirText('');
    setVerseFilter('');
  }, [surah.number]);

  // Auto-scroll to currently playing ayah
  useEffect(() => {
    if (playingAyahNumber) {
      const el = document.getElementById(`ayah-${surah.number}-${playingAyahNumber}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [playingAyahNumber, surah.number]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const handleCopyAyah = (ayah: AyahData) => {
    const cleaned = cleanAyahText(ayah.text, surah.number, ayah.numberInSurah);
    const formatted = `﴿ ${cleaned} ﴾ [سورة ${surah.name}: الآية ${toArabicDigits(ayah.numberInSurah)}]`;
    navigator.clipboard?.writeText(formatted).catch(() => {});
    setCopiedAyahNum(ayah.numberInSurah);
    showToast(`تم نسخ الآية ${toArabicDigits(ayah.numberInSurah)} من سورة ${surah.name}`);
    setTimeout(() => setCopiedAyahNum(null), 2000);
  };

  const handleFetchTafsir = async (ayahInSurah: number) => {
    if (tafsirAyahNum === ayahInSurah && tafsirText) {
      setTafsirAyahNum(null);
      return;
    }
    setTafsirAyahNum(ayahInSurah);
    setTafsirLoading(true);
    setTafsirText('');
    try {
      const res = await fetch(
        `https://api.alquran.cloud/v1/ayah/${surah.number}:${ayahInSurah}/ar.muyassar`
      );
      const data = await res.json();
      if (data?.data?.text) {
        setTafsirText(data.data.text);
      } else {
        setTafsirText('تعذر جلب التفسير حالياً، يرجى المحاولة مرة أخرى.');
      }
    } catch {
      setTafsirText('تعذر الاتصال بخادم التفسير الميسر.');
    } finally {
      setTafsirLoading(false);
    }
  };

  const handleJumpToAyahSelect = (ayahNum: number) => {
    if (!ayahNum) return;
    setSelectedAyahNum(ayahNum);
    const el = document.getElementById(`ayah-${surah.number}-${ayahNum}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const selectedAyahObj = ayahs.find((a) => a.numberInSurah === selectedAyahNum) || null;
  const prevSurah = surah.number > 1 ? ALL_SURAHS[surah.number - 2] : null;
  const nextSurah = surah.number < 114 ? ALL_SURAHS[surah.number] : null;

  const filteredAyahs = verseFilter.trim()
    ? ayahs.filter((a) => {
        const q = normalizeArabicSearch(verseFilter);
        return (
          normalizeArabicSearch(a.text).includes(q) ||
          String(a.numberInSurah) === q ||
          toArabicDigits(a.numberInSurah) === q
        );
      })
    : ayahs;

  return (
    <div className="flex-1 min-w-0 pb-28">
      {/* Floating Toast Notification for Bookmark / Copy Confirmation */}
      {toastMessage && (
        <div
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-5 py-3 rounded-full shadow-xl border text-xs sm:text-sm font-bold animate-bounce"
          style={{
            backgroundColor: 'var(--accent-emerald)',
            borderColor: 'var(--accent-gold)',
            color: '#FBF8F1',
          }}
        >
          <BookmarkCheck className="w-4 h-4 text-[#D9B146]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Illuminated Mushaf Page Container */}
      <div className="mushaf-frame rounded-3xl p-4 sm:p-8 md:p-11 mx-auto max-w-[850px] transition-all">
        {/* 4 Mamluk Corner Ornaments */}
        <MushafCornerOrnament position="top-right" />
        <MushafCornerOrnament position="top-left" />
        <MushafCornerOrnament position="bottom-right" />
        <MushafCornerOrnament position="bottom-left" />

        {/* Top Mushaf Page Metadata Bar (Juz, Surah, Page) */}
        <div
          className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-5 border-b text-xs sm:text-sm font-amiri"
          style={{
            borderColor: 'var(--border-gold)',
            color: 'var(--text-secondary)',
          }}
        >
          <div className="flex items-center gap-2">
            <span className="font-bold" style={{ color: 'var(--accent-emerald)' }}>
              الجزء {toArabicDigits(ayahs[0]?.juz || surah.juz)}
            </span>
            <span>•</span>
            <span>ترتيبها في المصحف: {toArabicDigits(surah.number)}</span>
          </div>

          <div className="flex items-center gap-2">
            <span>سورة {surah.name}</span>
            <span>•</span>
            <span className="font-bold" style={{ color: 'var(--accent-gold)' }}>
              صفحة {toArabicDigits(ayahs[0]?.page || surah.page)}
            </span>
          </div>
        </div>

        {/* Ornate Illuminated Surah Header Banner */}
        <div
          className="relative rounded-2xl border-2 p-5 sm:p-7 mb-6 overflow-hidden islamic-pattern-bg"
          style={{
            backgroundColor: 'var(--bg-elevated)',
            borderColor: 'var(--accent-gold)',
          }}
        >
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="flex items-center gap-3 mb-2">
              <RubElHizbBadge number={surah.number} active size="md" />
              <h1
                className="font-amiri font-bold text-3xl sm:text-4xl md:text-5xl tracking-wide"
                style={{ color: 'var(--accent-emerald)' }}
              >
                {surah.calligraphicName}
              </h1>
              <RubElHizbBadge number={surah.number} active size="md" />
            </div>

            <div
              className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm mt-1 font-medium"
              style={{ color: 'var(--text-secondary)' }}
            >
              <span
                className="px-3 py-0.5 rounded-full border"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  borderColor: 'var(--border-gold)',
                }}
              >
                سورة {surah.revelationArabic}
              </span>
              <span
                className="px-3 py-0.5 rounded-full border"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  borderColor: 'var(--border-gold)',
                }}
              >
                عدد آياتها: {toArabicDigits(surah.numberOfAyahs)} آية
              </span>
              <span
                className="px-3 py-0.5 rounded-full border"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  borderColor: 'var(--border-gold)',
                }}
              >
                الجزء {toArabicDigits(surah.juz)}
              </span>
            </div>

            {/* Quick Surah Actions Bar */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
              {/* Play / Pause Surah with current reciter */}
              <button
                onClick={() => {
                  if (isPlaying) {
                    onPauseAudio();
                  } else {
                    onPlayAyah(playingAyahNumber || 1);
                  }
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white shadow-md transition-transform active:scale-95 cursor-pointer"
                style={{
                  backgroundColor: 'var(--accent-emerald)',
                  border: '1px solid var(--accent-gold)',
                }}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 fill-current" />
                    <span>إيقاف التلاوة مؤقتاً</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>تلاوة السورة بصوت {selectedReciter.shortName}</span>
                  </>
                )}
              </button>

              {/* Change Reciter Button */}
              <button
                onClick={onOpenRecitersModal}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-colors cursor-pointer"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  borderColor: 'var(--border-gold)',
                  color: 'var(--text-primary)',
                }}
              >
                <Volume2 className="w-4 h-4 text-[#C59B27]" />
                <span>تغيير القارئ</span>
              </button>

              {/* Save Bookmark at current or first Ayah */}
              {ayahs.length > 0 && (
                <button
                  onClick={() => {
                    const target = selectedAyahObj || ayahs[0];
                    onSetPrimaryBookmark(target);
                    showToast(
                      `تم حفظ فاصلة القراءة عند سورة ${surah.name} - الآية ${toArabicDigits(
                        target.numberInSurah
                      )}`
                    );
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-colors cursor-pointer"
                  style={{
                    backgroundColor:
                      primaryBookmark?.surahNumber === surah.number
                        ? 'rgba(184, 51, 42, 0.12)'
                        : 'var(--bg-primary)',
                    borderColor:
                      primaryBookmark?.surahNumber === surah.number
                        ? 'var(--accent-ruby)'
                        : 'var(--border-gold)',
                    color:
                      primaryBookmark?.surahNumber === surah.number
                        ? 'var(--accent-ruby)'
                        : 'var(--text-primary)',
                  }}
                >
                  <Bookmark className="w-4 h-4 fill-current" />
                  <span>
                    {primaryBookmark?.surahNumber === surah.number
                      ? `الفاصلة عند آية ${toArabicDigits(primaryBookmark.ayahNumber)}`
                      : 'حفظ الفاصلة هنا'}
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Secondary Utility Bar: Jump to Ayah, Search in Surah, Toggle Mushaf/List View */}
        <div
          className="flex flex-wrap items-center justify-between gap-2.5 p-3 rounded-xl border mb-6 text-xs"
          style={{
            backgroundColor: 'var(--bg-elevated)',
            borderColor: 'var(--border-gold)',
          }}
        >
          <div className="flex flex-wrap items-center gap-2 flex-1 min-w-[220px]">
            {/* Jump to specific Ayah dropdown */}
            <select
              value={selectedAyahNum || ''}
              onChange={(e) => handleJumpToAyahSelect(Number(e.target.value))}
              aria-label="الانتقال إلى آية"
              className="px-2.5 py-1.5 rounded-lg border font-semibold outline-none cursor-pointer"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-gold)',
                color: 'var(--text-primary)',
              }}
            >
              <option value="">انتقل إلى آية...</option>
              {ayahs.map((a) => (
                <option key={a.numberInSurah} value={a.numberInSurah}>
                  الآية {toArabicDigits(a.numberInSurah)}
                </option>
              ))}
            </select>

            {/* Search within current Surah */}
            <div className="relative flex-1 max-w-xs">
              <Search
                className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: 'var(--text-muted)' }}
              />
              <input
                type="text"
                value={verseFilter}
                onChange={(e) => setVerseFilter(e.target.value)}
                placeholder={`ابحث في آيات سورة ${surah.name}...`}
                className="w-full pr-8 pl-3 py-1.5 rounded-lg border outline-none"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  borderColor: 'var(--border-gold)',
                  color: 'var(--text-primary)',
                }}
              />
            </div>
          </div>

          {/* Reading Mode Toggle: Flowing Mushaf vs Detailed Cards */}
          <div className="flex items-center gap-1 p-1 rounded-lg border" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-gold)' }}>
            <button
              onClick={() => onToggleViewMode('mushaf')}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md font-bold transition-colors cursor-pointer"
              style={{
                backgroundColor: viewMode === 'mushaf' ? 'var(--accent-emerald)' : 'transparent',
                color: viewMode === 'mushaf' ? '#FBF8F1' : 'var(--text-secondary)',
              }}
            >
              <AlignJustify className="w-3.5 h-3.5" />
              <span>المصحف المتصل</span>
            </button>
            <button
              onClick={() => onToggleViewMode('list')}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md font-bold transition-colors cursor-pointer"
              style={{
                backgroundColor: viewMode === 'list' ? 'var(--accent-emerald)' : 'transparent',
                color: viewMode === 'list' ? '#FBF8F1' : 'var(--text-secondary)',
              }}
            >
              <List className="w-3.5 h-3.5" />
              <span>آية بآية</span>
            </button>
          </div>
        </div>

        {/* Helpful Hint + Selected Ayah Interactive Toolbar */}
        {selectedAyahObj ? (
          <div
            className="sticky top-[70px] z-30 mb-6 p-3 sm:p-4 rounded-2xl border-2 shadow-lg transition-all"
            style={{
              backgroundColor: 'var(--bg-glass)',
              backdropFilter: 'blur(14px)',
              borderColor: 'var(--accent-gold)',
            }}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span
                  className="px-2.5 py-1 rounded-lg text-xs font-bold text-white"
                  style={{ backgroundColor: 'var(--accent-emerald)' }}
                >
                  الآية {toArabicDigits(selectedAyahObj.numberInSurah)} من سورة {surah.name}
                </span>
                <span className="text-xs hidden sm:inline" style={{ color: 'var(--text-secondary)' }}>
                  الجزء {toArabicDigits(selectedAyahObj.juz)} • صفحة {toArabicDigits(selectedAyahObj.page)}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                {/* Play from this Ayah */}
                <button
                  onClick={() => onPlayAyah(selectedAyahObj.numberInSurah)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white cursor-pointer transition-transform active:scale-95"
                  style={{ backgroundColor: 'var(--accent-emerald)' }}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>استماع</span>
                </button>

                {/* Save Primary Bookmark Here */}
                <button
                  onClick={() => {
                    onSetPrimaryBookmark(selectedAyahObj);
                    showToast(
                      `تم حفظ مكان القراءة عند الآية ${toArabicDigits(
                        selectedAyahObj.numberInSurah
                      )} من سورة ${surah.name}`
                    );
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white cursor-pointer transition-transform active:scale-95"
                  style={{ backgroundColor: 'var(--accent-ruby)' }}
                >
                  <Bookmark className="w-3.5 h-3.5 fill-current" />
                  <span>حفظ مكان القراءة هنا</span>
                </button>

                {/* Pin to Favorites */}
                <button
                  onClick={() => {
                    onToggleSavedBookmark(selectedAyahObj);
                    showToast('تم تحديث قائمة الآيات المحفوظة');
                  }}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold border cursor-pointer"
                  style={{
                    backgroundColor: 'var(--bg-primary)',
                    borderColor: 'var(--border-gold)',
                  }}
                  title="إضافة أو إزالة من المفضلة"
                >
                  <Star
                    className={`w-3.5 h-3.5 ${
                      savedBookmarks.some(
                        (b) =>
                          b.surahNumber === surah.number &&
                          b.ayahNumber === selectedAyahObj.numberInSurah
                      )
                        ? 'fill-[#C59B27] text-[#C59B27]'
                        : ''
                    }`}
                  />
                  <span className="hidden md:inline">مفضلة</span>
                </button>

                {/* Show Tafsir Al-Muyassar */}
                <button
                  onClick={() => handleFetchTafsir(selectedAyahObj.numberInSurah)}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold border cursor-pointer"
                  style={{
                    backgroundColor:
                      tafsirAyahNum === selectedAyahObj.numberInSurah
                        ? 'var(--accent-gold-soft)'
                        : 'var(--bg-primary)',
                    borderColor: 'var(--border-gold)',
                  }}
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#0D5C46]" />
                  <span>التفسير الميسر</span>
                </button>

                {/* Copy Ayah */}
                <button
                  onClick={() => handleCopyAyah(selectedAyahObj)}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold border cursor-pointer"
                  style={{
                    backgroundColor: 'var(--bg-primary)',
                    borderColor: 'var(--border-gold)',
                  }}
                >
                  {copiedAyahNum === selectedAyahObj.numberInSurah ? (
                    <Check className="w-3.5 h-3.5 text-green-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span className="hidden sm:inline">نسخ</span>
                </button>
              </div>
            </div>

            {/* Expandable Tafsir Al-Muyassar Box */}
            {tafsirAyahNum === selectedAyahObj.numberInSurah && (
              <div
                className="mt-3 pt-3 border-t text-xs sm:text-sm leading-relaxed"
                style={{ borderColor: 'var(--border-gold)' }}
              >
                <div className="font-bold mb-1 flex items-center gap-1.5" style={{ color: 'var(--accent-emerald)' }}>
                  <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
                  <span>التفسير الميسر للآية {toArabicDigits(selectedAyahObj.numberInSurah)}:</span>
                </div>
                {tafsirLoading ? (
                  <p style={{ color: 'var(--text-muted)' }}>جاري تحميل التفسير الميسر...</p>
                ) : (
                  <p className="font-amiri text-base sm:text-lg leading-loose" style={{ color: 'var(--text-primary)' }}>
                    {tafsirText}
                  </p>
                )}
              </div>
            )}
          </div>
        ) : (
          <div
            className="mb-4 text-center text-xs py-2 px-3 rounded-xl border border-dashed"
            style={{
              borderColor: 'var(--border-gold)',
              color: 'var(--text-muted)',
            }}
          >
            💡 <strong>إرشاد القراءة:</strong> اضغط على أي آية كريمة للاستماع إليها بصوت القارئ، أو وضع{' '}
            <strong style={{ color: 'var(--accent-ruby)' }}>فاصلة حفظ مكان القراءة</strong>، أو قراءة التفسير الميسر.
          </div>
        )}

        {/* Basmalah Banner (Shown for all Surahs except Surah 1 where it's Ayah 1, and Surah 9 At-Tawbah) */}
        {surah.number !== 1 && surah.number !== 9 && !verseFilter && <BasmalahBanner />}

        {/* Verses Display Area */}
        {isLoading ? (
          <div className="py-16 space-y-5 text-center">
            <div className="w-14 h-14 mx-auto rounded-full border-2 border-[#C59B27] border-t-transparent animate-spin" />
            <p className="font-amiri text-xl" style={{ color: 'var(--text-secondary)' }}>
              جاري تحميل آيات سورة {surah.name} بالرسم العثماني...
            </p>
          </div>
        ) : viewMode === 'mushaf' ? (
          /* MODE 1: Flowing Illuminated Mushaf View */
          <div
            className="font-quran text-justify select-text px-1 sm:px-4 py-2"
            style={{
              fontSize: `${fontSize}px`,
              lineHeight: 2.38,
              wordSpacing: '0.06em',
            }}
          >
            {filteredAyahs.map((ayah) => {
              const cleanedText = cleanAyahText(ayah.text, surah.number, ayah.numberInSurah);
              const isCurrentlyPlaying = playingAyahNumber === ayah.numberInSurah;
              const isPrimaryBookmarked =
                primaryBookmark?.surahNumber === surah.number &&
                primaryBookmark?.ayahNumber === ayah.numberInSurah;
              const isSelected = selectedAyahNum === ayah.numberInSurah;
              const isJumpHighlighted = highlightedAyah === ayah.numberInSurah;

              return (
                <span
                  key={ayah.numberInSurah}
                  id={`ayah-${surah.number}-${ayah.numberInSurah}`}
                  onClick={() => {
                    setSelectedAyahNum(ayah.numberInSurah);
                  }}
                  onDoubleClick={() => {
                    onSetPrimaryBookmark(ayah);
                    onPlayAyah(ayah.numberInSurah);
                    showToast(
                      `تم حفظ الفاصلة وتشغيل الآية ${toArabicDigits(ayah.numberInSurah)} من سورة ${surah.name}`
                    );
                  }}
                  className={`ayah-span ${
                    isCurrentlyPlaying || isSelected ? 'ayah-active' : ''
                  } ${isPrimaryBookmarked ? 'ayah-bookmarked' : ''} ${
                    isJumpHighlighted ? 'ayah-jump-highlight' : ''
                  }`}
                >
                  {isPrimaryBookmarked && (
                    <span
                      className="inline-flex items-center gap-1 px-2 py-0.5 mx-1 rounded-full text-xs font-cairo font-bold align-middle text-white shadow-xs"
                      style={{ backgroundColor: 'var(--accent-ruby)' }}
                      title="موضع التوقف المحفوظ (الفاصلة)"
                    >
                      <Bookmark className="w-3 h-3 fill-current" />
                      <span>الفاصلة</span>
                    </span>
                  )}
                  <span>{cleanedText}</span>
                  <AyahRosetteMarker
                    number={ayah.numberInSurah}
                    isPlaying={isCurrentlyPlaying}
                    isBookmarked={isPrimaryBookmarked}
                    hasSajda={Boolean(ayah.sajda)}
                  />
                </span>
              );
            })}
          </div>
        ) : (
          /* MODE 2: Verse-by-Verse Study Cards View */
          <div className="space-y-4">
            {filteredAyahs.map((ayah) => {
              const cleanedText = cleanAyahText(ayah.text, surah.number, ayah.numberInSurah);
              const isCurrentlyPlaying = playingAyahNumber === ayah.numberInSurah;
              const isPrimaryBookmarked =
                primaryBookmark?.surahNumber === surah.number &&
                primaryBookmark?.ayahNumber === ayah.numberInSurah;
              const isJumpHighlighted = highlightedAyah === ayah.numberInSurah;

              return (
                <div
                  key={ayah.numberInSurah}
                  id={`ayah-${surah.number}-${ayah.numberInSurah}`}
                  className={`p-4 sm:p-6 rounded-2xl border transition-all ${
                    isJumpHighlighted ? 'ayah-jump-highlight' : ''
                  }`}
                  style={{
                    backgroundColor: isCurrentlyPlaying
                      ? 'var(--accent-gold-soft)'
                      : isPrimaryBookmarked
                      ? 'rgba(184, 51, 42, 0.06)'
                      : 'var(--bg-elevated)',
                    borderColor: isCurrentlyPlaying
                      ? 'var(--accent-gold)'
                      : isPrimaryBookmarked
                      ? 'var(--accent-ruby)'
                      : 'var(--border-gold)',
                  }}
                >
                  {/* Card Top Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b" style={{ borderColor: 'var(--border-gold)' }}>
                    <div className="flex items-center gap-2">
                      <span
                        className="px-2.5 py-0.5 rounded-lg text-xs font-bold"
                        style={{
                          backgroundColor: 'var(--bg-primary)',
                          color: 'var(--accent-emerald)',
                          border: '1px solid var(--border-gold)',
                        }}
                      >
                        الآية {toArabicDigits(ayah.numberInSurah)}
                      </span>
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        صفحة {toArabicDigits(ayah.page)} • جزء {toArabicDigits(ayah.juz)}
                      </span>
                      {isPrimaryBookmarked && (
                        <span
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold text-white"
                          style={{ backgroundColor: 'var(--accent-ruby)' }}
                        >
                          <Bookmark className="w-3 h-3 fill-current" />
                          <span>فاصلة القراءة</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onPlayAyah(ayah.numberInSurah)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold text-white cursor-pointer"
                        style={{ backgroundColor: 'var(--accent-emerald)' }}
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>استماع</span>
                      </button>

                      <button
                        onClick={() => {
                          onSetPrimaryBookmark(ayah);
                          showToast(
                            `تم حفظ الفاصلة عند الآية ${toArabicDigits(ayah.numberInSurah)} من سورة ${surah.name}`
                          );
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold border cursor-pointer"
                        style={{
                          backgroundColor: isPrimaryBookmarked
                            ? 'var(--accent-ruby)'
                            : 'var(--bg-primary)',
                          color: isPrimaryBookmarked ? '#FFF' : 'var(--text-primary)',
                          borderColor: 'var(--border-gold)',
                        }}
                      >
                        <Bookmark className="w-3 h-3 fill-current" />
                        <span>حفظ المكان</span>
                      </button>

                      <button
                        onClick={() => handleFetchTafsir(ayah.numberInSurah)}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold border cursor-pointer"
                        style={{
                          backgroundColor: 'var(--bg-primary)',
                          borderColor: 'var(--border-gold)',
                        }}
                      >
                        التفسير
                      </button>

                      <button
                        onClick={() => handleCopyAyah(ayah)}
                        className="p-1.5 rounded-lg border cursor-pointer"
                        style={{
                          backgroundColor: 'var(--bg-primary)',
                          borderColor: 'var(--border-gold)',
                        }}
                        title="نسخ الآية"
                      >
                        {copiedAyahNum === ayah.numberInSurah ? (
                          <Check className="w-3.5 h-3.5 text-green-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Verse Uthmani Script */}
                  <p
                    className="font-quran text-right leading-loose"
                    style={{ fontSize: `${fontSize}px` }}
                  >
                    {cleanedText}
                    <AyahRosetteMarker
                      number={ayah.numberInSurah}
                      isPlaying={isCurrentlyPlaying}
                      isBookmarked={isPrimaryBookmarked}
                    />
                  </p>

                  {/* Inline Tafsir if requested */}
                  {tafsirAyahNum === ayah.numberInSurah && (
                    <div
                      className="mt-4 pt-3 border-t text-sm"
                      style={{ borderColor: 'var(--border-gold)' }}
                    >
                      <div className="font-bold text-xs mb-1" style={{ color: 'var(--accent-emerald)' }}>
                        التفسير الميسر:
                      </div>
                      {tafsirLoading ? (
                        <p className="text-xs">جاري تحميل التفسير...</p>
                      ) : (
                        <p className="font-amiri text-lg">{tafsirText}</p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* End of Surah Ornamental Completion & Next/Prev Surah Navigation */}
        <div
          className="mt-10 pt-6 border-t flex flex-col items-center gap-5"
          style={{ borderColor: 'var(--border-gold)' }}
        >
          <div className="inline-flex items-center gap-3 px-5 py-1.5 rounded-full border text-sm font-amiri" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--accent-gold)', color: 'var(--accent-emerald)' }}>
            <span>۞</span>
            <span>تمت سورة {surah.name} بحمد الله وتوفيقه</span>
            <span>۞</span>
          </div>

          <div className="w-full flex items-center justify-between gap-3">
            {prevSurah ? (
              <button
                onClick={() => onSelectSurah(prevSurah.number)}
                className="flex items-center gap-2.5 px-4 py-3 rounded-2xl border transition-all hover:border-[#C59B27] cursor-pointer text-right"
                style={{
                  backgroundColor: 'var(--bg-elevated)',
                  borderColor: 'var(--border-gold)',
                }}
              >
                <ChevronRight className="w-5 h-5 text-[#C59B27]" />
                <div>
                  <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                    السورة السابقة
                  </div>
                  <div className="font-amiri font-bold text-base sm:text-lg">
                    سورة {prevSurah.name}
                  </div>
                </div>
              </button>
            ) : (
              <div />
            )}

            {nextSurah ? (
              <button
                onClick={() => onSelectSurah(nextSurah.number)}
                className="flex items-center gap-2.5 px-4 py-3 rounded-2xl border transition-all hover:border-[#C59B27] cursor-pointer text-left"
                style={{
                  backgroundColor: 'var(--bg-elevated)',
                  borderColor: 'var(--border-gold)',
                }}
              >
                <div>
                  <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                    السورة التالية
                  </div>
                  <div className="font-amiri font-bold text-base sm:text-lg">
                    سورة {nextSurah.name}
                  </div>
                </div>
                <ChevronLeft className="w-5 h-5 text-[#C59B27]" />
              </button>
            ) : (
              <button
                onClick={() => onSelectSurah(1)}
                className="flex items-center gap-2 px-4 py-3 rounded-2xl border font-amiri font-bold cursor-pointer"
                style={{
                  backgroundColor: 'var(--bg-elevated)',
                  borderColor: 'var(--accent-gold)',
                }}
              >
                <span>العودة إلى سورة الفاتحة (بداية الختمة)</span>
                <ChevronLeft className="w-5 h-5 text-[#C59B27]" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
