import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { AuthRegisterDto } from './dto/authRegister.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entity/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly JwtService: JwtService,
    private readonly userService: UserService,
    private readonly mailerService: MailerService,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  createToken(user: UserEntity) {
    const accessToken = this.JwtService.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      {
        expiresIn: '1d',
        subject: String(user.id),
        issuer: 'login',
        audience: 'users',
      },
    );

    return accessToken;
  }

  checkToken(token: string) {
    try {
      const data = this.JwtService.verify(token, {
        audience: 'users',
        issuer: 'login',
      });
      return data;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  isAuthenticated(token: string) {
    try {
      this.checkToken(token);
      return true;
    } catch (error) {
      return false;
    }
  }

  async login(email: string, password: string) {
    const existingUser = await this.findUserInDataBase(email, password);

    if (!existingUser) {
      throw new UnauthorizedException('Usuário ou senha estão incorretos!');
    }
    const token = this.createToken(existingUser);
    return token;
  }

  async registerUser(data: AuthRegisterDto) {
    const user = await this.userService.createUser(data);
    return this.createToken(user);
  }

  async forgetPassword(email: string) {
    const user = await this.userRepository.findOneBy({
      email,
    });

    const token = this.JwtService.sign(
      {
        id: user.id,
      },
      {
        expiresIn: '30 minutes',
        subject: String(user.id),
        issuer: 'forget',
        audience: 'users',
      },
    );

    await this.mailerService.sendMail({
      subject: 'Recuperação de senha',
      to: 'guivillarinho15@gmail.com',
      template: 'forget-password',
      context: {
        name: user.name,
        token,
      },
    });

    if (!user) {
      throw new UnauthorizedException('O e-mail está incorreto!');
    }
    return { success: true };
  }

  async resetPassword(password: string, token: string) {
    //Se o token, for válido.
    try {
      const data: any = this.JwtService.verify(token, {
        issuer: 'forget',
        audience: 'users',
      });

      if (isNaN(Number(data.id))) {
        throw new BadRequestException('Token é inválido!');
      }

      const hashedPassword = await bcrypt.hash(password, 8);

      const user = await this.userService.readUniqueUser(data.id);

      await this.userRepository.update(Number(data.id), {
        password: hashedPassword,
      });

      const tokenToLogin = this.createToken(user);

      return tokenToLogin;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findUserInDataBase(email: string, password: string) {
    const user = await this.userRepository.findOneBy({
      email,
    });

    if (!user) {
      throw new UnauthorizedException('Usuário ou senha incorretos!');
    }

    const passwordVerify = await bcrypt.compare(password, user.password);

    if (!passwordVerify) {
      throw new UnauthorizedException('Usuário ou senha incorretos!');
    }

    return user;
  }
}
