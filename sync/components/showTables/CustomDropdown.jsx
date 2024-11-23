import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const DropdownWrapper = styled.div`
    position: relative;
    display: inline-block;
    width: 200px;
`;

const DropdownButton = styled.button`
    width: 100%;
    padding: 12px 40px;
    border: none;
    border-radius: 30px;
    background: linear-gradient(180deg, #1a1a2e, #1f1f3a);
    color: #ffffff;
    font-size: 16px;
    font-weight: bold;
    text-align: left;
    cursor: pointer;
    outline: none;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover {
        background: linear-gradient(180deg, #1f1f3a, #1a1a2e);
    }
`;

const DropdownMenu = styled.ul`
    position: absolute;
    top: 110%; /* 드롭다운 버튼 아래로 배치 */
    left: 0;
    width: 100%;
    margin: 0;
    padding: 0;
    list-style: none;
    border-radius: 15px;
    background: #1f1f3a;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    z-index: 100;
`;

const DropdownItem = styled.li`
    padding: 12px 16px;
    font-size: 16px;
    color: #ffffff;
    cursor: pointer;

    &:hover {
        background: #2a2a4a;
    }

    &.selected {
        background: #2a2a4a;
        font-weight: bold;
    }
`;

export default function CustomDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Clarinet");
    const dropdownRef = useRef(null); // DropdownWrapper에 ref 연결

    const options = ["Clarinet", "Drum", "Piano", "Bass", "Guitar"];

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    const handleClickOutside = (event) => {
        // dropdownRef를 기준으로 외부 클릭 감지
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <DropdownWrapper ref={dropdownRef}>
            <DropdownButton onClick={toggleDropdown}>
                {selectedOption}
                <span>
                    {isOpen ? (
                        <FontAwesomeIcon icon={faChevronUp} />
                    ) : (
                        <FontAwesomeIcon icon={faChevronDown} />
                    )}
                </span>
            </DropdownButton>
            {isOpen && (
                <DropdownMenu>
                    {options.map((option) => (
                        <DropdownItem
                            key={option}
                            className={option === selectedOption ? "selected" : ""}
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            )}
        </DropdownWrapper>
    );
}
