"use client";
// components/ShowTables.jsx

import { useSelectedMessageStore } from "../app/stores/selectedMessageStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import SelectFromTables from "./showTables/SelectFromTables";


export default function ShowTables() {
    const [toggleHistoryList, setToggleHistoryList] = useState(false);
    const selectedMessage = useSelectedMessageStore(
        (state) => state.selectedMessage
    );
    const setSelectedMessage = useSelectedMessageStore(
        (state) => state.setSelectedMessage
    );


    const { intent, data } = selectedMessage;

    return (
        <div className="p-10 pr-20">
            <div className="flex justify-end pb-5">
                <button
                    onClick={() => setToggleHistoryList(!toggleHistoryList)}
                >
                    <FontAwesomeIcon icon={faBars} style={{fontSize: '24px'}} />
                </button>
            </div>
            <SelectFromTables intent={intent} data={data} />
        </div>
    );
}
