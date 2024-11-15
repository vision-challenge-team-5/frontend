export interface Detection {
    box: { x1: number; x2: number; y1: number; y2: number };
    confidence: number;
    label: string;
}

export interface Response {
    confidence?: number;
    detections: Detection[];
    processed_image: string;
    imageUrl?:string
    label?:string;
}
