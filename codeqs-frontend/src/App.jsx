import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home'; // Check this path
import Courses from './Pages/Courses/Courses';
import Coursedetails from './Pages/Coursedetails/Coursedetails';

const App = () => {
    return (
        <Router>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Courses" element={<Courses/>} />
            <Route path="/Coursedetails" element={<Coursedetails/>} />


            </Routes>
        </Router>
    );
};

export default App;