import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  SetMetadata,
} from '@nestjs/common';
import { AuthService } from './auth.services.js';
import { LoginDto } from './dto/login.dto.js';
import { RegisterDto } from './dto/register.dto.js';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @SetMetadata('isPublic', true)
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @Post('login')
  @SetMetadata('isPublic', true)
  async login(
    @Body()
    body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(body);
    res.cookie('accessToken', result.accessToken);
    res.cookie('refreshToken', result.refreshToken);
    return true;
  }

  @Get('get-info')
  async getInfo(@Req() req: { user: unknown }) {
    return req.user;
  }
}
