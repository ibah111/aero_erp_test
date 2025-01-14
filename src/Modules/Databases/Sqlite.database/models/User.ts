import { InferAttributes, InferCreationAttributes } from 'sequelize';
import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: 'Users' })
export class Users extends Model<
  InferAttributes<Users>,
  InferCreationAttributes<Users>
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  updatedAt: Date;

  @AllowNull(false)
  @Column(DataType.DATE)
  createdAt: Date;
}
