// src/utils/seasonalColors.ts

// 1. وارد کردن کتابخانه jalaali-js
import jalaali from 'jalaali-js';

// 2. تعریف تایپ برای تم فصل‌ها (بدون تغییر)
export interface SeasonTheme {
  name: string;
  primary: string;      // رنگ پس‌زمینه اصلی
  secondary: string;    // رنگ برای دکمه‌ها یا کارت‌ها
  text: string;         // رنگ متن اصلی
  accent: string;       // رنگ تاکیدی
}

// 3. تابع اصلی برای دریافت تم فصل
export const getSeasonalTheme = (date: Date): SeasonTheme => {
  // 4. استخراج سال، ماه و روز میلادی از تاریخ ورودی
  const gy = date.getFullYear();
  const gm = date.getMonth() + 1; // ماه‌ها در جاوااسکریپت 0-پایه هستند (0 تا 11)
  const gd = date.getDate();

  // 5. تبدیل تاریخ میلادی به شمسی با استفاده از jalaali-js
  // خروجی تابع toJalaali یک آبجکت شامل { jy, jm, jd } است
  const { jm } = jalaali.toJalaali(gy, gm, gd);
  const jMonth = jm;

  // 6. تعریف تم‌ها برای هر فصل (بدون تغییر)
  const springTheme: SeasonTheme = {
    name: 'بهار',
    primary: '#dcfce7',      // سبز بسیار روشن
    secondary: '#86efac',    // سبز روشن
    text: '#14532d',         // سبز تیره
    accent: '#fbbf24',       // زرد (رنگ گل‌های بهاری)
  };

  const summerTheme: SeasonTheme = {
    name: 'تابستان',
    primary: '#fef3c7',      // زرد بسیار روشن
    secondary: '#fcd34d',    // زرد روشن
    text: '#78350f',         // قهوه‌ای تیره
    accent: '#f97316',       // نارنجی (رنگ آفتاب)
  };

  const autumnTheme: SeasonTheme = {
    name: 'پاییز',
    primary: '#fed7aa',      // نارنجی بسیار روشن
    secondary: '#fb923c',    // نارنجی روشن
    text: '#7c2d12',         // نارنجی تیره
    accent: '#a21caf',       // بنفش (رنگ غروب پاییزی),
  };

  const winterTheme: SeasonTheme = {
    name: 'زمستان',
    primary: '#e0e7ff',      // بنفش آبی بسیار روشن
    secondary: '#a5b4fc',    // بنفش آبی روشن
    text: '#312e81',         // بنفش آبی تیره
    accent: '#0ea5e9',       // آبی (رنگ آسمان زمستانی),
  };

  // 7. انتخاب تم بر اساس ماه (بدون تغییر)
  if (jMonth >= 1 && jMonth <= 3) { // فروردین، اردیبهشت، خرداد
    return springTheme;
  } else if (jMonth >= 4 && jMonth <= 6) { // تیر، مرداد، شهریور
    return summerTheme;
  } else if (jMonth >= 7 && jMonth <= 9) { // مهر، آبان، آذر
    return autumnTheme;
  } else { // دی، بهمن، اسفند
    return winterTheme;
  }
};