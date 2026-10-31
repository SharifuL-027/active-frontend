import { Navigate, Outlet } from 'react-router-dom';

const AdminProtectedRoute = ({ children }) => {
  // Local storage theke token ti check kora hocche
  const token = localStorage.getItem('adminToken');

  // Jodi token NA thake, tahole login page e redirect kore dibe
  // "replace" er mane holo browser history te ei page ta thakbe na, tai back button chapleo kaj hobe na
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  // Token thakle tar vitore thaka page (jemon Dashboard) dekhte dibe
  return children ? children : <Outlet />;
};

export default AdminProtectedRoute;