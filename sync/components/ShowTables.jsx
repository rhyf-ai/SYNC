"use client";
// components/ShowTables.jsx

import { useSelectedMessageStore } from "../app/stores/selectedMessageStore";
import CreateOneShots from "./showTables/CreateOneShots";
import CreateLoops from "./showTables/CreateLoops";
import CreatePresets from "./showTables/CreatePresets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";


export default function ShowTables() {
    const [toggleHistoryList, setToggleHistoryList] = useState(false);
    const selectedMessage = useSelectedMessageStore(
        (state) => state.selectedMessage
    );
    const setSelectedMessage = useSelectedMessageStore(
        (state) => state.setSelectedMessage
    );


    const { content, intent, id, audioUrl, data } = selectedMessage;

    let ComponentToRender;

    switch (intent) {
        case "OneShots":
            ComponentToRender = CreateOneShots;
            break;
        case "Loops":
            ComponentToRender = CreateLoops;
            break;
        case "Presets":
            ComponentToRender =CreatePresets;
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
                <ComponentToRender intent={intent} content={content} data={data} audio={audioUrl} />
            )}
        </div>
    );
}
