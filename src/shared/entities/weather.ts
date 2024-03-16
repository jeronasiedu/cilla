export interface GeolocationData {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
  locationName: string | null;
}

export interface WeatherData {
  temp: number | null;
  humidity: number | null;
  precipitationProb: number | null;
  rainIcon: string;
  rainDescription: string;
}
