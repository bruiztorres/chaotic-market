import { inject, injectable } from 'inversify';

import { StockSymbolHistory, StockSymbolHistoryByCountry } from './types';
import { IStockMarketService } from './istock-market.service';
import { FileServiceType, IFileService } from '~shared/files/ifile.service';
import { SettingsType, ISettings } from '~core/settings';
import { HttpType, IHttp } from '~core/http';

@injectable()
export class StockMarketService implements IStockMarketService {
  private histories: StockSymbolHistoryByCountry = {};

  constructor(
    @inject(HttpType) private http: IHttp,
    @inject(SettingsType) private settings: ISettings,
    @inject(FileServiceType) private fileService: IFileService) {

  }

  public getStockSymbolHistory(symbol: string, from: Date, to: Date): Promise<StockSymbolHistory> {
    if (!this.histories[symbol]) {
      this.histories[symbol] = this.loadStockSymbolHistory(symbol, from, to);
    }

    return this.histories[symbol] as Promise<StockSymbolHistory>;
  }

  private async loadStockSymbolHistory(symbol: string, from: Date, to: Date): Promise<StockSymbolHistory> {
    /*     const b = `https://query1.finance.yahoo.com/v7/finance/download/${symbol}?period1=${from}&period2=${to}&interval=1d&events=history`;
    const url = 'https://query1.finance.yahoo.com/v7/finance/download/%5EIBEX?period1=1577836800&period2=1584662400&interval=1d&events=history';
    //const url = 'https://uk.finance.yahoo.com/quote/AAPL/history';
    const data = await this.fileService.downloadCSV(url); */


    // First get the cookie and crumb we needç
    const url = 'https://finance.yahoo.com/quote/' + symbol + '/history?p=' + symbol;
    const responseBody = await this.http.get(url);

    console.log('Data ', responseBody);
    /* return data
      .map(item => CoronavirusDailyStats.fromRawStats(from, to, item)); */

    return { quotes: [], from, to };
  }
}
/*


https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data/csse_covid_19_time_series

SPAIN IBEX35        - Request URL: https://query1.finance.yahoo.com/v7/finance/download/%5EIBEX?period1=1577836800&period2=1584662400&interval=1d&events=history
EEUU S&P 500        - Request URL: https://query1.finance.yahoo.com/v7/finance/download/%5EGSPC?period1=1577836800&period2=1584662400&interval=1d&events=history
EEUU NASDAQ         - Request URL: https://query1.finance.yahoo.com/v7/finance/download/NDAQ?period1=1577836800&period2=1584662400&interval=1d&events=history
JAPAN NIKKEI 225    - Request URL: https://query1.finance.yahoo.com/v7/finance/download/%5EN225?period1=1577836800&period2=1584662400&interval=1d&events=history
GERMAN DAX          - Request URL: https://query1.finance.yahoo.com/v7/finance/download/DAX?period1=1577836800&period2=1584662400&interval=1d&events=history
GERMAN GDAXI        - Request URL: https://query1.finance.yahoo.com/v7/finance/download/%5EGDAXI?period1=1577836800&period2=1584662400&interval=1d&events=history
HONG KONG HSI       - Request URL: https://query1.finance.yahoo.com/v7/finance/download/%5EHSI?period1=1577836800&period2=1584662400&interval=1d&events=history
CHINA SSE 50 Index  - Request URL: https://query1.finance.yahoo.com/v7/finance/download/%5ESSE50?period1=1553099590&period2=1584721990&interval=1d&events=history
CHINA ^SSEC         - Request URL: https://query1.finance.yahoo.com/v7/finance/download/%5ESSEC?period1=1553102275&period2=1584724675&interval=1d&events=history

 */
