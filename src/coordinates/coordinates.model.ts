import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'coordinates' })
export class Coordinates extends Model<Coordinates> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({ type: DataType.DOUBLE, allowNull: false })
    lat: number;

    @Column({ type: DataType.DOUBLE, allowNull: false })
    lng: number;

    @Column({ type: DataType.INTEGER, allowNull: false })
    questionId: number;
}
