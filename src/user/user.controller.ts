import { Body, Controller, Post, Get, Param, Put, Patch, Delete } from "@nestjs/common";

@Controller('users')
export class UserController{
    @Get('all')
    async readAllUsers() {
        return {users: [{name: 'Guilherme'}, {name: 'Gustavo'}]}
    }

    @Get(':id')
    async readUniqueUser(@Param() params) {
        return {user: {name: 'Guilherme'}, params}
    }


    @Post('create')
    async createUser(@Body() body){
        return {body};
    }

    @Put(':id')
    async updateUser(@Body() body, @Param() params){
        return {
            method: 'put',
            body,
            params
        }
    }

    @Patch(':id')
    async partialUpdateUser(@Body() body, @Param() params){
        return {
            method: 'patch',
            body,
            params
        }
    }

    @Delete(':id')
    async deleteUser(@Body() body, @Param() params){
        return {
            method: 'delete',
            body,
            params
        }
    }
}