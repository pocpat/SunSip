import fs from 'fs';
import { Buffer } from 'buffer';
interface Txt2ImgResponse {
    images: string[];
  }

// Define the URL and the payload to send
const url = "http://127.0.0.1:7860/sdapi/v1/txt2img";
const payload = {
    "prompt": "puppy dog",
    "steps": 5
};

// Send the payload to the API
fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
})
.then(response => response.json())
.then((data: Txt2ImgResponse) => {
    if (typeof data.images[0] === 'string') {
        const imageBuffer = Buffer.from(data.images[0], 'base64');
        fs.writeFileSync('output.png', imageBuffer);
      } else {
        console.error('Expected a string but got', typeof data.images[0]);
      }
  })
.catch((error) => {
    console.error('Error:', error);
});