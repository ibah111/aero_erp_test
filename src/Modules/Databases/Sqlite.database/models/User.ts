import { InferAttributes, InferCreationAttributes } from 'sequelize';
import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { File } from './File';

@Table({ tableName: 'Users' })
export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  login: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  password: string;

  @Column(DataType.STRING)
  refresh_token: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  updatedAt: Date;

  @AllowNull(false)
  @Column(DataType.DATE)
  createdAt: Date;

  @HasMany(() => File)
  Files?: File[];
}
