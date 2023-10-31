import { IsNotEmpty } from 'class-validator';

export class CreateQuestionDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly coordinates: number[];

  @IsNotEmpty()
  readonly date: Date;

  @IsNotEmpty()
  readonly userId: number;
}


