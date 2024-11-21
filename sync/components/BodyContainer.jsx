'use client'

import React from "react";
import "./style/bodycontainer.css"; // CSS 파일 임포트
import { useShowChatStore } from "@/app/stores/showChatStore";
export default function BodyContainer({ children }) {
    const isMinimized = useShowChatStore((state) => state.isMinimized);
    return <div className={isMinimized ? 'styled-container' : 'styled-container flex justify-center items-center'}>{children}</div>;
}
