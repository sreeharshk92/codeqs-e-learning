import { Navigate, Outlet } from 'react-router-dom';

const AdminPrivateRoute = () => {
    const userRole = localStorage.getItem('userRole'); // Assuming 'userRole' is stored in localStorage.

    // Check if the user is authenticated and has the admin role
    if (!userRole || userRole !== 'admin') {
        // If user is not authenticated or not an admin, redirect to admin login
        return <Navigate to="/admin" replace />;
    }

    return <Outlet />;
};

export default AdminPrivateRoute;
