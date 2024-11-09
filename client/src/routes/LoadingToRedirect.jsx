import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

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
    return () => clearInterval(interval);
  }, []);

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <progress
        className="progress progress-success w-56 mb-4"
        value={(5 - count) * 20}
        max="100"
      ></progress>
      <p className="text-lg text-gray-700 ">No permission. Redirecting in {count}...</p>
    </div>
  );
};

export default LoadingToRedirect;
