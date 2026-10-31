import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Package, Layers, MessageSquare, Inbox, PlusSquare,
  ArrowRight, RefreshCw, AlertCircle, Clock,
} from 'lucide-react';

const API = import.meta.env.VITE_API_BASE_URL;
const TZ = 'Asia/Dhaka';

/* ---------- New Category Mapping ---------- */
const categoryStructure = {
  "Elevators & Lifts": ['Lift & Escalator', 'Cargo Lift', 'Home Lift'],
  "Spare Parts": ['Traction Motor', 'Cabin', 'Controller', 'Door System', 'COP & LOP', 'Steel Rope & Suspension Rod'],
  "Safety Components": ['Photocell', 'Buffer', 'Speed Governor', 'Guide Shoe', 'Limit Switch', 'U Switch']
};

const getMainCategory = (subCategory) => {
  for (const [main, subs] of Object.entries(categoryStructure)) {
    // Exact match ignore case check for safety
    if (subs.some(s => s.toLowerCase() === (subCategory || '').toLowerCase())) {
      return main;
    }
  }
  return subCategory || 'Uncategorized'; // Fallback
};

/* ---------- helpers ---------- */

const fetchList = async (path, { auth = false, signal } = {}) => {
  const headers = {};
  if (auth) headers.Authorization = `Bearer ${localStorage.getItem('adminToken')}`;

  const res = await fetch(`${API}${path}`, { headers, signal });
  if (res.status === 401) {
    const err = new Error('Unauthorized');
    err.status = 401;
    throw err;
  }
  const json = await res.json();
  if (!Array.isArray(json) && json.success === false) {
    throw new Error(json.message || 'Request failed');
  }
  return Array.isArray(json) ? json : (json.data ?? []);
};

const getGreeting = () => {
  const hour =
    parseInt(new Date().toLocaleString('en-US', { hour: 'numeric', hour12: false, timeZone: TZ }), 10) % 24;
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};

const formatDate = (d) =>
  new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: TZ });

const formatTime = (d) =>
  new Date(d).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: TZ });

const timeAgo = (d) => {
  const diff = Date.now() - new Date(d).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return formatDate(d);
};

const byNewest = (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0);

/* ---------- small UI pieces ---------- */

const Skeleton = ({ className = '' }) => <div className={`bg-slate-200 animate-pulse ${className}`} />;

const StatCard = ({ icon, label, value, loading, accent = '#1e447b' }) => (
  <div className="bg-white border border-slate-200 shadow-sm p-4 sm:p-5 flex items-center gap-3 sm:gap-4 min-w-0 rounded-none">
    <div
      className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 flex items-center justify-center text-white rounded-none"
      style={{ backgroundColor: accent }}
    >
      {icon}
    </div>
    <div className="min-w-0">
      <p className="inter-bold text-[10px] text-slate-500 uppercase tracking-widest truncate">{label}</p>
      {loading ? (
        <Skeleton className="h-7 w-12 mt-1" />
      ) : (
        <p className="inter-black text-2xl sm:text-3xl text-slate-900 leading-tight">{value}</p>
      )}
    </div>
  </div>
);

const Panel = ({ title, linkTo, linkText, className = '', children }) => (
  <section className={`bg-white border border-slate-200 shadow-sm flex flex-col min-w-0 rounded-none ${className}`}>
    <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-slate-100 flex items-center justify-between gap-3">
      <h2 className="inter-black text-sm sm:text-base text-slate-900 uppercase tracking-tight">{title}</h2>
      {linkTo && (
        <Link
          to={linkTo}
          className="inter-bold text-[10px] text-[#1e447b] hover:text-[#0c1b33] uppercase tracking-widest flex items-center gap-1 shrink-0"
        >
          {linkText} <ArrowRight size={12} />
        </Link>
      )}
    </div>
    <div className="p-4 sm:p-5 flex-1">{children}</div>
  </section>
);

const SectionError = ({ message, onRetry }) => (
  <div className="bg-red-50 border border-red-200 text-red-600 inter-medium text-sm p-3 flex items-center justify-between gap-3 rounded-none">
    <span className="flex items-center gap-2 min-w-0">
      <AlertCircle size={16} className="shrink-0" /> <span className="truncate">{message}</span>
    </span>
    <button onClick={onRetry} className="inter-bold text-[10px] uppercase tracking-widest underline shrink-0">
      Retry
    </button>
  </div>
);

