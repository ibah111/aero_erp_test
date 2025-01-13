import { QueryInterface } from 'sequelize';

export const up = async (queryInterface: QueryInterface) => {
  await queryInterface.bulkInsert('Users', [
    { name: 'Admin', createdAt: new Date(), updatedAt: new Date() },
  ]);
};

export const down = async (queryInterface: QueryInterface) => {
  await queryInterface.bulkDelete('Users', {});
};
