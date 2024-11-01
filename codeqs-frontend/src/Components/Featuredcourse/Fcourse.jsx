// Fcourse.jsx
import { useNavigate } from 'react-router-dom';
import Allcourses from '../Allcourses/Allcourses';
import './Fcourse.css';

const Fcourse = () => {
  const navigate = useNavigate();

  const handlebtn = () => {
    navigate('/courses');
  };

  return (
    <div className='main-allcourse'>
      <div className="header">
        <h1 className='hdr-h1'>Featured Courses</h1>
        <button onClick={handlebtn} className="all-courses-btn">All Courses</button>
      </div>
      <Allcourses />
    </div>
  );
};

export default Fcourse;
