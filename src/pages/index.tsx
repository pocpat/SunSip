import Head from 'next/head'
import Link from 'next/link'
import { api } from '~/utils/api'
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
    // ===================== cocktail fetch =====================
  
      const queryLocation = router.query.location as string
  //     useEffect(() => {
  //       let debounceTimeout: NodeJS.Timeout;
    
  //        const fetchData = async () => {
  //   try {
  //     const data = await fetchCocktailData(location);
  //     setCocktail(data);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   } finally {
  //     clearTimeout(debounceTimeout);
  //   }
  // };
    
  //       // Debounce the fetch by 500ms after the user stops typing
  //       debounceTimeout = setTimeout(fetchCocktailData, 500);
    
  //       return () => {
  //         clearTimeout(debounceTimeout); // Clear timeout on component unmount
  //       };
  //     }, [location]);
  useEffect(() => {
   // let debounceTimeout: NodeJS.Timeout;
    const fetchData = async () => {
      try {
        const data = await fetchCocktailData(location);
        setCocktail(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
       // clearTimeout(debounceTimeout);
        console.log(' finally cocktail', cocktail)
      }
    };
   // debounceTimeout = setTimeout(fetchData, 500);
    return () => {
      //clearTimeout(debounceTimeout);
      console.log('return cocktail', cocktail)
    };
  }, [location]);
  
    
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setLocation(value);
      };
      const navigateToCityWeather = () => {
        if (location.trim() !== '' && cocktail) { // Ensure both location and cocktail are available
          router.push({
            pathname: '/cityWeather',
            query: { 
              location: encodeURIComponent(location),
              cocktailData: JSON.stringify(cocktail)
            }
          })
          .catch((error) => {
            console.error('Failed to navigate:', error);
          });
        }
      };










  return (
    <>
      <div className={styles.container}>
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundImage: 'url(/wf.png)',
            backgroundSize: 'cover',
            opacity: 0.5,
            zIndex: -1,
          }}
        />
        <Head>
          <title>Create T3 App</title>
          <meta name="description" content="Generated by create-t3-app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {/* <Header /> */}
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
            <section className="flex flex-col items-center justify-center gap-12 px-4 py-16 ">
              <h3 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
                Got a city in mind?
              </h3>
              <input
                type="text"
                onChange={onInputChange}
                value={location}
                placeholder=" Share it here!"
                className="w-full rounded-md border-2
           border-gray-300 p-2 focus:border-transparent 
           focus:outline-none focus:ring-2
            focus:ring-blue-600"
              />
              <button
                className="bg-blue-600 text-white p-2 rounded-md"
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
            </section>
            <p className="text-2xl text-white">TEST MY STAFF</p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8"></div>
          </div>
        </main>
      </div>
    </>
  )
}
