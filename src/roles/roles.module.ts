import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import {Role} from "./roles.model";
import {RolesService} from "./roles.service";
import {RolesController} from "./roles.controller";

@Module({
    providers: [RolesService],
    controllers: [RolesController],
    imports: [SequelizeModule.forFeature([Role])],
    exports: [RolesService],
})
export class RoleModule {}
