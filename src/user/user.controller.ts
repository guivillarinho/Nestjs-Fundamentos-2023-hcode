import { Body, Controller, Post, Get, Param, Put, Patch, Delete, ParseIntPipe, UseInterceptors } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDtoTypePut } from "./dto/updateTypePut-user.dto";
import { UpdateUserDtoTypePatch } from "./dto/updateTypePatch-user.dto";
import { UserService } from "./user.service";
import { ParamID } from "src/decorators/paramId.decorator";

@Controller('users')
export class UserController{
    constructor(private readonly userService: UserService){}

    
    @Post('create')
    async createUser(
        @Body() {email, name, password, birthAt}: CreateUserDto
    ){
        return this.userService.createUser({email, name, password, birthAt});
    }
    
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