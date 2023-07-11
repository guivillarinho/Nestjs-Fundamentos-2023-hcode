import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

import {ThrottlerGuard, ThrottlerModule} from '@nestjs/throttler'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core';

import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

import { TypeOrmModule } from "@nestjs/typeorm"
import { UserEntity } from './user/entity/user.entity';
@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 20
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'tyshawn23@ethereal.email',
            pass: 'VdG4m7VaSWmrBdh86n'
        }
      },
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

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [UserEntity],
      synchronize: process.env.ENV === "development",
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
