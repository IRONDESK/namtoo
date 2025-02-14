import Header from "@/common/layout/Header";
import React from "react";

function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div style={{ padding: "0 24px" }}>{children}</div>
    </>
  );
}

export default DefaultLayout;
