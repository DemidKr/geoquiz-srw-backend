import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {Coordinates} from "./coordinates.model";
import {CreateCoordinatesDto} from "./dto/create-coordinates.dto";
import {UpdateCoordinatesDto} from "./dto/update-coordinates.dto";

@Injectable()
export class CoordinatesService {
    constructor(
        @InjectModel(Coordinates) private coordinatesRepository: typeof Coordinates,
    ) {}

    async findAll(): Promise<Coordinates[]> {
        return await this.coordinatesRepository.findAll();
    }

    async findAllFromQuestion(questionId: number): Promise<Coordinates[]> {
        return await this.coordinatesRepository.findAll({
            where: {questionId}
        });
    }

    async findOne(id: number): Promise<Coordinates> {
        return await this.coordinatesRepository.findOne({
            where: { id },
        });
    }

    async create(createCoordinatesDto: CreateCoordinatesDto){
        return await this.coordinatesRepository.bulkCreate(
          createCoordinatesDto.coordinates.map((coord) => {
              return {
                  ...coord,
                  questionId: createCoordinatesDto.questionId
              }
          })
        );
    }

    async update(id: number, updateCoordinatesDto: UpdateCoordinatesDto): Promise<Coordinates> {
        const coordinates = await this.coordinatesRepository.findOne({
            where: { id },
        });

        await coordinates.update({...updateCoordinatesDto},);
        return coordinates.save();
    }

    async delete(id: number): Promise<void> {
        await this.coordinatesRepository.destroy({ where: { id } });
    }
}
