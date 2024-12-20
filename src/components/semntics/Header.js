import React from 'react'

function Header({ toggleSidebar }) {
  return (
    <header className="flex fixed top-0 left-0 w-[100vw]  z-50 items-center justify-between p-4" style={{ background: 'linear-gradient(135deg, #105193, #107D93)' }}>
      <button
        className="text-gray-200 focus:outline-none lg:hidden "
        onClick={toggleSidebar}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
      <img
        src="/enConnectLogo.jpeg"
        alt=" Logo"
        className="width-50 h-12 hidden  md:block object-contain"
        priority
      />
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 rounded-l-md border border-[#98b3ce] focus:outline-none bg-[#d4e0ec] text-white placeholder-white"
        />
        <button className="flex items-center p-3 bg-[#98b3ce] text-white rounded-r-md">
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.975 13.8438C16.2563 14.1562 16.2563 14.625 15.9438 14.9062L15.0688 15.7812C14.7875 16.0938 14.3188 16.0938 14.0063 15.7812L10.9125 12.6875C10.7563 12.5312 10.6938 12.3438 10.6938 12.1562V11.625C9.56875 12.5 8.19375 13 6.69375 13C3.1 13 0.19375 10.0938 0.19375 6.5C0.19375 2.9375 3.1 0 6.69375 0C10.2563 0 13.1938 2.9375 13.1938 6.5C13.1938 8.03125 12.6625 9.40625 11.8188 10.5H12.3188C12.5063 10.5 12.6938 10.5938 12.85 10.7188L15.975 13.8438ZM6.69375 10.5C8.88125 10.5 10.6938 8.71875 10.6938 6.5C10.6938 4.3125 8.88125 2.5 6.69375 2.5C4.475 2.5 2.69375 4.3125 2.69375 6.5C2.69375 8.71875 4.475 10.5 6.69375 10.5Z" fill="white" />
          </svg>
        </button>
      </div>
    </header>
  );
}

export default Header;
