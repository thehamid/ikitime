import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import axios from 'axios';

import './MediaSlider.css'; // استایل‌ها (ممکن است نیاز به کمی تغییر داشته باشد)

// تعریف نوع داده برای هر آیتم مدیا
interface MediaItem {
  src: string;
  type: 'image' | 'video';
}

// تعریف پراپ‌های کامپوننت
interface MediaSliderProps {
  apiUrl: string;
  imageDuration?: number; // به میلی‌ثانیه
}

// ----- کامپوننت اسکلتون (مثل قبل) -----
const SkeletonLoader: React.FC = () => (
  <div className="media-slider-container skeleton-loader">
    <div className="skeleton-content"></div>
    <div className="skeleton-controls">
      <div className="skeleton-progress"></div>
    </div>
  </div>
);
// ---------------------------------

const IMAGE_DISPLAY_DURATION_MS = 10 * 1000; // 10 ثانیه پیش‌فرض

// تابع تشخیص نوع فایل (مثل قبل)
const getMediaTypeFromUrl = (url: string): 'image' | 'video' | 'unknown' => {
    if (!url) return 'unknown';
    try {
      const pathname = new URL(url).pathname;
      const extension = pathname.split('.').pop()?.toLowerCase();
      if (!extension) return 'unknown';
      const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'];
      const videoExtensions = ['mp4', 'webm', 'ogg', 'mov']; // پسوندهای رایج‌تر
      if (imageExtensions.includes(extension)) return 'image';
      if (videoExtensions.includes(extension)) return 'video';
      return 'unknown';
    } catch (e) {
      console.error("Error parsing URL:", url, e);
      return 'unknown';
    }
};

