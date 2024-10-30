import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home'; // Check this path
import Courses from './Pages/Courses/Courses';
import Login from './Pages/Login/Login';
import Coursedetails from './Pages/Coursedetails/Coursedetails';
import Pagenotfound from './Pages/Pagenotfound/Pagenotfound'; // Ensure you have this page


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Courses" element={<Courses />} />
                <Route path="/login" element={<Login />} />
                <Route path="/Coursedetails" element={<Coursedetails />} />
                <Route path="*" element={<Pagenotfound />} /> {/* Catch-all route for 404 */}

            </Routes>
        </Router>
    );
};

export default App;
