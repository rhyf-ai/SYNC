// /app/api/chat/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { messages } = await request.json();

  if (!messages || !Array.isArray(messages)) {
    return NextResponse.json({ error: 'Invalid messages format' }, { status: 400 });
  }

  // 메시지에서 불필요한 필드 제거
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
      // 응답 메시지에서 불필요한 필드 제거
      const assistantMessage = {
        role: data.choices[0].message.role,
        content: data.choices[0].message.content,
      };
      return NextResponse.json({ reply: assistantMessage });
    } else {
      console.error('Unexpected response structure:', data);
      return NextResponse.json({ error: 'Unexpected response structure' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error fetching ChatGPT response:', error);
    return NextResponse.json({ error: 'Error fetching ChatGPT response' }, { status: 500 });
  }
}
