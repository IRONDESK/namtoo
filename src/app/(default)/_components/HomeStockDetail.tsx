import React, { useEffect, useRef, useState } from "react";
import CandleChart from "@/common/CandleChart";
import styled from "styled-components";
import { CONTAINER, FONT_SUITE, FONTS } from "@/common/style";
import { Illustration } from "@/icons/Illustration";
import StockDetailHeadInfo from "./StockDetailHeadInfo";
import { STOCK_AAPL_DAILY } from "@/mock/stock";

interface Props {
  ticker: string;
}
function HomeStockDetail(props: Props) {
  const { ticker } = props;
  const [stockInitialData, setStockInitialData] = useState({
    "Time Series (Daily)": {
      "": { "1. open": "", "2. high": "", "3. low": "", "4. close": "", "5. volume": "" },
    },
  });

  const API_URL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${process.env.NEXT_PUBLIC_ALPHA_VANTAGE_KEY}`;

  const getStockData = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setStockInitialData(data);
  };
  const stockData = Object.entries(stockInitialData?.["Time Series (Daily)"] ?? STOCK_AAPL_DAILY["Time Series (Daily)"])
    .map(([key, value]) => ({
      date: new Date(key),
      open: Number(value["1. open"]),
      high: Number(value["2. high"]),
      low: Number(value["3. low"]),
      close: Number(value["4. close"]),
      volume: Number(value["5. volume"]),
    }))
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const [viewSize, setViewSize] = useState({ w: 0, h: 0 });
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateViewSize = () => {
      if (wrapRef.current) {
        setViewSize({ w: wrapRef.current.offsetWidth, h: wrapRef.current.offsetHeight });
      }
    };
    updateViewSize();

    window.addEventListener("resize", updateViewSize);
    return () => {
      window.removeEventListener("resize", updateViewSize);
    };
  }, [wrapRef.current]);

  useEffect(() => {
    getStockData();
  }, [ticker]);

  if (ticker === "") {
    return (
      <NoData>
        <Illustration.Calendar />
        <p className="heading-title" style={FONT_SUITE.style}>
          종목을 선택해주세요
        </p>
      </NoData>
    );
  }

  return (
    <Wrap ref={wrapRef}>
      <StockDetailHeadInfo
        nameKr="애플"
        ticker={ticker}
        currentPrice={stockData[stockData.length - 1].close}
        yesterdayPrice={stockData[stockData.length - 2].close}
        currency="USD"
      />
      <CONTAINER.Card>
        {viewSize.w > 0 && <CandleChart chartData={stockData} width={viewSize.w} height={(viewSize.h * 3) / 5} />}
      </CONTAINER.Card>
      <CONTAINER.Card>{ticker}</CONTAINER.Card>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  gap: 20px;
`;

const NoData = styled(CONTAINER.Card)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  ${FONTS.md1}

  .heading-title {
    user-select: none;
    ${FONTS.heading2}
    color: var(--neutral-800);
  }
  svg {
    margin: -12px 0 0 -24px;
  }
`;

export default HomeStockDetail;
