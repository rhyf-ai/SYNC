// /components/InputArea.jsx
import styled from "styled-components";

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

const SendButton = styled.button`
    transition: background 0.3s ease, box-shadow 0.3s ease;
    width: 50px;
    aspect-ratio: 1/1;
    border-radius: 50%;
    //border: 2px solid rgba(255, 255, 255, 0);
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
    // &:hover {
    //     background: linear-gradient(136deg, #8975f4 15.04%, #2600ff 86.06%);
    // }
`;

const LoadingContainer = styled.div`
    width: 100%;
    border-radius: 30px;
    background-color: #0f0332;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    color: white;
    gap: 10px;
`;

export default function InputArea({
    input,
    setInput,
    sendMessage,
    isMinimized,
}) {
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); // 기본 Enter 키 동작 방지
            sendMessage();
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
                <SendButton
                    className="flex justify-center items-center"
                    onClick={sendMessage}
                >
                    <img src="/img/components/Subtract.svg" alt="" />
                </SendButton>
            </div>
        </InputAreaContainer>
    );
}
