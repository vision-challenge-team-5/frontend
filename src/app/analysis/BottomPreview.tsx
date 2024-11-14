import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

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

  useEffect(() => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const items = container.getElementsByClassName('preview-item');
    if (items[current]) {
      const itemWidth = 96 + 8; // width + gap
      container.scrollLeft = current * itemWidth - (container.clientWidth - itemWidth) / 2;
    }
  }, [current]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!scrollContainerRef.current) return;
      const scrollAmount = 100;
      
      switch (e.key) {
        case 'ArrowLeft':
          scrollContainerRef.current.scrollLeft -= scrollAmount;
          break;
        case 'ArrowRight':
          scrollContainerRef.current.scrollLeft += scrollAmount;
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="w-full max-w-3xl mt-4">
      <div className="overflow-x-scroll whitespace-nowrap" ref={scrollContainerRef}>
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