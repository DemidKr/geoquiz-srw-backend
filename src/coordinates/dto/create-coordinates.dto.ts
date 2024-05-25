import { IsNotEmpty } from 'class-validator';

export class CoordinatesDto {
    @IsNotEmpty()
    readonly lng: number;

    @IsNotEmpty()
    readonly lat: number;

    readonly description: string
}


export class CreateCoordinatesDto {
    @IsNotEmpty()
    readonly questionId: number;


    @IsNotEmpty()
    readonly coordinates: Array<CoordinatesDto>
}

export class CreateOneCoordinatesDto {
    @IsNotEmpty()
    readonly lng: number;

    @IsNotEmpty()
    readonly lat: number;

    readonly description: string

    @IsNotEmpty()
    readonly questionId: number;
}


