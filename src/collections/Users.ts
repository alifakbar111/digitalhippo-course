import { CollectionConfig } from "payload/types";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
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
