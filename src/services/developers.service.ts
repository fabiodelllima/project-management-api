import format from 'pg-format';
import { client } from '../database';
import {
  TCreateDeveloper,
  TDeveloper,
  TDeveloperRead,
  TDeveloperResult,
  TDeveloperUpdate,
} from '../interfaces/developers.interface';

export const createDeveloperService = async (
  data: TCreateDeveloper
): Promise<TDeveloper> => {
  const queryFormat: string = format(
    `
      INSERT INTO "developers" (%I) 
      VALUES (%L) 
      RETURNING *;
    `,
    Object.keys(data),
    Object.values(data)
  );

  const queryResult: TDeveloperResult = await client.query(
    queryFormat
  );

  return queryResult.rows[0];
};

export const readAllDevelopersService =
  async (): Promise<TDeveloperRead> => {
    const query: string = `SELECT * FROM "clients"`;
    const queryResult: TDeveloperResult = await client.query(
      query
    );

    return queryResult.rows;
  };

export const readDeveloperByIdService = async (
  developerId: string
): Promise<TDeveloper> => {
  const query: string = `
      SELECT
        "d"."id" AS "developerId",
        "d"."name" AS "developerName",
        "d"."email" AS "developerEmail",
        "di"."developerSince" AS "developerInfoDeveloperSince",
        "di"."preferredOS" AS "developerInfoPreferredOS"
      FROM "developers" AS "d" 
      LEFT JOIN "developerInfos" AS "di"
        ON "di"."developerId" = "d"."id"
      WHERE "d"."id" = $1;
    `;

  const queryResult: TDeveloperResult = await client.query(
    query,
    [developerId]
  );

  return queryResult.rows[0];
};

export const updateDeveloperService = async (
  developerId: string,
  data: TDeveloperUpdate
): Promise<TDeveloper> => {
  const queryFormat: string = format(
    `
      UPDATE "developers" 
      SET (%I) = ROW (%L) 
      WHERE "id" = $1 
      RETURNING *;
    `,
    Object.keys(data),
    Object.values(data)
  );

  const queryResult: TDeveloperResult = await client.query(
    queryFormat,
    [developerId]
  );

  return queryResult.rows[0];
};

export const deleteDeveloperService = async (
  developerId: string
): Promise<void> => {
  const query: string = `
    DELETE FROM "developers" 
    WHERE "id" = $1;
  `;

  await client.query(query, [developerId]);
};
