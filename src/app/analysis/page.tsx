"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSolarPanel } from "@/hook/useSolarPanel";
import { Button } from "@/components/ui/button";
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

const Analysis = () => {
  const { data, fetchAnalysisInfo } = useSolarPanel();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!data?.length) return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        const newIndex = current > 0 ? current - 1 : data.length - 1;
        api?.scrollTo(newIndex);
        setCurrent(newIndex);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        const newIndex = current < data.length - 1 ? current + 1 : 0;
        api?.scrollTo(newIndex);
        setCurrent(newIndex);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [api, current, data]);

  const handlePreviewClick = (index: number) => {
    api?.scrollTo(index);
    setCurrent(index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <Button
            onClick={fetchAnalysisInfo}
            className="mb-12 hover: text-lg px-8 py-6"
          >
            태양광 패널 분석 시작
          </Button>
          {data && data.length > 0 && (
            <>
              <Carousel setApi={setApi} className="w-full max-w-3xl">
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analysis;
