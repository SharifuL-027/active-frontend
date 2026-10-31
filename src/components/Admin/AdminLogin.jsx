import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ArrowLeft, Loader2, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Password visible/hide korar state
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('adminToken', data.data.token);
        navigate('/admin/dashboard');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#1e447b] opacity-5 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#eab308] opacity-5 blur-[100px] rounded-full pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        
        {/* Back Button */}
        <button 
          onClick={() => navigate('/')} 
          className="mb-6 flex items-center gap-2 text-slate-500 hover:text-[#1e447b] transition-colors inter-bold text-xs uppercase tracking-wider focus:outline-none"
        >
          <ArrowLeft size={16} />
          Back to Website
        </button>

        {/* Login Card */}
        <div className="bg-white border-t-4 border-[#eab308] shadow-[0_20px_40px_-15px_rgba(30,68,123,0.1)] p-8 sm:p-12 rounded-none">
          <div className="text-center mb-10">
            <div className="w-auto h-16 bg-[#ffffff] flex items-center justify-center mx-auto mb-6 rounded-none border-b-2 border-[#eab308] overflow-hidden p-2">
              <img 
                src="https://res.cloudinary.com/dsrs8hryx/image/upload/v1792053853/Logo_maiabs.png" 
                alt="Active Lifts Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <h2 className="inter-bold text-2xl text-slate-900 uppercase tracking-wider mb-2">Login</h2>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 inter-medium text-sm p-4 mb-6 rounded-none text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            
            <div>
              <label className="inter-bold text-[10px] text-slate-500 uppercase tracking-widest mb-2 block">Email Address</label>
              <div className="relative">
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="inter-medium w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3 pl-11 focus:outline-none focus:border-[#1e447b] focus:bg-white transition-colors rounded-none"
                  placeholder="admin@activelifts.com"
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              </div>
            </div>

            <div>
              <label className="inter-bold text-[10px] text-slate-500 uppercase tracking-widest mb-2 block">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="inter-medium w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3 pl-11 pr-11 focus:outline-none focus:border-[#1e447b] focus:bg-white transition-colors rounded-none"
                  placeholder="••••••••"
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                
                {/* Password Toggle Button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#1e447b] transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#1e447b] hover:bg-[#0c1b33] text-white inter-bold text-xs uppercase tracking-widest py-4 border-none transition-colors duration-300 flex items-center justify-center gap-3 mt-4 disabled:opacity-70 disabled:cursor-not-allowed rounded-none"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Secure Login <ArrowRight size={16} />
                </>
              )}
            </button>
            
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;