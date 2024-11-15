"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

export default function Home() {
    const lines = useMemo(() => ["Solar Panel", "Contamination", "Detection System"], []);
    const [displayedLines, setDisplayedLines] = useState<string[]>([]);

    useEffect(() => {
        let mounted = true;
        setDisplayedLines([]); // Reset lines

        const displayLines = async () => {
            for (let i = 0; i < lines.length; i++) {
                if (!mounted) return;
                await new Promise((resolve) => setTimeout(resolve, 400));
                if (!mounted) return;
                setDisplayedLines(prev => [...prev, lines[i]]);
            }
        };

        displayLines();

        return () => {
            mounted = false;
        };
    }, [lines]);

    return (
        <div className="h-screen w-screen overflow-x-hidden overflow-y-hidden">
            <div className="relative w-full md:h96">
                <Image src="/solar-panels.jpg" priority alt="태양광패널" width={2580} height={1402} sizes="100vw" />
                <div className="absolute transform -translate-y-3/4 w-full h-[1500px] bg-[linear-gradient(to_bottom,_rgba(241,_255,_255,_0)_20%,_rgba(241,_255,_255,_1)_60%)]">
                    <div className="text-blue-100 opacity-80 text-[6vw] leading-[1.1] font-sans font-black transform translate-x-[15vw]">
                        {displayedLines.map((line, index) => (
                            <div key={index} className="opacity-9 animate-fadein">
                                {line}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}