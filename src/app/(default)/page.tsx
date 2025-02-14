"use client";
import { useState } from "react";
import Tab from "@/common/Tab";
import styled from "styled-components";

import Dropdown from "@/common/Dropdown";
import { CONTAINER, FONT_SUITE, FONTS } from "@/common/style";
import HomeStockList from "./_components/HomeStockList";
import HomeStockDetail from "./_components/HomeStockDetail";
import { STOCK2023F } from "@/data/gukmin/foreign_stock2023";
import NumberFlow from "@number-flow/react";

export default function Home() {
  const [currentTab, setTab] = useState("foreign");
  const [investor, setInvestor] = useState("yeongeum");
  const [investYear, setInvestYear] = useState("2023");

  const [selected, setSelected] = useState("");
  const sort = useState("ratio");

  return (
    <Wrap>
      <Aside style={{ flex: 3 }}>
        <Switch>
          <div className="heading-filter" style={FONT_SUITE.style}>
            <Dropdown
              size="large"
              value={investor}
              setValue={setInvestor}
              list={[{ name: "국민연금", value: "yeongeum" }]}
            >
              국민연금
            </Dropdown>
            <span className="text">
              에서{" "}
              <Dropdown
                size="large"
                value={investYear}
                setValue={setInvestYear}
                list={[
                  { name: "2023년", value: "2023" },
                  { name: "2022년", value: "2022" },
                ]}
              >
                <NumberFlow
                  value={+investYear}
                  format={{ useGrouping: false }}
                  style={{ fontVariantNumeric: "tabular-nums", letterSpacing: "-0.6px" }}
                />
                년
              </Dropdown>
            </span>{" "}
            투자한
          </div>
        </Switch>
        <Tab
          styled="primary"
          padding={0}
          tabs={[
            { name: "해외주식", value: "foreign" },
            { name: "국내주식", value: "domestic" },
            { name: "해외채권", value: "foreign-bond" },
            { name: "국내채권", value: "domestic-bond" },
          ]}
          current={currentTab}
          handleTab={setTab}
        />
        <HomeStockList sort={sort} data={STOCK2023F} onClickItem={setSelected} />
      </Aside>
      <section style={{ flex: 7 }}>
        <HomeStockDetail ticker={selected} />
      </section>
    </Wrap>
  );
}

const Wrap = styled.main`
  display: flex;
  gap: 20px;
  padding: 6px 0 24px;
  height: calc(100vh - 60px);
  overflow: hidden;
`;
const Switch = styled.div`
  & > div.heading-filter {
    ${FONTS.heading1};
    & > span.text {
      display: inline-flex;
      align-items: center;
      gap: 7px;
    }
  }
`;
const Aside = styled(CONTAINER.Card).attrs({ as: "aside" })`
  display: flex;
  padding: 20px 24px 0;
  flex-direction: column;
  height: 100%;
`;
