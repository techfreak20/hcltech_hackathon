import Sidebar from './Sidebar';
import MobileNav from './MobileNav'; 

const Mainlayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar (Desktop) */}
      <Sidebar />

      {/* Main Content Area */}
      {/* Added pb-20 to prevent content from being hidden behind mobile nav on small screens */}
      <main className="flex-1 md:ml-64 min-h-screen transition-all duration-300 pb-20 md:pb-10">
        <div className="p-4 md:p-10 max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      {/* Mobile Navigation (Bottom Bar - Visible only on mobile) */}
      <MobileNav />
    </div>
  );
};

export default Mainlayout;