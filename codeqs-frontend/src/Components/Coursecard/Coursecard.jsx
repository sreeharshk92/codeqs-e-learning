import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import CountdownTimer from '../CountdownTimer/CountdownTimer';
import './Coursecard.css';
import baseUrl from '../../config/baseUrl'

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  
  const handleCourseDetails = () => {    
    navigate(`/Coursedetails/${course.id}`);
  };

  return (
    <div className="course-card">

      <img src={`${baseUrl}/storage/images/${course.image}`} alt={course.name} className="course-cover-pic" />

      <div className="course-content">
        <h2 className="course-title">{course.name}</h2>
        <p className="ps">{course.short_description}</p>
        <p className="ps"> {course.mentor}</p>
        <p className="ps">{course.rating} ⭐ / 5⭐</p>
        <p className="ps"> {course.total_hours} total hours</p>
        <p className="course-price">${course.price.toFixed(2)}</p>
        {/* Pass durationInHours to CountdownTimer */}
        <CountdownTimer durationInHours={course.duration_in_hours} />
        <button onClick={handleCourseDetails} className="course-enroll-button">
          Enroll Now
        </button>
      </div>
    </div>
  );
};

CourseCard.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.number.isRequired, 
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    mentor: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    total_hours: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    duration_in_hours: PropTypes.number.isRequired, 
  }).isRequired,
};

export default CourseCard;
