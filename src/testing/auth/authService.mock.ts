import { AuthService } from '../../auth/auth.service';
import { jwtAccessTokenMock } from '../jwt/jwtAccessToken.mock';
import { jwtPayloadMock } from '../jwt/jwtPayload.mock';
import { userEntityList } from '../user/userEntity.mock';

export const authServiceMock = {
  provide: AuthService,
  useValue: {
    createToken: jest.fn().mockReturnValue(jwtAccessTokenMock),
    checkToken: jest.fn().mockReturnValue(jwtPayloadMock),
    isAuthenticated: jest.fn().mockReturnValue(true),
    login: jest.fn().mockResolvedValue(jwtAccessTokenMock),
    registerUser: jest.fn().mockResolvedValue(jwtAccessTokenMock),
    forgetPassword: jest.fn().mockResolvedValue(true),
    resetPassword: jest.fn().mockResolvedValue(jwtAccessTokenMock),
    findUserInDataBase: jest.fn().mockResolvedValue(userEntityList[0]),
  },
};
