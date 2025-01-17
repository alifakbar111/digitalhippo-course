import { CollectionConfig } from "payload/types";

export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    verify: {
      generateEmailHTML: ({token}) => {
        return `<a href="${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}">Verify Email</a>`
      }
    }
  },
  access: {
    admin: () => true,
    unlock: () => true,
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: "role",
      type: "select",
      required: true,
      options: [
        {
          value: "admin",
          label: "Admin",
        },
        {
          value: "user",
          label: "User",
        },
      ],
    },
  ],
};
