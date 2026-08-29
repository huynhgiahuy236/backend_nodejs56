import { Injectable } from '@nestjs/common';
import type { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
  login(body:LoginDto) {
    return 'login successful';
  }
}
