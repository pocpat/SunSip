import type { NextApiRequest, NextApiResponse } from 'next'
import { WeatherData } from '../../utils/weatherTypes'
import axios from 'axios'
import fs from 'fs'

type Txt2ImgResponse = {
  images: string[]
}
export async function getWeatherInfo(location: string) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&include=current&appid=${process.env.REACT_APP_API_KEY}`,
  )

  if (response.status >= 200 && response.status < 300) {
    const dataWeatherFromAPI: WeatherData =
      (await response.json()) as WeatherData
    console.log('dataWeatherFromAPI is:  ', dataWeatherFromAPI)
    return dataWeatherFromAPI
  } else {
    throw new Error(`Request failed with status: ${response.status}`)
  }
}
export default async function handlerWeather(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const location =
      typeof req.query.location === 'string' ? req.query.location : ''

    const weatherInfo = await getWeatherInfo(location)
    //===================================================================================================
    //  Calculate and transform the weather data into descriptive strings
    const windSpeed = weatherInfo.wind.speed
    function windWordDescription(windSpeed: number): string {
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
    const visibility = weatherInfo.visibility
    function visibilityWordDescription(visibility: number) {
      if (visibility === undefined) return 'No data'
      else if (visibility > 10000) return 'Excellent'
      else if (visibility > 5000) return 'Good'
      else if (visibility > 2000) return 'Moderate'
      else if (visibility > 1000) return 'Poor'
      else return 'Very Poor'
    }

    const temperature = weatherInfo.main.feels_like
    function temperatureWordDescription(temperature: number) {
      if (temperature < 250) {
        return "It's very cold outside."
      } else if (temperature >= 250 && temperature < 280) {
        return "It's cool."
      } else if (temperature >= 280 && temperature < 298) {
        return "It's moderately cool outside."
      } else if (temperature === 298) {
        return "It's mild temperature outside."
      } else if (temperature === 300) {
        return "It's pleasant outside."
      } else if (temperature === 310) {
        return "It's warm outside."
      } else if (temperature >= 315) {
        return "It's hot outside."
      } else {
        return 'The temperature is not in the provided range.'
      }
    }
    const mainDescription = weatherInfo.weather[0]?.description
    const currentMonthInWords = new Date().toLocaleString('default', {
      month: 'long',
    })
    const name = weatherInfo.name
    //===================================================================================================
    // Build a prompt for the image generator
    const promptWeather = `Show an image of 
    a city ${name} in ${currentMonthInWords}
    with ${windWordDescription(windSpeed)} weather, 
    ${visibilityWordDescription(visibility)} visibility. 
   ${temperatureWordDescription(weatherInfo.main.feels_like)}
   ${mainDescription},
   bushes.
   `
    console.log('promptWeather is:  ', promptWeather)
    //===================================================================================================
    
  //  send the prompt to the Stable Diffusion API

    const fetchWeatherIMG = async (promptWeather: string) => {
      const url = 'http://127.0.0.1:7860/sdapi/v1/txt2img'

      const payloadWindow = {
        prompt: promptWeather,
      }

      // Send the payload to the API
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payloadWindow),
      })
        .then((response) => response.json())
        .then((data: Txt2ImgResponse) => {
          if (typeof data.images[0] === 'string') {
            const imageBuffer = Buffer.from(data.images[0], 'base64')
            fs.writeFileSync('./public/output.png', imageBuffer)
            // const imageWindow = Image.open(io.BytesIO(base64.b64decode(r['images'][0])));
            // image.save('output.png');

            console.log('data.images[0] is:  ', 'output.png')
          } else {
            console.error('Expected a string but got', typeof data.images[0])
          }
        })
        .catch((error) => {
          console.error('Error:', error)
        })
  }
  await fetchWeatherIMG(promptWeather)

    res.status(200).json(
      // output to client . example
      {
        image: './public/output.png',
      },
    )
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



// ==========================================================
// Assuming `largeString` is the large string you're working with
            // const largeString = "your large string here";

// You can convert the string to a Buffer using Buffer.from()
           // const buffer = Buffer.from(largeString);

// You can then convert the Buffer back to a string when needed
          // const string = buffer.toString();