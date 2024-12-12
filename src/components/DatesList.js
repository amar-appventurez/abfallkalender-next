import { useState } from 'react';
import { useTranslations } from 'next-intl';
const DateList = ({ dates }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const streetDetailsTranslations= useTranslations('StreetDetailsPage');
  // Show either the first two dates or all dates based on isExpanded state
  const displayedDates = isExpanded ? dates : dates.slice(0, 2);

  return (
    <div>
      <ul className="flex flex-col gap-2 px-[0.5rem] text-small-tight-regular font-bold-500">
        {displayedDates?.map((date, index) => (
          <div key={date}>
            <li className="p-2 text-[#63636B] rounded-lg">
              {date}
            </li>
            {index < displayedDates.length - 1 && <hr className='text-[#E0E0E9]' />}
          </div>
        ))}
      </ul>
      
   
      {dates.length > 2 && !isExpanded && (
        <button
          className="text-blue-500 mt-2"
          onClick={() => setIsExpanded(true)}
        >
          <span className='text-[#F47921] text-small-tight-regular font-bold-500'>{`${streetDetailsTranslations('show-more')}`}</span>
        </button>
      )}

   
      {isExpanded && (
        <button
          className="text-blue-500 mt-2"
          onClick={() => setIsExpanded(false)}
        >
             <span className='text-[#F47921] text-small-tight-regular font-bold-500'>{`${streetDetailsTranslations('show-less')}`}</span>
        </button>
      )}
    </div>
  );
};

export default DateList;
