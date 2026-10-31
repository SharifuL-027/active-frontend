import { useState, useEffect } from 'react';
import { Loader2, Trash2, Mail, Calendar, User, Phone } from 'lucide-react';

const Inquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/inquiries`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setInquiries(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch inquiries');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/inquiries/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setInquiries(inquiries.filter(msg => msg._id !== id));
      }
    } catch (error) {
      alert('Failed to delete message');
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto pb-10">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="inter-black text-3xl text-slate-900 uppercase tracking-tight mb-2">Customer Inquiries</h1>
          <p className="inter-medium text-slate-500">View messages and quote requests from your clients.</p>
        </div>
        <div className="inter-bold text-xs uppercase tracking-widest bg-slate-100 text-slate-600 px-4 py-2 border border-slate-200">
          Total: {inquiries.length} Messages
        </div>
      </div>

      {loading ? (
        <div className="w-full flex justify-center items-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-[#1e447b]" />
        </div>
      ) : inquiries.length === 0 ? (
        <div className="bg-white border border-slate-200 p-12 text-center rounded-none shadow-sm">
          <Mail className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="inter-medium text-slate-500">No messages found in your inbox.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {inquiries.map((msg) => (
            <div key={msg._id} className="bg-white border border-slate-200 p-6 rounded-none shadow-sm hover:border-[#1e447b] transition-colors relative">
              
              <div className="flex flex-col md:flex-row justify-between gap-4 mb-4 border-b border-slate-100 pb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-slate-900">
                    <User size={16} className="text-[#eab308]" />
                    <span className="inter-bold text-lg">{msg.name}</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-500">
                    <span className="flex items-center gap-1 inter-medium text-sm"><Mail size={14} /> {msg.email}</span>
                    <span className="flex items-center gap-1 inter-medium text-sm"><Phone size={14} /> {msg.phone}</span>
                  </div>
                </div>
                
                <div className="flex flex-col md:items-end gap-2">
  <span className="flex items-center gap-1 text-slate-400 inter-medium text-xs uppercase tracking-widest">
    <Calendar size={12} />
    {new Date(msg.createdAt).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      timeZone: 'Asia/Dhaka',
    })}
    <span className="text-slate-300">•</span>
    {new Date(msg.createdAt).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Dhaka',
    })}
  </span>
  <span className="bg-blue-50 text-[#1e447b] border border-blue-100 px-3 py-1 inter-bold text-[10px] uppercase tracking-widest">
    {msg.subject || 'General Inquiry'}
  </span>
</div>
              </div>

              <div className="mb-4">
                <p className="inter-normal text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
                  {msg.message}
                </p>
              </div>

              <div className="flex justify-end pt-4">
                <button 
                  onClick={() => handleDelete(msg._id)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border border-red-100 hover:border-red-600 transition-colors rounded-none inter-bold text-xs uppercase tracking-widest"
                >
                  <Trash2 size={14} /> Delete Message
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Inquiries;