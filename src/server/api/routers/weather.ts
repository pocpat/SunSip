import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const weatherRouter = createTRPCRouter({
  getCurrentWeather: publicProcedure
    .input(z.object({ location: z.string() }))
    .query(({ input }) => {
      return {}
      //   console.log("I am before return in weatherRouter");
      //   const res = await
      //   fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.location}&appid=${process.env.OPEN_WEATHER_API_KEY}`)
      //   const data = await res.json()
      // return {
      //   data: data,
      // };
    }),
  // getAll: publicProcedure.query(({ ctx }) => {
  //   return ctx.db.weather.findMany();
  //   // console.log("I am from  weather.ts router");

  // }),
});

