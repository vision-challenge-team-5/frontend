import axios from "axios";
import FormData from "form-data";
import { Response } from "../types";

class DetectorService {
    async analysis(imageBuffer: ArrayBuffer, confidence: string, nmsThreshold: string): Promise<Response> {
        const buf = await this.fetchImageData(imageBuffer);
        const formData = this.createFormData(buf, confidence, nmsThreshold);
        console.log("a");
        const response = await axios.post("http://34.22.74.167:5000/process_image", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                ...formData.getHeaders(),
            },
        });
        console.log(response.data);
        return response.data;
    }
    private async fetchImageData(imageBuffer: ArrayBuffer): Promise<Buffer> {
        // const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
        return Buffer.from(imageBuffer);
    }
    private createFormData(buf: Buffer, confidence: string, nmsThreshold: string) {
        const formData = new FormData();
        formData.append("image", buf, "image.jpg");
        formData.append("confidence", confidence);
        formData.append("nms_threshold", nmsThreshold);
        return formData;
    }
}
export default new DetectorService();
