export type StockItem = {
  name: string;
  nameKr: string;
  ticker: string;
  valuation: number;
  ratio: number;
  share: number;
};

export type StockOHLC = { date: Date | string; open: number; high: number; low: number; close: number; volume: number };

export type StockList = Array<StockItem>;
export type StockOHLCList = Array<StockOHLC>;
