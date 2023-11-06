import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {Result} from "./result.model";
import {CreateResultDto} from "./dto/create-result.dto";
import {UpdateQuestionDto} from "../questions/dto/update-question.dto";
import {UpdateResultDto} from "./dto/update-result.dto";

@Injectable()
export class ResultService {
    constructor(
        @InjectModel(Result) private resultRepository: typeof Result,
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

    async create(createResultDto: CreateResultDto): Promise<Result> {
        const createdResult = await this.resultRepository.create(
            createResultDto,
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
