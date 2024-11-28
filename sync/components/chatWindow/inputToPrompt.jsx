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
    border-radius: 20px;
    background-color: rgba(240, 240, 240, 0.08);
    padding: 6px 30px;
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
    color: rgba(240, 240, 240, 0.7);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`;
const Divider = styled.div`
    width: 100%;
    height: 1px;
    background-color: #fff;
    opacity: 0.1;
`;

export default function InputToPrompt({ intent, input, setInput }) {
    const createMusicInstrumentList = [
        "Kicks",
        "Vocals",
        "Snare",
        "808s",
        "Hi-hat",
        "Percussion",
        "Piano",
        "Strings",
        "fx",
      ];
      
      const createMusicGenresList = [
        "Hiphop",
        "Drum and Bass",
        "Trap",
        "R&B",
        "POP",
        "Tech House",
        "EDM",
        "Disco",
        "Soul",
      ];
      

    const handleButtonClick = (instrument) => {
        const newInput = input + " " + instrument;
        setInput(newInput);
    };

    if (intent === "CreateMusic") {
        return (
            <Container>
                <div className="p-3">
                    <div className="flex gap-2">
                        <img
                            style={{ width: "30px" }}
                            src="/img/components/instrument.svg"
                            alt=""
                        />
                        <p className="font-semibold text-2xl">Instrument</p>
                    </div>

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
                <div className="flex gap-2">
                        <img
                            style={{ width: "30px" }}
                            src="/img/components/genre.svg"
                            alt=""
                        />
                        <p className="font-semibold text-2xl">Genre</p>
                    </div>

                    <div className="flex gap-3 py-5">
                        {createMusicGenresList.map((genre) => (
                            <SelectInputButton
                                key={genre}
                                onClick={() => handleButtonClick(genre)}
                            >
                                {genre}
                            </SelectInputButton>
                        ))}
                    </div>
                </div>
            </Container>
        );
    } else if (intent === "ToneTransfer") {
        return <Container></Container>;
    } else {
        return <Container></Container>;
    }
}
