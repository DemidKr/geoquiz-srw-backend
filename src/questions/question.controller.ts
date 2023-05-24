import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { QuestionsService } from './question.service';
import { AuthService } from '../auth/auth.service';
import { JWTGuard } from '../auth/guards/jwt.guard';
import { CreateQuestionDto } from './dto/create-question.dto';

@Controller('question')
export class QuestionsController {
  constructor(
    private questionsService: QuestionsService,
    private authService: AuthService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllQuestions(@Req() req, @Res() res) {
    const questions = await this.questionsService.findAll();
    // const filteredQuestions = questions.filter(
    //   (question) => question.userId === user.id,
    // );

    return res.send(questions);
  }
  @UseGuards(JWTGuard)
  @Get('/user')
  @HttpCode(HttpStatus.OK)
  async getAllUserQuestions(@Req() req, @Res() res) {
    const token = req.token;

    const user = await this.authService.getUserByTokenData(token);
    const questions = await this.questionsService.findAll();
    const filteredQuestions = questions.filter(
      (question) => question.userId === user.id,
    );

    return res.send(filteredQuestions);
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
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteQuestion(@Param('id') id: number) {
    return await this.questionsService.delete(id);
  }
}
