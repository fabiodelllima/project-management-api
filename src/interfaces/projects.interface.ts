import { QueryResult } from 'pg';

export type TProject = {
  name: string;
  description: string;
  repository: string;
  startDate: Date;
  endDate: Date | null;
  developerId: number | null;
};

export type TCreateProject = Omit<TProject, 'id'>;

export type TProjectResult = QueryResult<TProject>;

export type TProjectRead = TProject[];

export type TProjectUpdate = Partial<TProject>;
