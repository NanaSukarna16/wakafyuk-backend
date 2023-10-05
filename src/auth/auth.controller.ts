import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('username_login')
  @HttpCode(HttpStatus.OK)
  usernameLogin(@Body() payload: any) {
    return this.authService.usernameLogin(payload.username, payload.password);
  }
}
