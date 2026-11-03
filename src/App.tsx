import { useEffect, useRef, useState } from 'react';
import {
  Bookmark,
  Moon,
  Sun,
  Menu,
  Code2,
  Type,
  Users,
  Sparkles,
  ArrowLeft,
} from 'lucide-react';
import {
  ALL_SURAHS,
  OFFLINE_SURAHS,
  FAMOUS_RECITERS,
  SurahMeta,
  AyahData,
  Reciter,
  BookmarkRecord,
  toArabicDigits,
  cleanAyahText,
} from './data/quranData';
import { SurahSidebar } from './components/SurahSidebar';
import { MushafReader } from './components/MushafReader';
import { RecitersQuickStrip } from './components/RecitersQuickStrip';
import { AudioPlayerDock } from './components/AudioPlayerDock';
import { RecitersModal } from './components/RecitersModal';
import { BookmarksModal } from './components/BookmarksModal';
import { BloggerEmbedModal } from './components/BloggerEmbedModal';

const PRIMARY_BOOKMARK_KEY = 'noor_mushaf_primary_bookmark_v1';
const SAVED_BOOKMARKS_KEY = 'noor_mushaf_saved_bookmarks_v1';
const THEME_KEY = 'noor_mushaf_theme_v1';
const FONT_SIZE_KEY = 'noor_mushaf_fontsize_v1';
const RECITER_KEY = 'noor_mushaf_reciter_v1';

