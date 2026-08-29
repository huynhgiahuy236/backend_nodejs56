import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.services.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login() {
    return this.authService.login();
  }
}
