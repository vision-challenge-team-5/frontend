import axios from "axios";
import FormData from "form-data";
import { Response } from "../types";

class DetectorService {
    async analysis(imageUrl: string, confidence: string, nmsThreshold: string): Promise<Response> {
        const imageBuffer = await this.fetchImageData(imageUrl);
        const formData = this.createFormData(imageBuffer, confidence, nmsThreshold);
        const response = await axios.post("http://34.22.74.167:5000/process_image", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                ...formData.getHeaders(),
            },
        });
        console.log(response.data);
        return response.data;
    }
    private async fetchImageData(imageUrl: string): Promise<Buffer> {
        const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
        return Buffer.from(response.data);
    }
    private createFormData(imageBuffer: Buffer, confidence: string, nmsThreshold: string) {
        const formData = new FormData();
        formData.append("image", imageBuffer, "image.jpg");
        formData.append("confidence", confidence);
        formData.append("nms_threshold", nmsThreshold);
        return formData;
    }
}
export default new DetectorService();
