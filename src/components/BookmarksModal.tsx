import React from 'react';
import { X, Bookmark, Trash2, ArrowLeft, Sparkles, Clock } from 'lucide-react';
import { BookmarkRecord, toArabicDigits } from '../data/quranData';

interface BookmarksModalProps {
  isOpen: boolean;
  onClose: () => void;
  primaryBookmark: BookmarkRecord | null;
  savedBookmarks: BookmarkRecord[];
  onJumpToBookmark: (surahNumber: number, ayahNumber: number) => void;
  onRemoveSavedBookmark: (surahNumber: number, ayahNumber: number) => void;
}

export const BookmarksModal: React.FC<BookmarksModalProps> = ({
  isOpen,
  onClose,
  primaryBookmark,
  savedBookmarks,
  onJumpToBookmark,
  onRemoveSavedBookmark,
}) => {
  if (!isOpen) return null;

  const formatRelativeDate = (timestamp: number) => {
    try {
      return new Intl.DateTimeFormat('ar-EG', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(new Date(timestamp));
    } catch {
      return 'محفوظ تلقائياً';
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-2xl border p-5 sm:p-7 shadow-2xl"
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
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{
                backgroundColor: 'var(--accent-ruby)',
                color: '#FBF8F1',
              }}
            >
              <Bookmark className="w-6 h-6 fill-current" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold font-amiri">
                فاصلة المصحف وحفظ مكان القراءة
              </h2>
              <p className="text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>
                يتم حفظ مكان توقفك تلقائياً في متصفحك لتكمل وردك القرآني من حيث توقفت في أي وقت
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

        {/* Primary Last-Read Bookmark */}
        <div className="my-5">
          <h3 className="text-xs font-bold uppercase tracking-wider mb-2.5 flex items-center gap-1.5" style={{ color: 'var(--accent-emerald)' }}>
            <Sparkles className="w-4 h-4 text-[#C59B27]" />
            <span>الفاصلة المرجعية الحالية (آخر موضع قراءة)</span>
          </h3>

          {primaryBookmark ? (
            <div
              className="p-4 sm:p-5 rounded-2xl border-2 transition-all"
              style={{
                backgroundColor: 'var(--bg-elevated)',
                borderColor: 'var(--accent-gold)',
              }}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-xs font-bold text-white"
                      style={{ backgroundColor: 'var(--accent-ruby)' }}
                    >
                      فاصلة الختمة
                    </span>
                    <h4 className="font-amiri font-bold text-xl">
                      سورة {primaryBookmark.surahName} — الآية {toArabicDigits(primaryBookmark.ayahNumber)}
                    </h4>
                  </div>
                  <p className="font-quran text-lg sm:text-xl mt-2.5 line-clamp-2 leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                    ﴿ {primaryBookmark.ayahSnippet} ﴾
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                    <span>الجزء {toArabicDigits(primaryBookmark.juz)}</span>
                    <span>•</span>
                    <span>صفحة {toArabicDigits(primaryBookmark.page)}</span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatRelativeDate(primaryBookmark.timestamp)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onJumpToBookmark(primaryBookmark.surahNumber, primaryBookmark.ayahNumber);
                    onClose();
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white shadow-md transition-transform active:scale-95 cursor-pointer"
                  style={{ backgroundColor: 'var(--accent-emerald)' }}
                >
                  <span>الانتقال إلى موضع القراءة</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div
              className="p-5 rounded-xl border text-center text-sm"
              style={{
                backgroundColor: 'var(--bg-elevated)',
                borderColor: 'var(--border-gold)',
                color: 'var(--text-secondary)',
              }}
            >
              لم تقم بوضع فاصلة القراءة بعد. اضغط على أي آية أثناء القراءة ثم اختر «حفظ الفاصلة هنا».
            </div>
          )}
        </div>

        {/* Pinned / Additional Saved Verses */}
        <div className="my-5">
          <h3 className="text-xs font-bold mb-2.5 flex items-center justify-between" style={{ color: 'var(--text-secondary)' }}>
            <span>علامات وآيات محفوظة إضافية ({toArabicDigits(savedBookmarks.length)})</span>
            <span className="font-normal">اضغط على أي علامة للانتقال إليها</span>
          </h3>

          {savedBookmarks.length > 0 ? (
            <div className="space-y-2.5">
              {savedBookmarks.map((bm) => (
                <div
                  key={`${bm.surahNumber}-${bm.ayahNumber}`}
                  className="flex items-center justify-between gap-3 p-3.5 rounded-xl border transition-colors hover:border-[#C59B27]"
                  style={{
                    backgroundColor: 'var(--bg-elevated)',
                    borderColor: 'var(--border-gold)',
                  }}
                >
                  <div
                    onClick={() => {
                      onJumpToBookmark(bm.surahNumber, bm.ayahNumber);
                      onClose();
                    }}
                    className="min-w-0 flex-1 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm" style={{ color: 'var(--accent-emerald)' }}>
                        سورة {bm.surahName} • آية {toArabicDigits(bm.ayahNumber)}
                      </span>
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        (صفحة {toArabicDigits(bm.page)})
                      </span>
                    </div>
                    <p className="font-quran text-base truncate mt-1" style={{ color: 'var(--text-primary)' }}>
                      {bm.ayahSnippet}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => {
                        onJumpToBookmark(bm.surahNumber, bm.ayahNumber);
                        onClose();
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold border cursor-pointer"
                      style={{
                        backgroundColor: 'var(--bg-primary)',
                        borderColor: 'var(--border-gold)',
                      }}
                    >
                      فتح
                    </button>
                    <button
                      onClick={() => onRemoveSavedBookmark(bm.surahNumber, bm.ayahNumber)}
                      className="p-1.5 rounded-lg text-[#B8332A] hover:bg-[#B8332A]/10 transition-colors cursor-pointer"
                      title="حذف العلامة"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs py-4 text-center rounded-xl border" style={{ borderColor: 'var(--border-gold)', color: 'var(--text-muted)' }}>
              يمكنك حفظ آياتك المفضلة للتدبر والمراجعة بالضغط على الآية واختيار «إضافة للمفضلة».
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
