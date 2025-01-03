import { AuthValidator } from "../lib/validators/AuthSchema";
import { publicProcedure, router } from "./trpc";
import { getPayloadClient } from "../get-payload";
import { TRPCError } from "@trpc/server";

export const authRouter = router({
  createPayloadUser: publicProcedure
    .input(AuthValidator)
    .mutation(async ({ input }) => {
      const { email, password } = input;

      const payload = await getPayloadClient();

      const { docs: users } = await payload.find({
        collection: "users",
        where: {
          email: {
            equals: email,
          },
        },
      });
      if (users.length !== 0) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User Not Found",
        });
      }
      await payload.create({
        collection: "users",
        data: {
          email,
          password,
          role: "user",
        },
      });
      return { success: true, sentToEmail: email };
    }),
});
