import React, { useEffect, useRef, useState } from "react";
import { CONTAINER, FONTS } from "./style";
import styled from "styled-components";
import Direction from "@/icons/Direction";
import Utility from "@/icons/Utility";

interface Props {
  children: React.ReactNode;
  list: { name: string; value: string }[];
  value: string;
  setValue: (value: string) => void;
  align?: "left" | "right";
  size?: "small" | "medium" | "large";
}
function Dropdown(props: Props) {
  const { children, list, value, setValue, align = "left", size = "medium" } = props;
  const [isShow, setShow] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

  const ICON_SIZE: Record<string, { w: number; stroke: number }> = {
    small: { w: 14, stroke: 1.2 },
    medium: { w: 18, stroke: 1.6 },
    large: { w: 18, stroke: 2.4 },
  };

  const onClickShowDropdown = () => {
    setShow(true);
  };
  const onClickListItem = (value: string) => {
    setValue(value);
    setShow(false);
  };

  useEffect(() => {
    const outSideClick = (e: MouseEvent) => {
      if (isShow && dropDownRef.current && !dropDownRef.current.contains(e.target as Node)) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", outSideClick);
  }, [isShow]);

  return (
    <Wrap ref={dropDownRef}>
      <Value onClick={onClickShowDropdown}>
        {children}
        <Direction.Down fill="var(--text2)" size={ICON_SIZE[size].w} strokeWidth={ICON_SIZE[size].stroke} />
      </Value>
      {isShow && (
        <List $align={align}>
          {list.map((item) => (
            <button
              key={item.value}
              type="button"
              className={value === item.value ? "active" : ""}
              onClick={() => onClickListItem(item.value)}
            >
              {item.name}
              {value === item.value && <Utility.Check fill="var(--main400)" strokeWidth={2} size={20} />}
            </button>
          ))}
        </List>
      )}
    </Wrap>
  );
}

const Wrap = styled.div`
  display: inline-flex;
  position: relative;
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;
  font-family: inherit;
`;
const Value = styled.div`
  cursor: pointer;
  user-select: none;
  display: inline-flex;
  padding: 4px 4px 4px 6px;
  margin: 0 0 0 -6px;
  align-items: center;
  gap: 3px;
  border-radius: 4px;

  &:hover {
    background: var(--neutral-100);
  }
  &:active {
    background: var(--neutral-200);
  }
`;

const List = styled(CONTAINER.Popup)<{ $align: "left" | "right" }>`
  position: absolute;
  padding: 8px 6px;
  left: ${({ $align }) => ($align === "left" ? "-4px" : "unset")};
  right: ${({ $align }) => ($align === "right" ? "-4px" : "unset")};
  top: calc(100% + 8px);
  width: max-content;
  display: flex;
  flex-direction: column;
  gap: 2px;
  background-color: var(--white);
  color: var(--text2);
  font-family: "fontPretendard";
  ${FONTS.label2};

  & > button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 10px 14px;
    border-radius: 6px;
    &.active {
      color: var(--main400);
      font-weight: 600;
    }

    &:hover {
      background: var(--neutral-50);
    }
    &:active {
      background: var(--neutral-100);
    }
  }
`;

export default Dropdown;
