"use server";
import { NextResponse } from "next/server";
import s3Util from "../../utils/s3"; // S3Util을 import

/**
 * @description 이미지 S3 버킷에 업로드
 */
export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        const base64Img = formData.get("file") as string; // 실제로는 base64 string을 보내야 합니다.

        if (!base64Img) {
            return NextResponse.json({ message: "No file provided" }, { status: 400 });
        }

        const fileUrl = await s3Util.upload(base64Img);
        return NextResponse.json({ message: "Image uploaded successfully", fileUrl });
    } catch (error) {
        console.error("파일 업로드 중 오류 발생:", error);
        return NextResponse.json({ message: "Error uploading image", error: error }, { status: 500 });
    }
}
