import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const WorkshopVideoEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        workshop_id: '',
        topic: '',
        description: '',
        duration: '',
    });
    const [videoFile, setVideoFile] = useState(null);
    const [workshops, setWorkshops] = useState([]);
    const [currentVideo, setCurrentVideo] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [newImage, setNewImage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [videoResponse, workshopsResponse] = await Promise.all([
                    fetch(`http://127.0.0.1:8000/api/workshopvideo/videoshow/${id}`),
                    fetch('http://127.0.0.1:8000/api/workshop/productlist')
                ]);

                if (!videoResponse.ok || !workshopsResponse.ok) {
                    throw new Error('Failed to fetch data');
                }

                const videoData = await videoResponse.json();
                const workshopsData = await workshopsResponse.json();

                setWorkshops(workshopsData.data);
                setFormData({
                    workshop_id: videoData.workshopvideo.workshop_id,
                    topic: videoData.workshopvideo.topic,
                    description: videoData.workshopvideo.description || '',
                    duration: videoData.workshopvideo.duration,
                });
                setCurrentVideo(videoData.workshopvideo.videos);

                setImagePreview(
                    videoData.workshopvideo.banner
                        ? `http://127.0.0.1:8000/uploads/${videoData.workshopvideo.banner}`
                        : null
                );
            } catch (err) {
                console.error('Fetch error:', err);
                setError('Failed to load workshop video data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file' && name === 'banner') {
            setNewImage(files[0]);
            setImagePreview(URL.createObjectURL(files[0]));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setVideoFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('workshop_id', formData.workshop_id);
            formDataToSend.append('topic', formData.topic);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('duration', formData.duration);
            if (newImage) {
                formDataToSend.append('banner', newImage);
            }

            if (videoFile) {
                formDataToSend.append('videos', videoFile);
            }
            formDataToSend.append('_method', 'PUT');

            const response = await fetch(
                `http://127.0.0.1:8000/api/workshopvideo/videoupdate/${id}`,
                {
                    method: 'POST',
                    body: formDataToSend,
                }
            );

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || 'Update failed');
            }
            alert(result.message || 'Workshop video updated successfully');
            navigate('/workshop/videolist');
        } catch (err) {
            console.error('Submit error:', err);
            setError(err.message || 'Failed to update workshop video');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="p-4 text-center">Loading...</div>;
    }

    return (
        <div className="max-w-2xl p-4 mx-auto">
            <h2 className="mb-4 text-2xl font-bold">Edit Workshop Video</h2>

            {error && (
                <div className="p-3 mb-4 text-red-700 bg-red-100 rounded">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-group">
                    <label htmlFor="workshop_id" className="block mb-1">
                        Workshop Category:
                    </label>
                    <select
                        id="workshop_id"
                        name="workshop_id"
                        value={formData.workshop_id}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        required
                    >
                        <option value="">Select Workshop</option>
                        {workshops.map((workshop) => (
                            <option key={workshop.id} value={workshop.id}>
                                {workshop.title}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="topic" className="block mb-1">
                        Topic:
                    </label>
                    <input
                        type="text"
                        id="topic"
                        name="topic"
                        value={formData.topic}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        required
                        maxLength={100}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description" className="block mb-1">
                        Description:
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        rows="4"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="duration" className="block mb-1">
                        Duration (in minutes):
                    </label>
                    <input
                        type="number"
                        id="duration"
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        required
                        min="1"
                    />
                </div>

                {currentVideo && (
                    <div className="form-group">
                        <label className="block mb-1">Current Video:</label>
                        <video controls className="w-full max-w-md">
                            <source
                                src={`http://127.0.0.1:8000/storage/${currentVideo}`}
                                type="video/mp4"
                            />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                )}

                <div className="form-group">
                    <label htmlFor="videos" className="block mb-1">
                        Upload New Video:
                    </label>
                    <input
                        type="file"
                        id="videos"
                        name="videos"
                        onChange={handleFileChange}
                        className="w-full p-2 border rounded"
                        accept="video/*"
                    />
                </div>

                <div>
                    <label className="block mb-1 text-sm font-medium">Current Image</label>
                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="object-cover w-32 h-32 mb-2 rounded"
                        />
                    )}
                </div>

                <div>
                    <label className="block mb-1 text-sm font-medium">New Banner</label>
                    <input
                        type="file"
                        name="banner"
                        onChange={handleInputChange}
                        accept="image/*"
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="flex gap-4">
                    <button
                        type="submit"
                        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                        disabled={loading}
                    >
                        {loading ? 'Updating...' : 'Update Workshop Video'}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/workshop/videolist')}
                        className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default WorkshopVideoEdit;
