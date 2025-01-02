/* eslint-disable @typescript-eslint/ban-ts-comment */
import express from "express";
import { config } from "dotenv";
import path from "path";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./trpc";
import { nextApp, nextHandler } from "./next-utils";
import { getPayloadClient } from "./get-payload";

config({
  path: path.resolve(__dirname, "../.env"),
});

const app = express();
const PORT = process.env.PORT || 3000;

const start = async () => {
  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: (cms) => {
        cms.logger.info(`Payload Admin URL: ${cms.getAdminURL()}`);
      },
    },
  });
  // await payload.init({
  //   secret: String(process.env.PAYLOAD_SECRET),
  //   express: app,
  //   onInit: () => {
  //     payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
  //   },
  // });

  const createContext = ({
    req,
    res,
  }: trpcExpress.CreateExpressContextOptions) => ({
    req,
    res,
  });

  if (process.env.NEXT_BUILD) {
    app.listen(PORT, async () => {
      (await payload).logger.info("Next.js is building for production");
      // @ts-expect-error
      await nextBuild(path.join(__dirname, "../"));
      process.exit();
    });
    return;
  }

  app.use(
    "/api/trpc",
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  app.use((req, res) => nextHandler(req, res));

  nextApp.prepare().then(() => {
    console.log("Next.js started");

    app.listen(PORT, async () => {
      console.log(`Server listening on ${PORT}...`);
    });
  });
};
start();
