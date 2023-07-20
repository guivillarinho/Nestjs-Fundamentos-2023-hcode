import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthGuard } from '../guards/auth.guard';
import { guardMock } from '../testing/guard/guard.mock';
import { authServiceMock } from '../testing/auth/authService.mock';
import { fileServiceMock } from '../testing/file/fileService.mock';
import { authLoginDtoMock } from '../testing/auth/authLoginDto.mock';
import { jwtAccessTokenMock } from '../testing/jwt/jwtAccessToken.mock';
import { authRegisterUserDtoMock } from '../testing/auth/authRegisterUserDto.mock';
import { authForgetPasswordDtoMock } from '../testing/auth/authForgetPasswordDto.mock';
import { authResetPasswordDtoMock } from '../testing/auth/authResetPasswordDto.mock';
import { userEntityList } from '../testing/user/userEntity.mock';
import { getFile } from '../testing/file/file.mock';

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [authServiceMock, fileServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(guardMock)
      .compile();

    authController = module.get<AuthController>(AuthController);
  });

  test('Definition validation', () => {
    expect(authController).toBeDefined();
  });

  describe('Authentication', () => {
    test('login', async () => {
      const result = await authController.login(authLoginDtoMock);

      expect(result).toEqual(jwtAccessTokenMock);
    });

    test('registerUser', async () => {
      const result = await authController.registerUser(authRegisterUserDtoMock);

      expect(result).toEqual(jwtAccessTokenMock);
    });

    test('forgetPassword', async () => {
      const result = await authController.forgetPassword(
        authForgetPasswordDtoMock,
      );

      expect(result).toEqual(true);
    });

    test('resetPassword', async () => {
      const result = await authController.resetPassword(
        authResetPasswordDtoMock,
      );

      expect(result).toEqual(jwtAccessTokenMock);
    });
  });

  describe('File Upload', () => {
    test('uploadFile', async () => {
      const file = await getFile();

      const result = await authController.uploadFile(userEntityList[0], file);

      expect(result).toEqual({ success: true });
    });

    test('uploadFiles', async () => {
      const file = await getFile();

      const result = await authController.uploadFiles(Array(file));

      expect(result).toEqual({ success: true });
    });
  });

  describe('User information', () => {
    test('me', async () => {
      const result = await authController.me(userEntityList[0]);

      expect(result).toEqual(userEntityList[0]);
    });
  });
});
