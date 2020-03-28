export class StockSymbolHistory {
  quotes: number[];
  from: Date;
  to: Date;
}


export type StockSymbolHistoryByCountry = {
  [key: string]: Promise<StockSymbolHistory>;
};
