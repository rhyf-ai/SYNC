"use client";
import styled from "styled-components";

const HeaderContainer = styled.div``;

const Header = () => {
    return (
        <header className="fixed inset-x-0 top-0 z-50 left-0 w-full flex justify-start p-8 pb-0">
            <a href="/"> {/*Link to the home page 새로고침하고 싶으면 Link로 하면 됨. */}
                <img
                    className="h-20 md:h-12"
                    src="/img/logo/Rhyf_logo.svg"
                    alt=""
                />
            </a>
        </header>
    );
};

export default Header;
