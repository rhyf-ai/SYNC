import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

const Checkbox = styled.input.attrs({ type: "checkbox" })`
    /* 필요한 스타일을 여기에 추가하세요 */
`;

const DownloadButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    color: #5436ff; /* 아이콘 색상 */
    font-size: 1.2em;

    &:hover {
        color: #7659ff; /* 호버 시 색상 변경 */
    }
`;

export default function SelectFromTables({ column, data }) {
    const handleDownload = (filePath) => {
        // 파일 경로가 유효한지 확인
        if (!filePath) return;

        // 다운로드 링크 생성
        const link = document.createElement("a");
        link.href = filePath;
        link.setAttribute("download", ""); // 다운로드 속성 설정

        // 링크를 문서에 추가하고 클릭한 후 제거
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    console.log(column,data)
    return (
        <>
            <table className="table-auto">
                <thead>
                    <tr>
                        {column.map((col, index) => (
                            <th key={index}>{col}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            {/* 첫 번째 열: 체크박스 */}
                            <td>
                                <Checkbox />
                            </td>
                            {/* 두 번째 열: Title */}
                            <td>{item.title}</td>
                            {/* 세 번째 열: Style */}
                            <td>{item.style}</td>
                            {/* 네 번째 열: File (필요에 따라 내용 추가) */}
                            <td>{/* 파일 관련 추가 정보가 있다면 표시 */}</td>
                            {/* 다섯 번째 열: 다운로드 버튼 */}
                            <td>
                                <DownloadButton
                                    onClick={() =>
                                        handleDownload(item.file_path)
                                    }
                                >
                                    <FontAwesomeIcon icon={faDownload} />
                                </DownloadButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
