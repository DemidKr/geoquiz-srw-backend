import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from 'sequelize-typescript';
import {User} from "../users/users.model";
import {Coordinates} from "../coordinates/coordinates.model";

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

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @HasMany(() => Coordinates)
  coordinates: Coordinates[];
}
