// /components/ChatWindow.js
'use client';

import { useState } from 'react';
import styled from 'styled-components';

const InputArea = styled.div`
  display: flex;
  gap: 20px;

  ${(props) =>
    props.minimized &&
    `
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: white;
    padding: 10px;
  `}
`;

const MessageContainer = styled.div`
  display: flex;
  justify-content: ${(props) => (props.isUser ? 'flex-end' : 'flex-start')};
  margin-bottom: 10px;
`;

const MessageBubble = styled.div`
  background-color: ${(props) => (props.isUser ? '#DCF8C6' : '#FFD9CE')};
  color: #000;
  padding: 10px;
  border-radius: 10px;
  max-width: 60%;
  word-wrap: break-word;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    ${(props) =>
      props.isUser
        ? `
      right: -10px;
      border-width: 10px 0 10px 10px;
      border-color: transparent transparent transparent #DCF8C6;
      border-style: solid;
      top: 10px;
    `
        : `
      left: -10px;
      border-width: 10px 10px 10px 0;
      border-color: transparent #FFFFFF transparent transparent;
      border-style: solid;
      top: 10px;
    `}
  }
`;

export default function ChatWindow({ minimized }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');

    const filteredMessages = updatedMessages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: filteredMessages }),
    });

    const data = await response.json();

    if (data.reply) {
      const assistantMessage = {
        role: data.reply.role,
        content: data.reply.content,
      };
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    } else if (data.error) {
      console.error('Error from API:', data.error);
    }
  };

  return (
    <div
      className={`chat-window ${minimized ? 'minimized' : ''}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative',
      }}
    >
      <div className="messages flex-1 overflow-y-scroll p-4">
        {messages.map((msg, idx) => (
          <MessageContainer key={idx} isUser={msg.role === 'user'}>
            <MessageBubble isUser={msg.role === 'user'}>
              <p>{msg.content}</p>
            </MessageBubble>
          </MessageContainer>
        ))}
      </div>
      <InputArea minimized={minimized} className="input-area mt-2">
        <input
          className="border rounded w-full p-2"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="메시지를 입력하세요..."
        />
        <button
          className="bg-blue-500 text-white rounded p-2 mt-2"
          onClick={sendMessage}
        >
          보내기
        </button>
      </InputArea>
    </div>
  );
}
