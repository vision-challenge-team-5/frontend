// app/api/detect/route.ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import s3Util from "../../utils/s3";
import detectorService from "./service/detector";
import Formatter from "./service/formatter";

export const config = {
    api: {
        bodyParser: false, // Disable Next.js automatic body parsing
    },
};

// POST request handler
export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        // Extract fields
        const imageFile = formData.get("imageFile") as File;
        const confidence = formData.get("confidence") as string;
        const nmsThreshold = formData.get("nmsThreshold") as string;

        if (!imageFile) {
            return NextResponse.json({ message: "Image file is required" }, { status: 400 });
        }
        const imageBuffer: ArrayBuffer = await imageFile.arrayBuffer();
        // Perform analysis
        const { detections, processed_image } = await detectorService.analysis(imageBuffer, confidence, nmsThreshold);

        const s3Url = await s3Util.upload(processed_image);
        const formattedData = Formatter.formatDetectionData(s3Url, detections);
        await prisma.imageDetection.createMany({ data: formattedData });
        return NextResponse.json(formattedData);
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ message: error || "Error processing the image" });
    }
}

// GET request handler for fetching detections
export async function GET(req: Request) {
    const url = new URL(req.url);
    const startDate = url.searchParams.get("startDate");
    const endDate = url.searchParams.get("endDate");

    const filters: { createdAt?: { gte?: Date; lte?: Date } } = {};

    if (startDate) {
        filters.createdAt = {
            ...filters.createdAt,
            gte: new Date(startDate),
        };
    }

    if (endDate) {
        filters.createdAt = {
            ...filters.createdAt,
            lte: new Date(endDate),
        };
    }

    try {
        const detections = await prisma.imageDetection.findMany({
            where: filters,
        });

        if (detections.length === 0) {
            return NextResponse.json({ message: "No detections found" });
        }

        return NextResponse.json({ detections });
    } catch (error) {
        console.error("Error fetching detections:", error);
        return NextResponse.json({ message: "Failed to fetch detections", error: error }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
