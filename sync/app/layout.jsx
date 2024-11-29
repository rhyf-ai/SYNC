import "../styles/globals.css";
import "./globals.css";
import BodyContainer from "@/components/BodyContainer";
import ChatWindow from "@/components/ChatWindow";
import Header from "@/components/Header";
export const metadata = {
    title: "Rhyf AI",
    description: "AI-powered music creation platform.",
    icons: {
        icon: "/img/logo/favicon.png",
        touchicon: "/img/logo/favicon.png",
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="ko">
            <body style={{ margin: 0, padding: 0 }}>
                <BodyContainer>
                    <Header />
                    <div className="flex hidden sm:block">
                        <ChatWindow />
                        {children}
                    </div>
                    <div className="sm:hidden block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                        <img src="/img/logo/Rhyf_logo.svg" alt="" />
                    </div>
                </BodyContainer>
            </body>
        </html>
    );
}
