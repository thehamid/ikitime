import React from 'react';
import jalaali from 'jalaali-js'; // Import the jalaali-js library

// --- Helper Functions ---





// --- Event Data ---

interface EventItem {
  jMonth: number; // Jalali month (1-12)
  jDay: number;   // Jalali day (1-31)
  description: string; // Event description
  isHoliday: boolean;  // Is it a public holiday?
  type: 'iranian' | 'global'; // Type of event
}

// NOTE: This is a more comprehensive list, but still static.
// Lunar-based events (like Eid al-Fitr, Ashura) are NOT included
// as their Jalali date changes yearly. Use an API for those.
const allEvents: EventItem[] = [
  // --- Global ---
  { jMonth: 10, jDay: 11, description: 'روز سال نو میلادی', isHoliday: false, type: 'global' }, // ~ January 1st
  { jMonth: 11, jDay: 25, description: 'روز جهانی زن', isHoliday: false, type: 'global' }, // March 8th
  { jMonth: 1, jDay: 2, description: 'روز جهانی زمین', isHoliday: false, type: 'global' }, // April 22nd
  { jMonth: 2, jDay: 11, description: 'روز جهانی کارگر', isHoliday: false, type: 'global' }, // May 1st

  // --- Farvardin (فروردین) ---
  { jMonth: 1, jDay: 1, description: 'جشن نوروز - آغاز سال نو', isHoliday: true, type: 'iranian' },
  { jMonth: 1, jDay: 2, description: 'عید نوروز / روز جهانی آب', isHoliday: true, type: 'iranian' }, // Added Global Water Day
  { jMonth: 1, jDay: 3, description: 'عید نوروز', isHoliday: true, type: 'iranian' },
  { jMonth: 1, jDay: 4, description: 'عید نوروز', isHoliday: true, type: 'iranian' },
  { jMonth: 1, jDay: 7, description: 'روز جهانی تئاتر', isHoliday: false, type: 'global' },
  { jMonth: 1, jDay: 12, description: 'روز جمهوری اسلامی ایران', isHoliday: true, type: 'iranian' },
  { jMonth: 1, jDay: 13, description: 'روز طبیعت (سیزده بدر)', isHoliday: true, type: 'iranian' },
  { jMonth: 1, jDay: 18, description: 'روز جهانی بهداشت', isHoliday: false, type: 'global' },
  { jMonth: 1, jDay: 25, description: 'روز بزرگداشت عطار نیشابوری', isHoliday: false, type: 'iranian' },
  { jMonth: 1, jDay: 29, description: 'روز ارتش جمهوری اسلامی ایران', isHoliday: false, type: 'iranian' },

  // --- Ordibehesht (اردیبهشت) ---
  { jMonth: 2, jDay: 1, description: 'روز بزرگداشت سعدی', isHoliday: false, type: 'iranian' },
  { jMonth: 2, jDay: 2, description: 'روز زمین پاک', isHoliday: false, type: 'iranian' }, // Often linked to Earth Day
  { jMonth: 2, jDay: 3, description: 'روز بزرگداشت شیخ بهایی / روز ملی کارآفرینی', isHoliday: false, type: 'iranian' },
  { jMonth: 2, jDay: 9, description: 'روز شوراها', isHoliday: false, type: 'iranian' },
  { jMonth: 2, jDay: 10, description: 'روز ملی خلیج فارس', isHoliday: false, type: 'iranian' },
  { jMonth: 2, jDay: 12, description: 'روز معلم (بزرگداشت شهادت استاد مطهری)', isHoliday: false, type: 'iranian' },
  { jMonth: 2, jDay: 15, description: 'روز بزرگداشت شیخ صدوق / روز جهانی ماما', isHoliday: false, type: 'iranian' },
  { jMonth: 2, jDay: 17, description: 'روز اسناد ملی و میراث مکتوب', isHoliday: false, type: 'iranian' },
  { jMonth: 2, jDay: 18, description: 'روز جهانی صلیب سرخ و هلال احمر', isHoliday: false, type: 'global' },
  { jMonth: 2, jDay: 25, description: 'روز بزرگداشت فردوسی', isHoliday: false, type: 'iranian' },
  { jMonth: 2, jDay: 28, description: 'روز بزرگداشت خیام نیشابوری / روز جهانی موزه و میراث فرهنگی', isHoliday: false, type: 'iranian' },

  // --- Khordad (خرداد) ---
  { jMonth: 3, jDay: 1, description: 'روز بزرگداشت ملاصدرا / روز بهره‌وری و بهینه‌سازی مصرف', isHoliday: false, type: 'iranian' },
  { jMonth: 3, jDay: 3, description: 'فتح خرمشهر در عملیات بیت المقدس و روز مقاومت، ایثار و پیروزی', isHoliday: false, type: 'iranian' },
  { jMonth: 3, jDay: 14, description: 'رحلت حضرت امام خمینی (ره)', isHoliday: true, type: 'iranian' },
  { jMonth: 3, jDay: 15, description: 'قیام خونین ۱۵ خرداد', isHoliday: true, type: 'iranian' },
  { jMonth: 3, jDay: 20, description: 'روز جهانی صنایع دستی', isHoliday: false, type: 'global' },
  { jMonth: 3, jDay: 27, description: 'روز جهاد کشاورزی / روز جهانی بیابان‌زدایی', isHoliday: false, type: 'iranian' },
  { jMonth: 3, jDay: 29, description: 'درگذشت دکتر علی شریعتی', isHoliday: false, type: 'iranian' },

  // --- Tir (تیر) ---
  { jMonth: 4, jDay: 1, description: 'روز اصناف / جشن آب پاشونک', isHoliday: false, type: 'iranian' },
  { jMonth: 4, jDay: 7, description: 'شهادت آیت الله دکتر بهشتی؛ روز قوه قضاییه', isHoliday: false, type: 'iranian' },
  { jMonth: 4, jDay: 8, description: 'روز مبارزه با سلاح های شیمیایی و میکروبی', isHoliday: false, type: 'iranian' },
  { jMonth: 4, jDay: 10, description: 'روز صنعت و معدن', isHoliday: false, type: 'iranian' },
  { jMonth: 4, jDay: 14, description: 'روز قلم', isHoliday: false, type: 'iranian' },
  { jMonth: 4, jDay: 21, description: 'روز حجاب و عفاف', isHoliday: false, type: 'iranian' },
  { jMonth: 4, jDay: 25, description: 'روز بهزیستی و تامین اجتماعی', isHoliday: false, type: 'iranian' },

  // --- Mordad (مرداد) ---
  { jMonth: 5, jDay: 6, description: 'روز ترویج آموزش های فنی و حرفه ای', isHoliday: false, type: 'iranian' },
  { jMonth: 5, jDay: 8, description: 'روز بزرگداشت شیخ شهاب الدین سهروردی (شیخ اشراق)', isHoliday: false, type: 'iranian' },
  { jMonth: 5, jDay: 10, description: 'جشن چله تابستان', isHoliday: false, type: 'iranian' },
  { jMonth: 5, jDay: 14, description: 'صدور فرمان مشروطیت / روز حقوق بشر اسلامی و کرامت انسانی', isHoliday: false, type: 'iranian' },
  { jMonth: 5, jDay: 17, description: 'روز خبرنگار', isHoliday: false, type: 'iranian' },
  { jMonth: 5, jDay: 26, description: 'سالروز ورود آزادگانِ سرافراز به وطن', isHoliday: false, type: 'iranian' },
  { jMonth: 5, jDay: 28, description: 'کودتای ۲۸ مرداد / روز جهانی عکاسی', isHoliday: false, type: 'iranian' },

  // --- Shahrivar (شهریور) ---
  { jMonth: 6, jDay: 1, description: 'روز بزرگداشت ابوعلی سینا و روز پزشک', isHoliday: false, type: 'iranian' },
  { jMonth: 6, jDay: 2, description: 'آغاز هفته دولت / شهادت سید علی اندرزگو', isHoliday: false, type: 'iranian' },
  { jMonth: 6, jDay: 4, description: 'روز کارمند', isHoliday: false, type: 'iranian' },
  { jMonth: 6, jDay: 5, description: 'روز بزرگداشت محمد بن زکریای رازی و روز داروساز', isHoliday: false, type: 'iranian' },
  { jMonth: 6, jDay: 8, description: 'روز مبارزه با تروریسم (انفجار دفتر نخست وزیری)', isHoliday: false, type: 'iranian' },
  { jMonth: 6, jDay: 11, description: 'روز صنعت چاپ', isHoliday: false, type: 'iranian' },
  { jMonth: 6, jDay: 13, description: 'روز بزرگداشت ابوریحان بیرونی / روز تعاون', isHoliday: false, type: 'iranian' },
  { jMonth: 6, jDay: 17, description: 'قیام ۱۷ شهریور', isHoliday: false, type: 'iranian' },
  { jMonth: 6, jDay: 19, description: 'وفات آیت الله طالقانی / روز جهانی پیشگیری از خودکشی', isHoliday: false, type: 'iranian' },
  { jMonth: 6, jDay: 21, description: 'روز سینما', isHoliday: false, type: 'iranian' },
  { jMonth: 6, jDay: 27, description: 'روز شعر و ادب پارسی (بزرگداشت استاد شهریار)', isHoliday: false, type: 'iranian' },
  { jMonth: 6, jDay: 30, description: 'روز جهانی صلح', isHoliday: false, type: 'global' },
  { jMonth: 6, jDay: 31, description: 'آغاز هفته دفاع مقدس', isHoliday: false, type: 'iranian' },

  // --- Mehr (مهر) ---
  { jMonth: 7, jDay: 1, description: 'آغاز سال تحصیلی', isHoliday: false, type: 'iranian' },
  { jMonth: 7, jDay: 5, description: 'روز جهانی جهانگردی', isHoliday: false, type: 'global' },
  { jMonth: 7, jDay: 7, description: 'روز آتش نشانی و ایمنی / شهادت سرداران اسلام در سانحه هوایی', isHoliday: false, type: 'iranian' },
  { jMonth: 7, jDay: 8, description: 'روزبزرگداشت مولوی (جلال‌الدین محمد بلخی)', isHoliday: false, type: 'iranian' },
  { jMonth: 7, jDay: 9, description: 'روز جهانی ناشنوایان / روز همبستگی با کودکان و نوجوانان فلسطینی', isHoliday: false, type: 'global' },
  { jMonth: 7, jDay: 13, description: 'روز نیروی انتظامی / روز جهانی معلم', isHoliday: false, type: 'iranian' },
  { jMonth: 7, jDay: 14, description: 'روز دامپزشکی', isHoliday: false, type: 'iranian' },
  { jMonth: 7, jDay: 16, description: 'روز ملی کودک', isHoliday: false, type: 'iranian' },
  { jMonth: 7, jDay: 17, description: 'روز جهانی پست', isHoliday: false, type: 'global' },
  { jMonth: 7, jDay: 20, description: 'روز بزرگداشت حافظ', isHoliday: false, type: 'iranian' },
  { jMonth: 7, jDay: 23, description: 'روز جهانی استاندارد', isHoliday: false, type: 'global' },
  { jMonth: 7, jDay: 24, description: 'روز جهانی غذا', isHoliday: false, type: 'global' },
  { jMonth: 7, jDay: 26, description: 'روز تربیت بدنی و ورزش', isHoliday: false, type: 'iranian' },

  // --- Aban (آبان) ---
  { jMonth: 8, jDay: 1, description: 'روز آمار و برنامه ریزی', isHoliday: false, type: 'iranian' },
  { jMonth: 8, jDay: 8, description: 'روز نوجوان / شهادت محمدحسین فهمیده', isHoliday: false, type: 'iranian' },
  { jMonth: 8, jDay: 10, description: 'روز آبانگان، جشن بزرگداشت آب', isHoliday: false, type: 'iranian' },
  { jMonth: 8, jDay: 13, description: 'روز دانش آموز / روز ملی مبارزه با استکبار جهانی', isHoliday: false, type: 'iranian' },
  { jMonth: 8, jDay: 14, description: 'روز فرهنگ عمومی', isHoliday: false, type: 'iranian' },
  { jMonth: 8, jDay: 24, description: 'روز کتاب، کتابخوانی و کتابدار / بزرگداشت علامه طباطبایی', isHoliday: false, type: 'iranian' },

  // --- Azar (آذر) ---
  { jMonth: 9, jDay: 1, description: 'روز آذرگان، جشن آتش', isHoliday: false, type: 'iranian' },
  { jMonth: 9, jDay: 5, description: 'روز بسیج مستضعفین', isHoliday: false, type: 'iranian' },
  { jMonth: 9, jDay: 7, description: 'روز نیروی دریایی', isHoliday: false, type: 'iranian' },
  { jMonth: 9, jDay: 9, description: 'روز بزرگداشت شیخ مفید / جشن آذرگان', isHoliday: false, type: 'iranian' },
  { jMonth: 9, jDay: 10, description: 'روز مجلس / شهادت آیت الله مدرس', isHoliday: false, type: 'iranian' },
  { jMonth: 9, jDay: 12, description: 'روز قانون اساسی جمهوری اسلامی ایران / روز جهانی معلولان', isHoliday: false, type: 'iranian' },
  { jMonth: 9, jDay: 15, description: 'روز حسابدار', isHoliday: false, type: 'iranian' },
  { jMonth: 9, jDay: 16, description: 'روز دانشجو', isHoliday: false, type: 'iranian' },
  { jMonth: 9, jDay: 19, description: 'روز جهانی حقوق بشر', isHoliday: false, type: 'global' },
  { jMonth: 9, jDay: 25, description: 'روز پژوهش', isHoliday: false, type: 'iranian' },
  { jMonth: 9, jDay: 27, description: 'شهادت آیت الله دکتر محمد مفتح / روز وحدت حوزه و دانشگاه', isHoliday: false, type: 'iranian' },
  { jMonth: 9, jDay: 30, description: 'جشن شب یلدا', isHoliday: false, type: 'iranian' },

  // --- Dey (دی) ---
  { jMonth: 10, jDay: 1, description: 'روز میلاد خورشید؛ جشن خرم روز', isHoliday: false, type: 'iranian' },
  { jMonth: 10, jDay: 4, description: 'میلاد حضرت عیسی مسیح (ع)', isHoliday: false, type: 'global' },
  { jMonth: 10, jDay: 5, description: 'روز ایمنی در برابر زلزله و کاهش اثرات بلایای طبیعی', isHoliday: false, type: 'iranian' },
  { jMonth: 10, jDay: 13, description: 'شهادت سردار سپهبد قاسم سلیمانی', isHoliday: false, type: 'iranian' }, // May become official holiday
  { jMonth: 10, jDay: 19, description: 'قیام خونین مردم قم', isHoliday: false, type: 'iranian' },
  { jMonth: 10, jDay: 20, description: 'شهادت میرزا تقی خان امیرکبیر', isHoliday: false, type: 'iranian' },

  // --- Bahman (بهمن) ---
  { jMonth: 11, jDay: 2, description: 'جشن بهمنگان، روز بزرگداشت مردان و زنان', isHoliday: false, type: 'iranian' },
  { jMonth: 11, jDay: 12, description: 'بازگشت امام خمینی (ره) به ایران و آغاز دهه فجر', isHoliday: false, type: 'iranian' },
  { jMonth: 11, jDay: 19, description: 'روز نیروی هوایی', isHoliday: false, type: 'iranian' },
  { jMonth: 11, jDay: 22, description: 'پیروزی انقلاب اسلامی ایران', isHoliday: true, type: 'iranian' },
  { jMonth: 11, jDay: 29, description: 'قیام مردم تبریز / جشن سپندارمذگان، روز عشق ایرانی', isHoliday: false, type: 'iranian' },

  // --- Esfand (اسفند) ---
  { jMonth: 12, jDay: 5, description: 'روز بزرگداشت خواجه نصیرالدین طوسی و روز مهندس', isHoliday: false, type: 'iranian' },
  { jMonth: 12, jDay: 7, description: 'سالروز استقلال کانون وکلای دادگستری و روز وکیل مدافع', isHoliday: false, type: 'iranian' },
  { jMonth: 12, jDay: 14, description: 'روز احسان و نیکوکاری', isHoliday: false, type: 'iranian' },
  { jMonth: 12, jDay: 15, description: 'روز درختکاری', isHoliday: false, type: 'iranian' },
  { jMonth: 12, jDay: 25, description: 'پایان سرایش شاهنامه / روز بزرگداشت پروین اعتصامی', isHoliday: false, type: 'iranian' },
  { jMonth: 12, jDay: 29, description: 'روز ملی شدن صنعت نفت ایران', isHoliday: true, type: 'iranian' },
];

