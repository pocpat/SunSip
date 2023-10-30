import fs from 'fs'
import { Buffer } from 'buffer'
interface Txt2ImgResponse {
  images: string[]
}

interface Txt2ImgResponse {
  images: string[];
}

export const handlerSD = async (prompt: string): Promise<string> => { 
  // Define the URL and the payload to send
  const url = 'http://127.0.0.1:7860/sdapi/v1/txt2img'
  const payload = {
    prompt: prompt,
    // negative_prompt: "people, animals"
  }

  try {
    // Send the payload to the API
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const responseData = await response.json() as Txt2ImgResponse

    if (typeof responseData.images[0] === 'string') {
      // Handle the response here as needed
      const imageDataUrl = `data:image/png;base64,${responseData.images[0]}`;
      console.log(imageDataUrl);
      return imageDataUrl;
    } else {
      console.error('Expected a string but got', typeof responseData?.images?.[0]);
      return '';
    }
  } catch (error) {
    console.error('Error:', error);
    return '';
  }
};









//     if (  typeof responseData.images[0] === 'string') {
//       const imageBuffer = Buffer.from(responseData.images[0], 'base64')
//       fs.writeFileSync('output.png', imageBuffer)
//       const imageDataUrl = `data:image/png;base64,${imageBuffer.toString('base64')}`
//       console.log(imageDataUrl); 
//       return imageDataUrl; 
//     } else {
//       console.error('Expected a string but got', typeof responseData?.images?.[0])
//       return '';
//     }
//   } 

//   catch (error) {
//     console.error('Error:', error)
//     return '';
//   }
// }

