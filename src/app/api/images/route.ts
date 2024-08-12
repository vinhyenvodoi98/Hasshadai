import { uploadToS2 } from "@/lib/s2";
import { NextRequest, NextResponse } from "next/server";
import { v4 } from "uuid";

const POST = async (request: NextRequest) => {
  const formData = await request.formData();

  const file = formData.get("file") as Blob | null;
  if (!file) {
    return NextResponse.json(
      { error: "File blob is required." },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await file?.arrayBuffer());
  const filename = v4();
  try {
    const response = await uploadToS2({
      Bucket: process.env.S3_BUCKET as string,
      Key: filename,
      Body: buffer,
      ContentType: 'image/png'
    });

    return NextResponse.json({ message: 'File uploaded successfully', response });
  } catch (error) {
    return NextResponse.json({ message: 'Upload failed', error: (error as Error).message }, { status: 500 });
  }
}

export { POST }