const Empty = ({ text }) => <p className="inter-medium text-sm text-slate-400 text-center py-6">{text}</p>;

/* ---------- page ---------- */

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [errors, setErrors] = useState({ products: '', inquiries: '' });
  const [lastUpdated, setLastUpdated] = useState(null);

  const loadData = useCallback(
    async (signal) => {
      setRefreshing(true);
      const [prodRes, inqRes] = await Promise.allSettled([
        fetchList('/products', { signal }),
        fetchList('/inquiries', { auth: true, signal }),
      ]);

      if (signal?.aborted) return;

      // Expired / invalid token -> back to login
      if ([prodRes, inqRes].some((r) => r.status === 'rejected' && r.reason?.status === 401)) {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
        return;
      }

      const nextErrors = { products: '', inquiries: '' };

      if (prodRes.status === 'fulfilled') setProducts(prodRes.value);
      else nextErrors.products = 'Could not load products.';

      if (inqRes.status === 'fulfilled') setInquiries(inqRes.value);
      else nextErrors.inquiries = 'Could not load messages.';

      setErrors(nextErrors);
      setLastUpdated(new Date());
      setLoading(false);
      setRefreshing(false);
    },
    [navigate]
  );

  useEffect(() => {
    const controller = new AbortController();
    loadData(controller.signal);
    return () => controller.abort();
  }, [loadData]);

  /* ---------- derived data ---------- */

  const stats = useMemo(() => {
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

    // Mapping products dynamically to their Main Categories
    const categoryCounts = products.reduce((acc, p) => {
      const mainKey = getMainCategory(p.category);
      acc[mainKey] = (acc[mainKey] || 0) + 1;
      return acc;
    }, {});
    
    const categories = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]);

    return {
      totalProducts: products.length,
      totalCategories: categories.length,
      totalMessages: inquiries.length,
      newThisWeek: inquiries.filter((m) => m.createdAt && new Date(m.createdAt).getTime() >= weekAgo).length,
      categories, // Now contains counts for "Spare Parts", "Safety Components", etc.
      maxCategory: categories[0]?.[1] || 1, // Determines 100% width for progress bar
      recentMessages: [...inquiries].sort(byNewest).slice(0, 5),
      recentProducts: [...products].sort(byNewest).slice(0, 5),
    };
  }, [products, inquiries]);

  const quickActions = [
    { label: 'Add Product', to: '/admin/dashboard/add-product', icon: <PlusSquare size={18} /> },
    { label: 'Manage Products', to: '/admin/dashboard/products', icon: <Package size={18} /> },
    { label: 'View Messages', to: '/admin/dashboard/inquiries', icon: <MessageSquare size={18} /> },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto pb-10 min-w-0">

      {/* Header */}
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div className="min-w-0">
          <h1 className="inter-black text-2xl sm:text-3xl text-slate-900 uppercase tracking-tight mb-1">
            {getGreeting()}, Admin
          </h1>
          <p className="inter-medium text-sm sm:text-base text-slate-500">
            {new Date().toLocaleDateString('en-GB', {
              weekday: 'long', day: '2-digit', month: 'long', year: 'numeric', timeZone: TZ,
            })}
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          {lastUpdated && (
            <span className="hidden sm:flex items-center gap-1 inter-medium text-xs text-slate-400">
              <Clock size={12} /> Updated {formatTime(lastUpdated)}
            </span>
          )}
          <button
            onClick={() => loadData()}
            disabled={refreshing}
            className="flex items-center gap-2 bg-white border border-slate-200 hover:border-[#1e447b] hover:text-[#1e447b] text-slate-600 inter-bold text-xs uppercase tracking-widest px-4 py-2.5 transition-colors disabled:opacity-60 rounded-none"
          >
            <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} /> Refresh
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <StatCard icon={<Package size={22} />} label="Total Products" value={stats.totalProducts} loading={loading} />
        <StatCard icon={<Layers size={22} />} label="Main Groups" value={stats.totalCategories} loading={loading} accent="#0c1b33" />
        <StatCard icon={<MessageSquare size={22} />} label="Messages" value={stats.totalMessages} loading={loading} accent="#1e447b" />
        <StatCard icon={<Inbox size={22} />} label="New This Week" value={stats.newThisWeek} loading={loading} accent="#eab308" />
      </div>

      {/* Row 1: messages + categories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
        <Panel title="Recent Messages" linkTo="/admin/dashboard/inquiries" linkText="View all" className="lg:col-span-2">
          {errors.inquiries ? (
            <SectionError message={errors.inquiries} onRetry={() => loadData()} />
          ) : loading ? (
            <div className="space-y-3">{[...Array(4)].map((_, i) => <Skeleton key={i} className="h-14 w-full rounded-none" />)}</div>
          ) : stats.recentMessages.length === 0 ? (
            <Empty text="No messages yet." />
          ) : (
            <ul className="divide-y divide-slate-100 -my-2">
              {stats.recentMessages.map((msg) => (
                <li key={msg._id} className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
                  <div className="min-w-0">
                    <p className="inter-bold text-sm text-slate-900 truncate">{msg.name || 'Unknown sender'}</p>
                    <p className="inter-medium text-xs text-slate-500 truncate">
                      {msg.subject || 'General Inquiry'}
                      {msg.message ? ` · ${msg.message}` : ''}
                    </p>
                  </div>
                  {msg.createdAt && (
                    <span
                      className="inter-medium text-[11px] text-slate-400 whitespace-nowrap shrink-0"
                      title={`${formatDate(msg.createdAt)}\n${formatTime(msg.createdAt)}`}
                    >
                      {timeAgo(msg.createdAt)}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel title="Products by Group">
          {errors.products ? (
            <SectionError message={errors.products} onRetry={() => loadData()} />
          ) : loading ? (
            <div className="space-y-4">{[...Array(4)].map((_, i) => <Skeleton key={i} className="h-8 w-full rounded-none" />)}</div>
          ) : stats.categories.length === 0 ? (
            <Empty text="No products yet." />
          ) : (
            <ul className="space-y-4 max-h-64 overflow-y-auto pr-2 scrollbar-hide">
              {stats.categories.map(([name, count]) => (
                <li key={name}>
                  <div className="flex justify-between gap-3 mb-1.5">
                    <span className="inter-semibold text-xs text-slate-700 truncate">{name}</span>
                    <span className="inter-bold text-xs text-[#1e447b] shrink-0">{count}</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-none overflow-hidden">
                    <div
                      className="h-full bg-[#1e447b] transition-all duration-1000 ease-out"
                      style={{ width: `${(count / stats.maxCategory) * 100}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>

      {/* Row 2: recent products + quick actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <Panel title="Recently Added Products" linkTo="/admin/dashboard/products" linkText="Manage" className="lg:col-span-2">
          {errors.products ? (
            <SectionError message={errors.products} onRetry={() => loadData()} />
          ) : loading ? (
            <div className="space-y-3">{[...Array(4)].map((_, i) => <Skeleton key={i} className="h-14 w-full rounded-none" />)}</div>
          ) : stats.recentProducts.length === 0 ? (
            <Empty text="No products yet." />
          ) : (
            <ul className="divide-y divide-slate-100 -my-2">
              {stats.recentProducts.map((p) => (
                <li key={p._id} className="py-3 flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 shrink-0 bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center rounded-none">
                    {p.images?.length > 0 ? (
                      <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
                    ) : (
                      <Package size={18} className="text-slate-400" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="inter-bold text-sm text-slate-900 truncate">{p.title}</p>
                    <p className="inter-medium text-[11px] text-slate-500 uppercase tracking-wider truncate">{p.category}</p>
                  </div>
                  {p.createdAt && (
                    <span className="hidden sm:block inter-medium text-[11px] text-slate-400 whitespace-nowrap shrink-0">
                      {formatDate(p.createdAt)}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel title="Quick Actions">
          <div className="flex flex-col gap-2">
            {quickActions.map((action) => (
              <Link
                key={action.to}
                to={action.to}
                className="flex items-center justify-between gap-3 px-4 py-3 bg-slate-50 hover:bg-[#1e447b] hover:text-white text-slate-700 border border-slate-200 hover:border-[#1e447b] inter-bold text-xs uppercase tracking-widest transition-colors rounded-none"
              >
                <span className="flex items-center gap-3">{action.icon} {action.label}</span>
                <ArrowRight size={14} />
              </Link>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
};

export default AdminDashboard;