import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";

const AudioControls = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    border-radius: 35.75px;
    background: rgba(244, 244, 244, 0.12);
`;

const MusicIcon = styled.img`
    width: 24px;
    height: 24px;
`;

const PlayButton = styled.button`
    display: flex;
    width: 45px;
    height: 45px;
    justify-content: center;
    align-items: center;
    border-radius: 137.5px;
    background: linear-gradient(90deg, #5436ff 0%, #705be6 100%);
    box-shadow: 0px 13.75px 68.75px 0px rgba(8, 2, 45, 0.35);
    backdrop-filter: blur(68.75px);
`;

const Slider = styled.input.attrs({ type: "range" })`
    flex-grow: 1;
    /* 기본 스타일 제거 */
    -webkit-appearance: none;
    background: transparent;

    /* 슬라이더 트랙 스타일 */
    &::-webkit-slider-runnable-track {
        width: 100%;
        height: 4px; /* 트랙 높이 조정 */
        background: rgba(255, 255, 255, 0.37); /* 배경색 변경 */
        border-radius: 2px;
        cursor: pointer;
    }

    &::-moz-range-track {
        width: 100%;
        height: 4px;
        background: rgba(255, 255, 255, 0.37);
        border-radius: 2px;
        cursor: pointer;
    }

    /* 썸(동그란 부분) 스타일 */
    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 16px; /* 썸 크기 증가 */
        height: 16px;
        background: white; /* 썸 색상 변경 */
        border-radius: 50%;
        cursor: pointer;
        margin-top: -6px; /* 썸 위치 조정 */
    }

    &::-moz-range-thumb {
        width: 16px;
        height: 16px;
        background: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
    }

    /* 포커스 스타일 제거 */
    &:focus {
        outline: none;
    }

    /* 슬라이더 채워진 부분 스타일 (WebKit) */
    &::-webkit-slider-runnable-track {
        background: linear-gradient(
            to right,
            white ${(props) => props.value}%,
            rgba(255, 255, 255, 0.37) ${(props) => props.value}%
        );
    }

    /* 슬라이더 채워진 부분 스타일 (Firefox) */
    &::-moz-range-progress {
        background-color: white;
        height: 4px;
    }

    &::-moz-range-track {
        background-color: rgba(255, 255, 255, 0.37);
        height: 4px;
    }
`;

const TimeDisplay = styled.span`
    padding: 0px 5px;
    text-align: center;
`;

export default function PlayMusicHome({ audio }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioTime, setAudioTime] = useState(0);
    const [audioPercentage, setAudioPercentage] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

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
            setCurrentTime(currentTime); // 현재 시간을 상태로 설정
            setDuration(duration); // 총 길이를 상태로 설정
        }
    };

    const formatTime = (time) => {
        if (isNaN(time)) {
            return "0:00";
        }
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
        return `${minutes}:${formattedSeconds}`;
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
        <>
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
                <div style={{padding: '0px 20px'}}>
                    <TimeDisplay>{formatTime(currentTime)}</TimeDisplay>|
                    <TimeDisplay>{formatTime(duration)}</TimeDisplay>
                </div>

                <audio
                    ref={audioRef}
                    src={audio}
                    // onLoadedMetadata={handleLoadedMetadata}
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={() => setIsPlaying(false)}
                />
            </AudioControls>
        </>
    );
}
