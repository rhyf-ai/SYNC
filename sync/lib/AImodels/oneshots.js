export async function generateOneShots({ text, audioFile }) {
    try {
        console.log('Received text:', text);
        if (audioFile) {
            console.log('Received audio file:', audioFile.name || 'buffer');
        } else {
            console.log('No audio file received.');
        }

        // 더미 데이터 생성
        const results = [
            { title: 'Smooth', audioUrl: '/samples/kicksample.wav' },
            { title: 'Intense', audioUrl: '/samples/kicksample.wav' },
            { title: 'Chill', audioUrl: '/samples/kicksample.wav' },
        ];

        return { success: true, results };
    } catch (error) {
        console.error('Error in generateOneShots function:', error);
        return { success: false, error: error.message };
    }
}
