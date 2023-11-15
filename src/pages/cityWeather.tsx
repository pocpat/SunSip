import React, { useEffect, useState } from 'react'
import window from '/public/windowView.png'
import Image from 'next/image'
import Link from 'next/link'
import Header from './components/Header'
import { CocktailData } from '~/utils/cocktailTypes'
import ModalRecipe from './components/ModalRecipe'
import { Transition } from '@headlessui/react'
import { Fragment } from 'react'
import modalIMG from '/public/modalIMG6.png'
import testImg from '/public/testImg.png'
import styles from '../styles/Home.module.css'
import wf from '/public/wf.png'
import ModalWeather from './components/ModalWeather'

const CityWeather = () => {
  const [cocktail, setCocktail] = useState<CocktailData | null>(null)
  const [showModalRecipe, setShowModalRecipe] = useState(false)
  const [showModalWeather, setShowModalWeather] = useState(false)

  useEffect(() => {
    fetch('/api/cocktail1')
      .then((response) => response.json())
      .then((data: CocktailData) => setCocktail(data))
      .catch((error) => console.error('Error fetching data:', error))
  }, [])





  // ======================>  Create Cocktail Modal <============================== //
  const CocktailMenuModal = () => {
    const handleBackButtonClick = () => {
      setShowModalRecipe(false) // Close the modal when the "Back" button is clicked
    }
    return (
      <div>
        <Transition
          show={showModalRecipe}
          enter="transition-opacity duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Fragment>
            <ModalRecipe
              isVisible={showModalRecipe}
              onClose={() => setShowModalRecipe(false)}
              // children={undefined}
            >
              <div className="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-blue-500 bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600 ">
                <div className="flex flex-shrink-0 items-center justify-between rounded-t-md   border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50  ">
                  {/* <!--Modal title--> */}
                  <h5
                    className="flex-1 items-center  text-center text-xl font-medium leading-normal text-primaryd dark:text-neutral-200"
                    id="exampleModalLabel"
                  >
                    {cocktail && <p> {cocktail.strDrink}</p>}
                  </h5>
                  {/* <!--Close button--> */}
                  <button
                    type="button"
                    className="box-content rounded-none border-none text-primaryd hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                    data-te-modal-dismiss
                    aria-label="Close"
                    onClick={() => setShowModalRecipe(false)}
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
                    <section>
                      <Image
                        src={modalIMG}
                        alt="drink image"
                        width={300}
                        height={300}
                      />
                    </section>
                    <div className="flex flex-col">
                      <div className="flex flex-row">
                        <section className=" INGR mx-8 text-white">
                          <strong>Ingredient 1:</strong>
                          <br/>
                          {cocktail?.strIngredient2 && (
                            <>
                              <strong>Ingredient 2:</strong>
                            
                            </>
                          )}
                       <br/>
                          {cocktail?.strIngredient3 && (
                            <>
                              <strong>Ingredient 3:</strong>
                             
                            </>
                          )}
                         <br/>
                          {cocktail?.strIngredient4 && (
                            <>
                              <strong>Ingredient 4:</strong>
                            
                            </>
                          )}
                          <br/>
                          {cocktail?.strIngredient5 && (
                            <>
                              <strong>Ingredient 5:</strong>
                             
                            </>
                          )}
                          <br/>
                          {cocktail?.strIngredient6 && (
                            <>
                              <strong>Ingredient 6:</strong>
                           
                            </>
                          )}
                        <br/>
                        </section>
                        <section className="PROD text-white">
                          {cocktail && <p> {cocktail.strIngredient1}</p>}
                          {cocktail && <p> {cocktail.strIngredient2}</p>}
                          {cocktail && <p> {cocktail.strIngredient3}</p>}
                          {cocktail && <p> {cocktail.strIngredient4}</p>}
                          {cocktail && <p> {cocktail.strIngredient5}</p>}
                          {cocktail && <p> {cocktail.strIngredient6}</p>}
                        </section>
                      </div>
                      <p className=" text-white my-3 ml-8 w-[300px]">
                        <strong>Instructions:</strong>

                        {cocktail && <p> {cocktail.strInstructions}</p>}
                      </p>
                    </div>
                  </div>
                </div>
                {/* <!--Modal footer--> */}
                <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md   bg-blue-500 border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                  {/* <ButtonBack onClick={handleBackButtonClick} />
                    <ButtonNext href="/input/waiting/editing/common" /> */}
                  <button> Close</button>
                </div>
              </div>
            </ModalRecipe>
          </Fragment>
        </Transition>
      </div>
    )
  }

  // ========================================================================= //
  // ========================================================================= //
  
  // ======================>  Create Weather Modal <============================== //
const WeatherModal = () => {
  const handleBackButtonClick = () => {
    setShowModalWeather(false) // Close the modal when the "Back" button is clicked
  }
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
                  <section>
                    <Image
                      src={modalIMG}
                      alt="drink image"
                      width={300}
                      height={300}
                    />
                  </section>
                  <div className="flex flex-col">
                    <div className="flex flex-row">
                      <section className=" INGR mx-8 text-white">
                        <strong>Ingredient 1:</strong>
                        <br/>
                        {cocktail?.strIngredient2 && (
                          <>
                            <strong>Ingredient 2:</strong>
                          
                          </>
                        )}
                     <br/>
                      
                      </section>
                    
                    </div>
                   
                  </div>
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
    <div>
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
        <Header />
        <Link href="/">
          <p>Back to home</p>
        </Link>
        <div className="grid grid-cols-3 w-full">
          <section className="flex flex-col items-center justify-center py-2 bg-green-500">
            left
            <div className="   rounded-3xl border-solid border-accentd ">
                <a
                  aria-current="page"
                  className="text m-0  flex h-[100px] w-48 items-center justify-center  rounded-3xl border-solid  border-accentd bg-primaryd p-4  text-accentd ring-2  ring-tertiaryd  hover:bg-[#D9E5E2] "
                  href="#"
                  onClick={() => setShowModalRecipe(true)}
                >
                  <h3 className="text-2xl font-bold">Get Weather</h3>
                </a>
              </div>
            <button>Get Themperature</button>
            <button> back</button>
          </section>
          <section className="flex flex-col items-center justify-center py-2 bg-blue-500">
            center
            <Image
              src={window}
              alt="window_view"
              width={600}
              height={600}
              className="mt-200"
            />
          </section>
          <section className="flex flex-col items-center justify-center py-2 bg-yellow-500">
            right
            <div className="m-5 rounded-3xl bg-gradient-to-t from-tertiaryd to-secondaryd p-1 shadow-xl ">
              <div className="   rounded-3xl border-solid border-accentd ">
                <a
                  aria-current="page"
                  className="text m-0  flex h-[100px] w-48 items-center justify-center  rounded-3xl border-solid  border-accentd bg-primaryd p-4  text-accentd ring-2  ring-tertiaryd  hover:bg-[#D9E5E2] "
                  href="#"
                  onClick={() => setShowModalRecipe(true)}
                >
                  <h3 className="text-2xl font-bold">Get Recipe</h3>
                </a>
                {showModalRecipe && <CocktailMenuModal />}
              </div>
            </div>
            {cocktail && (
              <div>
                <p>
                  <strong>Drink Name:</strong> {cocktail.strDrink}
                </p>
                {/* <p>
                <strong>Glass:</strong> {cocktail.strGlass}
              </p> */}
              </div>
            )}
            <p>
              <Image
                src={cocktail ? cocktail.strDrinkThumb : '/modalIMG6.png'}
                alt="drink image"
                width={200}
                height={200}
              />
            </p>
          </section>
        </div>

        <div className=" flex flex-row  items-center  justify-center ">
          {/* <div className="m-5 rounded-3xl bg-gradient-to-t from-tertiaryd to-secondaryd p-1 shadow-xl ">
            <div className="   rounded-3xl border-solid border-accentd ">
              <a
                aria-current="page"
                className="text m-0  flex h-[100px] w-48 items-center justify-center  rounded-3xl border-solid  border-accentd bg-primaryd p-4  text-accentd ring-2  ring-tertiaryd  hover:bg-[#D9E5E2] "
                href="#"
                onClick={() => setShowModalRecipe(true)}
              >
                <h3 className="text-2xl font-bold">Get Receipt</h3>
              </a>
              {showModalRecipe && <CocktailMenuModal />}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}
export default CityWeather
