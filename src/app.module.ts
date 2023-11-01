import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/users.model';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { QuestionsModule } from './questions/question.module';
import { Question } from './questions/question.model';
import {Role} from "./roles/roles.model";
import {RoleModule} from "./roles/roles.module";
import {CoordinatesModule} from "./coordinates/coordinates.module";
import {Coordinates} from "./coordinates/coordinates.model";
import {Stars} from "./stars/stars.model";
import {StarsModule} from "./stars/stars.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Question, Role, Coordinates, Stars],
      autoLoadModels: true,
    }),
    UsersModule,
    AuthModule,
    QuestionsModule,
    RoleModule,
    CoordinatesModule,
    StarsModule,
  ],
})
export class AppModule {}
