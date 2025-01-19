import { DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';
import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from './User';

@Table({
  tableName: 'BlacklistTokens',
})
export default class BlacklistTokens extends Model<
  InferAttributes<BlacklistTokens>,
  InferCreationAttributes<BlacklistTokens>
> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataTypes.INTEGER)
  id: number;

  @AllowNull(false)
  @Column(DataTypes.STRING)
  token: string;

  @AllowNull(false)
  @Column(DataTypes.INTEGER)
  expired_in: number;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column(DataTypes.INTEGER)
  r_user_id: number;

  @BelongsTo(() => User)
  User: User;
}
