import Allcourses from '../../Components/Allcourses/Allcourses';
import Banner from '../../Components/Banner/Banner';
import Fcourse from '../../Components/Featuredcourse/Fcourse';
import Footer from '../../Components/Footer/Footer';
import Navbar from '../../Components/Navbar/Navbar';

import './Home.css';

const Home = () => {
  return (
    <div>
      <Navbar/>
     <Banner/>
    <Fcourse/>
     <Allcourses/>
     <Footer/>
    </div>
  );
};



export default Home;