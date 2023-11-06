// // import nock, {Scope} from 'nock';
// import { processResponce } from '../wd3';  
// // import { api } from '~/utils/api';

// describe('processRes function', () => {
//     it('should return data when response status is between 200 and 299', async () => {
//       const mockLocation = 'your-location';
//       const mockResponse = new Response(JSON.stringify({ id: 1, name: 'City', weather: [], main: { feels_like: 25 } }), {
//         status: 200,
//         statusText: 'OK',
//         headers: { 'Content-type': 'application/json' },
//       });
  
//       jest.spyOn(global, 'fetch').mockResolvedValue(mockResponse);
  
//       const data = await processResponce(mockLocation);
  
//       expect(data).toEqual({
//         id: 1,
//         name: 'City',
//         weather: [],
//         main: { feels_like: 25 },
//       });
  
//       (global.fetch as jest.Mock).mockRestore(); // Restore the original fetch function
//     });
  
//     it('should throw an error when response status is not between 200 and 299', async () => {
//       const mockLocation = 'your-location';
//       const mockResponse = new Response('Not Found', {
//         status: 404,
//         statusText: 'Not Found',
//       });
  
//       jest.spyOn(global, 'fetch').mockResolvedValue(mockResponse);
  
//       try {
//         await processResponce(mockLocation);
//       } catch (error) {
//         if (error instanceof Error) {
//           expect(error.message).toBe('Request failed with status: 404');
//         } else {
//           throw error;
//         }
//       }
  
//       (global.fetch as jest.Mock).mockRestore(); // Restore the original fetch function
//     });
//   });



//   describe('processResponce function', () => {
//     it('should return data with correct description when response status is between 200 and 299', async () => {
//       const mockLocation = 'your-location';
//       const mockResponseData = {
//         id: 1,
//         name: 'City',
//         weather: [{ description: 'Clear sky', main: 'Clear' }],
//         main: { feels_like: 25 },
//       };
//       const mockResponse = new Response(JSON.stringify(mockResponseData), {
//         status: 200,
//         statusText: 'OK',
//         headers: { 'Content-type': 'application/json' },
//       });
  
//       jest.spyOn(global, 'fetch').mockResolvedValue(mockResponse);
  
//       const data = await processResponce(mockLocation);
  
//       expect(data).toEqual({
//         id: 1,
//         name: 'City',
//         weather: [{ description: 'Clear sky', main: 'Clear' }],
//         main: { feels_like: 25 },
//       });
  
//       // Check if the description is correct
//       expect(data.weather?.[0]?.description).toBe('Clear sky');

//       (global.fetch as jest.Mock).mockRestore();
//     });
  
//     it('should throw an error when response status is not between 200 and 299', async () => {
//       const mockLocation = 'your-location';
//       const mockResponse = new Response('Not Found', {
//         status: 404,
//         statusText: 'Not Found',
//       });
  
//       jest.spyOn(global, 'fetch').mockResolvedValue(mockResponse);
  
//       try {
//         await processResponce(mockLocation);
//       } catch (error) {
//         if (error instanceof Error) {
//           expect(error.message).toBe('Request failed with status: 404');
//         } else {
//           throw error;
//         }
//       }
  
//       (global.fetch as jest.Mock).mockRestore();    });
//   });


//   describe('processResponce function', () => {
//     it('should return data with correct "feels like" when response status is between 200 and 299', async () => {
//       const mockLocation = 'your-location';
//       const mockResponseData = {
//         id: 1,
//         name: 'City',
//         weather: [{ description: 'Clear sky', main: 'Clear' }],
//         main: { feels_like: 25 },
//       };
//       const mockResponse = new Response(JSON.stringify(mockResponseData), {
//         status: 200,
//         statusText: 'OK',
//         headers: { 'Content-type': 'application/json' },
//       });
  
//       jest.spyOn(global, 'fetch').mockResolvedValue(mockResponse);
  
//       const data = await processResponce(mockLocation);
  
//       expect(data).toEqual({
//         id: 1,
//         name: 'City',
//         weather: [{ description: 'Clear sky', main: 'Clear' }],
//         main: { feels_like: 25 },
//       });
  
//       // Check if the description is correct
//       expect(data.main.feels_like).toBe(25);

