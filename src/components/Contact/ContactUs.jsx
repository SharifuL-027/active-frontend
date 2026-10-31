import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, Loader2, CheckCircle2 } from 'lucide-react';

const ContactUs = () => {
  // Page load hole top e niye jabe
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); // এই খালি [] ব্র্যাকেটের মানে হলো এটি পেইজ লোড হওয়ার সময় শুধু একবারই কাজ করবে

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      // Backend er Inquiry API te data pathano hocche
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/inquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setStatus({ type: 'success', message: 'Thank you! Your message has been sent successfully. Our team will contact you shortly.' });
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setStatus({ type: 'error', message: 'Failed to send message. Please try again later.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Server error. Please check your connection.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 pt-24 pb-20">
      
      {/* --- Page Header --- */}
      <div className="bg-[#0c1b33] border-b-4 border-[#eab308] py-20 px-6 lg:px-[5%] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
          <svg width="400" height="400" viewBox="0 0 100 100">
            <line x1="0" y1="100" x2="100" y2="0" stroke="white" strokeWidth="2" />
            <line x1="20" y1="100" x2="100" y2="20" stroke="white" strokeWidth="2" />
            <line x1="40" y1="100" x2="100" y2="40" stroke="white" strokeWidth="2" />
          </svg>
        </div>

        <div className="max-w-[1700px] mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inter-bold text-[#eab308] tracking-[0.2em] text-xs uppercase mb-4 block">
              Get in Touch
            </span>
            <h1 className="inter-black text-4xl md:text-6xl text-white uppercase tracking-tight mb-6 max-w-3xl leading-tight">
              Let's Discuss Your <span className="text-transparent bg-clip-text bg-linear-to-r from-[#eab308] to-yellow-200">Next Project.</span>
            </h1>
            <p className="inter-normal text-slate-400 text-base max-w-2xl leading-relaxed">
              Whether you need a new elevator installation, genuine spare parts, or expert maintenance services, our engineering team is ready to assist you.
            </p>
          </motion.div>
        </div>
      </div>

      {/* --- Main Content Grid --- */}
      <div className="max-w-[1700px] mx-auto px-6 lg:px-[5%] py-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* LEFT SIDE: Contact Info & Map */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-5/12 flex flex-col gap-10"
          >
            {/* Contact Details */}
            <div className="space-y-8">
              <div className="flex items-start gap-5 group">
                <div className="w-14 h-14 bg-white border border-slate-200 flex items-center justify-center shrink-0 rounded-none group-hover:border-[#1e447b] group-hover:bg-[#1e447b] transition-colors duration-300">
                  <MapPin className="w-6 h-6 text-[#1e447b] group-hover:text-[#eab308] transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="inter-bold text-slate-900 text-lg uppercase tracking-wider mb-2">Corporate Office</h3>
                  <p className="inter-medium text-slate-600 leading-relaxed text-sm">
                    Sector 9, Uttara,<br />Dhaka, Bangladesh, 1230
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="w-14 h-14 bg-white border border-slate-200 flex items-center justify-center shrink-0 rounded-none group-hover:border-[#1e447b] group-hover:bg-[#1e447b] transition-colors duration-300">
                  <Phone className="w-6 h-6 text-[#1e447b] group-hover:text-[#eab308] transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="inter-bold text-slate-900 text-lg uppercase tracking-wider mb-2">Direct Contact</h3>
                  <p className="inter-medium text-slate-600 leading-relaxed text-sm">
                    Support: +01775-958181
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="w-14 h-14 bg-white border border-slate-200 flex items-center justify-center shrink-0 rounded-none group-hover:border-[#1e447b] group-hover:bg-[#1e447b] transition-colors duration-300">
                  <Mail className="w-6 h-6 text-[#1e447b] group-hover:text-[#eab308] transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="inter-bold text-slate-900 text-lg uppercase tracking-wider mb-2">Email Address</h3>
                  <p className="inter-medium text-slate-600 leading-relaxed text-sm">
                    sayem@activelifts-bd.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="w-14 h-14 bg-white border border-slate-200 flex items-center justify-center shrink-0 rounded-none group-hover:border-[#1e447b] group-hover:bg-[#1e447b] transition-colors duration-300">
                  <Clock className="w-6 h-6 text-[#1e447b] group-hover:text-[#eab308] transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="inter-bold text-slate-900 text-lg uppercase tracking-wider mb-2">Business Hours</h3>
                  <p className="inter-medium text-slate-600 leading-relaxed text-sm">
                    Saturday - Thursday: 9:00 AM - 6:00 PM<br />
                    Friday: Closed
                  </p>
                </div>
              </div>
            </div>

            {/* Google Map (Premium Grayscale style) */}
            <div className="w-full h-64 bg-slate-200 border border-slate-300 rounded-none overflow-hidden relative">
  <iframe 
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.5135111956555!2d90.395031!3d23.8772975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c43ec75cadf5%3A0xb809cd999981f652!2sSector%209%2C%20Dhaka%201230!5e0!3m2!1sen!2sbd!4v1710000000000!5m2!1sen!2sbd" 
    width="100%" 
    height="100%" 
    style={{ border: 0, filter: 'contrast(1.2)' }} 
    allowFullScreen="" 
    loading="lazy" 
    referrerPolicy="no-referrer-when-downgrade"
    title="Active Lifts Location - Sector 9"
  ></iframe>
</div>
          </motion.div>

          {/* RIGHT SIDE: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full lg:w-7/12"
          >
            <div className="bg-white border-t-4 border-[#1e447b] shadow-[0_20px_40px_-15px_rgba(30,68,123,0.05)] p-8 md:p-12 rounded-none">
              <h2 className="inter-black text-2xl md:text-3xl text-slate-900 uppercase tracking-tight mb-2">Send us a message</h2>
              <p className="inter-medium text-slate-500 text-sm mb-8">Fill out the form below and our engineering team will get back to you within 24 hours.</p>

              {status.message && (
                <div className={`p-4 mb-8 inter-bold text-sm flex items-start gap-3 rounded-none ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                  {status.type === 'success' && <CheckCircle2 className="shrink-0 mt-0.5" size={18} />}
                  <p>{status.message}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="inter-bold text-[10px] text-slate-500 uppercase tracking-widest mb-2 block">Full Name *</label>
                    <input 
                      type="text" name="name" required
                      value={formData.name} onChange={handleChange}
                      className="inter-medium w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3 focus:outline-none focus:border-[#1e447b] focus:bg-white transition-colors rounded-none"
                      placeholder="Your name:"
                    />
                  </div>
                  <div>
                    <label className="inter-bold text-[10px] text-slate-500 uppercase tracking-widest mb-2 block">Phone Number *</label>
                    <input 
                      type="tel" name="phone" required
                      value={formData.phone} onChange={handleChange}
                      className="inter-medium w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3 focus:outline-none focus:border-[#1e447b] focus:bg-white transition-colors rounded-none"
                      placeholder="+880 1XXX-XXXXXX"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="inter-bold text-[10px] text-slate-500 uppercase tracking-widest mb-2 block">Email Address *</label>
                    <input 
                      type="email" name="email" required
                      value={formData.email} onChange={handleChange}
                      className="inter-medium w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3 focus:outline-none focus:border-[#1e447b] focus:bg-white transition-colors rounded-none"
                      placeholder="name@company.com"
                    />
                  </div>
                  <div>
                    <label className="inter-bold text-[10px] text-slate-500 uppercase tracking-widest mb-2 block">Subject</label>
                    <select 
                      name="subject"
                      value={formData.subject} onChange={handleChange}
                      className="inter-medium w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3 focus:outline-none focus:border-[#1e447b] focus:bg-white transition-colors rounded-none appearance-none"
                    >
                      <option value="">Select a subject...</option>
                      <option value="New Installation Quote">New Installation Quote</option>
                      <option value="Spare Parts Inquiry">Spare Parts Inquiry</option>
                      <option value="Maintenance & Service">Maintenance & Service</option>
                      <option value="Partnership / Dealership">Partnership / Dealership</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="inter-bold text-[10px] text-slate-500 uppercase tracking-widest mb-2 block">Your Message *</label>
                  <textarea 
                    name="message" required rows="5"
                    value={formData.message} onChange={handleChange}
                    className="inter-medium w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3 focus:outline-none focus:border-[#1e447b] focus:bg-white transition-colors rounded-none resize-none"
                    placeholder="Tell us about your requirements..."
                  ></textarea>
                </div>

                <button 
                  type="submit" disabled={loading}
                  className="bg-[#1e447b] hover:bg-[#0c1b33] text-white inter-bold text-xs uppercase tracking-widest px-8 py-4 border-none transition-colors duration-300 flex items-center justify-center gap-3 disabled:opacity-70 rounded-none w-full sm:w-auto mt-4 shadow-lg shadow-[#1e447b]/20 hover:shadow-[#1e447b]/40"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  {loading ? 'Sending Message...' : 'Submit Inquiry'}
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default ContactUs;