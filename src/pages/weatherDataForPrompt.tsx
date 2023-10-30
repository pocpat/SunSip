import React, { useState,  useEffect } from 'react';
import { WeatherData } from '../utils/weatherTypes';
import { fetchWeatherData } from '../utils/weatherUtils'; 
import WeatherDescrComponent from '../components/WeatherDescriptionComponent';


interface ApiResponse {
  imageDataUrl: string;
  
}


const WeatherDataForPrompt = () => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageDataUrl, setImageDataUrl] = useState('');


// Call API to get the imageDataUrl
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('/api/wd3');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = (await response.json()) as ApiResponse;
      setImageDataUrl(data.imageDataUrl);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  fetchData().catch(error => console.error('Error in fetchData:', error));
}, []);


  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setLocation(value);
  };

  const fetchData = async () => {
    setIsLoading(true);
    const weatherData = await fetchWeatherData(location); // Use the fetchWeatherData function
    if (weatherData) {
      setData(weatherData);
      setError(null);
    } else {
      setData(null);
      setError('Error fetching weather data.');
    }
    setIsLoading(false);
  };

  return (
    <div>
      <input
        type="text"
        value={location}
        onChange={onInputChange}
        placeholder="Got a city in mind? Share it here!"
        className="w-full rounded-l-md border-2 border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <button
        className="bg-blue-600 text-white p-2 rounded-r-md"
        onClick={() => {
          void fetchData();
        }}
      >
        Search
      </button>
      <div>
        {error ? <p>Error: {error}</p> : isLoading ? <p>Loading...</p> : null}
      </div>
      {data ? (
        <WeatherDescrComponent data={data} />
      ) : null}
       <div>
    {imageDataUrl && <img src={imageDataUrl} alt="Generated" />}
  </div>
    </div>
  );
};

export default WeatherDataForPrompt;
