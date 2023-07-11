import { Body, Controller, Post, Get, Put, Patch, Delete, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDtoTypePut } from "./dto/updateTypePut-user.dto";
import { UpdateUserDtoTypePatch } from "./dto/updateTypePatch-user.dto";
import { UserService } from "./user.service";
import { ParamID } from "src/decorators/paramId.decorator";
import { RolesDecorator } from "src/decorators/role.decorator";
import { Role } from "src/enums/role.enum";
import { RoleGuard } from "src/guards/role.guard";
import { AuthGuard } from "src/guards/auth.guard";
// @RolesDecorator(Role.Admin)
// @UseGuards(AuthGuard ,RoleGuard)
@Controller('users')
export class UserController{
    constructor(private readonly userService: UserService){}

    @Post('create')
    async createUser(
        @Body() {email, name, password, birthAt, role}: CreateUserDto
    ){
        return this.userService.createUser({email, name, password, birthAt, role});
    }
    
    @RolesDecorator(Role.Admin, Role.User)
    @Get('all')
    async readAllUsers() {
        return this.userService.readAllUsers()
    }


    @Get(':id')
    async readUniqueUser(
        @ParamID() id: number
    ) {
        this.userService.verifyUserIdExists(id)
        return this.userService.readUniqueUser(id)
    }
    
    @Put(':id')
    async updateUser(
        @Body() data: UpdateUserDtoTypePut, 
        @ParamID() id: number
    ){
        this.userService.verifyUserIdExists(id)
        return this.userService.updateUser(id, data)
    }

    @Patch(':id')
    async partialUpdateUser(
        @Body() data: UpdateUserDtoTypePatch, 
        @ParamID() id: number
    ){
        this.userService.verifyUserIdExists(id)
        return this.userService.partialUpdateUser(id, data)
    }

    @Delete(':id')
    async deleteUser(
        @ParamID() id: number
    ){
        this.userService.verifyUserIdExists(id)
        return this.userService.deleteUser(id)
    }
}