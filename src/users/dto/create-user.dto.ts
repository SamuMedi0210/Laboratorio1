import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { UserGender } from "src/common/enum/roles/userGender";
import { UserRole } from "src/common/enum/roles/userRole";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(18)
    age: number;

    @IsString()
    @IsNotEmpty()
    photo: string[];

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEnum(UserGender)
    @IsNotEmpty()
    gender: UserGender;

    @IsBoolean()
    @IsNotEmpty()
    isActive: boolean;

}
