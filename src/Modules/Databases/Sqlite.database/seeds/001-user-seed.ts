import { QueryInterface } from 'sequelize';
import { MigrationFn } from 'umzug';
const default_pull_of_users = [
  {
    name: 'Admin',
    password: 'password',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
export const up: MigrationFn<QueryInterface> = async ({ context }) =>
  context.sequelize.transaction((transaction) =>
    Promise.all([
      context.bulkInsert('Users', default_pull_of_users, { transaction }),
    ]),
  );

export const down: MigrationFn<QueryInterface> = async ({ context }) =>
  context.sequelize.transaction((transaction) =>
    Promise.all([
      context.bulkDelete('Users', default_pull_of_users, { transaction }),
    ]),
  );
