import { Module, forwardRef } from "@nestjs/common";
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "src/user/user.module";
import { PrismaModule } from "src/prisma/prisma.module";
import { AuthGuard } from "src/guards/auth.guard";

@Module({
    imports: [
        JwtModule.register({
            secret: 'l8S6$85s62c934J@3AYl&c43esYOr4cG'
        }),
        forwardRef(() => UserModule), 
        PrismaModule
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule {

}