import { uploadToS2 } from "@/lib/s2";
import { NextRequest, NextResponse } from "next/server";
import formidable from 'formidable';
import fs from 'fs/promises';

export const config = {
  api: {
    bodyParser: false,
  },
};

const POST = async (req: NextRequest) => {
  const form = new formidable.IncomingForm();

  return new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return resolve(NextResponse.json({ message: 'Error parsing the files' }, { status: 500 }));
      }

      const file = files.file as any;

      if (!file) {
        return resolve(NextResponse.json({ message: 'No file uploaded' }, { status: 400 }));
      }

      const fileStream = await fs.readFile(file.filepath);

      try {
        const response = await uploadToS2({
          Bucket: process.env.S2_BUCKET as string,
          Key: file.newFilename,
          Body: fileStream,
          ContentType: file.mimetype || 'application/octet-stream',
        });

        resolve(NextResponse.json({ message: 'File uploaded successfully', response }));
      } catch (error) {
        resolve(NextResponse.json({ message: 'Upload failed', error: (error as Error).message }, { status: 500 }));
      }
    });
  })
}

export { POST }