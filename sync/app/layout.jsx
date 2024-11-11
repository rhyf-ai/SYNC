// /app/layout.js
import '../styles/globals.css';


export const metadata = {
  title: '음악 샘플링 프로그램',
  description: 'LLM과 오픈 소스를 이용한 음악 샘플링 애플리케이션',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body style={{height : '100vh', width: '100vw'}}>{children}</body>
    </html>
  );
}
