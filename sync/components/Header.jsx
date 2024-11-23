'use client';
import styled from 'styled-components';

const HeaderContainer = styled.div`
`

const Header = () => {
  return (
    <header className='fixed inset-x-0 top-0 z-50 left-0 w-full flex justify-start p-8 pb-0'>
        <img className='h-20 md:h-12' src="/img/logo/Rhyf_logo.svg" alt="" />
    </header>
  )
}

export default Header;