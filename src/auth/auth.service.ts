import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Firestore, getFirestore } from 'firebase-admin/firestore';
import { compareSync } from 'bcryptjs';
import { Auth, getAuth } from 'firebase-admin/auth';

@Injectable()
export class AuthService {
  private readonly auth: Auth = getAuth();
  private readonly db: Firestore = getFirestore();

  async usernameLogin(username: string, password: string) {
    const snap = await this.db.collection('accounts').doc(username).get();

    if (!snap.exists) {
      throw new HttpException('Akun Tidak ditemukan', HttpStatus.NOT_FOUND);
    }

    const isPasswordCorrect = compareSync(password, snap.get('password'));

    if (!isPasswordCorrect) {
      throw new HttpException(
        'Username atau password salah',
        HttpStatus.BAD_REQUEST,
      );
    }

    const token = await this.auth.createCustomToken(username);

    return {
      token: token,
      message: 'Login Berhasil',
    };
  }
}
