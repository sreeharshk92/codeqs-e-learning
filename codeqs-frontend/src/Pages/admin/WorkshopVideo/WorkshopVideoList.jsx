import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function WorkshopVideoList() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategoriesAndProducts = async () => {
            try {
                const [categoryResponse, productResponse] = await Promise.all([
                    fetch('http://127.0.0.1:8000/api/workshop/productlist'),
                    fetch('http://127.0.0.1:8000/api/workshopvideo/videolist'),
                ]);

                if (!categoryResponse.ok || !productResponse.ok) {
                    throw new Error('Failed to fetch data from the server');
                }

                const [categoryData, productData] = await Promise.all([
                    categoryResponse.json(),
                    productResponse.json(),
                ]);

                setCategories(categoryData.data);
                setProducts(productData.data);
            } catch (err) {
                setError(err.message || 'Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchCategoriesAndProducts();
    }, []);

    const handleEdit = (id) => {
        navigate(`/workshop/videoedit/${id}`);
    };

    const handleDelete = async (videoId) => {
        if (!window.confirm('Are you sure you want to delete this video?')) {
            return;
        }

        try {
            const response = await fetch(
                `http://127.0.0.1:8000/api/workshopvideo/videodelete/${videoId}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete video');
            }

            const result = await response.json();
            setProducts(products.filter(product => product.video_id !== videoId));
            alert(result.message);
        } catch (error) {
            console.error('Delete error:', error);
            setError(error.message || 'An error occurred while deleting the video');
        }
    };

    const VideoPlayer = ({ videoUrl }) => (
        <video controls width="250">
            <source
                src={`http://127.0.0.1:8000/storage/${videoUrl}`}
                type="video/mp4"
            />
            Your browser does not support the video tag.
        </video>
    );

    if (loading) {
        return <div className="loading-spinner">Loading...</div>;
    }

    if (error) {
        return <div className="error-container">{error}</div>;
    }

    const categorizedProducts = categories.map((category) => ({
        ...category,
        products: products.filter(product => product.workshop_id === category.id),
    }));

    return (
        <div className="admin-product-table">
            <div className="header-container">
                <h2>Workshop Management</h2>
                <Link
                    to="/workshop/videocreate"
                    className="link-button create-product-btn"
                >
                    Create Workshop Video
                </Link>
            </div>

            {error && <div className="error-message">{error}</div>}

            <table>
                <thead>
                    <tr>
                        <th>Video ID</th>
                        <th>Video</th>
                        <th>Banner</th>
                        <th>Topic</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categorizedProducts.map((category) =>
                        category.products.map((product) => (
                            <tr key={`${category.id}-${product.video_id}`}>
                                <td>{product.video_id}</td>
                                <td>
                                    {product.videos && (
                                        <VideoPlayer videoUrl={product.videos} className="object-cover object-center w-full h-full"
                                        style={{ maxWidth: '100px', maxHeight: '100px' }} />
                                    )}
                                </td>
                                <th>{product.banner && (
                        <img
                            src={`http://127.0.0.1:8000/storage/banners/${product.banner}`}
                            alt="Current Product"
                            className="object-cover object-center w-full h-full"
        style={{ maxWidth: '100px', maxHeight: '100px' }}
                        />
                    )}</th>
                                <td>{product.topic}</td>
                                <td>{product.description}</td>
                                <td>{product.duration}</td>
                                <td>{category.title}</td>
                                <td className="action-buttons">
                                    <button
                                        className="edit-btn"
                                        onClick={() => handleEdit(product.video_id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDelete(product.video_id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}