import React, { useState } from 'react';
import { WeatherData } from '../utils/weatherTypes';
import { fetchWeatherData } from '../utils/weatherUtils'; 
import WeatherDescrComponent from '../components/WeatherDescriptionComponent';

const WeatherDataForPrompt = () => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
    </div>
  );
};

export default WeatherDataForPrompt;
