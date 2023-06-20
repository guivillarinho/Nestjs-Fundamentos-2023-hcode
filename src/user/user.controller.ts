import { Body, Controller, Post, Get, Param, Put, Patch, Delete, ParseIntPipe } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDtoTypePut } from "./dto/updateTypePut-user.dto";
import { UpdateUserDtoTypePatch } from "./dto/updateTypePatch-user.dto";

@Controller('users')
export class UserController{
    @Get('all')
    async readAllUsers() {
        return {users: [{name: 'Guilherme'}, {name: 'Gustavo'}]}
    }

    @Get(':id')
    async readUniqueUser(@Param('id', ParseIntPipe) id: number) {
        return {user: {name: 'Guilherme'}, id}
    }

    @Post('create')
    async createUser(@Body() body: CreateUserDto){
        return {body};
    }

    @Put(':id')
    async updateUser(@Body() body: UpdateUserDtoTypePut, @Param('id', ParseIntPipe) id: number){
        return {
            method: 'put',
            body,
            id
        }
    }

    @Patch(':id')
    async partialUpdateUser(@Body() body: UpdateUserDtoTypePatch, @Param('id', ParseIntPipe) id: number){
        return {
            method: 'patch',
            body,
            id
        }
    }

    @Delete(':id')
    async deleteUser( @Param('id', ParseIntPipe) id: number){
        return {
           id
        }
    }
}