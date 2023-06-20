import {IsEmail, IsString, IsStrongPassword, maxLength} from 'class-validator'

export class CreateUserDto {
    @IsString()
    name: string

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
}