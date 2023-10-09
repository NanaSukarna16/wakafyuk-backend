import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Firestore, getFirestore } from 'firebase-admin/firestore';
import { compareSync, hashSync } from 'bcryptjs';
import { Auth, getAuth, CreateRequest } from 'firebase-admin/auth';
import { Register } from './register.dto';

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

    const token = await this.auth.createCustomToken(snap.get('uid'));

    return {
      token: token,
      message: 'Login Berhasil',
    };
  }

  async register(data: Register) {
    const createUserPayload: CreateRequest = { displayName: data.name };
    if (data.email) {
      createUserPayload.email = data.email;
      createUserPayload.password = data.password;
    }

    if (data.phone) {
      createUserPayload.phoneNumber = data.phone;
    }

    const { uid } = await this.auth.createUser(createUserPayload);

    const batch = this.db.batch();
    const userRef = this.db.collection('users').doc(uid);

    batch.set(userRef, {
      nama_lengkap: data.name,
      email: data.email ?? null,
      nomor_telepon: data.phone ?? null,
      username: data.username ?? null,
    });

    if (data.username) {
      const accountRef = this.db.collection('accounts').doc(data.username);

      batch.set(accountRef, {
        username: data.username,
        password: hashSync(data.password, 12),
        uid: uid,
      });
    }

    await batch.commit();

    const token = await this.auth.createCustomToken(uid);

    return {
      token: token,
      message: 'Registrasi berhasil',
    };
  }
}
