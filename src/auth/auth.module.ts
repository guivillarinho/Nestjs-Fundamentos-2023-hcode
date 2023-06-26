import { Module } from "@nestjs/common";
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "src/user/user.module";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    imports: [
        JwtModule.register({
            secret: 'l8S6$85s62c934J@3AYl&c43esYOr4cG'
        }),
        UserModule, 
        PrismaModule
    ],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {

}