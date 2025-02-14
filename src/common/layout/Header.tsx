"use client";
import React from "react";
import styled from "styled-components";
import { FONTS } from "../style";

function Header() {
  return (
    <Wrap>
      <nav>
        <Logo>
          투<span>자</span>고<span>수</span>들
        </Logo>
        <Menu>
          <ul>
            <li>홈</li>
            <li>추이</li>
          </ul>
        </Menu>
        <User>로그인</User>
      </nav>
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 100%;

  & > nav {
    display: flex;
    margin: 0 auto;
    padding: 0 32px;
    align-items: center;
    height: 60px;
    /* 
    @media (min-width: 1200px) {
      max-width: 1060px;
    }

    @media (min-width: 768px) and (max-width: 1199px) {
      max-width: 1060px;
      width: 90%;
    }
    @media (max-width: 767px) {
      width: 100%;
      padding: 0 12px;
    } */
  }
`;
const Logo = styled.div`
  width: 120px;
  ${FONTS.heading1};
  font-weight: 800;
  & > span {
    color: var(--neutral-700);
  }
`;
const Menu = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  ul {
    display: flex;
    gap: 10px;
    ${FONTS.md1};
  }
`;
const User = styled.div`
  width: 120px;
  display: flex;
  justify-content: flex-end;
  ${FONTS.md1};
`;

export default Header;
