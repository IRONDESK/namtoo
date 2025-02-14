import { FONTS } from "@/common/style";
import NumberFlow from "@number-flow/react";
import React from "react";
import styled from "styled-components";

interface Props {
  ticker: string;
  nameKr: string;
  currentPrice: number;
  yesterdayPrice: number;
  currency: string;
}
function StockDetailHeadInfo(props: Props) {
  const { ticker, nameKr, currentPrice, yesterdayPrice, currency } = props;
  const diff = currentPrice - yesterdayPrice;

  return (
    <HeadInfo>
      <div className="stock-name">
        {nameKr}
        <span className="ticker">{ticker}</span>
      </div>
      <div className="stock-price">
        <p className="current">
          <NumberFlow value={currentPrice} locales="en-US" format={{ style: "currency", currency }} />
        </p>
        <p className="yesterday">
          어제보다{" "}
          <NumberFlow
            value={diff}
            locales="en-US"
            format={{ style: "currency", currency, signDisplay: "always" }}
            className={diff > 0 ? "up" : diff < 0 ? "down" : ""}
          />{" "}
          <NumberFlow
            prefix="("
            suffix=")"
            value={diff / yesterdayPrice}
            format={{ style: "percent", maximumFractionDigits: 2, signDisplay: "never" }}
            className={diff > 0 ? "up" : diff < 0 ? "down" : ""}
          />
        </p>
      </div>
    </HeadInfo>
  );
}
const HeadInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 8px;
  margin-bottom: -20px;

  div.stock-name {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: var(--text1);
    ${FONTS.heading2};

    span.ticker {
      ${FONTS.heading3};
      color: var(--text3);
    }
  }

  div.stock-price {
    display: flex;
    gap: 8px;
    align-items: center;
    p.current {
      color: var(--main400);
      ${FONTS.heading1};
    }
    p.yesterday {
      color: var(--neutral-700);
      ${FONTS.heading3};
      font-weight: 500;
      .up {
        color: var(--main400);
      }
      .down {
        color: var(--red);
      }
    }
  }
`;

export default StockDetailHeadInfo;
