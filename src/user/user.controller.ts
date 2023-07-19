import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDtoTypePut } from './dto/updateTypePut-user.dto';
import { UpdateUserDtoTypePatch } from './dto/updateTypePatch-user.dto';
import { UserService } from './user.service';
import { RolesDecorator } from '../decorators/role.decorator';
import { Role } from '../enums/role.enum';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { ParamID } from '../decorators/paramId.decorator';

@RolesDecorator(Role.Admin)
@UseGuards(AuthGuard, RoleGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createUser(
    @Body() { email, name, password, birthAt, role }: CreateUserDto,
  ) {
    return this.userService.createUser({
      email,
      name,
      password,
      birthAt,
      role,
    });
  }

  @RolesDecorator(Role.Admin)
  @Get('all')
  async readAllUsers() {
    return this.userService.readAllUsers();
  }

  @Get(':id')
  async readUniqueUser(@ParamID() id: number) {
    this.userService.verifyUserIdExists(id);
    return this.userService.readUniqueUser(id);
  }

  @Put(':id')
  async updateUser(@Body() data: UpdateUserDtoTypePut, @ParamID() id: number) {
    this.userService.verifyUserIdExists(id);
    return this.userService.updateUser(id, data);
  }

  @Patch(':id')
  async partialUpdateUser(
    @Body() data: UpdateUserDtoTypePatch,
    @ParamID() id: number,
  ) {
    this.userService.verifyUserIdExists(id);
    return this.userService.partialUpdateUser(id, data);
  }

  @Delete(':id')
  async deleteUser(@ParamID() id: number) {
    this.userService.verifyUserIdExists(id);
    return {
      success: await this.userService.deleteUser(id),
    };
  }
}
