"use client";

import React from "react";
import { useSolarPanel } from "@/hook/useSolarPanel";
import { Button } from "@/components/ui/button";
import AnalysisCarousel from "./AnalysisCarousel";

const Analysis = () => {
  const { data, fetchAnalysisInfo } = useSolarPanel();

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
          {data && data.length > 0 && <AnalysisCarousel data={data} />}
        </div>
      </div>
    </div>
  );
};

export default Analysis;
