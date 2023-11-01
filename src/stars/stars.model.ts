import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'stars' })
export class Stars extends Model<Stars> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({ type: DataType.INTEGER, allowNull: false })
    number: number;

    @Column({ type: DataType.INTEGER, allowNull: false })
    questionId: number;

    @Column({ type: DataType.INTEGER, allowNull: false })
    userId: number;
}
