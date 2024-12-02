// Courses.jsx
import Navbar from '../../Components/Navbar/Navbar';
import './Courses.css';
import coursebnr from '../../assets/coursebnr.png';
import Allcourses from '../../Components/Allcourses/Allcourses';
import Footer from '../../Components/Footer/Footer';
import { useState } from 'react';

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  return (
    <div className='main-course'>
      <Navbar onSearch={handleSearch} />
      <div className="crs-bnr">
        <img src={coursebnr} alt="" className="crs-img" />
      </div>
      <div className="filters">
        <button className="filter-btn active">All Courses</button>
        <button className="filter-btn active">Course Category</button>
        <button className="filter-btn active">Price Range</button>
        <button className="filter-btn active">Duration</button>
        <button className="filter-btn active">Difficult Level</button>

        {/* Other filter buttons */}
      </div>
      <div className="crs-card">
        <Allcourses searchTerm={searchTerm} />
      </div>
      <Footer />
    </div>
  );
};

export default Courses;
