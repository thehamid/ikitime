import React, { useState, useEffect } from 'react';
import { CiLocationOn } from "react-icons/ci";
import WeatherDisplayByIp from './weatherwithip';

// اینترفیس برای داده‌های مورد انتظار از API OpenWeatherMap (می‌تواند کامل‌تر باشد)
interface WeatherData {
  name: string; // نام شهر
  main: {
    temp: number; // دما (بسته به واحد انتخابی، مثلاً سلسیوس)
    feels_like: number; // دمای احساسی
    humidity: number; // رطوبت
  };
  weather: {
    id: number;
    main: string; // وضعیت اصلی (مانند Clouds, Rain, Clear)
    description: string; // توضیحات وضعیت (به فارسی اگر lang=fa باشد)
    icon: string; // کد آیکون هوا
  }[];
  wind: {
    speed: number; // سرعت باد
  };
}

// اینترفیس برای مختصات
interface Coordinates {
  latitude: number;
  longitude: number;
}

const WeatherDisplay: React.FC = () => {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // کلید API را از متغیرهای محیطی بخوانید
  const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

  useEffect(() => {
    if (!apiKey) {
      setError("کلید API آب و هوا تنظیم نشده است. لطفاً فایل .env را بررسی کنید.");
      setLoading(false);
      return;
    }

    // 1. دریافت موقعیت مکانی کاربر
    if (!navigator.geolocation) {
      setError('مرورگر شما از قابلیت موقعیت‌یابی پشتیبانی نمی‌کند.');
      setLoading(false);
      return;
    }

    const handleSuccess = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });
      // setError(null); // خطا را در صورت موفقیت پاک می‌کنیم (بعد از fetch انجام می‌شود)
    };

    const handleError = (error: GeolocationPositionError) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          setError('دسترسی به موقعیت مکانی توسط شما رد شد.');
          break;
        case error.POSITION_UNAVAILABLE:
          setError('اطلاعات موقعیت مکانی در دسترس نیست.');
          break;
        case error.TIMEOUT:
          setError('زمان درخواست موقعیت مکانی به پایان رسید.');
          break;
        default:
          setError('خطای نامشخصی در دریافت موقعیت مکانی رخ داد.');
          break;
      }
      setLoading(false);
    };

    // درخواست موقعیت
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
      enableHighAccuracy: true, // سعی در دقت بالا
      timeout: 10000, // ۱۰ ثانیه مهلت
      maximumAge: 0 // دریافت اطلاعات جدید
    });

  }, [apiKey]); // اطمینان از وجود apiKey در ابتدای کار

  useEffect(() => {
    // 2. فراخوانی API آب و هوا پس از دریافت موقعیت
    if (location && apiKey) {
      setLoading(true); // ممکن است برای fetch هم loading لازم باشد
      setError(null); // پاک کردن خطاهای قبلی

      const fetchWeatherData = async () => {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${apiKey}&units=metric&lang=fa`;
        // units=metric برای دریافت دما به سلسیوس
        // lang=fa برای دریافت توضیحات به فارسی (در صورت پشتیبانی API)

        try {
          const response = await fetch(apiUrl);
          if (!response.ok) {
            // تلاش برای خواندن پیام خطا از API در صورت وجود
            let errorMsg = `خطا در دریافت اطلاعات آب و هوا (${response.status})`;
            try {
              const errorData = await response.json();
              if (errorData && errorData.message) {
                errorMsg += `: ${errorData.message}`;
              }
            } catch (jsonError) {
              // اگر پاسخ JSON معتبر نبود، همان خطای اولیه کافی است
            }
            throw new Error(errorMsg);
          }
          const data: WeatherData = await response.json();
          setWeatherData(data);
          setError(null); // پاک کردن خطا در صورت موفقیت
        } catch (err) {
          console.error("خطا در فراخوانی API آب و هوا:", err);
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('خطای ناشناخته در ارتباط با سرور آب و هوا.');
          }
          setWeatherData(null); // پاک کردن داده‌های قبلی در صورت خطا
        } finally {
          setLoading(false); // در هر صورت (موفقیت یا خطا) loading تمام می‌شود
        }
      };

      fetchWeatherData();
    }
  }, [location, apiKey]); // این افکت به location و apiKey وابسته است


  // --- بخش رندر کامپوننت ---

  if (loading) {
    return <div style={{ direction: 'rtl', padding: '20px' }}>در حال بارگذاری اطلاعات آب و هوا...</div>;
  }

  if (error) {
    return <WeatherDisplayByIp/>;
  }

  if (!weatherData) {
    // این حالت معمولا نباید رخ دهد مگر اینکه خطایی باشد که گرفته نشده
    return <div style={{ direction: 'rtl', padding: '20px' }}>اطلاعات آب و هوا یافت نشد.</div>;
  }

  // نمایش اطلاعات آب و هوا
  const { name, main, weather } = weatherData;
  const weatherInfo = weather[0]; // معمولاً اولین آیتم آرایه weather حاوی اطلاعات اصلی است
  const iconUrl = `https://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`;

  return (
    <div className='bg-gradient-to-br from-cyan-400 to-blue-400 text-amber-50 shadow-md rounded-lg p-6'>
      <div className='flex justify-between items-center'>
        <img src={iconUrl} alt={weatherInfo.description} className='w-12 h-12' />
        <p className='text-4xl font-extrabold'>{Math.round(main.temp)}°C</p>

      </div>

      <div className='flex justify-between'>
        <p className='text-sm'>{weatherInfo.description}</p>
        <span className='flex items-center'>{name}<CiLocationOn className='mr-1' /></span>

      </div>

    </div>
  );
};

export default WeatherDisplay;