import React, { useEffect, useState } from 'react'
interface Txt2ImgResponse {
  images: string[]
}
const GeneratedImageLocal = () => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    useEffect(() => {
    const fetchImage = async () => {
      const url = 'http://localhost:8501/sdapi/v1/txt2img'
      const payload = {
        prompt: 'puppy dog',
        steps: 5,
      }
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })
        const data = (await response.json()) as Txt2ImgResponse
        if (typeof data.images[0] === 'string') {
            setImageSrc(`data:image/png;base64,${data.images[0]}`);
        } else {
          console.error('Expected a string but got', typeof data.images[0])
        }
      } catch (error) {
        console.error('Error:', error)
      }
    };
    void fetchImage()
  }, [])
  return (
    <div>{imageSrc && <img src={imageSrc} alt="Generated" />}</div>
  )
}
export default GeneratedImageLocal
