// /app/api/chat/route.js
import { NextResponse } from 'next/server';
import { generateOneShots } from '@/lib/AImodels/oneshots';
import { generateLoops } from '@/lib/AImodels/loops';
import { generatePresets } from '@/lib/AImodels/presets';

export async function POST(request) {
    const formData = await request.formData();

    const messagesJson = formData.get('messages');
    const messages = JSON.parse(messagesJson);

    const audioFile = formData.get('audio'); // 오디오 파일

    if (audioFile) {
        console.log('audioFile:', {
            name: audioFile.name,
            size: audioFile.size,
            type: audioFile.type,
        });
    } else {
        console.log('No audio file received.');
    }

    if (!messages || !Array.isArray(messages)) {
        return NextResponse.json({ error: 'Invalid messages format' }, { status: 400 });
    }

    let previousIntent = null;
    for (let i = messages.length - 1; i >= 0; i--) {
        if (messages[i].intent) {
            previousIntent = messages[i].intent;
            break;
        }
    }

    const latestUserMessage = messages[messages.length - 1];
    if (!latestUserMessage || latestUserMessage.role !== 'user') {
        return NextResponse.json({ error: 'No user message found' }, { status: 400 });
    }

    let intent = null;
    // 최신 메시지에 intent가 포함되어 있고, 이전 intent가 없는 경우 (초기 메시지)
    if (latestUserMessage.intent && !previousIntent) {
        intent = latestUserMessage.intent;
    } else {
        // intent를 감지합니다.
        intent = await detectIntent(latestUserMessage.content, previousIntent);
    }
    console.log('Detected intent:', intent);
    latestUserMessage.intent = intent;

    const text = latestUserMessage.content;

    const internalApiResponse = await callInternalFunction(intent, text, audioFile);
    console.log('internalApiResponse:', internalApiResponse);
    if (internalApiResponse.success) {
        const gptMessage = `
        The given prompt: ${text}
Result: Success
Based on this, analyze the context of the prompt I provided and generate a single sentence summarizing that the result was successfully generated. The response should always be in English or Korean`;

        // GPT에게 응답을 생성하도록 요청합니다.
        const assistantMessage = await generateGptResponse(messages, gptMessage);

        // 결과를 반환합니다.
        return NextResponse.json({
            reply: assistantMessage,
            intent: intent,
            data: internalApiResponse.data.results, // 필요한 데이터 추가
        });
    } else {
        // 실패한 경우 처리
        const errorMessage = `죄송합니다. 요청하신 작업을 수행하는 데 오류가 발생했습니다. 다시 시도해 주세요.`;

        // GPT에게 에러 메시지를 생성하도록 요청합니다.
        const assistantMessage = await generateGptResponse(messages, errorMessage);

        return NextResponse.json({ reply: assistantMessage }, { status: 500 });
    }
}

// 내부 API 호출 함수

// async function callInternalApi(intent, text, audioFile) {
//     try {
//         let apiEndpoint;
//         let formData = new FormData();
//         const baseURL = "http://localhost:3000"; // 내부 API 호출을 위한 기본 URL
//         // intent에 따라 다른 API 엔드포인트와 요청 데이터 설정
//         if (intent === "OneShots") {
//             apiEndpoint = `${baseURL}/api/AImodels/oneshots`;
//             formData.append("text", text);
//         } else if (intent === "Loops") {
//             apiEndpoint = `${baseURL}/api/AImodels/loops`;
//             formData.append("text", text);
//             if (audioFile) {
//                 const arrayBuffer = await audioFile.arrayBuffer();
//                 const buffer = Buffer.from(arrayBuffer);
//                 formData.append("audioFile", buffer, {
//                     filename: audioFile.name,
//                     contentType: audioFile.type,
//                 });
//             }
//         } else if (intent === "presets") {
//             apiEndpoint = `${baseURL}/api/AImodels/presets`;
//             formData.append("text", text);
//             if (!audioFile) {
//                 return {
//                     success: false,
//                     error: "Audio file is required for toneTransfer.",
//                 };
//             }
//             const arrayBuffer = await audioFile.arrayBuffer();
//             const buffer = Buffer.from(arrayBuffer);
//             formData.append("audioFile", buffer, {
//                 filename: audioFile.name,
//                 contentType: audioFile.type,
//             });
//         } else {
//             return { success: false, error: "Unknown intent." };
//         }

