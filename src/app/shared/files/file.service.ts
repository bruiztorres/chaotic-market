import Papa from 'papaparse';
import { ReadStream } from 'fs';
import { inject, injectable } from 'inversify';

import { IHttp, HttpType } from '~core/http';
import { IFileService } from './ifile.service';

@injectable()
export class FileService implements IFileService {
  constructor(@inject(HttpType) private http: IHttp) {}

  public async downloadCSV(url: string): Promise<string[][]> {
    const streamReader = await this.http.get<ReadStream>(url);
    const { data } = Papa.parse(streamReader);
    return Promise.resolve(data);
  }
}
