import { IsNotEmpty, MaxLength } from "class-validator";

export class BoardCreateDto {
    @IsNotEmpty()
    @MaxLength(30, {
        message: "최대 30자 이내로 입력하셔야됩니다.",
    })
    title: string;

    @IsNotEmpty()
    description: string;
}

export class BoardGetDto {
    title: string;
    limit: number;
    offset: number;
}
