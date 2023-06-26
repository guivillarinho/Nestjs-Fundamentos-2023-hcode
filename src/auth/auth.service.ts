import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";

import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private readonly JwtService: JwtService, 
        private readonly prisma: PrismaService
    ){}

    async createToken() {
        return this.JwtService.sign({})
    }

    async checkToken(token: string){
        // return this.JwtService.verify(token)
    }

    async login(email: string, password: string){

        const VerifyIfUserExists = await this.findUserInDataBase(email, password)

        if(!VerifyIfUserExists){
            throw new UnauthorizedException('Usuário ou senha estão incorretos!')
        }
         return VerifyIfUserExists
    }
    
    
    async forgetPassword(email: string){
        const user = await this.prisma.user.findFirst({
            where: {
                email,
            }
        })

        if(!user){
            throw new UnauthorizedException('O e-mail está incorreto!')
        }
        return user
    }
    
    async resetPassword(password: string, token: string){
        //Se o token, for válido.
        
        const id = 0;
        
        await this.prisma.user.update({
            where: {
                id,
            },
            data: {
                password,
            }
        })
        
        return true;
    }
    
    async findUserInDataBase(email: string, password: string){
        const user = await this.prisma.user.findFirst({
            where: {
                email,
            }
        })
    
        if(!user){
            throw new UnauthorizedException('Usuário ou senha incorretos!')
        }
    
        const passwordVerify= await bcrypt.compare(password, user.password)
    
        if(!passwordVerify){
            throw new UnauthorizedException('Usuário ou senha incorretos!')
        }
    
        return user
    }
}