import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import CountdownTimer from '../CountdownTimer/CountdownTimer';
import './CourseCard.css';

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  
  const handleCourseDetails = () => {    
    navigate(`/Coursedetails/${course.id}`);
  };

  return (
    <div className="course-card">
      <img src={`http://localhost:8000/storage/images/${course.image}`} alt={course.name} className="course-cover-pic" />
      <div className="course-content">
        <h2 className="course-title">{course.name}</h2>
        <p className="ps"><strong>Author:</strong> {course.mentor}</p>
        <p className="ps"><strong>Description:</strong> {course.short_description}</p>
        <p className="ps"><strong>Rating:</strong> {course.rating} ⭐ / 5⭐</p>
        <p className="ps"><strong>Total Hours:</strong> {course.total_hours}</p>
        <p className="course-price"><strong>Price:</strong> ${course.price.toFixed(2)}</p>
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
    id: PropTypes.number.isRequired, // Ensure 'id' is included
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    mentor: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    total_hours: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    duration_in_hours: PropTypes.number.isRequired, // Ensure this prop is required
  }).isRequired,
};

export default CourseCard;
