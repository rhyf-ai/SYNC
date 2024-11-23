// components/showTables/toneTransfer.jsx
import styled from "styled-components";
import customDropdowm from "./CustomDropdown";
import { useState } from "react";
import CustomDropdown from "./CustomDropdown";

const SelectWrapper = styled.div`
    position: relative;
    display: inline-block;
    width: 200px;
`;

const StyledSelect = styled.select`
    width: 100%;
    padding: 12px 16px;
    border: none;
    border-radius: 30px;
    background: linear-gradient(180deg, #1a1a2e, #1f1f3a);
    color: #ffffff;
    font-size: 16px;
    font-weight: bold;
    appearance: none;
    outline: none;
    text-align: center;
    cursor: pointer;

    &:focus {
        box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.2);
    }
`;

const DropdownIcon = styled.div`
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
    pointer-events: none;
    font-size: 16px;
    color: #ffffff;
`;

export default function ToneTransfer({ intent, content }) {
    return (
        <div>
            <CustomDropdown />
        </div>
    );
}
