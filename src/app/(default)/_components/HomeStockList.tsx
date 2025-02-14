import React from "react";

import { StockList } from "@/types/stock";
import styled from "styled-components";
import NumberFlow from "@number-flow/react";

import { FONTS } from "@/common/style";
import Dropdown from "@/common/Dropdown";

interface Props {
  sort: [string, (value: string) => void];
  data: StockList;
  onClickItem: (value: string) => void;
}
function HomeStockList({ sort, data, onClickItem }: Props) {
  const [getSort, setSort] = sort;

  const SORT_TYPE: Record<string, string> = {
    ratio: "비중순",
    valuation: "운용가치순",
  };

  const onClickStockItem = (ticker: string) => {
    onClickItem(ticker);
  };

  return (
    <>
      <ListTop>
        <span>종목명</span>
        <Dropdown
          list={Object.entries(SORT_TYPE).map(([key, value]) => ({ name: value, value: key }))}
          align="right"
          value={getSort}
          setValue={setSort}
          size="small"
        >
          {SORT_TYPE[getSort]}
        </Dropdown>
      </ListTop>
      <Wrap>
        {data.map((stock) => (
          <li key={stock.ticker} className="stock-item" onClick={() => onClickStockItem(stock.ticker)}>
            <span className="stock-name">
              {stock.nameKr}
              <span className="stock-eng-name">{stock.name}</span>
            </span>
            <span className="stock-rate">
              <NumberFlow
                value={getSort === "ratio" ? stock.ratio : stock.valuation}
                willChange={true}
                format={
                  getSort === "ratio"
                    ? { style: "percent", maximumFractionDigits: 2, minimumFractionDigits: 2 }
                    : {
                        style: "decimal",
                        maximumFractionDigits: 0,
                      }
                }
                suffix={getSort === "valuation" ? "억원" : undefined}
              />
            </span>
          </li>
        ))}
      </Wrap>
    </>
  );
}

const ListTop = styled.div`
  display: flex;
  margin: 0 -8px;
  justify-content: space-between;
  padding: 12px 12px 6px;
  font-weight: 700;
  font-size: 1.4rem;
  color: var(--text3);
  background-color: var(--white);
`;

const Wrap = styled.ul`
  margin: 0 -12px 0 -8px;
  padding: 0 12px 0 8px;
  overflow-x: hidden;
  overflow-y: auto;
  ${FONTS.md1};

  li {
    display: flex;
    margin: 0 -12px 0 -8px;
    justify-content: space-between;
    border-radius: 8px;

    span.stock-name {
      display: flex;
      flex-direction: column;
      font-weight: 600;
      gap: 2px;
    }
    span.stock-rate {
      font-weight: 600;
    }
    span.stock-eng-name {
      ${FONTS.md2};
      font-weight: 500;
      font-size: 1.3rem;
      color: var(--text3);
    }

    &.stock-item {
      cursor: pointer;
      padding: 10px 12px;
      user-select: none;
      align-items: center;

      &:hover {
        background: var(--neutral-50);
      }
      &:active {
        background: var(--neutral-100);
      }
    }
  }
`;

export default HomeStockList;
