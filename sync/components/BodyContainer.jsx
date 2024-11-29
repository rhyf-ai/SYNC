"use client";

import React from "react";
import "./style/bodycontainer.css"; // CSS 파일 임포트
import { useShowChatStore } from "@/app/stores/showChatStore";

export default function BodyContainer({ children }) {
    const isMinimized = useShowChatStore((state) => state.isMinimized);
    return (
        <div
            className={
                isMinimized
                    ? "styled-container-bg relative  overflow-hidden"
                    : "styled-container-bg flex justify-center items-center relative  overflow-hidden"
            }
        >
            {/* 첫 번째 배경 */}
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    top: "0",
                    left: "0",
                    position: "absolute",
                    background:
                        "linear-gradient(180deg, #08001F 0%, #140043 48%, #0D0010 100%)",
                }}
            ></div>

            {/* 두 번째 배경 */}
            <div
                style={{
                    width: "48.59vw", // 933px / 1920px * 100vw
                    height: "48.59vw",
                    left: "59.01vw", // 1133px / 1920px * 100vw
                    top: "4.81vh", // 52px / 1080px * 100vh
                    position: "absolute",
                    zIndex: "0",
                    background:
                        "radial-gradient(100% 100% at 50% 50%, rgba(0, 106, 255, 0.16) 0%, rgba(122, 98, 255, 0.16) 100%)",
                    borderRadius: "9999px",
                    boxShadow: "20.83vw 20.83vw 20.83vw rgba(0, 0, 0, 0)", // 400px / 1920px * 100vw
                    filter: "blur(20.83vw)", // 400px / 1920px * 100vw
                }}
            ></div>

            {/* 세 번째 배경 */}
            <div
                style={{
                    width: "29.38vw", // 564px / 1920px * 100vw
                    height: "29.38vw",
                    left: "0",
                    top: "68.15vh", // 736px / 1080px * 100vh
                    position: "absolute",
                    zIndex: "0",
                    background:
                        "radial-gradient(100% 100% at 50% 50%, rgba(0, 106, 255, 0.70) 0%, rgba(68, 38, 236, 0.70) 54%, rgba(165, 0, 255, 0) 100%)",
                    borderRadius: "9999px",
                    boxShadow: "31.25vw 31.25vw 31.25vw rgba(0, 0, 0, 0)", // 600px / 1920px * 100vw
                    filter: "blur(31.25vw)", // 600px / 1920px * 100vw
                }}
            ></div>

            {/* 네 번째 배경 */}
            <div
                style={{
                    width: "29.06vw", // 558px / 1920px * 100vw
                    height: "29.06vw",
                    left: "27.71vw", // 532px / 1920px * 100vw
                    top: "42.59vh", // 460px / 1080px * 100vh
                    position: "absolute",
                    zIndex: "0",
                    background:
                        "radial-gradient(100% 100% at 50% 50%, rgba(0, 106, 255, 0.20) 0%, rgba(122, 98, 255, 0.20) 100%)",
                    borderRadius: "9999px",
                    boxShadow: "20.83vw 20.83vw 20.83vw rgba(0, 0, 0, 0)", // 400px / 1920px * 100vw
                    filter: "blur(20.83vw)", // 400px / 1920px * 100vw
                }}
            ></div>

            {children}
        </div>
    );
}
