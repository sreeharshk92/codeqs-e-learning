// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CourseList.css';
import Master from './layout/Master';

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/courses');
                if (!response.ok) {
                    throw new Error('Failed to fetch courses');
                }
                const data = await response.json();
                setCourses(data.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            try {
                const response = await fetch(`http://localhost:8000/api/courses/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (!response.ok) {
                    const errorResponse = await response.json();
                    throw new Error(errorResponse.error || 'Failed to delete course');
                }

                setCourses(courses.filter(course => course.id !== id));
            } catch (error) {
                setError(error.message);
            }
        }
    };

    if (loading) return <p>Loading courses...</p>;
    if (error) return <p>{error}</p>;

    return (
        <section className="course-section">
            <div>
                <Master />
                <div className='course-table'>
                    <div className="course-header">
                <h3 className='course-h3'>Courses ({courses.length})</h3>
                <Link to="/admin-courses" className="btn btn-primary">Add Course</Link>
                </div>
                <table className="table table-bordered mt-3">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Duration (Hours)</th>
                            <th>Status</th>
                            <th>Favorite</th>
                            <th>Mentor</th>
                            <th>Rating</th>
                            <th>Total Hours</th>
                            <th>Short Description</th>
                            <th>Zoom Link</th>
                            <th>Certificates</th>
                            <th>Videos</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course, index) => {
                            // Parse videos to ensure it's an array
                            const parsedVideos = Array.isArray(course.videos) ? course.videos : JSON.parse(course.videos || '[]');

                            return (
                                <tr key={course.id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        {course.image ? (
                                            <img 
                                                src={`http://localhost:8000/storage/images/${course.image}`} 
                                                width="100" 
                                                alt={course.name} 
                                                onError={(e) => { e.target.onerror = null; e.target.src="default-image.png"; }}
                                            />
                                        ) : (
                                            <span>No Image</span>
                                        )}
                                    </td>
                                    <td>{course.name}</td>
                                    <td>{course.category ? course.category.name : 'N/A'}</td>
                                    <td>{course.price ? course.price.toFixed(2) : 'N/A'}</td>
                                    <td>{course.duration_in_hours || 'N/A'}</td>
                                    <td>{course.status ? 'Active' : 'Inactive'}</td>
                                    <td>{course.is_favourite ? 'Yes' : 'No'}</td>
                                    <td>{course.mentor || 'N/A'}</td>
                                    <td>{course.rating || 'N/A'}</td>
                                    <td>{course.total_hours || 'N/A'}</td>
                                    <td>{course.short_description || 'N/A'}</td>
                                    <td>{course.zoom_link || 'N/A'}</td>
                                    <td>{course.certificates || 'N/A'}</td>
                                    <td>
                                        {parsedVideos.length > 0 ? (
                                            parsedVideos.map((video, videoIndex) => (
                                                <div key={videoIndex}>
                                                    <video controls width="100" onError={(e) => e.target.style.display = 'none'}>
                                                        <source src={`http://localhost:8000/storage/videos/${video}`} type="video/mp4" />
                                                        <p>Your browser does not support the video tag.</p>
                                                    </video>
                                                </div>
                                            ))
                                        ) : (
                                            <span>No Videos</span>
                                        )}
                                    </td>
                                    <td>
                                        <Link to={`/admin-courses/${course.id}`} className="btn btn-warning btn-sm">Edit</Link>
                                        <button 
                                            className="btn btn-danger btn-sm" 
                                            onClick={() => handleDelete(course.id)}>Delete</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
               </div>
            </div>
        </section>
    );
};

export default CourseList;
