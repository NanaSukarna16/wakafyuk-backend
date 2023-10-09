import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsernameLogin } from './username-login.dto';
import { Register } from './register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('username_login')
  @HttpCode(HttpStatus.OK)
  usernameLogin(@Body() payload: UsernameLogin) {
    return this.authService.usernameLogin(payload.username, payload.password);
  }

  @Post('register')
  register(@Body() payload: Register) {
    return this.authService.register(payload);
  }
}
