// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './adminCourse.css'; // Ensure this CSS file exists
import DefaultAdminLayout from './layout/DefaultAdminLayout';
import axios from 'axios';

const Course = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [learningOutcomes, setLearningOutcomes] = useState(['']);
    const [videos, setVideos] = useState([null]); // Initialize with one empty file input
const [categoryName, setCategoryName] = useState('')
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/categories');
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        // Append learning outcomes as arrays
        learningOutcomes.forEach((outcome, index) => formData.append(`learning_outcomes[${index}]`, outcome));
        
        // Append video files
        videos.forEach((video) => {
            if (video) {
                formData.append('videos[]', video);
            }
        });

 // Check the contents of the FormData
 for (let pair of formData.entries()) {
    console.log(`${pair[0]}:`, pair[1]);
}

        try {
            const response = await fetch('http://localhost:8000/api/courses', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                },
            });

            const data = await response.json();
            if (data.error) {
                console.error('Error adding course:', data.error);
            } else {
                console.log('Course added successfully:', data);
                navigate('/courselist');
            }
        } catch (error) {
            console.error('Error saving course:', error);
        }
    };

    const handleLearningOutcomeChange = (index, value) => {
        const updatedOutcomes = [...learningOutcomes];
        updatedOutcomes[index] = value;
        setLearningOutcomes(updatedOutcomes);
    };

    const handleVideoChange = (index, file) => {
        const updatedVideos = [...videos];
        updatedVideos[index] = file;
        setVideos(updatedVideos);
    };

    const addLearningOutcome = () => setLearningOutcomes([...learningOutcomes, '']);
    const addVideo = () => setVideos([...videos, null]); // Add a null entry for the new file input


    const handleAddCategory = async (e) => {
        e.preventDefault();
    
        try {
            // Make the POST request to add the category
            const response = await axios.post('http://127.0.0.1:8000/api/add-categories', {
                name: categoryName,
            });
    
            if (response.status === 201) { // Check if the status code indicates success
                console.log('Category added successfully:', response.data);
               
                // Clear the input field
                setCategoryName('');
            } else {
                console.log('Error adding category:', response.statusText);
            }
        } catch (error) {
            console.error('Error saving category:', error);
        }
    };
    
    

    return (
     
        < DefaultAdminLayout>
        <section className="admin-course-section">
            <div className="admin-course-container">
                
                <h2 className='course-h2'>Add New Course</h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data" className="course-form">
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-control" name="name" placeholder="Enter course name" required />
                    </div>
                    <div className="form-group">
                        <label>Price</label>
                        <input type="number" className="form-control" name="price" placeholder="Enter price" required />
                    </div>
                    <div className="form-group">
                        <label>Duration in Hours</label>
                        <input type="number" className="form-control" name="duration_in_hours" placeholder="Enter duration in hours" required />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <select name="category_id" className="form-control" required>
                            <option value="">Select a category</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>

    <button type="submit" onClick={handleAddCategory} className="btn btn-secondary">Add Category</button>

        <input
            type="text"
            name='categoryName'
            className="form-control"
            value={categoryName}
            placeholder="Enter new category"
            onChange={(e)=>setCategoryName(e.target.value)}
            required
        />

                     </div>

                   
    



                    <div className="form-group">
                        <label>Status</label>
                        <div className="radio-group">
                            <label><input type="radio" value="1" name="status" required /> Active</label>
                            <label><input type="radio" value="0" name="status" required /> Inactive</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Favourite</label>
                        <div className="radio-group">
                            <label><input type="radio" value="1" name="is_favourite" required /> Yes</label>
                            <label><input type="radio" value="0" name="is_favourite" required /> No</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Image</label>
                        <input type="file" className="form-control-file" name="image" required />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea className="form-control" name="description" placeholder="Enter course description"></textarea>
                    </div>
                    <div className="form-group">
                        <label>Mentor</label>
                        <input type="text" className="form-control" name="mentor" placeholder="Enter mentor name" />
                    </div>
                    <div className="form-group">
                        <label>Certificates</label>
                        <input type="text" className="form-control" name="certificates" placeholder="Enter certificates provided" />
                    </div>
                    <div className="form-group">
                        <label>Rating</label>
                        <input type="number" className="form-control" name="rating" placeholder="Enter rating (0-5)" min="0" max="5" step="0.1" />
                    </div>
                    <div className="form-group">
                        <label>Total Hours</label>
                        <input type="number" className="form-control" name="total_hours" placeholder="Enter total hours" required />
                    </div>
                    <div className="form-group">
                        <label>Short Description</label>
                        <textarea className="form-control" name="short_description" placeholder="Enter short description"></textarea>
                    </div>

                    {/* Dynamic Learning Outcomes */}
                    <div className="form-group">
                        <label>Learning Outcomes</label>
                        {learningOutcomes.map((outcome, index) => (
                            <input
                                key={index}
                                type="text"
                                className="form-control"
                                value={outcome}
                                onChange={(e) => handleLearningOutcomeChange(index, e.target.value)}
                                placeholder={`Learning Outcome ${index + 1}`}
                                required
                            />
                        ))}
                        <button type="button" onClick={addLearningOutcome} className="btn btn-secondary mt-2">Add Learning Outcome</button>
                    </div>

                    {/* Dynamic Videos */}
                    <div className="form-group">
                        <label>Videos</label>
                        {videos.map((video, index) => (
                            <input
                                key={index}
                                type="file"
                                className="form-control-file"
                                onChange={(e) => handleVideoChange(index, e.target.files[0])} // Get the file
                                placeholder={`Upload Video ${index + 1}`}
                                required
                            />
                        ))}
                        <button type="button" onClick={addVideo} className="btn btn-secondary mt-2">Add Video</button>
                    </div>

                    <div className="form-group">
                        <label>Zoom Link</label>
                        <input type="url" className="form-control" name="zoom_link" placeholder="Enter Zoom link" />
                    </div>

                    <button type="submit" className="btn-submit">Submit</button>
                </form>
            </div>
        </section>
        </DefaultAdminLayout>   
    );
};

export default Course;