// --- React Component ---

const DailyEventsJalaali: React.FC = () => {
  // 1. Get current Gregorian date
  const todayGregorian = new Date();

  // 2. Convert to Jalaali using jalaali-js
  const todayJalaali = jalaali.toJalaali(todayGregorian); // Returns { jy, jm, jd }


  const currentJMonth: number = todayJalaali.jm; // jm is 1-based (1-12)
  const currentJDay: number = todayJalaali.jd;   // jd is 1-based (1-31)



 

  // 4. Filter events for the current day (logic remains the same)
  const todaysEvents: EventItem[] = allEvents.filter(event =>
    event.jMonth === currentJMonth && event.jDay === currentJDay
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
                {event.description}
               
                {event.isHoliday && <span style={styles.holidayMarker}> (تعطیل رسمی)</span>}
              </li>
            ))}
          </ul>
        ) : (
          <p style={styles.noEvents}>امروز مناسبت خاصی (بر اساس تاریخ شمسی ثابت) ثبت نشده است.</p>
        )}
       
      </div>
    </div>
  );
};

// --- Styling (Same as before) ---
const styles: { [key: string]: React.CSSProperties } = {
    container: {
        padding: '1px',
        maxWidth: '280px', // Increased max-width slightly
        margin: '1px auto',
        direction: 'rtl', // Set text direction to right-to-left
        textAlign: 'right', // Align text to the right
      },
      dateHeader: {
        textAlign: 'center',
        color: '#333',
        borderBottom: '1px solid #eee',
        paddingBottom: '10px',
        marginBottom: '15px',
      },
      eventsSection: {
        marginTop: '15px',
      },
      eventsTitle: {
        color: '#555',
        fontSize: '1.1em',
        marginBottom: '10px',
      },
      eventList: {
        listStyle: 'none',
        paddingRight: 0, // Reset padding for RTL
        paddingLeft: 0,
      },
      eventItem: {
        backgroundColor: '#fff',
        padding: '8px 12px',
        marginBottom: '5px',
        borderRadius: '4px',
        borderRight: '4px solid #007bff', // Changed border side for RTL
        borderLeft: 'none',
        fontSize: '0.95em',
      },
      holiday: {
        borderRightColor: '#dc3545', // Changed border side for RTL
        fontWeight: 'bold',
      },
      eventType: {
          fontSize: '0.8em',
          color: '#6c757d',
          marginRight: '5px', // Changed margin side for RTL
          marginLeft: '0',
      },
      holidayMarker: {
        color: '#dc3545',
        fontSize: '0.8em',
        marginRight: '5px', // Changed margin side for RTL
        marginLeft: '0',
        fontWeight: 'bold',
      },
      noEvents: {
        color: '#777',
        fontStyle: 'italic',
      },
      lunarNote: {
        fontSize: '0.85em',
        color: '#888',
        marginTop: '15px',
        borderTop: '1px dashed #ddd',
        paddingTop: '10px',
        lineHeight: '1.5',
      }
};

export default DailyEventsJalaali;