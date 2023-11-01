import {IsNotEmpty} from "class-validator";

export class UpdateStarsDto {
    @IsNotEmpty()
    readonly number: number;
}
