import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {Result} from "./result.model";
import {CreateResultDto} from "./dto/create-result.dto";
import {UpdateResultDto} from "./dto/update-result.dto";
import { QuestionsService } from '../questions/question.service';
import { User } from '../users/users.model';

@Injectable()
export class ResultService {
    constructor(
        @InjectModel(Result) private resultRepository: typeof Result,
        private questionService: QuestionsService,
    ) {}

    async findAll(): Promise<Result[]> {
        return await this.resultRepository.findAll();
    }

    async findOne(id: number): Promise<Result> {
        return await this.resultRepository.findOne({
            where: { id },
        });
    }

    async findUserResult(userId: number): Promise<Result> {
        return await this.resultRepository.findOne({
            where: { userId },
        });
    }

    async findQuestionResult(questionId: number): Promise<Result[]> {
        return await this.resultRepository.findAll({
            where: { questionId },
            include: [
                {
                    model: User,
                    as: 'users',
                    attributes: ['username'],
                },
            ],
            order: [
                ['score', 'ASC'],
            ],
        });
    }

    async create(createResultDto: CreateResultDto): Promise<Result> {
        const question = await this.questionService.findOne(createResultDto.questionId);
        const questionMaxScore = question.coordinates.length * 1000

        let scoreNumber = createResultDto.score

        if (scoreNumber > questionMaxScore) {
            scoreNumber = questionMaxScore
        }

        if (scoreNumber < 0) {
            scoreNumber = 0
        }

        const createdResult = await this.resultRepository.create(
          {
              ...createResultDto,
              score: scoreNumber,
          },
        );
        return createdResult.save();
    }

    async update(id: number, updateResultDto: UpdateResultDto): Promise<Result> {
        const result = await this.resultRepository.findOne({
            where: { id },
        });

        await result.update(updateResultDto);
        return result.save();
    }

    async delete(id: number): Promise<void> {
        await this.resultRepository.destroy({ where: { id } });
    }
}
