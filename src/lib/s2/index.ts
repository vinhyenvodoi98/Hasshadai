import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

interface UploadParams {
  Bucket: string;
  Key: string;
  Body: Buffer | Uint8Array | Blob | string | ReadableStream;
  ContentType: string;
}

const s3Client = new S3Client({
  region: process.env.S2_REGION,
  endpoint: process.env.S2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.S2_ACCESS_KEY as string,
    secretAccessKey: process.env.S2_SECRET_KEY as string,
  },
});

export const uploadToS2 = async (params: UploadParams) => {
  try {
    const command = new PutObjectCommand(params);
    const response = await s3Client.send(command);
    return response;
  } catch (error) {
    console.error("Error uploading to S2:", error);
    throw new Error("Upload failed");
  }
};
