import { inject, injectable } from 'inversify';

import { SettingsType, ISettings } from '~core/settings';
import { FileServiceType, IFileService } from '~shared/files/ifile.service';
import { ICoronavirusService } from './icoronavirus.service';
import {
  CoronavirusStatsType,
  CoronavirusDailyStats,
  CoronavirusDailyStatsCache,
  CoronavirusDailyStatsByCountry } from './types';

@injectable()
export class CoronavirusService implements ICoronavirusService {
  private dailyStatsCache: CoronavirusDailyStatsCache = {};

  constructor(
    @inject(SettingsType) private settings: ISettings,
    @inject(FileServiceType) private fileService: IFileService) { }

  public getDailyDeaths(): Promise<CoronavirusDailyStats[]> {
    const { dailyDeathsUrl } = this.settings.coronavirus;
    return this.retrieveFromCacheOrSource('death', dailyDeathsUrl);
  }

  public getDailyRecovered(): Promise<CoronavirusDailyStats[]> {
    const { dailyRecoveredUrl } = this.settings.coronavirus;
    return this.retrieveFromCacheOrSource('recovered', dailyRecoveredUrl);
  }

  public getDailyConfirmed(): Promise<CoronavirusDailyStats[]> {
    const { dailyConfirmedUrl } = this.settings.coronavirus;
    return this.retrieveFromCacheOrSource('confirmed', dailyConfirmedUrl);
  }

  private retrieveFromCacheOrSource(type: CoronavirusStatsType, url: string): Promise<CoronavirusDailyStats[]> {
    if (!this.dailyStatsCache[type]) {
      this.dailyStatsCache[type] = this.loadDailyStats(url);
    }

    return this.dailyStatsCache[type] as Promise<CoronavirusDailyStats[]>;
  }

  private async loadDailyStats(url: string): Promise<CoronavirusDailyStats[]> {
    const [header, ...data] = await this.fileService.downloadCSV(url);
    const from = header[4];
    const to = header[header.length - 1];

    return Object.values(
      data
        .map(item => CoronavirusDailyStats.fromRawStats(from, to, item))
        .reduce(this.mergeStatsByCountry, {})
    );
  }

  private mergeStatsByCountry(
    accumulated: CoronavirusDailyStatsByCountry,
    current: CoronavirusDailyStats): CoronavirusDailyStatsByCountry {

    const country = current.country;

    if (accumulated[country]) {
      current.stats = current.stats.map((count, index) =>
        count + accumulated[country].stats[index]
      );
    }

    return {
      ...accumulated,
      [country]: current
    };
  }
}

