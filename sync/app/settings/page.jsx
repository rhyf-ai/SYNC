// /app/settings/page.js
import ChatWindow from "../../components/ChatWindow";
import SettingsForm from "../../components/SettingsForm";

export default function Settings() {
    return (
        <div className="flex h-screen">
            <div className="w-1/3 p-4 border-r">
                <ChatWindow minimized={true} />
            </div>
            <div className="w-2/3 p-4">
                <SettingsForm />
            </div>
        </div>
    );
}
