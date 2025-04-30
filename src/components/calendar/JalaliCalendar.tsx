import React from 'react';
import jalaali from 'jalaali-js';
import './JalaliCalendar.css'; // فایل CSS برای استایل‌ها

const JalaliCalendar: React.FC = () => {
  // 1. دریافت تاریخ امروز میلادی و تبدیل به شمسی
  const todayGregorian = new Date();
  const todayJalaali = jalaali.toJalaali(
    todayGregorian.getFullYear(),
    todayGregorian.getMonth() + 1, // ماه در JS از 0 شروع می‌شود
    todayGregorian.getDate()
  );

  const currentJYear = todayJalaali.jy;
  const currentJMonth = todayJalaali.jm;
  const currentJDay = todayJalaali.jd; // روز جاری شمسی برای هایلایت

  // 2. محاسبه اطلاعات ماه جاری شمسی
  const daysInMonth = jalaali.jalaaliMonthLength(currentJYear, currentJMonth);
  const firstDayOfMonthGregorian = jalaali.toGregorian(currentJYear, currentJMonth, 1);
  const firstDayOfMonthDateObj = new Date(
    firstDayOfMonthGregorian.gy,
    firstDayOfMonthGregorian.gm - 1, // ماه در JS از 0 شروع می‌شود
    firstDayOfMonthGregorian.gd
  );

  
  // 3. محاسبه روز هفته برای اولین روز ماه (شنبه=0, یکشنبه=1, ...)
  // getDay()‎ در JS یکشنبه را 0 و شنبه را 6 برمی‌گرداند.
  // ما شنبه را 0 می‌خواهیم.
  let firstDayWeekday = (firstDayOfMonthDateObj.getDay() + 1) % 7; // تبدیل به: شنبه=0, ... جمعه=6

  // 4. آرایه‌ای برای نگهداری روزهای قابل نمایش در گرید
  const gridCells: (number | null)[] = [];

  // اضافه کردن سلول‌های خالی برای روزهای قبل از شروع ماه
  for (let i = 0; i < firstDayWeekday; i++) {
    gridCells.push(null);
  }

  // اضافه کردن روزهای ماه
  for (let day = 1; day <= daysInMonth; day++) {
    gridCells.push(day); // تبدیل به عدد
  }

  // اضافه کردن سلول‌های خالی در انتها برای تکمیل گرید (اختیاری، برای داشتن شکل ثابت)
  // معمولاً تا 6 ردیف (42 سلول) نیاز است
   while (gridCells.length % 7 !== 0) {
       gridCells.push(null);
   }
  // یا اگر می‌خواهید حتما 6 ردیف باشد:
  // while (gridCells.length < 42) {
  //  gridCells.push(null);
  // }


  // 5. نام‌های فارسی روزهای هفته و ماه‌ها
  const persianWeekdays = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج']; // شنبه تا جمعه
  const persianMonths = [
    "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
    "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"
  ];
  const currentMonthName = persianMonths[currentJMonth - 1]; // ماه شمسی از 1 شروع می‌شود

  return (
    <div className="jalali-calendar" dir="rtl"> {/* اضافه کردن dir="rtl" برای نمایش راست به چپ */}
      <h2>{currentMonthName} {currentJYear}</h2>
      <div className="calendar-grid">
        {/* نمایش هدر روزهای هفته */}
        {persianWeekdays.map(dayName => (
          <div key={dayName} className="weekday-header">
            {dayName}
          </div>
        ))}

        {/* نمایش روزهای ماه */}
        {gridCells.map((day, index) => {
          const isToday = day === currentJDay;
          const cellClasses = [
            'day-cell',
            day === null ? 'empty' : '',
            isToday ? 'today' : '',
          ].filter(Boolean).join(' '); // کلاس‌ها را ترکیب می‌کند

          return (
            <div key={index} className={cellClasses}>
              {day !== null ? day : ''}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JalaliCalendar;