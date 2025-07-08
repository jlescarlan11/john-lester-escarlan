import React from "react";
import MainContent from "./MainContent";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="container max-w-7xl mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <aside className="col-span-1">
          <Sidebar />
        </aside>
        <main className="col-span-3">
          <MainContent />
        </main>
      </div>
    </div>
  );
};

export default Layout;
