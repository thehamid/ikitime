import React, { useState, useEffect } from 'react';
import jalaali from 'jalaali-js';

// 1. وارد کردن تابع و تایپ تم فصلی
import { getSeasonalTheme, SeasonTheme } from '../../utils/seasonalColors';

// اینترفیس و آرایه‌های ثابت شما بدون تغییر باقی می‌مانند
interface ShamsiDate {
  jy: number;
  jm: number;
  jd: number;
}

const shamsiMonthNames: string[] = [
  "فروردین", "اردیبهشت", "خرداد",
  "تیر", "مرداد", "شهریور",
  "مهر", "آبان", "آذر",
  "دی", "بهمن", "اسفند"
];

const persianDayNames: string[] = [
  "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه", "شنبه"
];

const ShamsiDateDisplay: React.FC = () => {
  // استیت‌های قبلی شما
  const [shamsiDate, setShamsiDate] = useState<ShamsiDate | null>(null);
  const [dayOfWeekName, setDayOfWeekName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 2. استیت جدید برای نگهداری تم فصل
  const [theme, setTheme] = useState<SeasonTheme | null>(null);

  useEffect(() => {
    try {
      const todayGregorian = new Date();
      const gy = todayGregorian.getFullYear();
      const gm = todayGregorian.getMonth() + 1;
      const gd = todayGregorian.getDate();

      const todayShamsi: ShamsiDate = jalaali.toJalaali(gy, gm, gd);
      setShamsiDate(todayShamsi);

      const dayIndex = todayGregorian.getDay();
      const currentDayName = persianDayNames[dayIndex];
      setDayOfWeekName(currentDayName);

      // 3. محاسبه و تنظیم تم فصل در همین useEffect
      const currentTheme = getSeasonalTheme(todayGregorian);
      setTheme(currentTheme);

      setError(null);

    } catch (err) {
      console.error("خطا در محاسبه تاریخ:", err);
      setError("خطا در محاسبه تاریخ شمسی رخ داد.");
      setShamsiDate(null);
      setDayOfWeekName(null);
      setTheme(null); // پاک کردن تم در صورت خطا
    }
  }, []);

  if (error) {
    return <div style={{ color: 'red', direction: 'rtl', textAlign: 'center', marginTop: '20px' }}>{error}</div>;
  }

  // 4. شرط بارگذاری باید تم را هم چک کند
  if (!shamsiDate || !dayOfWeekName || !theme) {
    return <div style={{ direction: 'rtl', textAlign: 'center', marginTop: '20px' }}>در حال بارگذاری...</div>;
  }

  // تابع تبدیل اعداد شما بدون تغییر
  const toPersianDigits = (num: number): string => {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return String(num)
      .padStart(2, '0')
      .split('')
      .map(d => persianDigits[parseInt(d)])
      .join('');
  };

  const monthName = shamsiMonthNames[shamsiDate.jm - 1] || '';
  const yearWithMonth = `${monthName} ${toPersianDigits(shamsiDate.jy)}`;
  const numberDay = `${toPersianDigits(shamsiDate.jd)}`;

  // 5. ساخت آبجکت استایل داینامیک بر اساس تم
  const cardStyle: React.CSSProperties = {
    backgroundColor: theme.primary,
    color: theme.text,
    padding: '2rem', // معادل p-8
    width: '100%',
    borderRadius: '0.5rem', // معادل rounded-lg
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', // معادل shadow-md
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    fontWeight: 'bold',
    margin: '0.5rem', // معادل m-2
    transition: 'background-color 0.5s ease, color 0.5s ease', // انیمیشن نرم
    fontFamily: 'Pinar, sans-serif', // فونت فارسی زیبا
  };

  return (
    <div>
      <div style={cardStyle}>
        <span>{dayOfWeekName}</span>
        {/* کلاس text-8xl چون مربوط به سایز است و رنگ ندارد، می‌ماند */}
        <span className='font-extrabold text-8xl p-6'>{numberDay}</span>
        <span>{yearWithMonth}</span>
      </div>
    </div>
  );
};

export default ShamsiDateDisplay;