import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'result' })
export class Result extends Model<Result> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({ type: DataType.INTEGER, allowNull: false })
    score: number;

    @Column({ type: DataType.INTEGER, allowNull: false })
    questionId: number;

    @Column({ type: DataType.INTEGER, allowNull: false })
    userId: number;
}
