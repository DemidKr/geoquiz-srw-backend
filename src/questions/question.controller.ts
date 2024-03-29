import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post, Put, Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { QuestionsService } from './question.service';
import { AuthService } from '../auth/auth.service';
import { JWTGuard } from '../auth/guards/jwt.guard';
import { CreateQuestionDto } from './dto/create-question.dto';
import {UpdateQuestionDto} from "./dto/update-question.dto";
import {GetAllQuestionsDto} from "./dto/get-all-questions.dto";
import {query} from "express";

@Controller('question')
export class QuestionsController {
  constructor(
    private questionsService: QuestionsService,
    private authService: AuthService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllQuestions(
      @Res() res,
      @Query() query: GetAllQuestionsDto
  ) {
    const {questions, pageCount} = await this.questionsService.findAll(query);
    return res.send({
      questions,
      pageCount
    });
  }

  @UseGuards(JWTGuard)
  @Get('/user')
  @HttpCode(HttpStatus.OK)
  async getAllUserQuestions(
      @Req() req,
      @Res() res,
      @Query() query: GetAllQuestionsDto
  ) {
    const token = req.token;

    const user = await this.authService.getUserByTokenData(token);
    const {questions, pageCount} = await this.questionsService.findAll(query);
    const filteredQuestions = questions.filter(
      (question) => question.userId === user.id,
    );

    return res.send({
      pageCount,
      questions: filteredQuestions
    });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getQuestion(@Param('id') id: number) {
    return await this.questionsService.findOne(id);
  }

  @UseGuards(JWTGuard)
  @Post()
  @HttpCode(HttpStatus.OK)
  async createQuestion(
    @Body() createQuestionDto: CreateQuestionDto,
    @Req() req,
  ) {
    const user = await this.authService.getUserByTokenData(req.token);

    return await this.questionsService.create({
      ...createQuestionDto,
      userId: user.id,
    });
  }

  @UseGuards(JWTGuard)
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateQuestion(
      @Body() updateQuestionDto: UpdateQuestionDto,
      @Param('id') id: number,
      @Req() req,
  ) {
    return await this.questionsService.update(
        id,
        updateQuestionDto
    );
  }

  @UseGuards(JWTGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteQuestion(@Param('id') id: number) {
    return await this.questionsService.delete(id);
  }
}
