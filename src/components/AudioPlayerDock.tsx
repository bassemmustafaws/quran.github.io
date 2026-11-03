import React, { useEffect, useRef, useState } from 'react';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Repeat,
  Download,
  Users,
  Sparkles,
} from 'lucide-react';
import {
  Reciter,
  FAMOUS_RECITERS,
  SurahMeta,
  AyahData,
  toArabicDigits,
  getEveryAyahAudioUrl,
  getFallbackAudioUrl,
  getFullSurahAudioUrl,
} from '../data/quranData';

interface AudioPlayerDockProps {
  currentSurah: SurahMeta;
  ayahs: AyahData[];
  playingAyahNumber: number | null; // numberInSurah (1..N)
  isPlaying: boolean;
  selectedReciter: Reciter;
  onSelectReciter: (reciter: Reciter) => void;
  onPlayAyah: (ayahInSurah: number) => void;
  onPause: () => void;
  onResume: () => void;
  onOpenRecitersModal: () => void;
}

export const AudioPlayerDock: React.FC<AudioPlayerDockProps> = ({
  currentSurah,
  ayahs,
  playingAyahNumber,
  isPlaying,
  selectedReciter,
  onSelectReciter,
  onPlayAyah,
  onPause,
  onResume,
  onOpenRecitersModal,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [repeatOne, setRepeatOne] = useState(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [usedFallback, setUsedFallback] = useState(false);

  const activeAyahNumber = playingAyahNumber || 1;
  const activeAyahObj = ayahs.find((a) => a.numberInSurah === activeAyahNumber);

  // Sync audio source when surah, ayah, or reciter changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !playingAyahNumber) return;

    setUsedFallback(false);
    const primaryUrl = getEveryAyahAudioUrl(selectedReciter, currentSurah.number, playingAyahNumber);

    if (audio.src !== primaryUrl) {
      audio.src = primaryUrl;
      audio.playbackRate = playbackRate;
      audio.muted = isMuted;
    }

    if (isPlaying) {
      audio.play().catch(() => {
        // Fallback if primary fails
        if (activeAyahObj) {
          audio.src = getFallbackAudioUrl(selectedReciter, activeAyahObj.number);
          audio.play().catch(() => {
            onPause();
          });
        }
      });
    } else {
      audio.pause();
    }
  }, [currentSurah.number, playingAyahNumber, selectedReciter, isPlaying]);

  // Handle play/pause toggle without changing src
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !playingAyahNumber) return;
    if (isPlaying && audio.paused && audio.src) {
      audio.play().catch(() => {});
    } else if (!isPlaying && !audio.paused) {
      audio.pause();
    }
  }, [isPlaying]);

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(audio.currentTime);
    setDuration(audio.duration || 0);
    if (audio.duration > 0) {
      setProgress((audio.currentTime / audio.duration) * 100);
    }
  };

  const handleAudioEnded = () => {
    const audio = audioRef.current;
    if (repeatOne && audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {});
      return;
    }

    if (playingAyahNumber && playingAyahNumber < currentSurah.numberOfAyahs) {
      onPlayAyah(playingAyahNumber + 1);
    } else {
      onPause();
      setProgress(0);
    }
  };

  const handleAudioError = () => {
    const audio = audioRef.current;
    if (!audio || usedFallback || !activeAyahObj) return;
    setUsedFallback(true);
    audio.src = getFallbackAudioUrl(selectedReciter, activeAyahObj.number);
    if (isPlaying) {
      audio.play().catch(() => onPause());
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    const val = Number(e.target.value);
    setProgress(val);
    if (audio && audio.duration) {
      audio.currentTime = (val / 100) * audio.duration;
    }
  };

  const togglePlayPause = () => {
    if (!playingAyahNumber) {
      onPlayAyah(1);
    } else if (isPlaying) {
      onPause();
    } else {
      onResume();
    }
  };

  const handlePrevAyah = () => {
    if (activeAyahNumber > 1) {
      onPlayAyah(activeAyahNumber - 1);
    } else {
      onPlayAyah(1);
    }
  };

  const handleNextAyah = () => {
    if (activeAyahNumber < currentSurah.numberOfAyahs) {
      onPlayAyah(activeAyahNumber + 1);
    }
  };

  const toggleSpeed = () => {
    const speeds = [1, 1.25, 0.9];
    const nextIdx = (speeds.indexOf(playbackRate) + 1) % speeds.length;
    const nextSpeed = speeds[nextIdx];
    setPlaybackRate(nextSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextSpeed;
    }
  };

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    if (audioRef.current) {
      audioRef.current.muted = nextMute;
    }
  };

  const formatTime = (sec: number) => {
    if (!sec || !isFinite(sec)) return '00:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-40 border-t transition-colors duration-300"
      style={{
        backgroundColor: 'var(--bg-glass)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderColor: 'var(--border-frame)',
        boxShadow: '0 -8px 30px rgba(0, 0, 0, 0.08)',
      }}
    >
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleAudioEnded}
        onError={handleAudioError}
        preload="none"
      />

      {/* Top thin interactive timeline bar */}
      <div className="relative w-full h-1.5 bg-black/10 group cursor-pointer">
        <div
          className="h-full transition-all duration-150"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, var(--accent-emerald), var(--accent-gold))',
          }}
        />
        <input
          type="range"
          min={0}
          max={100}
          value={progress}
          onChange={handleSeek}
          aria-label="شريط تقدم التلاوة"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-[72px] flex items-center justify-between gap-2 sm:gap-4">
        {/* Right Section: Currently Playing Info & Reciter Badge */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0 flex-1">
          <button
            onClick={onOpenRecitersModal}
            className="relative w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border transition-transform hover:scale-105 cursor-pointer"
            style={{
              backgroundColor: 'var(--accent-emerald)',
              borderColor: 'var(--accent-gold)',
              color: '#FBF8F1',
            }}
            title="اضغط لتغيير القارئ"
          >
            <span className="font-amiri font-bold text-sm">{selectedReciter.monogram}</span>
            {isPlaying && (
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#C59B27] animate-ping" />
            )}
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs sm:text-sm truncate">
                سورة {currentSurah.name}
              </span>
              <span
                className="text-[11px] px-2 py-0.5 rounded-full font-semibold shrink-0"
                style={{
                  backgroundColor: 'var(--accent-gold-soft)',
                  color: 'var(--accent-emerald)',
                }}
              >
                الآية {toArabicDigits(activeAyahNumber)} من {toArabicDigits(currentSurah.numberOfAyahs)}
              </span>
            </div>

            <div className="flex items-center gap-1.5 mt-0.5">
              <Sparkles className="w-3 h-3 shrink-0 text-[#C59B27]" />
              <select
                value={selectedReciter.id}
                onChange={(e) => {
                  const found = FAMOUS_RECITERS.find((r) => r.id === e.target.value);
                  if (found) onSelectReciter(found);
                }}
                aria-label="اختر القارئ"
                className="text-xs font-semibold bg-transparent outline-none cursor-pointer truncate max-w-[165px] sm:max-w-[230px]"
                style={{ color: 'var(--text-secondary)' }}
              >
                {FAMOUS_RECITERS.map((r) => (
                  <option
                    key={r.id}
                    value={r.id}
                    style={{
                      backgroundColor: 'var(--bg-primary)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    الشيخ {r.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Center Section: Transport Controls (RTL aware) */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Repeat Single Ayah Toggle */}
          <button
            onClick={() => setRepeatOne(!repeatOne)}
            className="p-2 rounded-lg border transition-colors cursor-pointer hidden sm:inline-flex items-center gap-1 text-xs"
            style={{
              backgroundColor: repeatOne ? 'var(--accent-gold-soft)' : 'transparent',
              borderColor: repeatOne ? 'var(--accent-gold)' : 'transparent',
              color: repeatOne ? 'var(--accent-emerald)' : 'var(--text-secondary)',
            }}
            title={repeatOne ? 'تكرار الآية الحالية مفعل (للحفظ)' : 'تفعيل تكرار الآية الحالية'}
          >
            <Repeat className="w-4 h-4" />
            {repeatOne && <span className="text-[10px] font-bold">تكرار آية</span>}
          </button>

          {/* Previous Ayah */}
          <button
            onClick={handlePrevAyah}
            disabled={activeAyahNumber <= 1}
            className="p-2 rounded-full hover:bg-black/5 disabled:opacity-35 transition-colors cursor-pointer"
            title="الآية السابقة"
          >
            <SkipForward className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Main Play/Pause Button */}
          <button
            onClick={togglePlayPause}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-lg border-2 transition-transform active:scale-95 cursor-pointer"
            style={{
              backgroundColor: 'var(--accent-emerald)',
              borderColor: 'var(--accent-gold)',
              color: '#FBF8F1',
            }}
            title={isPlaying ? 'إيقاف مؤقت' : 'تشغيل التلاوة'}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </button>

          {/* Next Ayah */}
          <button
            onClick={handleNextAyah}
            disabled={activeAyahNumber >= currentSurah.numberOfAyahs}
            className="p-2 rounded-full hover:bg-black/5 disabled:opacity-35 transition-colors cursor-pointer"
            title="الآية التالية"
          >
            <SkipBack className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Speed Control */}
          <button
            onClick={toggleSpeed}
            className="px-2 py-1 rounded-lg text-xs font-mono-num font-semibold border hidden md:inline-block cursor-pointer"
            style={{
              borderColor: 'var(--border-gold)',
              color: 'var(--text-secondary)',
            }}
            title="سرعة التلاوة"
          >
            {playbackRate}x
          </button>
        </div>

        {/* Left Section: Time, Reciters Modal, Download Full Surah */}
        <div className="flex items-center justify-end gap-2 sm:gap-3 flex-1">
          <div
            className="hidden lg:flex items-center gap-1 text-xs font-mono-num"
            style={{ color: 'var(--text-muted)' }}
          >
            <span>{formatTime(currentTime)}</span>
            <span>/</span>
            <span>{formatTime(duration)}</span>
          </div>

          <button
            onClick={toggleMute}
            className="p-2 rounded-lg hover:bg-black/5 transition-colors hidden sm:inline-flex cursor-pointer"
            title={isMuted ? 'إلغاء كتم الصوت' : 'كتم الصوت'}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-[#B8332A]" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>

          <button
            onClick={onOpenRecitersModal}
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold border transition-all hover:opacity-90 cursor-pointer"
            style={{
              backgroundColor: 'var(--bg-elevated)',
              borderColor: 'var(--border-gold)',
              color: 'var(--text-primary)',
            }}
            title="قائمة أشهر القراء"
          >
            <Users className="w-3.5 h-3.5 text-[#C59B27]" />
            <span className="hidden sm:inline">القراء</span>
          </button>

          <a
            href={getFullSurahAudioUrl(selectedReciter, currentSurah.number)}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl border transition-colors hover:bg-black/5 hidden md:inline-flex items-center gap-1 text-xs font-semibold"
            style={{
              borderColor: 'var(--border-gold)',
              color: 'var(--text-secondary)',
            }}
            title={`تحميل سورة ${currentSurah.name} كاملة بصوت الشيخ ${selectedReciter.shortName}`}
          >
            <Download className="w-3.5 h-3.5 text-[#0D5C46]" />
          </a>
        </div>
      </div>
    </div>
  );
};
