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
  Res, UploadedFile,
  UseGuards, UseInterceptors,
} from '@nestjs/common';
import { QuestionsService } from './question.service';
import { AuthService } from '../auth/auth.service';
import { JWTGuard } from '../auth/guards/jwt.guard';
import { CreateQuestionDto } from './dto/create-question.dto';
import {UpdateQuestionDto} from "./dto/update-question.dto";
import {GetAllQuestionsDto} from "./dto/get-all-questions.dto";
import { diskStorage } from 'multer';
import * as path from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { v4 as uuidv4 } from 'uuid';

export const storage = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`)
    }
  })

}

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
    const {questions, pageCount} = await this.questionsService.findAll(query, user.id);

    return res.send({
      pageCount,
      questions: questions
    });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getQuestion(@Param('id') id: number) {
    return await this.questionsService.findOne(id);
  }

  @UseGuards(JWTGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file', storage))
  @HttpCode(HttpStatus.OK)
  async createQuestion(
    @UploadedFile() file: Express.Multer.File | undefined,
    @Body() createQuestionDto: CreateQuestionDto,
    @Req() req,
  ) {
    const user = await this.authService.getUserByTokenData(req.token);

    return await this.questionsService.create({
      ...createQuestionDto,
      imageUrl: file?.filename ?? null,
      userId: user.id,
    }).then((result) => result.id);
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
  @Put('/publish/:id')
  @HttpCode(HttpStatus.OK)
  async publishQuestion(
    @Param('id') id: number,
    @Req() req,
  ) {
    return await this.questionsService.publish(id);
  }

  @UseGuards(JWTGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteQuestion(@Param('id') id: number) {
    return await this.questionsService.delete(id);
  }
}
