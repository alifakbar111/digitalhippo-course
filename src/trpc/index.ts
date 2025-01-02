import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  anyApiRoute: publicProcedure.query(() => {
    return "helloworld";
  }),
});

export type TAppRouter = typeof appRouter;
