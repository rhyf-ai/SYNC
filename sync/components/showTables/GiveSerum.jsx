// components/showTables/giveSerum.jsx
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

export default function GiveSerum({ intent, content }) {
    return (
      <div>
        <h3>Give Serum Component</h3>
        <p>Intent: {intent}</p>
        <p>Content: {content}</p>
        <div className="flex justify-end gap-4 mt-5">
                <ExportBtn>Export as FXP</ExportBtn>
            </div>
      </div>
    );
  }
  