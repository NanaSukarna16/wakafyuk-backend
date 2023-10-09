import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';
export class UsernameLogin {
  @IsNotEmpty({ message: 'Harap mengisi username' })
  @IsString({ message: 'Format username salah' })
  @Matches(/^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/, {
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
