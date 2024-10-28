import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home'; // Check this path
import Courses from './Pages/Courses/Courses';
import Login from './Pages/Login/Login';

const App = () => {
    return (
        <Router>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Courses" element={<Courses/>} />
            <Route path="/login" element={<Login/>} />


            </Routes>
        </Router>
    );
};

export default App;