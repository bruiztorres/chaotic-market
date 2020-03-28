import 'reflect-metadata';
import React from 'react';
import ReactDOM from 'react-dom';

import { IocProvider } from '~core/ioc';
import { container } from './app/container';
import { App } from './app/app';

import './styles/main.scss';

ReactDOM.render(
  <IocProvider container={container}>
    <App />
  </IocProvider>
  , document.getElementById('root')
);


