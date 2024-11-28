// /app/api/AImodels/giveserum.js
import { NextResponse } from "next/server";
import FormData from "form-data";

export async function POST(request) {
    try {
        const { text } = await request.json();
        console.log("Received text:", text);

        // 더미 데이터 생성
        const data = [
            {
                title: "Element 1",
                style: "Style 1",
                file_path: "/samples/fxp/blank_preset.fxp",
            },
            {
                title: "Element 2",
                style: "Style 2",
                file_path: "/samples/fxp/blank_preset.fxp",
            },
            {
                title: "Element 3",
                style: "Style 3",
                file_path: "/samples/fxp/blank_preset.fxp",
            },
        ];

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error("Error in presets API:", error);
        return NextResponse.json({ success: false, error: error.message });
    }
}
