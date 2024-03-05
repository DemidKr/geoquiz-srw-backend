import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { JWTGuard } from '../auth/guards/jwt.guard';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';

@Controller('reports')
export class ReportsController {
  constructor(
    private reportsService: ReportsService,
    private authService: AuthService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllReports(@Res() res) {
    const reports = await this.reportsService.findAll();
    return res.send(reports);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getReport(@Param('id') id: number) {
    return await this.reportsService.findOne(id);
  }

  @UseGuards(JWTGuard)
  @Post()
  @HttpCode(HttpStatus.OK)
  async createReport(
    @Body() createReportDto: CreateReportDto,
    @Req() req,
  ) {
    const user = await this.authService.getUserByTokenData(req.token);

    return await this.reportsService.create(createReportDto);
  }

  @UseGuards(JWTGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteReport(@Param('id') id: number) {
    return await this.reportsService.delete(id);
  }
}