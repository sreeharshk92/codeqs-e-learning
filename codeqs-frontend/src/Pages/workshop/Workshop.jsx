import './Workshop.css';
import React, { useState, useEffect } from 'react';
import coursebnr from '../../assets/coursebnr.png';
import qrcodeImage from '../../assets/qrcode.png'; // Add your QR code image
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import CountdownTimer from '../../Components/CountdownTimer/CountdownTimer';
import { Lock } from 'lucide-react';

const Workshop = () => {
  const [price, setPrice] = useState(50000);
  const [workshops, setWorkshops] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOrder, setOrderBy] = useState('default');
  const [showQR, setShowQR] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);

  // QR Code Modal Component
  const QRModal = ({ workshop, onClose }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-xl">
        <h3 className="mb-4 text-xl font-bold">Enroll in {workshop.title}</h3>
        <div className="flex justify-center mb-4">
          <img 
            src={qrcodeImage} 
            alt="Payment QR Code"
            className="w-64 h-64" 
          />
        </div>
        <p className="mb-4 text-center">Scan to complete payment</p>
        <p className="mb-4 text-center">Amount: ${Number(workshop.price - workshop.discount).toFixed(2)}</p>
        <button 
          onClick={onClose}
          className="w-full py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );

  // Fetch categories and workshops
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryResponse, workshopResponse] = await Promise.all([
          fetch('http://127.0.0.1:8000/api/workshopcategory/categorylist'),
          fetch('http://127.0.0.1:8000/api/workshop/productlist')
        ]);

        if (!categoryResponse.ok || !workshopResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const categoryData = await categoryResponse.json();
        const workshopData = await workshopResponse.json();
        
        setCategories(categoryData.data);
        setWorkshops(workshopData.data);
      } catch (err) {
        setError('Failed to load workshops. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter and sort workshops
  const getFilteredWorkshops = () => {
    let filtered = [...workshops];

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(workshop => 
        workshop.category_id === parseInt(selectedCategory)
      );
    }

    // Filter by price
    filtered = filtered.filter(workshop => 
      parseFloat(workshop.price) <= price
    );

    // Sort workshops
    switch (sortOrder) {
      case 'price_low_high':
        filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case 'price_high_low':
        filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      default:
        break;
    }

    return filtered;
  };

  const handleEnrollClick = (workshop) => {
    if (workshop.subscribe === 'paid') {
      setSelectedWorkshop(workshop);
      setShowQR(true);
    } else {
      // Handle free workshop enrollment
      window.location.href = `/workshop-detail/${workshop.id}`;
    }
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setOrderBy('default');
    setPrice(50000);
  };

  if (loading) return <div className="loading">Loading workshops...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="main-course">
      <Navbar />
      <div className="crs-bnr">
        <img src={coursebnr} alt="Course Banner" className="crs-img" />
      </div>
      
      <section className="workshop-container">
        {/* Leftside filter section */}
        <div className="filter-container">
          <h3 style={{color: 'rgb(4, 14, 122)'}}>Filters</h3>
          
          {/* Course categories */}
          <div className="filter-section">
            <h4 className="hfour">Course Categories</h4>
            <ul>
              {categories.map((category) => (
                <li key={category.id}>
                  <label>
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === category.id.toString()}
                      onChange={() => handleCategoryChange(category.id.toString())}
                    />
                    {category.name}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Price filter */}
          <div className="filter-section">
            <h4 className="hfour">Filter by Price</h4>
            <input
              type="range"
              min="0"
              max="50000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <p className="pricerange">${price}</p>
          </div>

          {/* Order by */}
          <div className="filter-section">
            <h4 className="hfour">Order By</h4>
            <ul>
              <li>
                <label>
                  <input
                    type="radio"
                    name="order"
                    checked={sortOrder === 'default'}
                    onChange={() => setOrderBy('default')}
                  />
                  Default
                </label>
              </li>
              <li>
                <label>
                  <input
                    type="radio"
                    name="order"
                    checked={sortOrder === 'price_low_high'}
                    onChange={() => setOrderBy('price_low_high')}
                  />
                  Price: Low to High
                </label>
              </li>
              <li>
                <label>
                  <input
                    type="radio"
                    name="order"
                    checked={sortOrder === 'price_high_low'}
                    onChange={() => setOrderBy('price_high_low')}
                  />
                  Price: High to Low
                </label>
              </li>
            </ul>
          </div>

          {/* Clear filters */}
          <div className="filter-section">
            <button className="clear-btn" onClick={clearFilters}>
              Clear Filters
            </button>
          </div>
        </div>

        {/* Right side course card section */}
        <div className="course-card-main">
          {getFilteredWorkshops().map((workshop) => (
            <div className="course-card" key={workshop.id}>
              <div className="relative">
                <img
                  src={`http://127.0.0.1:8000/storage/images/${workshop.images}`}
                  alt={workshop.title}
                  className="course-cover-pic"
                />
                {workshop.subscribe === 'paid' && (
                  <div className="absolute p-2 text-white bg-blue-600 rounded-full top-2 right-2">
                    <Lock size={20} />
                  </div>
                )}
              </div>
              <div className="course-content">
                <h2 className="course-title">{workshop.title}</h2>
                <p className="ps">{workshop.description}</p>
                <p className="ps">Seats Available: {workshop.seat_available}</p>
                <p className="ps">
                  {workshop.subscribe === 'free' ? (
                    <span className="font-semibold text-green-600">Free Workshop</span>
                  ) : (
                    <span>
                      {workshop.discount > 0 ? (
                        <span>
                          <strike>${Number(workshop.price).toFixed(2)}</strike>
                          {" "}
                          ${Number(workshop.price - workshop.discount).toFixed(2)}
                        </span>
                      ) : (
                        <span>${Number(workshop.price).toFixed(2)}</span>
                      )}
                    </span>
                  )}
                </p>
                <CountdownTimer durationInHours="2hr" />
                <button 
                  className="course-enroll-button"
                  onClick={() => handleEnrollClick(workshop)}
                >
                  {workshop.subscribe === 'free' ? 'Start Learning' : 'Enroll Now'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {showQR && selectedWorkshop && (
        <QRModal 
          workshop={selectedWorkshop} 
          onClose={() => {
            setShowQR(false);
            setSelectedWorkshop(null);
          }}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default Workshop;