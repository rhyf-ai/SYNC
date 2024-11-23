// /app/api/chat/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { messages } = await request.json();

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

  const intent = await detectIntent(latestUserMessage.content, previousIntent);

  latestUserMessage.intent = intent;

  const filteredMessages = messages.map((msg) => ({
    role: msg.role,
    content: msg.content,
  }));

  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error('API key is missing');
      return NextResponse.json({ error: 'API key is missing' }, { status: 500 });
    }

    const url = 'https://api.openai.com/v1/chat/completions';

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: filteredMessages,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Failed to fetch ChatGPT response:', error);
      return NextResponse.json({ error: error.error.message }, { status: response.status });
    }

    const data = await response.json();

    if (
      data.choices &&
      data.choices[0] &&
      data.choices[0].message &&
      data.choices[0].message.content
    ) {
      const assistantMessage = {
        role: data.choices[0].message.role,
        content: data.choices[0].message.content,
        intent: intent,
      };
      return NextResponse.json({ reply: assistantMessage, audioUrl: '/samples/audio_sample.mp3' });
    } else {
      console.error('Unexpected response structure:', data);
      return NextResponse.json({ error: 'Unexpected response structure' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error fetching ChatGPT response:', error);
    return NextResponse.json({ error: 'Error fetching ChatGPT response' }, { status: 500 });
  }
}


async function detectIntent(userMessage, previousIntent) {
  const apiKey = process.env.OPENAI_API_KEY;
  const url = 'https://api.openai.com/v1/chat/completions';

  // 프롬프트 설정
  const messages = [
    {
      role: 'system',
      content: `
당신은 사용자 메시지를 분석하여 다음 세 가지 intent 중 하나를 반환하는 어시스턴트입니다: 1: 'toneTransfer', 2: 'createMusic', 3: 'giveSerum'.
tonetransfer의 예시: "내가 올린 음악파일을 클라리넷 사운드로 바꾸고 싶어."
createMusic의 예시: "kpop, lofi스타일의 음악을 만들어줘"
giveSerum의 예시: "발로란트 ost 스타일의 곡 베이스를 vsti 세럼으로만들고싶어."
- 사용자의 메시지가 intent를 변경하는 경우, 새로운 intent를 반환합니다.
- 그렇지 않다면, 이전 intent를 반환합니다.
- 오직 intent만 한 단어로 반환하고, 추가적인 텍스트는 포함하지 않습니다.
- toneTransfer, createMusic, giveSerum 중 하나만을 반환하며, 다른 것은 반환하지 않습니다.
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
        messages: messages,
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

    const intent = data.choices[0].message.content.trim();

    // 의도한 세 가지 중 하나인지 확인
    if (['toneTransfer', 'createMusic', 'giveSerum'].includes(intent)) {
      return intent;
    } else {
      // 모델이 예상치 못한 응답을 할 경우 이전 intent를 반환
      return previousIntent || 'toneTransfer'; // 기본값 설정 가능
    }
  } catch (error) {
    console.error('Error detecting intent:', error);
    // 에러 발생 시 이전 intent 또는 기본 intent 반환
    return previousIntent || 'toneTransfer';
  }
}
