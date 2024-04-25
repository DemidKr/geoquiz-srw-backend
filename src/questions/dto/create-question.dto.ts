import { IsNotEmpty } from 'class-validator';

export class CreateQuestionDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  readonly time: number;

  readonly imageUrl: string;

  @IsNotEmpty()
  readonly userId: number;
}


