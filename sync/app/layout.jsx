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
                    <div className="hidden sm:flex w-full">
                        <ChatWindow />
                        {children}
                    </div>
                    <div className="sm:hidden flex flex-col items-center absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/4 z-20">
                        <img className="mb-10" style={{width: '35vw'}} src="/img/logo/only_rhyf.svg" alt="" />
                        <div className="mobile-line" style={{fontFamily: 'Pretendard', fontSize: '12vw', fontWeight: '700'}}>
                            <h2 className="mobile-lineup">Rhyf AI</h2>
                        </div>
                    </div>
                </BodyContainer>
            </body>
        </html>
    );
}
