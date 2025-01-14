import { QueryInterface, DataTypes } from 'sequelize';
import { MigrationFn } from 'umzug';

export const up: MigrationFn<QueryInterface> = ({ context }) =>
  context.sequelize.transaction((transaction) =>
    Promise.all([
      context.createTable(
        'Files',
        {
          id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          filename: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          extension: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          mimeType: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          size: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          r_user_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'Users',
              key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: new Date(),
          },
          deletedAt: {
            type: DataTypes.DATE,
          },
          updatedAt: {
            type: DataTypes.DATE,
          },
        },
        { transaction },
      ),
    ]),
  );

export const down: MigrationFn<QueryInterface> = ({ context }) =>
  context.sequelize.transaction((transaction) =>
    Promise.all([context.dropTable('Files', { transaction })]),
  );
