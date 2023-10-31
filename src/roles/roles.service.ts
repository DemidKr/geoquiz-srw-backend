import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {Role} from "./roles.model";
import {CreateRoleDto} from "./dto/create-role.dto";

@Injectable()
export class RolesService {
    constructor(
        @InjectModel(Role) private roleRepository: typeof Role,
    ) {}

    async findAll(): Promise<Role[]> {
        return await this.roleRepository.findAll();
    }

    async findOne(id: number): Promise<Role> {
        return await this.roleRepository.findOne({
            where: { id },
        });
    }

    async create(createRoleDto: CreateRoleDto): Promise<Role> {
        const createdQuestion = await this.roleRepository.create(
            createRoleDto,
        );
        return createdQuestion.save();
    }

    async delete(id: number): Promise<void> {
        await this.roleRepository.destroy({ where: { id } });
    }
}
