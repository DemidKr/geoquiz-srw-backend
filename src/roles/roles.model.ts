import {Column, DataType, HasMany, Model, Table} from 'sequelize-typescript';
import {Question} from "../questions/question.model";
import {User} from "../users/users.model";

@Table({ tableName: 'roles' })
export class Role extends Model<Role> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    @HasMany(() => User)
    users: User[];
}
