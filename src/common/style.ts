import localFont from "next/font/local";
import styled from "styled-components";

export const FONTS = {
  display: "font-weight: 800; font-size: 2.8rem; line-height: 3rem;",
  heading1: "font-weight: 700; font-size: 2.2rem; line-height: 2.8rem;",
  heading2: "font-weight: 700; font-size: 1.8rem; line-height: 2.2rem;",
  heading3: "font-weight: 600; font-size: 1.6rem; line-height: 2rem;",
  md1: "font-weight: 500; font-size: 1.6rem; line-height: 1.8rem;",
  md2: "font-weight: 400; font-size: 1.4rem; line-height: 1.8rem;",
  sm: "font-weight: 400; font-size: 1.3rem; line-height: 1.6rem;",
  label1: "font-weight: 600; font-size: 1.6rem; line-height: 1.6rem;",
  label2: "font-weight: 500; font-size: 1.6rem; line-height: 1.6rem;",
  label3: "font-weight: 500; font-size: 1.4rem; line-height: 1.4rem;",
};
export const STYLED_FONTS = {
  DISPLAY: styled.h1`
    ${FONTS.display}
  `,
  H1: styled.h1`
    ${FONTS.heading1}
  `,
  H2: styled.h2`
    ${FONTS.heading2}
  `,
  H3: styled.h3`
    ${FONTS.heading3}
  `,
  MD1: styled.p`
    ${FONTS.md1}
  `,
  MD2: styled.p`
    ${FONTS.md2}
  `,
  SM: styled.p`
    ${FONTS.sm}
  `,
  LABEL1: styled.span`
    ${FONTS.label1}
  `,
  LABEL2: styled.span`
    ${FONTS.label2}
  `,
  LABEL3: styled.span`
    ${FONTS.label3}
  `,
};

export const CONTAINER = {
  Dialog: styled.div`
    box-shadow: 0 0 30px 0 rgba(107, 110, 116, 0.2);
    z-index: 100;
    border-radius: 8px;
    background-color: var(--container-background);
  `,
  Navigation: styled.div`
    box-shadow: 0 0 40px 0 rgba(107, 110, 116, 0.1);
    z-index: 70;
    border-radius: 8px;
    background-color: var(--container-background);
  `,
  Popup: styled.div`
    box-shadow: 0 0 16px 0 rgba(107, 110, 116, 0.16);
    z-index: 20;
    border-radius: 8px;
    background-color: var(--container-background);
  `,
  Card: styled.div`
    box-shadow: 0 0 16px 0 rgba(107, 110, 116, 0.04);
    border-radius: 16px;
    background-color: var(--container-background);
  `,
};

export const FONT_SUITE = localFont({
  src: "../../public/fonts/SUITE-Variable.woff2",
  display: "swap",
  weight: "45 920",
});
