import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { isEmpty } from 'lodash';

export class Register {
  @IsNotEmpty({ message: 'Harap Mengisi nama lengkap' })
  @MinLength(4, {
    message: 'Nama lengkap minimal 4 karakter',
  })
  name: string;

  @ValidateIf((register) => isEmpty(register.username))
  @IsNotEmpty({ message: 'Harap mengisi email atau username' })
  @IsEmail(undefined, { message: 'Format email salah' })
  email: string;

  @IsOptional()
  @IsPhoneNumber('ID', {
    message: 'Harap menggunakan format nomor telepon +62',
  })
  phone: string;

  @ValidateIf((register) => isEmpty(register.email))
  @IsNotEmpty({ message: 'Harap mengisi username' })
  @IsString({ message: 'Format username salah' })
  @Matches(/^(?=[a-zA-Z0-9._]{4,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/, {
    message: 'Format username salah',
  })
  @MinLength(4, {
    message: 'Username minimal 4 karakter',
  })
  username: string;

  @IsNotEmpty({ message: 'Harap mengisi password' })
  @IsString()
  @MinLength(6, {
    message: 'Username minimal 6 karakter',
  })
  password: string;
}
