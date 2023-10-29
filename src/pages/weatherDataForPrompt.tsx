// all data for AI on an empty page
import React, { useEffect, useState } from 'react'
import { 
  windWordDescription, 
  visibilityWordDescription,  
    //=================== *** ===================
  processResponce } from './api/wd3'

  import { Weather, type WeatherData, Wind, type WindowImg } from '../utils/weatherTypes';


  //=================== *** ===================
async function fetchWeatherData(location: string): Promise<WeatherData> {
  return await processResponce(location);
}
  //==========================================






const WeatherDataForPrompt = () => {
  const [data, setData] = useState<WeatherData | null>(null)
  const [location, setLocation] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [displayedLocation, setDisplayedLocation] = useState('')
  const [imgWD, setImgWD] = useState<WindowImg | null>(null)

  const weatherDescription = data?.weather?.[0]?.description
  const weatherMain = data?.weather?.[0]?.main
  // const cityName = data?.name;
  const temperatureCelsius = data?.main?.feels_like
  const visibility = data?.visibility
  const windSpeed = data?.wind?.speed
  const windDescription = windWordDescription(windSpeed ?? 0)
  const visibilityDescription = visibilityWordDescription(visibility ?? 0)
  const currentMonthInWords = new Date().toLocaleString('default', {
    month: 'long',
  })

  

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setLocation(value)
    // if (value === "") return;
    // WeatherDataForPrompt();
  }
  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/wd3?location=${location}`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      // to chenge Weather data for IMG
      const dataWindow: WindowImg = (await response.json()) as WindowImg
      if (dataWindow?.errMessage) {
        setImgWD(null)
        setError(dataWindow.errMessage)
      } else {
        setImgWD(dataWindow)
        setError(null)
      }
      console.log('Fetch window-img operation is completed')
    } catch (error: unknown) {
      console.error(
        'There has been a problem with your fetch operation:',
        error,
      )
      setError(error as string)
    }
    setIsLoading(false)
  }
  //=================== *** ===================
  function buildPrompt(weatherData: WeatherData): string {
    // Build your prompt using weatherData here
    let prompt1 = `Weather report for ${weatherData.name} (ID: ${weatherData.id}):\n`;
    prompt1 += `Weather: ${weatherData.weather.map((w) => w.description).join(', ')}\n`;
    prompt1 += `Feels like: ${weatherData.main.feels_like}°C\n`;
    prompt1 += `Wind speed: ${weatherData.wind.speed}\n`;
    prompt1 += `Wind description: ${weatherData.wind.description}\n`;
    prompt1 += `Visibility: ${weatherData.visibility}\n`;
  
    return prompt1;
  }
  //==========================================




  return (
    <div>
      <input
        type="text"
        value={location}
        onChange={onInputChange}
        placeholder="Got a city in mind? Share it here!"
        className="w-full rounded-l-md border-2
           border-gray-300 p-2 focus:border-transparent 
           focus:outline-none focus:ring-2
            focus:ring-blue-600"
      />
      <button
        className="bg-blue-600 text-white p-2 rounded-r-md"
        onClick={() => {
          void fetchData()
        }}
      >
        Search
      </button>
      <div>
        {error ? <p>Error: {error}</p> : isLoading ? <p>Loading...</p> : null}
      </div>
      {data ? (
        <div>
          <p>ID: {data.id}</p>

          <div className="mt-10 flex  md:mt-4"></div>

          {/* <input type="text" value={location} onChange={e => setLocation(e.target.value)}/> */}
          <p>City name: {displayedLocation}</p>
          <p>Weather main: {weatherMain} </p>
          <p>Weather main-description: {weatherDescription} </p>
          <p>Temperature: {temperatureCelsius}°C</p>
          <p>Visibility description: {visibilityDescription}</p>
          <p>Wind : {windDescription}</p>
          <p>Current Month: {currentMonthInWords}</p>
        </div>
      ) : null}
    </div>
  )
}

export default WeatherDataForPrompt

// // to chenge Weather data for IMG
// const data: WeatherData = await response.json() as WeatherData;
// if (data?.message) {
//   setData(null);
//   setError(data.message);
// } else {
//   setData(data);
//   setError(null);
//   setDisplayedLocation(location);
// }
// console.log('Fetch data operation completed');
