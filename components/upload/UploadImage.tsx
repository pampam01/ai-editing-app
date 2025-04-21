"use client";

import React from "react";
import { useDropzone } from "react-dropzone";

const UploadImage = () => {
  const {} = useDropzone({
    maxFiles: 1,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg"],
      "image/jpg": [".jpg"],
      "image/webp": [".webp"],
    },
    onDrop: async (acceptedFiles, fileRejections) => {
        if(acceptedFiles.length){
            const formData = new FormData();
            formData.append('image', acceptedFiles[0])
            const objectUrl = URL.createObjectURL(acceptedFiles[0])
        }
    }
  });

  return <div>UploadImage</div>;
};

export default UploadImage;
