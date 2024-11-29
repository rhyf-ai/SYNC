'use client';
import styled from 'styled-components';
import { useState } from 'react';

const HeaderContainer = styled.div``;

const NavBorder = styled.div`
    position: absolute;
    bottom: -9.5px;
    left: 50%;
    transform: translateX(-50%);
    height: 2px;
    width: 80px;
    background-color: white;
`;

const Header = () => {
    return (
        <header className="fixed inset-x-0 top-0 z-50 left-0 w-full gap-32 justify-start p-8 pb-2 border-b border-purple-500 border-opacity-10 sm:flex hidden">
            <a href="/ ">
                {' '}
                {/*Link to the home page 새로고침하고 싶으면 Link로 하면 됨. */}
                <img className="ml-[3vw] mt-[1.5vh]" src="/img/logo/Rhyf_logo.svg" alt="" style={{ height: '4vh' }} />
            </a>
            <div className="self-end flex gap-20 text-l font-semibold mt-[2vh] text-white">
                <a href="/" className="relative ">
                    Create
                    <NavBorder />
                </a>
                <a href="/" className="relative ">
                    History
                </a>
            </div>
        </header>
    );
};

export default Header;
