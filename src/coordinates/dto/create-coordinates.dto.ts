import { IsNotEmpty } from 'class-validator';

export class CoordinatesDto {
    @IsNotEmpty()
    readonly lng: number;

    @IsNotEmpty()
    readonly lat: number;
}


export class CreateCoordinatesDto {
    @IsNotEmpty()
    readonly questionId: number;


    @IsNotEmpty()
    readonly coordinates: Array<CoordinatesDto>
}


