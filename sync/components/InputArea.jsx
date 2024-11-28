// /components/InputArea.jsx
import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import FormData from "form-data";
const InputAreaContainer = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== "isMinimized",
})`
    position: relative;
    display: flex;
    width: 100%;
    background-color: transparent;
    border: 2px solid #e2e8f0;
    border-radius: 30px;

    /* 그라데이션 그림자 구현 */
    &::before {
        content: "";
        position: absolute;
        top: -2px; /* 그림자의 두께를 조절합니다 */
        left: -2px;
        right: -2px;
        bottom: -2px;
        background: linear-gradient(
            180deg,
            #d9d9d9 0%,
            #efd0ff 10%,
            #999999 50%,
            #aacdff 100%
        );
        z-index: 0; /* 부모 요소와 동일한 z-index */
        filter: blur(4px); /* 그림자 효과 */
        border-radius: 32px; /* 부모 요소보다 조금 더 큰 반경 */
        pointer-events: none; /* 가상 요소가 이벤트를 받지 않도록 */
    }

    /* 내부의 입력 요소와 버튼에 z-index를 높여서 가상 요소 위에 오도록 */
    & > * {
        position: relative;
        z-index: 1;
    }

    & input {
        background-color: transparent;
        border: none;
        font-size: 18px;
        flex: 1;
        &:focus {
            outline: none;
        }
        &::placeholder {
            font-size: 18px;
            background: linear-gradient(
                90deg,
                #fff 0%,
                rgba(255, 255, 255, 0.3) 40.76%
            );
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
    }

    ${(props) =>
        !props.isMinimized &&
        `
        margin-top: 8px;
        width: 1208px;
      `}
`;

const RecordButton = styled.button`
    /* 필요한 스타일 추가 */
    background: none;
    border: none;
    cursor: pointer;
`;

const InputFileButton = styled.button`
    /* 필요한 스타일 추가 */
    background: none;
    border: none;
    cursor: pointer;
`;

const SendButton = styled.button`
    transition: background 0.3s ease, box-shadow 0.3s ease;
    width: 50px;
    aspect-ratio: 1/1;
    border-radius: 50%;
    background: linear-gradient(136deg, #2600ff 15.04%, #8975f4 86.06%);
    box-shadow: 0px 10px 50px 0px rgba(8, 2, 45, 0.35);
    backdrop-filter: blur(50px);
    margin: 6px;
    position: relative;
    & img {
        position: absolute;
        top: 52%;
        left: 50%;
        transform: translate(-50%, -50%);
        max-width: 50%;
    }
`;

export default function InputArea({
    input,
    setInput,
    isMinimized,
    intent,
    addMessage,
    messages,
    setIsMinimized,
    setSelectedMessage,
    chatId,
    setChatId,
    setAudioSrc,
    router,
}) {
    const [selectedFile, setSelectedFile] = useState(null);
    const inputFileRef = useRef(null);

    const [recordedBlob, setRecordedBlob] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef(null);

    useEffect(() => {
        // 오디오 객체 URL 생성
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

    // 파일이 선택되면 녹음된 오디오 제거
    useEffect(() => {
        if (selectedFile) {
            setRecordedBlob(null);
        }
    }, [selectedFile]);

    // 녹음이 완료되면 선택된 파일 제거
    useEffect(() => {
        if (recordedBlob) {
            setSelectedFile(null);
        }
    }, [recordedBlob]);

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
                        });
                        setRecordedBlob(audioBlob);
                    });
                    setIsRecording(true);
                })
                .catch((error) => {
                    console.error("Error accessing microphone:", error);
                    alert("Microphone access denied.");
                });
        }
    };

    const handleSendMessage = async () => {
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

        let audioBase64 = null;

        const formData = new FormData();
        formData.append("messages", JSON.stringify(updatedMessages));

        if (selectedFile) {
            formData.append("audio", selectedFile);
            //audioBase64 = await fileToBase64(selectedFile);
        } else if (recordedBlob) {
            formData.append("audio", recordedBlob, "recording.wav");
        }

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
                console.log("Assistant message:", assistantMessage);
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

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); // 기본 Enter 키 동작 방지
            handleSendMessage();
        }
    };

    return (
        <InputAreaContainer isMinimized={isMinimized}>
            <div
                style={{
                    width: "100%",
                    borderRadius: "30px",
                    backgroundColor: "#0F0332",
                    display: "flex",
                    padding: "0px 4px 0px 20px",
                    alignItems: "center",
                }}
            >
                <input
                    className="border rounded w-full p-2"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={
                        !isMinimized
                            ? "Please describe the sample you want to generate."
                            : "Add more Details"
                    }
                />
                <div className="flex gap-2 px-3">
                    <RecordButton onClick={handleRecordClick}>
                        {isRecording ? (
                            <img
                                src="/img/components/recordbtn_filled.svg"
                                alt=""
                            />
                        ) : (
                            <img src="/img/components/recordbtn.svg" alt="" />
                        )}
                    </RecordButton>
                    <InputFileButton
                        onClick={() => inputFileRef.current.click()}
                    >
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
                        <img src="/img/components/inputfilebtn.svg" alt="" />
                    </InputFileButton>
                </div>

                <SendButton
                    className="flex justify-center items-center"
                    onClick={handleSendMessage}
                >
                    <img src="/img/components/Subtract.svg" alt="" />
                </SendButton>
            </div>
        </InputAreaContainer>
    );
}
