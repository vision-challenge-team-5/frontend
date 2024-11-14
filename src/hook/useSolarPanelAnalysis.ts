import axios from "axios";
import { useState } from "react";
import { Response } from "../app/api/detect/types/index";

interface SolarPanelDataProps {
    imageUrl: string;
    confidence: string;
    nmsThreshold: string;
}

export const useSolarPanelAnalysis = ({ imageUrl, confidence, nmsThreshold }: SolarPanelDataProps) => {
    const [data, setData] = useState<Response[] | []>([]);
    const [loading, setLoading] = useState<boolean>(false); // Start with false so it doesn't show as loading initially
    const [error, setError] = useState<string | null>(null);

    const sendImage = async () => {
        setLoading(true);
        try {
            const response = await axios.post("/api/detect", {
                imageUrl,
                confidence,
                nmsThreshold,
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
