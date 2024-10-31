import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './Coursedetails.css';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import UserInfoForm from '../../Components/UserInfoForm/UserInfoForm';

const Coursedetails = () => {
  const { courseId } = useParams();
  const videoRef = useRef(null);
  const [courseData, setCourseData] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isVideoAccessible, setIsVideoAccessible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        console.log(`Fetching course with ID: ${courseId}`);
        const response = await fetch(`http://localhost:8000/api/courses/${courseId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch course details');
        }
        const data = await response.json();
        console.log('Fetched course data:', data);
        
        // Update this line to set the correct part of the data response
        setCourseData(data.course || data.data.course); // Adjust based on API response structure
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

    

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }

    const timer = setTimeout(() => {
      setIsFormVisible(true);
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [courseData]);

  const handleFormSubmit = (formData) => {
    console.log('User Information Submitted:', formData);
    setIsFormVisible(false);
    setIsVideoAccessible(true);

    if (videoRef.current) {
      videoRef.current.controls = true;
      videoRef.current.play();
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!courseData || Object.keys(courseData).length === 0) return <p>No course data found</p>;

  return (
    <>
      <Navbar />
      <div className="course-details-page">
        <div className="main-content">
          <div className="video-section">
            <video
              ref={videoRef}
              src={courseData.videos[0]} // Assuming videos is an array
              controls={isVideoAccessible}
              autoPlay
            >
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="course-content">
            <h2>{courseData.name}</h2>
            <p><strong>Description:</strong> {courseData.description}</p>
            <p><strong>Mentor:</strong> {courseData.mentor || 'N/A'}</p>
            <p><strong>Price:</strong> ₹{courseData.price.toFixed(2)}</p>
            <p><strong>Rating:</strong> {courseData.rating ? courseData.rating.toFixed(1) : 'N/A'}</p>
            <p><strong>Total Hours:</strong> {courseData.total_hours || 'N/A'}</p>
            <p><strong>Certificate:</strong> {courseData.certificates || 'N/A'}</p>
            <h3>Learning Outcomes</h3>
            <ul>
              {courseData.learning_outcomes && courseData.learning_outcomes.map((outcome, index) => (
                <li key={index}>{outcome}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="purchase-section">
          <h3>Price: ₹{courseData.price.toFixed(2)}</h3>
          <button className="purchase-button">Purchase Course</button>
        </div>
      </div>

      {isFormVisible && <UserInfoForm onSubmit={handleFormSubmit} />}
      <Footer />
    </>
  );
};

export default Coursedetails;
