// BE for data fetching
import type { NextApiRequest, NextApiResponse } from 'next'


interface Weather {
  description: string
  main: string
}

interface WeatherData {
  id: number
  name: string
  weather: Weather[]
  main: {
    feels_like: number
  }
  message?: string
  wind?: { speed: number }
  visibility?: number
}
type Wind = {
  speed: number
  description: (windSpeed: number) => string
}

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
  if (visibility === undefined) return 'No data';
  else if (visibility > 10000) return 'Excellent';
  else if (visibility > 5000) return 'Good';
  else if (visibility > 2000) return 'Moderate';
  else if (visibility > 1000) return 'Poor';
  else return 'Very Poor';
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WeatherData>,
) {
  try {
    const location =
      typeof req.query.location === 'string' ? req.query.location : ''
    const data = await processResponce(location)
    const temperatureKelvin = data?.main?.feels_like
    const temperatureCelsius = Math.floor(
      temperatureKelvin ? temperatureKelvin - 273.15 : 0,
    )
    // const windSpeed = data?.wind?.speed ?? 0
    const windSpeed = parseFloat(req.query.windSpeed as string);
    const description = windWordDescription(windSpeed);

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

      res.status(200).json({
        id: data.id,
        name: data.name,
        weather: weatherData,
        main: {
          feels_like: temperatureCelsius,
        },
        wind: {
          speed: windSpeed,
          // description: windWordDescription,
        } as Wind,
        visibility: data.visibility,
      
      })
      console.log(data)
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
