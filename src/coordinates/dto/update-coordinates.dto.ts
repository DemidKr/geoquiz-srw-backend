import { IsNotEmpty } from 'class-validator';

export class UpdateCoordinatesDto {
    @IsNotEmpty()
    readonly lat: number;

    @IsNotEmpty()
    readonly lng: number;

    readonly description: string
}


