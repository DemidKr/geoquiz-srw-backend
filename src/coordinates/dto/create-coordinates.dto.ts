import { IsNotEmpty } from 'class-validator';

export class CreateCoordinatesDto {
    @IsNotEmpty()
    readonly lat: number;

    @IsNotEmpty()
    readonly lng: number;

    @IsNotEmpty()
    readonly questionId: number;
}


