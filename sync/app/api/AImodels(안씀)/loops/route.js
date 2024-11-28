// /app/api/AImodels/tonetransfer.js
import { NextResponse } from "next/server";
import FormData from "form-data";
export async function POST(request) {
    try {
        const formData = await request.formData();
        const text = formData.get("text");
        const audioFile = formData.get("audioFile"); // 필수

        console.log("Received text:", text);
        if (!audioFile) {
            return NextResponse.json(
                { success: false, error: "audioFile is required" },
                { status: 400 }
            );
        }
        console.log("Received audio file:", audioFile.name);

        // 더미 데이터 생성
        const audioUrl = [
            "/samples/audio/transfer1.mp3",
            "/samples/audio/transfer2.mp3",
        ];

        return NextResponse.json({ success: true, audioUrl });
    } catch (error) {
        console.error("Error in tonetransfer API:", error);
        return NextResponse.json({ success: false, error: error.message });
    }
}
