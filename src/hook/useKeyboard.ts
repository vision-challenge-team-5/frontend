// hooks/useKeyboard.ts

import { useEffect, RefObject } from 'react';
import type { CarouselApi } from "@/components/ui/carousel";

interface UseKeyboardProps {
  api?: CarouselApi | null;
  current: number;
  dataLength: number;
  onIndexChange: (index: number) => void;
  previewRef?: RefObject<HTMLDivElement>;
  isPreviewFocused?: boolean;
}

export const useKeyboard = ({
  api,
  current,
  dataLength,
  onIndexChange,
  previewRef,
  isPreviewFocused
}: UseKeyboardProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!dataLength) return;

      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        
        if (isPreviewFocused && previewRef?.current) {
          const scrollAmount = 100;
          previewRef.current.scrollLeft += e.key === "ArrowLeft" ? -scrollAmount : scrollAmount;
          return;
        }

        const newIndex = e.key === "ArrowLeft"
          ? (current > 0 ? current - 1 : dataLength - 1)
          : (current < dataLength - 1 ? current + 1 : 0);
        
        api?.scrollTo(newIndex);
        onIndexChange(newIndex);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [api, current, dataLength, onIndexChange, previewRef, isPreviewFocused]);
};