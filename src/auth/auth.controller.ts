import {
  BadRequestException,
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/authLogin.dto';
import { AuthRegisterDto } from './dto/authRegister.dto';
import { AuthForgetPasswordDto } from './dto/authForgetPassword.dto';
import { AuthResetPasswordDto } from './dto/authResetPassword.dto';

import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { join } from 'path';

import { AuthGuard } from '../guards/auth.guard';
import { UserDecorator } from '../decorators/user.decorator';
import { UserEntity } from '../user/entity/user.entity';
import { FileService } from '../files/file.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly fileService: FileService,
  ) {}

  @Post('login')
  async login(@Body() { email, password }: AuthLoginDto) {
    return this.authService.login(email, password);
  }

  @UseGuards(AuthGuard)
  @Post('me')
  async me(@UserDecorator() user: UserEntity) {
    return { user };
  }

  @Post('register')
  async registerUser(@Body() data: AuthRegisterDto) {
    return this.authService.registerUser(data);
  }

  @Post('forget')
  async forgetPassword(@Body() { email }: AuthForgetPasswordDto) {
    return this.authService.forgetPassword(email);
  }

  @Post('reset')
  async resetPassword(@Body() { password, token }: AuthResetPasswordDto) {
    return this.authService.resetPassword(password, token);
  }

  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  @Post('file')
  async uploadFile(
    @UserDecorator() user: UserEntity,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'image/png' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 50 }),
        ],
      }),
    )
    attachedFile: Express.Multer.File,
  ) {
    const path = join(
      __dirname,
      '..',
      '..',
      'storage',
      'files',
      `file-${user.id}.png`,
    );

    try {
      await this.fileService.upload(attachedFile, path);
    } catch (error) {
      throw new BadRequestException(error);
    }

    return { success: true };
  }

  @UseInterceptors(FilesInterceptor('files'))
  @UseGuards(AuthGuard)
  @Post('files')
  async uploadFiles(@UploadedFiles() attachedFiles: Express.Multer.File[]) {
    return { attachedFiles };
  }

  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: 'file',
        maxCount: 1,
      },
      {
        name: 'documents',
        maxCount: 10,
      },
    ]),
  )
  @UseGuards(AuthGuard)
  @Post('files-fields')
  async uploadFilesFields(
    @UploadedFiles()
    attachedFiles: {
      file: Express.Multer.File;
      documents: Express.Multer.File[];
    },
  ) {
    return { attachedFiles };
  }
}
