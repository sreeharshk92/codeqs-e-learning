import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home'; // Check this path
import Courses from './Pages/Courses/Courses';
import Login from './Pages/Login/Login';
import Coursedetails from './Pages/Coursedetails/Coursedetails';
import Pagenotfound from './Pages/Pagenotfound/Pagenotfound'; // Ensure you have this page
import CourseList from './Components/admin/CourseList';
import Course from './Components/admin/adminCourse';
import EditCourse from './Components/admin/EditCourse';
import AdminDashboard from './Components/AdminDashboard';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Courses" element={<Courses />} />
                <Route path="/login" element={<Login />} />
                <Route path="/Coursedetails" element={<Coursedetails />} />
                <Route path="*" element={<Pagenotfound />} /> {/* Catch-all route for 404 */}

                <Route path="/admin-dashboard" element={ <AdminDashboard /> } />
                <Route path="/admin-courses" element={<Course />}  />
                <Route path="/courselist" element={<CourseList />}  />
               
                <Route path="/admin/course/edit/:id" element={<EditCourse />} />

            </Routes>
        </Router>
    );
};

export default App;
