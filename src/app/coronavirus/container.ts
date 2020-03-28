import { ContainerModule, interfaces } from 'inversify';

import { CoronavirusService } from './coronavirus.service';
import { ICoronavirusService, CoronavirusServiceType } from './icoronavirus.service';

export const coronavirusContainer = new ContainerModule((bind: interfaces.Bind) => {
  bind<ICoronavirusService>(CoronavirusServiceType).to(CoronavirusService).inSingletonScope();
});
