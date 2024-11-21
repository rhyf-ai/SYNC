// components/ChatWindow.jsx
"use client";

import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useMessagesStore } from "../app/stores/messagesStore";
import { useShowChatStore } from "../app/stores/showChatStore";
import { Messages, MessageContainer, MessageBubble } from "./MessageComponents";
import InputArea from "./InputArea";
import { useRouter } from "next/navigation";
import { div } from "framer-motion/client";

const Container = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'isMinimized',
  })`
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
    transition: all 0.5s ease;
    flex-shrink: 0;

    ${(props) =>
        props.isMinimized
            ? css`
                  width: 30%;
                  height: 100vh;
                  /* 최소화된 상태의 추가 스타일 */
              `
            : css`
                  width: 100%;
                  /* 전체 화면일 때의 추가 스타일 */
              `}
`;

const ReferenceBtn = styled.button`
    background-color: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 100px;
    width: 471px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: 700;
    font-size: 20px;
`;
const RecordBtn = styled.button`
    border: none;
    background-color: white;
    color: #5436ff;
    border-radius: 100px;
    width: 237px;
    height: 60px;
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    font-size: 20px;
`;

export default function ChatWindow() {
    const messages = useMessagesStore((state) => state.messages);
    const addMessage = useMessagesStore((state) => state.addMessage);
    const isShow = useShowChatStore((state) => state.isShow);
    const isMinimized = useShowChatStore((state) => state.isMinimized);
    const setIsMinimized = useShowChatStore((state) => state.setIsMinimized);

    const [input, setInput] = useState("");
    const router = useRouter();

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { role: "user", content: input };
        addMessage(userMessage);
        setInput("");

        const filteredMessages = [...messages, userMessage].map((msg) => ({
            role: msg.role,
            content: msg.content,
        }));

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: filteredMessages }),
            });

            const data = await response.json();

            if (data.reply) {
                const assistantMessage = {
                    role: data.reply.role,
                    content: data.reply.content,
                };
                addMessage(assistantMessage);
            } else if (data.error) {
                console.error("Error from API:", data.error);
            }

            // 새로운 채팅 ID 생성 (예: 임의 숫자)
            const chatId = Date.now(); // 간단히 현재 시간으로 생성

            // 애니메이션을 위해 isMinimized 상태를 true로 변경
            setIsMinimized(true);

            // 애니메이션이 완료된 후 라우팅 (0.5초 후)
            setTimeout(() => {
                router.push(`/chat/${chatId}`, undefined, { shallow: true });
            }, 500);
        } catch (error) {
            console.error("Network error:", error);
        }
    };

    if (!isShow) {
        return null;
    }

    return (
        <Container isMinimized={isMinimized}>
            {isMinimized && (
                <div style={{height: '120px'}}></div>
            )}
            <Messages className={!isMinimized ? "hidden" : ""}>
                {messages.map((msg, idx) => (
                    <MessageContainer key={idx} isUser={msg.role === "user"}>
                        <MessageBubble isUser={msg.role === "user"}>
                            <p>{msg.content}</p>
                        </MessageBubble>
                    </MessageContainer>
                ))}
            </Messages>
            <InputArea
                input={input}
                setInput={setInput}
                sendMessage={sendMessage}
                isMinimized={isMinimized}
            />
            {!isMinimized && (
                <div className="flex justify-center items-center gap-6 mt-10">
                    <ReferenceBtn>Add Reference Audio</ReferenceBtn>
                    <RecordBtn>
                        <img src="/img/components/audiobtn.svg" alt="" />
                        <p>Record</p>
                    </RecordBtn>
                </div>
            )}
        </Container>
    );
}
