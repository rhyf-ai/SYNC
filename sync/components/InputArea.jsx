// /components/InputArea.jsx
import styled from "styled-components";

const InputAreaContainer = styled.div`
    display: flex;
    width: 100%;
    background-color: transparent;
    gap: 20px;
    padding: 0px 20px;
    border: 2px solid #e2e8f0;
    border-radius: 20px;
    & input {
        background-color: transparent;
        border: none;
        font-size: 20px;
        &:focus {
            outline: none;
        }
        &::placeholder {
            font-size: 20px;
        }
    }
    ${(props) =>
        props.isMinimized &&
        `
    margin-top: 8px;
    
  `}
`;
const SendButton = styled.button`
    transition: background 0.3s ease, box-shadow 0.3s ease;
    width: 50px;
    aspect-ratio: 1/1;
    border-radius: 50%;
    //border: 2px solid rgba(255, 255, 255, 0);
    background: linear-gradient(136deg, #2600ff 15.04%, #8975f4 86.06%);
    box-shadow: 0px 10px 50px 0px rgba(8, 2, 45, 0.35);
    backdrop-filter: blur(50px);
    margin: 4px;
    position: relative;
    & img {
        position: absolute;
        top: 14px;
        right: 14px;
    }
    &:hover {
        background: linear-gradient(136deg, #8975f4 15.04%, #2600ff 86.06%);
    }
`;

export default function InputArea({
    input,
    setInput,
    sendMessage,
    isMinimized,
}) {
    return (
        <InputAreaContainer isMinimized={isMinimized}>
            <input
                className="border rounded w-full p-2"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Please describe the sample you want to generate."
            />
            <SendButton
                className="flex justify-center items-center"
                onClick={sendMessage}
            >
                <img src="img/components/Subtract.svg" alt="" />
            </SendButton>
        </InputAreaContainer>
    );
}
