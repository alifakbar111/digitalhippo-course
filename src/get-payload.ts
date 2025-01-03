/* eslint-disable @typescript-eslint/no-explicit-any */
import payload, { Payload } from "payload";
import type { InitOptions } from "payload/config";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

interface Args {
  initOptions?: Partial<InitOptions>;
}

let cached = (global as any).payload;

if (!cached) {
  cached = (global as any).payload = {
    client: null,
    promise: null,
  };
}

export const getPayloadClient = async ({
  initOptions,
}: Args = {}): Promise<Payload> => {
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error("PAYLOAD_SECRET is missing");
  }

  if (cached.client) {
    return cached.client;
  }
  if (!cached.promise) {
    cached.promise = payload.init({
      secret: process.env.PAYLOAD_SECRET,
      local: initOptions?.express ? false : true,
      ...(initOptions || {}),
    });
  }
  try {
    cached.client = await cached.promise;
  } catch (e: unknown) {
    cached.promise = null;
    throw e;
  }

  return cached.client;

  // return await payload.init({
  //   secret: String(process.env.PAYLOAD_SECRET),
  //   local: initOptions?.express ? false : true,
  //   ...(initOptions || {}),
  // });
};
