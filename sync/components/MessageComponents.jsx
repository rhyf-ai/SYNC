// /components/MessageComponents.jsx
import styled from "styled-components";

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
    background-color: ${(props) => (props.isUser ? "#DCF8C6" : "#FFD9CE")};
    color: #000;
    padding: 10px;
    border-radius: 10px;
    max-width: 60%;
    word-wrap: break-word;
    position: relative;

    &:after {
        content: "";
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
      border-color: transparent #FFD9CE transparent transparent;
      border-style: solid;
      top: 10px;
    `}
    }
`;
