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

  @AllowNull(false)
  @Column(DataType.STRING)
  filename: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  extension: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  mimeType: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  size: number;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  r_user_id: number;

  @AllowNull(true)
  @Column(DataType.BLOB)
  buffer: Buffer | null;

  @BelongsTo(() => User)
  User: User;
}
