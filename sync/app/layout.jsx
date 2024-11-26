import "../styles/globals.css";
import "./globals.css";
import BodyContainer from "@/components/BodyContainer";
import ChatWindow from "@/components/ChatWindow";
import Header from "@/components/Header";
export const metadata = {
    title: "Rhyf.ai",
    description: "AI-powered music creation platform.",
    icons: {
        icon: "/img/logo/favicon.png",
        touchicon: "/img/logo/favicon.png",
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="ko">
            <body style={{ margin: 0, padding: 0, minWidth: '1280px' }}>
                <BodyContainer>
                    <Header />
                    <div className="flex">
                        <ChatWindow />
                        {children}
                    </div>
                </BodyContainer>
            </body>
        </html>
    );
}
