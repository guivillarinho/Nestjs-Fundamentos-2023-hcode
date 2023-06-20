import { IsDateString, IsEmail, IsOptional, IsString, IsStrongPassword, maxLength} from 'class-validator'

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
}