import { Detection } from "../types";

class Formatter {
    static formatDetectionData(imageUrl: string, detections: Detection[]) {
        return detections.map((detection) => ({
            imageUrl: imageUrl,
            x1: detection.box.x1,
            x2: detection.box.x2,
            y1: detection.box.y1,
            y2: detection.box.y2,
            confidence: detection.confidence,
            label: detection.label,
        }));
    }
}
export default Formatter;
