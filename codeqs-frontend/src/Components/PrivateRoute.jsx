import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ role }) => {
    const userRole = localStorage.getItem('userRole');

    // Check if user is authenticated and has the required role
    if (!userRole || (role && userRole !== role)) {
        // If user is not authenticated or doesn't have the right role, redirect to login
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;
