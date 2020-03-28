import { ContainerModule, interfaces } from 'inversify';

import { HttpType, IHttp, http } from './http';
import { SettingsType, ISettings, settings } from './settings';

export const coreContainer = new ContainerModule((bind: interfaces.Bind) => {
  bind<IHttp>(HttpType).toConstantValue(http);
  bind<ISettings>(SettingsType).toConstantValue(settings);
});
