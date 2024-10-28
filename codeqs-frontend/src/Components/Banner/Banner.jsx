import './Banner.css'
import {  useNavigate } from 'react-router-dom'; 

import banner from '../../assets/banner.png';

const Banner = () => {
  const navigate = useNavigate(); 

  const handlebnr = () => {
    navigate('/course'); 
  }
  return (
    <div className='banner'>
      <div className="bnr-left">
        <button onClick={handlebnr } className='btn1'>Never Stop Learning</button>
        <h1 className='b-h1'>Unlock Your <br />Potential with <br />Expert-Led Courses</h1>
        <p className='bnr-p' >Learn from the Best Tutors, Anytime, Anywhere . Join thousands of leaners and <br /> master new skills from the comfort of your home. Gain in-demand knowledge <br />through flexible, expert-led courses designed to fit your schedule.</p>
        <button onClick={handlebnr} className='btn2'>Learn More</button>
      </div>
      <div className="bnr-right">
        <img src={banner} className='bnr-img' alt="" />
      </div>
    </div>
  )
}

export default Banner