import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from 'sequelize-typescript';
import {User} from "../users/users.model";
import {Question} from "../questions/question.model";

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

    @BelongsTo(() => Question)
    question: Question;

    @ForeignKey(() => Question)
    @Column({ type: DataType.INTEGER, allowNull: false })
    questionId: number;
}
