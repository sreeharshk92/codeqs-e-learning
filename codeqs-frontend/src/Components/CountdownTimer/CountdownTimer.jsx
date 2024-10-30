import { useEffect, useState } from 'react';
import "./CountdownTimer.css"

// eslint-disable-next-line react/prop-types
const CountdownTimer = ({ durationInHours }) => {
  const [timeLeft, setTimeLeft] = useState(durationInHours * 3600);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = () => {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className="countdown-timer">
      <p >Time Left: {formatTime()}</p>
    </div>
  );
};

export default CountdownTimer;
