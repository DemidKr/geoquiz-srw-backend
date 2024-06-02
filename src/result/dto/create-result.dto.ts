import { IsNotEmpty } from 'class-validator';

export class CreateResultDto {
    @IsNotEmpty()
    readonly score: number;

    @IsNotEmpty()
    readonly questionId: number;

    @IsNotEmpty()
    readonly userId: number;
}
