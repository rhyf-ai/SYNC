// /components/MessageComponents.jsx
import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelectedMessageStore } from "../app/stores/selectedMessageStore";

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
    width: 40px;
    font-size: 20px;
    aspect-ratio: 1/1;
    color: #fff;
    ${(props) =>
        props.isSelected
            ? `background-color: #2600FF;`
            : `background-color: #000;`}

    border-radius: 50%;
`;

export function AssistantMessageBubble({ message, id, onArrowClick, isSelected }) {
    return (
        <BubbleContainer>
            <ResponseText>{message.content}</ResponseText>
            <p>{message.intent}</p>
            <div className="flex justify-end">
                <ArrowButton isSelected={isSelected} onClick={() => onArrowClick(message)}>
                    <FontAwesomeIcon icon={faArrowRight} />
                </ArrowButton>
            </div>
        </BubbleContainer>
    );
}
