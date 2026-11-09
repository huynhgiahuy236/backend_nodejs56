import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TokenService } from '../../module-system/token/token.service.js';
import { PrismaService } from '../../module-system/prisma/prisma.service.js';

@Injectable()
export class ProtectGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly prisma: PrismaService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const { accessToken } = req.cookies ?? {};

    if (!accessToken) {
      throw new BadRequestException('Không có AccessToken');
    }

    const decode = this.tokenService.verifyAccessToken(accessToken);
    const userExists = await this.prisma.users.findUnique({
      where: {
        id: decode.userId,
      },
    });

    if (!userExists) {
      throw new BadRequestException('Người dùng không tồn tại');
    }

    req.user = userExists;
    return true;
  }
}
