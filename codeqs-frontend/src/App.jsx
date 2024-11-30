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


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Courses" element={<Courses />} />
                <Route path="/login" element={<Login />} />
                <Route path="/Coursedetails/:courseId" element={<Coursedetails />} />
                <Route path="*" element={<Pagenotfound />} />

                {/* Admin routes, only accessible by admin role */}
                <Route element={<PrivateRoute role="admin" />}>
                    <Route path="/admin-dashboard" element={<AdminDashboard />} />
                    <Route path="/admin-courses" element={<Course />} />
                    <Route path="/courselist" element={<CourseList />} />
                    <Route path="/userslist" element={<UsersList />} />
                    <Route path="/paymentslist" element={<PaymentsList />} />
                    <Route path="/admin/course/edit/:id" element={<EditCourse />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
