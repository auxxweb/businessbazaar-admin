import React, { useEffect, useState } from "react";

const DashBoardSection2 = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Format the time as HH:MM:SS AM/PM
  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  // Function to add the suffix to the day (st, nd, rd, th)
  const formatDayWithSuffix = (day) => {
    if (day > 3 && day < 21) return `${day}th`; // Special case for 11th-19th
    switch (day % 10) {
      case 1:
        return `${day}st`;
      case 2:
        return `${day}nd`;
      case 3:
        return `${day}rd`;
      default:
        return `${day}th`;
    }
  };

  // Get the current date
  const currentDate = new Date();
  const dayWithSuffix = formatDayWithSuffix(currentDate.getDate());
  const month = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();

  return (
    <>
      <div className="flex mb-4">
        <div className="text-center w-96 bg-white shadow-lg border border-gray-300 gap-4 h-52 mr-4 flex flex-col items-center justify-center rounded-lg">
          <svg
            width="52"
            height="52"
            viewBox="0 0 52 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M26 40.1818C22.2387 40.1818 18.6315 38.6877 15.9719 36.0281C13.3123 33.3685 11.8182 29.7613 11.8182 26C11.8182 22.2387 13.3123 18.6315 15.9719 15.9719C18.6315 13.3123 22.2387 11.8182 26 11.8182C29.7613 11.8182 33.3685 13.3123 36.0281 15.9719C38.6877 18.6315 40.1818 22.2387 40.1818 26C40.1818 29.7613 38.6877 33.3685 36.0281 36.0281C33.3685 38.6877 29.7613 40.1818 26 40.1818ZM26 35.4545C28.5075 35.4545 30.9123 34.4584 32.6854 32.6854C34.4584 30.9123 35.4545 28.5075 35.4545 26C35.4545 23.4925 34.4584 21.0877 32.6854 19.3146C30.9123 17.5416 28.5075 16.5455 26 16.5455C23.4925 16.5455 21.0877 17.5416 19.3146 19.3146C17.5416 21.0877 16.5455 23.4925 16.5455 26C16.5455 28.5075 17.5416 30.9123 19.3146 32.6854C21.0877 34.4584 23.4925 35.4545 26 35.4545ZM23.6364 0H28.3636V7.09091H23.6364V0ZM23.6364 44.9091H28.3636V52H23.6364V44.9091ZM5.94455 9.28673L9.28673 5.94455L14.3 10.9578L10.9578 14.3L5.94455 9.28673ZM37.7 41.0422L41.0422 37.7L46.0555 42.7133L42.7133 46.0555L37.7 41.0422ZM42.7133 5.94218L46.0555 9.28673L41.0422 14.3L37.7 10.9578L42.7133 5.94455V5.94218ZM10.9578 37.7L14.3 41.0422L9.28673 46.0555L5.94455 42.7133L10.9578 37.7ZM52 23.6364V28.3636H44.9091V23.6364H52ZM7.09091 23.6364V28.3636H0V23.6364H7.09091Z"
              fill="url(#paint0_linear_958_1576)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_958_1576"
                x1="26"
                y1="0"
                x2="26"
                y2="52"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#248C7B" />
                <stop offset="1" stopColor="#51E6A5" />
              </linearGradient>
            </defs>
          </svg>
          <div className="text-gray-500 text-3xl font-light">
            {formattedTime}
          </div>
          <div className="flex justify-center items-center text-xl font-bold text-gray-500">
            {/* Left arrow */}
            <span className="mx-4 cursor-pointer text-xl">&lt;</span>

            {/* Date */}
            <span>{`${dayWithSuffix} ${month} ${year}`}</span>

            {/* Right arrow */}
            <span className="mx-4 cursor-pointer text-xl">&gt;</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoardSection2;
