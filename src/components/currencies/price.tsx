import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IconType } from 'react-icons';
import { FaBitcoin, FaDollarSign, FaEuroSign } from 'react-icons/fa';
import { GiGoldBar } from 'react-icons/gi';
import { AssetCard } from './assetcard';

// 1. Define Type for items within the arrays
interface ApiItem {
  symbol: string; // Unique identifier from API
  name: string;   // Persian name from API
  price: string;
  change_percent: string;
  // ... other fields might exist
}

// 2. Define Type for the main API response object
// It's an object where keys are strings and values are arrays of ApiItem
// Using an index signature because we don't know the exact keys
interface ApiResponse {
  [key: string]: ApiItem[]; // Assumes ALL top-level properties are arrays of ApiItem
  // If there are other known properties with different types, define them explicitly:
  // e.g., update_time?: string;
}


// 3. Define Type for items we display (includes Icon component)
interface DisplayItem {
  symbol: string; // The unique identifier to match with API
  name: string;   // Our desired display name
  icon: IconType; // React Icon component
  price: string;  // Starts with '---', updated from API
  changePercent: string; // Starts with '---', updated from API
  unit: string; // Starts with '---', updated from API
}

// 4. API URL
const API_URL = 'https://brsapi.ir/Api/Market/Gold_Currency.php?key=FreeG4qDBDiXjgU41onTMU4TPRl8iG4z';

// 5. Initial Default Data with Icons and ASSUMED Symbols
// !!! IMPORTANT: Verify these 'symbol' values against the actual API response !!!
const initialDisplayItems: DisplayItem[] = [
  { symbol: 'BTC', name: 'بیت کوین', icon: FaBitcoin, price: '---', changePercent: '---',unit:'$' },
  { symbol: 'XAUUSD', name: 'اونس جهانی طلا', icon: GiGoldBar, price: '---', changePercent: '---',unit:'$' },
  { symbol: 'USD', name: 'دلار آمریکا', icon: FaDollarSign, price: '---', changePercent: '---',unit:'IRt' },
  { symbol: 'EUR', name: 'یورو', icon: FaEuroSign, price: '---', changePercent: '---',unit:'IRt' },
];

// Helper function to get target symbols from initial data
const TARGET_SYMBOLS = initialDisplayItems.map(item => item.symbol);

const CurrencyDisplayUpdatedApi: React.FC = () => {
  // 6. State: Initialize with default data, loading, and error states
  const [displayItems, setDisplayItems] = useState<DisplayItem[]>(initialDisplayItems);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 7. useEffect for fetching data once on mount using axios
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch data using axios, expecting the ApiResponse structure
        const response = await axios.get<ApiResponse>(API_URL);
        const responseData = response.data;

        // --- Data Validation ---
        if (!responseData || typeof responseData !== 'object' || Array.isArray(responseData)) {
          console.error("پاسخ API یک آبجکت معتبر نیست:", responseData);
          throw new Error("ساختار پاسخ API غیرمنتظره است (باید آبجکت باشد).");
        }

        // --- Extract Items from All Arrays within the Object ---
        let allApiItems: ApiItem[] = [];

        // Iterate over the *keys* of the response object
        for (const key in responseData) {
          // Check if the property belongs to the object itself and if the value is an array
          if (Object.prototype.hasOwnProperty.call(responseData, key) && Array.isArray(responseData[key])) {
            const currentArray = responseData[key];
            // Optional: Add more validation for items within the array if needed
            currentArray.forEach(item => {
                // Basic check: ensure item is an object and has a 'symbol'
                if (item && typeof item === 'object' && 'symbol' in item) {
                    allApiItems.push(item);
                } else {
                     console.warn(`آیتم نامعتبر در آرایه '${key}' نادیده گرفته شد:`, item);
                }
            })

            // // Simpler concatenation if no inner validation needed:
            // allApiItems = allApiItems.concat(currentArray);
          } else {
              console.log(`کلید '${key}' در پاسخ API یک آرایه نیست و نادیده گرفته شد.`);
          }
        }


        if (allApiItems.length === 0) {
          // This might happen if the API returns an empty object or objects without arrays
          console.warn("هیچ آرایه‌ای از آیتم‌ها در پاسخ API یافت نشد یا تمام آرایه‌ها خالی بودند.");
          // Decide if this is an error or just means no data
          // throw new Error("No item arrays found in the API response.");
        }

        // --- Create Map and Update State (Logic remains the same) ---
        const apiDataMap = new Map<string, ApiItem>();
        allApiItems.forEach(item => {
          // Ensure item has symbol before adding to map (redundant if checked above)
          if (item.symbol && TARGET_SYMBOLS.includes(item.symbol)) {
            apiDataMap.set(item.symbol, item);
          }
        });

        setDisplayItems(prevItems =>
          prevItems.map(displayItem => {
            const fetchedData = apiDataMap.get(displayItem.symbol);
            if (fetchedData) {
              // Found matching data in API, update price and changePercent
              return {
                ...displayItem, // Keep symbol, name, icon from initial data
                price: fetchedData.price,
                changePercent: fetchedData.change_percent,
              };
            }
            // No matching data found in API for this symbol, keep the default item
            return displayItem;
          })
        );

      } catch (err) {
        console.error("خطا در دریافت یا پردازش اطلاعات:", err);
        if (axios.isAxiosError(err)) {
          setError(`خطای شبکه: ${err.message} ${err.response?.status ? `(${err.response.status})` : ''}`);
        } else if (err instanceof Error) {
          setError(`خطا: ${err.message}`);
        } else {
          setError("یک خطای ناشناخته رخ داد.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

  }, []); // Empty dependency array ensures this runs only once


 

  return (
    <div className='p-1'> 
      {loading && <span>...</span>}
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>خطا: {error}</div>}
      <div className='grid grid-cols-2 gap-4'>
      
                {displayItems.map((item,i) => (
            <AssetCard key={i} asset={item} />
        ))}
      </div>
      {!loading && !error && !displayItems.some(item => item.price !== '---') && (
         <span>نماد پیدا نشد.</span>
      )}
    </div>
  );
};

export default CurrencyDisplayUpdatedApi; // Rename component if needed