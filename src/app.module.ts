import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

import {ThrottlerGuard, ThrottlerModule} from '@nestjs/throttler'
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PrismaModule,
    forwardRef(() => AuthModule),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 20
    })
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ({
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    })
  ],
  exports: [AppService]
})
export class AppModule {}
