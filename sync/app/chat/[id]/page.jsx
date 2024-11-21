"use client";

import React, { useEffect, useState } from "react";
import ShowTables from "../../../components/ShowTables";
import { useShowChatStore } from "@/app/stores/showChatStore";

export default function ChatPage({ params }) {
    const setIsMinimized = useShowChatStore((state) => state.setIsMinimized);
    const [id, setId] = useState(null);

    useEffect(() => {
        // Ensure isMinimized is true when this page is loaded
        setIsMinimized(true);

        // Unwrap params if necessary
        Promise.resolve(params).then((p) => {
            setId(p.id);
        });

        // Cleanup when unmounting
        return () => {
            setIsMinimized(false);
        };
    }, [setIsMinimized, params]);

    if (!id) {
        // Render a loading state while params are being resolved
        return <div>Loading...</div>;
    }

    return (
        <div style={{ display: "flex" }}>
            <div className="flex-grow">
                <ShowTables chatId={id} />
            </div>
        </div>
    );
}
