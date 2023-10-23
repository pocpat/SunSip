import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { GetServerSideProps } from "next";


export const ws2Router = createTRPCRouter({
    getCurrentData: publicProcedure
        .input(z.object({ location: z.string() }))
        .query(({ input }) => {
            console.log("I am from ws2.ts router");
            return {};
        }), 
});
