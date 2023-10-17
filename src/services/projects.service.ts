import format from 'pg-format';
import { client } from '../database';
import {
  TCreateProject,
  TProject,
  TProjectResult,
  TProjectUpdate,
} from '../interfaces/projects.interface';

export const createProjectService = async (
  data: TCreateProject,
  developerId: number
): Promise<TProject> => {
  const startDate = new Date();
  const endDate = new Date();

  const newDeveloperInfo = {
    ...data,
    developerId,
    startDate,
    endDate,
  };

  const queryFormat: string = format(
    `
      INSERT INTO "projects" (%I) 
      VALUES (%L) 
      RETURNING *;
    `,
    Object.keys(data),
    Object.values(data)
  );

  const queryResult: TProjectResult = await client.query(
    queryFormat
  );

  return queryResult.rows[0];
};

export const readProjectByIdService = async (
  developerId: string
): Promise<TProject> => {
  const query: string = `
      SELECT
        "p"."id" AS "projectId",
        "p"."name" AS "projectName",
        "p"."description" AS "projectDescription",
        "p"."repository" AS "projectRepository",
        "p"."startDate" AS "projectStartDate",
        "p"."endDate" AS "projectEndDate",
        "d"."name" AS "projectDeveloperName"
      FROM "projects" AS "p" 
      LEFT JOIN "developers" AS "d"
        ON "p"."developerId" = "d"."id"
      WHERE "p"."id" = $1;
    `;

  const queryResult: TProjectResult = await client.query(query, [
    developerId,
  ]);

  return queryResult.rows[0];
};

export const updateProjectService = async (
  developerId: string,
  data: TProjectUpdate
): Promise<TProject> => {
  const queryFormat: string = format(
    `
      UPDATE "projects" 
      SET (%I) = ROW (%L) 
      WHERE "id" = $1 
      RETURNING *;
    `,
    Object.keys(data),
    Object.values(data)
  );

  const queryResult: TProjectResult = await client.query(
    queryFormat,
    [developerId]
  );

  return queryResult.rows[0];
};
