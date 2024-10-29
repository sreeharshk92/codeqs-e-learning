import React, { useState, useEffect, useRef } from 'react';
import './Coursedetails.css';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import UserInfoForm from '../../Components/UserInfoForm/UserInfoForm';

const Coursedetails = () => {
  const videoRef = useRef(null); // Reference to the video element
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isVideoAccessible, setIsVideoAccessible] = useState(false);

  const courseData = {
    title: 'JAVA Programming for Complete Beginners | Episode 2 | Belly Elrish',
    price: '₹2,999',
    instructor: 'Wade Warren',
    ratings: '⭐⭐⭐⭐⭐',
    duration: '10 Days',
    lessons: 30,
    quizzes: 5,
    certificate: 'Available',
    language: 'English',
    access: 'Lifetime',
    courseDetails: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    certification: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    whoThisCourseIsFor: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    whatYouWillLearn: [
      'Learn basics of JAVA',
      'Understand object-oriented programming',
      'Develop simple applications in JAVA',
      'Prepare for advanced JAVA topics'
    ],
    videoUrl: "https://www.youtube.com/embed/MYy7oGQiSqI?si=TylIoksZhyS5Dg3V" // Replace with actual video URL from backend
  };

  useEffect(() => {
    // Start video playback and set timer for the form popup
    if (videoRef.current) {
      videoRef.current.play();
    }

    const timer = setTimeout(() => {
      setIsFormVisible(true); // Show form after 5 seconds
      if (videoRef.current) {
        videoRef.current.pause(); // Pause video when the form is visible
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleFormSubmit = (formData) => {
    // Handle form submission (e.g., send data to backend, etc.)
    console.log('User Information Submitted:', formData);
    setIsFormVisible(false); // Hide the form
    setIsVideoAccessible(true); // Give full video access to the user

    // Allow video controls and resume playback after successful form submission
    if (videoRef.current) {
      videoRef.current.controls = true;
      videoRef.current.play(); // Resume video playback
    }
  };

  return (
    <>
      <Navbar />
      <div className="course-details-page">
        <div className="main-content">
          {/* Video Section */}
          <div className="video-section">
            <video
              ref={videoRef}
              src={courseData.videoUrl}
              controls={isVideoAccessible} // Controls only accessible after form submission
              autoPlay
            >
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Course Content */}
          <div className="course-content">
            <div className="section">
            <h2>{courseData.title}</h2>

              <h3>Course Details</h3>
              <p>{courseData.courseDetails}</p>
            </div>
            <div className="section">
              <h3>Certification</h3>
              <p>{courseData.certification}</p>
            </div>
            <div className="section">
              <h3>Who this course is for</h3>
              <p>{courseData.whoThisCourseIsFor}</p>
            </div>
            <div className="section">
              <h3>What you'll learn in this course</h3>
              <ul>
                {courseData.whatYouWillLearn.map((item, index) => (
                  <li key={index}>✔️ {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Purchase Section */}
        <div className="purchase-section">
          <h3>Price: {courseData.price}</h3>
          <p><strong>Instructor:</strong> {courseData.instructor}</p>
          <p><strong>Ratings:</strong> {courseData.ratings}</p>
          <p><strong>Duration:</strong> {courseData.duration}</p>
          <p><strong>Quizzes:</strong> {courseData.quizzes}</p>
          <p><strong>Certificate:</strong> {courseData.certificate}</p>
          <p><strong>Language:</strong> {courseData.language}</p>
          <p><strong>Access:</strong> {courseData.access}</p>
          <button className="purchase-button">Purchase Course</button>
        </div>
      </div>

      {isFormVisible && <UserInfoForm onSubmit={handleFormSubmit} />}

      <Footer />
    </>
  );
};

export default Coursedetails;
