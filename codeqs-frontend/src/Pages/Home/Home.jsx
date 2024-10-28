import Fcourses from '../../Components/Fcourses/Fcourses';
import Banner from '../../Components/Banner/Banner';
import Navbar from '../../Components/Navbar/Navbar';

import './Home.css';

const Home = () => {
  return (
    <div>
      <Navbar/>
     <Banner/>
     <Fcourses/>
    </div>
  );
};



export default Home;