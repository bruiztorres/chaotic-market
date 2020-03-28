import { StockSymbolHistory } from './types';

export const StockMarketServiceType = Symbol.for('IStockMarketService');

export interface IStockMarketService {
  getStockSymbolHistory(
    symbol: string,
    startDate: Date,
    endDate: Date): Promise<StockSymbolHistory>;
}
