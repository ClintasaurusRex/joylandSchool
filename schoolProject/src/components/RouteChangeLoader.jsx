import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";

const RouteChangeLoader = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // shorter time for route changes

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return isLoading ? <LoadingScreen /> : children;
};

export default RouteChangeLoader;
