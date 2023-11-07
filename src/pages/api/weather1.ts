import type { NextApiRequest, NextApiResponse } from 'next'

export async function getWeatherInfo(location: string){

    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&include=current&appid=${process.env.REACT_APP_API_KEY}`,
    
    )


}
export default async function handlerWeather(
  req: NextApiRequest,
  res: NextApiResponse
) {
    try{
    const location =
      typeof req.query.location === 'string' ? req.query.location : '';
  `https://api.openweathermap.org/data/2.5/weather?q=${location}&include=current&appid=${process.env.REACT_APP_API_KEY}`,
  const weatherInfo = await getWeatherInfo(location);


  res.status(200).json(weatherInfo)
}
}
