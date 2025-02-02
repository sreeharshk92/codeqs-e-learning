import React, { useState, useEffect } from "react";

export default function WorkshopVideoCreate() {
  const initialFormState = {
    workshop_id: "",
    topic: "",
    description: "",
    duration: "",
    videos: null,
    banner: null,
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
      const response = await fetch("http://127.0.0.1:8000/api/workshop/productlist");
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

      const response = await fetch("http://127.0.0.1:8000/api/workshopvideo/videocreate", {
        method: "POST",
        body: form,
      });

      if (!response.ok) throw new Error("Failed to create workshop video");

      setSuccessMessage("Workshop video created successfully!");
      setFormData(initialFormState);
      // Reset file input
      const fileInputs = document.querySelectorAll('input[type="file"]');
      fileInputs.forEach(input => input.value = '');
    } catch (error) {
      console.error("Error creating workshop video:", error);
      setError("Failed to create workshop video");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl p-4 mx-auto">
      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="mb-6 text-2xl font-bold">Create New Workshop Video</h2>
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
              name="workshop_id"
              value={formData.workshop_id}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Product Name</label>
            <input
              type="text"
              name="topic"
              value={formData.topic}
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
            <label className="block mb-1 text-sm font-medium">Duration</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Videos</label>
            <input
              type="file"
              name="videos"
              onChange={handleChange}
              accept="video/*"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block mb-1 text-sm font-medium">Banner</label>
            <input
              type="file"
              name="banner"
              onChange={handleChange}
              accept="image/*"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:bg-blue-300"
          >
            {loading ? "Creating..." : "Create Workshop Video"}
          </button>
        </form>
      </div>
    </div>
  );
}
