// /app/history/page.js
import HistoryList from "../../components/HistoryList";
import Header from "../../components/Header";
export default function History() {
    return (
        <>
            <Header />
            <div className="container mx-auto p-4">
                <HistoryList />
            </div>
        </>
    );
}
