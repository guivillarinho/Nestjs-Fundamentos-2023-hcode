import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDtoTypePut } from './dto/updateTypePut-user.dto';
import { UpdateUserDtoTypePatch } from './dto/updateTypePatch-user.dto';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser({ email, name, password }: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(password, 8);
    await this.verifyUserEmailExists(email);

    const createdUser = this.userRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    return this.userRepository.save(createdUser);
  }

  async readAllUsers() {
    return await this.userRepository.find();
  }

  async readUniqueUser(id: number) {
    await this.verifyUserIdExists(id);
    const user = await this.userRepository.findOneBy({
      id,
    });
    return user;
  }

  async updateUser(
    id: number,
    { email, name, password, birthAt, role }: UpdateUserDtoTypePut,
  ) {
    await this.verifyUserIdExists(id);

    const hashedPassword = await bcrypt.hash(password, 8);

    return this.userRepository.update(id, {
      email,
      name,
      password: hashedPassword,
      birthAt: birthAt ? new Date(birthAt) : null,
      role,
    });
  }

  async partialUpdateUser(
    id: number,
    { name, email, password, birthAt, role }: UpdateUserDtoTypePatch,
  ) {
    await this.verifyUserIdExists(id);

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 8);
      password = hashedPassword;
    }
    return await this.userRepository.update(id, {
      name,
      email,
      password,
      birthAt: birthAt && new Date(birthAt),
      role,
    });
  }

  async deleteUser(id: number) {
    await this.verifyUserIdExists(id);
    return await this.userRepository.delete(id);
  }

  async verifyUserIdExists(id: number) {
    if (
      !(await this.userRepository.exist({
        where: {
          id,
        },
      }))
    ) {
      throw new BadRequestException(`O usuário ${id} não existe.`);
    }
  }

  async verifyUserEmailExists(email: string) {
    const userExists = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (userExists) {
      throw new ConflictException(`O e-mail ${userExists.email} já existe`);
    }
  }
}
