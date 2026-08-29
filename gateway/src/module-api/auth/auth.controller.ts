import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.services.js';
import type { LoginDto } from './dto/login.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // Dto kiểm soát request
  @Post('login')
  login(
    @Body()
    body: LoginDto
  ) {
    return this.authService.login(body);
  }
}
