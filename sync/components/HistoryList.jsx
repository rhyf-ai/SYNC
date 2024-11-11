// /components/HistoryList.js
"use client";

import { useEffect, useState } from "react";

export default function HistoryList() {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        // 실제로는 서버나 로컬 스토리지에서 데이터를 불러옵니다.
        setHistory([
            { id: 1, summary: "첫 번째 대화", sample: "/samples/sample1.mp3" },
            { id: 2, summary: "두 번째 대화", sample: "/samples/sample2.mp3" },
        ]);
    }, []);

    return (
        <div className="space-y-4">
            {history.map((item) => (
                <div key={item.id} className="border p-4 rounded">
                    <p>{item.summary}</p>
                    <audio
                        controls
                        src={item.sample}
                        className="mt-2 w-full"
                    ></audio>
                </div>
            ))}
        </div>
    );
}
