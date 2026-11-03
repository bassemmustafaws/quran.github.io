export interface SurahMeta {
  number: number;
  name: string;
  calligraphicName: string;
  englishName: string;
  revelationType: 'Meccan' | 'Medinan';
  revelationArabic: 'مكية' | 'مدنية';
  numberOfAyahs: number;
  juz: number;
  page: number;
}

export interface AyahData {
  number: number; // Global ayah number (1..6236)
  numberInSurah: number;
  text: string;
  juz: number;
  page: number;
  hizbQuarter?: number;
  sajda?: boolean | object;
}

export interface Reciter {
  id: string;
  name: string;
  shortName: string;
  title: string;
  style: string;
  country: string;
  monogram: string;
  everyAyahFolder: string;
  islamicNetworkId: string;
  fullSurahServer: string; // mp3quran.net server for full surah download/stream
}

export interface BookmarkRecord {
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
  ayahSnippet: string;
  page: number;
  juz: number;
  timestamp: number;
  note?: string;
}

export const FAMOUS_RECITERS: Reciter[] = [
  {
    id: 'alafasy',
    name: 'مشاري راشد العفاسي',
    shortName: 'مشاري العفاسي',
    title: 'إمام المسجد الكبير بالكويت',
    style: 'تلاوة مرتلة ندية خاشعة',
    country: 'الكويت',
    monogram: 'مع',
    everyAyahFolder: 'Alafasy_128kbps',
    islamicNetworkId: 'ar.alafasy',
    fullSurahServer: 'https://server8.mp3quran.net/afs',
  },
  {
    id: 'abdulbasit',
    name: 'عبد الباسط عبد الصمد',
    shortName: 'عبد الباسط',
    title: 'صوت مكة والمدرسة المصرية الخالدة',
    style: 'المصحف المرتل • رواية حفص',
    country: 'مصر',
    monogram: 'عب',
    everyAyahFolder: 'Abdul_Basit_Murattal_192kbps',
    islamicNetworkId: 'ar.abdulbasitmurattal',
    fullSurahServer: 'https://server7.mp3quran.net/basit',
  },
  {
    id: 'muaiqly',
    name: 'ماهر بن حمد المعيقلي',
    shortName: 'ماهر المعيقلي',
    title: 'إمام وخطيب المسجد الحرام بمكة المكرمة',
    style: 'تلاوة حجازية مرتلة مؤثرة',
    country: 'السعودية',
    monogram: 'مم',
    everyAyahFolder: 'MaherAlMuaiqly128kbps',
    islamicNetworkId: 'ar.mahermuaiqly',
    fullSurahServer: 'https://server12.mp3quran.net/maher',
  },
  {
    id: 'minshawi',
    name: 'محمد صديق المنشاوي',
    shortName: 'المنشاوي',
    title: 'الصوت الباكي وأحد أعلام التلاوة',
    style: 'المصحف المرتل • خشوع وتدبر',
    country: 'مصر',
    monogram: 'من',
    everyAyahFolder: 'Minshawy_Murattal_128kbps',
    islamicNetworkId: 'ar.minshawi',
    fullSurahServer: 'https://server10.mp3quran.net/minsh',
  },
  {
    id: 'dosari',
    name: 'ياسر بن راشد الدوسري',
    shortName: 'ياسر الدوسري',
    title: 'إمام وخطيب المسجد الحرام',
    style: 'تلاوة خاشعة تحرك القلوب',
    country: 'السعودية',
    monogram: 'يد',
    everyAyahFolder: 'Yasser_Ad-Dussary_128kbps',
    islamicNetworkId: 'ar.yasserdossari',
    fullSurahServer: 'https://server11.mp3quran.net/yasser',
  },
  {
    id: 'husary',
    name: 'محمود خليل الحصري',
    shortName: 'الحصري',
    title: 'شيخ عموم المقارئ المصرية',
    style: 'المصحف المرتل • إتقان أحكام التجويد',
    country: 'مصر',
    monogram: 'حص',
    everyAyahFolder: 'Husary_128kbps',
    islamicNetworkId: 'ar.husary',
    fullSurahServer: 'https://server13.mp3quran.net/husr',
  },
  {
    id: 'ghamdi',
    name: 'سعد بن سعيد الغامدي',
    shortName: 'سعد الغامدي',
    title: 'إمام المسجد النبوي الشريف سابقاً',
    style: 'تلاوة هادئة ومرتلة',
    country: 'السعودية',
    monogram: 'سغ',
    everyAyahFolder: 'Ghamadi_40kbps',
    islamicNetworkId: 'ar.saoodshuraym',
    fullSurahServer: 'https://server7.mp3quran.net/s_gmd',
  },
  {
    id: 'shuraim',
    name: 'سعود بن إبراهيم الشريم',
    shortName: 'سعود الشريم',
    title: 'إمام وخطيب المسجد الحرام',
    style: 'ترتيل الحرم المكي الشريف',
    country: 'السعودية',
    monogram: 'سش',
    everyAyahFolder: 'Saood_ash-Shuraym_128kbps',
    islamicNetworkId: 'ar.saoodshuraym',
    fullSurahServer: 'https://server7.mp3quran.net/shur',
  },
];

