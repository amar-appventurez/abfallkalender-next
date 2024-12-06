import { useState } from 'react';

const DateList = ({ dates }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Show either the first two dates or all dates based on isExpanded state
  const displayedDates = isExpanded ? dates : dates.slice(0, 2);

  return (
    <div>
      <ul className="flex flex-col gap-2 px-[0.5rem]">
        {displayedDates?.map((date, index) => (
          <div key={date}>
            <li className="p-2 text-[#63636B] rounded-lg">
              {date}
            </li>
            {index < displayedDates.length - 1 && <hr className='text-[#E0E0E9]' />}
          </div>
        ))}
      </ul>
      
      {/* Only show 'Show More' if there are more than 2 dates */}
      {dates.length > 2 && !isExpanded && (
        <button
          className="text-blue-500 mt-2"
          onClick={() => setIsExpanded(true)}
        >
          Show More
        </button>
      )}

      {/* Show 'Show Less' button when the list is expanded */}
      {isExpanded && (
        <button
          className="text-blue-500 mt-2"
          onClick={() => setIsExpanded(false)}
        >
          Show Less
        </button>
      )}
    </div>
  );
};

export default DateList;
