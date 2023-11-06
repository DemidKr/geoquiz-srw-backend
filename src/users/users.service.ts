import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { LoginUserDto } from '../auth/dto/login-user.dto';
import {Coordinates} from "../coordinates/coordinates.model";
import {Role} from "../roles/roles.model";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User) {}

    async login(loginUserDto: LoginUserDto): Promise<User | null> {
        const user = await this.userRepository.findOne({
            where: { username: loginUserDto.username },
            include: [{ model: Role }]
        });

        if (!user) {
            return null;
        }

        return user;
    }

    async registration(createUserDto: CreateUserDto): Promise<User | null> {
        const existingUser = await this.userRepository.findOne({
            where: { username: createUserDto.username },
        });

        if (existingUser) {
            return null;
        }

        const createdUser = await this.userRepository.create({...createUserDto, roleId: 1});
        return createdUser.save();
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const user = await this.userRepository.create(createUserDto);
        return user.save();
    }

    async findOne(username: string): Promise<User> {
        return await this.userRepository.findOne({
            where: { username },
            include: [{ model: Role }]
        });
    }
}
