import MainContent from "./MainContent";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="container max-w-7xl mx-auto py-4 lg:py-8 px-4 relative">
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-2 lg:gap-16">
        <aside className="lg:col-span-2 sticky top-8 z-50">
          <div className=" lg:block lg:sticky  lg:top-16">
            <Sidebar />
          </div>
        </aside>
        <main className="lg:col-span-5 z-10">
          <MainContent />
        </main>
      </div>
    </div>
  );
};

export default Layout;
