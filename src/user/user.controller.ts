import { Body, Controller, Post, Get, Put, Patch, Delete } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDtoTypePut } from "./dto/updateTypePut-user.dto";
import { UpdateUserDtoTypePatch } from "./dto/updateTypePatch-user.dto";
import { UserService } from "./user.service";
import { ParamID } from "src/decorators/paramId.decorator";
import { RolesDecorator } from "src/decorators/role.decorator";
import { Role } from "src/enums/role.enum";

@Controller('users')
export class UserController{
    constructor(private readonly userService: UserService){}

    @RolesDecorator(Role.Admin)
    @Post('create')
    async createUser(
        @Body() {email, name, password, birthAt}: CreateUserDto
    ){
        return this.userService.createUser({email, name, password, birthAt});
    }
    
    @RolesDecorator(Role.Admin)
    @Get('all')
    async readAllUsers() {
        return this.userService.readAllUsers()
    }

    @RolesDecorator(Role.Admin)
    @Get(':id')
    async readUniqueUser(
        @ParamID() id: number
    ) {
        this.userService.verifyUserIdExists(id)
        return this.userService.readUniqueUser(id)
    }

    @RolesDecorator(Role.Admin)
    @Put(':id')
    async updateUser(
        @Body() data: UpdateUserDtoTypePut, 
        @ParamID() id: number
    ){
        this.userService.verifyUserIdExists(id)
        return this.userService.updateUser(id, data)
    }

    @RolesDecorator(Role.Admin)
    @Patch(':id')
    async partialUpdateUser(
        @Body() data: UpdateUserDtoTypePatch, 
        @ParamID() id: number
    ){
        this.userService.verifyUserIdExists(id)
        return this.userService.partialUpdateUser(id, data)
    }

    @RolesDecorator(Role.Admin)
    @Delete(':id')
    async deleteUser(
        @ParamID() id: number
    ){
        this.userService.verifyUserIdExists(id)
        return this.userService.deleteUser(id)
    }
}