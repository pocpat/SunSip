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

  // ============================================= OLD =============================================

  // const navigateToCityWeather = () => {
  //   const fetchDataAndNavigate = async () => {
  //     if (location.trim() !== '') {
  //       const controller = new AbortController()
  //       try {
  //         const data = await fetchCocktailData(location, controller.signal)
  //         setCocktail(data)
  //         await router.push({
  //           pathname: '/cityWeather',
  //           query: {
  //             location: encodeURIComponent(location),
  //             cocktailData: JSON.stringify(cocktail),
  //           },
  //         })
  //       } catch (error) {
  //         console.error('Failed to navigate:', error)
  //       }
  //     }
  //   }

  //   fetchDataAndNavigate().catch((error) =>
  //     console.error('Error in fetchDataAndNavigate:', error),
  //   )
  // }

  // ============================================= OLD 2 =============================================

  // const navigateToCityWeather = async (): Promise<void> => {
  //   if (location.trim() !== '') {
  //     const controller = new AbortController();
  //     try {
  //       const data = await fetchCocktailData(location, controller.signal);
  //       setCocktail(data);

  //       // Navigate to the CityWeather page
  //       await router.push({
  //         pathname: '/cityWeather',
  //         query: {
  //           location: encodeURIComponent(location),
  //           cocktailData: JSON.stringify(data),
  //         },
  //       });

  //       // Wait for a short duration for the navigation transition
  //       await new Promise((resolve) => {
  //         setTimeout(resolve, 500); // Resolve after 500 milliseconds
  //       });

  //       // Scroll to the top of the CityWeather component
  //       const topElement = document.getElementById('topElement');
  //       if (topElement) {
  //         topElement.scrollIntoView({ behavior: 'smooth' });
  //       }
  //     } catch (error) {
  //       console.error('Failed to navigate:', error);
  //     }
  //   }
  // };

  // =================================new=================================
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
      {/* <Header /> */}
      <main className="bg-[#819077] flex flex-col h-screen">
        <div className="flex flex-col items-left justify-start flex-grow">
          <h1
            className="
        text-5xl 
        font-bold  text-white 
        xl:text-[5rem] lg:text-[4.5rem] md:text-[4rem] sm:text-[3.5rem]
        my-10"
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
            mt-2 mb-10"
          />
          <br></br>
          <button
            className="bg-[#637f79] bg-opacity-50  p-2 rounded-md  xl:text-[4rem] lg:text-[3.5rem] md:text-[3rem] sm:text-[2.5rem]
                my-10
                text-5xl 
                font-bold  text-white 
               "
            onClick={handleClick}
          >
            GO
          </button>
          <div>{error ? <p>Error: {error}</p> : isLoading ? <p>Loading...</p> : null}</div>
        </div>
        <div className="h-1/4 overflow-hidden transition-all duration-500">
  {!showCityWeather && <CityWeather resetShowCityWeather={resetShowCityWeather} />}
</div>
      </main>
      {showCityWeather && (
  <div className="h-screen">
    <Image
      src="/path-to-your-image.jpg" // Path to your image
      alt="Background Image"
      layout="fill"
      objectFit="cover"
    />
    <CityWeather resetShowCityWeather={resetShowCityWeather} />
  </div>
)}
    </>
  );
}

// =================== old return ===================

// return (
//   <>
//      {/* <Header /> */}
//       <main className="bg-[#819077] relative">

//         <div  className="container mx-auto p-4">
//           <section >
//           <div className="w-full mt-20">
//       <h1 className="
//       text-5xl
//       font-bold  text-white
//       xl:text-[5rem] lg:text-[4.5rem] md:text-[4rem] sm:text-[3.5rem]
//       my-10">
//               Got a city in mind?
//             </h1>
//             <input
//               type="text"
//               onChange={onInputChange}
//               value={location}
//               placeholder=" Share it here!"
//               className="sm:w-full md:w-3/4 lg:w-1/2 xl:w-1/2
//               h-[5rem]
//               rounded-md border-2
//          border-gray-300 p-2 focus:border-transparent
//          focus:outline-none focus:ring-2
//           focus:ring-blue-600
//           text-5xl font-bold
//           mt-2 mb-10"
//             />
//             <br></br>
//             <button
//               className="bg-[#637f79] bg-opacity-50  p-2 rounded-md  xl:text-[4rem] lg:text-[3.5rem] md:text-[3rem] sm:text-[2.5rem]
//               my-10
//               text-5xl
//               font-bold  text-white
//              "
//               onClick={handleClick}
//             >
//               GO
//             </button>
//             <div>
//               {error ? (
//                 <p>Error: {error}</p>
//               ) : isLoading ? (
//                 <p>Loading...</p>
//               ) : null}
//             </div>
//             </div>
//           </section>
//           <p className="text-2xl text-white">TEST MY STAFF</p>

//           <div className="bg-image-under">

//   </div>
//         </div>

//       </main>
//       {showCityWeather && <CityWeather resetShowCityWeather={resetShowCityWeather} />}
//   </>
// )
