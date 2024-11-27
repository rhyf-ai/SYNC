import { div } from "framer-motion/client";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
    border-radius: 30px;
    padding: 30px;
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(50px);
`;
const SelectInputButton = styled.button`
    border: none;
    border-radius: 100px;
    padding: 14px 48px;
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    font-size: 16px;

`;
const Divider = styled.div`
    width: 100%;
    height: 1px;
    background-color: #fff;
    opacity: 0.1;
`;

export default function InputToPrompt({ intent, input, setInput }) {
    const createMusicInstrumentList = ["Piano", "Guitar", "Bass", "Drums"];

    const handleButtonClick = (instrument) => {
        const newInput = input + " " + instrument;
        setInput(newInput);
    };

    if (intent === "CreateMusic") {
        return (
            <Container>
                <div className="p-3">
                    <p className="font-semibold text-2xl">Instrument</p>
                    <div className="flex gap-3 py-5">
                        {createMusicInstrumentList.map((instrument) => (
                            <SelectInputButton
                                key={instrument}
                                onClick={() => handleButtonClick(instrument)}
                            >
                                {instrument}
                            </SelectInputButton>
                        ))}
                    </div>
                </div>
                <Divider />
                <div className="p-3">
                <p className="font-semibold text-2xl">Genre</p>
                </div>
            </Container>
        );
    } else if (intent === "ToneTransfer") {
        return <Container></Container>;
    } else {
        return <Container></Container>;
    }
}
