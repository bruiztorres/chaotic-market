import React from 'react';

import { NavBar } from '~core/layout';
import { CoronavirusReport } from './reports';

import './app.scss';

export function App(): JSX.Element {
  return (
    <div className="layout">
      <NavBar className="layout__nav"></NavBar>
      <main className="layout__main">
        { <CoronavirusReport/> }
      </main>
    </div>
  );
}
