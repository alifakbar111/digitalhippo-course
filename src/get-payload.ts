/* eslint-disable @typescript-eslint/no-explicit-any */
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import path from "path";
import payload, { Payload } from "payload";
import type { InitOptions } from "payload/config";

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

const transporterMailer = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "alphonso.mann@ethereal.email", // generated ethereal user
    pass: "FaaEX37S5sK1bC7rJR", // generated ethereal password
  },
  // host: "smtp.resend.com",
  // secure: true,
  // port: 465,
  // auth: {
  //   user: "resend",
  //   pass: process.env.RESEND_API_KEY,
  // },
});

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
      email: {
        transport: transporterMailer,
        fromAddress: "alphonso.mann@ethereal.email",
        fromName: "Alphonso Mann-Digitalhippo",
      },
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
};
