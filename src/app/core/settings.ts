type Environment = 'development' | 'staging' | 'production';

export const SettingsType = Symbol.for('ISettings');

export type ISettings = {
  environment: Environment;
  countries: string;
  coronavirus: {
    dailyDeathsUrl: string;
    dailyConfirmedUrl: string;
    dailyRecoveredUrl: string;
  };
}

export const settings: ISettings = {
  environment: process.env.NODE_ENV as Environment,
  countries: process.env.COUNTRIES as string,
  coronavirus: {
    dailyDeathsUrl: process.env.CORONAVIRUS_DAILY_DEATHS_URL as string,
    dailyConfirmedUrl: process.env.CORONAVIRUS_DAILY_CONFIRMED_URL as string,
    dailyRecoveredUrl: process.env.CORONAVIRUS_DAILY_RECOVERD_URL as string
  }
};
