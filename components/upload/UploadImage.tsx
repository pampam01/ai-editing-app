"use client";

import { uploadImage } from "@/server/upload-image";
import React from "react";
import { useDropzone } from "react-dropzone";

import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import Lottie from "lottie-react";
import animationUploadImage from "@/public/animations/image-upload.json"
import { useImageStore } from "@/lib/image-store";
import { useLayerStore } from "@/lib/layer-store";

const UploadImage = () => {
  const activeLayers = useLayerStore((state) => state.activeLayer);
  const setActiveLayer = useLayerStore((state) => state.setActiveLayer);
  const setUpdateLayers = useLayerStore((state) => state.updateLayer);
  const setGenerating = useImageStore((state) => state.setGenerating);


  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg"],
      "image/jpg": [".jpg"],
      "image/webp": [".webp"],
    },
    onDrop: async (acceptedFiles, fileRejections) => {
      if (acceptedFiles.length) {
        const formData = new FormData();
        formData.append("image", acceptedFiles[0]);
        const objectUrl = URL.createObjectURL(acceptedFiles[0]);

        setGenerating(true);

        setUpdateLayers({
          id:activeLayers.id,
          url:objectUrl,
          width:0,
          height:0,
          name:'uploading',
          publicId:'',
          format:'',
          resourceType:'image'
        })

        //  layers settings

        const res = await uploadImage({ image: formData });



        console.log(res);
      }
    },
  });

  return (
    <Card
      {...getRootProps()}
      className={cn(
        `hover:cursor-pointer hover:bg-secondary hover:border-primary transition-all ease-in-out`,
        `${isDragActive ? "animate-pulse bg-secondary border-primary" : ""}`
      )}
    >
      <CardContent className="flex flex-col items-center px-2 py-24 text-xs">
        <Input {...getInputProps()} suppressHydrationWarning/>
        <div className="flex flex-col items-center justify-center gap-4">
          <Lottie animationData={animationUploadImage} className="h-48"/>
          <p className="text-muted-foreground text-2xl">
            {isDragActive ? "Drop your image here" : "Drag and drop an image"}
          </p>
          <p className="text-muted-foreground">Support .png .jpg .jpeg .webp</p>
        </div>
       
      </CardContent>
    </Card>
  );
};

export default UploadImage;
