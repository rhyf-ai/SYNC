// /components/InputArea.jsx
import styled from 'styled-components';

const InputAreaContainer = styled.div`
  display: flex;
  gap: 20px;
  ${(props) =>
    props.isMinimized &&
    `
    margin-top: 8px;
  `}
`;

export default function InputArea({ input, setInput, sendMessage, isMinimized }) {
  return (
    <InputAreaContainer isMinimized={isMinimized}>
      <input
        className="border rounded w-full p-2"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="메시지를 입력하세요..."
      />
      <button
        className="bg-blue-500 text-white rounded p-2"
        onClick={sendMessage}
      >
        보내기
      </button>
    </InputAreaContainer>
  );
}
