import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, PlusSquare, Package, LogOut, Menu, X, MessageSquare, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';

const navItems = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
  { name: 'Add Product', path: '/admin/dashboard/add-product', icon: <PlusSquare size={20} /> },
  { name: 'All Products', path: '/admin/dashboard/products', icon: <Package size={20} /> },
  { name: 'Messages', path: '/admin/dashboard/inquiries', icon: <MessageSquare size={20} /> },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  // Close the menu whenever the route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Close the menu if the screen grows to desktop size
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = (e) => {
      if (e.matches) setIsMobileMenuOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Lock page scroll and allow Escape to close while the mobile menu is open
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKey = (e) => e.key === 'Escape' && setIsMobileMenuOpen(false);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="flex min-h-dvh bg-slate-50">

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 inset-x-0 h-16 bg-[#0c1b33] z-50 flex items-center justify-between px-4 border-b-[3px] border-[#eab308]">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 shrink-0 bg-[#1e447b] flex items-center justify-center border-b-2 border-[#eab308]">
            <span className="text-[#eab308] inter-black text-lg leading-none">A</span>
          </div>
          <span className="inter-black text-white text-base sm:text-xl uppercase tracking-widest truncate">
            Admin
          </span>
        </div>
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="admin-sidebar"
          className="p-2 -mr-2 text-white"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </header>

      {/* Backdrop (mobile only) - tap outside to close */}
      <div
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
        className={`lg:hidden fixed inset-x-0 top-16 bottom-0 bg-black/50 z-30 transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Sidebar */}
      <aside
        id="admin-sidebar"
        className={`fixed lg:sticky top-16 lg:top-0 left-0 z-40 self-start shrink-0
          w-64 max-w-[85vw] h-[calc(100dvh-4rem)] lg:h-dvh
          bg-[#0c1b33] border-r-4 border-[#eab308] flex flex-col overflow-hidden
          transition-transform duration-300 motion-reduce:transition-none
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >

        {/* Sidebar Logo (Desktop) */}
        <div className="hidden lg:flex items-center gap-3 p-6 border-b border-slate-700/50 mb-6 shrink-0">
          <div className="w-10 h-10 bg-[#1e447b] flex items-center justify-center border-b-2 border-[#eab308] rounded-none">
            <span className="text-[#eab308] inter-black text-2xl leading-none">A</span>
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-xl inter-black text-white tracking-tight uppercase leading-none">Active</span>
            <span className="text-[9px] inter-bold text-slate-400 tracking-widest uppercase mt-1">Admin Panel</span>
          </div>
        </div>

        {/* Navigation Links (scrolls on short screens) */}
        <nav className="flex-1 min-h-0 overflow-y-auto px-4 pt-6 lg:pt-0 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/admin/dashboard'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 inter-bold text-xs uppercase tracking-widest transition-all duration-300 rounded-none border-l-2 ${
                  isActive
                    ? 'bg-[#1e447b] text-white border-[#eab308]'
                    : 'text-slate-400 border-transparent hover:bg-slate-800/50 hover:text-white hover:border-slate-500'
                }`
              }
            >
              <span className="shrink-0">{item.icon}</span>
              <span className="truncate">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom Actions (Back to Website & Logout) */}
        <div className="shrink-0 p-4 border-t border-slate-700/50 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-3 px-4 py-3 inter-bold text-xs uppercase tracking-widest text-slate-400 hover:bg-slate-800/50 hover:text-white border border-transparent hover:border-slate-500 transition-colors rounded-none"
          >
            <Globe size={20} className="shrink-0" />
            <span className="truncate">Back to Website</span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 inter-bold text-xs uppercase tracking-widest text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors rounded-none"
          >
            <LogOut size={20} className="shrink-0" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 pt-16 lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-10">
          <Outlet />
        </div>
      </main>

    </div>
  );
};

export default AdminLayout;