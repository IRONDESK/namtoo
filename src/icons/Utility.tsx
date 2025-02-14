import React from "react";
import { IconProps } from "@/types/icon";

const Utility = {
  Check: ({ fill = "#222222", size = 24, strokeWidth = 1.2 }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M19.1602 7.16362L10.5034 18.5L3.72164 11.2749"
        stroke={fill}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

export default Utility;
