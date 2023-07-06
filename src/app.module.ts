import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

import {ThrottlerGuard, ThrottlerModule} from '@nestjs/throttler'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core';

import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
@Module({
  imports: [
    forwardRef(() => UserModule),
    PrismaModule,
    forwardRef(() => AuthModule),
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 20
    }),
    MailerModule.forRoot({
      transport: 'smtps://faustino.towne@ethereal.email:4YGjf6YzxjrW4VcDEa@smtp.ethereal.email',
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
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
