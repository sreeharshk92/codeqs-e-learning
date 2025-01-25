import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function WorkshopEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category_id: "",
    title: "",
    description: "",
    price: "",
    discount: "",
    seat_available: "",
    images: "",
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    fetchWorkshopData();
  }, [id]);

  const fetchWorkshopData = async () => {
    try {
      const [workshopResponse, categoriesResponse] = await Promise.all([
        fetch(`http://127.0.0.1:8000/api/workshop/productshow/${id}`).then((r) =>
          r.json()
        ),
        fetch('http://127.0.0.1:8000/api/workshopcategory/categorylist').then((r) =>
          r.json()
        ),
      ]);
  
      const workshop = workshopResponse.workshop;
      const categories = categoriesResponse.data || []; // Access 'data' key for categories
  
      if (workshop) {
        setFormData({
          category_id: workshop.category_id || '',
          title: workshop.title || '',
          description: workshop.description || '',
          price: workshop.price || '',
          discount: workshop.discount || '',
          seat_available: workshop.seat_available || '',
          images: workshop.images || '',
        });
        setImagePreview(
          workshop.images
            ? `http://127.0.0.1:8000/uploads/${workshop.images}`
            : null
        );
      }
  
      setCategories(categories);
    } catch (err) {
      setError('Failed to load workshop data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const validate = () => {
    if (!formData.title.trim()) {
      setError('Title is required.');
      return false;
    }
    if (!formData.description.trim()) {
      setError('Description is required.');
      return false;
    }
    if (!formData.price || isNaN(formData.price) || formData.price <= 0) {
      setError('Price must be a positive number.');
      return false;
    }
    if (!formData.seat_available || isNaN(formData.seat_available) || formData.seat_available < 1) {
      setError('Seat availability must be at least 1.');
      return false;
    }
    setError(null); // Clear error if validation passes
    return true;
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setNewImage(files[0]);
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setError(null);

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value != null && key !== 'images') {
        form.append(key, value);
      }
    });
    if (newImage) form.append('images', newImage);
    form.append('_method', 'PUT');

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/workshop/productupdate/${id}`,
        {
          method: 'POST',
          body: form,
          headers: { Accept: 'application/json' },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update workshop');
      }

      setSuccess('Workshop updated successfully!');
      setTimeout(() => navigate('/admin-dashboard/workshoplist'), 1500);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <div className="flex justify-center p-4">Loading...</div>
  ) : (
    <div className="max-w-2xl p-4 mx-auto">
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold">Edit Workshop</h2>
        {error && (
          <div className="p-4 mb-4 text-red-700 border border-red-200 rounded bg-red-50">
            {error}
          </div>
        )}
        {success && (
          <div className="p-4 mb-4 text-green-700 border border-green-200 rounded bg-green-50">
            {success}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Category</label>
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Discount</label>
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                min="0"
                required
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Seats</label>
            <input
              type="number"
              name="seat_available"
              value={formData.seat_available}
              onChange={handleChange}
              min="1"
              required
              className="w-full p-2 border rounded"
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
            <label className="block mb-1 text-sm font-medium">New Image</label>
            <input
              type="file"
              name="images"
              onChange={handleChange}
              accept="image/*"
              className="w-full p-2 border rounded"
            />
          </div>
          <button
           
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:bg-blue-300"
          >
            {loading ? "Updating..." : "Update Workshop"}
          </button>
        </form>
      </div>
    </div>
  );
}
