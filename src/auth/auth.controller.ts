import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('username_login')
  usernameLogin(@Body() payload: any) {
    return payload;
    return this.authService.usernameLogin('demo_user', 'password');
  }
}
