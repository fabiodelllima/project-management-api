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
  console.table(data);

  console.log('\n200:');
  console.table(developerId);

  const developerSince = new Date();

  const newDeveloperInfo = {
    ...data,
    developerId,
    developerSince,
  };

  console.log('\n300:');
  console.table(newDeveloperInfo);

  const queryFormat: string = format(
    `
      INSERT INTO "developerInfos" (%I) 
      VALUES (%L) 
      RETURNING *;
    `,
    Object.keys(newDeveloperInfo),
    Object.values(newDeveloperInfo)
  );

  console.log('\n400:');
  console.table(newDeveloperInfo);

  const queryResult: TDeveloperInfosResult = await client.query(
    queryFormat
  );

  console.log('\n500:');
  console.table(newDeveloperInfo);

  return queryResult.rows[0];
};
