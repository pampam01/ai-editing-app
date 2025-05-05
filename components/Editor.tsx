import React from "react";
import ModeToggle from "./ModeToggle";
import UploadImage from "./upload/UploadImage";
import Layers from "./layers/Layers";
import ActiveImage from "./ActiveImage";

const Editor = () => {
  return (
    <div className="flex min-h-full">

      <div className="py-6 px-4 min-w-48">
        <div className="pb-12 text-center">
          {/* tombol toggle  */}
          <ModeToggle />
        </div>

        <div className="flex flex-col gap-4"></div>

        <UploadImage />
        <ActiveImage />
        <Layers />
      </div>
    </div>
  );
};

export default Editor;
