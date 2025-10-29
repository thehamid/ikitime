import React, { useState, useEffect } from 'react';
import { FaQuoteRight } from 'react-icons/fa'; // آیکون‌ها
import quotes, { Quote } from '../../data/quotes'; // وارد کردن داده‌ها و تایپ

const QuoteCard: React.FC = () => {
  // استیت برای نگهداری جمله فعلی
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);



  // تابع برای انتخاب یک جمله رندوم
  const fetchNewQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
  };

  // useEffect برای بارگذاری یک جمله در اولین رندر
  useEffect(() => {
    fetchNewQuote();
  }, []); // [] یعنی فقط یک بار اجرا شود

  // نمایش حالت بارگذاری (اگر لازم باشد)
  if (!currentQuote) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">در حال بارگذاری جمله...</div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center ">
      <div 
        className="
          relative
          bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
          p-1
          rounded-lg
          max-w-4xl
          w-full
        "
      >
        <div className="bg-white rounded-lg p-2 md:p-4 flex flex-col md:flex-row items-center justify-between">
          
          {/* آیکون نقل قول */}
          <div className="text-2xl text-purple-300 mb-4 md:mb-0 md:ml-8">
            <FaQuoteRight />
          </div>

          {/* متن جمله و نویسنده */}
          <div className="flex-1 text-center md:text-right">
            <p className="text-sm md:text-xl font-medium text-gray-800 leading-relaxed mb-4">
              {currentQuote.text}
            </p>
            <p className="text-lg text-gray-600 font-light">
              — {currentQuote.author}
            </p>
          </div>


        </div>
      </div>
    </div>
  );
};

export default QuoteCard;