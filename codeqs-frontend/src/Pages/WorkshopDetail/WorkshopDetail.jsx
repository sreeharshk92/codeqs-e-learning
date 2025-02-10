import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

const WorkshopDetail = () => {
  const { id } = useParams(); // Get workshop ID from URL
  const location = useLocation(); 
  const [workshop, setWorkshop] = useState(location.state?.workshop || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!workshop) {
      // Fetch data only if it's not passed via navigation state
      const fetchWorkshop = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/workshop/product/${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch workshop data');
          }
          const data = await response.json();
          setWorkshop(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchWorkshop();
    } else {
      setLoading(false);
    }
  }, [id, workshop]);

  if (loading) return <div className="loading">Loading workshop details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!workshop) return <div className="error">Workshop not found.</div>;

  return (
    <div>
      <Navbar />
      <div className="workshop-detail-container">
        <h1>{workshop.title}</h1>
        <img src={`http://127.0.0.1:8000/storage/images/${workshop.images}`} alt={workshop.title} />
        <p>{workshop.description}</p>
        <p>Price: ${workshop.price}</p>
        <p>Seats Available: {workshop.seat_available}</p>
      </div>
      <Footer />
    </div>
  );
};

export default WorkshopDetail;
