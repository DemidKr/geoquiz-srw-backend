import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'report' })
export class Report extends Model<Report> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  type: number;

  @Column({ type: DataType.STRING, allowNull: false})
  description: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  questionId: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;
}