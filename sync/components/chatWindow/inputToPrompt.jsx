import { div } from 'framer-motion/client';
import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 80%;
    margin-top: 10px;
    border-radius: 30px;
    padding: 30px;
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(50px);
    margin-top: 57px;
    max-width: 100%:

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
    const oneShotsInstrumentList = [
        "Kick",
        "Snare",
        "808",
        "Clap",
        "Hi-hat",
        "Percussion",
        "Vocal",
        "FX",
        "Bass",
    ];
    const oneShotsGenreList = [
        "Hiphop",
        "Drum and Bass",
        "Trap",
        "R&B",
        "Pop",
        "Rock",
        "Jazz",
        "House",
        "Techno",
    ];
    const loopsInstrumentList = [
        "Drum Loop",
        "Bass Loop",
        "Vox Loop",
        "Synth Loop",
        "Guitar Loop",
        "Piano Loop",
        "String Loop",
    ];
    const loopsGenreList = ["Hiphop", "Drum and Bass", "Trap", "R&B"];
    const presetsInstrumentList = ["Bass Preset", "Lead Preset", "Pad Preset"];
    const presetsGenreList = ["Hiphop", "Drum and Bass", "Trap", "R&B"];

    let specificInstrumentList = [];
    let specificGenreList = [];
    if (intent === 'OneShots') {
        specificInstrumentList = oneShotsInstrumentList;
        specificGenreList = oneShotsGenreList;
    } else if (intent === 'Loops') {
        specificInstrumentList = loopsInstrumentList;
        specificGenreList = loopsGenreList;
    } else if (intent === 'Presets') {
        specificInstrumentList = presetsInstrumentList;
        specificGenreList = presetsGenreList;
    }

    const handleButtonClick = (instrument) => {
        const newInput = input + ' ' + instrument;
        setInput(newInput);
    };

    return (
        <Container>
            <div className="p-3">
                <div className="flex gap-2">
                    <img
                        style={{ width: "30px" }}
                        src="/img/components/instrument.svg"
                        alt=""
                    />
                    <p className="font-semibold text-2xl text-white">
                        Instrument
                    </p>
                </div>

                <div className="flex gap-3 py-5 flex-wrap">
                    {specificInstrumentList.map((instrument) => (
                        <SelectInputButton key={instrument} onClick={() => handleButtonClick(instrument)}>
                            {instrument}
                        </SelectInputButton>
                    ))}
                </div>
            </div>
            <Divider />
            <div className="p-3">
                <div className="flex gap-2">
                    <img style={{ width: '30px' }} src="/img/components/genre.svg" alt="" />
                    <p className="font-semibold text-2xl text-white">Genre</p>
                </div>

                <div className="flex gap-3 py-5 flex-wrap">
                    {specificGenreList.map((genre) => (
                        <SelectInputButton key={genre} onClick={() => handleButtonClick(genre)}>
                            {genre}
                        </SelectInputButton>
                    ))}
                </div>
            </div>
        </Container>
    );
}
