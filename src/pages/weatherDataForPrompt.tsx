// all data for AI on an empty page
import React, { useEffect, useState } from "react";
 import { windWordDescription, visibilityWordDescription } from  './api/wd3';
interface Weather {
  description: string;
  main: string;
}

type WeatherData = {
  id: number;
  name: string;
  weather: Weather[];
  main: {
    temp: number;
    feels_like: number;
  };
  message?: string;
  wind: Wind;
  visibility: number;
};
type Wind = {
  speed: number;
  description: (windSpeed: number) => string;
};


const ClientPage = () => {    
      const [data, setData] = useState<WeatherData | null>(null);
      const weatherDescription = data?.weather?.[0]?.description;
      const weatherMain = data?.weather?.[0]?.main;
      const cityName = data?.name;
      const temperatureCelsius = data?.main?.feels_like;
      const visibility = data?.visibility;
      const windSpeed = data?.wind?.speed;
    const windDescription = windWordDescription(windSpeed ?? 0); 
    const visibilityDescription = visibilityWordDescription(visibility ?? 0);
      const currentMonthInWords = new Date().toLocaleString("default", {
        month: "long",
      });

      useEffect(() => {
        fetch("/api/wd3?location=London")
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data: WeatherData) => {
            console.log(data);
            setData(data);
          })
          .catch((error) => {
            console.error(
              "There has been a problem with your fetch operation:",
              error,
            );
          });
      }, []);

      return (
        <div>
          {data ? (
            <div>
              <p>ID: {data.id}</p>
              <p>City: {cityName}</p>
              <p>Weather main: {weatherMain} </p>
              <p>Weather main-description: {weatherDescription} </p>
              <p>Temperature: {temperatureCelsius}°C</p>
              <p>Visibility description: {visibilityDescription}</p>
              <p>Wind : {windDescription}</p>
              <p>Current Month: {currentMonthInWords}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      );
    };

    export default ClientPage;


{/* <p>
Wind: {windSpeed}m/s {windWordDescription(windSpeed) ?? 'N/A'}
</p> */}

//  just a test