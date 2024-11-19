// /app/page.js
"use client";
import React from "react";
import { useState } from "react";
import ChatWindowFull from "../components/ChatWindowFull";
import ChatWindowMinimized from "../components/ChatWindowMinimized";
import Header from "../components/Header";
import BodyContainer from "../components/BodyContainer";

export default function Home() {
    const [minimized, setMinimized] = useState(false);
    return (
            <BodyContainer>
                <Header />
                <div className="container mx-auto p-4">
                    {!minimized ? (
                        <ChatWindowFull minimized={minimized} />
                    ) : (
                        <ChatWindowMinimized />
                    )}
                </div>
            </BodyContainer>
    );
}
