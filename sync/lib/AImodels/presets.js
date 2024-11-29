export async function generatePresets({ text, audioFile }) {
    try {
        console.log("Received text:", text);
        if (audioFile) {
            console.log("Received audio file:", audioFile.name || "buffer");
        } else {
            console.log("No audio file received.");
        }

        // 더미 데이터 생성
        const results = [
            { title: "Preset Sample 1", description: 'Jazz Hiphop Morning', audioUrl: "/samples/fxp/blank_preset.fxp" },
            { title: "Preset Sample 2", description: 'Jazz Hiphop Afternoon', audioUrl: "/samples/fxp/blank_preset.fxp" },
            { title: "Preset Sample 3", description: 'Jazz Hiphop Evening', audioUrl: "/samples/fxp/blank_preset.fxp" },
        ];

        return { success: true, results };
    } catch (error) {
        console.error("Error in generateOneShots function:", error);
        return { success: false, error: error.message };
    }
}
