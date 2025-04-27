"use client";

import { ImageStoreProvider, useImageStore } from "@/lib/image-store";
import { LayerStoreProvider } from "@/lib/layer-store";
import Editor from "@/components/Editor";

export default function Home() {
  return (
    <LayerStoreProvider
      initialValue={{
        layerComparsionMode: false,
        layers: [
          {
            id: crypto.randomUUID(),
            url: "",
            height: 0,
            width: 0,
            publicId: "",
          },
        ],
      }}
    >
      <ImageStoreProvider
        initialValue={{ activeColor: "ss", activeImage: "dd", activeTag: "dd" }}
      >
        <Editor />
      </ImageStoreProvider>
    </LayerStoreProvider>
  );
}