export function App() {
  // Theme state: 'light' (Warm Parchment), 'sepia' (Cream Mushaf), 'dark' (Tahajjud Night)
  const [theme, setTheme] = useState<'light' | 'sepia' | 'dark'>(() => {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'sepia' || saved === 'light') return saved;
    return 'light';
  });

  // Font size state (24px to 46px)
  const [fontSize, setFontSize] = useState<number>(() => {
    const saved = Number(localStorage.getItem(FONT_SIZE_KEY));
    return saved >= 24 && saved <= 46 ? saved : 32;
  });

  // View mode: continuous mushaf vs verse cards
  const [viewMode, setViewMode] = useState<'mushaf' | 'list'>('mushaf');

  // Selected Reciter
  const [selectedReciter, setSelectedReciter] = useState<Reciter>(() => {
    const savedId = localStorage.getItem(RECITER_KEY);
    return FAMOUS_RECITERS.find((r) => r.id === savedId) || FAMOUS_RECITERS[0];
  });

  // Primary Bookmark ("الفاصلة المرجعية")
  const [primaryBookmark, setPrimaryBookmark] = useState<BookmarkRecord | null>(() => {
    try {
      const raw = localStorage.getItem(PRIMARY_BOOKMARK_KEY);
      if (raw) return JSON.parse(raw);
    } catch {}
    // Default helpful initial bookmark so user immediately sees how Resume Reading works
    return {
      surahNumber: 18,
      surahName: 'الكهف',
      ayahNumber: 10,
      ayahSnippet: 'إِذْ أَوَى ٱلْفِتْيَةُ إِلَى ٱلْكَهْفِ فَقَالُوا۟ رَبَّنَآ ءَاتِنَا مِن لَّدُنكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا',
      page: 294,
      juz: 15,
      timestamp: Date.now(),
    };
  });

  // Additional Saved Favorite Verses
  const [savedBookmarks, setSavedBookmarks] = useState<BookmarkRecord[]>(() => {
    try {
      const raw = localStorage.getItem(SAVED_BOOKMARKS_KEY);
      if (raw) return JSON.parse(raw);
    } catch {}
    return [
      {
        surahNumber: 2,
        surahName: 'البقرة',
        ayahNumber: 255,
        ayahSnippet: 'ٱللَّهُ لَآ إِلَٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ ۚ لَا تَأْخُذُهُۥ سِنَةٌ وَلَا نَوْمٌ',
        page: 42,
        juz: 3,
        timestamp: Date.now(),
      },
      {
        surahNumber: 36,
        surahName: 'يس',
        ayahNumber: 1,
        ayahSnippet: 'يسٓ • وَٱلْقُرْءَانِ ٱلْحَكِيمِ',
        page: 440,
        juz: 22,
        timestamp: Date.now(),
      },
    ];
  });

  // Current Surah & Ayahs state
  const [currentSurahNumber, setCurrentSurahNumber] = useState<number>(1);
  const [ayahs, setAyahs] = useState<AyahData[]>(OFFLINE_SURAHS[1]);
  const [isLoadingSurah, setIsLoadingSurah] = useState<boolean>(false);

  // Audio playback state
  const [playingAyahNumber, setPlayingAyahNumber] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Highlighted Ayah when jumping to bookmark
  const [highlightedAyah, setHighlightedAyah] = useState<number | null>(null);
  const pendingScrollAyahRef = useRef<number | null>(null);

  // Modals & Drawers state
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isRecitersModalOpen, setIsRecitersModalOpen] = useState(false);
  const [isBookmarksModalOpen, setIsBookmarksModalOpen] = useState(false);
  const [isBloggerModalOpen, setIsBloggerModalOpen] = useState(false);
  const [showFontPopover, setShowFontPopover] = useState(false);

  // In-memory Surah cache
  const surahCacheRef = useRef<Record<number, AyahData[]>>({ ...OFFLINE_SURAHS });

  const currentSurah: SurahMeta =
    ALL_SURAHS.find((s) => s.number === currentSurahNumber) || ALL_SURAHS[0];

  // Apply theme attribute to document
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', theme);
    }
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  // Save font size
  useEffect(() => {
    localStorage.setItem(FONT_SIZE_KEY, String(fontSize));
  }, [fontSize]);

  // Fetch Surah verses when currentSurahNumber changes
  useEffect(() => {
    let isCancelled = false;

    const loadSurahData = async () => {
      // Check memory cache first
      if (surahCacheRef.current[currentSurahNumber]) {
        setAyahs(surahCacheRef.current[currentSurahNumber]);
        setIsLoadingSurah(false);
        triggerPendingAyahScroll(currentSurahNumber);
        return;
      }

      // Check sessionStorage cache
      try {
        const cachedSession = sessionStorage.getItem(`surah_uthmani_${currentSurahNumber}`);
        if (cachedSession) {
          const parsed: AyahData[] = JSON.parse(cachedSession);
          surahCacheRef.current[currentSurahNumber] = parsed;
          setAyahs(parsed);
          setIsLoadingSurah(false);
          triggerPendingAyahScroll(currentSurahNumber);
          return;
        }
      } catch {}

      // Fetch from AlQuran Cloud API
      setIsLoadingSurah(true);
      try {
        const res = await fetch(
          `https://api.alquran.cloud/v1/surah/${currentSurahNumber}/quran-uthmani`
        );
        const json = await res.json();
        if (!isCancelled && json?.data?.ayahs) {
          const loadedAyahs: AyahData[] = json.data.ayahs.map((a: any) => ({
            number: a.number,
            numberInSurah: a.numberInSurah,
            text: a.text,
            juz: a.juz,
            page: a.page,
            hizbQuarter: a.hizbQuarter,
            sajda: a.sajda,
          }));
          surahCacheRef.current[currentSurahNumber] = loadedAyahs;
          try {
            sessionStorage.setItem(
              `surah_uthmani_${currentSurahNumber}`,
              JSON.stringify(loadedAyahs)
            );
          } catch {}
          setAyahs(loadedAyahs);
          setIsLoadingSurah(false);
          triggerPendingAyahScroll(currentSurahNumber);
        }
      } catch {
        if (!isCancelled) {
          setIsLoadingSurah(false);
        }
      }
    };

    loadSurahData();

    return () => {
      isCancelled = true;
    };
  }, [currentSurahNumber]);

  const triggerPendingAyahScroll = (surahNum: number) => {
    if (pendingScrollAyahRef.current) {
      const targetAyah = pendingScrollAyahRef.current;
      pendingScrollAyahRef.current = null;
      setTimeout(() => {
        const el = document.getElementById(`ayah-${surahNum}-${targetAyah}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setHighlightedAyah(targetAyah);
          setTimeout(() => setHighlightedAyah(null), 2800);
        }
      }, 150);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectSurah = (surahNumber: number) => {
    if (surahNumber === currentSurahNumber) return;
    setIsPlaying(false);
    setPlayingAyahNumber(null);
    setCurrentSurahNumber(surahNumber);
  };

  const handleJumpToBookmark = (surahNumber: number, ayahNumber: number) => {
    if (surahNumber === currentSurahNumber) {
      const el = document.getElementById(`ayah-${surahNumber}-${ayahNumber}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setHighlightedAyah(ayahNumber);
        setTimeout(() => setHighlightedAyah(null), 2800);
      }
    } else {
      setIsPlaying(false);
      setPlayingAyahNumber(null);
      pendingScrollAyahRef.current = ayahNumber;
      setCurrentSurahNumber(surahNumber);
    }
  };

  const handleSetPrimaryBookmark = (ayah: AyahData) => {
    const snippet = cleanAyahText(ayah.text, currentSurah.number, ayah.numberInSurah);
    const newBookmark: BookmarkRecord = {
      surahNumber: currentSurah.number,
      surahName: currentSurah.name,
      ayahNumber: ayah.numberInSurah,
      ayahSnippet: snippet,
      page: ayah.page || currentSurah.page,
      juz: ayah.juz || currentSurah.juz,
      timestamp: Date.now(),
    };
    setPrimaryBookmark(newBookmark);
    localStorage.setItem(PRIMARY_BOOKMARK_KEY, JSON.stringify(newBookmark));
  };

  const handleToggleSavedBookmark = (ayah: AyahData) => {
    const exists = savedBookmarks.some(
      (b) => b.surahNumber === currentSurah.number && b.ayahNumber === ayah.numberInSurah
    );
    let updated: BookmarkRecord[];
    if (exists) {
      updated = savedBookmarks.filter(
        (b) => !(b.surahNumber === currentSurah.number && b.ayahNumber === ayah.numberInSurah)
      );
    } else {
      const snippet = cleanAyahText(ayah.text, currentSurah.number, ayah.numberInSurah);
      const newRecord: BookmarkRecord = {
        surahNumber: currentSurah.number,
        surahName: currentSurah.name,
        ayahNumber: ayah.numberInSurah,
        ayahSnippet: snippet,
        page: ayah.page || currentSurah.page,
        juz: ayah.juz || currentSurah.juz,
        timestamp: Date.now(),
      };
      updated = [newRecord, ...savedBookmarks];
    }
    setSavedBookmarks(updated);
    localStorage.setItem(SAVED_BOOKMARKS_KEY, JSON.stringify(updated));
  };

  const handleRemoveSavedBookmark = (surahNum: number, ayahNum: number) => {
    const updated = savedBookmarks.filter(
      (b) => !(b.surahNumber === surahNum && b.ayahNumber === ayahNum)
    );
    setSavedBookmarks(updated);
    localStorage.setItem(SAVED_BOOKMARKS_KEY, JSON.stringify(updated));
  };

  const handleSelectReciter = (reciter: Reciter, autoPlay = false) => {
    setSelectedReciter(reciter);
    localStorage.setItem(RECITER_KEY, reciter.id);
    if (autoPlay) {
      setPlayingAyahNumber((prev) => prev || 1);
      setIsPlaying(true);
    }
  };

  const handlePlayAyah = (ayahInSurah: number) => {
    setPlayingAyahNumber(ayahInSurah);
    setIsPlaying(true);
  };

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('sepia');
    else setTheme('light');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Sticky Sanctuary Top Header (64px) */}
      <header
        className="sticky top-0 z-40 h-16 border-b transition-colors duration-300"
        style={{
          backgroundColor: 'var(--bg-glass)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderColor: 'var(--border-gold)',
        }}
      >
        <div className="max-w-7xl mx-auto h-full px-3 sm:px-6 flex items-center justify-between gap-2">
          {/* Right: Mobile Index Trigger & App Brand Title */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl border transition-colors cursor-pointer"
              style={{
                backgroundColor: 'var(--bg-elevated)',
                borderColor: 'var(--border-gold)',
              }}
              aria-label="فهرس السور"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div
              onClick={() => handleSelectSurah(1)}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center border shadow-xs transition-transform group-hover:scale-105"
                style={{
                  backgroundColor: 'var(--accent-emerald)',
                  borderColor: 'var(--accent-gold)',
                  color: '#FBF8F1',
                }}
              >
                <span className="font-amiri font-bold text-lg">۞</span>
              </div>
              <div>
                <div className="font-amiri font-bold text-lg sm:text-xl leading-none flex items-center gap-1.5">
                  <span>نور المصحف</span>
                  <span
                    className="hidden xl:inline-block text-[10px] font-cairo font-bold px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: 'var(--accent-gold-soft)',
                      color: 'var(--accent-emerald)',
                    }}
                  >
                    القرآن الكريم كاملاً
                  </span>
                </div>
                <p
                  className="text-[10px] hidden sm:block mt-0.5"
                  style={{ color: 'var(--text-muted)' }}
                >
                  قراءة بالرسم العثماني • حفظ الفاصلة • أشهر القراء
                </p>
              </div>
            </div>
          </div>

          {/* Center: Quick Resume Reading Bookmark Pill ("متابعة القراءة") */}
          {primaryBookmark && (
            <div className="flex items-center">
              <button
                onClick={() =>
                  handleJumpToBookmark(primaryBookmark.surahNumber, primaryBookmark.ayahNumber)
                }
                className="group inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold border shadow-xs transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
                style={{
                  backgroundColor: 'var(--bg-elevated)',
                  borderColor: 'var(--accent-gold)',
                  color: 'var(--text-primary)',
                }}
                title="اضغط للانتقال الفوري إلى آخر آية توقفت عندها"
              >
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-white shrink-0"
                  style={{ backgroundColor: 'var(--accent-ruby)' }}
                >
                  <Bookmark className="w-3 h-3 fill-current" />
                </span>
                <span className="hidden md:inline" style={{ color: 'var(--text-secondary)' }}>
                  متابعة القراءة:
                </span>
                <span className="font-amiri text-sm sm:text-base font-bold" style={{ color: 'var(--accent-emerald)' }}>
                  سورة {primaryBookmark.surahName} ({toArabicDigits(primaryBookmark.ayahNumber)})
                </span>
                <ArrowLeft className="w-3.5 h-3.5 text-[#C59B27] transition-transform group-hover:-translate-x-0.5 hidden sm:inline" />
              </button>
            </div>
          )}

          {/* Left: Utility Controls (Bookmarks Modal, Font Size, Reciters, Blogger Code, Theme) */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Bookmarks List Modal Button */}
            <button
              onClick={() => setIsBookmarksModalOpen(true)}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl border text-xs font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              style={{
                backgroundColor: 'var(--bg-elevated)',
                borderColor: 'var(--border-gold)',
              }}
              title="إدارة الفاصلة والآيات المحفوظة"
            >
              <Bookmark className="w-4 h-4 text-[#B8332A] fill-[#B8332A]" />
              <span className="hidden md:inline">الفاصلة</span>
            </button>

            {/* Font Size Popover Button */}
            <div className="relative">
              <button
                onClick={() => setShowFontPopover(!showFontPopover)}
                className="p-2 sm:px-2.5 sm:py-1.5 rounded-xl border text-xs font-bold inline-flex items-center gap-1 transition-colors cursor-pointer"
                style={{
                  backgroundColor: showFontPopover ? 'var(--accent-gold-soft)' : 'var(--bg-elevated)',
                  borderColor: 'var(--border-gold)',
                }}
                title="حجم خط المصحف ومظهر الورق"
              >
                <Type className="w-4 h-4 text-[#0D5C46]" />
                <span className="hidden xl:inline">الخط</span>
              </button>

              {showFontPopover && (
                <div
                  className="absolute left-0 mt-2 w-64 p-4 rounded-2xl border shadow-xl z-50"
                  style={{
                    backgroundColor: 'var(--bg-primary)',
                    borderColor: 'var(--accent-gold)',
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold">حجم خط المصحف</span>
                    <span className="text-xs font-bold" style={{ color: 'var(--accent-emerald)' }}>
                      {toArabicDigits(fontSize)} بكسل
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <button
                      onClick={() => setFontSize((f) => Math.max(24, f - 2))}
                      className="flex-1 py-1.5 rounded-lg border font-bold text-sm cursor-pointer"
                      style={{
                        backgroundColor: 'var(--bg-elevated)',
                        borderColor: 'var(--border-gold)',
                      }}
                    >
                      أ - (تصغير)
                    </button>
                    <button
                      onClick={() => setFontSize((f) => Math.min(46, f + 2))}
                      className="flex-1 py-1.5 rounded-lg border font-bold text-sm cursor-pointer"
                      style={{
                        backgroundColor: 'var(--bg-elevated)',
                        borderColor: 'var(--border-gold)',
                      }}
                    >
                      أ + (تكبير)
                    </button>
                  </div>

                  <div className="text-xs font-bold mb-2">لون ورق المصحف:</div>
                  <div className="grid grid-cols-3 gap-1.5 text-xs font-semibold">
                    <button
                      onClick={() => setTheme('light')}
                      className="py-1.5 rounded-lg border cursor-pointer"
                      style={{
                        backgroundColor: '#FBF8F1',
                        color: '#181A18',
                        borderColor: theme === 'light' ? '#0D5C46' : '#E5DEC9',
                      }}
                    >
                      نهاري
                    </button>
                    <button
                      onClick={() => setTheme('sepia')}
                      className="py-1.5 rounded-lg border cursor-pointer"
                      style={{
                        backgroundColor: '#F5EEDB',
                        color: '#1F1912',
                        borderColor: theme === 'sepia' ? '#0D5C46' : '#DCD0B4',
                      }}
                    >
                      ورق كريمي
                    </button>
                    <button
                      onClick={() => setTheme('dark')}
                      className="py-1.5 rounded-lg border cursor-pointer"
                      style={{
                        backgroundColor: '#0E1512',
                        color: '#EFECE6',
                        borderColor: theme === 'dark' ? '#D9B146' : '#24332C',
                      }}
                    >
                      ليلي
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Famous Reciters Modal Trigger */}
            <button
              onClick={() => setIsRecitersModalOpen(true)}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl border text-xs font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              style={{
                backgroundColor: 'var(--bg-elevated)',
                borderColor: 'var(--border-gold)',
              }}
              title="قائمة أشهر القراء"
            >
              <Users className="w-4 h-4 text-[#C59B27]" />
              <span className="hidden md:inline">أشهر القراء</span>
            </button>

            {/* Blogger Embed Code Modal Trigger */}
            <button
              onClick={() => setIsBloggerModalOpen(true)}
              className="px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs font-bold text-white shadow-xs inline-flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
              style={{
                backgroundColor: 'var(--accent-emerald)',
                border: '1px solid var(--accent-gold)',
              }}
              title="احصل على الكود الجاهز للنسخ واللصق في صفحة مدونة بلوجر"
            >
              <Code2 className="w-4 h-4 text-[#D9B146]" />
              <span className="hidden sm:inline">كود بلوجر</span>
            </button>

            {/* Day / Night Quick Toggle */}
            <button
              onClick={cycleTheme}
              className="p-2 rounded-xl border transition-colors cursor-pointer"
              style={{
                backgroundColor: 'var(--bg-elevated)',
                borderColor: 'var(--border-gold)',
              }}
              title="تبديل المظهر (نهاري / ليلي / كريمي)"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-[#D9B146]" />
              ) : (
                <Moon className="w-4 h-4 text-[#0D5C46]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area: Right Surah Index Sidebar + Center Mushaf Canvas */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 pt-5 flex gap-6 items-start">
        {/* Right-Side Surah Index Sidebar (All 114 Surahs) */}
        <SurahSidebar
          currentSurahNumber={currentSurahNumber}
          onSelectSurah={handleSelectSurah}
          primaryBookmark={primaryBookmark}
          isOpenMobile={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        {/* Center Column: Blogger Tip Banner + Famous Reciters Strip + Mushaf Reader */}
        <div className="flex-1 min-w-0">
          {/* Top Subtle Blogger Owner Banner */}
          <div
            className="mb-4 px-4 py-2.5 rounded-2xl border flex flex-wrap items-center justify-between gap-2 max-w-[850px] mx-auto text-xs"
            style={{
              backgroundColor: 'var(--accent-gold-soft)',
              borderColor: 'var(--accent-gold)',
            }}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#0D5C46] shrink-0" />
              <span>
                <strong>لصاحب مدونة بلوجر:</strong> يمكنك تصفح المصحف هنا مباشرة، أو نسخ الكود الكامل لوضعه في صفحة مستقلة بمدونتك.
              </span>
            </div>
            <button
              onClick={() => setIsBloggerModalOpen(true)}
              className="font-bold underline cursor-pointer"
              style={{ color: 'var(--accent-emerald)' }}
            >
              نسخ كود صفحة بلوجر الجاهز ←
            </button>
          </div>

          {/* Famous Reciters Quick Strip ("أشهر القراء") */}
          <RecitersQuickStrip
            selectedReciter={selectedReciter}
            onSelectReciter={handleSelectReciter}
            isPlaying={isPlaying}
            onOpenAllModal={() => setIsRecitersModalOpen(true)}
          />

          {/* The Illuminated Mushaf Reading Canvas */}
          <MushafReader
            surah={currentSurah}
            ayahs={ayahs}
            isLoading={isLoadingSurah}
            fontSize={fontSize}
            viewMode={viewMode}
            onToggleViewMode={setViewMode}
            playingAyahNumber={playingAyahNumber}
            isPlaying={isPlaying}
            selectedReciter={selectedReciter}
            primaryBookmark={primaryBookmark}
            savedBookmarks={savedBookmarks}
            highlightedAyah={highlightedAyah}
            onPlayAyah={handlePlayAyah}
            onPauseAudio={() => setIsPlaying(false)}
            onSetPrimaryBookmark={handleSetPrimaryBookmark}
            onToggleSavedBookmark={handleToggleSavedBookmark}
            onSelectSurah={handleSelectSurah}
            onOpenRecitersModal={() => setIsRecitersModalOpen(true)}
          />
        </div>
      </main>

      {/* Persistent Bottom Audio Player Dock */}
      <AudioPlayerDock
        currentSurah={currentSurah}
        ayahs={ayahs}
        playingAyahNumber={playingAyahNumber}
        isPlaying={isPlaying}
        selectedReciter={selectedReciter}
        onSelectReciter={(r) => handleSelectReciter(r, isPlaying)}
        onPlayAyah={handlePlayAyah}
        onPause={() => setIsPlaying(false)}
        onResume={() => setIsPlaying(true)}
        onOpenRecitersModal={() => setIsRecitersModalOpen(true)}
      />

      {/* Famous Reciters Gallery Modal */}
      <RecitersModal
        isOpen={isRecitersModalOpen}
        onClose={() => setIsRecitersModalOpen(false)}
        selectedReciter={selectedReciter}
        onSelectReciter={handleSelectReciter}
        isPlaying={isPlaying}
      />

      {/* Bookmarks & Reading Position Modal */}
      <BookmarksModal
        isOpen={isBookmarksModalOpen}
        onClose={() => setIsBookmarksModalOpen(false)}
        primaryBookmark={primaryBookmark}
        savedBookmarks={savedBookmarks}
        onJumpToBookmark={handleJumpToBookmark}
        onRemoveSavedBookmark={handleRemoveSavedBookmark}
      />

      {/* Blogger Standalone Page Code Generator Modal */}
      <BloggerEmbedModal
        isOpen={isBloggerModalOpen}
        onClose={() => setIsBloggerModalOpen(false)}
      />
    </div>
  );
}

export default App;
