import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { fromEnv } from "@aws-sdk/credential-provider-env";

class S3Util {
    private readonly s3: S3Client;

    constructor() {
        this.s3 = new S3Client({
            region: process.env.AWS_REGION,
            credentials: fromEnv(),
        });
    }

    async upload(base64Img: string) {
        try {
            const fileName = `processed-image-${Date.now()}.png`;
            const fileBuffer = Buffer.from(base64Img, "base64");

            const uploadCommand = new PutObjectCommand({
                Bucket: process.env.S3_BUCKET_NAME,
                Key: fileName,
                Body: fileBuffer,
                ContentType: "image/png",
                ACL: "public-read",
            });

            const data = await this.s3.send(uploadCommand);
            console.log("파일 업로드 성공:", data);
            return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
        } catch (error) {
            console.error("파일 업로드 오류:", error);
            throw error;
        }
    }
}

export default S3Util;
