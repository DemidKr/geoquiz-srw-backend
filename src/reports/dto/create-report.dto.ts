import { IsNotEmpty } from 'class-validator';

export class CreateReportDto {
  @IsNotEmpty()
  readonly type: number;

  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  readonly questionId: number;

  @IsNotEmpty()
  readonly userId: number;
}