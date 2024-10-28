import PropTypes from 'prop-types';
import './CourseCard.css';

const CourseCard = ({ course }) => {
  return (
    <div className="course-card">
      <img src={course.coverPic} alt={course.title} className="course-cover-pic" />
      <div className="course-content">
        <h2 className="course-title">{course.title}</h2>
        <p className="course-des">{course.description}</p>
        <p className='ps'><strong>Author:</strong> {course.author}</p>
        <p className='ps'><strong>Rating:</strong> {course.rating} star / 5</p>
        <p className='ps'><strong>Total Hours:</strong> {course.totalHours}</p>
        <p className="course-price"><strong>Price:</strong> ${course.price}</p>
        <a href={course.enrollLink} className="course-enroll-button">Enroll Now</a>
      </div>
    </div>
  );
};

CourseCard.propTypes = {
  course: PropTypes.shape({
    coverPic: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
    totalHours: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    enrollLink: PropTypes.string.isRequired,
  }).isRequired,
};

export default CourseCard;