import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserService } from './user.service';
import { UserIDlMiddlewareVerify } from './middleware/user.middleware';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [],
})
export class UserModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
      consumer
      .apply(UserIDlMiddlewareVerify)
      .forRoutes({
        path: 'users/:id',
        method: RequestMethod.ALL
      })
  }
}
