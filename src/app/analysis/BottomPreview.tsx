import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useKeyboard } from '@/hook/useKeyboard';

interface Res {
  imageUrl: string;
}

interface BottomPreviewProps {
  data: Array<Res>;
  current: number;
  onPreviewClick: (index: number) => void;
}

const BottomPreview = ({ data, current, onPreviewClick }: BottomPreviewProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const items = container.getElementsByClassName('preview-item');
    if (items[current]) {
      const itemWidth = 96 + 8;
      container.scrollLeft = current * itemWidth - (container.clientWidth - itemWidth) / 2;
    }
  }, [current]);

  useKeyboard({
    current,
    dataLength: data.length,
    onIndexChange: onPreviewClick,
    previewRef: scrollContainerRef,
    isPreviewFocused: isFocused
  });

  return (
    <div className="w-full max-w-3xl mt-4">
      <div 
        className="overflow-x-scroll whitespace-nowrap" 
        ref={scrollContainerRef}
        onMouseEnter={() => setIsFocused(true)}
        onMouseLeave={() => setIsFocused(false)}
      >
        <div className="inline-flex space-x-2 p-2">
          {data.map((item, index) => (
            <div
              key={index}
              className={`preview-item relative inline-block w-24 h-24 cursor-pointer ${
                current === index ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={() => onPreviewClick(index)}
            >
              <Image
                src={item.imageUrl}
                alt={`Preview ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover rounded"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-center text-xs py-1">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomPreview;