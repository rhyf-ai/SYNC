import "../styles/globals.css";
import "./globals.css";
import BodyContainer from "@/components/BodyContainer";
import ChatWindow from "@/components/ChatWindow";
import Header from "@/components/Header";
export const metadata = {
    title: "음악 샘플링 프로그램",
    description: "LLM과 오픈 소스를 이용한 음악 샘플링 애플리케이션",
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
