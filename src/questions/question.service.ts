import { Injectable } from '@nestjs/common';
import { Question } from './question.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateQuestionDto } from './dto/create-question.dto';
import {UpdateQuestionDto} from "./dto/update-question.dto";
import {User} from "../users/users.model";
import {Coordinates} from "../coordinates/coordinates.model";
import {GetAllQuestionsDto} from "./dto/get-all-questions.dto";
import {Op} from "sequelize";

interface GetAllQuestionsResponse {
  pageCount: number,
  questions: Question[]
}

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question) private questionRepository: typeof Question,
  ) {}

  async findAll(getAllQuestionDto: GetAllQuestionsDto): Promise<GetAllQuestionsResponse> {
    const {search = '', perPage = 20, page= 1} = getAllQuestionDto
    const offset = (page - 1) * perPage

    const questionData =  await this.questionRepository.findAndCountAll({
      where: {
        title: { [Op.like]: `%${search}%` },
      },
      include: [
        {
          model: User,
          attributes: ['username'],   // attributes here are nested under "Like"
        },
        {
          model: Coordinates,
        },
      ],
      distinct: true, // helps return right count
      offset,
      limit: perPage
    });

    const { rows: questions, count: totalNumber} = questionData
    const pageCount = Math.ceil(totalNumber / perPage);

    return {
      pageCount,
      questions
    }
  }

  async findOne(id: number): Promise<Question> {
    return await this.questionRepository.findOne({
      where: { id },
      include: [
          {
            model: User,
            attributes: ['username'],   // attributes here are nested under "Like"
        },
        {
          model: Coordinates,
        },
      ]
    });
  }

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const createdQuestion = await this.questionRepository.create(
      createQuestionDto,
    );
    return createdQuestion.save();
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto): Promise<Question> {
    const question = await this.questionRepository.findOne({
      where: { id },
      include: [
        {
          model: User,
          attributes: ['username'],   // attributes here are nested under "Like"
        },
        {
          model: Coordinates,
        },
      ]
    });

    await question.update(updateQuestionDto);
    return question.save();
  }

  async delete(id: number): Promise<void> {
    await this.questionRepository.destroy({ where: { id } });
  }
}
