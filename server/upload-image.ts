"use server";

import { safeClient as safeActionClient } from "./save-action";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { z } from "zod";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const formData = z.object({
  image: z.instanceof(FormData),
});


type UploadResult = 
| {success: UploadApiResponse; error?: never}
| {error: string; success?: never}

export const uploadImage = safeActionClient
  .schema(formData)
  .action(async ({ parsedInput: { image } }) => {
    const formImage = image.get("image");

    if (!formImage) return { error: "No image was provided" };
    if (!image) return { error: "No image found" };

    const file = formImage as File;

    try {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      return new Promise<UploadResult>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            upload_preset: process.env.CLOUDINARY_NAME,
            use_filename:true,
            unique_filename:false,
            filename_override:file.name
          },
          (error, result) => {
            if (error || !result) {
                console.log(error)
              reject({ error: `something went wrong ${error}` });
            } else {
                console.log(result)
              resolve({success: result});
            }
          }
        );

        uploadStream.end(buffer)
      });
    } catch (error) {
        console.error("error processing file", error)
        return {error: "error processing file"}
    }
  });
