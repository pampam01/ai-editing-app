"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Trash, Ellipsis } from "lucide-react";

const LayerInfo = () => {

  const handleDelete = () => {
    console.log("delete");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <Ellipsis size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="text-xs">
        <h3 className="text-lg font-medium text-center mb-2">Layer</h3>
        <div className="py-5 space-y-0.5">
          <p>
            <span className="font-bold">filename: </span>
          </p>
          <p>
            <span className="font-bold">format: </span>
          </p>
          <p>
            <span className="font-bold">size: </span>
          </p>
        </div>

        <Button
        variant={'destructive'}
        className="flex items-center gap-2 w-full"
        onClick={handleDelete}
        >
          <span>Delete layer</span>

          <Trash size={14}/>
        </Button>
      </DialogContent>


    </Dialog>
  );
};

export default LayerInfo;
