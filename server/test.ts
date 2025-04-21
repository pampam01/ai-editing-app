"use server";

import { v2 as cloudinary } from "cloudinary";
import { z } from "zod";
import { safeClient } from "./save-action";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const formSchema = z.object({
  publicId: z.string(),
});

export const test = safeClient
  .schema(formSchema)
  .action(async ({ parsedInput: { publicId } }) => {
    console.log("test");

    try {
      const result = await cloudinary.api.resource(`${publicId}.transcript`, {
        resource_type: "raw",
      });
      console.log(result);
      return { success: result };
    } catch (error) {
      console.log(error);
    }
  });

// CLOUDINARY_NAME=dhgxlle5b
// CLOUDINARY_API_KEY=437588893996267
// CLOUDINARY_API_SECRET=QPbH_kNff8rLln19ZpLoSFP37oc
