// components/ChatWindow.jsx
"use client";

import { useState, useEffect, useRef } from "react";
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
import PlayMusic from "./showTables/PlayMusic";
import InputArea from "./InputArea";
import { useRouter } from "next/navigation";
import { div, form } from "framer-motion/client";

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
    const setSelectedMessage = useSelectedMessageStore(
        (state) => state.setSelectedMessage
    );
    const [intent, setIntent] = useState("CreateMusic");

    const intents = ["CreateMusic", "ToneTransfer", "GiveSerum"];

    const [chatId, setChatId] = useState(null);
    const [input, setInput] = useState("");
    const router = useRouter();

    //첨부파일 구성
    const [selectedFile, setSelectedFile] = useState(null);
    const inputFileRef = useRef(null);

    //녹음파일 구성
    const [recordedBlob, setRecordedBlob] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef(null);

    //오디오 객체 URL 생성
    const [audioSrc, setAudioSrc] = useState(null);

    useEffect(() => {
        //useEffect를 사용하여 오디오 객체 URL 생성
        let url = null;
        if (selectedFile) {
            url = URL.createObjectURL(selectedFile);
            setAudioSrc(url);
        } else if (recordedBlob) {
            url = URL.createObjectURL(recordedBlob);
            setAudioSrc(url);
        } else {
            setAudioSrc(null);
        }
        return () => {
            if (url) {
                URL.revokeObjectURL(url);
            }
        };
    }, [selectedFile, recordedBlob]);

    const handleRecordClick = () => {
        if (isRecording) {
            // 녹음 중지
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        } else {
            // 녹음 시작
            navigator.mediaDevices
                .getUserMedia({ audio: true })
                .then((stream) => {
                    mediaRecorderRef.current = new MediaRecorder(stream);
                    mediaRecorderRef.current.start();

                    const audiochunks = [];
                    mediaRecorderRef.current.addEventListener(
                        "dataavailable",
                        (event) => {
                            audiochunks.push(event.data);
                        }
                    );

                    mediaRecorderRef.current.addEventListener("stop", () => {
                        const audioBlob = new Blob(audiochunks, {
                            type: "audio/wav",
                        }); //수정필요하면 mp3 부분 수정
                        setRecordedBlob(audioBlob);
                    });
                    setIsRecording(true);
                });
        }
    };

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

    //파일이 선택되면 녹음된 오디오 제거
    useEffect(() => {
        if (selectedFile) {
            setRecordedBlob(null);
        }
    }, [selectedFile]);
    //녹음이 완료되면 선택된 파일 제거
    useEffect(() => {
        if (recordedBlob) {
            setSelectedFile(null);
        }
    }, [recordedBlob]);

    const sendMessage = async () => {
        if (!input.trim()) {
            alert("Please enter some text.");
            return;
        }
        const userMessage = {
            role: "user",
            content: input,
            intent: isMinimized ? null : intent, // minimized되지 않았을 때만 intent 포함
        };
        addMessage(userMessage);
        setInput("");

        // 메시지 목록 업데이트
        const updatedMessages = [...messages, userMessage];

        const formData = new FormData();
        formData.append("messages", JSON.stringify(updatedMessages));

        if (selectedFile) {
            formData.append("audio", selectedFile);
        } else if (recordedBlob) {
            formData.append("audio", recordedBlob, "recording.wav");
        }
        console.log(formData);
        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (data.reply) {
                const assistantMessage = {
                    role: data.reply.role,
                    content: data.reply.content,
                    intent: data.reply.intent,
                    audioUrl: data.audioUrl || null,
                    fileUrl: data.fileUrl || null,
                    json: data.giveSerumJson || null,
                };
                addMessage(assistantMessage);
                setSelectedMessage(assistantMessage);

            } else if (data.error) {
                console.error("Error from API:", data.error);
            }

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
            {isMinimized && <div style={{ height: "120px" }}></div>}
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
                <div className="flex justify-start mb-10">
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
                sendMessage={sendMessage}
                isMinimized={isMinimized}
            />
            {!isMinimized && (
                <div className="flex justify-center items-center gap-6 mt-10">
                    <ReferenceBtn onClick={() => inputFileRef.current.click()}>
                        <input
                            type="file"
                            accept="audio/*"
                            ref={inputFileRef}
                            style={{ display: "none" }}
                            onChange={(e) => {
                                if (e.target.files.length > 0)
                                    setSelectedFile(e.target.files[0]);
                            }}
                        />
                        Add Reference Audio
                    </ReferenceBtn>
                    <RecordBtn onClick={handleRecordClick}>
                        <img src="/img/components/audiobtn.svg" alt="" />
                        <p>{isRecording ? "Stop Recording" : "Record"}</p>
                    </RecordBtn>
                </div>
            )}
            {!isMinimized && audioSrc && (
                <div className="flex justify-center items-center gap-6 mt-10">
                    <PlayMusic audio={audioSrc} />
                </div>
            )}
        </Container>
    );
}
