import { CoronavirusDailyStats } from 'app/coronavirus';

export type CoronavirusStats = {
  confirmed: CoronavirusDailyStats[];
  recovered: CoronavirusDailyStats[];
  deaths: CoronavirusDailyStats[];
}
