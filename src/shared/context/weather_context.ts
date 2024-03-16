import { GeolocationData, WeatherData } from "@/shared/entities/weather";
import { createContext } from "react";

export type WeatherContextProps = {
  geoData: GeolocationData;
  weatherData: WeatherData;
  loading: boolean;
};

export const WeatherContext = createContext<WeatherContextProps>(
  {} as WeatherContextProps,
);
