import format from 'pg-format';
import { client } from '../database';
import {
  TCreateDeveloper,
  TDeveloper,
  TQueryResult,
} from '../interfaces/developers.interface';

export const createDeveloperService = async (
  data: TCreateDeveloper
): Promise<TDeveloper> => {
  const queryFormat: string = format(
    `INSERT INTO "developers" (%I) VALUES (%L) RETURNING *;`,
    Object.keys(data),
    Object.values(data)
  );

  const queryResult: TQueryResult = await client.query(
    queryFormat
  );

  return queryResult.rows[0];
};
