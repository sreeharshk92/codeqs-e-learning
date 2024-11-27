import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './Coursedetails.css';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import UserInfoForm from '../../Components/UserInfoForm/UserInfoForm';
import axios from 'axios';

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
        const response = await fetch(`http://localhost:8000/api/courses/${courseId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch course details');
        }
        const data = await response.json();
        setCourseData(data.course || data.data.course); // Adjust based on API response structure
      } catch (error) {
        setError(error.message);
        setAmount(courseData.price)
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
    setIsFormVisible(false);
    setIsVideoAccessible(true);

    // Save user info to localStorage
    localStorage.setItem('userPaymentInfo', JSON.stringify(formData));
    

    if (videoRef.current) {
      videoRef.current.controls = true;
      videoRef.current.play();
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!courseData || Object.keys(courseData).length === 0) return <p>No course data found</p>;

  const videoURL = `http://localhost:8000/storage/videos/${courseData.videos[0]}`;


  /////// Payment function starts here //////////////
  const handlePayment = async () => {
    try {
      const userPaymentInfo = JSON.parse(localStorage.getItem('userPaymentInfo'));
      if (!userPaymentInfo || !userPaymentInfo.name || !userPaymentInfo.email || !userPaymentInfo.phone) {
        alert("Please fill in your information to proceed with the payment.");
        return;
      }

      
    const formattedPhone = userPaymentInfo.phone.replace(/\D/g, '');
    console.log('Formatted phone:', formattedPhone); // Log the formatted phone number

    const amount = Math.round(courseData.price);

  
      const response = await axios.post("http://127.0.0.1:8000/api/create-order", {
        amount: amount,
        name: userPaymentInfo.name,
        email: userPaymentInfo.email,
        phone: formattedPhone,
      });
  
      const { order_id } = response.data;
      if (!order_id) {
        alert("Order ID not returned from backend.");
        return;
      }
  
      const options = {
        key: "rzp_test_ruOiF1gDsqblik",
        amount: amount * 100,
        currency: "INR",
        name: "CODEQS",
        description: `Payment for ${courseData.name}`,
        order_id: order_id,
        handler: async function (response) {
          try {
            const verificationResponse = await axios.post("http://127.0.0.1:8000/api/verify-payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              amount: amount,
              name: userPaymentInfo.name,
              email: userPaymentInfo.email,
              phone: formattedPhone,
              course_name: courseData.name,
            });
            if (verificationResponse.data.status === 'Payment verified successfully') {
              alert("Payment successful!");
            } else {
              alert("Payment verification failed.");
            }
          } catch (error) {
            console.error("Verification error:", error);
            alert("Error during payment verification. See console for details.");
          }
        },
        prefill: {
          name: userPaymentInfo.name,
          email: userPaymentInfo.email,
          phone: formattedPhone,
        },
        notes: {
          address: "Razorpay Corporate Office"
        },
        theme: {
          color: "#F37254"
        }
      };
  
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Order creation error:", error);
      alert("Error creating order. See console for details.");
    }
  };
  
  /////// Payment function ends here //////////////

  return (
    <>
      <Navbar />
      <div className="course-details-page">
        <div className="main-content">
          <div className="video-section">
            <video
              ref={videoRef}
              src={videoURL}
              controls={isVideoAccessible}
              autoPlay
            >
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="course-details-content">
            <h2  className="course-details-content-h2">{courseData.name}</h2>
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
          
          <button onClick={handlePayment} className="purchase-button">Purchase Course</button>
        </div>
      </div>

      {isFormVisible && <UserInfoForm onSubmit={handleFormSubmit} />}
      <Footer />
    </>
  );
};

export default Coursedetails;
