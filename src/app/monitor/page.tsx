'use client';
// import Image from "next/image";
// import Webcam from "react-webcam";
import ChooseFunc from './button'
import { useRef, useState, useEffect } from 'react';

export default function Monitor() {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isCameraOpen, setIsCameraOpen] = useState(false);

    // 카메라 열기 함수
    const openCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            setIsCameraOpen(true);
        } catch (error) {
            console.error('Camera access denied:', error);
        }
    };

    useEffect(() => {
        if (videoRef.current && isCameraOpen) {
            openCamera();
        }
    }, [isCameraOpen]);


    return (
        <div>
            <div className="flex justify-center relative top-16">
                <div className="bg-black w-[850px] h-[550px]">
                    {isCameraOpen ? (
                        // 카메라 화면을 표시하는 요소
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            className="w-full h-full object-cover"
                            style={{ display: isCameraOpen ? 'block' : 'none'}}
                        />
                        
                    ) : (
                        // 기본 화면
                        <div className="flex justify-center items-center flex-col space-y-6 w-full h-full">
                            <ChooseFunc 
                                srcS='/camera.png' 
                                altS='카메라' 
                                widthS={35} 
                                heightS={10} 
                                classS1='pt-1.5 pb-1.5' 
                                classS2='pr-10' 
                                textS='카메라 접근'
                                onClick={openCamera}
                            />
                            <ChooseFunc 
                                srcS='/gallery.png' 
                                altS='갤러리' 
                                widthS={40} 
                                heightS={10} 
                                classS1='pt-1.5 pb-1.5' 
                                classS2='pr-3' 
                                textS='사진/동영상 업로드'
                                // onClick={}
                            />
                        </div>
                    )}
                    
                </div>
            </div>
        </div>
    )
}