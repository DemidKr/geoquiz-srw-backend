import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Report } from './report.model';
import { CreateReportDto } from './dto/create-report.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(Report) private reportsRepository: typeof Report,
  ) {}

  async findAll(): Promise<Report[]> {
    return await this.reportsRepository.findAll();
  }

  async findOne(id: number): Promise<Report> {
    return await this.reportsRepository.findOne({
      where: { id },
    });
  }

  async create(createReportDto: CreateReportDto): Promise<Report> {
    const createdReport = await this.reportsRepository.create(
      createReportDto,
    );
    return createdReport.save();
  }

  async delete(id: number): Promise<void> {
    await this.reportsRepository.destroy({ where: { id } });
  }
}