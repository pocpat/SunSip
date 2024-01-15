// import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { CocktailData } from '~/utils/cocktailTypes'
import { fetchCocktailData } from '~/utils/fetchData'
import Image from 'next/image'
import bg2IMG from '../public/imgPrep/ClearBGdetails.png'
import ScrolledPage2 from './ScrolledPage2'
import CityWeather from './cityWeather'
import Header from './components/Header'

export default function Home() {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const [location, setLocation] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [cocktail, setCocktail] = useState<CocktailData | null>(null)
  const [showCityWeather, setShowCityWeather] = useState(false)
  const router = useRouter()

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setLocation(value)
  }

  const resetShowCityWeather = () => {
    setShowCityWeather(false)
    setLocation('')
  }

  const navigateToCityWeather = async (): Promise<void> => {
    if (location.trim() !== '') {
      const controller = new AbortController()
      try {
        const data = await fetchCocktailData(location, controller.signal)
        setCocktail(data)
        setShowCityWeather(true) // set state to true instead of router.push
      } catch (error) {
        console.error('Failed to navigate:', error)
      }
    }
  }

  const handleClick = () => {
    navigateToCityWeather().catch((error) => {
      console.error('Error navigating:', error)
    })
  }

  return (
    <>
      <header>
        <div >
          {/* <Header /> */}
        </div>
      </header>
      <main className="bg-[#819077] flex flex-col h-screen">
      {/* =================     section input ====================== */}
      <div >
        <div className="flex flex-col items-left justify-start 
        // flex-grow 
        ">
          <h1
            className="
        text-5xl 
        font-bold  text-white 
        xl:text-[5rem] lg:text-[4.5rem] md:text-[4rem] sm:text-[3.5rem]
        my-10 mt-20 px-20"
          >
            Got a city in mind?
          </h1>
          <input
            type="text"
            onChange={onInputChange}
            value={location}
            placeholder=" Share it here!"
            className="sm:w-full md:w-3/4 lg:w-1/2 xl:w-1/2
                h-[5rem] 
                rounded-md border-2
           border-gray-300 p-2 focus:border-transparent 
           focus:outline-none focus:ring-2
            focus:ring-blue-600
            text-5xl font-bold
            mt-2 mb-10 px-20"
          />
          <br></br>
          <div className=' px-20'>
          <button
            className="bg-[#637f79] bg-opacity-50  p-2 rounded-md  xl:text-[4rem] lg:text-[3.5rem] md:text-[3rem] sm:text-[2.5rem]
                my-10
                text-5xl 
                font-bold  text-white 
               
                w-60
               "
            onClick={handleClick}
          >
            GO
          </button>
          </div>
          <div>
            {error ? (
              <p>Error: {error}</p>
            ) : isLoading ? (
              <p>Loading...</p>
            ) : null}
          </div>
        </div>
       <div  className="
       px-20 text-sm
        font-bold  text-white 
        xl:text-[3rem] lg:text-[2.5rem] md:text-[2rem] sm:text-[1.5rem]
        my-10">Explanation what to expect after click the button. </div>
        <div className="h-1/4 overflow-hidden transition-all duration-500 mx-0 px-0">
          {!showCityWeather && (
            <CityWeather resetShowCityWeather={resetShowCityWeather} />
          )}
        </div>
        </div>
      {/* =================     section images   ====================== */}
      <section  >
      <div >
        
        {showCityWeather && (
          <div className="h-screen">
        
            <CityWeather resetShowCityWeather={resetShowCityWeather} />
          </div>
        )}
        </div>
        </section>
      </main>
    </>
  )
}