//       (global.fetch as jest.Mock).mockRestore();
//     });
  
//     it('should throw an error when response status is not between 200 and 299', async () => {
//       const mockLocation = 'your-location';
//       const mockResponse = new Response('Not Found', {
//         status: 404,
//         statusText: 'Not Found',
//       });
  
//       jest.spyOn(global, 'fetch').mockResolvedValue(mockResponse);
  
//       try {
//         await processResponce(mockLocation);
//       } catch (error) {
//         if (error instanceof Error) {
//           expect(error.message).toBe('Request failed with status: 404');
//         } else {
//           throw error;
//         }
//       }
  
//       (global.fetch as jest.Mock).mockRestore();    });
//   });


//   describe('processResponce function', () => {
//     it('should return data with correct wind speed when response status is between 200 and 299', async () => {
//       const mockLocation = 'your-location';
//       const mockResponseData = {
//         id: 1,
//         name: 'City',
//         weather: [{ description: 'Clear sky', main: 'Clear' }],
//         main: { feels_like: 25 },
//         wind: { speed: 10 },
//         visibility: 10000,
//       };
//       const mockResponse = new Response(JSON.stringify(mockResponseData), {
//         status: 200,
//         statusText: 'OK',
//         headers: { 'Content-type': 'application/json' },
//       });
  
//       jest.spyOn(global, 'fetch').mockResolvedValue(mockResponse);
  
//       const data = await processResponce(mockLocation);
  
//       expect(data).toEqual({
//         id: 1,
//         name: 'City',
//         weather: [{ description: 'Clear sky', main: 'Clear' }],
//         main: { feels_like: 25 },
//         wind: { speed: 10 },
//         visibility: 10000,
//       });
  
//       // Check if the description is correct
//       expect(data.wind?.speed).toBe(10);

//       (global.fetch as jest.Mock).mockRestore();
//     });
  
//     it('should throw an error when response status is not between 200 and 299', async () => {
//       const mockLocation = 'your-location';
//       const mockResponse = new Response('Not Found', {
//         status: 404,
//         statusText: 'Not Found',
//       });
  
//       jest.spyOn(global, 'fetch').mockResolvedValue(mockResponse);
  
//       try {
//         await processResponce(mockLocation);
//       } catch (error) {
//         if (error instanceof Error) {
//           expect(error.message).toBe('Request failed with status: 404');
//         } else {
//           throw error;
//         }
//       }
  
//       (global.fetch as jest.Mock).mockRestore();    });
//   });


//   describe('processResponce function', () => {
//     it('should return data with correct visibility when response status is between 200 and 299', async () => {
//       const mockLocation = 'your-location';
//       const mockResponseData = {
//         id: 1,
//         name: 'City',
//         weather: [{ description: 'Clear sky', main: 'Clear' }],
//         main: { feels_like: 25 },
//         wind: { speed: 10 },
//         visibility: 10000,
//       };
//       const mockResponse = new Response(JSON.stringify(mockResponseData), {
//         status: 200,
//         statusText: 'OK',
//         headers: { 'Content-type': 'application/json' },
//       });
  
//       jest.spyOn(global, 'fetch').mockResolvedValue(mockResponse);
  
//       const data = await processResponce(mockLocation);
  
//       expect(data).toEqual({
//         id: 1,
//         name: 'City',
//         weather: [{ description: 'Clear sky', main: 'Clear' }],
//         main: { feels_like: 25 },
//         wind: { speed: 10 },
//         visibility: 10000,
//       });
  
//       // Check if the description is correct
//       expect(data.visibility).toBe(10000);

//       (global.fetch as jest.Mock).mockRestore();
//     });
  
//     it('should throw an error when response status is not between 200 and 299', async () => {
//       const mockLocation = 'your-location';
//       const mockResponse = new Response('Not Found', {
//         status: 404,
//         statusText: 'Not Found',
//       });
  
//       jest.spyOn(global, 'fetch').mockResolvedValue(mockResponse);
  
//       try {
//         await processResponce(mockLocation);
//       } catch (error) {
//         if (error instanceof Error) {
//           expect(error.message).toBe('Request failed with status: 404');
//         } else {
//           throw error;
//         }
//       }
  
//       (global.fetch as jest.Mock).mockRestore();    });
//   });



