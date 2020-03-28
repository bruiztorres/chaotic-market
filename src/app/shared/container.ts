import { ContainerModule, interfaces } from 'inversify';

import { FileService } from './files/file.service';
import { IFileService, FileServiceType } from './files/ifile.service';

export const sharedContainer = new ContainerModule((bind: interfaces.Bind) => {
  bind<IFileService>(FileServiceType).to(FileService);
});
