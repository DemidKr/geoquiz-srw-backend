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

    async findQuestionAverageStars(questionId: number): Promise<Stars[]> {
        return await this.starsRepository.findAll({where: {questionId}});
    }

    async findOne(id: number): Promise<Stars> {
        return await this.starsRepository.findOne({
            where: { id },
        });
    }

    async create(createStarsDto: CreateStarsDto): Promise<Stars> {
        const createdStars = await this.starsRepository.create(
            createStarsDto,
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
