import { IsNotEmpty } from 'class-validator';

export class CreateStarsDto {
    @IsNotEmpty()
    readonly number: number;

    @IsNotEmpty()
    readonly questionId: number;

    @IsNotEmpty()
    readonly userId: number;
}


