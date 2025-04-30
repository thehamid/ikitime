import React, { useRef, useEffect, useState } from "react";
import Tick from "@pqina/flip";
import "@pqina/flip/dist/flip.min.css";
import "./time.css"; // استایل‌های کامپوننت

// انواع داده برای مقادیر زمانی
interface TimeValue {
  hours: number;
  minutes: number;
  seconds: number;
}

// نوع props کامپوننت
interface TimeDateProps {
  initialDate?: Date;
}

// تابع تبدیل اعداد انگلیسی به فارسی
const toPersianDigits = (num: number): string => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(num)
    .padStart(2, '0')
    .split('')
    .map(d => persianDigits[parseInt(d)])
    .join('');
};



export const Time: React.FC<TimeDateProps> = ({ initialDate = new Date() }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const tickRef = useRef<any>(null);
  const [currentTime, setCurrentTime] = useState<TimeValue>({
    hours: initialDate.getHours(),
    minutes: initialDate.getMinutes(),
    seconds: initialDate.getSeconds()
  });

  // مقداردهی اولیه فلپ
  useEffect(() => {
    const didInit = (tick: any) => {
      tickRef.current = tick;
    };

    const currDiv = divRef.current;
    if (!currDiv) return;

    Tick.DOM.create(currDiv, {
      value: formatTime(currentTime),
      didInit
    });

    return () => {
      if (tickRef.current) Tick.DOM.destroy(tickRef.current);
    };
  }, []);

  // آپدیت زمان هر ثانیه
  useEffect(() => {
    const timer = Tick.helper.interval(() => {
      const now = new Date();
      setCurrentTime({
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds()
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // آپدیت مقدار فلپ هنگام تغییر زمان
  useEffect(() => {
    if (tickRef.current) {
      tickRef.current.value = formatTime(currentTime);
    }
  }, [currentTime]);

  // تابع فرمت‌دهی زمان به فارسی
  const formatTime = (time: TimeValue): string => {
    return [
      toPersianDigits(time.hours),
      toPersianDigits(time.minutes),
      toPersianDigits(time.seconds)
    ].join(':');
  };

  return (
    <div ref={divRef} className="tick text-center">
      <div className="tick-time" data-repeat="true" aria-hidden="true">
        <span data-view="flip"></span>
      </div>
    </div>
  );
};