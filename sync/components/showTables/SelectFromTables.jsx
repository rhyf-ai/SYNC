import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import dummydata from "../../app/data/dummySerum.json";
import PlayMusic from "./PlayMusic";
import { useState } from "react";

const CheckboxContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    background: ${(props) => (props.checked ? "#ffffff" : "#f0f0f0")};
    border-radius: 4px;
    opacity: ${(props) => (props.checked ? "1" : "0.05")};
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    svg {
        display: ${(props) => (props.checked ? "block" : "none")};
        width: 24px;
        height: 24px;
    }

    &:hover {
        opacity: ${(props) => (props.checked ? "1" : "0.2")};
    }
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
    display: none;
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

const TR = styled.tr`
    padding: 29px 7px;
    border-top: 1px solid #f0f0f0;
    border-bottom: 1px solid #f0f0f0;
    border-opacity: 0.1;
    & td {
    }
`;

const ExportBtn = styled.button`
    border: none;
    background-color: white;
    color: #5436ff;
    border-radius: 100px;
    padding: 14px 48px;
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    font-size: 16px;
`;

export default function SelectFromTables({ intent, data }) {
    const tableData = data ?? dummydata;

    const [checkedItems, setCheckedItems] = useState(
        Array(tableData.length).fill(false) // 초기 상태: 모두 체크 해제
    );

    const handleCheckboxChange = (index) => {
        const updatedCheckedItems = [...checkedItems];
        updatedCheckedItems[index] = !updatedCheckedItems[index];
        setCheckedItems(updatedCheckedItems);
    };

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


    const getSelectedFilePaths = () => {
        return tableData
            .filter((_, index) => checkedItems[index])
            .map((item) => item.audioUrl);
    };
    const handleDownloadSelected = () => {
        const selectedFilePaths = getSelectedFilePaths();
        selectedFilePaths.forEach((filePath) => {
            handleDownload(filePath);
        });
    };
    const handleDownloadAll = () => {
        tableData.forEach((item) => {
            handleDownload(item.audioUrl);
        });
    };
    // intent에 따라 컬럼 설정
    let columns = [];
    if (intent === "Presets") {
        columns = ["Option", "Title", "Description", "Download"];
    } else if (intent === "OneShots" || intent === "Loops") {
        columns = ["Option", "Title", "Player", "Download"];
    }

    return (
        <>
            <div className="relative overflow-x-auto mt-10">
                <table className="w-full text-sm text-left rtl:text-right text-white table-auto">
                    <thead className="text-xs bg-transparent opacity-20 border-y border-white border-opacity-10 ">
                        <tr>
                            {columns.map((col, index) => (
                                <th
                                    scope="col"
                                    className="px-6 py-3 "
                                    key={index}
                                >
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-transparent border-y border-white border-opacity-10">
                        {tableData.map((item, index) => (
                            <TR key={index}>
                                {/* 첫 번째 열: 체크박스 */}
                                <td>
                                    <Checkbox
                                        checked={checkedItems[index]}
                                        onChange={() =>
                                            handleCheckboxChange(index)
                                        }
                                    />
                                </td>
                                {/* 두 번째 열: 제목 */}
                                <td>{item.title}</td>
                                {/* 세 번째 열: intent에 따라 다른 내용 렌더링 */}
                                {intent === "Presets" ? (
                                    <td>{item.description}</td>
                                ) : (
                                    <td>
                                        <PlayMusic audio={item.audioUrl} />
                                    </td>
                                )}
                                {/* 네 번째 열: 다운로드 버튼 */}
                                <td>
                                    <DownloadButton
                                        onClick={() =>
                                            handleDownload(item.audioUrl)
                                        }
                                    >
                                        <FontAwesomeIcon icon={faDownload} />
                                    </DownloadButton>
                                </td>
                            </TR>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex gap-4 mt-5">
                <ExportBtn onClick={handleDownloadSelected}>
                    Download Selected
                </ExportBtn>
                <ExportBtn onClick={handleDownloadAll}>Download All</ExportBtn>
            </div>
        </>
    );
}

const Checkbox = ({ checked, onChange }) => {
    return (
        <CheckboxContainer checked={checked} onClick={() => onChange(!checked)}>
            <HiddenCheckbox
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
            />
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
            >
                <path
                    d="M4.5 13L10.214 17.3954C10.6491 17.7301 11.2728 17.6514 11.6112 17.219L20 6.5"
                    stroke="#2600FF"
                    strokeWidth="3"
                    strokeLinecap="round"
                />
            </svg>
        </CheckboxContainer>
    );
};
