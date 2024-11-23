"use client";
// components/ShowTables.jsx

import { useSelectedMessageStore } from "../app/stores/selectedMessageStore";
import CreateMusic from "./showTables/createMusic";
import GiveSerum from "./showTables/GiveSerum";
import ToneTransfer from "./showTables/ToneTransfer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function ShowTables() {
    const [toggleHistoryList, setToggleHistoryList] = useState(false);
    const selectedMessage = useSelectedMessageStore(
        (state) => state.selectedMessage
    );

    if (!selectedMessage) {
        return <div>No message selected.</div>;
    }

    const { content, intent, id } = selectedMessage;

    let ComponentToRender;

    switch (intent) {
        case "createMusic":
            ComponentToRender = CreateMusic;
            break;
        case "giveSerum":
            ComponentToRender = GiveSerum;
            break;
        case "toneTransfer":
            ComponentToRender = ToneTransfer;
            break;
        default:
            ComponentToRender = null;
    }

    return (
        <div className="p-10 pr-20">
            <div className="flex justify-end pb-5">
                <button
                    onClick={() => setToggleHistoryList(!toggleHistoryList)}
                >
                    <FontAwesomeIcon icon={faBars} style={{fontSize: '24px'}} />
                </button>
            </div>
            {ComponentToRender && (
                <ComponentToRender intent={intent} content={content} />
            )}
        </div>
    );
}
