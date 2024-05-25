import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { Module } from '@nestjs/common';
import {ResultService} from "./result.service";
import {ResultController} from "./result.controller";
import {Result} from "./result.model";
import { QuestionsModule } from '../questions/question.module';

@Module({
    providers: [ResultService],
    controllers: [ResultController],
    imports: [SequelizeModule.forFeature([Result]), AuthModule, QuestionsModule],
    exports: [ResultService],
})
export class ResultModule {}
