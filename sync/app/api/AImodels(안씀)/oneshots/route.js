// /app/api/AImodels/createmusic.js
import { NextResponse } from "next/server";
import FormData from "form-data";

export async function POST(request) {
    try {
        const formData = await request.formData();
        const text = formData.get("text");
        const audioFile = formData.get("audioFile"); // 있을 수도, 없을 수도 있음

        console.log("Received text:", text);
        if (audioFile) {
            console.log("Received audio file:", audioFile.name);
        } else {
            console.log("No audio file received.");
        }

        // 더미 데이터 생성
        const audioUrl = [
            "/samples/audio/track1.mp3",
            "/samples/audio/track2.mp3",
        ];

        return NextResponse.json({ success: true, audioUrl });
    } catch (error) {
        console.error("Error in createmusic API:", error);
        return NextResponse.json({ success: false, error: error.message });
    }
}
