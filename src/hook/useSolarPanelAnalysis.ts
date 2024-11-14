import axios from "axios";
import { useState } from "react";
import { Response } from "../app/api/detect/types/index";
import fs from "fs";

interface SolarPanelDataProps {
    imageFile: File;
    confidence: string;
    nmsThreshold: string;
}

export const useSolarPanelAnalysis = () => {
    const [data, setData] = useState<Response[] | []>([]);
    const [loading, setLoading] = useState<boolean>(false); // Start with false so it doesn't show as loading initially
    const [error, setError] = useState<string | null>(null);

    const sendImage = async ({ imageFile, confidence, nmsThreshold }: SolarPanelDataProps) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("imageFile", imageFile); // "image.png"는 Blob의 이름 (이름은 자유롭게 변경 가능)
            formData.append("confidence", confidence);
            formData.append("nmsThreshold", nmsThreshold);
            const response = await axios.post("/api/detect", formData, {
                headers: {
                    "Content-Type": "multipart/form-data", // FormData 전송 시 반드시 이 헤더를 설정
                },
            });
            if (response.status !== 200) {
                throw new Error("데이터를 가져오는 데 실패했습니다.");
            }
            const result = response.data;
            setData(result);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, sendImage };
};
