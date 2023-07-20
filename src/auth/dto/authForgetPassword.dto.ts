import { IsEmail } from 'class-validator';

export class AuthForgetPasswordDto {
  @IsEmail()
  email: string;
}
