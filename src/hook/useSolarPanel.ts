import axios from "axios";
import { useEffect, useState } from "react";

interface Box {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
}
interface SolarPanelDataResponse {
    box: Box;
    confidence: number;
    label: string;
}

export const useSolarPanel = () => {
    const [data, setData] = useState<SolarPanelDataResponse[] | []>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get("/api/detect");
                if (response.status != 200) {
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

        fetchData();
    }, []);

    return { data, loading, error };
};
