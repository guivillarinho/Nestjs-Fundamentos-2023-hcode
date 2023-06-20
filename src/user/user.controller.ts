import { Body, Controller, Post, Get, Param, Put, Patch, Delete, ParseIntPipe } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDtoTypePut } from "./dto/updateTypePut-user.dto";
import { UpdateUserDtoTypePatch } from "./dto/updateTypePatch-user.dto";
import { UserService } from "./user.service";

@Controller('users')
export class UserController{
    constructor(private readonly userService: UserService){}

    @Post('create')
    async createUser(
        @Body() data: CreateUserDto
    ){
        return this.userService.createUser(data);
    }
    
    @Get('all')
    async readAllUsers() {
        return this.userService.readAllUsers()
    }

    @Get(':id')
    async readUniqueUser(
        @Param('id') id: string
    ) {
        this.userService.verifyExists(id)
        return this.userService.readUniqueUser(id)
    }


    @Put(':id')
    async updateUser(
        @Body() data: UpdateUserDtoTypePut, 
        @Param('id') id: string
    ){
        this.userService.verifyExists(id)
        return this.userService.updateUser(id, data)
    }

    @Patch(':id')
    async partialUpdateUser(
        @Body() data: UpdateUserDtoTypePatch, 
        @Param('id') id: string
    ){
        this.userService.verifyExists(id)
        return this.userService.partialUpdateUser(id, data)
    }

    @Delete(':id')
    async deleteUser(
        @Param('id') id: string
    ){
        this.userService.verifyExists(id)
        return this.userService.deleteUser(id)
    }
}