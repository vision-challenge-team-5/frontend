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
        <main className="relative h-screen w-full overflow-hidden">
            <div className="absolute inset-0">
                <Image
                    src="/solar-panels.jpg"
                    priority
                    alt="태양광패널"
                    fill
                    sizes="100vw"
                    className="object-cover"
                    style={{
                        objectPosition: 'center',
                        width: '100%',
                        height: '100%'
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(241,255,255,0.8)] to-[rgba(241,255,255,1)]">
                    <div className="relative container mx-auto px-[12vw] pt-[20vh]">
                        {displayedLines.map((line, index) => (
                            <h1
                                key={index}
                                className="text-blue-100/80 text-4xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fadein"
                            >
                                {line}
                            </h1>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}