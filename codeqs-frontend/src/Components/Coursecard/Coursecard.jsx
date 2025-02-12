import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import CountdownTimer from "../CountdownTimer/CountdownTimer";
import "./Coursecard.css";
import baseUrl from "../../config/baseUrl";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  const handleCourseDetails = () => {
    navigate(`/Coursedetails/${course.id}`);
  };

  // Generate rating stars (★)
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <span className="stars">
        {"★".repeat(fullStars)}
        {halfStar && "☆"}
        {"☆".repeat(emptyStars)}
      </span>
    );
  };

  return (
    <div className="course-card">
      <div className="image-container">
        <img
          src={`${baseUrl}/storage/images/${course.image}`}
          alt={`${course.name} course`}
          className="course-cover-pic"
        />
      </div>

      <div className="course-content">
        <h2 className="course-title">{course.name}</h2>
        <p className="course-description">{course.short_description}</p>
        <p className="course-mentor">
          Instructor: <strong>{course.mentor}</strong>
        </p>

        <p className="course-rating">
          {renderStars(course.rating)} <span className="rating-value">({course.rating.toFixed(1)})</span>
        </p>

        <p className="course-price">${course.price.toFixed(2)}</p>

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
    short_description: PropTypes.string.isRequired,
    mentor: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    duration_in_hours: PropTypes.number.isRequired,
  }).isRequired,
};

export default CourseCard;
