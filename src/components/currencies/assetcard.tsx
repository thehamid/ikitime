
import { IconType } from 'react-icons';
import { LuArrowDown, LuArrowUp } from "react-icons/lu";

interface AssetData {
  symbol: string; // The unique identifier to match with API
  name: string;   // Our desired display name
  icon: IconType; // React Icon component
  price: string;  // Starts with '---', updated from API
  changePercent: string; // Starts with '---', updated from API
}


interface AssetCardProps {
  asset: AssetData;
}



// --- کامپوننت AssetCard بدون تغییر ---
export const AssetCard: React.FC<AssetCardProps> = ({ asset }) => {



  const value = String(asset.changePercent).trim();
  const isNegative = value.trim().startsWith("-");
  const numericValue = value.replace(/[^0-9.]/g, ""); // فقط عدد و نقطه
  const colorClass = isNegative ? "text-red-500" : "text-green-500";
  const Icon = isNegative ? LuArrowDown : LuArrowUp;




  return (
    <div className='border border-gray-300 rounded-lg shadow-md p-4 flex flex-col  justify-between w-28 h-28 sm:w-34 sm:h-34  bg-white
    transition-transform duration-200 hover:scale-105'>
      <div className='flex justify-between'>
        <h3 className="text-xs font-medium text-gray-800">{asset.name}</h3>
        <div className="text-2xl text-gray-700 mb-2"><asset.icon /></div>
      </div>
      <div className='flex flex-col text-left items-end'>
        <p className={`text-sm font-medium flex ${colorClass}`}>
          <Icon size={16} />%{numericValue}
        </p>
        <p className="text-2xl font-bold text-gray-900">{asset.price.toLocaleString()}</p>

      </div>


    </div>
  );
};