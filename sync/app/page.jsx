// /app/page.js
"use client";
import React, { useEffect } from "react";
import Header from "../components/Header";
import { useShowChatStore } from "@/app/stores/showChatStore";

export default function Home() {
    const setIsShow = useShowChatStore((state) => state.setIsShow);
    const setIsMinimized = useShowChatStore((state) => state.setIsMinimized);

    useEffect(() => {
        setIsShow(true);
        setIsMinimized(false);
      }, [setIsShow, setIsMinimized]);

      
    return <></>;
}
