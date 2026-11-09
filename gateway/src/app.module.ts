import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './module-api/auth/auth.module.js';
import { PrismaModule } from './module-system/prisma/prisma.module.js';
import { ProtectGuard } from './common/guard/protect.guard.js';
import { APP_GUARD } from '@nestjs/core';
import { TokenModule } from './module-system/token/token.module.js';

@Module({
  imports: [AuthModule, PrismaModule,TokenModule],
  controllers: [AppController],
  providers: [AppService,{
    provide: APP_GUARD,
    useClass: ProtectGuard,
  }],
})
export class AppModule {}
