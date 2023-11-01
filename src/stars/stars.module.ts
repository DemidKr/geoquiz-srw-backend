import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { Module } from '@nestjs/common';
import {StarsService} from "./stars.service";
import {StarsController} from "./stars.controller";
import {Stars} from "./stars.model";

@Module({
    providers: [StarsService],
    controllers: [StarsController],
    imports: [SequelizeModule.forFeature([Stars]), AuthModule],
    exports: [StarsService],
})
export class StarsModule {}
