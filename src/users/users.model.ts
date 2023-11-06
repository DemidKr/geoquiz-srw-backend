import {Column, DataType, HasMany, Model, Table} from 'sequelize-typescript';
import {Question} from "../questions/question.model";

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  username: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  roleId: number;

  @HasMany(() => Question)
  questions: Question[];
}
