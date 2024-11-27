import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
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
