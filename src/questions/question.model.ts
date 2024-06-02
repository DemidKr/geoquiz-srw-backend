import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from 'sequelize-typescript';
import {User} from "../users/users.model";
import {Coordinates} from "../coordinates/coordinates.model";
import { Stars } from '../stars/stars.model';
import { Result } from '../result/result.model';

@Table({ tableName: 'question' })
export class Question extends Model<Question> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false})
  title: string;

  @Column({ type: DataType.STRING, allowNull: false})
  description: string;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 60 })
  time: number;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  timesFinished: number;

  @Column({ type: DataType.STRING })
  imageUrl: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  isFinished: boolean;

  @BelongsTo(() => User,{as: 'users'})
  user: User;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @HasMany(() => Coordinates, {as: 'coordinates', foreignKey: 'questionId'})
  coordinates: Coordinates[];

  @HasMany(() => Stars, {as: 'stars', foreignKey: 'questionId'})
  stars: Stars[];

  @HasMany(() => Result, {as: 'result', foreignKey: 'questionId'})
  result: Result[];
}
