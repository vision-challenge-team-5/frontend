import React, { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import BottomPreview from "./BottomPreview";
import { useKeyboard } from "@/hook/useKeyboard";

interface SolarPanelData {
  imageUrl: string;
  label: string;
  confidence: number;
}

interface AnalysisCarouselProps {
  data: SolarPanelData[];
}

const AnalysisCarousel = ({ data }: AnalysisCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useKeyboard({
    api: api ?? null,
    current,
    dataLength: data.length,
    onIndexChange: setCurrent,
  });

  const handlePreviewClick = (index: number) => {
    api?.scrollTo(index);
    setCurrent(index);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {data.map((item, index) => (
            <CarouselItem key={index}>
              <Card className="w-full bg-white shadow-xl">
                <CardContent className="p-6">
                  <div className="relative h-[600px] mb-6">
                    <Image
                      src={item.imageUrl}
                      alt={`Detection ${index + 1}`}
                      fill
                      className="object-contain rounded-lg"
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Badge className="mb-2 bg-blue-100 text-blue-800">
                        분석 결과
                      </Badge>
                      <h2 className="text-2xl font-bold text-gray-800">
                        {item.label.toUpperCase()}
                      </h2>
                    </div>
                    <Badge variant="outline" className="text-sm">
                      신뢰도: {(item.confidence * 100).toFixed(1)}%
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <BottomPreview
        current={current}
        data={data}
        onPreviewClick={handlePreviewClick}
      />
    </div>
  );
};

export default AnalysisCarousel;