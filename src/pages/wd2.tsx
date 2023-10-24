// pink client side page
import React, { useState } from 'react'
interface Weather {
  description: string
  main: string
}
interface Option {
  id: number
  name: string
  weather: Weather[]
  main: {
    feels_like: number
  }
  message?: string
  wind?: { speed: number }
  visibility?: number
  temperature?: number
  windSpeed?: number
}

const Wd2 = (): JSX.Element => {
  const [location, setLocation] = useState<string>('')
  const [options, setOptions] = useState<Option[]>([])
  const [data, setData] = useState<Option | null>(null)
  const weatherDescription = data?.weather?.[0]?.description
  const cityName = data?.name
  const temperature = data?.main?.feels_like
  const windSpeed = data?.wind?.speed
  const visibility = data?.visibility

  const getSearchOptions = (value: string) => {
    try {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${process.env.REACT_APP_API_KEY}`,
      )
        .then((res) => {
          if (!res.ok) {
            if (res.status === 404) {
              setOptions([])
            } else {
              throw new Error(`Request failed with status: ${res.status}`)
            }
          } else {
            return res.json()
          }
        })
        .then(
          (data: {
            id: number
            name: string
            main?: { feels_like: number }
            wind?: { speed: number }
            visibility?: number
            temperature?: number
            windSpeed?: number
            weather?: Weather[]
          }) => {
            if (data) {
              const newOptions: Option[] = [
                {
                  id: data.id,
                  name: data.name,
                  main: {
                    feels_like: data.main?.feels_like ?? 0,
                  },
                  wind: {
                    speed: data.wind?.speed ?? 0,
                  },
                  visibility: data.visibility ?? 0,
                  temperature: 0,
                  windSpeed: 0,
                  weather: [],
                },
              ]
              setOptions(newOptions)
            }
          },
        )
        .catch((error) => {
          // Handle API request error
          console.error(error)
        })
    } catch (error) {
      // Handle other errors
      console.error(error)
    }
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setLocation(value)
    // if (value === "") return;
    // getSearchOptions(value);
  }

  return (
    <div className="flex h-[100vh] w-full items-center justify-center bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400">
      <section
        className="
       text-zink-700 flex h-full w-full flex-col items-center justify-center rounded-md bg-white bg-opacity-20 p-4 text-center 
       shadow-md backdrop-blur-lg md:max-w-[500px]   md:px-10 lg:h-[500px] lg:p-24
       "
      >
        <h1 className="text-4xl font-thin">Weather Forcast</h1>
        <p>Enter a place </p>
        <div className="mt-10 flex  md:mt-4">
          <input
            type="text"
            value={location}
            onChange={onInputChange}
            placeholder="Enter a place"
            className="w-full rounded-l-md border-2
           border-gray-300 p-2 focus:border-transparent 
           focus:outline-none focus:ring-2
            focus:ring-blue-600"
          />
          <button
            className="bg-blue-600 text-white p-2 rounded-r-md"
            onClick={() => getSearchOptions(location)}
          >
            Search
          </button>
        </div>

        {options.map((option: Option) => (
          <p key={option.id}>{option.name}</p>
        ))}
      </section>
    </div>
  )
}

export default Wd2
