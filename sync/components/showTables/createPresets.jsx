"use client"; 

// components/showTables/giveSerum.jsx
import { useEffect, useState } from "react";
import SelectFromTables from './SelectFromTables'
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

export default function CreatePresets({ intent, content, data }) {
  const column = ['Option', 'Title', 'Description', 'Download'];
  

    return (
        <div>
            <SelectFromTables intent={intent} data={data} />
        </div>
    );
}
