"use client";

import { Res } from "@/hook/useSolarPanel";
import Image from "next/image";

interface BottomPreviewProps {
  data: Array<Res>;
  current: number;
  onPreviewClick: (index: number) => void;
}

const BottomPreview = ({
  data,
  current,
  onPreviewClick,
}: BottomPreviewProps) => {
  return (
    <div className="w-full max-w-3xl mt-4 overflow-x-auto">
      <div className="flex gap-2 p-2">
        {data.map((item, index) => (
          <div
            key={index}
            className={`relative w-24 h-24 cursor-pointer transition-all ${
              current === index ? "ring-2 ring-blue-500" : ""
            }`}
            onClick={() => onPreviewClick(index)}
          >
            <Image
              src={item.imageUrl}
              alt={`Preview ${index + 1}`}
              fill
              className="object-cover rounded"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-center text-xs py-1">
              {index + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BottomPreview;
