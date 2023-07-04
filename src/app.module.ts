import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [forwardRef(() => UserModule), PrismaModule, forwardRef(() => AuthModule)],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService]
})
export class AppModule {}
