import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  usernameLogin(username: string, password: string) {
    return { username, password };
  }
}
