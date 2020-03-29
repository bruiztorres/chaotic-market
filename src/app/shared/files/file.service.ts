import Papa from 'papaparse';
import { inject, injectable } from 'inversify';

import { IHttp, HttpType } from '~core/http';
import { IFileService } from './ifile.service';

@injectable()
export class FileService implements IFileService {
  constructor(@inject(HttpType) private http: IHttp) {}

  public async downloadCSV(url: string): Promise<string[][]> {
    const csvText = await this.http.get<string>(url);
    const { data } = Papa.parse(csvText, { fastMode: true });
    return data;
  }
}
