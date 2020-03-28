import { Container } from 'inversify';

import { coreContainer } from '~core/container';
import { sharedContainer } from '~shared/container';
import { coronavirusContainer } from 'app/coronavirus/container';
import { stockMarketContainer } from './stock-market/container';

const container = new Container();

container.load(
  coreContainer,
  sharedContainer,
  coronavirusContainer,
  stockMarketContainer
);

export { container };
