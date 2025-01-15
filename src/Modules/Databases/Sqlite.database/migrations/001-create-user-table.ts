import { QueryInterface, DataTypes } from 'sequelize';
import { MigrationFn } from 'umzug';

export const up: MigrationFn<QueryInterface> = ({ context }) =>
  context.sequelize.transaction((transaction) =>
    Promise.all([
      context.createTable(
        'Users',
        {
          id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          login: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          password: {
            allowNull: false,
            type: DataTypes.STRING,
          },
          jwt_token: {
            type: DataTypes.STRING,
          },
          refresh_token: {
            type: DataTypes.STRING,
          },
          createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
          },
          updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
          },
        },
        { transaction },
      ),
    ]),
  );

export const down: MigrationFn<QueryInterface> = ({ context }) =>
  context.sequelize.transaction((transaction) =>
    Promise.all([context.dropTable('Users', { transaction })]),
  );
