import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home'; // Check this path
import Courses from './Pages/Courses/Courses';

const App = () => {
    return (
        <Router>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Courses" element={<Courses/>} />


            </Routes>
        </Router>
    );
};

export default App;