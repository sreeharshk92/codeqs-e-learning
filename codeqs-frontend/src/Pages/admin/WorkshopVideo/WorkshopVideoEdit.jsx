import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const WorkshopVideoEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State variables
  const [formData, setFormData] = useState({
    workshop_id: "",
    topic: "",
    description: "",
    duration: "",
    google_meet_link: "",
    google_meet_topic: "",
    google_meet_scheduled_at: "",
  });
  const [videoFile, setVideoFile] = useState(null);
  const [workshops, setWorkshops] = useState([]);
  const [currentVideo, setCurrentVideo] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [newImage, setNewImage] = useState(null);

  // Fetch workshop video and categories on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [videoResponse, workshopsResponse] = await Promise.all([
          fetch(`http://127.0.0.1:8000/api/workshopvideo/videoshow/${id}`),
          fetch("http://127.0.0.1:8000/api/workshop/productlist"),
        ]);

        if (!videoResponse.ok || !workshopsResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const videoData = await videoResponse.json();
        const workshopsData = await workshopsResponse.json();

        // Populate form data with fetched video details
        setFormData({
          workshop_id: videoData.workshopvideo.workshop_id,
          topic: videoData.workshopvideo.topic,
          description: videoData.workshopvideo.description || "",
          duration: videoData.workshopvideo.duration,
          google_meet_link: videoData.workshopvideo.google_meet_link || "",
          google_meet_topic: videoData.workshopvideo.google_meet_topic || "",
          google_meet_scheduled_at: videoData.workshopvideo.google_meet_scheduled_at || "",
        });

        // Set current video and banner image preview
        setCurrentVideo(videoData.workshopvideo.videos);
        setImagePreview(
          videoData.workshopvideo.banner
            ? `http://127.0.0.1:8000/uploads/${videoData.workshopvideo.banner}`
            : null
        );

        // Set workshops (categories)
        setWorkshops(workshopsData.data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load workshop video data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file" && name === "banner") {
      setNewImage(files[0]);
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle file upload for videos
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setVideoFile(e.target.files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("workshop_id", formData.workshop_id);
      formDataToSend.append("topic", formData.topic);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("duration", formData.duration);
      formDataToSend.append("google_meet_link", formData.google_meet_link);
      formDataToSend.append("google_meet_topic", formData.google_meet_topic);
      formDataToSend.append("google_meet_scheduled_at", formData.google_meet_scheduled_at);

      if (newImage) {
        formDataToSend.append("banner", newImage);
      }
      if (videoFile) {
        formDataToSend.append("videos", videoFile);
      }

      formDataToSend.append("_method", "PUT");

      const response = await fetch(
        `http://127.0.0.1:8000/api/workshopvideo/videoupdate/${id}`,
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Update failed");
      }

      alert(result.message || "Workshop video updated successfully");
      navigate("/workshop/videolist");
    } catch (err) {
      console.error("Submit error:", err);
      setError(err.message || "Failed to update workshop video");
    } finally {
      setLoading(false);
    }
  };

  // Format date for datetime-local input
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16); // Format as "YYYY-MM-DDTHH:mm"
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl p-4 mx-auto">
      <h2 className="mb-6 text-2xl font-bold">Edit Workshop Video</h2>

      {/* Error Message */}
      {error && (
        <div className="px-4 py-3 mb-4 text-red-700 bg-red-100 border border-red-400 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Workshop Category */}
        <div>
          <label className="block mb-1 text-sm font-medium">Workshop Category:</label>
          <select
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

        {/* Topic */}
        <div>
          <label className="block mb-1 text-sm font-medium">Topic:</label>
          <input
            type="text"
            name="topic"
            value={formData.topic}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 text-sm font-medium">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block mb-1 text-sm font-medium">Duration (in minutes):</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Google Meet Link */}
        <div>
          <label className="block mb-1 text-sm font-medium">Google Meet Link:</label>
          <input
            type="url"
            name="google_meet_link"
            value={formData.google_meet_link}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="https://meet.google.com/..."
          />
        </div>

        {/* Google Meet Topic */}
        <div>
          <label className="block mb-1 text-sm font-medium">Google Meet Topic:</label>
          <input
            type="text"
            name="google_meet_topic"
            value={formData.google_meet_topic}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Enter the meeting topic"
          />
        </div>

        {/* Google Meet Scheduled Time */}
        <div>
          <label className="block mb-1 text-sm font-medium">Google Meet Scheduled Time:</label>
          <input
            type="datetime-local"
            name="google_meet_scheduled_at"
            value={formatDateForInput(formData.google_meet_scheduled_at)}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Current Video */}
        {currentVideo && (
          <div>
            <label className="block mb-1 text-sm font-medium">Current Video:</label>
            <video controls width="300">
              <source src={`http://127.0.0.1:8000/uploads/${currentVideo}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}

        {/* Upload New Video */}
        <div>
          <label className="block mb-1 text-sm font-medium">Upload New Video:</label>
          <input
            type="file"
            name="videos"
            onChange={handleFileChange}
            accept="video/*"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Current Banner */}
        {imagePreview && (
          <div>
            <label className="block mb-1 text-sm font-medium">Current Banner:</label>
            <img
              src={imagePreview}
              alt="Current Banner"
              className="object-cover w-32 h-32"
            />
          </div>
        )}

        {/* New Banner */}
        <div>
          <label className="block mb-1 text-sm font-medium">New Banner:</label>
          <input
            type="file"
            name="banner"
            onChange={handleInputChange}
            accept="image/*"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:bg-blue-300"
          >
            {loading ? "Updating..." : "Update Workshop Video"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/workshop/videolist")}
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