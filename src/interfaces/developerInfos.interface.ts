import { QueryResult } from 'pg';

export type TDeveloperInfos = {
  id: number;
  developerSince: Date;
  preferredOS: string;
  developerId: number;
};

export type TCreateDeveloperInfos = Omit<
  TDeveloperInfos,
  'id' | 'developerId'
>;

export type TDeveloperInfosResult = QueryResult<TDeveloperInfos>;

export type TDeveloperInfosRead = TDeveloperInfos[];

export type TDeveloperInfosUpdate = Partial<TDeveloperInfos>;
