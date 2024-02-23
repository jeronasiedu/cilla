import { useEffect, useState } from "react";

interface GeolocationData {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
}

function useGeoLocation(): GeolocationData {
  const [data, setData] = useState<GeolocationData>({
    latitude: null,
    longitude: null,
    error: null,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setData({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => {
        setData({
          latitude: null,
          longitude: null,
          error: error.message,
        });
      },
    );
  }, []);

  return data;
}

export default useGeoLocation;
