import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.services.js';
import { LoginDto } from './dto/login.dto.js';
import type { Response } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // Dto kiểm soát request
  @Post('login')
  async login(
    @Body()
    body: LoginDto,
    //@query. @param. @body. @headers. @request. @response. @session. @cookies. @next. @locals. @user. @ip. @hostname. @protocol. @secure. @xhr. @method. @url. @originalUrl. @path. @querystring. @params. @bodyParserOptions.
    // passthrough:true để cho phép NestJS tiếp tục xử lý response sau khi controller trả về dữ liệu
    @Res({passthrough:true})
    res: Response
  ) {
    const result= await this.authService.login(body);
    res.cookie('accessToken', result.accessToken);
    res.cookie('refreshToken', result.refreshToken);
    return true;
  }
}
