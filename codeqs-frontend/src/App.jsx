import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Courses from './pages/Courses/Courses';
import Login from './pages/Login/Login';
import Coursedetails from './pages/Coursedetails/Coursedetails';
import Pagenotfound from './pages/Pagenotfound/Pagenotfound';
import CourseList from './pages/admin/CourseList';
import Course from './pages/admin/adminCourse';
import AdminDashboard from './pages/admin/AdminDashboard';
import UsersList from './pages/admin/UsersList';
import PrivateRoute from './Components/PrivateRoute';
import EditCourse from './pages/admin/EditCourse';
import PaymentsList from './pages/admin/PaymentsList';
import AdminLogin from './pages/admin/AdminLogin';
import AdminPrivateRoute from './Components/AdminPrivateRoute';

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />

                {/* Protected User Routes */}
                <Route element={<PrivateRoute />}>
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/coursedetails/:courseId" element={<Coursedetails />} />
                </Route>

                <Route path="/admin" element={<AdminLogin />} />

                {/* Admin Routes */}
                <Route element={<AdminPrivateRoute />}>
                
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/admin-courses" element={<Course />} />
                <Route path="/courselist" element={<CourseList />} />
                <Route path="/userslist" element={<UsersList />} />
                <Route path="/paymentslist" element={<PaymentsList />} />
                <Route path="/admin/course/edit/:id" element={<EditCourse />} />
                </Route>
                {/* Catch-all route to handle invalid admin paths */}
                <Route path="/admin/*" element={<Pagenotfound />} />

                {/* Catch-all route for non-admin paths */}
                <Route path="*" element={<Pagenotfound />} />
            </Routes>
        </Router>
    );
};

export default App;
