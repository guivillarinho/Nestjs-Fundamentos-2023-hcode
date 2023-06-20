import { Injectable, Param } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateUserDtoTypePut } from "./dto/updateTypePut-user.dto";
import { UpdateUserDtoTypePatch } from "./dto/updateTypePatch-user.dto";

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async createUser({email, name, password}: CreateUserDto){
       return await this.prisma.user.create({
            data: {
                email,
                name,
                password
            },
        })
    }

    async readAllUsers(){
        return await this.prisma.user.findMany()
    }

    async readUniqueUser(id: string){
        return await this.prisma.user.findUnique({where: {
            id,
        }})
    }

    async updateUser(id: string, {email, name, password, birthAt}:UpdateUserDtoTypePut){

        return await this.prisma.user.update({
            data: {email, name, password, birthAt: birthAt ? new Date(birthAt) : null},
            where: {
                id  
            }
        })
    }

    async partialUpdateUser(id: string, {name, email, password, birthAt}:UpdateUserDtoTypePatch){
    
        const data: any = {name, email, password, birthAt: birthAt ? new Date(birthAt) : birthAt}

        return await this.prisma.user.update({
            data,
            where: {
                id  
            }
        })
    }

    async deleteUser(id: string){
        return await this.prisma.user.delete({
            where: {
                id
            }
        })
    }
} 