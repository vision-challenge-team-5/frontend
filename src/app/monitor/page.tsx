"use client";

import Image from "next/image";
import AnalResult from "./table";
import { useRef, useState, useEffect, ChangeEvent } from "react";
import { useSolarPanelAnalysis } from "@/hook/useSolarPanelAnalysis";
import { Camera, Upload, ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Monitor() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const { sendImage } = useSolarPanelAnalysis();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState("");

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraOpen(true);
    } catch (error) {
      console.error("Camera access denied:", error);
    }
  };

  useEffect(() => {
    if (videoRef.current && isCameraOpen) {
      openCamera();
    }
  }, [isCameraOpen]);

  const openFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (reader.readyState === 2) {
        setImage(e.target?.result as string);
        sendImage({
          imageFile: file,
          confidence: "0.1",
          nmsThreshold: "0.7",
        });
      }
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-slate-50">
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />

      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
              실시간 모니터링
            </h1>
            <p className="text-slate-600 max-w-2xl mx-auto">
              카메라를 사용하여 실시간으로 태양광 패널을 모니터링하거나, 
              이미지를 업로드하여 분석할 수 있습니다.
            </p>
          </div>

          <div className="w-full max-w-5xl mx-auto">
            <Card className="bg-white/50 backdrop-blur-sm shadow-lg overflow-hidden mb-8">
              <CardContent className="p-6">
                <div className="relative aspect-video bg-slate-900 rounded-lg overflow-hidden">
                  {isCameraOpen ? (
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : image ? (
                    <Image
                      src={image}
                      alt="Uploaded"
                      layout="fill"
                      objectFit="cover"
                    />
                  ) : (
                    <div className="flex flex-col justify-center items-center h-full text-slate-400 space-y-4">
                      <ImagePlus className="w-16 h-16" />
                      <p>카메라를 열거나 이미지를 업로드해주세요</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center space-x-4 mb-12">
              <Button
                variant="outline"
                onClick={openCamera}
                className="bg-white hover:bg-blue-50"
              >
                <Camera className="mr-2 h-5 w-5" />
                카메라 열기
              </Button>
              <Button
                variant="outline"
                onClick={() => fileRef.current?.click()}
                className="bg-white hover:bg-blue-50"
              >
                <Upload className="mr-2 h-5 w-5" />
                이미지 업로드
                <input
                  type="file"
                  name="image_URL"
                  accept="image/*, video/*"
                  ref={fileRef}
                  onChange={openFile}
                  className="hidden"
                />
              </Button>
            </div>

            <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
                분석 결과
              </h2>
              <AnalResult />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}