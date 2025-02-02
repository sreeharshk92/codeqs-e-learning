import './Workshop.css'
import React, { useState } from 'react'
import coursebnr from '../../assets/coursebnr.png';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import CountdownTimer from '../../Components/CountdownTimer/CountdownTimer';

const Workshop = () => {
      const [price, setPrice] = useState(50000);
  return (
      <div className='main-course'>
            <Navbar />
            <div className="crs-bnr"><img src={coursebnr} alt="" className="crs-img" /></div>
          
          <section className='workshop-container'>
            {/*_________________________________________________________ Leftside filter section ____________________________________*/}
                <div className="filter-container">
                      <h3 style={{color:'rgb(4, 14, 122)'}}>Filters</h3>
                    {/*_________________________________________________________ Course categories */}
                      <div className="filter-section">
                        <h4 className='hfour'>Course Categories</h4>
                        <ul> {["React", "FullStack", "HTML", "CSS", "Angular", "PHP", "MernStack"].map((category, index) => (
                            <li key={index}> 
                                <label><input type="radio" name="category" />{category}</label>
                            </li>))}
                        </ul>
                      </div>
                    {/*_________________________________________________________ Price categories */}
                      <div className="filter-section">
                        <h4 className='hfour'>Filter by Price</h4>
                        <input type="range" min="0" max="50000" value={price} onChange={(e) => setPrice(e.target.value)} />
                        <p className='pricerange'>${price}</p>
                        <button className="apply-btn">Apply</button>
                      </div>
                    {/*_________________________________________________________ order categories */}
                      <div className="filter-section">
                        <h4 className='hfour'>Order By</h4>
                        <ul> {["Default", "Review Count", "Popularity", "Average Rating", "Newness", "Price: Low to High", "Price: High to Low", "Random Products", "Product Name"].map((order, index) => (
                            <li key={index}>
                              <label>
                                <input type="radio" name="order" />{order}</label>
                            </li>))}
                        </ul>
                      </div>
                    {/*_________________________________________________________ Reviews categories */}
                      <div className="filter-section">
                        <h4 className='hfour'>Filter by Reviews</h4> 
                          {[5, 4, 3, 2, 1].map((stars) => (
                          <label key={stars} className="stars-filter">
                            <input type="radio" name="reviews" />{"★".repeat(stars) + "☆".repeat(5 - stars)}
                          </label>))}
                      </div>
                    {/*_________________________________________________________ button section */}
                      <div className="filter-section">
                        <h4 className='hfour'>Filter by Color</h4>
                        <button className="clear-btn">Clear Filters</button>
                      </div>
                </div>

            {/*_________________________________________________________ Right side course card section ____________________________________*/}
                    <div className='course-card-main'>
                        <div className="course-card">
                            <img src="" alt='course image' className="course-cover-pic" />
                            <div className="course-content">
                                <h2 className="course-title">React</h2>
                                <p className="ps">React description</p>
                                <p className="ps"> Mentorname</p>
                                <p className="ps">rating ⭐ / 5⭐</p>
                                <p className="ps"> 5 total hours</p>
                                <p className="course-price">500</p>
                                <CountdownTimer durationInHours='2hr' />
                                <button  className="course-enroll-button">Enroll Now</button>
                            </div>
                        </div>
        
                        <div className="course-card">
                            <img src="" alt='course image' className="course-cover-pic" />
                            <div className="course-content">
                                <h2 className="course-title">React</h2>
                                <p className="ps">React description</p>
                                <p className="ps"> Mentorname</p>
                                <p className="ps">rating ⭐ / 5⭐</p>
                                <p className="ps"> 5 total hours</p>
                                <p className="course-price">500</p>
                                <CountdownTimer durationInHours='2hr' />
                                <button  className="course-enroll-button">Enroll Now</button>
                            </div>
                        </div>

                        <div className="course-card">
                            <img src="" alt='course image' className="course-cover-pic" />
                            <div className="course-content">
                                <h2 className="course-title">React</h2>
                                <p className="ps">React description</p>
                                <p className="ps"> Mentorname</p>
                                <p className="ps">rating ⭐ / 5⭐</p>
                                <p className="ps"> 5 total hours</p>
                                <p className="course-price">500</p>
                                <CountdownTimer durationInHours='2hr' />
                                <button  className="course-enroll-button">Enroll Now</button>
                            </div>
                        </div>              
                    </div>
          </section> 
              <Footer/>
      </div>
  )
}

export default Workshop

















