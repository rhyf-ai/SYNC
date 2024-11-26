// components/showTables/createMusic.jsx
import PlayMusic from "./PlayMusic";
import styled from "styled-components";

const ExportBtn = styled.button`
    border: none;
    background-color: white;
    color: #5436ff;
    border-radius: 100px;
    padding: 14px 48px;
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    font-size: 16px;
`;

export default function CreateMusic({ intent, content, audio }) {
    return (
        <div>
            <h3>Create Music Component</h3>
            <p>Intent: {intent}</p>
            <p>Content: {content}</p>
            <PlayMusic audio={audio} />
            <div className="flex justify-end gap-4 mt-5">
                <ExportBtn>Export as WAV</ExportBtn>
                <ExportBtn>Export as MIDI</ExportBtn>
            </div>
        </div>
    );
}
