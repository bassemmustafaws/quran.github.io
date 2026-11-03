import React, { useState } from 'react';
import { X, Copy, Check, Code2, Sparkles, CheckCircle2, Layers } from 'lucide-react';
import { FAMOUS_RECITERS } from '../data/quranData';

interface BloggerEmbedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BloggerEmbedModal: React.FC<BloggerEmbedModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [defaultTheme, setDefaultTheme] = useState<'light' | 'dark'>('light');
  const [defaultReciter, setDefaultReciter] = useState<string>('Alafasy_128kbps');
  const [hideBloggerSidebar, setHideBloggerSidebar] = useState<boolean>(true);

  if (!isOpen) return null;

  const generateStandaloneBloggerCode = () => {
    const sidebarResetCss = hideBloggerSidebar
      ? `
/* توسيع عرض صفحة القرآن وإخفاء الشريط الجانبي في قوالب بلوجر */
.sidebar-wrapper, #sidebar-wrapper, aside.sidebar, .blog-sidebar { display: none !important; }
.main-wrapper, #main-wrapper, .post-body, .entry-content, .item-post { width: 100% !important; max-width: 100% !important; float: none !important; margin: 0 auto !important; }
`
      : '';

    return `<!-- ====== بداية كود صفحة القرآن الكريم الشاملة لمدونة بلوجر (نور المصحف) ====== -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Amiri+Quran&family=Amiri:wght@400;700&family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">

<style>
${sidebarResetCss}
#blogger-quran-app {
  --bq-bg: ${defaultTheme === 'dark' ? '#0E1512' : '#FBF8F1'};
  --bq-card: ${defaultTheme === 'dark' ? '#15201B' : '#F4EFE4'};
  --bq-text: ${defaultTheme === 'dark' ? '#EFECE6' : '#181A18'};
  --bq-muted: ${defaultTheme === 'dark' ? '#9BA8A1' : '#525852'};
  --bq-emerald: ${defaultTheme === 'dark' ? '#229977' : '#0D5C46'};
  --bq-gold: ${defaultTheme === 'dark' ? '#D9B146' : '#C59B27'};
  --bq-ruby: #B8332A;
  --bq-border: ${defaultTheme === 'dark' ? '#24332C' : '#E5DEC9'};
  --bq-font-size: 30px;
  direction: rtl;
  text-align: right;
  font-family: 'Cairo', sans-serif;
  background: var(--bq-bg);
  color: var(--bq-text);
  border: 2px solid var(--bq-gold);
  border-radius: 18px;
  padding: 18px;
  margin: 15px auto;
  max-width: 1120px;
  box-shadow: 0 14px 40px rgba(0,0,0,0.08);
  box-sizing: border-box;
}
#blogger-quran-app * { box-sizing: border-box; }
.bq-topbar {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  background: var(--bq-card);
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid var(--bq-border);
  margin-bottom: 16px;
}
.bq-bookmark-btn {
  background: linear-gradient(135deg, var(--bq-emerald), #083d2e);
  color: #fff;
  border: 1px solid var(--bq-gold);
  padding: 8px 14px;
  border-radius: 999px;
  cursor: pointer;
  font-family: 'Cairo', sans-serif;
  font-weight: 700;
  font-size: 13px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.bq-controls { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
.bq-btn, .bq-select, .bq-search {
  background: var(--bq-bg);
  color: var(--bq-text);
  border: 1px solid var(--bq-border);
  padding: 7px 12px;
  border-radius: 9px;
  font-family: 'Cairo', sans-serif;
  font-size: 13px;
  cursor: pointer;
}
.bq-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 18px;
}
@media (max-width: 820px) {
  .bq-layout { grid-template-columns: 1fr; }
}
.bq-sidebar {
  background: var(--bq-card);
  border: 1px solid var(--bq-border);
  border-radius: 14px;
  padding: 12px;
  max-height: 680px;
  display: flex;
  flex-direction: column;
}
.bq-surah-list {
  overflow-y: auto;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.bq-surah-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 9px 11px;
  border-radius: 10px;
  cursor: pointer;
  border: 1px solid transparent;
  transition: 0.2s;
}
.bq-surah-item:hover, .bq-surah-item.active {
  background: rgba(197, 155, 39, 0.15);
  border-color: var(--bq-gold);
}
.bq-mushaf {
  background: var(--bq-bg);
  border: 2px double var(--bq-gold);
  border-radius: 16px;
  padding: 24px 20px;
  min-height: 550px;
}
.bq-surah-banner {
  text-align: center;
  background: var(--bq-card);
  border: 1px solid var(--bq-gold);
  border-radius: 14px;
  padding: 16px;
  margin-bottom: 20px;
}
.bq-surah-banner h2 {
  font-family: 'Amiri', serif;
  font-size: 32px;
  margin: 0 0 6px 0;
  color: var(--bq-emerald);
}
.bq-basmalah {
  text-align: center;
  font-family: 'Amiri Quran', 'Amiri', serif;
  font-size: 28px;
  color: var(--bq-emerald);
  margin: 14px 0 24px;
}
.bq-verses {
  font-family: 'Amiri Quran', 'Amiri', serif;
  font-size: var(--bq-font-size);
  line-height: 2.35;
  text-align: justify;
  direction: rtl;
}
.bq-ayah {
  display: inline;
  padding: 2px 5px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;
}
.bq-ayah:hover { background: rgba(197, 155, 39, 0.14); }
.bq-ayah.playing { background: rgba(197, 155, 39, 0.25); box-shadow: inset -3px 0 0 var(--bq-gold); }
.bq-ayah.saved { background: rgba(184, 51, 42, 0.14); box-shadow: inset -3px 0 0 var(--bq-ruby); }
.bq-ayah-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: 'Amiri', serif;
  font-size: 0.68em;
  color: var(--bq-gold);
  margin: 0 6px;
  border: 1px solid var(--bq-gold);
  border-radius: 50%;
  width: 1.6em;
  height: 1.6em;
}
.bq-audio-bar {
  margin-top: 18px;
  background: var(--bq-card);
  border: 1px solid var(--bq-gold);
  border-radius: 14px;
  padding: 12px 16px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
</style>

<div id="blogger-quran-app">
  <div class="bq-topbar">
    <div style="display:flex;align-items:center;gap:10px;">
      <strong style="font-size:18px;color:var(--bq-emerald);">۞ المصحف الشريف</strong>
      <button id="bq-resume-btn" class="bq-bookmark-btn" style="display:none;" onclick="window.bqResumeBookmark()">
        🔖 متابعة القراءة: <span id="bq-resume-label"></span>
      </button>
    </div>
    <div class="bq-controls">
      <label style="font-size:12px;">القارئ:</label>
      <select id="bq-reciter" class="bq-select" onchange="window.bqChangeReciter(this.value)">
        <option value="Alafasy_128kbps" ${defaultReciter === 'Alafasy_128kbps' ? 'selected' : ''}>مشاري راشد العفاسي</option>
        <option value="Abdul_Basit_Murattal_192kbps" ${defaultReciter === 'Abdul_Basit_Murattal_192kbps' ? 'selected' : ''}>عبد الباسط عبد الصمد</option>
        <option value="MaherAlMuaiqly128kbps" ${defaultReciter === 'MaherAlMuaiqly128kbps' ? 'selected' : ''}>ماهر المعيقلي</option>
        <option value="Minshawy_Murattal_128kbps" ${defaultReciter === 'Minshawy_Murattal_128kbps' ? 'selected' : ''}>محمد صديق المنشاوي</option>
        <option value="Yasser_Ad-Dussary_128kbps" ${defaultReciter === 'Yasser_Ad-Dussary_128kbps' ? 'selected' : ''}>ياسر الدوسري</option>
        <option value="Husary_128kbps" ${defaultReciter === 'Husary_128kbps' ? 'selected' : ''}>محمود خليل الحصري</option>
        <option value="Ghamadi_40kbps" ${defaultReciter === 'Ghamadi_40kbps' ? 'selected' : ''}>سعد الغامدي</option>
        <option value="Saood_ash-Shuraym_128kbps" ${defaultReciter === 'Saood_ash-Shuraym_128kbps' ? 'selected' : ''}>سعود الشريم</option>
      </select>
      <button class="bq-btn" onclick="window.bqFont(2)">أ+</button>
      <button class="bq-btn" onclick="window.bqFont(-2)">أ-</button>
      <button class="bq-btn" onclick="window.bqToggleTheme()">🌙 / ☀️</button>
    </div>
  </div>

  <div class="bq-layout">
    <div class="bq-sidebar">
      <input type="text" id="bq-search" class="bq-search" style="width:100%;" placeholder="ابحث باسم السورة أو رقمها..." oninput="window.bqFilterSurahs(this.value)">
      <div id="bq-surah-list" class="bq-surah-list"></div>
    </div>

    <div>
      <div class="bq-mushaf">
        <div class="bq-surah-banner">
          <h2 id="bq-surah-title">سُورَةُ ٱلْفَاتِحَةِ</h2>
          <div id="bq-surah-meta" style="font-size:13px;color:var(--bq-muted);">مكية • ٧ آيات •اضغط على أي آية للاستماع إليها أو حفظ علامة القراءة</div>
        </div>
        <div id="bq-basmalah" class="bq-basmalah">بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</div>
        <div id="bq-verses" class="bq-verses">جاري تحميل الآيات الكريمة...</div>
      </div>

      <div class="bq-audio-bar">
        <div>
          <strong id="bq-now-playing" style="font-size:14px;">اضغط على أي آية للتشغيل أو الحفظ</strong>
          <div style="font-size:12px;color:var(--bq-muted);">انقر مرة للاستماع وحفظ مكان القراءة تلقائياً</div>
        </div>
        <div style="display:flex;gap:8px;align-items:center;">
          <button class="bq-btn" onclick="window.bqPlayFullSurah()">▶ تشغيل السورة</button>
          <button class="bq-btn" onclick="window.bqStopAudio()">⏹ إيقاف</button>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
(function(){
  var surahs = [];
  var currentSurah = 1;
  var currentAyahs = [];
  var playingAyah = null;
  var fontSize = 30;
  var isDark = ${defaultTheme === 'dark' ? 'true' : 'false'};
  var reciter = "${defaultReciter}";
  var audio = new Audio();
  var BOOKMARK_KEY = "blogger_quran_bookmark_v1";

  function toAr(n){ return String(n).replace(/\\d/g, function(d){ return "٠١٢٣٤٥٦٧٨٩"[d]; }); }

  function loadBookmarkUI(){
    try {
      var saved = JSON.parse(localStorage.getItem(BOOKMARK_KEY));
      var btn = document.getElementById("bq-resume-btn");
      var lbl = document.getElementById("bq-resume-label");
      if(saved && saved.surah && saved.ayah){
        btn.style.display = "inline-flex";
        lbl.textContent = saved.surahName + " - آية " + toAr(saved.ayah);
      }
    } catch(e){}
  }

  window.bqSaveBookmark = function(surahNum, surahName, ayahNum){
    localStorage.setItem(BOOKMARK_KEY, JSON.stringify({ surah: surahNum, surahName: surahName, ayah: ayahNum }));
    loadBookmarkUI();
    renderVerses();
  };

  window.bqResumeBookmark = function(){
    try {
      var saved = JSON.parse(localStorage.getItem(BOOKMARK_KEY));
      if(saved && saved.surah){
        window.bqLoadSurah(saved.surah, saved.ayah);
      }
    } catch(e){}
  };

  window.bqFont = function(delta){
    fontSize = Math.max(22, Math.min(46, fontSize + delta));
    document.getElementById("blogger-quran-app").style.setProperty("--bq-font-size", fontSize + "px");
  };

  window.bqToggleTheme = function(){
    isDark = !isDark;
    var root = document.getElementById("blogger-quran-app");
    root.style.setProperty("--bq-bg", isDark ? "#0E1512" : "#FBF8F1");
    root.style.setProperty("--bq-card", isDark ? "#15201B" : "#F4EFE4");
    root.style.setProperty("--bq-text", isDark ? "#EFECE6" : "#181A18");
    root.style.setProperty("--bq-muted", isDark ? "#9BA8A1" : "#525852");
    root.style.setProperty("--bq-border", isDark ? "#24332C" : "#E5DEC9");
  };

  window.bqChangeReciter = function(val){
    reciter = val;
    if(playingAyah) playAyahAudio(playingAyah);
  };

  function playAyahAudio(ayahInSurah){
    playingAyah = ayahInSurah;
    var s = String(currentSurah).padStart(3, "0");
    var a = String(ayahInSurah).padStart(3, "0");
    audio.src = "https://everyayah.com/data/" + reciter + "/" + s + a + ".mp3";
    audio.play();
    document.getElementById("bq-now-playing").textContent = "يُتلى الآن: الآية " + toAr(ayahInSurah);
    renderVerses();
    var el = document.getElementById("bq-ayah-" + ayahInSurah);
    if(el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  audio.onended = function(){
    if(playingAyah && playingAyah < currentAyahs.length){
      playAyahAudio(playingAyah + 1);
    } else {
      playingAyah = null;
      renderVerses();
    }
  };

  window.bqPlayFullSurah = function(){ playAyahAudio(1); };
  window.bqStopAudio = function(){ audio.pause(); playingAyah = null; renderVerses(); };

  function renderVerses(){
    var container = document.getElementById("bq-verses");
    var saved = null;
    try { saved = JSON.parse(localStorage.getItem(BOOKMARK_KEY)); } catch(e){}
    var sObj = surahs.find(function(x){ return x.number === currentSurah; }) || { name: "الفاتحة" };

    container.innerHTML = currentAyahs.map(function(a){
      var txt = a.text;
      if(currentSurah !== 1 && currentSurah !== 9 && a.numberInSurah === 1){
        txt = txt.replace(/^بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ\\s*/, "");
      }
      var isSaved = saved && saved.surah === currentSurah && saved.ayah === a.numberInSurah;
      var isPlay = playingAyah === a.numberInSurah;
      var cls = "bq-ayah" + (isPlay ? " playing" : "") + (isSaved ? " saved" : "");
      return '<span id="bq-ayah-' + a.numberInSurah + '" class="' + cls + '" title="اضغط لحفظ العلامة والاستماع" onclick="window.bqAyahClick(' + a.numberInSurah + ')">' +
        txt + (isSaved ? ' 🔖' : '') +
        '<span class="bq-ayah-num">' + toAr(a.numberInSurah) + '</span></span> ';
    }).join("");
  }

  window.bqAyahClick = function(ayahNum){
    var sObj = surahs.find(function(x){ return x.number === currentSurah; }) || { name: "السورة" };
    window.bqSaveBookmark(currentSurah, sObj.name, ayahNum);
    playAyahAudio(ayahNum);
  };

  window.bqLoadSurah = function(num, scrollToAyah){
    currentSurah = num;
    playingAyah = null;
    audio.pause();
    document.getElementById("bq-basmalah").style.display = (num === 1 || num === 9) ? "none" : "block";
    document.getElementById("bq-verses").innerHTML = "جاري تحميل السورة الكريمة...";
    fetch("https://api.alquran.cloud/v1/surah/" + num + "/quran-uthmani")
      .then(function(r){ return r.json(); })
      .then(function(res){
        if(res && res.data){
          currentAyahs = res.data.ayahs;
          document.getElementById("bq-surah-title").textContent = res.data.name;
          var rev = res.data.revelationType === "Meccan" ? "مكية" : "مدنية";
          document.getElementById("bq-surah-meta").textContent = rev + " • عدد آياتها " + toAr(res.data.numberOfAyahs) + " • اضغط على أي آية لحفظ مكان القراءة والاستماع";
          renderVerses();
          renderSurahList(document.getElementById("bq-search").value);
          if(scrollToAyah){
            setTimeout(function(){
              var target = document.getElementById("bq-ayah-" + scrollToAyah);
              if(target) target.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 200);
          }
        }
      });
  };

  function renderSurahList(q){
    var list = document.getElementById("bq-surah-list");
    var cleanQ = (q || "").trim();
    list.innerHTML = surahs.filter(function(s){
      return !cleanQ || s.name.indexOf(cleanQ) !== -1 || String(s.number) === cleanQ;
    }).map(function(s){
      var active = s.number === currentSurah ? " active" : "";
      var rev = s.revelationType === "Meccan" ? "مكية" : "مدنية";
      return '<div class="bq-surah-item' + active + '" onclick="window.bqLoadSurah(' + s.number + ')">' +
        '<div><strong>' + toAr(s.number) + '. ' + s.name + '</strong></div>' +
        '<span style="font-size:12px;color:var(--bq-muted);">' + rev + ' (' + toAr(s.numberOfAyahs) + ')</span>' +
      '</div>';
    }).join("");
  }

  window.bqFilterSurahs = function(val){ renderSurahList(val); };

  fetch("https://api.alquran.cloud/v1/surah")
    .then(function(r){ return r.json(); })
    .then(function(res){
      if(res && res.data){
        surahs = res.data;
        renderSurahList("");
      }
    });

  loadBookmarkUI();
  window.bqLoadSurah(1);
})();
</script>
<!-- ====== نهاية كود صفحة القرآن الكريم لمدونة بلوجر ====== -->`;
  };

  const handleCopy = async () => {
    const code = generateStandaloneBloggerCode();
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border p-5 sm:p-7 shadow-2xl"
        style={{
          backgroundColor: 'var(--bg-primary)',
          borderColor: 'var(--accent-gold)',
          color: 'var(--text-primary)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b" style={{ borderColor: 'var(--border-gold)' }}>
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{
                backgroundColor: 'var(--accent-emerald)',
                color: '#FBF8F1',
              }}
            >
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2">
                <span>كود صفحة القرآن الكريم الجاهز لمدونة بلوجر (Blogger)</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#C59B27]/20 text-[#C59B27] font-semibold">
                  ملف واحد متكامل
                </span>
              </h2>
              <p className="text-xs sm:text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                انسخ الكود والصقه مباشرة في صفحة جديدة بمدونتك على بلوجر بدون الحاجة لأي استضافة خارجية
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-black/5 transition-colors"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Customization Controls before copying */}
        <div className="my-5 grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-gold)' }}>
          <div>
            <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
              المظهر الافتراضي للصفحة:
            </label>
            <select
              value={defaultTheme}
              onChange={(e) => setDefaultTheme(e.target.value as 'light' | 'dark')}
              className="w-full px-3 py-2 rounded-lg text-sm border font-cairo outline-none"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-gold)',
                color: 'var(--text-primary)',
              }}
            >
              <option value="light">وضع الرق الدافئ (نهاري)</option>
              <option value="dark">وضع التهجد (ليلي مريح للعين)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
              القارئ الافتراضي عند فتح الصفحة:
            </label>
            <select
              value={defaultReciter}
              onChange={(e) => setDefaultReciter(e.target.value)}
              className="w-full px-3 py-2 rounded-lg text-sm border font-cairo outline-none"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-gold)',
                color: 'var(--text-primary)',
              }}
            >
              {FAMOUS_RECITERS.map((r) => (
                <option key={r.id} value={r.everyAyahFolder}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col justify-center">
            <label className="flex items-center gap-2.5 cursor-pointer text-xs sm:text-sm font-semibold select-none pt-3">
              <input
                type="checkbox"
                checked={hideBloggerSidebar}
                onChange={(e) => setHideBloggerSidebar(e.target.checked)}
                className="w-4 h-4 accent-[#0D5C46] rounded"
              />
              <span>إخفاء الشريط الجانبي لبلوجر (عرض كامل)</span>
            </label>
          </div>
        </div>

        {/* 4 Simple Steps for Blogger */}
        <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm">
          <div className="flex items-start gap-2.5 p-3 rounded-xl border" style={{ borderColor: 'var(--border-gold)' }}>
            <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-[#0D5C46]" />
            <span>
              <strong>١. افتح لوحة تحكم بلوجر:</strong> انتقل إلى قسم <strong>«الصفحات» (Pages)</strong> ثم اضغط على <strong>«صفحة جديدة»</strong>.
            </span>
          </div>
          <div className="flex items-start gap-2.5 p-3 rounded-xl border" style={{ borderColor: 'var(--border-gold)' }}>
            <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-[#0D5C46]" />
            <span>
              <strong>٢. حوّل المحرر إلى عرض HTML:</strong> من أعلى يمين محرر بلوجر، اضغط على أيقونة القلم واختر <strong>«عرض HTML»</strong>.
            </span>
          </div>
          <div className="flex items-start gap-2.5 p-3 rounded-xl border" style={{ borderColor: 'var(--border-gold)' }}>
            <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-[#0D5C46]" />
            <span>
              <strong>٣. الصق الكود بالكامل:</strong> اضغط على زر <strong>«نسخ كود بلوجر الكامل»</strong> بالأسفل والصقه في الصفحة.
            </span>
          </div>
          <div className="flex items-start gap-2.5 p-3 rounded-xl border" style={{ borderColor: 'var(--border-gold)' }}>
            <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-[#0D5C46]" />
            <span>
              <strong>٤. انشر الصفحة:</strong> اكتب عنوان الصفحة <strong>«القرآن الكريم»</strong> واضغط على <strong>«نشر»</strong> ومبارك عليك صدقة جارية في مدونتك!
            </span>
          </div>
        </div>

        {/* Code Preview & Copy Button */}
        <div className="relative">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
              <Layers className="w-4 h-4 text-[#C59B27]" />
              كود HTML + CSS + JavaScript المدمج (يدعم الـ 114 سورة + حفظ المكان + أشهر القراء):
            </span>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white shadow-md transition-all hover:opacity-95 active:scale-95 cursor-pointer"
              style={{
                backgroundColor: copied ? '#15803D' : 'var(--accent-emerald)',
              }}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>تم نسخ الكود بنجاح! الصقه في بلوجر</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>نسخ كود بلوجر الكامل</span>
                </>
              )}
            </button>
          </div>

          <pre
            dir="ltr"
            className="w-full h-56 overflow-y-auto p-4 rounded-xl text-xs font-mono-num border select-all"
            style={{
              backgroundColor: '#0E1512',
              color: '#EFECE6',
              borderColor: 'var(--border-gold)',
            }}
          >
            {generateStandaloneBloggerCode()}
          </pre>
        </div>

        {/* Footer */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pt-4 border-t" style={{ borderColor: 'var(--border-gold)' }}>
          <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
            <Sparkles className="w-4 h-4 text-[#C59B27]" />
            <span>يعمل الكود تلقائياً مع جميع قوالب بلوجر (سيو بلس، سكويز، ناز، وغيرها) ويدعم الهواتف والكمبيوتر.</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-sm font-bold border transition-colors cursor-pointer"
            style={{
              borderColor: 'var(--border-gold)',
              backgroundColor: 'var(--bg-elevated)',
            }}
          >
            العودة لتصفح المصحف الشريف
          </button>
        </div>
      </div>
    </div>
  );
};
