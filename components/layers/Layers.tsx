"use client";

import React from "react";
import {
  Card,
  CardTitle,
  CardContent,
  CardDescription,
  CardHeader,
} from "../ui/card";
import { useLayerStore } from "@/lib/layer-store";
import { cn } from "@/lib/utils";
import { useImageStore } from "@/lib/image-store";
import { Button } from "../ui/button";
import { Layers2 } from "lucide-react";

const Layers = () => {
  const layers = useLayerStore((state) => state.layers);
  const activeLayer = useLayerStore((state) => state.activeLayer);
  const generating = useImageStore((state) => state.generating);
  return (
    <Card className="basis-[320px] shrink-0  scrollbar-thin scrollbar-track-secondary overflow-y-scroll scrollbar-thumb-primary scrollbar-thumb-rounded-full scrollbar-track-rounded-full overflow-x-hidden relative flex flex-col shadow-2xl">
      <CardHeader className="sticky top-0 z-50 px-4 py-6 min-h-28 bg-card shadow-sm">
        <div>
          <CardTitle className="text-sm">
            {activeLayer.name || "Layers"}
          </CardTitle>

          {activeLayer.width && activeLayer.height ? (
            <CardDescription>
              {activeLayer.width} x {activeLayer.height}
            </CardDescription>
          ) : null}
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col ">
        {layers.map((layer, index) => (
          <div
            key={layer.id}
            className={cn(
              `cursor-pointer ease-in-out hover:bg-secondary border border-transparent`,
              { "animate-pulse": generating }
            )}
          >
            <div className="relative p-4 flex items-center">
              <div className="flex gap-2 items-center h-8 w-full justify-between">
                {!layer.url ? (
                  <p className="text-xs font-medium justify-self-end">
                    New Layer
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
      <div className="sticky bottom-0 bg-card flex gap-2 justify-self-end">
        <Button className="w-full flex gap-2" variant={"outline"}>
          <span>Create Layer</span>
          <Layers2 className="text-secondary-foreground" size={18} />
        </Button>
      </div>
    </Card>
  );
};

export default Layers;
