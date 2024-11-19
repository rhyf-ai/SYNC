"use client";
import styled from "styled-components";

const StyledContainer = styled.div`
    background: radial-gradient(
            circle at 35% 50%,
            rgba(63, 45, 124, 0.2),
            transparent 50%
        ),
        radial-gradient(
            circle at 65% 50%,
            #3f2d7c80,
            transparent 50%
        ),
        var(--point-bgd);
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default function BodyContainer({ children }) {
    return <StyledContainer>{children}</StyledContainer>;
}
