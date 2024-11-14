"use server";
import { NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/lib/prisma";
import { Decimal } from "@prisma/client/runtime/library";
import s3Util from "../../utils/s3";
import detectorService from "./service/detector";
import Formatter from "./service/formatter";

/**
 * @description AI 사용
 */

// Main handler function
export async function POST(req: Request) {
    try {
        const { imageUrl, confidence = "0.5", nmsThreshold = "0.3" } = await req.json();

        if (!imageUrl) {
            throw new Error("Image URL is required");
        }

        const { detections, processed_image } = await detectorService.analysis(imageUrl, confidence, nmsThreshold);
        const s3Url = await s3Util.upload(processed_image);
        const formattedData = Formatter.formatDetectionData(s3Url, detections);
        await prisma.imageDetection.createMany({ data: formattedData });
        return NextResponse.json(formattedData);
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ message: error || "Error processing the image" });
    }
}

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
        return NextResponse.json({ message: "Failed to fetch detections", error: error });
    } finally {
        await prisma.$disconnect();
    }
}
