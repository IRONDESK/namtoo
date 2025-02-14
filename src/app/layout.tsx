import type { Metadata } from "next";
import localFont from "next/font/local";
import StyledComponentsRegistry from "@/lib/registry";
import "./globals.css";

export const metadata: Metadata = {
  title: "투고들 | 투자고수들, 국민연금 투자 따라하기",
  description: "고수들의 종목으로 배우는 주식. 국민연금 포트폴리오를 쉽게 확인하세요.",
};

const fontPretendard = localFont({
  src: "../../public/fonts/PretendardGOV-Variable.woff2",
  display: "swap",
  weight: "45 920",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body style={fontPretendard.style}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
