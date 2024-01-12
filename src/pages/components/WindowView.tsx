import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import router, { useRouter } from 'next/router'
import ModalWeather from './ModalWeather'
import  { WeatherData, WeatherDataResponse } from '~/utils/weatherTypes'
import windowframe from 'public/window-size.png'
import { Transition } from '@headlessui/react'
import { Fragment } from 'react'
import testimg from 'public/testImg.png'


type CityWeatherProps = {
    resetShowCityWeather: () => void;
  };
  
const WindowView = (props: CityWeatherProps) => {

  const [showModalWeather, setShowModalWeather] = useState(false)
  const [weatherData, setWeatherData] = useState<{
    info: WeatherData | null
    image: string | null
  }>({
    info: null,
    image: null,
  })

  const router = useRouter()
  const locationFromRouter = router.query.location as string
  
  const [location, setLocation] = useState('');
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)



  const updateWeatherData = (
    weatherInfo: WeatherData | null,
    weatherImage: string | null,
  ) => {
    setWeatherData({ info: weatherInfo, image: weatherImage })
  }

//   useEffect(() => {
//     // const queryLocation = router.query.location as string
//     if (queryLocation && queryLocation.trim() !== '' && !cocktail) {
//             fetch('/api/cocktail1')
//         .then((response) => response.json())
//         .then((data: CocktailData) => setCocktail(data))
//         .catch((error) => setError('Error fetching data'))
//         .finally(() => setIsLoading(false))
//     }
//   }, [router.query.location, cocktail, router]);

    useEffect(() => {
    const fetchWeatherInfoFromServer = async (
      requestedLocation: string,
    ): Promise<void> => {
      try {
        if (!requestedLocation) return

        const resWeatherInfoFromServer = await fetch(
          `/api/weather1?location=${requestedLocation}`,
        )

        const dataFromWeatherAPI =
          (await resWeatherInfoFromServer.json()) as WeatherDataResponse
        if (dataFromWeatherAPI.weatherInfo && dataFromWeatherAPI.image) {
          updateWeatherData(
            dataFromWeatherAPI.weatherInfo,
            dataFromWeatherAPI.image,
          )
        }
      } catch (error) {
        console.error(
          'There has been a problem with your fetch operation:',
          error,
        )

       
        if (typeof error === 'object' && error !== null && 'message' in error) {
          setError((error as Error).message)
        } else {
          setError('An unknown error occurred')
        }
      }
      setIsLoading(false)
    }
    if (!location && router.query.location) {
      const requestedLocation = router.query.location as string;
      setLocation(requestedLocation);
      void fetchWeatherInfoFromServer(requestedLocation);
    }
  }, [location, router.query.location]);

  // ========================> Weather Modal <============================== //
  const WeatherModal = () => {
    // const handleBackButtonClick = () => {
    //   setShowModalRecipe(false) // Close the modal when the "Back" button is clicked
    // }
    return (
      <div>
        <Transition
          show={showModalWeather}
          enter="transition-opacity duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Fragment>
            <ModalWeather
              isVisible={showModalWeather}
              onClose={() => setShowModalWeather(false)}
              // children={undefined}
            >
              <div className="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-blue-500 bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600 ">
                <div className="flex flex-shrink-0 items-center justify-between rounded-t-md   border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50  ">
                  {/* <!--Modal title--> */}
                  <h5
                    className="flex-1 items-center  text-center text-xl font-medium leading-normal text-primaryd dark:text-neutral-200"
                    id="exampleModalLabel"
                  >

                 <h2> In {weatherData.info ? weatherData.info.name : 'unknown location'} now </h2>
                                  </h5>
                  {/* <!--Close button--> */}
                  <button
                    type="button"
                    className="box-content rounded-none border-none text-primaryd hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                    data-te-modal-dismiss
                    aria-label="Close"
                    onClick={() => setShowModalWeather(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* <!--Modal body--> */}
                <div
                  className="relative flex justify-between items-center justify-center bg-black p-0 first-line:flex-row"
                  data-te-modal-body-ref
                >
                  <div className="flex flex-row">

                        <section className=" INGR mx-8 text-white">
                          <strong>Ingredient 1:</strong>
                          {weatherData.info && (
                            <div>
                              <h2> In {weatherData.info.name} now </h2>
                              <h2>
                                {weatherData.info.weather[0]?.description}
                              </h2>
                              <h2>
                                temperature {weatherData.info.main.feels_like}
                              </h2>
                              <h2>
                                visibility is {weatherData.info.visibility} m
                              </h2>
                              <h2>wind {weatherData.info.wind.speed} m/s</h2>
                            </div>
                          )}
                        </section>

                  </div>
                </div>
                {/* <!--Modal footer--> */}
                <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md   bg-blue-500 border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                  {/* <ButtonBack onClick={handleBackButtonClick} />
                  <ButtonNext href="/input/waiting/editing/common" /> */}
                  <button> Close</button>
                </div>
              </div>
            </ModalWeather>
          </Fragment>
        </Transition>
      </div>
    )
  }


  return (
    <>

   <section className="flex flex-col items-center justify-center py-2 " 
   style={{ marginTop: '120px', width: '110%',  height: '60%', scale: '1.3' }}
   >

            {/* {weatherData.image && (
              <Image
                src={weatherData.image}
                layout="responsive"
                className="lg:w-[60%] bg-blue-300"
                alt="Weather"
              />
            )} */}
 {/* ============== IMG for Test ================== */}
<Image src={testimg} alt="testimg" />
 {/* ============================================== */}
            {/* <div>
              {weatherData.info && (
                <div>
                  <h2> In {weatherData.info.name} now </h2>
                  <h2>{weatherData.info.weather[0]?.description}</h2>
                  <h2> temperature {weatherData.info.main.feels_like}</h2>
                  <h2> visibility is {weatherData.info.visibility} m</h2>
                  <h2>wind {weatherData.info.wind.speed} m/s</h2>
                </div>
              )}
            </div> */}
              <Image 
              src={windowframe} 
              alt="window-frame" 
              className="absolute  z-5 "
              
              />
          </section> 
    
    </>
  )
}

export default WindowView
