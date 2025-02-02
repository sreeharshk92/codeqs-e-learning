import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Courses from './Pages/Courses/Courses';
import Login from './Pages/Login/Login';
import Coursedetails from './Pages/Coursedetails/Coursedetails';
import Pagenotfound from './Pages/Pagenotfound/Pagenotfound';
import CourseList from './Pages/admin/CourseList';
import Course from './Pages/admin/adminCourse';
import AdminDashboard from './Pages/admin/AdminDashboard';
import UsersList from './Pages/admin/UsersList';
import PrivateRoute from './Components/PrivateRoute';
import EditCourse from './Pages/admin/EditCourse';
import PaymentsList from './Pages/admin/PaymentsList';
import AdminLogin from './Pages/admin/AdminLogin';
import AdminPrivateRoute from './Components/AdminPrivateRoute';
import Workshop from './Pages/workshop/Workshop';

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
                    <Route path="/workshop" element={<Workshop />} />
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
