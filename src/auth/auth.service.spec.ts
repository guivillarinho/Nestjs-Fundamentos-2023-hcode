import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { jwtServiceMock } from '../testing/jwt/jwtService.mock';
import { mailerServiceMock } from '../testing/mail/mailerService.mock';

import { authUserRegisterDtoMock } from '../testing/auth/authUserRegisterDto.mock';
import { userServiceMock } from '../testing/user/userService.mock';
import { userRepositoryMock } from '../testing/user/userRepository.mock';
import { jwtAccessTokenMock } from '../testing/jwt/jwtAccessToken.mock';
import { jwtPayloadMock } from '../testing/jwt/jwtPayload.mock';
import { userEntityList } from '../testing/user/userEntity.mock';
import { jwtResetTokenMock } from '../testing/jwt/jwtResetToken.mock';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        userServiceMock,
        userRepositoryMock,
        jwtServiceMock,
        mailerServiceMock,
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });
  test('Definition validation', () => {
    expect(authService).toBeDefined();
  });

  describe('Token', () => {
    test('createToken', () => {
      const result = authService.createToken(userEntityList[0]);

      expect(result).toEqual(jwtAccessTokenMock);
    });

    test('checkToken', () => {
      const result = authService.checkToken(jwtAccessTokenMock);

      expect(result).toEqual(jwtPayloadMock);
    });

    test('isAuthenticated', () => {
      const result = authService.isAuthenticated(jwtAccessTokenMock);

      expect(result).toEqual(true);
    });
  });

  describe('Authentication', () => {
    test('login', async () => {
      const result = await authService.login(
        'guilherme.villarinho@gmail.com',
        'Vill@23*',
      );

      expect(result).toEqual(jwtAccessTokenMock);
    });

    test('forgetPassword', async () => {
      const result = await authService.forgetPassword(
        'guilherme.villarinho@gmail.com',
      );

      expect(result).toEqual({ success: true });
    });

    test('resetPassword', async () => {
      const result = await authService.resetPassword(
        'Vill@24*',
        jwtResetTokenMock,
      );

      expect(result).toEqual(jwtAccessTokenMock);
    });

    test('registerUser', async () => {
      const result = await authService.registerUser(authUserRegisterDtoMock);

      expect(result).toEqual(jwtAccessTokenMock);
    });
  });
});
