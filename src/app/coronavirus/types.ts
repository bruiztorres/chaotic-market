export type CoronavirusDailyStatsByCountry = {
  [country: string]: CoronavirusDailyStats;
};

export class CoronavirusDailyStats {
  constructor(
    public country: string,
    public from: Date,
    public to: Date,
    public stats: number[]) {}

  public static fromRawStats(from: string, to: string, data: string[]): CoronavirusDailyStats {
    const country = data[1];
    const statsOffset = 4;

    const stats = data
      .slice(statsOffset, data.length)
      .map(count => +count);

    return new this(
      country,
      new Date(Date.parse(from + 'UTC')),
      new Date(Date.parse(to + 'UTC')),
      stats
    );
  }
}

export type CoronavirusStatsType = 'death' | 'confirmed' | 'recovered';

export type CoronavirusDailyStatsCache = {
  [key in CoronavirusStatsType]?: Promise<CoronavirusDailyStats[]>;
};
