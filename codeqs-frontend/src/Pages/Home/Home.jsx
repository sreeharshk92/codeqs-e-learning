import Allcourses from '../../Components/Allcourses/Allcourses';
import Banner from '../../Components/Banner/Banner';
import Footer from '../../Components/Footer/Footer';
import Navbar from '../../Components/Navbar/Navbar';

import './Home.css';

const Home = () => {
  return (
    <div>
      <Navbar/>
     <Banner/>
     <Allcourses/>
     <Footer/>
    </div>
  );
};



export default Home;