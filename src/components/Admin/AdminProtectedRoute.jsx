import { Navigate, Outlet } from 'react-router-dom';

const AdminProtectedRoute = ({ children }) => {
  // Local storage theke token ti check kora hocche
  const token = localStorage.getItem('adminToken');

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

 
  return children ? children : <Outlet />;
};

export default AdminProtectedRoute;