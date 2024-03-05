import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { ReportsService } from './reports.service';
import { Report } from './report.model';
import { ReportsController } from './reports.controller';

@Module({
  providers: [ReportsService],
  controllers: [ReportsController],
  imports: [SequelizeModule.forFeature([Report]), AuthModule],
  exports: [ReportsService],
})
export class ReportsModule {}