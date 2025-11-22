import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, User, Activity, MessageSquare, LogOut, HeartPulse } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useContext(AuthContext);

  const menuItems = [
    { path: '/dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { path: '/profile', name: 'My Profile', icon: User },
    { path: '/goals', name: 'Wellness Goals', icon: Activity },
    { path: '/messages', name: 'Messages', icon: MessageSquare },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 z-20">
      {/* Logo Area */}
      <div className="flex items-center gap-3 px-8 py-6 border-b border-gray-100">
        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
          <HeartPulse size={24} />
        </div>
        <span className="text-xl font-bold text-gray-800 tracking-tight">HCL Health</span>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
              isActive(item.path)
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' // FIX: Used standard color instead of custom
                : 'text-gray-500 hover:bg-gray-50 hover:text-indigo-600'
            }`}
          >
            <item.icon size={20} />
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-500 rounded-xl hover:bg-red-50 transition-colors"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;