// /app/page.js
import ChatWindow from '../components/ChatWindow';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <ChatWindow minimized={false} />
    </div>
  );
}
