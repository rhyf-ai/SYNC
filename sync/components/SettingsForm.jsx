// /components/SettingsForm.js
"use client";

export default function SettingsForm() {
    return (
        <form className="space-y-4">
            <div>
                <label className="block text-sm font-medium">주파수</label>
                <input type="range" min="20" max="20000" className="w-full" />
            </div>
            <div>
                <label className="block text-sm font-medium">악기 종류</label>
                <select className="border rounded w-full p-2">
                    <option>피아노</option>
                    <option>기타</option>
                    <option>드럼</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium">강도</label>
                <input
                    type="number"
                    min="1"
                    max="10"
                    className="border rounded w-full p-2"
                />
            </div>
            <button
                type="submit"
                className="bg-green-500 text-white rounded p-2"
            >
                저장
            </button>
        </form>
    );
}
