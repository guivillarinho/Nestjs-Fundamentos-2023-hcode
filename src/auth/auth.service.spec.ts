import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { userRepositoryMock } from '../testing/userRepository.mock';
import { jwtServiceMock } from '../testing/jwtService.mock';
import { mailerServiceMock } from '../testing/mailerService.mock';
import { userServiceMock } from '../testing/userService.mock';
import { userEntityList } from '../testing/userEntity.mock';
import { jwtAccessTokenMock } from '../testing/jwtAccessToken.mock';
import { jwtPayloadMock } from '../testing/jwtPayload.mock';

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
  describe('Authentication', () => {});
});
