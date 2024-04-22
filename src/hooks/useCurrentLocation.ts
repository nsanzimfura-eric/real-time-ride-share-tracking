import { useEffect, useState } from "react";

const useCurrentLocation = () => {
  const [location, setLocation] = useState<google.maps.LatLng | null>(null);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation(new google.maps.LatLng(latitude, longitude));
      },
      (error) => {
        console.error("Geolocation error:", error);
      },
      {
        enableHighAccuracy: true,
        // timeout: 5000,
        maximumAge: 0,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return location;
};

export default useCurrentLocation;
