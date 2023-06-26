import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthLoginDto } from "./dto/authLogin.dto";
import { AuthRegisterDto } from "./dto/authRegister.dto";
import { AuthForgetPasswordDto } from "./dto/authForgetPassword.dto";
import { AuthResetPasswordDto } from "./dto/authResetPassword.dto";
import { UserService } from "src/user/user.service";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly useService: UserService,
        private readonly authService: AuthService
    ){}

    @Post('login')
    async login(@Body() {email, password}: AuthLoginDto){
        console.log({email, password})
         return this.authService.login(email, password)
    }

    @Post('register')
    async registerUser(@Body() data: AuthRegisterDto){
        console.log(data)
        return this.useService.createUser(data)
    }

    @Post('forget')
    async forgetPassword(@Body() {email}: AuthForgetPasswordDto){
        return this.authService.forgetPassword(email)
    }

    @Post('reset')
    async resetPassword(@Body() {password, token}: AuthResetPasswordDto){
        return this.authService.resetPassword(password, token)
    }
}