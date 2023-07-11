import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDtoTypePut } from "./dto/updateTypePut-user.dto";
import { UpdateUserDtoTypePatch } from "./dto/updateTypePatch-user.dto";
import * as bcrypt from 'bcrypt';
import { Repository } from "typeorm";
import { UserEntity } from "./entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    async createUser({ email, name, password }: CreateUserDto){
        const hashedPassword = await bcrypt.hash(password, 8)
        await this.verifyUserEmailExists(email)

        const createdUser = this.userRepository.create({
            email,
            name, 
            password: hashedPassword
        })

        return this.userRepository.save(createdUser)
    }

    async readAllUsers(){
        return await this.userRepository.find()
    }

    async readUniqueUser( id: number ){
        await this.verifyUserIdExists(id)
        return await this.userRepository.findOne({
            where: {
                id,
            }
        })
    }

    async updateUser( id: number, {email, name, password, birthAt}:UpdateUserDtoTypePut){
        // await this.verifyUserIdExists(id)

        // const hashedPassword = await bcrypt.hash(password, 8)

        // return await this.prisma.user.update({
        //     data: {email, name, password: hashedPassword, birthAt: birthAt ? new Date(birthAt) : null},
        //     where: {
        //         id  
        //     }
        // })
    }

    async partialUpdateUser( id: number, {name, email, password, birthAt, role}:UpdateUserDtoTypePatch){

        const hashedPassword = await bcrypt.hash(password, 8)

        const data: UpdateUserDtoTypePatch = {
            name, 
            email, 
            password: hashedPassword, 
            birthAt: birthAt && new Date(birthAt),
            role,
        }
        await this.verifyUserIdExists(id)
        // return await this.prisma.user.update({
        //     data,
        //     where: {
        //         id  
        //     }
        // })
    }

    async deleteUser( id: number ){
        // await this.verifyUserIdExists(id)
        // return await this.prisma.user.delete({
        //     where: {
        //         id
        //     }
        // })
    }

    async verifyUserIdExists( id: number ){
        // if(!(await this.prisma.user.count({
        //     where:{ id }
        // }))){
        //     throw new NotFoundException('Usuário não encontrado')
        // }
    }

    async verifyUserEmailExists(email: string){
        const userExists = await this.userRepository.findOne({
            where: {
                email
            }
        })

        if(userExists){
            throw new ConflictException(`O e-mail ${userExists.email} já existe`)
        }
    }
} 