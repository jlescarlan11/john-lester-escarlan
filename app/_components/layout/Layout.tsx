import React from "react";
import MainContent from "./MainContent";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="container max-w-7xl mx-auto py-4 lg:py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-7 lg:gap-16">
        <aside className="col-span-2 relative">
          <div className="sticky top-16">
            <Sidebar />
          </div>
        </aside>
        <main className="col-span-5">
          <MainContent />
        </main>
      </div>
    </div>
  );
};

export default Layout;
