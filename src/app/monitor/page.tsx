"use client";
import Image from "next/image";
// import Webcam from "react-webcam";
// import ChooseFunc from './button'
import AnalResult from "./table";
import { useRef, useState, useEffect, ChangeEvent } from "react";
import { useSolarPanelAnalysis } from "@/hook/useSolarPanelAnalysis";

export default function Monitor() {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isCameraOpen, setIsCameraOpen] = useState(false);

    const fileRef = useRef<HTMLInputElement | null>(null);
    const solarPanelAnalysis = useSolarPanelAnalysis();
    const [image, setImage] = useState("");

    // 카메라 열기 함수
    const openCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            setIsCameraOpen(true);
            // setImage('');    // 카메라를 열 때 업로드된 이미지를 초기화
        } catch (error) {
            console.error("Camera access denied:", error);
        }
    };

    useEffect(() => {
        if (videoRef.current && isCameraOpen) {
            openCamera();
        }
    }, [isCameraOpen]);

    // 이미지/동영상 파일 열기 함수
    const openFile = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; // 받은 파일은 1개이기 때문에 index 0
        if (!file) return;

        // 이미지 화면에 띄우기
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e: ProgressEvent<FileReader>) => {
            if (reader.readyState === 2) {
                setImage(e.target?.result as string); // 타입 명시
                solarPanelAnalysis.sendImage({
                    imageFile: file,
                    confidence: "0.9",
                    nmsThreshold: "0.3",
                });
                // setIsCameraOpen(false);  // 파일을 열 때 카메라 닫기
            }
        };
    };

    return (
        <div>
            <div className="pt-32"></div>
            <div className="pr-[15vw] pl-[15vw]">
                <div className="flex justify-center relative">
                    <div className="bg-black w-[850px] h-[550px]">
                        {isCameraOpen ? (
                            // 카메라 화면을 표시하는 요소
                            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" style={{ display: isCameraOpen ? "block" : "none" }} />
                        ) : image ? (
                            // 이미지 표시
                            <img src={image} alt="Uploaded" className="w-full h-full object-cover" />
                        ) : (
                            // 기본 화면
                            <div className="flex justify-center items-center flex-col space-y-6 w-full h-full">
                                <div className="flex justify-around bg-white-green w-[230px] h-[50px] rounded-2xl outline-double outline-4 outline-light-green" onClick={openCamera}>
                                    <Image src="/camera.png" alt="카메라" width="35" height="10" className="pt-1.5 pb-1.5"></Image>
                                    <div className="flex items-center pr-10">카메라 접근</div>
                                </div>
                                <div
                                    className="flex justify-around bg-white-green w-[230px] h-[50px] rounded-2xl outline-double outline-4 outline-light-green"
                                    onClick={() => fileRef.current?.click()} // input[type='file']이 hidden이기 때문에 부모 div에서 onClick() 해줘야함
                                >
                                    <Image src="/gallery.png" alt="갤러리" width="40" height="10" className="pt-1.5 pb-1.5"></Image>
                                    <div className="flex items-center pr-3">사진/동영상 업로드</div>
                                    <input type="file" name="image_URL" accept="image/*, video/*" ref={fileRef} onChange={openFile} className="hidden" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="pt-24 pb-12">
                    <div className="inline text-2xl font-extrabold p-3 bg-white-green rounded flex justify-center">분석 결과</div>
                    <div className="h-10"></div>
                    <AnalResult></AnalResult>
                </div>
            </div>
        </div>
    );
}
