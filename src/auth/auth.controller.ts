import { BadRequestException, Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthLoginDto } from "./dto/authLogin.dto";
import { AuthRegisterDto } from "./dto/authRegister.dto";
import { AuthForgetPasswordDto } from "./dto/authForgetPassword.dto";
import { AuthResetPasswordDto } from "./dto/authResetPassword.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { UserDecorator } from "src/decorators/user.decorator";
import { User } from "@prisma/client";
import { FileInterceptor } from '@nestjs/platform-express'
import { join } from "path";
import { FileService } from "src/files/file.service";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly fileService: FileService
    ){}

    @Post('login')
    async login(@Body() {email, password}: AuthLoginDto){
         return this.authService.login(email, password)
    }

    @UseGuards(AuthGuard)
    @Post('me')
    async me(@UserDecorator() user: User){
         return {user}
    }

    @Post('register')
    async registerUser(@Body() data: AuthRegisterDto){
        return this.authService.registerUser(data)
    }

    @Post('forget')
    async forgetPassword(@Body() {email}: AuthForgetPasswordDto){
        return this.authService.forgetPassword(email)
    }

    @Post('reset')
    async resetPassword(@Body() {password, token}: AuthResetPasswordDto){
        return this.authService.resetPassword(password, token)
    }

    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(AuthGuard)
    @Post('file')
    async uploadFile(@UserDecorator() user: User, @UploadedFile() attachedFile: Express.Multer.File){
         
         const path = join(__dirname,'..', '..', 'storage', 'files', `file-${user.id}.png`)

         try {
            await this.fileService.upload(attachedFile, path)
         } catch (error) {
            throw new BadRequestException(error)
         } 

         return {success: true}
    }
}