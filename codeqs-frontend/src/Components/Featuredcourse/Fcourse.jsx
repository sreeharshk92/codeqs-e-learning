// Fcourse.jsx
import React, { useEffect, useState } from 'react';
import CourseCard from '../Coursecard/Coursecard';
import { useNavigate } from 'react-router-dom';
// import Allcourses from '../Allcourses/Allcourses';
import './Fcourse.css';

const Fcourse = () => {
  const navigate = useNavigate();

  const handlebtn = () => {
    navigate('/courses');
  };


  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/courses');
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        setCourses(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='main-allcourse'>
      <div className="header">
        <h2 className='hdr-h1'>Featured Courses</h2>
        <button onClick={handlebtn} className="all-courses-btn">All Courses</button>
      </div>
      {/* <Allcourses /> */}
      <div className='g-arrow'>
        <div className="course-grid">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Fcourse;
