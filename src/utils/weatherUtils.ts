import { WeatherData } from "./weatherTypes";

export async function fetchWeatherData(location: string): Promise<WeatherData | null> {
    try {
      const response = await fetch(`/api/wd3?location=${location}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: WeatherData = await response.json() as WeatherData;
      return data;
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
      return null;
    }
  }