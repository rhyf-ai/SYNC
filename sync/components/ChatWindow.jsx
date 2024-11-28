// components/ChatWindow.jsx
"use client";

import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useMessagesStore } from "../app/stores/messagesStore";
import { useShowChatStore } from "../app/stores/showChatStore";
import { useSelectedMessageStore } from "@/app/stores/selectedMessageStore";
import {
    Messages,
    MessageContainer,
    MessageBubble,
    AssistantMessageBubble,
} from "./MessageComponents";
import InputToPrompt from './chatWindow/inputToPrompt'
import PlayMusic from "./showTables/PlayMusic";
import InputArea from "./InputArea";
import { useRouter } from "next/navigation";

const Container = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== "isMinimized",
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
                  width: 600px;
                  min-width: 40%;
                  max-width: 100%;
                  height: 100vh;
                  padding: min(3vw, 40px);
                  background-color: rgba(63, 45, 124, 0.05);
              `
            : css`
                  width: 100%;
                  /* 전체 화면일 때의 추가 스타일 */
              `}
`;

export default function ChatWindow() {
    const messages = useMessagesStore((state) => state.messages);
    const addMessage = useMessagesStore((state) => state.addMessage);
    const isShow = useShowChatStore((state) => state.isShow);
    const isMinimized = useShowChatStore((state) => state.isMinimized);
    const setIsMinimized = useShowChatStore((state) => state.setIsMinimized);
    const setSelectedMessage = useSelectedMessageStore(
        (state) => state.setSelectedMessage
    );
    const [intent, setIntent] = useState("CreateMusic");
    const [input, setInput] = useState("");
    const intents = ["CreateMusic", "ToneTransfer", "GiveSerum"];

    const [chatId, setChatId] = useState(null);
    const router = useRouter();

    //오디오 객체 URL 생성
    const [audioSrc, setAudioSrc] = useState(null);

    const handleArrowClick = (message) => {
        setSelectedMessage(message);
    };

    useEffect(() => {
        if (!isMinimized && !chatId) {
            // 처음 대화를 시작할 때 chatId 생성
            const newChatId = Date.now().toString();
            setChatId(newChatId);
        }
    }, [isMinimized, chatId]);

    if (!isShow) {
        return null;
    }

    return (
        <Container isMinimized={isMinimized}>
            <div style={{ height: isMinimized ? '120px' : '180px' }}></div>
            <Messages className={!isMinimized ? "hidden" : ""}>
                {messages.map((msg, idx) => (
                    <MessageContainer key={idx} isUser={msg.role === "user"}>
                        {msg.role === "user" ? (
                            <MessageBubble isUser={true}>
                                <p>{msg.content}</p>
                            </MessageBubble>
                        ) : (
                            <AssistantMessageBubble
                                message={msg}
                                id={idx}
                                onArrowClick={handleArrowClick}
                            />
                        )}
                    </MessageContainer>
                ))}
            </Messages>
            {!isMinimized && (
                <>
                    <div className="flex justify-start mb-10 mt-12">
                        {intents.map((item, index) => (
                            <button
                                key={item}
                                className={`px-7 py-2
                  ${intent === item ? "text-white" : "text-white opacity-40"}
                  ${index === 0 ? "rounded-l-xl" : ""}
                  ${index === intents.length - 1 ? "rounded-r-xl" : ""}
                  bg-[rgba(255,255,255,0.1)]
                `}
                                onClick={() => setIntent(item)}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                    <p className="text-3xl my-5 font-semibold">
                        {intent === "ToneTransfer"
                            ? "Please provide a description of the music you want to transfer the tone of."
                            : intent === "CreateMusic"
                            ? "Please provide a description of the music you want to create."
                            : "Please provide a description of the music you want to give serum to."}
                    </p>
                </>
            )}

            <InputArea
                input={input}
                setInput={setInput}
                isMinimized={isMinimized}
                intent={intent}
                addMessage={addMessage}
                messages={messages}
                setIsMinimized={setIsMinimized}
                setSelectedMessage={setSelectedMessage}
                chatId={chatId}
                setChatId={setChatId}
                setAudioSrc={setAudioSrc}
                router={router}
            />
            {!isMinimized && (
                <>
                    <InputToPrompt intent={intent} input={input} setInput={setInput} />
                </>
            )}
            {!isMinimized && audioSrc && (
                <div className="flex justify-center items-center gap-6 mt-10">
                    <PlayMusic audio={audioSrc} />
                </div>
            )}
        </Container>
    );
}
