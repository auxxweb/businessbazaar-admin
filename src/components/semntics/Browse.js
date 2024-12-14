import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ContentArea from "./ContentArea";

function Browse() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex-1 flex flex-col z-50 bg-white">
      <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex h-[100%] bg-[#212529] z-40">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-4 bg-[#e7edf4] pt-24">
          <ContentArea /> {/* ContentArea now gets the router context */}
        </main>
      </div>
    </div>
  );
}

export default Browse;
