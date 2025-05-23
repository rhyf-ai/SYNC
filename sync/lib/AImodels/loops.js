export async function generateLoops({ text, audioFile }) {
    try {
        console.log('Received text:', text);
        if (audioFile) {
            console.log('Received audio file:', audioFile.name || 'buffer');
        } else {
            console.log('No audio file received.');
        }

        // 더미 데이터 생성
        const results = [
            { title: 'Loop Sample 1', audioUrl: '/samples/pianoloop.wav' },
            { title: 'Loop Sample 2', audioUrl: '/samples/pianoloop.wav' },
            { title: 'Loop Sample 3', audioUrl: '/samples/pianoloop.wav' },
        ];

        return { success: true, results };
    } catch (error) {
        console.error('Error in generateOneShots function:', error);
        return { success: false, error: error.message };
    }
}
