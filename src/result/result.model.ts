import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Question } from '../questions/question.model';
import { User } from '../users/users.model';

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

    @BelongsTo(() => User,{as: 'users'})
    user: User;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    userId: number;

    @BelongsTo(() => Question)
    question: Question;

    @ForeignKey(() => Question)
    @Column({ type: DataType.INTEGER, allowNull: false })
    questionId: number;
}
