// all data for AI on an empty page
import React, { useEffect, useState } from 'react'
import { windWordDescription, visibilityWordDescription } from './api/wd3'
import { Weather, WeatherData, Wind, WindowImg } from '../utils/weatherTypes'
import WeatherDescrComponent from '../components/WeatherDescriptionComponent'

const WeatherDataForPrompt = () => {
  const [data, setData] = useState<WeatherData | null>(null)
  const [location, setLocation] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [displayedLocation, setDisplayedLocation] = useState('')

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

  const updateDisplayedLocation = () => {
    setDisplayedLocation(location)
  }

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/wd3?location=${location}`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const responseData: WeatherData = (await response.json()) as WeatherData
      if (data?.message) {
        setData(null)
        setError(data.message)
      } else {
        setData(responseData)
        setError(null)
      }
      console.log('Fetch data operation completed')
    } catch (error: unknown) {
      console.error(
        'There has been a problem with your fetch operation:',
        error,
      )
      setError(error as string)
    }
    setIsLoading(false)
    updateDisplayedLocation()
  }

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
          <p>City name: {displayedLocation || 'No location specified'}</p>
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
