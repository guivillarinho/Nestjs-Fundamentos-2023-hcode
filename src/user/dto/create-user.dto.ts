import { IsDateString, IsEmail, IsEnum, IsOptional, IsString, IsStrongPassword } from 'class-validator'
import { Role } from 'src/enums/role.enum'

export class CreateUserDto {
    @IsString()
    name: string

    @IsOptional()
    @IsEmail()
    email: string

    @IsStrongPassword({
        minLength: 6,
        minUppercase: 1,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })
    password: string

    @IsOptional()
    @IsDateString()
    birthAt?: Date 

    @IsOptional()
    @IsEnum(Role)
    role: string
}