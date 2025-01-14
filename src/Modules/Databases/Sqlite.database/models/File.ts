import { InferAttributes, InferCreationAttributes } from 'sequelize';
import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from './User';

@Table({
  tableName: 'Files',
})
export class File extends Model<
  InferAttributes<File>,
  InferCreationAttributes<File>
> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @Column(DataType.STRING)
  @AllowNull(false)
  filename: string;

  @Column(DataType.STRING)
  @AllowNull(false)
  extension: string;

  @Column(DataType.STRING)
  @AllowNull(false)
  mimeType: string;

  @Column(DataType.INTEGER)
  @AllowNull(false)
  size: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  r_user_id: number;

  @BelongsTo(() => User)
  User: User;
}
