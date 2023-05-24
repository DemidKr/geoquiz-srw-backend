import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'question' })
export class Question extends Model<Question> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.ARRAY(DataType.DOUBLE), allowNull: false })
  coordinates: number[];

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: new Date() })
  date: Date;

  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;
}
