import { ContainerModule, interfaces } from 'inversify';

import { StockMarketService } from './stock-market.service';
import { IStockMarketService, StockMarketServiceType } from './istock-market.service';

export const stockMarketContainer = new ContainerModule((bind: interfaces.Bind) => {
  bind<IStockMarketService>(StockMarketServiceType).to(StockMarketService);
});
