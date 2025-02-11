import React, { useState, useEffect } from "react";

export default function WorkshopVideoCreate() {
  // Initial form state
  const initialFormState = {
    workshop_id: "",
    topic: "",
    description: "",
    duration: "",
    videos: null,
    banner: null,
    google_meet_link: "",
    google_meet_topic: "",
    google_meet_scheduled_at: "",
  };

  // State variables
  const [categories, setCategories] = useState([]); // List of workshops (categories)
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false); // Loading state for form submission
  const [error, setError] = useState(null); // General error message
  const [successMessage, setSuccessMessage] = useState(""); // Success message
  const [validationErrors, setValidationErrors] = useState({}); // Validation errors

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch workshops (categories) from the backend
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

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // Handle datetime-local fields
    if (name === "google_meet_scheduled_at") {
      const formattedDate = value ? new Date(value).toISOString().slice(0, 19).replace("T", " ") : null;
      setFormData({ ...formData, [name]: formattedDate });
    } else {
      setFormData({ ...formData, [name]: files ? files[0] : value });
    }

    // Clear validation error for the current field
    setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage("");
    setValidationErrors({}); // Reset validation errors

    try {
      const form = new FormData();

      // Append all non-null fields to the FormData object
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null) {
          form.append(key, formData[key]);
        }
      });

      // Send the form data to the backend
      const response = await fetch("http://127.0.0.1:8000/api/workshopvideo/videocreate", {
        method: "POST",
        body: form,
      });

      const result = await response.json();

      if (!response.ok) {
        // Parse and display validation errors
        if (result.errors) {
          const errors = {};
          Object.keys(result.errors).forEach((key) => {
            errors[key] = result.errors[key][0]; // Take the first error message for each field
          });
          setValidationErrors(errors);

          // If the error is related to google_meet_scheduled_at, show a custom error message
          if (errors.google_meet_scheduled_at) {
            setError("You have to provide a future date.");
          }

          throw new Error("Validation failed");
        } else {
          throw new Error(result.message || "Failed to create workshop video");
        }
      }

      // Reset the form and show success message
      setSuccessMessage("Workshop video created successfully!");
      setFormData(initialFormState);

      // Reset file inputs
      const fileInputs = document.querySelectorAll('input[type="file"]');
      fileInputs.forEach((input) => (input.value = ""));
    } catch (error) {
      console.error("Error creating workshop video:", error);
      setError(error.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl p-4 mx-auto">
      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="mb-6 text-2xl font-bold">Create New Workshop Video</h2>

        {/* General Error Message */}
        {error && (
          <div className="px-4 py-3 mb-4 text-red-700 bg-red-100 border border-red-400 rounded">
            {error}
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className="px-4 py-3 mb-4 text-green-700 bg-green-100 border border-green-400 rounded">
            {successMessage}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Category Dropdown */}
          <div>
            <label className="block mb-1 text-sm font-medium">Category</label>
            <select
              name="workshop_id"
              value={formData.workshop_id}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                validationErrors.workshop_id ? "border-red-500" : ""
              }`}
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
            {validationErrors.workshop_id && (
              <p className="text-sm text-red-500">{validationErrors.workshop_id}</p>
            )}
          </div>

          {/* Topic */}
          <div>
            <label className="block mb-1 text-sm font-medium">Product Name</label>
            <input
              type="text"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                validationErrors.topic ? "border-red-500" : ""
              }`}
              required
            />
            {validationErrors.topic && (
              <p className="text-sm text-red-500">{validationErrors.topic}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className={`w-full p-2 border rounded ${
                validationErrors.description ? "border-red-500" : ""
              }`}
            />
            {validationErrors.description && (
              <p className="text-sm text-red-500">{validationErrors.description}</p>
            )}
          </div>

          {/* Duration */}
          <div>
            <label className="block mb-1 text-sm font-medium">Duration (in seconds)</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                validationErrors.duration ? "border-red-500" : ""
              }`}
              required
            />
            {validationErrors.duration && (
              <p className="text-sm text-red-500">{validationErrors.duration}</p>
            )}
          </div>

          {/* Video Upload */}
          <div>
            <label className="block mb-1 text-sm font-medium">Videos</label>
            <input
              type="file"
              name="videos"
              onChange={handleChange}
              accept="video/*"
              className={`w-full p-2 border rounded ${
                validationErrors.videos ? "border-red-500" : ""
              }`}
              required
            />
            {validationErrors.videos && (
              <p className="text-sm text-red-500">{validationErrors.videos}</p>
            )}
          </div>

          {/* Banner Upload */}
          <div>
            <label className="block mb-1 text-sm font-medium">Banner</label>
            <input
              type="file"
              name="banner"
              onChange={handleChange}
              accept="image/*"
              className={`w-full p-2 border rounded ${
                validationErrors.banner ? "border-red-500" : ""
              }`}
              required
            />
            {validationErrors.banner && (
              <p className="text-sm text-red-500">{validationErrors.banner}</p>
            )}
          </div>

          {/* Google Meet Link */}
          <div>
            <label className="block mb-1 text-sm font-medium">Google Meet Link</label>
            <input
              type="url"
              name="google_meet_link"
              value={formData.google_meet_link}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                validationErrors.google_meet_link ? "border-red-500" : ""
              }`}
              placeholder="https://meet.google.com/..."
            />
            {validationErrors.google_meet_link && (
              <p className="text-sm text-red-500">{validationErrors.google_meet_link}</p>
            )}
          </div>

          {/* Google Meet Topic */}
          <div>
            <label className="block mb-1 text-sm font-medium">Google Meet Topic</label>
            <input
              type="text"
              name="google_meet_topic"
              value={formData.google_meet_topic}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                validationErrors.google_meet_topic ? "border-red-500" : ""
              }`}
              placeholder="Enter the meeting topic"
            />
            {validationErrors.google_meet_topic && (
              <p className="text-sm text-red-500">{validationErrors.google_meet_topic}</p>
            )}
          </div>

          {/* Google Meet Scheduled Time */}
          <div>
            <label className="block mb-1 text-sm font-medium">Google Meet Scheduled Time</label>
            <input
              type="datetime-local"
              name="google_meet_scheduled_at"
              value={formData.google_meet_scheduled_at}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                validationErrors.google_meet_scheduled_at ? "border-red-500" : ""
              }`}
            />
            {validationErrors.google_meet_scheduled_at && (
              <p className="text-sm text-red-500">{validationErrors.google_meet_scheduled_at}</p>
            )}
          </div>

          {/* Submit Button */}
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