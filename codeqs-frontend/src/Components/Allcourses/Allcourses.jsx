import { useNavigate } from 'react-router-dom';
import CourseCard from '../Coursecard/Coursecard';
import './Allcourses.css'

const courses = [
  // Array of courses with dummy data
  {
    coverPic: 'https://via.placeholder.com/300x150',
    title: 'React Basics',
    description: 'Learn the basics of React.js',
    author: 'John Doe',
    rating: '4',
    totalHours: '12 hours',
    price: 49.99,
    enrollLink: '#',
  },{
    coverPic: 'https://via.placeholder.com/300x150',
    title: 'React Basics',
    description: 'Learn the basics of React.js',
    author: 'John Doe',
    rating: '4',
    totalHours: '12 hours',
    price: 49.99,
    enrollLink: '#',
  },{
    coverPic: 'https://via.placeholder.com/300x150',
    title: 'React Basics',
    description: 'Learn the basics of React.js',
    author: 'John Doe',
    rating: '4',
    totalHours: '12 hours',
    price: 49.99,
    enrollLink: '#',
  },{
    coverPic: 'https://via.placeholder.com/300x150',
    title: 'React Basics',
    description: 'Learn the basics of React.js',
    author: 'John Doe',
    rating: '4',
    totalHours: '12 hours',
    price: 49.99,
    enrollLink: '#',
  },{
    coverPic: 'https://via.placeholder.com/300x150',
    title: 'React Basics',
    description: 'Learn the basics of React.js',
    author: 'John Doe',
    rating: '4',
    totalHours: '12 hours',
    price: 49.99,
    enrollLink: '#',
  },{
    coverPic: 'https://via.placeholder.com/300x150',
    title: 'React Basics',
    description: 'Learn the basics of React.js',
    author: 'John Doe',
    rating: '4',
    totalHours: '12 hours',
    price: 49.99,
    enrollLink: '#',
  },{
    coverPic: 'https://via.placeholder.com/300x150',
    title: 'React Basics',
    description: 'Learn the basics of React.js',
    author: 'John Doe',
    rating: '4',
    totalHours: '12 hours',
    price: 49.99,
    enrollLink: '#',
  },{
    coverPic: 'https://via.placeholder.com/300x150',
    title: 'React Basics',
    description: 'Learn the basics of React.js',
    author: 'John Doe',
    rating: '4',
    totalHours: '12 hours',
    price: 49.99,
    enrollLink: '#',
  },{
    coverPic: 'https://via.placeholder.com/300x150',
    title: 'React Basics',
    description: 'Learn the basics of React.js',
    author: 'John Doe',
    rating: '4',
    totalHours: '12 hours',
    price: 49.99,
    enrollLink: '#',
  },{
    coverPic: 'https://via.placeholder.com/300x150',
    title: 'React Basics',
    description: 'Learn the basics of React.js',
    author: 'John Doe',
    rating: '4',
    totalHours: '12 hours',
    price: 49.99,
    enrollLink: '#',
  },
  // Add more courses as needed
];

const Allcourses = () => {
  const navigate = useNavigate();

  const handlebtn = () => {
    navigate('/courses');
  };

  return (
    <div className='main-allcourse'>
      <div className="header">
        <h1 className='hdr-h1'>Featured Courses</h1>
        <button onClick={handlebtn} className="all-courses-btn">All Courses</button>
      </div>
      <p className='hdr-p'>Explore our featured courses designed to help you gain in-demand skills and advance your career. Learn at <br /> your own pace with expert instructors, practical projects, and a supportive learning community.</p>
      <div className='g-arrow'>
      <div className="course-grid">
        {courses.map((course, index) => (
          <CourseCard key={index} course={course} />

        ))}
      </div>
      
      </div>
    </div>
    
  );
};

export default Allcourses;