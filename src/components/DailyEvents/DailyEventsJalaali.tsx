import React from "react";
import jalaali from "jalaali-js"; // Import the jalaali-js library

// --- Helper Functions ---

// --- Event Data ---

interface EventItem {
  jMonth: number; // Jalali month (1-12)
  jDay: number; // Jalali day (1-31)
  description: string; // Event description
  isHoliday: boolean; // Is it a public holiday?
}

// NOTE: This is a more comprehensive list, but still static.
// Lunar-based events (like Eid al-Fitr, Ashura) are NOT included
// as their Jalali date changes yearly. Use an API for those.
const allEvents: EventItem[] = [
  // --- Farvardin (فروردین) ---
  {
    jMonth: 1,
    jDay: 1,
    description:
      "جشن نوروز/جشن سال نو / زادروز علی دایی (اسطوره فوتبال ایران) / روز عطر / روز جنگل / روز شعر / روز سندرم دان / روز رنگ‌ها",
    isHoliday: true,
  },
  {
    jMonth: 1,
    jDay: 2,
    description: "جشن نوروز/جشن سال نو / روز آب",
    isHoliday: true,
  },
  {
    jMonth: 1,
    jDay: 3,
    description: "جشن نوروز/جشن سال نو / روز هواشناسی",
    isHoliday: true,
  },
  {
    jMonth: 1,
    jDay: 4,
    description:
      "جشن نوروز/جشن سال نو / روز آگاهی از بیماری سل / روز هم‌خونه / روز دستاوردها",
    isHoliday: true,
  },
  {
    jMonth: 1,
    jDay: 5,
    description: "روز وافل / روز امید و روز شادباش‌نویسی",
    isHoliday: false,
  },
  {
    jMonth: 1,
    jDay: 6,
    description:
      "زادروز آشو زرتشت / روز امید و روز شادباش‌نویسی / روز هنرهای نمایشی / روز ریاضی / روز اسفناج / روز شیرینی نوقا",
    isHoliday: false,
  },
  {
    jMonth: 1,
    jDay: 7,
    description: "روز هنرهای نمایشی / روز تئاتر",
    isHoliday: false,
  },
  {
    jMonth: 1,
    jDay: 8,
    description: "روز زن در موسیقی / روز کیک بلک فارست / روز قدس",
    isHoliday: false,
  },
  {
    jMonth: 1,
    jDay: 9,
    description: "روز پیانو / روز پری دریایی",
    isHoliday: false,
  },
  {
    jMonth: 1,
    jDay: 10,
    description: "روز مداد / روز بدون زباله",
    isHoliday: false,
  },
  {
    jMonth: 1,
    jDay: 11,
    description: "روز برج ایفل / روز مداد شمعی",
    isHoliday: false,
  },
  {
    jMonth: 1,
    jDay: 12,
    description:
      "روز جمهوری اسلامی / روز کنار گذاشتن دخانیات / روز سرگرمی (fun) / روز سرگرمی در محل کار",
    isHoliday: true,
  },
  {
    jMonth: 1,
    jDay: 13,
    description:
      "روز طبیعت / روز موش خرما / روز کتاب کودک / روز آگاهی از اوتیسم",
    isHoliday: true,
  },
  {
    jMonth: 1,
    jDay: 14,
    description:
      "زادروز ابوالحسن صبا (چهره برجسته موسیقی معاصر ایران) / روز مهمانی (party) / روز جهانی امنیت ابری / روز موس شکلات / روز حیوانات آبزی و دریایی",
    isHoliday: false,
  },
  {
    jMonth: 1,
    jDay: 15,
    description:
      "روز موش خرما / روز ارور 404 / روز پیاده سرکار رفتن / روز هویج",
    isHoliday: false,
  },
  {
    jMonth: 1,
    jDay: 16,
    description: "روز کارامل / روز بالشت بازی / روز جهانی وجدان",
    isHoliday: false,
  },
  {
    jMonth: 1,
    jDay: 17,
    description:
      "روز پیژامه / روز ورزش برای گسترش صلح / روز پاپ کورن کاراملی / روز گوجه تازه",
    isHoliday: false,
  },
  {
    jMonth: 1,
    jDay: 18,
    description: "روز کیک قهوه / روز بهداشت / روز سگ آبی",
    isHoliday: false,
  },
  {
    jMonth: 1,
    jDay: 19,
    description: "روز مهربانی با وکلا / روز یوگا برای کودکان",
    isHoliday: false,
  },
  {
    jMonth: 1,
    jDay: 20,
    description: "روز ملی فناوری هسته‌ای / روز رنگ صورتی / روز اسب تک ‌شاخ",
    isHoliday: false,
  },
  {
    jMonth: 1,
    jDay: 21,
    description: "روز کار از خانه / روز کروسان دارچین / روز سنجاق قفلی",
    isHoliday: false,
  },
  {
    jMonth: 1,
    jDay: 22,
    description: "روز پارکینسون / روز حیوانات خانگی",
    isHoliday: false,
  },
  {
    jMonth: 1,
    jDay: 23,
    description: "روز دندان‌پزشک / روز ساندویچ پنیری گریل‌شده",
    isHoliday: false,
  },
  {
    jMonth: 1,
    jDay: 25,
    description:
      "بزرگداشت عطار نیشابوری / روز ملی منابع انسانی / روز دلفین / روز نگاه به آسمان / روز باغبانی کردن / روز لحظه خنده",
    isHoliday: false,
  },
  {
    jMonth: 1,
    jDay: 26,
    description: "زادروز محمدعلی کشاورز / روز هنر / روز مالیات",
    isHoliday: false,
  },
  {
    jMonth: 1,
    jDay: 27,
    description:
      "روز فرهنگ پهلوانی و ورزش زورخانه‌ای / روز نجات فیل / روز گل ارکیده",
    isHoliday: false,
  },
  {
    jMonth: 1,
    jDay: 28,
    description: "روز موز / روز هموفیلی",
    isHoliday: false,
  },
  {
    jMonth: 1,
    jDay: 29,
    description:
      "روز نیروی زمینی / روز ارتش / روز ورزش / روز بیسکوت باغ وحشی / روز تیله / روزبناها و شهرها",
    isHoliday: false,
  },
  {
    jMonth: 1,
    jDay: 30,
    description:
      "روز علوم آزمایشگاهی / زادروز حکیم سید اسماعیل جرجانی / روز شعر و خلاقیت / روز دوچرخه",
    isHoliday: false,
  },
  {
    jMonth: 1,
    jDay: 31,
    description:
      "روز قدردانی از کمک‌های داوطلبانه / روز مسابقه شکستن تخم‌مرغ / روز قدردانی از تحویل‌دهندگان پیتزا",
    isHoliday: false,
  },

  // --- Ordibehesht (اردیبهشت) ---
  {
    jMonth: 2,
    jDay: 1,
    description:
      "بزرگداشت سعدی شیرازی / روز نثر فارسی / روز چای / روز خلاقیت و نوآوری / روز مهدکودک / روز بادبادک بازی",
    isHoliday: false,
  },
  { jMonth: 2, jDay: 2, description: "روز زمین", isHoliday: false },
  {
    jMonth: 2,
    jDay: 3,
    description:
      "روز معماری / بزرگداشت شیخ بهایی / روزملی کارآفرینی / روز تنیس روی میز / روز پیکینک / روز زبان انگلیسی / زادروز ویلیام شکسپیر",
    isHoliday: false,
  },
  {
    jMonth: 2,
    jDay: 4,
    description:
      "روز دختران در فناوری اطلاعات و ارتباطات / روز کمک به حیوانات / روز دیپلماسی برای صلح / روز جلوگیزی از هدر رفت غذا",
    isHoliday: false,
  },
  {
    jMonth: 2,
    jDay: 5,
    description: "روز پنگوئن / روز بیماری مالاریا / روز DNA",
    isHoliday: false,
  },
  {
    jMonth: 2,
    jDay: 6,
    description: "روز دامپزشکی / روز سلامت کودکان",
    isHoliday: false,
  },
  {
    jMonth: 2,
    jDay: 7,
    description:
      "روز ایمنی و حمل‌ونقل / روز پاستیل خرسی / روز گرافیک / روز کد مورس",
    isHoliday: false,
  },
  {
    jMonth: 2,
    jDay: 8,
    description:
      "زادروز سیمین دانشور / روز نجات قورباغه‌ها / روز ابرقهرمان / روز ساعت بیولوژیکی / روز ایمنی و سلامت در محیط کار",
    isHoliday: false,
  },
  {
    jMonth: 2,
    jDay: 9,
    description:
      "روز شوراها / روز ملی روانشناس و مشاور / روز رقص / روز آرزو / روز پارکور / آغاز دهه کرامت",
    isHoliday: false,
  },
  {
    jMonth: 2,
    jDay: 10,
    description:
      "جشن چهلم نوروز / روز ملی خلیج فارس / روز موسیقی جاز / روز توقف اسراف مواد غذایی / روز کشمش / روز صداقت",
    isHoliday: false,
  },
  {
    jMonth: 2,
    jDay: 11,
    description:
      "روز کارگر / روز بروزرسانی پسورد / روز مدیران مدارس / روز عشق / روز قانون",
    isHoliday: false,
  },
  {
    jMonth: 2,
    jDay: 12,
    description:
      "شهادت استاد مرتضی مطهری / روز معلم / روز نوزاد / روز ماهی تن / روز هری پاتر",
    isHoliday: false,
  },
  {
    jMonth: 2,
    jDay: 13,
    description: "روز نجوم / روز کوالای وحشی / روز خورشید / روز پارچه",
    isHoliday: false,
  },
  {
    jMonth: 2,
    jDay: 14,
    description:
      "روز جنگ ستارگان / روز خنده / روز آتش‌نشان / روز آب پرتقال / روز بزرگداشت شاهچراغ (ع)",
    isHoliday: false,
  },
  {
    jMonth: 2,
    jDay: 15,
    description:
      "جشن بهاربد / روز شیراز / روز فضانوردان / روز جهانی ماما / روز بهداشت دست",
    isHoliday: false,
  },
  {
    jMonth: 2,
    jDay: 16,
    description: "روز آسم / روز بدون رژیم غذایی / روز بدون تکالیف خانگی",
    isHoliday: false,
  },
  {
    jMonth: 2,
    jDay: 17,
    description:
      "روز اسنادملی و میراث مکتوب / زادروز اصغر فرهادی / روز مشاوره سفر / روز آگاهی از سلامت روانی کودکان",
    isHoliday: false,
  },
  {
    jMonth: 2,
    jDay: 18,
    description:
      "روز بیمای‌های خاص / روز گل زنبق / روز بدون جوراب / روز هلال احمر / روز گارگران سه شیفت / روز تجارت آزاد",
    isHoliday: false,
  },
  {
    jMonth: 2,
    jDay: 19,
    description: "روز اسناد ملی و میراث مکتوب / روز مراقبت از کودکان",
    isHoliday: false,
  },
  {
    jMonth: 2,
    jDay: 20,
    description:
      "روز تجارت عادلانه / روز اقیانوس مادر / یک روز بدون کفش / روز میگو",
    isHoliday: false,
  },
  {
    jMonth: 2,
    jDay: 21,
    description:
      "روز مادر / روز آگاهی از ایگو(خود) / روز تکنولوژی / روز هر چی دوست داری بخور",
    isHoliday: false,
  },
  {
    jMonth: 2,
    jDay: 22,
    description:
      "زادروز مریم میرزاخانی (ریاضی‌دان نابغه ایرانی) / روز پرستار / روز سلامت گیاه",
    isHoliday: false,
  },
  {
    jMonth: 2,
    jDay: 23,
    description:
      "زادروز کاظم معتمد نژاد (پدر علم ارتباطات و روزنامه نگاری ایران) / روز حمص (هوموس) / روز کوکتل",
    isHoliday: false,
  },
  {
    jMonth: 2,
    jDay: 24,
    description: "روز لوازم التحریر / روز مدیریت تسهیلات",
    isHoliday: false,
  },
  {
    jMonth: 2,
    jDay: 25,
    description:
      "پاسداشت زبان فارسی / بزرگداشت حکیم ابوالقاسم فردوسی / روز خانواده / روز چیپس شکلات / روز گل دادن / روز پشتیبانی از مشتری",
    isHoliday: false,
  },
  {
    jMonth: 2,
    jDay: 26,
    description:
      "روز رفتن به سرکار با دوچرخه / روز دوست داشتن درخت / روز زندگی باهم در صلح / روز نقاشی / روز پسر",
    isHoliday: false,
  },
  {
    jMonth: 2,
    jDay: 27,
    description:
      "روز ارتباطات و روابط عمومی / روز دورکاری / روز ارتباطات / روز گردو / روز دونات",
    isHoliday: false,
  },
  {
    jMonth: 2,
    jDay: 28,
    description:
      "بزرگداشت حکیم عمر خیام / روز فرهنگ پهلوانی و ورزش زورخانه‌ای / روز موزه و میراث فرهنگی / روز دیدار با خویشاوندان / روز بدون ظرف کثیف / روز ستاره شناسی",
    isHoliday: false,
  },
  {
    jMonth: 2,
    jDay: 29,
    description: "روز ملی جمعیت / روز یادگیری در محل کار",
    isHoliday: false,
  },
  {
    jMonth: 2,
    jDay: 30,
    description:
      "روز ملی جمعیت / روز زنبورعسل / روز کفش اسنیکرز قرمز / روز آزمایشات بالینی / روز وزن و اندازه‌گیری",
    isHoliday: false,
  },
  {
    jMonth: 2,
    jDay: 31,
    description: "روز اهدای عضو، اهدای زندگی / روز تنوع فرهنگی / روز مدیتیشن",
    isHoliday: false,
  },

  // --- Khordad (خرداد) ---
  {
    jMonth: 3,
    jDay: 1,
    description:
      "بزرگداشت ملاصدر / روز بهره‌وری و بهینه‌سازی در مصرف / روز اعداد / روز شرلوک هولمز / روز تنوع زیستی و بیولوژیکی / روز خرید ابزار موسیقی",
    isHoliday: false,
  },
  {
    jMonth: 3,
    jDay: 2,
    description: "روز لاک‌پشت / روز شکلات تافی",
    isHoliday: false,
  },
  {
    jMonth: 3,
    jDay: 3,
    description:
      "روز فتح خرمشهر / روز مقاومت، ایثار و پیروزی / روز برادر / روز تکنسین تعمیر و نگهداری هواپیما",
    isHoliday: false,
  },
  {
    jMonth: 3,
    jDay: 4,
    description:
      "روز دزفول / روز مقاومت و پایداری / روز آفریقا / روز حوله / روز شراب",
    isHoliday: false,
  },
  {
    jMonth: 3,
    jDay: 5,
    description: "روز حمایت از خانواده زندانیان / روز دراکولا / روز موشک کاغذی",
    isHoliday: false,
  },
  {
    jMonth: 3,
    jDay: 6,
    description: "روز بازاریابی / روز کرم ضد آفتاب / روز بدون ترس",
    isHoliday: false,
  },
  {
    jMonth: 3,
    jDay: 7,
    description:
      "روز عفو / روز همبرگر / روز بهداشت قاعدگی / روز دمپایی لا انگشتی / روز ازدواج",
    isHoliday: false,
  },
  {
    jMonth: 3,
    jDay: 8,
    description: "روز بیسکوییت / روز تمساح / روز اورست / روز گیره کاغذ",
    isHoliday: false,
  },
  {
    jMonth: 3,
    jDay: 9,
    description: "روز خلاقیت / روز سیب‌زمینی / روز فستیوال رز",
    isHoliday: false,
  },
  {
    jMonth: 3,
    jDay: 10,
    description:
      "روز طراح وب / روز بدون دخانیات / روز شیرینی ماکارون / روز لبخند",
    isHoliday: false,
  },
  {
    jMonth: 3,
    jDay: 11,
    description: "روز شیر / روز دایناسور / روز والدین / روز یک حرف خوب زدن",
    isHoliday: false,
  },
  {
    jMonth: 3,
    jDay: 12,
    description: "روز دوست‌داشتن دنداپزشک / روز مرغ بریان",
    isHoliday: false,
  },
  {
    jMonth: 3,
    jDay: 13,
    description: "روز تخم مرغ / روز دوچرخه / روز زود آمدن از سر کار",
    isHoliday: false,
  },
  {
    jMonth: 3,
    jDay: 14,
    description: "رحلت امام خمینی / روز پنیر / روز دویدن",
    isHoliday: true,
  },
  {
    jMonth: 3,
    jDay: 15,
    description:
      "قیام 15 خرداد / روزمحیط زیست / رور بالن / روز شیرینی زنجبیلی / روز بازی‌های رومیزی",
    isHoliday: false,
  },
  {
    jMonth: 3,
    jDay: 16,
    description:
      "روز ماهی و چیپس / روز دونات / روز زبان روسی / آغاز دهه امامت و ولایت",
    isHoliday: false,
  },
  {
    jMonth: 3,
    jDay: 17,
    description:
      "روز ایمنی غذا / روز دونات / روز مراقبت از دیگران / روز بستنی شکلاتی",
    isHoliday: false,
  },
  {
    jMonth: 3,
    jDay: 18,
    description: "روز دوستان صمیمی / روز اقیانوس / روز عروسک",
    isHoliday: false,
  },
  {
    jMonth: 3,
    jDay: 20,
    description: "روز ملی فرش / روز آیس تی / روز گیاهان و ادویه‌ها",
    isHoliday: false,
  },
  {
    jMonth: 3,
    jDay: 22,
    description:
      "روز فلافل / روز مبارزه با کار کودکان / روز کوکی کره بادام زمینی / روز سوپرمن",
    isHoliday: false,
  },
  {
    jMonth: 3,
    jDay: 23,
    description: "روز پرتاب تبر / روز چرخ خیاطی / روز کارگران مزرعه",
    isHoliday: false,
  },
  {
    jMonth: 3,
    jDay: 24,
    description: "روز کاپ‌کیک / روز حمام / روز شعبده ‌بازی",
    isHoliday: false,
  },
  {
    jMonth: 3,
    jDay: 25,
    description:
      "روز ملی گل و گیاه / روز عکاسی از طبیعت / روز موج سواری / روز لابستر",
    isHoliday: false,
  },
  {
    jMonth: 3,
    jDay: 26,
    description:
      "زادروز دکتر محمد مصدق / روز سبزیجات تازه / روز لاک‌پشت دریایی",
    isHoliday: false,
  },
  {
    jMonth: 3,
    jDay: 27,
    description:
      "روز جهاد کشاورزی / روز رفتگران / روز مبارزه با بیابان‌زایی و خشکسالی / روز تارت آلبالو",
    isHoliday: false,
  },
  {
    jMonth: 3,
    jDay: 28,
    description:
      "روز سوشی / روز پیک‌نیک / روز ماهیگیری / روز پنیک / روز تمیز کردن آکواریوم",
    isHoliday: false,
  },
  {
    jMonth: 3,
    jDay: 29,
    description:
      "زادروز پروفسور سمیعی بهترین جراح مغز و اعصاب دنیا / روز ساعت مچی / روز غذای سالم",
    isHoliday: false,
  },
  {
    jMonth: 3,
    jDay: 30,
    description:
      "روز شیک وانیلی / روز بهره ‌‌وری / روزه تنیس / روز بازیافت خودرو / روز مباهله",
    isHoliday: false,
  },
  {
    jMonth: 3,
    jDay: 31,
    description:
      "زادروز عزت‌الله انتظامی (آقای بازیگر سینمای ایران) / روز خانواده و تکریم بازنشستگان / روز اسموتی / روز موسیقی / روز موتورسیکلت / روز یوگا",
    isHoliday: false,
  },

  // --- Tir (تیر) ---
  {
    jMonth: 4,
    jDay: 1,
    description:
      "جشن آغاز تابستان / زادروز عبّاس کیارستمی (فیلمساز و عکاس فقید) / روز اصناف / روز پیاز سوخاری / روز رسانه‌ی مثبت / روز جنگل‌های بارانی",
    isHoliday: false,
  },
  {
    jMonth: 4,
    jDay: 2,
    description: "روز زنان در مهندسی / روز خدمات عمومی / روز ماشین تحریر",
    isHoliday: false,
  },
  { jMonth: 4, jDay: 3, description: "روز شنا کردن", isHoliday: false },
  {
    jMonth: 4,
    jDay: 4,
    description: "روز تلویزیون رنگی / روز کت فیش / روز دریانورد",
    isHoliday: false,
  },
  {
    jMonth: 4,
    jDay: 5,
    description: "روز پودینگ شکلات / روز مبارزه با مواد مخدر",
    isHoliday: false,
  },
  {
    jMonth: 4,
    jDay: 6,
    description:
      "روز کیک بستنی / روز آناناس / روز کارگران صنعتی / روز عینک آفتابی / آغاز سال 1447 هجری قمری",
    isHoliday: false,
  },
  {
    jMonth: 4,
    jDay: 7,
    description:
      "شهادت دکتر بهشتی و 72 تن / روز قوه قضاییه / بمباران شیمیایی شهر سردشت / روز پیرسینگ / روز لجستیک / روز رویای بزرگ",
    isHoliday: false,
  },
  {
    jMonth: 4,
    jDay: 8,
    description:
      "روز مبارزه با سلاح‌های شیمیایی و میکروبی / روز طراحی صنعتی / روز دوربین عکاسی / روز گِل بازی",
    isHoliday: false,
  },
  {
    jMonth: 4,
    jDay: 9,
    description: "روز شبکه‌های اجتماعی / روز شهاب سنگ / روز کلبه چوبی",
    isHoliday: false,
  },
  {
    jMonth: 4,
    jDay: 10,
    description:
      "روز بزرگداشت صائب تبریزی / روز صنعت و معدن / روز بال کبابی / روز جک و شوخی / روز کدپستی / روز کارمند پست / روز سحرخیزان",
    isHoliday: false,
  },
  {
    jMonth: 4,
    jDay: 11,
    description: "روز معلمان / روز بشقاب پرنده",
    isHoliday: false,
  },
  {
    jMonth: 4,
    jDay: 12,
    description:
      "شلیک ناو وینسنس آمریکا به پرواز 655 ایران‌ایر در سال 1367 / روز ویفر شکلاتی / روز بدون کیسه پلاستیک / روز دوری از آفتاب / روز نافرمانی",
    isHoliday: false,
  },
  {
    jMonth: 4,
    jDay: 13,
    description:
      "جشن تیرگان / روز بدون گوشت / روز نامرئی بودن / روز سالاد سزار",
    isHoliday: false,
  },
  {
    jMonth: 4,
    jDay: 14,
    description:
      "روز قلم / روز شهرداری و دهیاری / پدر علم پزشکی کودکان ایران / روز اعتیاد به کار / روز لباس زیر / روز همکاری / روز مداد",
    isHoliday: false,
  },
  {
    jMonth: 4,
    jDay: 15,
    description:
      "جشن خام‌خواری / روز بوسیدن / روز مترسک / روز چتر / روز مرغ سوخاری",
    isHoliday: false,
  },
  {
    jMonth: 4,
    jDay: 16,
    description:
      "روز مالیات / روز شکلات / روز ماکارونی / روز بخشیدن / روز راست گفتن",
    isHoliday: false,
  },
  {
    jMonth: 4,
    jDay: 17,
    description: "روز بازی ویدئویی / روز بچگی کردن",
    isHoliday: false,
  },
  {
    jMonth: 4,
    jDay: 18,
    description: "روز ملی ادبیات کودک و نوجوان / روز مُد و فشن / روز کوکی شکری",
    isHoliday: false,
  },
  {
    jMonth: 4,
    jDay: 19,
    description: "روز بچه گربه / روز چیدن بلوبری / روز پیناکولادا",
    isHoliday: false,
  },
  {
    jMonth: 4,
    jDay: 20,
    description: "روز سیب‌زمینی سرخ‌کرده / روز موهیتو / روز کباب / روز جمعیت",
    isHoliday: false,
  },
  {
    jMonth: 4,
    jDay: 21,
    description: "روز مبارزه با طوفان‌ شن / روز پاکت کاغذی",
    isHoliday: false,
  },
  {
    jMonth: 4,
    jDay: 22,
    description:
      "زادروز محمد خوارزمی، ریاضیدان و فیلسوف ایرانی / روز ملی فناوری اطلاعات / روز سنگ",
    isHoliday: false,
  },
  {
    jMonth: 4,
    jDay: 23,
    description: "روز گفت‌وگو و تعامل سازنده با جهان / روز آگاهی از کوسه",
    isHoliday: false,
  },
  {
    jMonth: 4,
    jDay: 24,
    description:
      "روز پاستیل کِرمی / روز مهارت‌های جوانان / روز انگور فرنگی سیاه",
    isHoliday: false,
  },
  {
    jMonth: 4,
    jDay: 25,
    description:
      "روز بهزیستی و تامین اجتماعی / روز مار / روز گیلاس / روز اسفناج تازه / روز هات‌داگ",
    isHoliday: false,
  },
  {
    jMonth: 4,
    jDay: 26,
    description:
      "روز ایموجی / روز تتو / روز ارسال دعوت نامه الکترونیکی / روز عدالت",
    isHoliday: false,
  },
  {
    jMonth: 4,
    jDay: 27,
    description: "روز شنیدن / روز نلسون ماندلا / روز دانشمند بیمه / روز خاویار",
    isHoliday: false,
  },
  { jMonth: 4, jDay: 28, description: "روز فوتبال", isHoliday: false },
  {
    jMonth: 4,
    jDay: 29,
    description: "روز ماه / روز پرش و پریدن / روز اکتشافات فضایی / روز شطرنج",
    isHoliday: false,
  },
  {
    jMonth: 4,
    jDay: 30,
    description:
      "روز در آغوش گرفتن کودکان / روز غذای سرشار از کالری / روز بستنی",
    isHoliday: false,
  },
  {
    jMonth: 4,
    jDay: 31,
    description: "روز انبه / روز مغز انسان",
    isHoliday: false,
  },

  // --- Mordad (مرداد) ---
  {
    jMonth: 5,
    jDay: 1,
    description: "روز بستنی وانیلی / روز کره بادام‌زمینی و شکلات",
    isHoliday: false,
  },
  {
    jMonth: 5,
    jDay: 2,
    description:
      "روز گفتن یک جک قدیمی / روز خود مراقبتی / روز خاله‌زاده، عموزاده، دایی‌زاده و عمه‌زاده",
    isHoliday: false,
  },
  {
    jMonth: 5,
    jDay: 3,
    description: "روز کفش قرمز / روز صحبت در آسانسور / روز کارآموز",
    isHoliday: false,
  },
  {
    jMonth: 5,
    jDay: 4,
    description:
      "بزرگداشت شیخ صفی‌الدین اردبیلی / روز میک شیک قهوه / روز قدردانی از مدیر سیستم / روز عکاسی از سگ",
    isHoliday: false,
  },
  {
    jMonth: 5,
    jDay: 5,
    description: "روز استراحت بیشتر / روز درخت / روز کارآفرینی",
    isHoliday: false,
  },
  {
    jMonth: 5,
    jDay: 6,
    description: "روزحفاظت از طبیعت / روز هپاتیت / روز شیر شکلات",
    isHoliday: false,
  },
  {
    jMonth: 5,
    jDay: 7,
    description:
      "جشن اَمردادگان / روز تجلیل از اسرا و مفقودین / تولد مسعود کیمیایی (کارگردان ایرانی) / روز بال کبابی / روز لازانیا / روز ببر / روز رژ لب / روز بارانی",
    isHoliday: false,
  },
  {
    jMonth: 5,
    jDay: 8,
    description:
      "بزرگداشت شیخ شهاب‌الدین سهروردی / روز درآغوش گرفتن / روز چیز کیک / روز کتاب کاغذی",
    isHoliday: false,
  },
  {
    jMonth: 5,
    jDay: 9,
    description:
      "روز اهدای خون / روز آواکادوو / روز محیط بان / روز کیک رازبری / روز آبنبات پاستیلی",
    isHoliday: false,
  },
  {
    jMonth: 5,
    jDay: 10,
    description:
      "جشن چله تابستان / روز توپ بازی / روز وب / روز خانواده‌های بدون فرزند",
    isHoliday: false,
  },
  {
    jMonth: 5,
    jDay: 11,
    description: "روز دفتر رنگ‌آمیزی / روز قلعه شنی / روز آفتابگردون",
    isHoliday: false,
  },
  {
    jMonth: 5,
    jDay: 12,
    description: "روز دوستی / روز هندوانه / روز تمیز کردن زمین / روز خواهران",
    isHoliday: false,
  },
  {
    jMonth: 5,
    jDay: 13,
    description:
      "روز کوکی شکلات / روز تمیز کردن کف زمین / روز آگاهی از جغدها / روز نجات ببر لکه‌دار",
    isHoliday: false,
  },
  {
    jMonth: 5,
    jDay: 14,
    description:
      "صدور فرمان مشروطیت / روز وبلاگ‌نویس / روز صدف / روز چراغ راهنمایی و رانندگی",
    isHoliday: false,
  },
  {
    jMonth: 5,
    jDay: 15,
    description:
      "سالروز شهادت امیر خلبان عباس بابایی / روز رفتن به سرکار با دوچرخه / روز غواصی",
    isHoliday: false,
  },
  {
    jMonth: 5,
    jDay: 16,
    description:
      "روز مهندسان حرفه ای / روز سخنران حرفه‌ای / روز کارمندان خانه سالمندان",
    isHoliday: false,
  },
  {
    jMonth: 5,
    jDay: 17,
    description:
      "روز خبرنگار / روز گربه / روز بولینگ / روز شادی اتفاق خواهد افتاد / روز “خوابیدن زیر ستاره‌های شب”",
    isHoliday: false,
  },
  {
    jMonth: 5,
    jDay: 18,
    description: "روز ملون / روز دوست‌داران کتاب",
    isHoliday: false,
  },
  {
    jMonth: 5,
    jDay: 19,
    description: "روز شیر (حیوان) / روز تنبل‌ها",
    isHoliday: false,
  },
  {
    jMonth: 5,
    jDay: 20,
    description: "تولد امین تارخ (بازیگر) / روز کوه / روز بازی روی شن‌ها",
    isHoliday: false,
  },
  {
    jMonth: 5,
    jDay: 21,
    description:
      "روز حمایت از صنایع كوچک / روز فیل / روز طرفداران بیسبال / روز جوان",
    isHoliday: false,
  },
  {
    jMonth: 5,
    jDay: 22,
    description:
      "روز تشکل‌ها و مشارکت‌های اجتماعی / روز هنر کالیگرافی / روزچپ‌دست‌ها",
    isHoliday: false,
  },
  {
    jMonth: 5,
    jDay: 23,
    description:
      "سالروز ورود اولین دوربین عکاسی به ایران توسط مظفرالدین شاه / ثبت اولین عکس در ایران توسط میرزا ابراهیم خان عکاس‌باشی / روز پاک کردن تتو / روز خوشنویسی / روز بستنی یخی",
    isHoliday: false,
  },
  {
    jMonth: 5,
    jDay: 24,
    description: "روز ریلکس کردن / روز پای لیمو / روز آراستگی مردان",
    isHoliday: false,
  },
  {
    jMonth: 5,
    jDay: 25,
    description: "روز جک گویی / روز زنبورعسل / روز حیوانات بی‌خانمان",
    isHoliday: false,
  },
  {
    jMonth: 5,
    jDay: 26,
    description:
      "سالروز بازگشت آزادگان به میهن در سال 1369 / جشنواره عسل و توت / روز پودینگ وانیلی",
    isHoliday: false,
  },
  {
    jMonth: 5,
    jDay: 27,
    description:
      "روز هرگز تسلیم نشو / روز قدردانی ازرانندگان تحویل کالا / روز زوج‌ها / روز سرندیپیتی",
    isHoliday: false,
  },
  {
    jMonth: 5,
    jDay: 28,
    description:
      "کودتای 28 اَمرداد / سالروز فاجعه آتش زدن سینما رکس آبادان / روز عکاسی / روز سیب‌زمینی / روز اورانگوتان",
    isHoliday: false,
  },
  {
    jMonth: 5,
    jDay: 29,
    description: "روز دوستداران بیکن / روز پشه / روز رادیو",
    isHoliday: false,
  },
  {
    jMonth: 5,
    jDay: 30,
    description: "روز بزرگداشت علامه مجلسی / روز برگر",
    isHoliday: false,
  },
  {
    jMonth: 5,
    jDay: 31,
    description:
      "زادروز هوشنگ سیحون پدر معماری ایران / روز خوردن هلو / روز شیرگیاهی",
    isHoliday: false,
  },

  // --- Shahrivar (شهریور) ---
  {
    jMonth: 6,
    jDay: 1,
    description:
      "روز پزشک / بزرگداشت ابوعلی سینا / زادروز گوهر خیراندیش بازیگر / روز هشتگ # / روز برگر / روز پروازهای ارزان / روز کیک اسفنجی",
    isHoliday: false,
  },
  {
    jMonth: 6,
    jDay: 2,
    description:
      "آغاز هفته دولت / روز چاقو / روز موسیقی‌ عجیب‌ غریب / روز وافل",
    isHoliday: false,
  },
  {
    jMonth: 6,
    jDay: 3,
    description: "اشغال ایران توسط متفقین / هجرت پیامبر اکرم از مکه به مدینه",
    isHoliday: false,
  },
  {
    jMonth: 6,
    jDay: 4,
    description:
      "روز کارمند / زادروز کوروش کبیر / زادرزو اکبر عبدی کمدین محبوب / جشن شهریورگان / روز دستمال حوله‌ای / روز برابری حقوق زنان / روز سگ",
    isHoliday: false,
  },
  {
    jMonth: 6,
    jDay: 5,
    description:
      "زادروز جهان‌پهلوان تختی و روز کُشتی / بزرگداشت محمد ابن زکریای رازی و روز داروساز / روز خفاش / روز دوستداران موز / روز جهانی لاتاری",
    isHoliday: false,
  },
  {
    jMonth: 6,
    jDay: 6,
    description:
      "زادروز حسین پناهی هنرمند فقید / روز تبلیغات رادیویی / روز چرخاندن بی هدف ماوس دور آیکون‌ها",
    isHoliday: false,
  },
  {
    jMonth: 6,
    jDay: 7,
    description:
      "روز سبزیجات بیشتر نمک کمتر / روز مقابله با آزمایش‌های هسته‌ای / روز آبمیوه لیمویی / روز حقوق فردی",
    isHoliday: false,
  },
  {
    jMonth: 6,
    jDay: 8,
    description:
      "انفجار دفتر نخست‌وزیری و شهادت شهیدان رجایی و باهنر / روز مبارزه با تروریسم / روز کوسه نهنگ / روز ساحل",
    isHoliday: false,
  },
  {
    jMonth: 6,
    jDay: 9,
    description:
      "روز وکیل مدافع حقوقی / روز آگاهی از مصرف بیش از حد (اوردوز) / روز جهانی تابلوی ایست",
    isHoliday: false,
  },
  {
    jMonth: 6,
    jDay: 10,
    description:
      "سالروز تصویب قانون عملیات بانکی بدون ربا / روز کارگر / روز نامه‌نویسی / روز گربه‌های نارنجی / روز آگاهی و پذیرش مشکلات پوستی",
    isHoliday: false,
  },
  {
    jMonth: 6,
    jDay: 11,
    description:
      "روز ملی صنعت چاپ / روز تنظیم تقویم / روز نارگیل / روز گوشواره انداختن",
    isHoliday: false,
  },
  {
    jMonth: 6,
    jDay: 12,
    description:
      "سالروز شهادت رییس‌علی دلواری / روز ملی بهورز / روز آسمان خراش‌ها / روز جهانی جذب استعدادها / روز ماست لبنیات",
    isHoliday: false,
  },
  {
    jMonth: 6,
    jDay: 13,
    description:
      "روز تعاون / بزرگداشت ابوریحان بیرونی / روز ملی مردم‌شناسی / روز حیات وحش",
    isHoliday: false,
  },
  {
    jMonth: 6,
    jDay: 14,
    description:
      "روز پیتزا پنیری / روز خیریه / روز سمبوسه / روز تقویت آداب معاشرت در محیط کار",
    isHoliday: false,
  },
  {
    jMonth: 6,
    jDay: 15,
    description:
      "روز خواندن یک کتاب / روز آگاهی از کور رنگی / روز مقابله با اهمال کاری / روز ریش",
    isHoliday: false,
  },
  {
    jMonth: 6,
    jDay: 16,
    description:
      "زادروز هوشنگ مرادی کرمانی نویسنده / روز خرید کتاب / روز انسان‌های فوق‌العاده",
    isHoliday: false,
  },
  {
    jMonth: 6,
    jDay: 17,
    description:
      "قیام 17 شهریور / روز بازیگر / روز فیزیوتراپی / روز کسب سواد و آگاهی / روز عفو و بخشش",
    isHoliday: false,
  },
  {
    jMonth: 6,
    jDay: 18,
    description: "روز حل سودوکو / روز خرس عروسکی / روز نیروهای امدادی",
    isHoliday: false,
  },
  {
    jMonth: 6,
    jDay: 19,
    description:
      "وفات آیت‌اله طالقانی اولین امام جمعه تهران / روز پیشگیری از خودکشی / روز به اشتراک گذاری افکار",
    isHoliday: false,
  },
  {
    jMonth: 6,
    jDay: 20,
    description:
      "حمله به برج‌های دوقلوی مرکز تجارت جهانی / روز بی‌خبری و خوش‌خبری",
    isHoliday: false,
  },
  {
    jMonth: 6,
    jDay: 21,
    description:
      "روز ملی سینما / نخستین زن فضانورد / روز قلب‌های شجاع / روز باشگاه ورزشی / روز دلفین",
    isHoliday: false,
  },
  {
    jMonth: 6,
    jDay: 22,
    description:
      "حادثه مرگ مهسا امینی / روز وقف / روز شکلات / روز افکار مثبت / روز زبان آلمانی / روز ماوراءالطبیعه / روز برنامه نویس",
    isHoliday: false,
  },
  {
    jMonth: 6,
    jDay: 23,
    description:
      "روز دونات کرم‌دار / روز رنگ آمیزی / روز آب‌نبات گوب‌استاپر / روزگرامیداشت میراث فرهنگی",
    isHoliday: false,
  },
  {
    jMonth: 6,
    jDay: 24,
    description:
      "روز قدردانی از همسر / روز تست پنیری / روز Google.com / روز نقطه / روز گرامیداشت خانواده و اجتماع",
    isHoliday: false,
  },
  {
    jMonth: 6,
    jDay: 25,
    description:
      "روز حفاظت از لایه اوزون / روز جمع‌آوری سنگ / روز حیوانات خانگی",
    isHoliday: false,
  },
  {
    jMonth: 6,
    jDay: 26,
    description: "روز موسیقی کانتری / روز پرنده خانگی",
    isHoliday: false,
  },
  {
    jMonth: 6,
    jDay: 27,
    description:
      "بزرگداشت استاد شهریار و روز شعر و ادب پارسی / روز چیزبرگر / روز بامبو / روز برابری دستمزد مرد و زن / روز خواندن یک کتاب الکترونیکی",
    isHoliday: false,
  },
  {
    jMonth: 6,
    jDay: 29,
    description:
      "روز عشق و دوستی / روز پیتزای پپرونی / روز بتمن / روز پاکسازی ساحل",
    isHoliday: false,
  },
  {
    jMonth: 6,
    jDay: 30,
    description:
      "زادروز فریدون مشیری شاعر / روز آلزایمر / روز قدردانی از همسر / روز سپاسگزاری",
    isHoliday: false,
  },
  {
    jMonth: 6,
    jDay: 31,
    description:
      "آغاز هفته دفاع مقدس / روز شکلات سفید / روز قدردانی از فیل‌ها / روز بستنی قیفی / روز بدون خودرو",
    isHoliday: false,
  },

  // --- Mehr (مهر) ---
  {
    jMonth: 7,
    jDay: 1,
    description: "زادروز استاد محمدرضا شجریان / آغاز حمله مغول به ایران",
    isHoliday: false,
  },
  {
    jMonth: 7,
    jDay: 2,
    description:
      "روز خانواده / روز زبان اشاره / روز آگاهی از سندرم پای بی‌قرار / روز فناوری آموزشی",
    isHoliday: false,
  },
  {
    jMonth: 7,
    jDay: 3,
    description: "روز سینمای بالیوود / روز استایلیست مژه",
    isHoliday: false,
  },
  {
    jMonth: 7,
    jDay: 4,
    description:
      "روز سرباز / روز فرزند دختر / روز داروساز / روز رویا / روز آشپزی",
    isHoliday: false,
  },
  {
    jMonth: 7,
    jDay: 5,
    description: "روز منابع انسانی / روز چوب‌بری",
    isHoliday: false,
  },
  {
    jMonth: 7,
    jDay: 6,
    description: "روز شیک شکلات / روز نجات کوالا / روز جهانی توریسم",
    isHoliday: false,
  },
  {
    jMonth: 7,
    jDay: 7,
    description:
      "تولد نیوزباکس / روز آتش‌نشانی و ایمنی / بزرگداشت شمس تبریزی / روز خرگوش / روز همشایه خوب / روز هاری / روز شکار و ماهی‌گیری",
    isHoliday: false,
  },
  {
    jMonth: 7,
    jDay: 8,
    description:
      "بزرگداشت مولانا جلال‌الدین محمد بلخی (مولوی) / روز آگاهی از اتلاف مواد غذایی / روز قهوه / روز استارباکس / روز رودخانه‌ها",
    isHoliday: false,
  },
  {
    jMonth: 7,
    jDay: 9,
    description: "روز ترجمه و مترجم / روز پادکست / روز آدامس",
    isHoliday: false,
  },
  {
    jMonth: 7,
    jDay: 10,
    description:
      "جشن مهرگان / روز کارت دعوت / روز مو / روز سالمند / روز موسیقی / روز گیاه‌خواری",
    isHoliday: false,
  },
  {
    jMonth: 7,
    jDay: 11,
    description: "روز حیوانات مزرعه / روز عدم خشونت / روز تخم کدو",
    isHoliday: false,
  },
  {
    jMonth: 7,
    jDay: 12,
    description: "روز بدون شکر / روز شعر",
    isHoliday: false,
  },
  {
    jMonth: 7,
    jDay: 13,
    description:
      "روز نیروی انتظامی / روز تولید / روز حیوانات / روز رول دارچینی",
    isHoliday: false,
  },
  {
    jMonth: 7,
    jDay: 14,
    description: "روز دامپزشکی / روز کار خوب کردن / روز معلم",
    isHoliday: false,
  },
  {
    jMonth: 7,
    jDay: 15,
    description: "روز روستا و عشایر / زادروز سهراب سپهری / روز مربی / روز نودل",
    isHoliday: false,
  },
  {
    jMonth: 7,
    jDay: 16,
    description:
      "جشن مهرگان / روز ملی کودک / روز وان حمام / روز معماری / روز بخشش و شادی",
    isHoliday: false,
  },
  {
    jMonth: 7,
    jDay: 17,
    description:
      "درگذشت استاد محمدرضا شجریان / روز اختاپوس / روز مواجه شدن با ترس ها",
    isHoliday: false,
  },
  {
    jMonth: 7,
    jDay: 18,
    description:
      "روز کنکجاوی / روز پرستار اورژانس / روز پیشگیری از آتش‌سوزی / روز اسکراب",
    isHoliday: false,
  },
  {
    jMonth: 7,
    jDay: 19,
    description:
      "روز بی‌خانمان / روز سنجش بینایی / روز سلامت روان / روز کیف دستی",
    isHoliday: false,
  },
  {
    jMonth: 7,
    jDay: 20,
    description: "بزرگداشت حافظ شیرازی / روز تخم مرغ / روز پیتزا سوسیس",
    isHoliday: false,
  },
  {
    jMonth: 7,
    jDay: 21,
    description:
      "پیروزی کاوه و فریدون بر ضحاک / روز کشاورزان / روز شطرنج / روز پس‌انداز / روز فکر آزاد",
    isHoliday: false,
  },
  {
    jMonth: 7,
    jDay: 22,
    description: "روز کارکردن روی ذهن / روز بلایا",
    isHoliday: false,
  },
  {
    jMonth: 7,
    jDay: 23,
    description: "روز ملی شناخت بیماری سل / روز دسر / روز استاندارد",
    isHoliday: false,
  },
  {
    jMonth: 7,
    jDay: 24,
    description:
      "روز ملی پارالمپیک / روز پیوند اولیا و مربیان / روز زنان روستایی / روز عصای سفید / روز شستن دست",
    isHoliday: false,
  },
  {
    jMonth: 7,
    jDay: 25,
    description: "روز غذا / روز کرامت / روز استیو جابز",
    isHoliday: false,
  },
  {
    jMonth: 7,
    jDay: 26,
    description: "روز ملی تربیت‌بدنی و ورزش / روز پاستا / روز حل‌وفصل تعارض",
    isHoliday: false,
  },
  { jMonth: 7, jDay: 27, description: "روز بدون ریش", isHoliday: false },
  {
    jMonth: 7,
    jDay: 28,
    description:
      "روز دوستان جدید / روز ماجراجویی / روز تعمیر / روز پل / روز ارزیابی زندگی",
    isHoliday: false,
  },
  {
    jMonth: 7,
    jDay: 29,
    description:
      "روز ملی کوهنوردی / روز ملی صادرات / روز دوربین اسباب‌بازی / روز آرتروز",
    isHoliday: false,
  },
  {
    jMonth: 7,
    jDay: 30,
    description: "روز سیب / روز غذای ناچو / روز خلوت کردن دسکتاپ",
    isHoliday: false,
  },

  // --- Aban (آبان) ---
  {
    jMonth: 8,
    jDay: 1,
    description:
      "روز آمار و برنامه‌ریزی / روز بزرگداشت ابوالفضل بیهقی / روز آجیل / روز Caps Lock / روز رنگ",
    isHoliday: false,
  },
  {
    jMonth: 8,
    jDay: 2,
    description: "روز موش کور / روز برگزارکنندگان رویداد",
    isHoliday: false,
  },
  {
    jMonth: 8,
    jDay: 3,
    description: "روز غذا / روز سازمان ملل",
    isHoliday: false,
  },
  {
    jMonth: 8,
    jDay: 4,
    description:
      "حمله تروریستی به زائران حرم شاهچراغ / روز ‘من بهت اهمیت میدم’ / روز اپرا / روز پاستا / روز هنرمند",
    isHoliday: false,
  },
  {
    jMonth: 8,
    jDay: 5,
    description: "روز ایجاد تفاوت / روز کدو تنبل",
    isHoliday: false,
  },
  {
    jMonth: 8,
    jDay: 6,
    description: "روز گربه سیاه / روز همکار بداخلاق / روز نیروی دریایی",
    isHoliday: false,
  },
  {
    jMonth: 8,
    jDay: 7,
    description:
      "بزرگداشت کوروش کبیر / سالروز ورود کوروش بزرگ به بابل در سال 539 ق.م / روز انیمیشن / روز شکلات / زادروز بیل گیتس (بنیانگذار مایکروسافت)",
    isHoliday: false,
  },
  {
    jMonth: 8,
    jDay: 8,
    description:
      "تولد شهید حسین فهمیده و روز نوجوان / روز اینترنت / روز پیشگیری از سکته",
    isHoliday: false,
  },
  {
    jMonth: 8,
    jDay: 10,
    description:
      "جشن آبانگان / روز جادو / روز سیب کاراملی / هالوین / روز پس‌انداز",
    isHoliday: false,
  },
  {
    jMonth: 8,
    jDay: 11,
    description: "روز دارچین / روز شمع معطر / روز خودنویس / روز نویسندگان",
    isHoliday: false,
  },
  { jMonth: 8, jDay: 12, description: "روز بی‌ضرر بودن", isHoliday: false },
  {
    jMonth: 8,
    jDay: 13,
    description:
      "روز دانش‌آموز / روز ساندویچ / روز عروس دریایی / روز خانه هوشمند / روز کلیشه",
    isHoliday: false,
  },
  {
    jMonth: 8,
    jDay: 14,
    description: "روز فرهنگ عمومی / روز آب‌نبات",
    isHoliday: false,
  },
  {
    jMonth: 8,
    jDay: 15,
    description: "جشن میانه پاییز / روز فوتبال آمریکایی",
    isHoliday: false,
  },
  {
    jMonth: 8,
    jDay: 16,
    description: "روز آگاهی از استرس / روز سالم خواری",
    isHoliday: false,
  },
  {
    jMonth: 8,
    jDay: 17,
    description: "روز مدیریت پروژه / روز ‘شام درست کردن آقایان’",
    isHoliday: false,
  },
  {
    jMonth: 8,
    jDay: 18,
    description: "روز ملی کیفیت / روز کاپوچینو / روز رادیوگرافی",
    isHoliday: false,
  },
  {
    jMonth: 8,
    jDay: 19,
    description: "روز ساندویچ مرغ سوخاری / روز آزادی",
    isHoliday: false,
  },
  {
    jMonth: 8,
    jDay: 20,
    description: "روز دویدن / روز کاپ‌کیک وانیلی / روز علم در خدمت صلح و توسعه",
    isHoliday: false,
  },
  {
    jMonth: 8,
    jDay: 21,
    description:
      "زادروز نیما یوشیج پدر شعر نوی پارسی / روز یادبود / روز مجردها / روز اوریگامی",
    isHoliday: false,
  },
  { jMonth: 8, jDay: 22, description: "روز ‌”ساعات خوش”", isHoliday: false },
  { jMonth: 8, jDay: 23, description: "روز مهربانی", isHoliday: false },
  {
    jMonth: 8,
    jDay: 24,
    description:
      "روز ملی کتاب و کتاب‌خوانی / روز ملی کتابدار / روز خیارشور / روز کیفیت / روز آگاهی از بیماری دیابت / روز کودک",
    isHoliday: false,
  },
  {
    jMonth: 8,
    jDay: 25,
    description: "روز تمیز کردن یخچال / روز “من دوست دارم بنویسم”",
    isHoliday: false,
  },
  {
    jMonth: 8,
    jDay: 26,
    description: "روز فست‌فود / روز دکمه",
    isHoliday: false,
  },
  {
    jMonth: 8,
    jDay: 27,
    description: "روز دانش‌آموز / روز باقلوا / روز نان خانگی / روز بچه‌ی زودرس",
    isHoliday: false,
  },
  {
    jMonth: 8,
    jDay: 28,
    description: "روز میکی موس / روز خانه / روز مدارا",
    isHoliday: false,
  },
  {
    jMonth: 8,
    jDay: 29,
    description: "روز “روز بد” / روز توالت / روز مرد",
    isHoliday: false,
  },
  {
    jMonth: 8,
    jDay: 30,
    description:
      "بزرگداشت ابونصر فارابی (فیلسوف ایرانی) / روز کودک / روز انتخاب اسم برای رایانه شخصی",
    isHoliday: false,
  },

  // --- Azar (آذر) ---
  {
    jMonth: 9,
    jDay: 1,
    description: "آذرجشن / روز نخ دندان کشیدن",
    isHoliday: false,
  },
  {
    jMonth: 9,
    jDay: 2,
    description:
      "روز بادام هندی / روز فرزندخواندگی / روز فیبوناچی / روز اسپرسو",
    isHoliday: false,
  },
  {
    jMonth: 9,
    jDay: 4,
    description: "روز حذف خشونت علیه زنان",
    isHoliday: false,
  },
  { jMonth: 9, jDay: 5, description: "روز کیک", isHoliday: false },
  { jMonth: 9, jDay: 6, description: "روز سنجاق و سوزن", isHoliday: false },
  {
    jMonth: 9,
    jDay: 7,
    description: "روز نیروی دریایی / روز شکر گزاری",
    isHoliday: false,
  },
  {
    jMonth: 9,
    jDay: 8,
    description:
      "روز تبریک الکترونیکی / روز تصویرسازی (Illustration ) / روز چیزی نخریدن / جمعه سیاه / روز جگوار",
    isHoliday: false,
  },
  {
    jMonth: 9,
    jDay: 9,
    description:
      "جشن آذرگان / بزرگداشت شیخ مفید / روز دسر موس / روز امنیت کامپیوتر",
    isHoliday: false,
  },
  {
    jMonth: 9,
    jDay: 10,
    description:
      "شهادت آیت‌اله مدرس و روز مجلس / روز چراغانی کریسمس / روز خوردن سیب قرمز / روز بیماری ایدز",
    isHoliday: false,
  },
  {
    jMonth: 9,
    jDay: 11,
    description:
      "شهادت میرزاکوچک‌خان جنگلی / روز بازی بسکتبال / روز والت دیزنی / روز جهانی لغو برده داری",
    isHoliday: false,
  },
  {
    jMonth: 9,
    jDay: 12,
    description:
      "روز قانون اساسی / روز درست کردن یک هدیه / روز بغل کردن / روز افراد ناتوان",
    isHoliday: false,
  },
  {
    jMonth: 9,
    jDay: 13,
    description:
      "روز بیمه / روز تکریم همسران و مادران شهدا / روز جوراب / روز پوشیدن کفش قهوه‌ای / روز حفاظت از بسته‌بندی / روز حفاظت از حیات‌وحش",
    isHoliday: false,
  },
  {
    jMonth: 9,
    jDay: 14,
    description: "روز خاک / روز نینجا / روز داوطلب",
    isHoliday: false,
  },
  {
    jMonth: 9,
    jDay: 15,
    description: "روز حسابدار / روز خودت کفش هات رو پات کن / روز معدنچیان",
    isHoliday: false,
  },
  {
    jMonth: 9,
    jDay: 16,
    description:
      "روز دانشجو / روز نامه نوشتن / روز جهانی هوانوردی غیرنظامی / روز شمع / روز پشمک",
    isHoliday: false,
  },
  {
    jMonth: 9,
    jDay: 17,
    description: "روز دنر کباب / روز شیرینی براونی",
    isHoliday: false,
  },
  {
    jMonth: 9,
    jDay: 18,
    description:
      "روز کارت کریسمس / روز شیرینی پزی / روز مبارزه با فساد / روز شتر لاما",
    isHoliday: false,
  },
  {
    jMonth: 9,
    jDay: 19,
    description: "روز حقوق بشر / روز حقوق حیوانات / روز جایزه نوبل",
    isHoliday: false,
  },
  {
    jMonth: 9,
    jDay: 20,
    description: "روز کوه / تولد امام خمینی",
    isHoliday: false,
  },
  {
    jMonth: 9,
    jDay: 21,
    description: "روز گل پوینستیا (بنت قنسول)",
    isHoliday: false,
  },
  {
    jMonth: 9,
    jDay: 22,
    description: "روز اسب / روز هات چاکلت / روز ویالون",
    isHoliday: false,
  },
  {
    jMonth: 9,
    jDay: 23,
    description: "زادروز ناصر حجازی (دروازبان اسبق تیم ملی) / روز میمون",
    isHoliday: false,
  },
  { jMonth: 9, jDay: 24, description: "روز کاپ کیک لیمویی", isHoliday: false },
  {
    jMonth: 9,
    jDay: 25,
    description:
      "روز پژوهش / روز آشتی / روز اسباب بازی احمقانه / روز ریختن شکلات روی همه چیز",
    isHoliday: false,
  },
  {
    jMonth: 9,
    jDay: 26,
    description: "روز رانندگان / روز حمل‌و‌نقل / روز برادران رایت",
    isHoliday: false,
  },
  {
    jMonth: 9,
    jDay: 27,
    description:
      "شهادت آیت‌الله دکتر محمد مفتح و روز وحدت حوزه و دانشگاه / روز پختن بیسکویت / روز مهاجران",
    isHoliday: false,
  },
  {
    jMonth: 9,
    jDay: 28,
    description: "روز مردان و زنان قهرمان",
    isHoliday: false,
  },
  { jMonth: 9, jDay: 29, description: "روز بازی", isHoliday: false },
  { jMonth: 9, jDay: 30, description: "شب یلدا", isHoliday: false },

  // --- Dey (دی) ---
  {
    jMonth: 10,
    jDay: 1,
    description:
      "روز میلاد خورشید / جشن خرم روز، نخستین جشن دیگان / روز ریاضیات / روز قد کوتاهان",
    isHoliday: false,
  },
  {
    jMonth: 10,
    jDay: 2,
    description: "روز پیدا کردن ریشه خانوادگی",
    isHoliday: false,
  },
  { jMonth: 10, jDay: 3, description: "روز ثبت احوال", isHoliday: false },
  {
    jMonth: 10,
    jDay: 5,
    description:
      "سالروز زلزله بم در سال 1382 / روز ایمنی در برابر زلزله و کاهش اثرات بلایای طبیعی",
    isHoliday: false,
  },
  { jMonth: 10, jDay: 6, description: "روز رفتن به باغ وحش", isHoliday: false },
  {
    jMonth: 10,
    jDay: 7,
    description:
      "سالروز تشکیل نهضت سوادآموزی / روز دانلود / روز تماس با یک دوست",
    isHoliday: false,
  },
  {
    jMonth: 10,
    jDay: 8,
    description:
      "دی به آذر روز، دومین جشن دیگان / روز صنعت پتروشیمی / روز ویالن سل / روز تیک تاک ساعت",
    isHoliday: false,
  },
  {
    jMonth: 10,
    jDay: 9,
    description: "روز بیکن (گوشت فراوری شده)",
    isHoliday: false,
  },
  {
    jMonth: 10,
    jDay: 11,
    description: "آغاز سال 2026 میلادی / روز قانون کپی‌رایت",
    isHoliday: false,
  },
  {
    jMonth: 10,
    jDay: 12,
    description: "روز انسان‌های درونگرا / روز انگیزه و الهام",
    isHoliday: false,
  },
  {
    jMonth: 10,
    jDay: 13,
    description:
      "شهادت سردار قاسم سلیمانی / روز خوابیدن / روز احساس حقارت / روز پدر",
    isHoliday: false,
  },
  {
    jMonth: 10,
    jDay: 14,
    description: "روز خط بریل / روز هیپنوتیزم",
    isHoliday: false,
  },
  {
    jMonth: 10,
    jDay: 16,
    description: "سانحه تلخ غرق شدن کشتی سانچی / روز درخت سیب",
    isHoliday: false,
  },
  {
    jMonth: 10,
    jDay: 17,
    description: "روز بزرگداشت خواجوی کرمانی / روز سنگ‌های قدیمی",
    isHoliday: false,
  },
  {
    jMonth: 10,
    jDay: 18,
    description:
      "حادثه تلخ شلیک به هواپیمای اوکراینی به شماره پرواز 752 / روز چرخش زمین / روز ارائه و صحبت در محل کار",
    isHoliday: false,
  },
  {
    jMonth: 10,
    jDay: 19,
    description: "درگذشت اکبر هاشمی رفسنجانی",
    isHoliday: false,
  },
  {
    jMonth: 10,
    jDay: 20,
    description:
      "سالروز کشته شدن امیرکبیر / روز گیاهان آپارتمانی / روز مردم عجیب و غریب",
    isHoliday: false,
  },
  {
    jMonth: 10,
    jDay: 23,
    description:
      "دی به دین روز، چهارمین جشن دیگان / زادروز محمدعلی جمال‌زاده (پدر داستان کوتاه ایران)",
    isHoliday: false,
  },
  {
    jMonth: 10,
    jDay: 24,
    description: "روز استیکر / روز شکاک‌ها / روز پخش رادیو عمومی",
    isHoliday: false,
  },
  {
    jMonth: 10,
    jDay: 30,
    description:
      "حادثه تلخ آتش‌سوزی و فروریختن پلاسکو / روز پاپ‌کورن / روز سلفی در موزه",
    isHoliday: false,
  },

  // --- Bahman (بهمن) ---
  {
    jMonth: 11,
    jDay: 1,
    description: "زادروز حکیم ابوالقاسم فردوسی / روز گرانولا / روز بازی",
    isHoliday: false,
  },
  {
    jMonth: 11,
    jDay: 2,
    description: "بهمن روز، جشن بهمن‌گان / روز سس تند",
    isHoliday: false,
  },
  {
    jMonth: 11,
    jDay: 3,
    description: "روز پای / روز دست‌خط / روز پاسدار",
    isHoliday: false,
  },
  {
    jMonth: 11,
    jDay: 4,
    description: "روز کره بادام‌زمینی / روز خنده / روز آموزش / روز جانباز",
    isHoliday: false,
  },
  { jMonth: 11, jDay: 5, description: "جشن نوسره", isHoliday: false },
  {
    jMonth: 11,
    jDay: 6,
    description: "روز آواها و نواهای ایرانی / روز انرژ‌های پاک",
    isHoliday: false,
  },
  { jMonth: 11, jDay: 7, description: "روز کیک شکلاتی", isHoliday: false },
  {
    jMonth: 11,
    jDay: 8,
    description: "روز لگو / روز حریم خصوصی داده",
    isHoliday: false,
  },
  { jMonth: 11, jDay: 9, description: "روز آزاداندیشان", isHoliday: false },
  {
    jMonth: 11,
    jDay: 10,
    description: "جشن سده / روز کروسان",
    isHoliday: false,
  },
  {
    jMonth: 11,
    jDay: 11,
    description: "روز نایلون حبابی / روز جهانی گورخر / روز جوان",
    isHoliday: false,
  },
  {
    jMonth: 11,
    jDay: 12,
    description: "آغاز دهه فجر / روز بیمه اتومبیل",
    isHoliday: false,
  },
  {
    jMonth: 11,
    jDay: 13,
    description: "روز شمع / روز تالاب‌ها / روز موش‌خرما",
    isHoliday: false,
  },
  {
    jMonth: 11,
    jDay: 14,
    description: "روز فناوری فضایی / روز خواندن با صدای بلند",
    isHoliday: false,
  },
  {
    jMonth: 11,
    jDay: 15,
    description:
      "زادروز استاد علی نصیریان / جشن میانه زمستان / روز همبستگی انسانی",
    isHoliday: false,
  },
  {
    jMonth: 11,
    jDay: 16,
    description: "روز نوتلا / روز بازی در مدارس",
    isHoliday: false,
  },
  {
    jMonth: 11,
    jDay: 17,
    description: "روز تعریف و تمجید از یکدیگر",
    isHoliday: false,
  },
  { jMonth: 11, jDay: 18, description: "روز رقص باله", isHoliday: false },
  {
    jMonth: 11,
    jDay: 19,
    description: "روز نیروی هوایی / روز موسیقی اپرا",
    isHoliday: false,
  },
  { jMonth: 11, jDay: 20, description: "روز پیتزا", isHoliday: false },
  { jMonth: 11, jDay: 21, description: "روز چتر", isHoliday: false },
  {
    jMonth: 11,
    jDay: 22,
    description: "پیروزی انقلاب اسلامی",
    isHoliday: true,
  },
  { jMonth: 11, jDay: 23, description: "روز پودینگ آلو", isHoliday: false },
  {
    jMonth: 11,
    jDay: 24,
    description: "روز رادیو / روز آگاهی از حقوق کارمندان",
    isHoliday: false,
  },
  {
    jMonth: 11,
    jDay: 25,
    description: "ولنتاین، روز عشق / روز اهدای کتاب",
    isHoliday: false,
  },
  { jMonth: 11, jDay: 26, description: "روز اسب آبی", isHoliday: false },
  { jMonth: 11, jDay: 27, description: "روز نوآوری", isHoliday: false },
  { jMonth: 11, jDay: 28, description: "روز روح انسان", isHoliday: false },
  {
    jMonth: 11,
    jDay: 29,
    description: "زادروز استاد شهرام ناظری / روز سیاره پلوتون",
    isHoliday: false,
  },

  // --- Esfand (اسفند) ---
  {
    jMonth: 12,
    jDay: 1,
    description: "روز مافین / روز دست‌بند / روز عدالت اجتماعی",
    isHoliday: false,
  },
  { jMonth: 12, jDay: 2, description: "روز زبان مادری", isHoliday: false },
  {
    jMonth: 12,
    jDay: 5,
    description:
      "سپندارمذگان، روز عشق / روز مهندس / بزرگداشت خواجه نصیرالدین طوسی / روز بزرگداشت زن و زمین / زادروز استیو جابز (بنیانگذار اپل)",
    isHoliday: false,
  },
  {
    jMonth: 12,
    jDay: 7,
    description:
      "سالروز استقلال کانون وکلای دادگستری / روز وکیل مدافع / سالروز درگذشت استاد علی‌اکبر دهخدا",
    isHoliday: false,
  },
  {
    jMonth: 12,
    jDay: 8,
    description: "روز حمایت از بیماران نادر / روز امور تربیتی",
    isHoliday: false,
  },
  {
    jMonth: 12,
    jDay: 9,
    description: "روز حمایت از حقوق مصرف کننده",
    isHoliday: false,
  },
  { jMonth: 12, jDay: 11, description: "روز حیات وحش", isHoliday: false },
  {
    jMonth: 12,
    jDay: 12,
    description: "روز سرباز اسباب‌بازی",
    isHoliday: false,
  },
  {
    jMonth: 12,
    jDay: 15,
    description:
      "روز احسان و نیکوکاری / معمار ایرانی / سالروز درگذشت دکتر محمد مصدق / روز ترویج فرهنگ قرض‌الحسنه / زادروز میکل‌آنژ (نقاش و پیکرتراش بزرگ ایتالیایی)",
    isHoliday: false,
  },
  { jMonth: 12, jDay: 16, description: "روز درخت‌کاری", isHoliday: false },
  { jMonth: 12, jDay: 18, description: "روز زن", isHoliday: false },
  { jMonth: 12, jDay: 20, description: "جشن نوروز رودها", isHoliday: false },
  { jMonth: 12, jDay: 21, description: "جشن گلدان", isHoliday: false },
  { jMonth: 12, jDay: 25, description: "روز عدد پی π", isHoliday: false },
  {
    jMonth: 12,
    jDay: 27,
    description:
      "بزرگداشت پروین اعتصامی / هزارمین سالگرد پایان سرایش شاهنامه فردوسی",
    isHoliday: false,
  },
  {
    jMonth: 12,
    jDay: 28,
    description: "جشن فروردگان / چهارشنبه‌سوری",
    isHoliday: false,
  },
  {
    jMonth: 12,
    jDay: 30,
    description:
      "روز ملی شدن صنعت نفت ایران / جشن پایان زمستان / نجات‌بخش ایرانی / جشن اوشیدر (نجات‌بخش ایرانی) در دریاچه هامون و کوه خواجه",
    isHoliday: true,
  },
];

