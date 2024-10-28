

import Navbar from '../../Components/Navbar/Navbar';
import './Courses.css';
import coursebnr from '../../assets/coursebnr.png';
import Allcourses from '../../Components/Allcourses/Allcourses';
import Footer from '../../Components/Footer/Footer';

const Courses = () => {
  return (
    <div className='main-course'>
        <>
        <Navbar/>
        </>
        <div className="crs-bnr">
            <img src={coursebnr } alt="" className="crs-img" />
        </div>
        <div className="filters">
        <button className="filter-btn active">All Courses</button>
        <button className="filter-btn">Course Category</button>
        <button className="filter-btn">Price Range</button>
        <button className="filter-btn">Duration</button>
        <button className="filter-btn">Difficulty Level</button>
      </div>
        <div className="crs-card">
            <Allcourses/>
        </div>
       <>
       <Footer/>
       </>
    </div>
  )
}

export default Courses;