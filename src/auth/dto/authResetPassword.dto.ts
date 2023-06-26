import { IsEmail, IsJWT, IsStrongPassword } from "class-validator"

export class AuthResetPasswordDto {
    @IsStrongPassword({
        minLength: 6,
        minUppercase: 1,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })
    password: string 

    @IsJWT()
    token: string
}