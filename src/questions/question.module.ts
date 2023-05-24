import { QuestionsService } from './question.service';
import { QuestionsController } from './question.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Question } from './question.model';
import { AuthModule } from '../auth/auth.module';
import { Module } from '@nestjs/common';

@Module({
  providers: [QuestionsService],
  controllers: [QuestionsController],
  imports: [SequelizeModule.forFeature([Question]), AuthModule],
  exports: [QuestionsService],
})
export class QuestionsModule {}