//         // 내부 API 호출
//         const response = await fetch(apiEndpoint, {
//             method: "POST",
//             body: formData,
//             headers: formData.getHeaders(),
//             // 서버 측에서 상대 경로로 호출할 때 다음 옵션 추가
//             next: { revalidate: 0 },
//         });

//         if (!response.ok) {
//             const errorText = await response.text();
//             console.error("Internal API call failed:", errorText);
//             return { success: false };
//         }

//         const data = await response.json();

//         if (data.success) {
//             return { success: true, data };
//         } else {
//             console.error("Internal API error:", data.error);
//             return { success: false };
//         }
//     } catch (error) {
//         console.error("Error calling internal API:", error);
//         return { success: false };
//     }
// }
async function callInternalFunction(intent, text, audioFile) {
    try {
        let result;

        // intent에 따라 다른 함수 호출
        if (intent === 'OneShots') {
            result = await generateOneShots({ text, audioFile });
        } else if (intent === 'Loops') {
            result = await generateLoops({ text, audioFile });
        } else if (intent === 'Presets') {
            result = await generatePresets({ text, audioFile });
        } else {
            return { success: false, error: 'Unknown intent.' };
        }
        console.log('result:', result);
        return { success: true, data: result };
    } catch (error) {
        console.error('Error in callInternalFunction:', error);
        return { success: false };
    }
}

async function generateGptResponse(messages, gptMessage) {
    const apiKey = process.env.OPENAI_API_KEY;
    const url = 'https://api.openai.com/v1/chat/completions';

    // 기존 메시지에 GPT 메시지를 추가
    const updatedMessages = [...messages, { role: 'user', content: gptMessage }];

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: updatedMessages,
                temperature: 0.7,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('Failed to fetch ChatGPT response:', error);
            throw new Error(error.error.message);
        }

        const data = await response.json();

        if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
            const assistantMessage = {
                role: data.choices[0].message.role,
                content: data.choices[0].message.content,
                intent: messages[messages.length - 1].intent,
            };
            return assistantMessage;
        } else {
            console.error('Unexpected response structure:', data);
            throw new Error('Unexpected response structure');
        }
    } catch (error) {
        console.error('Error fetching ChatGPT response:', error);
        throw new Error('Error fetching ChatGPT response');
    }
}

async function detectIntent(userMessage, previousIntent) {
    const apiKey = process.env.OPENAI_API_KEY;
    const url = 'https://api.openai.com/v1/chat/completions';

    // 프롬프트 설정
    const messagesForIntent = [
        {
            role: 'system',
            content: `
            You are an assistant that identifies the user's intent based on their message and returns one of the following three options: 'OneShots', 'Loops', or 'Presets'.

            Intent Definitions:
            OneShots: The user is requesting a single-shot audio sample. One-shot samples are short, standalone sounds that do not loop (e.g., a drum kick or a snare hit).
            
            Example: "Create an R&B drum kick."
            Loops: The user is requesting a looped audio sample. Loops are short musical sequences that repeat, often involving multiple instruments.
            
            Example: "Make a piano loop in a K-pop or lo-fi style."
            Presets: The user is requesting a preset file (e.g., .fxp) to use with a plugin or software instrument.
            
            Example: "Design a bassline preset for a Valorant OST-style track using Serum VSTi."
            Rules:
            If the user's message indicates a change in intent, return the new intent.
            If the user's message aligns with the previous intent, return the same intent.
            Respond with only one word: OneShots, Loops, or Presets. Do not include any additional text.
            Make sure to accurately infer intent based on the context of the user's request.
`.trim(),
        },
        {
            role: 'user',
            content: `
이전 intent: ${previousIntent || '없음'}
사용자 메시지: ${userMessage}
`.trim(),
        },
    ];

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: messagesForIntent,
                temperature: 0,
                max_tokens: 10,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('Failed to detect intent:', error);
            throw new Error(error.error.message);
        }

        const data = await response.json();

        const detectedIntent = data.choices[0].message.content.trim();

        // 의도한 세 가지 중 하나인지 확인
        if (['OneShots', 'Loops', 'Presets'].includes(detectedIntent)) {
            return detectedIntent;
        } else {
            // 모델이 예상치 못한 응답을 할 경우 이전 intent를 반환
            return previousIntent || 'Loops'; // 기본값 설정 가능
        }
    } catch (error) {
        console.error('Error detecting intent:', error);
        // 에러 발생 시 이전 intent 또는 기본 intent 반환
        return previousIntent || 'Loops';
    }
}
