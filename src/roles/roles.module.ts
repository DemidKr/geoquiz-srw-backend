import { SequelizeModule } from '@nestjs/sequelize';
import {forwardRef, Module} from '@nestjs/common';
import {Role} from "./roles.model";
import {RolesService} from "./roles.service";
import {RolesController} from "./roles.controller";
import {AuthModule} from "../auth/auth.module";

@Module({
    providers: [RolesService],
    controllers: [RolesController],
    imports: [SequelizeModule.forFeature([Role]), forwardRef(() => AuthModule)],
    exports: [RolesService],
})
export class RoleModule {}
