export const FileServiceType = Symbol.for('IFileService');

export interface IFileService {
  downloadCSV(url: string): Promise<string[][]>;
}
