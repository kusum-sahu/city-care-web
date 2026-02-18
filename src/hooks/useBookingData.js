import { useLocation } from "react-router-dom";

const useBookingData = () => {
  const location = useLocation();
  const { serviceInfo, slot, selectedDate } = location.state || {};

  return { serviceInfo, slot, selectedDate };
};

export default useBookingData;
