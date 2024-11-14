"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Carousel from "./carousel";

export default function Home() {
    const lines = "Solar Panel\nContamination\nDetection System".split("\n");
    const [displayedLines, setDisplayedLines] = useState<string[]>([]);

    useEffect(() => {
        const displayLines = async () => {
            for (let i = 0; i < lines.length; i++) {
                setDisplayedLines((prev) => [...prev, lines[i]]);
                await new Promise((resolve) => setTimeout(resolve, 400)); // 400ms 후에 다음 줄을 표시
            }
        };

        displayLines(); // 줄을 순차적으로 표시
    }, []); // 컴포넌트가 처음 렌더링될 때 한 번만 실행

    return (
        <div className="w-screen overflow-x-hidden">
            <div className="relative w-full md:h96">
                <Image src="/solar-panels.png" alt="태양광패널" width={2580} height={1402} sizes="100vw" />
                <div className="absolute transform -translate-y-3/4 w-full h-[500px] bg-[linear-gradient(to_bottom,_rgba(80,_98,_58,_0)_20%,_rgba(80,_98,_58,_1)_60%)]">
                    <div className="text-white-green text-[6vw] leading-[1.1] font-sans font-black transform translate-x-[15vw]">
                        {displayedLines.map((line, index) => (
                            <div key={index} className="opacity-9 animate-fadein">
                                {line}
                            </div> // 각 줄을 div로 감싸서 차례대로 표시
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-olive-green h-[2000px]">
                <div className="relative pt-[360px]"></div>
                <div className="relative pb-[50px] text-white-green text-7xl font-extrabold text-center">solAR cleAR란?</div>
                <div className="relative">
                    <Carousel />
                </div>
            </div>
        </div>
    );
}
