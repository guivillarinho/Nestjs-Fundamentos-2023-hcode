import { AuthResetPasswordDto } from '../../auth/dto/authResetPassword.dto';
import { jwtResetTokenMock } from '../jwt/jwtResetToken.mock';

export const authResetPasswordDtoMock: AuthResetPasswordDto = {
  password: 'Vill@24*',
  token: jwtResetTokenMock,
};
