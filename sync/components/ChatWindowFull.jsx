// components/ChatWindowFull.jsx
"use client";

import { useState } from "react";
import styled from "styled-components";
import { useMessagesStore } from "../app/stores/messagesStore";
import { Messages, MessageContainer, MessageBubble } from "./MessageComponents";
import InputArea from "./InputArea";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
`;

export default function ChatWindowFull() {
    const messages = useMessagesStore((state) => state.messages);
    const addMessage = useMessagesStore((state) => state.addMessage);
    const [input, setInput] = useState("");

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
        } catch (error) {
            console.error("Network error:", error);
        }
    };

    return (
        <Container>
            <Messages>
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
                isMinimized={false}
            />
        </Container>
    );
}
