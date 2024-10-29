// CountdownTimer.jsx
import { useEffect, useState } from 'react';

const CountdownTimer = ({ durationInHours }) => {
  // Convert durationInHours to seconds
  const [timeLeft, setTimeLeft] = useState(durationInHours * 3600);

  useEffect(() => {
    // If there's no time left, exit the timer early
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format time as hh:mm:ss
  const formatTime = () => {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div>
      <p>Time Left: {formatTime()}</p>
    </div>
  );
};

export default CountdownTimer;
