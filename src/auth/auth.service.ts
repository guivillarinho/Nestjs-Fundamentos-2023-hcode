import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";

import * as bcrypt from 'bcrypt'
import { User } from "@prisma/client";
import { AuthRegisterDto } from "./dto/authRegister.dto";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly JwtService: JwtService, 
        private readonly prisma: PrismaService,
        private readonly userService: UserService
    ){}

         createToken(user: User) {
        return {
            accessToken: this.JwtService.sign({
                id: user.id,
                name: user.name,
                email: user.email
            }, {
                expiresIn: '1d',
                subject: String(user.id),
                issuer: 'login',
                audience: 'users'
            })
        }
    }

    checkToken(token: string){
         try {
            const data = this.JwtService.verify(token, {
                audience: 'users',
                issuer: 'login',
            })
            return data
        } catch (error) {
            throw new BadRequestException(error)
        }  
    }

    isAuthenticated(token: string){
        try {
            this.checkToken(token)
            return true;
        } catch (error) {
            return false
        }
    }

    async login(email: string, password: string){
        const existingUser = await this.findUserInDataBase(email, password)
        
        if(!existingUser){
            throw new UnauthorizedException('Usuário ou senha estão incorretos!')
        }
        const token = this.createToken(existingUser)
        return token
    }

    async registerUser(data: AuthRegisterDto){
        const user = await this.userService.createUser(data)
        return this.createToken(user)
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
        
        const user = await this.prisma.user.update({
            where: {
                id,
            },
            data: {
                password,
            }
        })
        
         
        return this.createToken(user)
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