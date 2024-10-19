import  { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => {
        if (currentCount === 1) {
          clearInterval(interval);
          setRedirect(true);
        }
        return currentCount - 1;
      });
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-base-200">
      <h2 className="text-lg font-semibold mb-4">Redirecting in {count} seconds...</h2>
      <progress className="progress progress-accent w-56" value={5 - count} max="5"></progress>
    </div>
  );
};

export default LoadingToRedirect;
