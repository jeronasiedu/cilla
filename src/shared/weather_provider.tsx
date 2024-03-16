"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { GeolocationData, WeatherData } from "@/shared/entities/weather";
import { WeatherContext } from "@/shared/context/weather_context";

const WeatherProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);

  const [geoData, setGeoData] = useState<GeolocationData>({
    latitude: null,
    longitude: null,
    error: null,
    locationName: null,
  });

  function describeRain(probability: number) {
    if (probability < 0 || probability > 5) {
      throw new Error("Probability must be between 0 and 5");
    }

    const descriptions = [
      "Clear skies",
      "A few clouds, no rain expected",
      "Partly cloudy, slight chance of rain",
      "Mostly cloudy, chance of rain",
      "Overcast, possible rain",
      "Rainy, stormy clouds",
    ];
    const icons = [
      "carbon:sunny",
      "mdi:weather-partly-cloudy",
      "mdi:weather-cloudy",
      "mdi:weather-pouring",
      "mdi:weather-pouring",
      "mdi:weather-rainy",
    ];

    const index = Math.floor(probability); // Round down to choose the appropriate description
    return {
      description: descriptions[index],
      icon: icons[index],
    };
  }

  async function fetchLocationData({
    lon,
    lat,
  }: {
    lon: number;
    lat: number;
  }): Promise<string> {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&details=1`;
    const response = await fetch(url);
    const data = await response.json();
    return data.name;
  }

  const [weatherData, setWeatherData] = useState<WeatherData>({
    temp: null,
    humidity: null,
    precipitationProb: null,
    rainIcon: "",
    rainDescription: "",
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchLocationData({
          lon: longitude,
          lat: latitude,
        })
          .then((name) => {
            setGeoData({
              latitude,
              longitude,
              error: null,
              locationName: name,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      },
      (error) => {
        toast.error("Please enable geolocation in your browser settings", {
          duration: 7000,
        });
        setGeoData({
          latitude: null,
          longitude: null,
          error: error.message,
          locationName: null,
        });
        setLoading(false);
      },
    );
  }, []);

  useEffect(() => {
    if (!geoData.latitude || !geoData.longitude) {
      return; // If location data is still loading, prevent unnecessary API calls
    }

    const apiKey = "b86M9snY3o7G01grIyKs67D6oQBimgNz"; // Replace with your actual API key
    const url = `https://api.tomorrow.io/v4/weather/forecast?location=${geoData.latitude},${geoData.longitude}&apikey=${apiKey}`;

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const {
          timelines: { daily },
        } = data;
        const todayWeather = daily[0].values;
        const rainInfo = describeRain(todayWeather.precipitationProbabilityAvg);
        setWeatherData({
          temp: todayWeather.temperatureAvg,
          humidity: todayWeather.humidityAvg,
          precipitationProb: todayWeather.precipitationProbabilityAvg,
          rainDescription: rainInfo.description,
          rainIcon: rainInfo.icon,
        });
      })
      .catch((error) => {
        toast.error(error.message);
        setWeatherData({
          temp: null,
          humidity: null,
          precipitationProb: null,
          rainDescription: "",
          rainIcon: "",
        });
      })
      .finally(() => setLoading(false));
  }, [geoData.latitude, geoData.longitude]);
  return (
    <WeatherContext.Provider
      value={{
        geoData,
        weatherData,
        loading,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherProvider;