// --- React Component ---

const DailyEventsJalaali: React.FC = () => {
  // 1. Get current Gregorian date
  const todayGregorian = new Date();

  // 2. Convert to Jalaali using jalaali-js
  const todayJalaali = jalaali.toJalaali(todayGregorian); // Returns { jy, jm, jd }

  const currentJMonth: number = todayJalaali.jm; // jm is 1-based (1-12)
  const currentJDay: number = todayJalaali.jd; // jd is 1-based (1-31)

  // 4. Filter events for the current day (logic remains the same)
  const todaysEvents: EventItem[] = allEvents.filter(
    (event) => event.jMonth === currentJMonth && event.jDay === currentJDay
  );

  return (
    <div style={styles.container}>
      <div style={styles.eventsSection}>
        <h3 style={styles.eventsTitle}>مناسبت‌های امروز:</h3>
        {todaysEvents.length > 0 ? (
          <ul style={styles.eventList}>
            {todaysEvents.map((event, index) => (
              <li
                key={index}
                style={{
                  ...styles.eventItem,
                  ...(event.isHoliday ? styles.holiday : {}),
                }}
              >
                {event.description.split("/").map((line, index) => (
                  <p
                    key={index}
                    className="text-gray-700 leading-relaxed mb-1 text-sm"
                  >
                    {line.trim()}
                  </p>
                ))}

                {event.isHoliday && (
                  <span style={styles.holidayMarker}> (تعطیل رسمی)</span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p style={styles.noEvents}>امروز مناسبت خاصی ثبت نشده است.</p>
        )}
      </div>
    </div>
  );
};

// --- Styling (Same as before) ---
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: "1px",
    maxWidth: "280px", // Increased max-width slightly
    margin: "1px auto",
    direction: "rtl", // Set text direction to right-to-left
    textAlign: "right", // Align text to the right
  },
  dateHeader: {
    textAlign: "center",
    color: "#333",
    borderBottom: "1px solid #eee",
    paddingBottom: "10px",
    marginBottom: "15px",
  },
  eventsSection: {
    marginTop: "15px",
  },
  eventsTitle: {
    color: "#555",
    fontSize: "1.1em",
    marginBottom: "10px",
  },
  eventList: {
    listStyle: "none",
    paddingRight: 0, // Reset padding for RTL
    paddingLeft: 0,
  },
  eventItem: {
    backgroundColor: "#fff",
    padding: "8px 12px",
    marginBottom: "5px",
    borderRadius: "4px",
    borderRight: "4px solid #007bff", // Changed border side for RTL
    borderLeft: "none",
    fontSize: "0.95em",
  },
  holiday: {
    borderRightColor: "#dc3545", // Changed border side for RTL
    fontWeight: "bold",
  },
  eventType: {
    fontSize: "0.8em",
    color: "#6c757d",
    marginRight: "5px", // Changed margin side for RTL
    marginLeft: "0",
  },
  holidayMarker: {
    color: "#dc3545",
    fontSize: "0.8em",
    marginRight: "5px", // Changed margin side for RTL
    marginLeft: "0",
    fontWeight: "bold",
  },
  noEvents: {
    color: "#777",
    fontStyle: "italic",
  },
  lunarNote: {
    fontSize: "0.85em",
    color: "#888",
    marginTop: "15px",
    borderTop: "1px dashed #ddd",
    paddingTop: "10px",
    lineHeight: "1.5",
  },
};

export default DailyEventsJalaali;
