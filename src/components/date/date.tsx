import React, { useState, useEffect } from 'react';
import jalaali from 'jalaali-js'; // وارد کردن کتابخانه

// (اختیاری) تعریف یک اینترفیس برای وضوح بیشتر نوع داده تاریخ شمسی
interface ShamsiDate {
  jy: number; // سال شمسی
  jm: number; // ماه شمسی (1 تا 12)
  jd: number; // روز شمسی (1 تا 31)
}

// نام ماه‌های شمسی
const shamsiMonthNames: string[] = [
  "فروردین", "اردیبهشت", "خرداد",
  "تیر", "مرداد", "شهریور",
  "مهر", "آبان", "آذر",
  "دی", "بهمن", "اسفند"
];




// نام روزهای هفته فارسی - اندیس با getDay() جاوااسکریپت مطابقت دارد (0 = یکشنبه)
const persianDayNames: string[] = [
  "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه", "شنبه"
];

const ShamsiDateDisplay: React.FC = () => {
  // State برای تاریخ شمسی
  const [shamsiDate, setShamsiDate] = useState<ShamsiDate | null>(null);
  // State برای نام روز هفته
  const [dayOfWeekName, setDayOfWeekName] = useState<string | null>(null);
  // State برای خطا
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // گرفتن تاریخ و زمان میلادی امروز
      const todayGregorian = new Date();
      const gy = todayGregorian.getFullYear();
      const gm = todayGregorian.getMonth() + 1; // ماه‌ها در جاوااسکریپت 0-پایه هستند
      const gd = todayGregorian.getDate();

      // 1. تبدیل تاریخ میلادی به شمسی
      const todayShamsi: ShamsiDate = jalaali.toJalaali(gy, gm, gd);
      setShamsiDate(todayShamsi);

      // 2. تعیین روز هفته
      const dayIndex = todayGregorian.getDay(); // 0 برای یکشنبه، 1 دوشنبه، ...، 6 شنبه
      const currentDayName = persianDayNames[dayIndex]; // گرفتن نام فارسی از آرایه
      setDayOfWeekName(currentDayName);

      setError(null); // پاک کردن خطا در صورت موفقیت

    } catch (err) {
      console.error("خطا در محاسبه تاریخ:", err);
      setError("خطا در محاسبه تاریخ شمسی رخ داد.");
      setShamsiDate(null);
      setDayOfWeekName(null); // پاک کردن نام روز هفته در صورت خطا
    }

    // این افکت فقط یک بار پس از اولین رندر اجرا می‌شود.
  }, []);

  // نمایش حالت خطا
  if (error) {
    return <div style={{ color: 'red', direction: 'rtl' }}>{error}</div>;
  }

  // نمایش حالت بارگذاری تا زمانی که تاریخ و روز هفته محاسبه نشده‌اند
  if (!shamsiDate || !dayOfWeekName) {
    return <div style={{ direction: 'rtl' }}>در حال بارگذاری تاریخ شمسی...</div>;
  }

  // فرمت‌بندی تاریخ برای نمایش

// تابع تبدیل اعداد انگلیسی به فارسی
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
  const numberDay= `${toPersianDigits(shamsiDate.jd)}`;
  return (
    <div>
      {/* نمایش روز هفته */} 
    

        <div className='bg-gray-200 p-8 w-full rounded-lg shadow-md flex flex-col justify-evenly items-center font-bold m-2'>
            <span >{dayOfWeekName}</span>
            <span className='font-extrabold text-8xl p-6'>{numberDay}</span>
            <span>{yearWithMonth}</span>
          </div>




    </div>
  );
};

export default ShamsiDateDisplay;