import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './EditCourse.css';

const EditCourse = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [submitStatus, setSubmitStatus] = useState({ loading: false, error: null });
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
        videos: [null],
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoriesResponse, courseResponse] = await Promise.all([

                    fetch(`${baseUrl}/api/categories`),
                    fetch(`${baseUrl}/api/courses/${id}`)

                ]);

                if (!categoriesResponse.ok) throw new Error('Failed to fetch categories');
                if (!courseResponse.ok) throw new Error('Failed to fetch course');

                const categoriesData = await categoriesResponse.json();
                const courseData = await courseResponse.json();

                setCategories(categoriesData);
                setCourse(courseData.course);
                setFormData({
                    ...courseData.course,
                    image: null,
                    learning_outcomes: courseData.course.learning_outcomes || [''],
                    videos: courseData.course.videos || [null],
                });
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && !file.type.startsWith('image/')) {
            setError('Please select a valid image file');
            return;
        }
        setFormData(prev => ({
            ...prev,
            image: file,
        }));
    };

    const handleVideoChange = (index, file) => {
        if (file && !file.type.startsWith('video/')) {
            setError('Please select a valid video file');
            return;
        }
        setFormData(prev => {
            const updatedVideos = [...prev.videos];
            updatedVideos[index] = file;
            return { ...prev, videos: updatedVideos };
        });
    };

    const handleLearningOutcomeChange = (index, value) => {
        setFormData(prev => {
            const updatedOutcomes = [...prev.learning_outcomes];
            updatedOutcomes[index] = value;
            return { ...prev, learning_outcomes: updatedOutcomes };
        });
    };

    const addLearningOutcome = () => {
        setFormData(prev => ({
            ...prev,
            learning_outcomes: [...prev.learning_outcomes, '']
        }));
    };

    const removeLearningOutcome = (index) => {
        setFormData(prev => ({
            ...prev,
            learning_outcomes: prev.learning_outcomes.filter((_, i) => i !== index)
        }));
    };

    const addVideo = () => {
        setFormData(prev => ({
            ...prev,
            videos: [...prev.videos, null]
        }));
    };

    const removeVideo = (index) => {
        setFormData(prev => ({
            ...prev,
            videos: prev.videos.filter((_, i) => i !== index)
        }));
    };

    const validateForm = () => {
        const errors = [];
        if (!formData.name) errors.push('Name is required');
        if (!formData.price) errors.push('Price is required');
        if (!formData.category_id) errors.push('Category is required');
        if (formData.learning_outcomes.some(outcome => !outcome.trim())) {
            errors.push('All learning outcomes must be filled');
        }
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const validationErrors = validateForm();
        if (validationErrors.length > 0) {
            setError(validationErrors.join(', '));
            return;
        }

        setSubmitStatus({ loading: true, error: null });
        
        try {
            const formDataToSend = new FormData();

            // Append basic fields
            Object.entries(formData).forEach(([key, value]) => {
                if (key !== 'learning_outcomes' && key !== 'videos' && key !== 'image' && value !== null) {
                    formDataToSend.append(key, value);
                }
            });

            // Append image if changed
            if (formData.image) {
                formDataToSend.append('image', formData.image);
            }

            // Append learning outcomes
            formData.learning_outcomes.forEach((outcome, index) => {
                if (outcome.trim()) {
                    formDataToSend.append(`learning_outcomes[${index}]`, outcome);
                }
            });

            // Append videos
            formData.videos.forEach((video, index) => {
                if (video instanceof File) {
                    formDataToSend.append(`videos[${index}]`, video);
                }
            });


            const response = await fetch(`${baseUrl}/api/courses/${id}`, {

                method: 'POST',
                body: formDataToSend,
                headers: {
                    'X-HTTP-Method-Override': 'PUT',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update course');
            }

            navigate('/admin-courses');
        } catch (error) {
            setSubmitStatus({ loading: false, error: error.message });
            setError(error.message);
        }
    };

    if (loading) return <div className="spinner">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="edit-course">
            <h1>Edit Course</h1>
            {submitStatus.error && (
                <div className="error-message">
                    {submitStatus.error}
                </div>
            )}
            {course && (
                <form onSubmit={handleSubmit} className="course-form">
                    <div className="form-group">
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name || ''}
                            onChange={handleChange}
                            required
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label>Price:</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price || ''}
                            onChange={handleChange}
                            required
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label>Category:</label>
                        <select
                            name="category_id"
                            value={formData.category_id || ''}
                            onChange={handleChange}
                            required
                            className="form-control"
                        >
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                name="status"
                                checked={formData.status}
                                onChange={handleChange}
                            />
                            Status
                        </label>
                    </div>

                    <div className="form-group checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                name="is_favourite"
                                checked={formData.is_favourite}
                                onChange={handleChange}
                            />
                            Favorite
                        </label>
                    </div>

                    <div className="form-group">
                        <label>Image:</label>
                        {course.image && (
                            <div className="current-image">
                                <img

                                    src={`${baseUrl}/storage/images/${course.image}`}

                                    alt={course.name}
                                    className="preview-image"
                                />
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label>Description:</label>
                        <textarea
                            name="description"
                            value={formData.description || ''}
                            onChange={handleChange}
                            className="form-control"
                            rows="4"
                        />
                    </div>

                    <div className="form-group">
                        <label>Mentor:</label>
                        <input
                            type="text"
                            name="mentor"
                            value={formData.mentor || ''}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label>Certificates:</label>
                        <input
                            type="text"
                            name="certificates"
                            value={formData.certificates || ''}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label>Rating:</label>
                        <input
                            type="number"
                            name="rating"
                            value={formData.rating || ''}
                            min="0"
                            max="5"
                            step="0.1"
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label>Total Hours:</label>
                        <input
                            type="number"
                            name="total_hours"
                            value={formData.total_hours || ''}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label>Short Description:</label>
                        <textarea
                            name="short_description"
                            value={formData.short_description || ''}
                            onChange={handleChange}
                            className="form-control"
                            rows="2"
                        />
                    </div>

                    <div className="form-group">
                        <label>Zoom Link:</label>
                        <input
                            type="url"
                            name="zoom_link"
                            value={formData.zoom_link || ''}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label>Learning Outcomes:</label>
                        <div className="learning-outcomes">
                            {formData.learning_outcomes.map((outcome, index) => (
                                <div key={index} className="outcome-item">
                                    <input
                                        type="text"
                                        value={outcome || ''}
                                        onChange={(e) => handleLearningOutcomeChange(index, e.target.value)}
                                        placeholder={`Learning Outcome ${index + 1}`}
                                        className="form-control"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeLearningOutcome(index)}
                                        className="remove-btn"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addLearningOutcome}
                                className="add-btn"
                            >
                                Add Outcome
                            </button>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Videos:</label>
                        <div className="videos-section">
                            {formData.videos.map((video, index) => (
                                <div key={index} className="video-item">
                                    <input
                                        type="file"
                                        accept="video/*"
                                        onChange={(e) => handleVideoChange(index, e.target.files[0])}
                                        className="form-control"
                                    />
                                    {typeof video === 'string' && (
                                        <video controls className="video-preview">

                                            <source src={`${baseUrl}/storage/videos/${video}`} type="video/mp4" />

                                            Your browser does not support the video tag.
                                        </video>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => removeVideo(index)}
                                        className="remove-btn"
                                    >
                                        Remove Video
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addVideo}
                                className="add-btn"
                            >
                                Add Video
                            </button>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="submit-btn" disabled={submitStatus.loading}>
                            {submitStatus.loading ? 'Saving...' : 'Save Changes'}
                        </button>
                        <Link to="/admin-courses" className="cancel-btn">
                            Cancel
                        </Link>
                    </div>
                </form>
            )}
        </div>
    );
};

export default EditCourse;
