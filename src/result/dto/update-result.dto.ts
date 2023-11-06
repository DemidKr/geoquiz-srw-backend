import { IsNotEmpty } from 'class-validator';

export class UpdateResultDto {
    @IsNotEmpty()
    readonly score: number;
}


