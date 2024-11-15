"use client";

import React from "react";
import { useSolarPanel } from "@/hook/useSolarPanel";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import AnalysisCarousel from "./AnalysisCarousel";

const Analysis = () => {
  const { data, fetchAnalysisInfo, loading } = useSolarPanel();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-slate-50">
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />

      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
              분석 히스토리
            </h1>
            <p className="text-slate-600 max-w-2xl mx-auto">
              이전에 식별한 패널들을 볼 수 있습니다.<br />
            </p>
          </div>

          {!data?.length ? (
            <div className="w-full max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-8 mb-12">
              <div className="flex flex-col items-center text-center">
                <div className="flex gap-4 mb-6">
                  {loading ? (
                    <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                  ) : (
                    <Search className="w-12 h-12 text-cyan-500 animate-pulse" />
                  )}
                </div>
                <h2 className="text-xl font-semibold mb-4">
                  {loading ? "불러오는 중입니다..." : "히스토리를 불러오시겠습니까?"}
                </h2>
                <p className="text-slate-500 mb-6">
                  {loading ?
                    "잠시만 기다려주세요" :
                    "버튼을 클릭하시면 히스토리를 자동으로 불러옵니다."
                  }
                </p>
                {!loading && (
                  <Button
                    onClick={fetchAnalysisInfo}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-lg px-8 py-6 rounded-xl shadow-md hover:shadow-lg transition-all"
                  >
                    불러오기
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="w-full max-w-6xl mx-auto px-8">
              <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-12">
                <div className="flex flex-col items-center mb-6">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">분석 결과</h2>
                  <p className="text-slate-500 mb-4">총 {data.length}개의 히스토리가 있습니다.</p>
                  <Button
                    onClick={fetchAnalysisInfo}
                    variant="outline"
                    className="hover:bg-blue-50"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        불러오는 중...
                      </div>
                    ) : (
                      "다시 불러오기"
                    )}
                  </Button>
                </div>
                <AnalysisCarousel data={data} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analysis;