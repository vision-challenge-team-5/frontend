import { Detection } from "@/app/api/detect/types";
import axios from "axios";
import { useState } from "react";

interface SolarPanelDataProps {
  startDate?: string; // Optional start date
  endDate?: string; // Optional end date
}

export interface Res {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  confidence: number;
  label: string;
  detections: Detection[];
  imageUrl: string;
}

export const useSolarPanel = ({
  startDate,
  endDate,
}: SolarPanelDataProps = {}) => {
  const [data, setData] = useState<Res[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalysisInfo = async () => {
    setLoading(true);
    try {
      // Use passed dates or default to the full range
      const queryParams =
        startDate && endDate
          ? `?startDate=${startDate}&endDate=${endDate}`
          : "";

      const response = await axios.get(`/api/detect${queryParams}`);

      if (response.status !== 200) {
        throw new Error("데이터를 가져오는 데 실패했습니다.");
      }
      const { detections } = response.data;
      setData(detections);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchAnalysisInfo };
};
