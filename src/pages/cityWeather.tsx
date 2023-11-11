import React, { useEffect, useState } from 'react'
import window from '/public/windowView.png'
import Image from 'next/image'
import Link from 'next/link'
import Header from './components/Header'
import { CocktailData } from '~/utils/cocktailTypes'
import Modal1 from './components/Modal1'
import { Transition } from '@headlessui/react'
import { Fragment } from 'react'
import modalIMG from '/public/modalIMG6.png'

const CityWeather = () => {
  const [cocktail, setCocktail] = useState<CocktailData | null>(null)
  const [showModal1, setShowModal1] = useState(false)

  useEffect(() => {
    fetch('/api/cocktail1')
      .then((response) => response.json())
      .then((data: CocktailData) => setCocktail(data))
      .catch((error) => console.error('Error fetching data:', error))
  }, [])
  // ======================>  Create New Course Modal <============================== //
  const CocktailMenuModal = () => {
    const handleBackButtonClick = () => {
      setShowModal1(false) // Close the modal when the "Back" button is clicked
    }
    return (
      <div>
        <Transition
          show={showModal1}
          enter="transition-opacity duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Fragment>
            <Modal1
              isVisible={showModal1}
              onClose={() => setShowModal1(false)}
              // children={undefined}
            >
              <div className="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-blue-500 bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600 ">
                <div className="flex flex-shrink-0 items-center justify-between rounded-t-md   border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50  ">
                  {/* <!--Modal title--> */}
                  <h5
                    className="flex-1 items-center  text-center text-xl font-medium leading-normal text-primaryd dark:text-neutral-200"
                    id="exampleModalLabel"
                  >
                    {cocktail.strDrink}
                  </h5>
                  {/* <!--Close button--> */}
                  <button
                    type="button"
                    className="box-content rounded-none border-none text-primaryd hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                    data-te-modal-dismiss
                    aria-label="Close"
                    onClick={() => setShowModal1(false)}
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
                  <div className='flex flex-row'>
                  <section>

                  <Image
                src= {modalIMG}
                alt="drink image"
                width={300}
                height={300}
              />

                  </section>
                  <div className='flex flex-col'>
                    <div className='flex flex-row'>
                  <section className=' INGR mx-8 text-white'>
                  <strong>Ingredient 1:</strong><br></br>
                  {cocktail && <strong>Ingredient 2:</strong>}<br></br>
                  {cocktail &&  <strong>Ingredient 3:</strong>}<br></br>
                  {cocktail &&  <strong>Ingredient 4:</strong>}<br></br>
                  {cocktail &&  <strong>Ingredient 5:</strong>}<br></br>
                  {cocktail && <strong>Ingredient 6:</strong>}<br></br>
                  </section>
                  <section className='PROD text-white'> 
                  {cocktail && ( <p> {cocktail.strIngredient1}</p>)}
                  {cocktail && ( <p> {cocktail.strIngredient2}</p>)}
                  {cocktail && ( <p> {cocktail.strIngredient3}</p>)}
                  {cocktail && ( <p> {cocktail.strIngredient4}</p>)}
                  {cocktail && ( <p> {cocktail.strIngredient5}</p>)}
                  {cocktail && ( <p> {cocktail.strIngredient6}</p>)}
                  </section>
                  </div>
                  <p className=' text-white my-3 ml-8 w-[300px]'>
                          <strong>Instructions:</strong>
                          {cocktail.strInstructions}
                        </p>
                  </div>
                  </div>
                  {/* <p>
                    {cocktail && (
                      <>
                        {cocktail.strIngredient1 && (
                          <p>
                            <strong>Ingredient 1:</strong>
                            {cocktail.strIngredient1}
                          </p>
                        )}
                        {cocktail.strIngredient2 && (
                          <p>
                            <strong>Ingredient 2:</strong>
                            {cocktail.strIngredient2}
                          </p>
                        )}
                        {cocktail.strIngredient3 && (
                          <p>
                            <strong>Ingredient 3:</strong>
                            {cocktail.strIngredient3}
                          </p>
                        )}
                        {cocktail.strIngredient4 && (
                          <p>
                            <strong>Ingredient 4:</strong>
                            {cocktail.strIngredient4}
                          </p>
                        )}
                        {cocktail.strIngredient5 && (
                          <p>
                            <strong>Ingredient 5:</strong>
                            {cocktail.strIngredient5}
                          </p>
                        )}
                        {cocktail.strIngredient6 && (
                          <p>
                            <strong>Ingredient 6:</strong>
                            {cocktail.strIngredient6}
                          </p>
                        )}
                        <strong>Glass:</strong> {cocktail.strGlass}
                        <hr className="my-4 border-t-2 border-blue-500" />
                        <p>
                          <strong>Instructions:</strong>
                          {cocktail.strInstructions}
                        </p>
                      </>
                    )}
                  </p> */}
                 
                </div>
                {/* <!--Modal footer--> */}
                <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md   bg-blue-500 border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                  {/* <ButtonBack onClick={handleBackButtonClick} />
                    <ButtonNext href="/input/waiting/editing/common" /> */}
                  <button> Close</button>
                </div>
              </div>
            </Modal1>
          </Fragment>
        </Transition>
      </div>
    )
  }

  // ======================> Course Input Modal <============================== //

  return (
    <div>
      <Header />
      <Link href="/">
        <p>Back to home</p>
      </Link>

      <Image src={window} alt="window_view" width={600} height={600} />
      <div className=" flex flex-row  items-center  justify-center ">
        <div className="m-5 rounded-3xl bg-gradient-to-t from-tertiaryd to-secondaryd p-1 shadow-xl ">
          <div className="   rounded-3xl border-solid border-accentd ">
            <a
              aria-current="page"
              className="text m-0  flex h-[100px] w-48 items-center justify-center  rounded-3xl border-solid  border-accentd bg-primaryd p-4  text-accentd ring-2  ring-tertiaryd  hover:bg-[#D9E5E2] "
              href="#"
              onClick={() => setShowModal1(true)}
            >
              <h3 className="text-2xl font-bold">Get Receipt</h3>
            </a>
            {showModal1 && <CocktailMenuModal />}
          </div>
        </div>
        {cocktail && (
          <div>
            <p>
              <strong>Drink Name:</strong> {cocktail.strDrink}
            </p>
            <p>
              <strong>Glass:</strong> {cocktail.strGlass}
            </p>

            <p>
              <strong>Image :</strong>
              <Image
                src={cocktail.strDrinkThumb}
                alt="drink image"
                width={300}
                height={300}
              />
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
export default CityWeather
