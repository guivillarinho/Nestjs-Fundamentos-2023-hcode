import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { User } from "@prisma/client";
import { ROLE_KEYS } from "src/decorators/role.decorator";
import { Role } from "src/enums/role.enum";

@Injectable()
export class RoleGuard implements CanActivate{

    constructor( private readonly reflector: Reflector){}

    async canActivate(context: ExecutionContext) {
        const requiredRoles = this.reflector.getAllAndOverride(ROLE_KEYS, [context.getHandler(), context.getClass()])

        if(!requiredRoles){
            return true
        }
        
        const {user} = context.switchToHttp().getRequest()

        if(user.role !== Role.Admin){
            throw new UnauthorizedException('Usuário não validado')
        }

        return true
    }
}