export const QUICK_SURAHS = [
  { number: 1, label: 'الفاتحة' },
  { number: 2, label: 'البقرة' },
  { number: 18, label: 'الكهف' },
  { number: 36, label: 'يس' },
  { number: 55, label: 'الرحمن' },
  { number: 56, label: 'الواقعة' },
  { number: 67, label: 'الملك' },
  { number: 112, label: 'الإخلاص' },
];

export const ALL_SURAHS: SurahMeta[] = [
  { number: 1, name: 'الفاتحة', calligraphicName: 'سُورَةُ ٱلْفَاتِحَةِ', englishName: 'Al-Faatiha', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 7, juz: 1, page: 1 },
  { number: 2, name: 'البقرة', calligraphicName: 'سُورَةُ ٱلْبَقَرَةِ', englishName: 'Al-Baqara', revelationType: 'Medinan', revelationArabic: 'مدنية', numberOfAyahs: 286, juz: 1, page: 2 },
  { number: 3, name: 'آل عمران', calligraphicName: 'سُورَةُ آلِ عِمْرَانَ', englishName: 'Aal-i-Imraan', revelationType: 'Medinan', revelationArabic: 'مدنية', numberOfAyahs: 200, juz: 3, page: 50 },
  { number: 4, name: 'النساء', calligraphicName: 'سُورَةُ ٱلنِّسَاءِ', englishName: 'An-Nisaa', revelationType: 'Medinan', revelationArabic: 'مدنية', numberOfAyahs: 176, juz: 4, page: 77 },
  { number: 5, name: 'المائدة', calligraphicName: 'سُورَةُ ٱلْمَائِدَةِ', englishName: 'Al-Maaida', revelationType: 'Medinan', revelationArabic: 'مدنية', numberOfAyahs: 120, juz: 6, page: 106 },
  { number: 6, name: 'الأنعام', calligraphicName: 'سُورَةُ ٱلْأَنْعَامِ', englishName: 'Al-An\'aam', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 165, juz: 7, page: 128 },
  { number: 7, name: 'الأعراف', calligraphicName: 'سُورَةُ ٱلْأَعْرَافِ', englishName: 'Al-A\'raaf', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 206, juz: 8, page: 151 },
  { number: 8, name: 'الأنفال', calligraphicName: 'سُورَةُ ٱلْأَنْفَالِ', englishName: 'Al-Anfaal', revelationType: 'Medinan', revelationArabic: 'مدنية', numberOfAyahs: 75, juz: 9, page: 177 },
  { number: 9, name: 'التوبة', calligraphicName: 'سُورَةُ ٱلتَّوْبَةِ', englishName: 'At-Tawba', revelationType: 'Medinan', revelationArabic: 'مدنية', numberOfAyahs: 129, juz: 10, page: 187 },
  { number: 10, name: 'يونس', calligraphicName: 'سُورَةُ يُونُسَ', englishName: 'Yunus', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 109, juz: 11, page: 208 },
  { number: 11, name: 'هود', calligraphicName: 'سُورَةُ هُودٍ', englishName: 'Hud', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 123, juz: 11, page: 221 },
  { number: 12, name: 'يوسف', calligraphicName: 'سُورَةُ يُوسُفَ', englishName: 'Yusuf', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 111, juz: 12, page: 235 },
  { number: 13, name: 'الرعد', calligraphicName: 'سُورَةُ ٱلرَّعْدِ', englishName: 'Ar-Ra\'d', revelationType: 'Medinan', revelationArabic: 'مدنية', numberOfAyahs: 43, juz: 13, page: 249 },
  { number: 14, name: 'إبراهيم', calligraphicName: 'سُورَةُ إِبْرَاهِيمَ', englishName: 'Ibrahim', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 52, juz: 13, page: 255 },
  { number: 15, name: 'الحجر', calligraphicName: 'سُورَةُ ٱلْحِجْرِ', englishName: 'Al-Hijr', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 99, juz: 14, page: 262 },
  { number: 16, name: 'النحل', calligraphicName: 'سُورَةُ ٱلنَّحْلِ', englishName: 'An-Nahl', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 128, juz: 14, page: 267 },
  { number: 17, name: 'الإسراء', calligraphicName: 'سُورَةُ ٱلْإِسْرَاءِ', englishName: 'Al-Israa', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 111, juz: 15, page: 282 },
  { number: 18, name: 'الكهف', calligraphicName: 'سُورَةُ ٱلْكَهْفِ', englishName: 'Al-Kahf', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 110, juz: 15, page: 293 },
  { number: 19, name: 'مريم', calligraphicName: 'سُورَةُ مَرْيَمَ', englishName: 'Maryam', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 98, juz: 16, page: 305 },
  { number: 20, name: 'طه', calligraphicName: 'سُورَةُ طه', englishName: 'Taa-Haa', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 135, juz: 16, page: 312 },
  { number: 21, name: 'الأنبياء', calligraphicName: 'سُورَةُ ٱلْأَنْبِيَاءِ', englishName: 'Al-Anbiyaa', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 112, juz: 17, page: 322 },
  { number: 22, name: 'الحج', calligraphicName: 'سُورَةُ ٱلْحَجِّ', englishName: 'Al-Hajj', revelationType: 'Medinan', revelationArabic: 'مدنية', numberOfAyahs: 78, juz: 17, page: 332 },
  { number: 23, name: 'المؤمنون', calligraphicName: 'سُورَةُ ٱلْمُؤْمِنُونَ', englishName: 'Al-Muminoon', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 118, juz: 18, page: 342 },
  { number: 24, name: 'النور', calligraphicName: 'سُورَةُ ٱلنُّورِ', englishName: 'An-Noor', revelationType: 'Medinan', revelationArabic: 'مدنية', numberOfAyahs: 64, juz: 18, page: 350 },
  { number: 25, name: 'الفرقان', calligraphicName: 'سُورَةُ ٱلْفُرْقَانِ', englishName: 'Al-Furqaan', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 77, juz: 18, page: 359 },
  { number: 26, name: 'الشعراء', calligraphicName: 'سُورَةُ ٱلشُّعَرَاءِ', englishName: 'Ash-Shu\'araa', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 227, juz: 19, page: 367 },
  { number: 27, name: 'النمل', calligraphicName: 'سُورَةُ ٱلنَّمْلِ', englishName: 'An-Naml', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 93, juz: 19, page: 377 },
  { number: 28, name: 'القصص', calligraphicName: 'سُورَةُ ٱلْقَصَصِ', englishName: 'Al-Qasas', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 88, juz: 20, page: 385 },
  { number: 29, name: 'العنكبوت', calligraphicName: 'سُورَةُ ٱلْعَنْكَبُوتِ', englishName: 'Al-Ankaboot', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 69, juz: 20, page: 396 },
  { number: 30, name: 'الروم', calligraphicName: 'سُورَةُ ٱلرُّومِ', englishName: 'Ar-Room', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 60, juz: 21, page: 404 },
  { number: 31, name: 'لقمان', calligraphicName: 'سُورَةُ لُقْمَانَ', englishName: 'Luqman', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 34, juz: 21, page: 411 },
  { number: 32, name: 'السجدة', calligraphicName: 'سُورَةُ ٱلسَّجْدَةِ', englishName: 'As-Sajda', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 30, juz: 21, page: 415 },
  { number: 33, name: 'الأحزاب', calligraphicName: 'سُورَةُ ٱلْأَحْزَابِ', englishName: 'Al-Ahzaab', revelationType: 'Medinan', revelationArabic: 'مدنية', numberOfAyahs: 73, juz: 21, page: 418 },
  { number: 34, name: 'سبأ', calligraphicName: 'سُورَةُ سَبَإٍ', englishName: 'Saba', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 54, juz: 22, page: 428 },
  { number: 35, name: 'فاطر', calligraphicName: 'سُورَةُ فَاطِرٍ', englishName: 'Faatir', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 45, juz: 22, page: 434 },
  { number: 36, name: 'يس', calligraphicName: 'سُورَةُ يسٓ', englishName: 'Yaseen', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 83, juz: 22, page: 440 },
  { number: 37, name: 'الصافات', calligraphicName: 'سُورَةُ ٱلصَّافَّاتِ', englishName: 'As-Saaffaat', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 182, juz: 23, page: 446 },
  { number: 38, name: 'ص', calligraphicName: 'سُورَةُ صٓ', englishName: 'Saad', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 88, juz: 23, page: 453 },
  { number: 39, name: 'الزمر', calligraphicName: 'سُورَةُ ٱلزُّمَرِ', englishName: 'Az-Zumar', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 75, juz: 23, page: 458 },
  { number: 40, name: 'غافر', calligraphicName: 'سُورَةُ غَافِرٍ', englishName: 'Ghafir', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 85, juz: 24, page: 467 },
  { number: 41, name: 'فصلت', calligraphicName: 'سُورَةُ فُصِّلَتْ', englishName: 'Fussilat', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 54, juz: 24, page: 477 },
  { number: 42, name: 'الشورى', calligraphicName: 'سُورَةُ ٱلشُّورَىٰ', englishName: 'Ash-Shura', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 53, juz: 25, page: 483 },
  { number: 43, name: 'الزخرف', calligraphicName: 'سُورَةُ ٱلزُّخْرُفِ', englishName: 'Az-Zukhruf', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 89, juz: 25, page: 489 },
  { number: 44, name: 'الدخان', calligraphicName: 'سُورَةُ ٱلدُّخَانِ', englishName: 'Ad-Dukhaan', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 59, juz: 25, page: 496 },
  { number: 45, name: 'الجاثية', calligraphicName: 'سُورَةُ ٱلْجَاثِيَةِ', englishName: 'Al-Jaathiya', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 37, juz: 25, page: 499 },
  { number: 46, name: 'الأحقاف', calligraphicName: 'سُورَةُ ٱلْأَحْقَافِ', englishName: 'Al-Ahqaf', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 35, juz: 26, page: 502 },
  { number: 47, name: 'محمد', calligraphicName: 'سُورَةُ مُحَمَّدٍ', englishName: 'Muhammad', revelationType: 'Medinan', revelationArabic: 'مدنية', numberOfAyahs: 38, juz: 26, page: 507 },
  { number: 48, name: 'الفتح', calligraphicName: 'سُورَةُ ٱلْفَتْحِ', englishName: 'Al-Fath', revelationType: 'Medinan', revelationArabic: 'مدنية', numberOfAyahs: 29, juz: 26, page: 511 },
  { number: 49, name: 'الحجرات', calligraphicName: 'سُورَةُ ٱلْحُجُرَاتِ', englishName: 'Al-Hujuraat', revelationType: 'Medinan', revelationArabic: 'مدنية', numberOfAyahs: 18, juz: 26, page: 515 },
  { number: 50, name: 'ق', calligraphicName: 'سُورَةُ قٓ', englishName: 'Qaaf', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 45, juz: 26, page: 518 },
  { number: 51, name: 'الذاريات', calligraphicName: 'سُورَةُ ٱلذَّارِيَاتِ', englishName: 'Adh-Dhaariyat', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 60, juz: 26, page: 520 },
  { number: 52, name: 'الطور', calligraphicName: 'سُورَةُ ٱلطُّورِ', englishName: 'At-Tur', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 49, juz: 27, page: 523 },
  { number: 53, name: 'النجم', calligraphicName: 'سُورَةُ ٱلنَّجْمِ', englishName: 'An-Najm', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 62, juz: 27, page: 526 },
  { number: 54, name: 'القمر', calligraphicName: 'سُورَةُ ٱلْقَمَرِ', englishName: 'Al-Qamar', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 55, juz: 27, page: 528 },
  { number: 55, name: 'الرحمن', calligraphicName: 'سُورَةُ ٱلرَّحْمَٰنِ', englishName: 'Ar-Rahmaan', revelationType: 'Medinan', revelationArabic: 'مدنية', numberOfAyahs: 78, juz: 27, page: 531 },
  { number: 56, name: 'الواقعة', calligraphicName: 'سُورَةُ ٱلْوَاقِعَةِ', englishName: 'Al-Waaqia', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 96, juz: 27, page: 534 },
  { number: 57, name: 'الحديد', calligraphicName: 'سُورَةُ ٱلْحَدِيدِ', englishName: 'Al-Hadid', revelationType: 'Medinan', revelationArabic: 'مدنية', numberOfAyahs: 29, juz: 27, page: 537 },
  { number: 58, name: 'المجادلة', calligraphicName: 'سُورَةُ ٱلْمُجَادَلَةِ', englishName: 'Al-Mujaadila', revelationType: 'Medinan', revelationArabic: 'مدنية', numberOfAyahs: 22, juz: 28, page: 542 },
  { number: 59, name: 'الحشر', calligraphicName: 'سُورَةُ ٱلْحَشْرِ', englishName: 'Al-Hashr', revelationType: 'Medinan', revelationArabic: 'مدنية', numberOfAyahs: 24, juz: 28, page: 545 },
  { number: 60, name: 'الممتحنة', calligraphicName: 'سُورَةُ ٱلْمُمْتَحَنَةِ', englishName: 'Al-Mumtahana', revelationType: 'Medinan', revelationArabic: 'مدنية', numberOfAyahs: 13, juz: 28, page: 549 },
  { number: 61, name: 'الصف', calligraphicName: 'سُورَةُ ٱلصَّفِّ', englishName: 'As-Saff', revelationType: 'Medinan', revelationArabic: 'مدنية', numberOfAyahs: 14, juz: 28, page: 551 },
  { number: 62, name: 'الجمعة', calligraphicName: 'سُورَةُ ٱلْجُمُعَةِ', englishName: 'Al-Jumu\'a', revelationType: 'Medinan', revelationArabic: 'مدنية', numberOfAyahs: 11, juz: 28, page: 553 },
  { number: 63, name: 'المنافقون', calligraphicName: 'سُورَةُ ٱلْمُنَافِقُونَ', englishName: 'Al-Munaafiqoon', revelationType: 'Medinan', revelationArabic: 'مدنية', numberOfAyahs: 11, juz: 28, page: 554 },
  { number: 64, name: 'التغابن', calligraphicName: 'سُورَةُ ٱلتَّغَابُنِ', englishName: 'At-Taghaabun', revelationType: 'Medinan', revelationArabic: 'مدنية', numberOfAyahs: 18, juz: 28, page: 556 },
  { number: 65, name: 'الطلاق', calligraphicName: 'سُورَةُ ٱلطَّلَاقِ', englishName: 'At-Talaaq', revelationType: 'Medinan', revelationArabic: 'مدنية', numberOfAyahs: 12, juz: 28, page: 558 },
  { number: 66, name: 'التحريم', calligraphicName: 'سُورَةُ ٱلتَّحْرِيمِ', englishName: 'At-Tahrim', revelationType: 'Medinan', revelationArabic: 'مدنية', numberOfAyahs: 12, juz: 28, page: 560 },
  { number: 67, name: 'الملك', calligraphicName: 'سُورَةُ ٱلْمُلْكِ', englishName: 'Al-Mulk', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 30, juz: 29, page: 562 },
  { number: 68, name: 'القلم', calligraphicName: 'سُورَةُ ٱلْقَلَمِ', englishName: 'Al-Qalam', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 52, juz: 29, page: 564 },
  { number: 69, name: 'الحاقة', calligraphicName: 'سُورَةُ ٱلْحَاقَّةِ', englishName: 'Al-Haaqqa', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 52, juz: 29, page: 566 },
  { number: 70, name: 'المعارج', calligraphicName: 'سُورَةُ ٱلْمَعَارِجِ', englishName: 'Al-Ma\'aarij', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 44, juz: 29, page: 568 },
  { number: 71, name: 'نوح', calligraphicName: 'سُورَةُ نُوحٍ', englishName: 'Nooh', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 28, juz: 29, page: 570 },
  { number: 72, name: 'الجن', calligraphicName: 'سُورَةُ ٱلْجِنِّ', englishName: 'Al-Jinn', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 28, juz: 29, page: 572 },
  { number: 73, name: 'المزمل', calligraphicName: 'سُورَةُ ٱلْمُزَّمِّلِ', englishName: 'Al-Muzzammil', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 20, juz: 29, page: 574 },
  { number: 74, name: 'المدثر', calligraphicName: 'سُورَةُ ٱلْمُدَّثِّرِ', englishName: 'Al-Muddaththir', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 56, juz: 29, page: 575 },
  { number: 75, name: 'القيامة', calligraphicName: 'سُورَةُ ٱلْقِيَامَةِ', englishName: 'Al-Qiyaama', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 40, juz: 29, page: 577 },
  { number: 76, name: 'الإنسان', calligraphicName: 'سُورَةُ ٱلْإِنْسَانِ', englishName: 'Al-Insaan', revelationType: 'Medinan', revelationArabic: 'مدنية', numberOfAyahs: 31, juz: 29, page: 578 },
  { number: 77, name: 'المرسلات', calligraphicName: 'سُورَةُ ٱلْمُرْسَلَاتِ', englishName: 'Al-Mursalaat', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 50, juz: 29, page: 580 },
  { number: 78, name: 'النبأ', calligraphicName: 'سُورَةُ ٱلنَّبَإِ', englishName: 'An-Naba', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 40, juz: 30, page: 582 },
  { number: 79, name: 'النازعات', calligraphicName: 'سُورَةُ ٱلنَّازِعَاتِ', englishName: 'An-Naazi\'aat', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 46, juz: 30, page: 583 },
  { number: 80, name: 'عبس', calligraphicName: 'سُورَةُ عَبَسَ', englishName: 'Abasa', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 42, juz: 30, page: 585 },
  { number: 81, name: 'التكوير', calligraphicName: 'سُورَةُ ٱلتَّكْوِيرِ', englishName: 'At-Takwir', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 29, juz: 30, page: 586 },
  { number: 82, name: 'الانفطار', calligraphicName: 'سُورَةُ ٱلِانْفِطَارِ', englishName: 'Al-Infitaar', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 19, juz: 30, page: 587 },
  { number: 83, name: 'المطففين', calligraphicName: 'سُورَةُ ٱلْمُطَفِّفِينَ', englishName: 'Al-Mutaffifin', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 36, juz: 30, page: 587 },
  { number: 84, name: 'الانشقاق', calligraphicName: 'سُورَةُ ٱلِانْشِقَاقِ', englishName: 'Al-Inshiqaaq', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 25, juz: 30, page: 589 },
  { number: 85, name: 'البروج', calligraphicName: 'سُورَةُ ٱلْبُرُوجِ', englishName: 'Al-Burooj', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 22, juz: 30, page: 590 },
  { number: 86, name: 'الطارق', calligraphicName: 'سُورَةُ ٱلطَّارِقِ', englishName: 'At-Taariq', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 17, juz: 30, page: 591 },
  { number: 87, name: 'الأعلى', calligraphicName: 'سُورَةُ ٱلْأَعْلَىٰ', englishName: 'Al-A\'laa', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 19, juz: 30, page: 591 },
  { number: 88, name: 'الغاشية', calligraphicName: 'سُورَةُ ٱلْغَاشِيَةِ', englishName: 'Al-Ghaashiya', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 26, juz: 30, page: 592 },
  { number: 89, name: 'الفجر', calligraphicName: 'سُورَةُ ٱلْفَجْرِ', englishName: 'Al-Fajr', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 30, juz: 30, page: 593 },
  { number: 90, name: 'البلد', calligraphicName: 'سُورَةُ ٱلْبَلَدِ', englishName: 'Al-Balad', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 20, juz: 30, page: 594 },
  { number: 91, name: 'الشمس', calligraphicName: 'سُورَةُ ٱلشَّمْسِ', englishName: 'Ash-Shams', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 15, juz: 30, page: 595 },
  { number: 92, name: 'الليل', calligraphicName: 'سُورَةُ ٱللَّيْلِ', englishName: 'Al-Lail', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 21, juz: 30, page: 595 },
  { number: 93, name: 'الضحى', calligraphicName: 'سُورَةُ ٱلضُّحَىٰ', englishName: 'Ad-Dhuhaa', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 11, juz: 30, page: 596 },
  { number: 94, name: 'الشرح', calligraphicName: 'سُورَةُ ٱلشَّرْحِ', englishName: 'Ash-Sharh', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 8, juz: 30, page: 596 },
  { number: 95, name: 'التين', calligraphicName: 'سُورَةُ ٱلتِّينِ', englishName: 'At-Tin', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 8, juz: 30, page: 597 },
  { number: 96, name: 'العلق', calligraphicName: 'سُورَةُ ٱلْعَلَقِ', englishName: 'Al-Alaq', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 19, juz: 30, page: 597 },
  { number: 97, name: 'القدر', calligraphicName: 'سُورَةُ ٱلْقَدْرِ', englishName: 'Al-Qadr', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 5, juz: 30, page: 598 },
  { number: 98, name: 'البينة', calligraphicName: 'سُورَةُ ٱلْبَيِّنَةِ', englishName: 'Al-Bayyina', revelationType: 'Medinan', revelationArabic: 'مدنية', numberOfAyahs: 8, juz: 30, page: 598 },
  { number: 99, name: 'الزلزلة', calligraphicName: 'سُورَةُ ٱلزَّلْزَلَةِ', englishName: 'Az-Zalzala', revelationType: 'Medinan', revelationArabic: 'مدنية', numberOfAyahs: 8, juz: 30, page: 599 },
  { number: 100, name: 'العاديات', calligraphicName: 'سُورَةُ ٱلْعَادِيَاتِ', englishName: 'Al-Aadiyaat', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 11, juz: 30, page: 599 },
  { number: 101, name: 'القارعة', calligraphicName: 'سُورَةُ ٱلْقَارِعَةِ', englishName: 'Al-Qaari\'a', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 11, juz: 30, page: 600 },
  { number: 102, name: 'التكاثر', calligraphicName: 'سُورَةُ ٱلتَّكَاثُرِ', englishName: 'At-Takaathur', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 8, juz: 30, page: 600 },
  { number: 103, name: 'العصر', calligraphicName: 'سُورَةُ ٱلْعَصْرِ', englishName: 'Al-Asr', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 3, juz: 30, page: 601 },
  { number: 104, name: 'الهمزة', calligraphicName: 'سُورَةُ ٱلْهُمَزَةِ', englishName: 'Al-Humaza', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 9, juz: 30, page: 601 },
  { number: 105, name: 'الفيل', calligraphicName: 'سُورَةُ ٱلْفِيلِ', englishName: 'Al-Fil', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 5, juz: 30, page: 601 },
  { number: 106, name: 'قريش', calligraphicName: 'سُورَةُ قُرَيْشٍ', englishName: 'Quraish', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 4, juz: 30, page: 602 },
  { number: 107, name: 'الماعون', calligraphicName: 'سُورَةُ ٱلْمَاعُونِ', englishName: 'Al-Maa\'oon', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 7, juz: 30, page: 602 },
  { number: 108, name: 'الكوثر', calligraphicName: 'سُورَةُ ٱلْكَوْثَرِ', englishName: 'Al-Kawthar', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 3, juz: 30, page: 602 },
  { number: 109, name: 'الكافرون', calligraphicName: 'سُورَةُ ٱلْكَافِرُونَ', englishName: 'Al-Kaafiroon', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 6, juz: 30, page: 603 },
  { number: 110, name: 'النصر', calligraphicName: 'سُورَةُ ٱلنَّصْرِ', englishName: 'An-Nasr', revelationType: 'Medinan', revelationArabic: 'مدنية', numberOfAyahs: 3, juz: 30, page: 603 },
  { number: 111, name: 'المسد', calligraphicName: 'سُورَةُ ٱلْمَسَدِ', englishName: 'Al-Masad', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 5, juz: 30, page: 603 },
  { number: 112, name: 'الإخلاص', calligraphicName: 'سُورَةُ ٱلْإِخْلَاصِ', englishName: 'Al-Ikhlaas', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 4, juz: 30, page: 604 },
  { number: 113, name: 'الفلق', calligraphicName: 'سُورَةُ ٱلْفَلَقِ', englishName: 'Al-Falaq', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 5, juz: 30, page: 604 },
  { number: 114, name: 'الناس', calligraphicName: 'سُورَةُ ٱلنَّاسِ', englishName: 'An-Naas', revelationType: 'Meccan', revelationArabic: 'مكية', numberOfAyahs: 6, juz: 30, page: 604 },
];

