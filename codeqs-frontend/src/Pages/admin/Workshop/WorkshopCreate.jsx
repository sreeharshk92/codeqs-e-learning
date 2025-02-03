import React, { useState, useEffect } from "react";

export default function WorkshopCreate() {
  const initialFormState = {
    category_id: "",
    title: "",
    description: "",
    price: "0",
    discount: "",
    seat_available: "",
    subscribe: "free", // Added default value
    image: null,
  };

  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/workshopcategory/categorylist");
      if (!response.ok) throw new Error("Failed to fetch categories");
      const data = await response.json();
      setCategories(Array.isArray(data.data) ? data.data : []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError("Failed to load categories");
      setCategories([]);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage("");

    try {
      const form = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null) {
          form.append(key, formData[key]);
        }
      });

      const response = await fetch("http://127.0.0.1:8000/api/workshop/productcreate", {
        method: "POST",
        body: form
      });

      if (!response.ok) throw new Error("Failed to create product");

      setSuccessMessage("Product created successfully!");
      setFormData(initialFormState);
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';
    } catch (error) {
      console.error("Error creating product:", error);
      setError("Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl p-4 mx-auto">
      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="mb-6 text-2xl font-bold">Create New Workshop</h2>
        {error && (
          <div className="px-4 py-3 mb-4 text-red-700 bg-red-100 border border-red-400 rounded">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="px-4 py-3 mb-4 text-green-700 bg-green-100 border border-green-400 rounded">
            {successMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Category</label>
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Category</option>
              {Array.isArray(categories) && categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Product Name</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Subscription Type</label>
            <select
              name="subscribe"
              value={formData.subscribe}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="free">Free</option>
              <option value="paid">Paid</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              className="w-full p-2 border rounded"
              required
              disabled={formData.subscribe === "free"}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Discount</label>
            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
              disabled={formData.subscribe === "free"}
            />
          </div>
          
          <div>
            <label className="block mb-1 text-sm font-medium">Seats Available</label>
            <input
              type="number"
              name="seat_available"
              value={formData.seat_available}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Images</label>
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
            {loading ? "Creating..." : "Create Workshop"}
          </button>
        </form>
      </div>
    </div>
  );
}