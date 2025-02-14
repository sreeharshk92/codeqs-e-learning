import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function WorkshopList() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleEdit = (id) => {
        navigate(`/workshopedit/${id}`);
    };

    useEffect(() => {
        const fetchCategoriesAndProducts = async () => {
            try {
                const [categoryResponse, productResponse] = await Promise.all([
                    fetch('http://127.0.0.1:8000/api/workshopcategory/categorylist'),
                    fetch('http://127.0.0.1:8000/api/workshop/productlist'),
                ]);

                if (!categoryResponse.ok || !productResponse.ok) {
                    throw new Error('Failed to fetch categories or products');
                }

                const categoryData = await categoryResponse.json();
                const productData = await productResponse.json();
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

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const response = await fetch(`http://localhost:8000/api/workshop/productdelete/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const result = await response.json();
                if (!response.ok) {
                    throw new Error(result.error || 'Failed to delete product');
                }

                setProducts(products.filter(product => product.id !== id));
                alert(result.message);
            } catch (error) {
                setError(error.message || 'An error occurred while deleting the product.');
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const categorizedProducts = categories.map((category) => {
        const categoryProducts = products.filter(product => product.category_id === category.id);
        return { ...category, products: categoryProducts };
    });

    return (
        <div className="admin-product-table">
            <h2>Workshop Management</h2>
            <Link to="/workshopcreate" className="link-button create-product-btn">
                Create Workshop
            </Link>
            {error && <div className="error-message">{error}</div>}
            <table>
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Image</th>
                        <th>Workshop Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Seats Available</th>
                        <th>Discount</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categorizedProducts.map(category =>
                        category.products.map(product => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <th>{product.images && (
                        <img
                            src={`http://127.0.0.1:8000/storage/${product.images}`}
                            alt="Current Product"
                            className="object-cover object-center w-full h-full"
        style={{ maxWidth: '100px', maxHeight: '100px' }}
                        />
                    )}</th>
                                <td>{product.title}</td>
                                <td>{product.description}</td>
                                <td>${Number(product.price).toFixed(2)}</td>
                                <td>{product.seat_available}</td>
                                <td>{product.discount}</td>
                                <td>{category.name}</td>
                                <td>
                                    <button className="edit-btn" onClick={() => handleEdit(product.id)}>Edit</button>
                                    <button className="delete-btn" onClick={() => handleDelete(product.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
