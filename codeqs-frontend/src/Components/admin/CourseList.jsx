import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CourseList.css'; // Ensure this CSS file exists for styling

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
                        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming you're using tokens
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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <section className="course-section">
            <div className="container">
                <h1>Courses ({courses.length})</h1>
                <Link to="/admin-courses" className="btn btn-primary">Add Course</Link>
                <table className="table table-bordered mt-3">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Favorite</th>
                            <th>Mentor</th>
                            <th>Rating</th>
                            <th>Total Hours</th>
                            <th>Short Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course, index) => (
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
                                <td>{course.status ? 'Active' : 'Inactive'}</td>
                                <td>{course.is_favourite ? 'Yes' : 'No'}</td>
                                <td>{course.mentor || 'N/A'}</td>
                                <td>{course.rating ? course.rating.toFixed(1) : 'N/A'}</td>
                                <td>{course.total_hours || 'N/A'}</td>
                                <td>{course.short_description || 'N/A'}</td>
                                <td>
                                    <Link to={`/admin/course/edit/${course.id}`} className="btn btn-primary btn-sm">Edit</Link>
                                    <button onClick={() => handleDelete(course.id)} className="btn btn-danger btn-sm">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default CourseList;
