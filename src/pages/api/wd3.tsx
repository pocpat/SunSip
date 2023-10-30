// BE for data fetching
import type { NextApiRequest, NextApiResponse } from 'next'
import {
  Weather,
  WeatherData,
  Wind,
  WindowImg,
  windowPrompt,
} from '../../utils/weatherTypes'

export function windWordDescription(windSpeed: number): string {
  switch (true) {
    case windSpeed < 1:
      return 'Calm'
    case windSpeed < 6:
      return 'Light Air'
    case windSpeed < 12:
      return 'Light Breeze'
    case windSpeed < 20:
      return 'Gentle Breeze'
    case windSpeed < 29:
      return 'Moderate Breeze'
    case windSpeed < 39:
      return 'Fresh Breeze'
    case windSpeed < 50:
      return 'Strong Breeze'
    case windSpeed < 62:
      return 'Near Gale'
    case windSpeed < 75:
      return 'Gale'
    case windSpeed < 89:
      return 'Strong Gale'
    case windSpeed < 103:
      return 'Storm'
    default:
      return 'Hurricane'
  }
}

export function visibilityWordDescription(visibility: number) {
  if (visibility === undefined) return 'No data'
  else if (visibility > 10000) return 'Excellent'
  else if (visibility > 5000) return 'Good'
  else if (visibility > 2000) return 'Moderate'
  else if (visibility > 1000) return 'Poor'
  else return 'Very Poor'
}
export function temperatureWordDescription(temperatureKelvin: number) {
  const temperatureCelsius = temperatureKelvin - 273.15

  if (temperatureCelsius < -20) return 'Freezing'
  else if (temperatureCelsius < 0) return 'Very Cold'
  else if (temperatureCelsius < 10) return 'Cold'
  else if (temperatureCelsius < 20) return 'Cool'
  else if (temperatureCelsius < 30) return 'Mild'
  else if (temperatureCelsius < 35) return 'Warm'
  else if (temperatureCelsius < 40) return 'Hot'
  else return 'Very Hot'
}
export async function processResponce(location: string): Promise<WeatherData> {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&include=current&appid=${process.env.REACT_APP_API_KEY}`,
  )

  if (response.status >= 200 && response.status < 300) {
    const data: WeatherData = (await response.json()) as WeatherData
    return data
  } else {
    throw new Error(`Request failed with status: ${response.status}`)
  }
}

const buildPrompt = (promptData: WeatherData): string => {
  if (!promptData.weather[0]) {
    return 'No weather data available'
  }
  const currentMonthInWords = new Date().toLocaleString('default', {
    month: 'long',
  })
  const temperatureDescription =
    promptData.main.feels_like !== undefined
      ? temperatureWordDescription(promptData.main.feels_like)
      : 'Temperature data not available'

  const visibilityDescription =
    promptData.visibility !== undefined
      ? visibilityWordDescription(promptData.visibility)
      : 'Visibility data not available'
  const windDescription =
    promptData.wind !== undefined
      ? windWordDescription(promptData.wind.speed)
      : 'Wind data not available'
  return `City: ${promptData.name} 
    in ${currentMonthInWords}, 
    weather: ${promptData.weather[0].description}, 
    ${promptData.weather[0].main}, 
    ${visibilityDescription}, 
    ${windDescription}, 
     ${temperatureDescription}° is outside, 
    bush.`
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WeatherData>,
) {
  try {
    const location =
      typeof req.query.location === 'string' ? req.query.location : ''
    const data = await processResponce(location)

    if (
      data.weather !== undefined &&
      data.weather.length > 0 &&
      data.weather[0] !== undefined
    ) {
      const weatherData =
        data.weather?.map((weather) => ({
          description: weather.description,
          main: weather.main,
        })) ?? []
      const prompt = buildPrompt(data)

      res.status(200).json({
        id: data.id,
        name: data.name,
        weather: weatherData,
        main: {
          feels_like: data.main.feels_like,
        },
        wind: data.wind
          ? {
              speed: data.wind.speed,
            }
          : undefined,
        visibility: data.visibility,
        buildPrompt: prompt,
      })
    } else {
      res.status(500).json({
        id: 0,
        name: '',
        message: 'Weather data not found',
        weather: [],
        main: {
          feels_like: 0,
        },
      })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({
      id: 0,
      name: '',
      message: 'Error fetching data from API',
      weather: [],
      main: {
        feels_like: 0,
      },
    })
  }
}
