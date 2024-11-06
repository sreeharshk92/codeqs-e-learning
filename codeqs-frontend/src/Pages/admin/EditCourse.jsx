import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './EditCourse.css';

const EditCourse = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category_id: '',
        status: true,
        is_favourite: false,
        image: null,
        description: '',
        mentor: '',
        certificates: '',
        rating: '',
        total_hours: '',
        short_description: '',
        zoom_link: '',
        learning_outcomes: [''],
        videos: ['']
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/categories');
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                setError(error.message);
            }
        };

        const fetchCourse = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/courses/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch course');
                }
                const data = await response.json();
                setCourse(data.course);
                setFormData({
                    ...data.course,
                    image: null,
                    learning_outcomes: data.course.learning_outcomes || [''],
                    videos: data.course.videos || ['']
                });
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
        fetchCourse();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleImageChange = (e) => {
        setFormData({
            ...formData,
            image: e.target.files[0],
        });
    };

    const handleLearningOutcomeChange = (index, value) => {
        const updatedOutcomes = [...formData.learning_outcomes];
        updatedOutcomes[index] = value;
        setFormData({ ...formData, learning_outcomes: updatedOutcomes });
    };

    const handleVideoChange = (index, value) => {
        const updatedVideos = [...formData.videos];
        updatedVideos[index] = value;
        setFormData({ ...formData, videos: updatedVideos });
    };

    const addLearningOutcome = () => setFormData({ ...formData, learning_outcomes: [...formData.learning_outcomes, ''] });
    const addVideo = () => setFormData({ ...formData, videos: [...formData.videos, ''] });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedCourse = new FormData();

        Object.keys(formData).forEach(key => {
            if (Array.isArray(formData[key])) {
                formData[key].forEach((item, index) => updatedCourse.append(`${key}[${index}]`, item));
            } else {
                updatedCourse.append(key, formData[key]);
            }
        });

        try {
            const response = await fetch(`http://localhost:8000/api/courses/${id}`, {
                method: 'PUT',
                body: updatedCourse,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.error || 'Failed to update course');
            }

            navigate('/admin-courses');
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="edit-course">
            <h1>Edit Course</h1>
            {course && (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Price:</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Category:</label>
                        <select
                            name="category_id"
                            value={formData.category_id}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Status:</label>
                        <input
                            type="checkbox"
                            name="status"
                            checked={formData.status}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Favorite:</label>
                        <input
                            type="checkbox"
                            name="is_favourite"
                            checked={formData.is_favourite}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Image:</label>
                        {course.image && <img src={`http://localhost:8000/storage/images/${course.image}`} alt={course.name} width="100" />}
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                    </div>
                    <div>
                        <label>Description:</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Mentor:</label>
                        <input
                            type="text"
                            name="mentor"
                            value={formData.mentor}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Certificates:</label>
                        <input
                            type="text"
                            name="certificates"
                            value={formData.certificates}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Rating:</label>
                        <input
                            type="number"
                            name="rating"
                            value={formData.rating}
                            min="0"
                            max="5"
                            step="0.1"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Total Hours:</label>
                        <input
                            type="number"
                            name="total_hours"
                            value={formData.total_hours}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Short Description:</label>
                        <textarea
                            name="short_description"
                            value={formData.short_description}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Zoom Link:</label>
                        <input
                            type="url"
                            name="zoom_link"
                            value={formData.zoom_link}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Dynamic Learning Outcomes */}
                    <div>
                        <label>Learning Outcomes</label>
                        {formData.learning_outcomes.map((outcome, index) => (
                            <input
                                key={index}
                                type="text"
                                value={outcome}
                                onChange={(e) => handleLearningOutcomeChange(index, e.target.value)}
                                placeholder={`Learning Outcome ${index + 1}`}
                                required
                            />
                        ))}
                        <button type="button" onClick={addLearningOutcome}>Add Learning Outcome</button>
                    </div>

                    {/* Dynamic Videos */}
                    <div>
                        <label>Videos</label>
                        {formData.videos.map((video, index) => (
                            <input
                                key={index}
                                type="text"
                                value={video}
                                onChange={(e) => handleVideoChange(index, e.target.value)}
                                placeholder={`Video URL ${index + 1}`}
                                required
                            />
                        ))}
                        <button type="button" onClick={addVideo}>Add Video</button>
                    </div>

                    <button type="submit">Save</button>
                    <Link to="/admin-courses">Cancel</Link>
                </form>
            )}
        </div>
    );
};

export default EditCourse;