const MediaSlider: React.FC<MediaSliderProps> = ({
  apiUrl,
  imageDuration = IMAGE_DISPLAY_DURATION_MS,
}) => {
  // --- State ها ---
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0); // 0 to 100
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(true); // شروع میوت

  // --- Refs ---
  const videoRef = useRef<HTMLVideoElement | null>(null); // فقط برای ویدئوی فعال
  const timerRef = useRef<NodeJS.Timeout | null>(null); // برای تایم‌اوت عکس و اینتروال پروگرس
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null); // جداگانه برای اینتروال پروگرس عکس

  const currentMediaItem = mediaItems[activeIndex];
  const isCurrentVideo = currentMediaItem?.type === 'video';

  // --- تابع پاکسازی تایمرها ---
  const clearTimers = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
     if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  }, []);

  // --- تابع رفتن به اسلاید بعدی ---
  const goToNextSlide = useCallback(() => {
    clearTimers(); // پاک کردن تایمرهای قبلی قبل از رفتن به بعدی
    setProgress(0); // ریست کردن پروگرس
    setActiveIndex((prevIndex) => {
      // اگر فقط یک آیتم داریم، در همین ایندکس بمان
      if (mediaItems.length <= 1) return prevIndex;
      // در غیر این صورت به آیتم بعدی برو (با چرخش)
      return (prevIndex + 1) % mediaItems.length;
    });
  }, [mediaItems.length, clearTimers]);


  // --- افکت برای دریافت داده‌ها از API (مثل قبل) ---
  useEffect(() => {
    let isMounted = true; // جلوگیری از آپدیت state بعد از unmount
    const fetchMedia = async () => {
      if (!isMounted) return;
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get<string[]>(apiUrl);
        if (!isMounted) return;

        if (!Array.isArray(response.data)) {
          throw new Error("API response is not an array of URLs.");
        }

        const processedItems = response.data
          .map(src => ({ src, type: getMediaTypeFromUrl(src) }))
          .filter((item): item is MediaItem => item.type === 'image' || item.type === 'video');

        setMediaItems(processedItems);
        setActiveIndex(0); // شروع از اولین آیتم
        setProgress(0); // ریست پروگرس

      } catch (err) {
          if (!isMounted) return;
          console.error("Error fetching media:", err);
          let message = "یک خطای ناشناخته رخ داد.";
          if (axios.isAxiosError(err)) {
              message = `خطا در دریافت اطلاعات: ${err.message}`;
          } else if (err instanceof Error) {
              message = err.message;
          }
          setError(message);
          setMediaItems([]);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    fetchMedia();

    return () => {
      isMounted = false; // برای جلوگیری از آپدیت state در صورت unmount شدن حین fetch
      clearTimers(); // پاکسازی تایمرها هنگام unmount
    };
  }, [apiUrl, clearTimers]); // `clearTimers` رو هم اضافه می‌کنیم

  // --- افکت اصلی برای مدیریت نمایش و تایمرها ---
  useEffect(() => {
    // اگر در حال بارگذاری، خطا، یا آیتمی نداریم، کاری نکن
    if (isLoading || error || mediaItems.length === 0) {
      return;
    }

    // پاک کردن تایمرهای قبلی هر بار که activeIndex یا آیتم‌ها تغییر می‌کند
    clearTimers();
    setProgress(0);

    const currentItem = mediaItems[activeIndex];

    if (currentItem.type === 'image') {
      // شروع تایمر برای عکس
      const intervalTime = 100; // آپدیت پروگرس هر ۱۰۰ میلی‌ثانیه
      const totalSteps = Math.max(1, imageDuration / intervalTime);
      let currentStep = 0;

      // اینتروال برای آپدیت پروگرس بار
      progressIntervalRef.current = setInterval(() => {
        currentStep++;
        setProgress(() => Math.min(100, (currentStep / totalSteps) * 100));
      }, intervalTime);

      // تایم‌اوت برای رفتن به اسلاید بعدی
      timerRef.current = setTimeout(() => {
        if (progressIntervalRef.current) clearInterval(progressIntervalRef.current); // اطمینان از پاک شدن اینتروال
        goToNextSlide();
      }, imageDuration);

    } else if (currentItem.type === 'video') {
      // برای ویدئو، نیاز به انجام کاری در اینجا نیست چون event handler ها
      // (onLoadedMetadata, onTimeUpdate, onEnded) کار را انجام می‌دهند.
      // فقط باید مطمئن شویم ویدئو با تغییر activeIndex شروع به پخش می‌کند.
      // این کار در handleVideoLoadedMetadata انجام می‌شود.
      const video = videoRef.current;
      if (video) {
          // اگر ویدئو از قبل لود شده، پخش کن
          if (video.readyState >= 3) { // HAVE_FUTURE_DATA or HAVE_ENOUGH_DATA
             video.muted = isVideoMuted;
             video.play().catch(e => console.warn("Autoplay failed:", e));
          } else {
             // اگر هنوز لود نشده، onLoadedMetadata آن را پخش خواهد کرد
             video.muted = isVideoMuted; // اطمینان از وضعیت میوت
          }
      }
    }

    // پاکسازی تایمرها هنگام تغییر activeIndex یا unmount
    return () => {
      clearTimers();
      // ویدئوی قبلی را متوقف کن (اگر وجود داشت)
      // Note: videoRef فقط به ویدئوی *فعلی* اشاره دارد. متوقف کردن ویدئو قبلی
      // به این شکل سخت است. بهتر است منطق توقف در goToNextSlide یا
      // مستقیما قبل از تغییر activeIndex باشد، اما فعلا clearTimers کافیست.
    };
  // وابستگی‌ها: activeIndex, mediaItems, imageDuration, isLoading, error, goToNextSlide, clearTimers, isVideoMuted
  }, [activeIndex, mediaItems, imageDuration, isLoading, error, goToNextSlide, clearTimers, isVideoMuted]);


  // --- Handlers برای ویدئو ---
  const handleVideoTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (video && video.duration) {
      const currentProgress = (video.currentTime / video.duration) * 100;
      setProgress(isFinite(currentProgress) ? currentProgress : 0);
    }
  }, []); // بدون وابستگی، چون همیشه به videoRef.current دسترسی دارد

  const handleVideoLoadedMetadata = useCallback(() => {
    const video = videoRef.current;
    if (video) {
        // شروع پخش خودکار (میوت شده)
        video.muted = true;
        setIsVideoMuted(true);
        video.play().catch(e => console.warn("Autoplay failed on load:", e));
        // اگر کاربر قبلا unmute کرده بود، آن را حفظ نمی‌کنیم چون autoplay با صدا معمولا fail می‌شود
    }
  }, []); // بدون وابستگی

  const handleVideoEnded = useCallback(() => {
    // وقتی ویدئو تمام شد، به اسلاید بعدی برو
    goToNextSlide();
  }, [goToNextSlide]); // به goToNextSlide وابسته است

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsVideoMuted(video.muted);
    }
  }, []); // بدون وابستگی

  // --- Render Logic ---

  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (error) {
    return <div className="media-slider-container error-message">{error}</div>;
  }

  if (mediaItems.length === 0) {
    return <div className="media-slider-container no-media-message">هیچ فایلی برای نمایش یافت نشد.</div>;
  }

  // رندر اسلاید فعال
  const renderActiveSlide = () => {
    if (!currentMediaItem) return null; // اگر آیتمی وجود ندارد

    if (currentMediaItem.type === 'image') {
      return (
        <img
          key={currentMediaItem.src} // کلید برای re-mount شدن هنگام تغییر src
          src={currentMediaItem.src}
          alt={`Slide ${activeIndex + 1}`}
          loading="eager" // لود فوری تصویر فعال
        />
      );
    } else if (currentMediaItem.type === 'video') {
      return (
        <video
          key={currentMediaItem.src} // کلید برای re-mount شدن هنگام تغییر src
          ref={videoRef} // اتصال ref
          src={currentMediaItem.src}
          muted={isVideoMuted} // کنترل میوت از state
          playsInline
          preload="auto" // لود کامل ویدئو
          onTimeUpdate={handleVideoTimeUpdate}
          onLoadedMetadata={handleVideoLoadedMetadata}
          onEnded={handleVideoEnded}
          onError={(e) => console.error("Video Error:", currentMediaItem.src, e)}
          // onClick={toggleMute} // شاید بهتر باشه کلیک روی ویدئو کاری نکند
        />
      );
    }
    return null;
  };

  return (
    <div className="media-slider-container lg:w-[400px] lg:h-[480px] w-[280px] h-[480px] ">
      {/* محفظه نمایش مدیا */}
      <div className="media-display-area">
        {renderActiveSlide()}
      </div>

      {/* کنترل‌ها و پروگرس بار */}
      <div className="slider-controls-overlay">
        {isCurrentVideo && (
          <div className="video-mute-control">
            <button onClick={toggleMute} aria-label={isVideoMuted ? 'Unmute' : 'Mute'}>
              {isVideoMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>
          </div>
        )}
        <div className="progress-bar-container">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
};

export default MediaSlider;