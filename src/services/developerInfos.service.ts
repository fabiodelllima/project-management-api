import format from 'pg-format';
import { client } from '../database';
import {
  TCreateDeveloperInfos,
  TDeveloperInfos,
  TDeveloperInfosResult,
} from '../interfaces/developerInfos.interface';

export const createDeveloperInfosService = async (
  data: TCreateDeveloperInfos,
  developerId: number
): Promise<TDeveloperInfos> => {
  const developerSince = new Date();

  const newDeveloperInfo = {
    ...data,
    developerId,
    developerSince,
  };

  const queryFormat: string = format(
    `
      INSERT INTO "developerInfos" (%I) 
      VALUES (%L) 
      RETURNING *;
    `,
    Object.keys(newDeveloperInfo),
    Object.values(newDeveloperInfo)
  );

  const queryResult: TDeveloperInfosResult = await client.query(
    queryFormat
  );

  return queryResult.rows[0];
};
