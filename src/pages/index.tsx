import Head from "next/head";
import Link from "next/link";

import { api } from "~/utils/api";
import { useState } from "react";
import { WeatherData } from "~/utils/weatherTypes";

export default function Home() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const [location, setLocation] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false);
  const [displayedLocation, setDisplayedLocation] = useState('');



  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setLocation(value)
  }

  const fetchWeatherInfoFromServer = async () => {
    setIsLoading(true);
    try {
      const resWeatherInfoFromServer = await fetch(`/api/weather1?location=${location}`);
      if (!resWeatherInfoFromServer.ok) {
        throw new Error('Network response was not OK');
      }
      const dataFromWeatherAPI = await resWeatherInfoFromServer.json() as WeatherData;
      if (dataFromWeatherAPI?.message) {
        setError(dataFromWeatherAPI.message);
      } else {
        setError(null);
        setDisplayedLocation(location);
      }
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);

      // Insert the error handling code here
      if (typeof error === 'object' && error !== null && 'message' in error) {
        setError((error as Error).message);
      } else {
        setError('An unknown error occurred');
      }
    }
    setIsLoading(false);
  };



  return (
    <>
    
      <Head>

        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />

      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
       <section className="flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <input
        type="text"
        onChange={onInputChange}
        value={location}
        placeholder="Got a city in mind? Share it here!"
        className="w-full rounded-md border-2
           border-gray-300 p-2 focus:border-transparent 
           focus:outline-none focus:ring-2
            focus:ring-blue-600"
      />
      <button
        className="bg-blue-600 text-white p-2 rounded-md"
         onClick={() => { void fetchWeatherInfoFromServer() }}

      >
        Search
      </button>
      <div>
      {error ? <p>Error: {error}</p> : isLoading ? <p>Loading...</p> : null}
      </div>

</section>
        <p className="text-2xl text-white">TEST MY STAFF</p>
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="https://create.t3.gg/en/usage/first-steps"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">First Steps →</h3>
              <div className="text-lg">
                Just the basics - Everything you need to know to set up your
                database and authentication.
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="https://create.t3.gg/en/introduction"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">Documentation →</h3>
              <div className="text-lg">
                Learn more about Create T3 App, the libraries it uses, and how
                to deploy it.
              </div>
            </Link>
          </div>
          <p className="text-2xl text-white">
            {hello.data ? hello.data.greeting : "Loading tRPC query..."}
          </p>
         
        </div>
      </main>
    </>
  );
}
