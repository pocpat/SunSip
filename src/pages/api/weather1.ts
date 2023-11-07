import type { NextApiRequest, NextApiResponse } from 'next'
import { WeatherData } from '../../utils/weatherTypes'



export async function getWeatherInfo(location: string){

    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&include=current&appid=${process.env.REACT_APP_API_KEY}`,
    
    )

    if (response.status >= 200 && response.status < 300) {
      const dataWeatherFromAPI: WeatherData = (await response.json()) as WeatherData
      console.log(dataWeatherFromAPI)
      return dataWeatherFromAPI
    } else {
      throw new Error(`Request failed with status: ${response.status}`)
    }
}
export default async function handlerWeather(
  req: NextApiRequest,
  res: NextApiResponse
) {
    try{
      const location =
      typeof req.query.location === 'string' ? req.query.location : ''

  const weatherInfo = await getWeatherInfo(location);
console.log( 'weather info from OW API on server side is:   ', weatherInfo)

  res.status(200).json(weatherInfo)
}
catch (error) {
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
