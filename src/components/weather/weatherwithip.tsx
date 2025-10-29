import React, { useState, useEffect } from 'react';
import { CiLocationOn } from "react-icons/ci";
import { WiHumidity, WiWindBeaufort0 } from 'react-icons/wi';
// اینترفیس برای داده‌های مورد انتظار از API OpenWeatherMap (بدون تغییر)
interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
}

// اینترفیس (اختیاری) برای داده‌های مورد انتظار از ip-api.com
interface IpApiData {
  status: 'success' | 'fail';
  message?: string; // در صورت خطا
  country?: string;
  city?: string;
  lat?: number; // Latitude
  lon?: number; // Longitude
  query?: string; // IP address used
}

const WeatherDisplayByIp: React.FC = () => {
  // State برای نگهداری داده‌های آب و هوا
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  // State برای نگهداری نام شهر شناسایی شده توسط IP (اختیاری)
  const [detectedCity, setDetectedCity] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // کلید API OpenWeatherMap را از متغیرهای محیطی بخوانید
  const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

  useEffect(() => {
    // یک تابع async داخلی برای مدیریت هر دو فراخوانی API
    const fetchLocationAndWeather = async () => {
      setLoading(true);
      setError(null);
      setWeatherData(null); // پاک کردن داده‌های قبلی
      setDetectedCity(null);

      if (!apiKey) {
        setError("کلید API OpenWeatherMap تنظیم نشده است. لطفاً فایل .env را بررسی کنید.");
        setLoading(false);
        return;
      }

      try {
        // 1. دریافت موقعیت مکانی بر اساس IP
        // نکته: ip-api.com بدون API Key روی HTTP کار می‌کند. برای HTTPS یا استفاده تجاری
        // سرویس دیگری با API Key (مثل ipinfo.io) توصیه می‌شود.
        console.log("Fetching IP location...");
        const ipApiUrl = 'http://ip-api.com/json/'; // آدرس سرویس IP به موقعیت
        const ipResponse = await fetch(ipApiUrl);

        if (!ipResponse.ok) {
          throw new Error(`خطا در دریافت موقعیت از IP (${ipResponse.status})`);
        }

        const ipData: IpApiData = await ipResponse.json();
        console.log("IP Data:", ipData);

        if (ipData.status !== 'success' || !ipData.lat || !ipData.lon) {
          throw new Error(`سرویس IP نتوانست موقعیت را تشخیص دهد: ${ipData.message || 'خطای نامشخص'}`);
        }

        const { lat, lon, city } = ipData;
        setDetectedCity(city || 'ناشناخته'); // ذخیره نام شهر شناسایی شده

        // 2. دریافت اطلاعات آب و هوا با استفاده از مختصات به دست آمده
        console.log(`Fetching weather for lat=${lat}, lon=${lon}...`);
        const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=fa`;
        const weatherResponse = await fetch(weatherApiUrl);

        if (!weatherResponse.ok) {
          let errorMsg = `خطا در دریافت اطلاعات آب و هوا (${weatherResponse.status})`;
           try {
              const errorData = await weatherResponse.json();
              if (errorData && errorData.message) {
                  errorMsg += `: ${errorData.message}`;
              }
           } catch (jsonError) {/* Ignore */}
          throw new Error(errorMsg);
        }

        const weatherResult: WeatherData = await weatherResponse.json();
        console.log("Weather Data:", weatherResult);
        setWeatherData(weatherResult);
        setError(null); // پاک کردن خطا در صورت موفقیت کامل

      } catch (err) {
        console.error("خطا در فرآیند:", err);
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('یک خطای ناشناخته رخ داد.');
        }
        setWeatherData(null); // پاک کردن داده‌ها در صورت بروز خطا
      } finally {
        setLoading(false); // اتمام بارگذاری در هر صورت
      }
    };

    fetchLocationAndWeather();

    // این useEffect فقط یک بار هنگام mount شدن اجرا می‌شود (وابسته به وجود apiKey)
  }, [apiKey]);


  // --- بخش رندر کامپوننت (مشابه قبل) ---

  if (loading) {
    return <div style={{ direction: 'rtl', padding: '20px' }}>در حال بارگذاری اطلاعات آب و هوا بر اساس موقعیت IP...</div>;
  }

  if (error) {
    return <div style={{ direction: 'rtl', padding: '20px', color: 'red' }}>خطا: {error}</div>;
  }

  if (!weatherData) {
    return <div style={{ direction: 'rtl', padding: '20px' }}>اطلاعات آب و هوا یافت نشد.</div>;
  }

  // نمایش اطلاعات آب و هوا
  // ممکن است نام شهر برگشتی از OpenWeatherMap دقیق‌تر از ip-api باشد
  const cityName = weatherData.name || detectedCity || 'مکان شما';
  const { main, weather, wind } = weatherData;
  const weatherInfo = weather[0];
  const iconUrl = `https://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`;

  return (


    <div className='bg-gradient-to-br from-cyan-400 to-blue-400 text-amber-50 shadow-md rounded-lg p-6 max-w-4xl w-full'>
          <div className='flex justify-between items-center'>
            <img src={iconUrl} alt={weatherInfo.description} className='w-12 h-12' />
            <p className='text-4xl font-extrabold'>{Math.round(main.temp)}°C</p>
    
          </div>
    
          <div className='flex justify-between items-center'>
            <p className='text-sm'>{weatherInfo.description}</p>
           
      <p className='text-sm flex gap-1'><WiHumidity/> {main.humidity}%</p>
      <p className='text-sm flex gap-1'><WiWindBeaufort0/> {wind.speed}m/s</p>
          </div>
     <span className='flex items-center justify-end pt-1'>{cityName}<CiLocationOn className='mr-1' /></span>
        </div>
  );
};

// نام کامپوننت را تغییر دادم تا مشخص باشد از IP استفاده می‌کند
export default WeatherDisplayByIp;