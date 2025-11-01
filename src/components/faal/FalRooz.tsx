import React, { useState, useEffect } from 'react';

// این تایپ دقیقاً مطابق با خروجی JSON از API است
export interface FalData {
  image: string;
  number: string;
  ghazal: string;
  voice: string;
  tabir: string;
}


// قبل از تغییر
 const API_URL = 'https://api.majidapi.ir/fun/fal?type=text&token=ecrbmb89zm9xhly:300WOYaqViUovpiRXIBd';

// بعد از تغییر
//const API_URL = '/fun/fal?type=text&token=ecrbmb89zm9xhly:300WOYaqViUovpiRXIBd';

// 1. داده‌های پیش‌فرض برای زمانی که API در دسترس نیست
const defaultFalData: FalData = {
  image: "https://www.fardayetaze.ir/wp-content/uploads/hafez/320.jpg",
  number: "غزل شماره  320 دیوان حافظ",
  ghazal: "دیشب به سیل اشک ره خواب می‌زدم / نقشی به یاد خط تو بر آب می‌زدم / ابروی یار در نظر و خرقه سوخته / جامی به یاد گوشه محراب می‌زدم / هر مرغ فکر کز سر شاخ سخن بجست / بازش ز طره تو به مضراب می‌زدم / روی نگار در نظرم جلوه می‌نمود / وز دور بوسه بر رخ مهتاب می‌زدم / چشمم به روی ساقی و گوشم به قول چنگ / فالی به چشم و گوش در این باب می‌زدم / نقش خیال روی تو تا وقت صبحدم / بر کارگاه دیده بی‌خواب می‌زدم / ساقی به صوت این غزلم کاسه می‌گرفت / می‌گفتم این سرود و می ناب می‌زدم / خوش بود وقت حافظ و فال مراد و کام / بر نام عمر و دولت احباب می‌زدم",
  voice: "https://www.baharnaz.com/Divan-Voice/Hafez-Song320.mp3",
  tabir: "با خواب و خیال به جایی نخواهید رسید. با نشستن و فکر کردن کاری از پیش نخواهید برد اگر می خواهید به مراد و کام دلتان دست پیدا کنید یا علی بگویید و خیالپردازی را کنار بگذارید و توکل به خدا کنید. راه هموار است. انشاالله که موفق می شوید."
};

const FalRooz: React.FC = () => {
  // استیت‌ها (استیت error دیگر لازم نیست)
  const [falData, setFalData] = useState<FalData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'fal' | 'tabir'>('fal');

  useEffect(() => {
    const fetchFal = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`خطا در شبکه: ${response.statusText}`);
        }
        const data = await response.json();
        setFalData(data.result as FalData);
      } catch (err: any) {
        // 2. در صورت بروز خطا، داده‌های پیش‌فرض را تنظیم کن
        console.error("خطا در دریافت فال از API، از داده‌های پیش‌فرض استفاده می‌شود:", err);
        setFalData(defaultFalData);
      } finally {
        // در هر صورت، حالت بارگذاری را خاموش کن
        setLoading(false);
      }
    };

    fetchFal();
  }, []);

  // تابع رندر محتوای تب "فال" (بدون تغییر)
  const renderFalContent = () => {
    if (!falData) return null;
    const ghazalLines = falData.ghazal.split('/').map((line, index) => (
      <p key={index} className="text-gray-700 leading-relaxed mb-2 text-sm">
        {line.trim()}
      </p>
    ));

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-indigo-600">{falData.number}</h3>
        <div className="text-right overflow-y-scroll max-h-[300px] " dir="rtl">
          {ghazalLines}
        </div>
        <audio 
          controls 
          className="w-full mt-4 rounded-lg"
          src={falData.voice}
        >
          مرورگر شما از پخش صدا پشتیبانی نمی‌کند.
        </audio>
      </div>
    );
  };

  // تابع رندر محتوای تب "تعبیر" (بدون تغییر)
  const renderTabirContent = () => {
    if (!falData) return null;
    return (
      <p className="text-gray-700 leading-relaxed text-justify" dir="rtl">
        {falData.tabir}
      </p>
    );
  };

  // 3. نمایش فقط حالت بارگذاری
  // (حالت خطا دیگر نمایش داده نمی‌شود چون داده‌های پیش‌فرض را داریم)
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">در حال دریافت فال...</div>
      </div>
    );
  }

  // 4. بقیه کامپوننت دقیقاً مانند قبل باقی می‌ماند
  return (
    <div className="flex items-center justify-center ">
      <div className="bg-white rounded-lg  w-full max-w-md">
        
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 text-center rounded-t-lg">
          <h2 className="text-2xl font-bold">فال روز</h2>
        </div>

        <div className="flex">
          <button
            onClick={() => setActiveTab('fal')}
            className={`flex-1 py-3 font-semibold transition-colors duration-300 ${
              activeTab === 'fal'
                ? 'bg-white text-purple-600 border-b-4 border-purple-500'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            فال
          </button>
          <button
            onClick={() => setActiveTab('tabir')}
            className={`flex-1 py-3 font-semibold transition-colors duration-300 ${
              activeTab === 'tabir'
                ? 'bg-white text-purple-600 border-b-4 border-pink-500'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            تعبیر
          </button>
        </div>

        <div className="p-6 min-h-[400px]">
          {activeTab === 'fal' ? renderFalContent() : renderTabirContent()}
        </div>
      </div>
    </div>
  );
};

export default FalRooz;