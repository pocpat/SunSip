import { NextApiRequest, NextApiResponse } from 'next';
import { processResponce, WeatherData, windWordDescription } from './weatherDataForPrompt'; // Import necessary functions and types
import { Weather, WeatherData, Wind, WindowImg } from '../../utils/weatherTypes';






export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WeatherData>,
) {
  try {
    const location =
      typeof req.query.location === 'string' ? req.query.location : '';
    const data = await processResponce(location);

    // Define temperatureCelsius and windSpeed based on your requirements
    const temperatureCelsius = data?.main?.feels_like;
    const windSpeed = data?.wind?.speed;

    if (
      data.weather !== undefined &&
      data.weather.length > 0 &&
      data.weather[0] !== undefined
    ) {
      // Build the prompt
      const promptData: WeatherData = {
        id: data.id,
        name: data.name,
        weather: data.weather,
        main: {
          feels_like: temperatureCelsius,
        },
        wind: {
          speed: windSpeed,
        },
        visibility: data.visibility,
      };

      // Call your handlerSD function to generate an image
      const generatedImg = handlerSD(buildPrompt(promptData));

      res.status(200).json({ img: generatedImg });
    } else {
      res.status(500).json({
        id: 0,
        name: '',
        message: 'Weather data not found',
        weather: [],
        main: {
          feels_like: 0,
        },
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      id: 0,
      name: '',
      message: 'Error fetching data from API',
      weather: [],
      main: {
        feels_like: 0,
      },
    });
  }
}
