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
        <div className="relative min-h-screen w-full overflow-hidden">
            <div className="relative w-full h-screen">
                <Image
                    src="/solar-panels.jpg"
                    priority
                    alt="태양광패널"
                    fill
                    sizes="100vw"
                    className="object-cover object-center"
                    quality={100}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(241,255,255,0.8)] to-[rgba(241,255,255,1)] z-10">
                    <div className="container mx-auto px-4 mt-[15vh]">
                        {displayedLines.map((line, index) => (
                            <div
                                key={index}
                                className="text-blue-100 opacity-80 text-4xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fadein"
                            >
                                {line}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}