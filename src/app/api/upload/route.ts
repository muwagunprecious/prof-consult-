import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file was uploaded." }, { status: 400 });
    }

    // Read file buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Convert to serverless-friendly base64 data URI to prevent write errors on Vercel's read-only filesystem
    const base64 = buffer.toString("base64");
    const fileUrl = `data:${file.type || "image/jpeg"};base64,${base64}`;

    return NextResponse.json({ url: fileUrl });
  } catch (error) {
    console.error("Upload API error:", error);
    return NextResponse.json({ error: "Failed to upload file to the server." }, { status: 500 });
  }
}
