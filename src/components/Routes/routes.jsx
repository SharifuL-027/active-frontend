import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import HeroSection from './../Home/HeroSection';
import QualitySection from '../Home/QualitySection';
import ProductShowcase from '../Home/ProductShowcase';
import ProductFilterSection from '../Home/ProductFilterSection';
import Footer from '../Footer/Footer';
import ProductDetails from '../Product/ProductDetails'; 
import Products from '../Product/Products';
import FloatingSocialButtons from '../Social Btns/FloatingSocialButtons';
import AboutUs from '../AboutUs/AboutUs';
import AdminLogin from '../Admin/AdminLogin';
import AdminProtectedRoute from '../Admin/AdminProtectedRoute';
import AddProduct from '../Admin/AddProduct';
import AdminLayout from '../Admin/AdminLayout';
import AllProducts from '../Admin/AllProducts';
import Inquiries from '../Admin/Inquiries';
import ContactUs from '../Contact/ContactUs';
import ProductCommitment from '../Home/ProductCommitment';
import FaqSection from '../Home/FaqSection';
import WhatsAppButton from '../Home/WhatsAppButton';
import QualityAssurance from '../Quality/QualityAssurance';
import AdminDashboard from '../Admin/AdminDashboard';
import ScrollToTop from '../Scroll/ScrollToTop';

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative">
      <Navbar />
      <ScrollToTop/>
      <main className="grow w-full mx-auto pt-24 sm:px-6 lg:px-8">
        <WhatsAppButton/>
        <Outlet />
      </main>
      <Footer/>
      <FloatingSocialButtons/>
    </div>
  );
};

export const routes = [
  // ==========================================
  // ১. PUBLIC WEBSITE (Ekhane Navbar o Footer thakbe)
  // ==========================================
  {
    path: '/',
    element: <AppLayout />, 
    children: [
      {
        index: true,
        element: (
          <>
            <HeroSection />
            <QualitySection />
            <ProductShowcase/>
            <ProductCommitment/>
            <ProductFilterSection/>
            <FaqSection/>
            
          </>
        ),
      },
      { 
        path: 'Product', 
        element: <Products /> 
      }, 
      { 
        path: 'product/:id', 
        element: <ProductDetails /> 
      },
      {
        path: 'about',
        element: <AboutUs/>
      },
      {
        path: 'contact',
        element: <ContactUs/>

      },
      {
        path: 'quality-assurance',
        element: <QualityAssurance/>
      }
    ],
  }, // <-- Ekhane AppLayout er object shesh

  // ==========================================
  // ২. ADMIN LOGIN (Ekhane Navbar/Footer thakbe na)
  // ==========================================
  {
    path: '/admin/login',
    element: <AdminLogin />
  },

  // ==========================================
  // ৩. ADMIN DASHBOARD (Ekhane sudhu AdminLayout er Sidebar thakbe)
  // ==========================================
  {
    path: '/admin/dashboard',
    element: (
      <AdminProtectedRoute>
        <AdminLayout />
      </AdminProtectedRoute>
    ),
    children: [
      {
        index: true, 
        element: <AdminDashboard />
      },
      {
        path: 'add-product', 
        element: <AddProduct />
      },
      {
        path: 'products', 
        element: <AllProducts />
      },
      {
        path: 'inquiries', 
        element: <Inquiries/>
      }
    ]
  }
];