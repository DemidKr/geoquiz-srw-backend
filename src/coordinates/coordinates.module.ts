import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import {Coordinates} from "./coordinates.model";
import {CoordinatesService} from "./coordinates.service";
import {CoordinatesController} from "./coordinates.controller";
import {AuthModule} from "../auth/auth.module";

@Module({
    providers: [CoordinatesService],
    controllers: [CoordinatesController],
    imports: [SequelizeModule.forFeature([Coordinates]), AuthModule],
    exports: [CoordinatesService],
})
export class CoordinatesModule {}
