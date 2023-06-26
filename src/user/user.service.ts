import { ConflictException, Injectable, NotFoundException, Param } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateUserDtoTypePut } from "./dto/updateTypePut-user.dto";
import { UpdateUserDtoTypePatch } from "./dto/updateTypePatch-user.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}
    async createUser({ email, name, password }: CreateUserDto){
    const hashedPassword = await bcrypt.hash(password, 8)
    await this.verifyUserEmailExists(email)

       return await this.prisma.user.create({
            data: {
                email,
                name, 
                password: hashedPassword
            }
        })

    }

    async readAllUsers(){
        return await this.prisma.user.findMany()
    }

    async readUniqueUser( id: number ){
        await this.verifyUserIdExists(id)
        return await this.prisma.user.findUnique({
            where: {
                id,
            }
        })
    }

    async updateUser( id: number, {email, name, password, birthAt}:UpdateUserDtoTypePut){
        await this.verifyUserIdExists(id)
        return await this.prisma.user.update({
            data: {email, name, password, birthAt: birthAt ? new Date(birthAt) : null},
            where: {
                id  
            }
        })
    }

    async partialUpdateUser( id: number, {name, email, password, birthAt}:UpdateUserDtoTypePatch){

        const data: UpdateUserDtoTypePatch = {
            name, 
            email, 
            password, 
            birthAt: birthAt && new Date(birthAt) 
        }
        await this.verifyUserIdExists(id)
        return await this.prisma.user.update({
            data,
            where: {
                id  
            }
        })
    }

    async deleteUser( id: number ){
        await this.verifyUserIdExists(id)
        return await this.prisma.user.delete({
            where: {
                id
            }
        })
    }

    async verifyUserIdExists( id: number ){
        if(!(await this.prisma.user.count({
            where:{ id }
        }))){
            throw new NotFoundException('Usuário não encontrado')
        }
    }

    async verifyUserEmailExists(email: string){
        const userExists = await this.prisma.user.findUnique({
            where: {
                email
            }
        })

        if(userExists){
            throw new ConflictException(`O e-mail ${userExists.email} já existe`)
        }
    }
} 