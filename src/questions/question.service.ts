import { Injectable } from '@nestjs/common';
import { Question } from './question.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateQuestionDto } from './dto/create-question.dto';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question) private questionRepository: typeof Question,
  ) {}

  async findAll(): Promise<Question[]> {
    return await this.questionRepository.findAll();
  }

  async findOne(id: number): Promise<Question> {
    return await this.questionRepository.findOne({
      where: { id },
    });
  }

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const createdQuestion = await this.questionRepository.create(
      createQuestionDto,
    );
    return createdQuestion.save();
  }

  async delete(id: number): Promise<void> {
    await this.questionRepository.destroy({ where: { id } });
  }
}
