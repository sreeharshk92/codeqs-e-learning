import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import "./WorkshopDetail.css";

const WorkshopDetail = () => {
  const { id } = useParams();
  const location = useLocation();

  const [workshop, setWorkshop] = useState(location.state?.workshop || null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkshopAndVideos = async () => {
      try {
        if (!workshop) {
          try {
            const workshopResponse = await fetch(
              `http://127.0.0.1:8000/api/workshop/product/${id}`
            );
            if (!workshopResponse.ok) {
              throw new Error("Failed to fetch workshop details");
            }
            const workshopData = await workshopResponse.json();
            setWorkshop(workshopData);
          } catch (err) {
            console.error("Workshop fetch error:", err);
            setError("Failed to load workshop details");
            setLoading(false);
            return;
          }
        }

        try {
          const videosResponse = await fetch(
            `http://127.0.0.1:8000/api/workshopvideo/videolist`
          );
          if (!videosResponse.ok) {
            throw new Error("Failed to fetch videos");
          }
          const videosData = await videosResponse.json();
          const workshopVideos = videosData.data.filter(
            (video) => video.workshop_id === parseInt(id)
          );
          setVideos(workshopVideos);
        } catch (err) {
          console.error("Videos fetch error:", err);
          setError("Failed to load workshop videos");
        }
      } catch (err) {
        console.error("General error:", err);
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkshopAndVideos();
  }, [id, workshop]);

  const VideoPlayer = ({ videoUrl }) => (
    <div className="workshop-video-container">
      <video controls className="workshop-video">
        <source
          src={`http://127.0.0.1:8000/storage/${videoUrl}`}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );

  if (loading) {
    return <div className="workshop-loading">Loading workshop details...</div>;
  }

  if (error) {
    return <div className="workshop-error">{error}</div>;
  }

  if (!workshop) {
    return <div className="workshop-error">Workshop not found.</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="workshop-container">
        <div className="workshop-header">
          <h1 className="workshop-title">{workshop.title}</h1>
          {/* Uncomment the image section if needed */}
          {/* {workshop.images && (
            <img
              src={`http://127.0.0.1:8000/storage/images/${workshop.images}`}
              alt={workshop.title}
              className="workshop-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "placeholder-image-url";
              }}
            />
          )} */}
        </div>

        <div className="workshop-details">
          <div className="workshop-description">
            <h2>Description</h2>
            <p>{workshop.description}</p>
          </div>

          <div className="workshop-info">
            <p>Price: ${workshop.price}</p>
            <p>Seats Available: {workshop.seat_available}</p>
          </div>
        </div>

        <div className="workshop-videos">
          <h2>Workshop Videos</h2>
          {videos.length === 0 ? (
            <p>No videos available for this workshop.</p>
          ) : (
            videos.map((video) => (
              <div key={video.video_id} className="workshop-video-card">
                <VideoPlayer videoUrl={video.videos} />
                <h3>{video.topic}</h3>
                <p>{video.description}</p>
                <p>Duration: {video.duration}</p>
                {/* Uncomment the banner section if needed */}
                {/* {video.banner && (
                  <img
                    src={`http://127.0.0.1:8000/storage/banners/${video.banner}`}
                    alt={`Banner for ${video.topic}`}
                    className="workshop-video-banner"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "placeholder-image-url";
                    }}
                  />
                )} */}
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WorkshopDetail;
