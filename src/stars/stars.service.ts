import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {Stars} from "./stars.model";
import {CreateStarsDto} from "./dto/create-stars.dto";
import {UpdateStarsDto} from "./dto/update-stars.dto";

@Injectable()
export class StarsService {
    constructor(
        @InjectModel(Stars) private starsRepository: typeof Stars,
    ) {}

    async findAll(): Promise<Stars[]> {
        return await this.starsRepository.findAll();
    }

    async findQuestionAverageStars(questionId: number): Promise<number> {
        const stars = await this.starsRepository.findAll({where: {questionId}})

        return stars.reduce((accumulator, currentStar) => accumulator + currentStar.number, 0);
    }

    async findOne(id: number): Promise<Stars> {
        return await this.starsRepository.findOne({
            where: { id },
        });
    }

    async findUserOneInQuestion({ userId, questionId }:{ userId: number, questionId: number }): Promise<Stars> {
        return await this.starsRepository.findOne({
            where: { userId, questionId },
        });
    }

    async create(createStarsDto: CreateStarsDto): Promise<Stars> {
        let starsNumber = createStarsDto.number

        if (starsNumber > 5) {
            starsNumber = 5
        }

        if (starsNumber < 1) {
            starsNumber = 1
        }

        const createdStars = await this.starsRepository.create(
          { ...createStarsDto, number: starsNumber},
        );
        return createdStars.save();
    }

    async update(id: number, updateStarsDto: UpdateStarsDto): Promise<Stars> {
        const stars = await this.starsRepository.findOne({
            where: { id },
        });

        await stars.update(updateStarsDto,);
        return stars.save();
    }

    async delete(id: number): Promise<void> {
        await this.starsRepository.destroy({ where: { id } });
    }
}
