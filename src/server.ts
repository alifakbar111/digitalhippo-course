/* eslint-disable @typescript-eslint/ban-ts-comment */
import express from "express";
import payload from "payload";
import next from "next";

import { config } from "dotenv";
import path from "path";

config({
  path: path.resolve(__dirname, "../.env"),
});

const app = express();
const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";

const start = async () => {
  await payload.init({
    secret: String(process.env.PAYLOAD_SECRET),
    express: app,
    onInit: () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  });

  if (!process.env.NEXT_BUILD) {
    const nextApp = next({ dev });

    const nextHandler = nextApp.getRequestHandler();

    app.get("*", (req, res) => nextHandler(req, res));

    nextApp.prepare().then(() => {
      console.log("Next.js started");

      app.listen(PORT, async () => {
        console.log(`Server listening on ${PORT}...`);
      });
    });
  } else {
    app.listen(PORT, async () => {
      console.log("Next.js is now building...");
      // @ts-expect-error
      await nextBuild(path.join(__dirname, "../"));
      process.exit();
    });
  }
};
start();
