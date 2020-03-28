import React, { useEffect, useState } from 'react';

import { RoundContainer } from '~shared/round-container';
import { useInjection } from '~core/ioc';
import { State } from '~core/types';

import {
  CoronavirusServiceType,
  CoronavirusDailyStats,
  ICoronavirusService } from 'app/coronavirus';

import { CoronavirusStats } from './types';

import './coronavirus-report.scss';

const COUNTRIES = ['China', 'United Kingdom', 'US', 'Japan', 'Spain', 'France', 'Germany', 'Italy'];

function filterCountries(stats: CoronavirusDailyStats): boolean {
  return COUNTRIES.some(country => country === stats.country);
}

const defaultStatsState: State<CoronavirusStats> = {
  loaded: false,
  value: {
    confirmed: [],
    recovered: [],
    deaths: []
  }
};

export function CoronavirusReport(): JSX.Element {
  const coronavirusService = useInjection<ICoronavirusService>(CoronavirusServiceType);
  const [stats, setStats] = useState<State<CoronavirusStats>>(defaultStatsState);

  useEffect(() => {
    async function loadCoronavirusData(): Promise<void> {
      try {
        const [confirmed, recovered, deaths] = await Promise.all([
          coronavirusService.getDailyConfirmed(),
          coronavirusService.getDailyRecovered(),
          coronavirusService.getDailyDeaths()
        ]);

        setStats({
          loaded: true,
          value: {
            confirmed: confirmed.filter(filterCountries),
            recovered: recovered.filter(filterCountries),
            deaths: deaths.filter(filterCountries)
          }
        });

      } catch (error) {
        console.error('Error loading Coronavirus data ', error);
      }
    }

    loadCoronavirusData();
  }, [coronavirusService]);

  console.log('Daily...... ', stats);
  return (
    <div className="coronavirus-report">
      <RoundContainer></RoundContainer>
      <RoundContainer></RoundContainer>
      <RoundContainer></RoundContainer>
      <RoundContainer></RoundContainer>
      <RoundContainer></RoundContainer>
      <RoundContainer></RoundContainer>
    </div>
  );
}