// Instant Offline Pre-loaded Surahs so initial render is 0ms and works offline
export const OFFLINE_SURAHS: Record<number, AyahData[]> = {
  1: [
    { number: 1, numberInSurah: 1, text: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ', juz: 1, page: 1 },
    { number: 2, numberInSurah: 2, text: 'ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ', juz: 1, page: 1 },
    { number: 3, numberInSurah: 3, text: 'ٱلرَّحْمَٰنِ ٱلرَّحِيمِ', juz: 1, page: 1 },
    { number: 4, numberInSurah: 4, text: 'مَٰلِكِ يَوْمِ ٱلدِّينِ', juz: 1, page: 1 },
    { number: 5, numberInSurah: 5, text: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ', juz: 1, page: 1 },
    { number: 6, numberInSurah: 6, text: 'ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ', juz: 1, page: 1 },
    { number: 7, numberInSurah: 7, text: 'صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ', juz: 1, page: 1 },
  ],
  97: [
    { number: 6126, numberInSurah: 1, text: 'إِنَّآ أَنزَلْنَٰهُ فِى لَيْلَةِ ٱلْقَدْرِ', juz: 30, page: 598 },
    { number: 6127, numberInSurah: 2, text: 'وَمَآ أَدْرَىٰكَ مَا لَيْلَةُ ٱلْقَدْرِ', juz: 30, page: 598 },
    { number: 6128, numberInSurah: 3, text: 'لَيْلَةُ ٱلْقَدْرِ خَيْرٌ مِّنْ أَلْفِ شَهْرٍ', juz: 30, page: 598 },
    { number: 6129, numberInSurah: 4, text: 'تَنَزَّلُ ٱلْمَلَٰٓئِكَةُ وَٱلرُّوحُ فِيهَا بِإِذْنِ رَبِّهِم مِّن كُلِّ أَمْرٍ', juz: 30, page: 598 },
    { number: 6130, numberInSurah: 5, text: 'سَلَٰمٌ هِىَ حَتَّىٰ مَطْلَعِ ٱلْفَجْرِ', juz: 30, page: 598 },
  ],
  103: [
    { number: 6177, numberInSurah: 1, text: 'وَٱلْعَصْرِ', juz: 30, page: 601 },
    { number: 6178, numberInSurah: 2, text: 'إِنَّ ٱلْإِنسَٰنَ لَفِى خُسْرٍ', juz: 30, page: 601 },
    { number: 6179, numberInSurah: 3, text: 'إِلَّا ٱلَّذِينَ ءَامَنُوا۟ وَعَمِلُوا۟ ٱلصَّٰلِحَٰتِ وَتَوَاصَوْا۟ بِٱلْحَقِّ وَتَوَاصَوْا۟ بِٱلصَّبْرِ', juz: 30, page: 601 },
  ],
  108: [
    { number: 6205, numberInSurah: 1, text: 'إِنَّآ أَعْطَيْنَٰكَ ٱلْكَوْثَرَ', juz: 30, page: 602 },
    { number: 6206, numberInSurah: 2, text: 'فَصَلِّ لِرَبِّكَ وَٱنْحَرْ', juz: 30, page: 602 },
    { number: 6207, numberInSurah: 3, text: 'إِنَّ شَانِئَكَ هُوَ ٱلْأَبْتَرُ', juz: 30, page: 602 },
  ],
  110: [
    { number: 6214, numberInSurah: 1, text: 'إِذَا جَآءَ نَصْرُ ٱللَّهِ وَٱلْفَتْحُ', juz: 30, page: 603 },
    { number: 6215, numberInSurah: 2, text: 'وَرَأَيْتَ ٱلنَّاسَ يَدْخُلُونَ فِى دِينِ ٱللَّهِ أَفْوَاجًا', juz: 30, page: 603 },
    { number: 6216, numberInSurah: 3, text: 'فَسَبِّحْ بِحَمْدِ رَبِّكَ وَٱسْتَغْفِرْهُ ۚ إِنَّهُۥ كَانَ تَوَّابًۢا', juz: 30, page: 603 },
  ],
  112: [
    { number: 6222, numberInSurah: 1, text: 'قُلْ هُوَ ٱللَّهُ أَحَدٌ', juz: 30, page: 604 },
    { number: 6223, numberInSurah: 2, text: 'ٱللَّهُ ٱلصَّمَدُ', juz: 30, page: 604 },
    { number: 6224, numberInSurah: 3, text: 'لَمْ يَلِدْ وَلَمْ يُولَدْ', juz: 30, page: 604 },
    { number: 6225, numberInSurah: 4, text: 'وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ', juz: 30, page: 604 },
  ],
  113: [
    { number: 6226, numberInSurah: 1, text: 'قُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ', juz: 30, page: 604 },
    { number: 6227, numberInSurah: 2, text: 'مِن شَرِّ مَا خَلَقَ', juz: 30, page: 604 },
    { number: 6228, numberInSurah: 3, text: 'وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ', juz: 30, page: 604 },
    { number: 6229, numberInSurah: 4, text: 'وَمِن شَرِّ ٱلنَّفَّٰثَٰتِ فِى ٱلْعُقَدِ', juz: 30, page: 604 },
    { number: 6230, numberInSurah: 5, text: 'وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ', juz: 30, page: 604 },
  ],
  114: [
    { number: 6231, numberInSurah: 1, text: 'قُلْ أَعُوذُ بِرَبِّ ٱلنَّاسِ', juz: 30, page: 604 },
    { number: 6232, numberInSurah: 2, text: 'مَلِكِ ٱلنَّاسِ', juz: 30, page: 604 },
    { number: 6233, numberInSurah: 3, text: 'إِلَٰهِ ٱلنَّاسِ', juz: 30, page: 604 },
    { number: 6234, numberInSurah: 4, text: 'مِن شَرِّ ٱلْوَسْوَاسِ ٱلْخَنَّاسِ', juz: 30, page: 604 },
    { number: 6235, numberInSurah: 5, text: 'ٱلَّذِى يُوَسْوِسُ فِى صُدُورِ ٱلنَّاسِ', juz: 30, page: 604 },
    { number: 6236, numberInSurah: 6, text: 'مِنَ ٱلْجِنَّةِ وَٱلنَّاسِ', juz: 30, page: 604 },
  ],
};

const ARABIC_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

export function toArabicDigits(value: number | string): string {
  return String(value).replace(/\d/g, (d) => ARABIC_DIGITS[Number(d)] || d);
}

export function normalizeArabicSearch(input: string): string {
  return input
    .trim()
    .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, '') // remove tashkeel
    .replace(/^سورة\s+/g, '')
    .replace(/^سوره\s+/g, '')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .toLowerCase();
}

export function cleanAyahText(rawText: string, surahNumber: number, ayahInSurah: number): string {
  let cleaned = rawText.replace(/^\uFEFF/, '').trim();
  if (surahNumber !== 1 && surahNumber !== 9 && ayahInSurah === 1) {
    const basmalahVariants = [
      'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ ',
      'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ',
      'بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ ',
      'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ',
    ];
    for (const prefix of basmalahVariants) {
      if (cleaned.startsWith(prefix)) {
        cleaned = cleaned.slice(prefix.length).trim();
        break;
      }
    }
  }
  return cleaned;
}

export function getEveryAyahAudioUrl(reciter: Reciter, surahNumber: number, ayahInSurah: number): string {
  const s = String(surahNumber).padStart(3, '0');
  const a = String(ayahInSurah).padStart(3, '0');
  return `https://everyayah.com/data/${reciter.everyAyahFolder}/${s}${a}.mp3`;
}

export function getFallbackAudioUrl(reciter: Reciter, globalAyahNumber: number): string {
  return `https://cdn.islamic.network/quran/audio/128/${reciter.islamicNetworkId}/${globalAyahNumber}.mp3`;
}

export function getFullSurahAudioUrl(reciter: Reciter, surahNumber: number): string {
  const s = String(surahNumber).padStart(3, '0');
  return `${reciter.fullSurahServer}/${s}.mp3`;
}
