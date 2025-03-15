import { useState, useEffect } from "react";

const useLimitAlert = (items, limit = 10) => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (items && items.length >= limit) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [items, limit]);

  const closeAlert = () => {
    setShowAlert(false);
  };

  const checkLimit = (count) => {
    return count >= limit;
  };

  return {
    showAlert,
    closeAlert,
    checkLimit,
    isAtLimit: items && items.length >= limit,
  };
};

export default useLimitAlert;
