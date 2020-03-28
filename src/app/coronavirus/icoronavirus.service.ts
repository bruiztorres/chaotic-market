import { CoronavirusDailyStats } from './types';

export const CoronavirusServiceType = Symbol.for('ICoronavirusService');

export interface ICoronavirusService {
  getDailyDeaths(): Promise<CoronavirusDailyStats[]>;
  getDailyRecovered(): Promise<CoronavirusDailyStats[]>;
  getDailyConfirmed(): Promise<CoronavirusDailyStats[]>;
}
