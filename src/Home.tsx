import React, { useState, useEffect, useRef } from 'react';
import { useContainerSize } from './hooks/useContainerSize';
import MediaSlider from './components/slider/MediaSlider';
import { Time } from './components/time/time';
import FullCalendar from './components/date/fullCalendar';
import WeatherDisplay from './components/weather/weather';
import CurrencyDisplay from './components/currencies/price'
import QuoteCard from './components/quotecard/QuoteCard';
import { MdOutlineWatchLater } from 'react-icons/md';
import { BsTelegram } from 'react-icons/bs';


const API_ENDPOINT = 'https://ikitime.ir/medias/list_media.php';

// 1. تایپ جدید برای آیتم‌های بنتو با مشخصات دقیق‌تر
interface BentoItem {
  id: number;
  content: React.ReactNode;
  className: string;
  colSpan: number; // تعداد ستون‌هایی که اشغال می‌کند
  rowSpan: number; // تعداد سطرهایی که اشغال می‌کند
  minContentWidth: number; // حداقل عرضی که محتوا برای نمایش خوب نیاز دارد
}

// 2. لیست کامپوننت‌ها با مشخصات جدید
const initialItems: BentoItem[] = [
  {
    id: 1,
    content: <h2 className="text-6xl font-bold"><MdOutlineWatchLater /></h2>,
    className: "bg-gradient-to-br from-purple-400 to-pink-400 text-white p-6 rounded-lg flex flex-col items-center justify-center text-center",
    colSpan: 1,
    rowSpan: 1,
    minContentWidth: 100, // به حداقل 300px عرض نیاز دارد
  },
  {
    id: 2,
    content: <Time/>,
    className: "bg-gray-200 rounded-lg flex items-center justify-center",
    colSpan: 2,
    rowSpan: 1,
    minContentWidth: 400,
  },
  {
    id: 3,
    content: <FullCalendar/>,
    className: "bg-gray-200 rounded-lg",
    colSpan: 2,
    rowSpan: 3,
    minContentWidth: 300,
  },
  {
    id: 4,
    content: <h3 className="text-6xl font-semibold">&#x266C;</h3>,
    className: "bg-yellow-400 text-gray-800 p-4 rounded-lg flex flex-col items-center justify-center",
    colSpan: 1,
    rowSpan: 1,
    minContentWidth: 150,
  },
  {
    id: 5,
    content:<QuoteCard/>,
    className: "",
    colSpan: 2, // به صورت پیش‌فرض 2 ستون است
    rowSpan: 1,
    minContentWidth: 400, // اما اگر فضا باشد، 400px بهتر است
  },
  {
    id: 6,
    content:  <MediaSlider apiUrl={API_ENDPOINT} imageDuration={20000} />,
    className: "bg-gray-200 p-4 rounded-lg flex items-center justify-center",
    colSpan: 2,
    rowSpan: 3,
    minContentWidth: 400,
  },
  {
    id: 7,
    content: <h3 className="text-6xl  font-semibold">&#x2742;</h3>,
    className: "bg-teal-400 text-gray-800 p-4 rounded-lg flex items-center justify-center",
    colSpan: 1,
    rowSpan: 1,
    minContentWidth: 150,
  },
  {
    id: 8,
    content: <p className="text-6xl">&#x262F;</p>,
    className: "bg-orange-400 text-white p-4 rounded-lg flex items-center justify-center",
    colSpan: 1,
    rowSpan: 1,
    minContentWidth: 150,
  },
  {
    id: 9,
    content: <WeatherDisplay/>,
    className: "",
    colSpan: 2,
    rowSpan: 1,
    minContentWidth: 400,
  },
    {
    id: 10,
    content: <CurrencyDisplay/>,
    className: "",
    colSpan: 2,
    rowSpan: 2,
    minContentWidth: 400, // به حداقل 300px عرض نیاز دارد
  },
   {
    id: 11,
    content: <a href="https://t.me/ikitime" className="text-6xl"><BsTelegram/></a>,
    className: "bg-blue-400 text-white p-4 rounded-lg flex items-center justify-center",
    colSpan: 1,
    rowSpan: 1,
    minContentWidth: 150,
  },
   {
    id: 12,
    content: <p className="text-2xl ">ADS</p>,
    className: "bg-gray-200 text-gray-100 p-4 rounded-lg flex items-center justify-center",
    colSpan: 1,
    rowSpan: 1,
    minContentWidth: 150,
  },

];

// تابع شافل کردن (همانند قبل)
const shuffleArray = (array: BentoItem[]): BentoItem[] => {
  let currentIndex = array.length, randomIndex;
  const newArray = [...array];
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [newArray[currentIndex], newArray[randomIndex]] = [
      newArray[randomIndex], newArray[currentIndex]];
  }
  return newArray;
};


const Home: React.FC = () => {
  const [shuffledItems, setShuffledItems] = useState<BentoItem[]>(initialItems);
  const gridRef = useRef<HTMLDivElement >(null);
  const { width: containerWidth } = useContainerSize(gridRef as React.RefObject<HTMLElement>);

  // 3. تعریف سلول پایه و محاسبه تعداد ستون‌ها
  const CELL_WIDTH = 150; // هر سلول 150px عرض دارد
  const numCols = containerWidth > 0 ? Math.floor(containerWidth / CELL_WIDTH) : 4; // مقدار پیش‌فرض برای اولین رندر

  // 4. شافل کردن فقط در بار اول
  useEffect(() => {
    setShuffledItems(shuffleArray(initialItems));
  }, []);

  // 5. محاسبه نهایی span برای هر آیتم بر اساس نیاز محتوا
  const itemsWithCalculatedSpan = shuffledItems.map(item => {
    const requiredCols = Math.ceil(item.minContentWidth / CELL_WIDTH);
    const finalColSpan = Math.max(item.colSpan, requiredCols);
    return { ...item, finalColSpan };
  });

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
     
        {/* 6. کانتینر گرید با رفرنس داینامیک */}
        <div
          ref={gridRef}
          className="w-full mx-auto"
          style={{
            display: 'grid',
            // تعداد ستون‌ها به صورت داینامیک محاسبه می‌شود
            gridTemplateColumns: `repeat(${numCols}, minmax(0, 1fr))`,
            gap: '1rem', // معادل gap-4 در تیلویند
            // ارتفاع خودکار بر اساس محتوا
            gridAutoRows: '150px', // ارتفاع هر سطر 150px است
          }}
        >
          {/* 7. رندر کردن آیتم‌ها با span محاسبه شده */}
          {itemsWithCalculatedSpan.map((item) => (
            <div
              key={item.id}
              style={{
                // اعمال تعداد ستون و سطر نهایی
                gridColumn: `span ${item.finalColSpan}`,
                gridRow: `span ${item.rowSpan}`,
              }}
              className={item.className}
            >
              {item.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;