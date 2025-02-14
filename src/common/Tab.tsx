import React from "react";
import styled from "styled-components";
import { FONTS } from "./style";

interface Props {
  styled: "primary" | "secondary";
  tabs: Array<{ name: string; value: string }>;
  current: string;
  handleTab: (target: string) => void;
  padding?: number;
}
function Tab(props: Props) {
  const { styled, tabs, current, handleTab, padding = 16 } = props;

  if (styled === "primary") {
    return (
      <Wrap $padding={padding}>
        <ul style={{ gap: `${16 - padding}px` }}>
          {tabs.map((tab) => (
            <li key={tab.value} className={current === tab.value ? "active" : ""} onClick={() => handleTab(tab.value)}>
              {tab.name}
            </li>
          ))}
        </ul>
      </Wrap>
    );
  }
  if (styled === "secondary") {
    // return <Wrap>Tab</Wrap>;
    return null;
  }
}

const Wrap = styled.div<{ $padding: number }>`
  padding: 0 ${(props) => props.$padding}px;
  border-bottom: 1px solid var(--border1);

  ul {
    user-select: none;
    display: flex;
    height: 44px;
    li {
      cursor: pointer;
      ${FONTS.label2};
      display: flex;
      margin-bottom: -1px;
      padding: 0 ${(props) => props.$padding}px;
      align-items: center;
      color: var(--text3);
      border-bottom: 2px solid transparent;
      &.active {
        ${FONTS.label1};
        color: var(--main400);
        border-bottom: 2px solid var(--main400);
      }
    }
  }
`;
export default Tab;
