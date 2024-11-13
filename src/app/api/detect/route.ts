"use server";
import { NextResponse } from "next/server";
import axios from "axios";
import FormData from "form-data";
import prisma from "@/lib/prisma";

interface Detection {
    box: { x1: number; x2: number; y1: number; y2: number };
    confidence: number;
    label: string;
}

function validateInput(imageUrl: string | undefined) {
    if (!imageUrl) {
        throw new Error("Image URL is required");
    }
}

async function fetchImageData(imageUrl: string) {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    return Buffer.from(response.data);
}

function createFormData(imageBuffer: Buffer, confidence: string, nmsThreshold: string) {
    const formData = new FormData();
    formData.append("image", imageBuffer, "image.jpg");
    formData.append("confidence", confidence);
    formData.append("nms_threshold", nmsThreshold);
    return formData;
}

async function sendImageForProcessing(formData: FormData) {
    const response = await axios.post("http://34.22.74.167:5000/process_image", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            ...formData.getHeaders(),
        },
    });
    return response.data.detections;
}

function formatDetectionData(imageUrl: string, detections: Detection[]) {
    return detections.map((detection) => ({
        imageUrl,
        x1: detection.box.x1,
        x2: detection.box.x2,
        y1: detection.box.y1,
        y2: detection.box.y2,
        confidence: detection.confidence,
        label: detection.label,
    }));
}
/**
 * @description AI 사용
 */
// Main handler function
export async function POST(req: Request) {
    try {
        const { imageUrl, confidence = "0.5", nmsThreshold = "0.3" } = await req.json();

        validateInput(imageUrl);

        const imageBuffer = await fetchImageData(imageUrl);
        const formData = createFormData(imageBuffer, confidence, nmsThreshold);

        const detections = await sendImageForProcessing(formData);
        const formattedData = formatDetectionData(imageUrl, detections);

        await prisma.imageDetection.createMany({ data: formattedData });

        return NextResponse.json(detections);
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ message: error || "Error processing the image" });
    }
}

export async function GET() {
    try {
        const detections = await prisma.imageDetection.findMany();
        return NextResponse.json(detections);
    } catch (error) {
        console.error("Error fetching detections:", error);
        return NextResponse.json({ message: "Failed to fetch detections" });
    } finally {
        await prisma.$disconnect();
    }
}
