import React, { useState } from 'react'
import { WeatherData } from '../utils/weatherTypes'
import { windWordDescription, visibilityWordDescription, temperatureWordDescription } from '../pages/api/wd3'



const windDescription = (speed: number) => {
  if (speed < 1) {
    return 'Calm'
  } else if (speed < 3) {
    return 'Light air'
  } else if (speed < 7) {
    return 'Light breeze'
  } else if (speed < 12) {
    return 'Gentle breeze'
  } else if (speed < 20) {
    return 'Moderate breeze'
  } else if (speed < 29) {
    return 'Fresh breeze'
  } else if (speed < 39) {
    return 'Strong breeze'
  } else if (speed < 50) {
    return 'High wind'
  } else if (speed < 62) {
    return 'Gale'
  } else if (speed < 75) {
    return 'Strong gale'
  } else if (speed < 89) {
    return 'Storm'
  } else if (speed < 103) {
    return 'Violent storm'
  } else {
    return 'Hurricane'
  }
}

const visibilityDescription = (visibility: number) => {
  if (visibility < 50) {
    return 'Thick fog'
  } else if (visibility < 200) {
    return 'Fog'
  } else if (visibility < 500) {
    return 'Mist'
  } else if (visibility < 1000) {
    return 'Haze'
  } else if (visibility < 5000) {
    return 'Moderate visibility'
  } else if (visibility < 10000) {
    return 'Good visibility'
  } else {
    return 'Excellent visibility'
  }
}

const WeatherDescrComponent = ({ data }: { data: WeatherData | null }) => {
  //   const [data, setData] = useState<WeatherData | null>(null)
  const [location, setLocation] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [displayedLocation, setDisplayedLocation] = useState('')

  const cityName = data?.name
  const weatherDescription = data?.weather?.[0]?.description
  const weatherMain = data?.weather?.[0]?.main
  const temperatureCelsius = data?.main?.feels_like;
  const temperatureDescription = temperatureCelsius ? temperatureWordDescription(temperatureCelsius) : 'Temperature data not available';  const visibility = data?.visibility
  const windSpeed = data?.wind?.speed
  const wind = windDescription(windSpeed ?? 0)
  const visibilityDesc = visibilityDescription(visibility ?? 0)
  const currentMonthInWords = new Date().toLocaleString('default', {
    month: 'long',
  })
  const windowPrompt = 
  `
  City: ${cityName} 
  in ${currentMonthInWords}, 
  weather: ${weatherDescription}, 
  ${weatherDescription}, 
  ${visibilityDesc}, 
  ${wind}, 
   ${temperatureDescription} is outside, 
   bush.`

  return (
    <div>
      {data ? (
        <div>
          <p>ID: {data.id}</p>

          <div className="mt-10 flex  md:mt-4"></div>

          {/* <input type="text" value={location} onChange={e => setLocation(e.target.value)}/> */}
          <p>City name: {cityName}</p>
          <p>Weather main: {weatherMain} </p>
          <p>Weather main-description: {weatherDescription} </p>
          <p> {temperatureDescription} is outside</p>
          <p>Visibility description: {visibilityDesc}</p>
          <p>Wind : {wind}</p>
          <p>Current Month: {currentMonthInWords}</p>
          <p>Window Prompt: {windowPrompt}</p>
          <p>THIS IS TEXT FROM COMPONENT</p>
        </div>
      ) : null}
    </div>
  )
}

export default WeatherDescrComponent
