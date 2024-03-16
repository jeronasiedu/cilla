import { useContext } from "react";
import { WeatherContext } from "@/shared/context/weather_context";

export const useWeather = () => {
  const weatherContext = useContext(WeatherContext);
  if (!weatherContext) {
    throw new Error("useWeather must be used within an WeatherProvider");
  }
  return weatherContext;
};
