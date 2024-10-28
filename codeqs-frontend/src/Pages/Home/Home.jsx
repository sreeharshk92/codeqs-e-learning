import Allcourses from '../../Components/Allcourses/Allcourses';
import Banner from '../../Components/Banner/Banner';
import Navbar from '../../Components/Navbar/Navbar';

import './Home.css';

const Home = () => {
  return (
    <div>
      <Navbar/>
     <Banner/>
     <Allcourses/>
    </div>
  );
};



export default Home;