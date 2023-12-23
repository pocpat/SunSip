import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { CocktailData } from '~/utils/cocktailTypes'
import { fetchCocktailData } from '~/utils/fetchData'

export default function Home() {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const [location, setLocation] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [cocktail, setCocktail] = useState<CocktailData | null>(null)

  const router = useRouter()

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setLocation(value)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setLocation(value)
  }

  const navigateToCityWeather = () => {
    const fetchDataAndNavigate = async () => {
      if (location.trim() !== '') {
        const controller = new AbortController()
        try {
          const data = await fetchCocktailData(location, controller.signal)
          setCocktail(data)
          await router.push({
            pathname: '/cityWeather',
            query: {
              location: encodeURIComponent(location),
              cocktailData: JSON.stringify(cocktail),
            },
          })
        } catch (error) {
          console.error('Failed to navigate:', error)
        }
      }
    }

    fetchDataAndNavigate().catch((error) =>
      console.error('Error in fetchDataAndNavigate:', error),
    )
  }

  return (
    <>
       
        <main className="bg-[#819077]">
       
          <div  className="container mx-auto p-4">
            <section >
            <div className="w-full mt-20">
        <h3 className="
        text-5xl 
        font-bold  text-white 
        xl:text-[5rem] lg:text-[4.5rem] md:text-[4rem] sm:text-[3.5rem]
        my-10">
                Got a city in mind?
              </h3>
              <input
                type="text"
                onChange={onInputChange}
                value={location}
                placeholder=" Share it here!"
                className="w-1/2 h-[5rem] rounded-md border-2
           border-gray-300 p-2 focus:border-transparent 
           focus:outline-none focus:ring-2
            focus:ring-blue-600
            mt-2 mb-10"
              />
              <br></br>
              <button
                className="bg-[#637f79] bg-opacity-50  p-2 rounded-md  xl:text-[5rem] lg:text-[4.5rem] md:text-[4rem] sm:text-[3.5rem]
                my-10
                text-5xl 
                font-bold  text-white 
               "
                onClick={navigateToCityWeather}
              >
                GO!
              </button>
              <div>
                {error ? (
                  <p>Error: {error}</p>
                ) : isLoading ? (
                  <p>Loading...</p>
                ) : null}
              </div>
              </div>
            </section>
            <p className="text-2xl text-white">TEST MY STAFF</p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8"></div>
          </div>
          
        </main>
     
    </>
  )
}
