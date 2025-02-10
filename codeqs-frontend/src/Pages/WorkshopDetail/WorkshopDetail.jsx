import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

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
        // Fetch workshop details if not available in state
        if (!workshop) {
          try {
            const workshopResponse = await fetch(`http://127.0.0.1:8000/api/workshop/product/${id}`);
            if (!workshopResponse.ok) {
              throw new Error('Failed to fetch workshop details');
            }
            const workshopData = await workshopResponse.json();
            setWorkshop(workshopData);
          } catch (err) {
            console.error('Workshop fetch error:', err);
            setError('Failed to load workshop details');
            setLoading(false);
            return;
          }
        }

        // Fetch videos
        try {
          const videosResponse = await fetch(`http://127.0.0.1:8000/api/workshopvideo/videolist`);
          if (!videosResponse.ok) {
            throw new Error('Failed to fetch videos');
          }
          const videosData = await videosResponse.json();
          
          // Filter videos for this workshop
          const workshopVideos = videosData.data.filter(
            video => video.workshop_id === parseInt(id)
          );
          setVideos(workshopVideos);
        } catch (err) {
          console.error('Videos fetch error:', err);
          setError('Failed to load workshop videos');
        }
      } catch (err) {
        console.error('General error:', err);
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkshopAndVideos();
  }, [id, workshop]);

  const VideoPlayer = ({ videoUrl }) => (
    <div className="video-container">
      <video 
        controls 
        className="w-full rounded-lg shadow-lg"
        style={{ maxWidth: '600px' }}
      >
        <source
          src={`http://127.0.0.1:8000/storage/${videoUrl}`}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loading">Loading workshop details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600 error">{error}</div>
      </div>
    );
  }

  if (!workshop) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600 error">Workshop not found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Workshop Header */}
        <div className="mb-8 overflow-hidden bg-white rounded-lg shadow-lg">
          <div className="p-6">
            <h1 className="mb-4 text-3xl font-bold text-gray-900">{workshop.title}</h1>
            <div className="mb-6 aspect-w-16 aspect-h-9">
              {workshop.images && (
                <img 
                  src={`http://127.0.0.1:8000/storage/images/${workshop.images}`}
                  alt={workshop.title}
                  className="object-cover w-full h-64 rounded-lg"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'placeholder-image-url';
                  }}
                />
              )}
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h2 className="mb-2 text-xl font-semibold text-gray-900">Description</h2>
                <p className="text-gray-600">{workshop.description}</p>
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-gray-50">
                  <p className="text-lg font-medium text-gray-900">
                    Price: ${workshop.price}
                  </p>
                  <p className="text-lg font-medium text-gray-900">
                    Seats Available: {workshop.seat_available}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Workshop Videos Section */}
        <div className="overflow-hidden bg-white rounded-lg shadow-lg">
          <div className="p-6">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Workshop Videos</h2>
            <div className="grid grid-cols-1 gap-8">
              {videos.length === 0 ? (
                <p className="text-gray-600">No videos available for this workshop.</p>
              ) : (
                videos.map((video) => (
                  <div 
                    key={video.video_id}
                    className="p-6 space-y-4 border rounded-lg"
                  >
                    <div className="flex flex-col gap-6 md:flex-row">
                      <div className="md:w-1/2">
                        {video.videos && <VideoPlayer videoUrl={video.videos} />}
                      </div>
                      <div className="space-y-4 md:w-1/2">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {video.topic}
                        </h3>
                        <p className="text-gray-600">{video.description}</p>
                        <p className="text-sm text-gray-500">
                          Duration: {video.duration}
                        </p>
                        {video.banner && (
                          <img
                            src={`http://127.0.0.1:8000/storage/banners/${video.banner}`}
                            alt={`Banner for ${video.topic}`}
                            className="rounded-lg shadow-sm"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'placeholder-image-url';
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default WorkshopDetail;