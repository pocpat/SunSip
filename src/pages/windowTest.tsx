import React from 'react'
import Image from 'next/image'
// import img from '/public/imgPrep/window_01.png'
import first_image_url from '/public/imgPrep/esf_01.jpg'
import second_image_url from '/public/imgPrep/window_01.png'

const windowTest = () => {
  return (
    <>
      <div className="relative">
        <Image
          className="absolute top-60 left-60"
          src={first_image_url}
          alt="Image1"
          width="300"
        />
        <Image
          className="cursor-pointer absolute top-0 left-0 mt-40 ml-35 hover:shadow-outline"
          src={second_image_url}
          alt="Image2"
          width="600"
        />
      </div>
    </>
  )
}

export default windowTest

//     <div>windowTest
//     <div className='bg-orange-600 h-100 w-100'></div>
// {/* <Image src='/public/imgPrep/esf_01.jpg' alt="elephant" width={200} height={200} /> */}
// <Image src={img} alt="elephant" width={600} height={600} />
// </div>
