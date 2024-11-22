// /components/MessageComponents.jsx
import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPause,
    faPlay,
    faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

export const Messages = styled.div`
    flex: 1;
    overflow-y: scroll;
    padding: 16px;
`;

export const MessageContainer = styled.div`
    display: flex;
    justify-content: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
    margin-bottom: 10px;
`;

export const MessageBubble = styled.div`
    background: ${(props) =>
        props.isUser
            ? "linear-gradient(90deg, #5436FF 0%, #3D1CFB 100%)"
            : "#FFF"};
    color: #000;
    padding: 14px 30px;
    max-width: 60%;
    word-wrap: break-word;
    position: relative;
    border-radius: ${(props) =>
        props.isUser ? "20px 5px 20px 20px" : "5px 20px 20px 20px"};
    align-self: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
    color: ${(props) => (props.isUser ? "#FFF" : "#000")};
`;

const BubbleContainer = styled.div`
    background-color: #f0f0f0;
    color: #000;
    padding: 10px;
    margin: 5px 0;
    max-width: 60%;
    word-wrap: break-word;
    position: relative;
    border-radius: 5px 20px 20px 20px;
    align-self: flex-start;
`;

const ResponseText = styled.p`
    margin-bottom: 10px;
`;

const AudioControls = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const MusicIcon = styled.img`
    width: 24px;
    height: 24px;
`;

const PlayButton = styled.button`
    /* 스타일 추가 */
`;

const Slider = styled.input`
    flex-grow: 1;
`;

const ArrowButton = styled.button`
    /* 스타일 추가 */
`;

export function AssistantMessageBubble({ message }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioTime, setAudioTime] = useState(0);
    const [audioPercentage, setAudioPercentage] = useState(0);
    const audioRef = useRef(null);

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const currentTime = audioRef.current.currentTime;
            const duration = audioRef.current.duration;
            const percentage = (currentTime / duration) * 100;
            setAudioTime(percentage);
        }
    };

    const handleSliderChange = (e) => {
        const percentage = e.target.value;
        if (audioRef.current) {
            const duration = audioRef.current.duration;
            const newTime = (percentage / 100) * duration;
            audioRef.current.currentTime = newTime;
            setAudioPercentage(percentage);
        }
    };

    return (
        <BubbleContainer>
            <ResponseText>{message.content}</ResponseText>
            <MusicIcon
                    src="/img/components/music-icon.svg"
                    alt="Music Icon"
                />
            <AudioControls>
                
                <PlayButton onClick={() => setIsPlaying(!isPlaying)}>
                    {isPlaying ? (
                        <FontAwesomeIcon icon={faPause} />
                    ) : (
                        <FontAwesomeIcon icon={faPlay} />
                    )}
                </PlayButton>
                <Slider
                    type="range"
                    min="0"
                    max="100" // 오디오 길이에 따라 조절 필요
                    value={audioTime}
                    onChange={handleSliderChange}
                />
                <ArrowButton>
                    <FontAwesomeIcon icon={faArrowRight} />
                </ArrowButton>
            </AudioControls>
            <audio
                ref={audioRef}
                src={message.audioUrl}
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setIsPlaying(false)}
            />
        </BubbleContainer>
    );
}
