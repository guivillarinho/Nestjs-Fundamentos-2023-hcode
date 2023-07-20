import { JwtService } from '@nestjs/jwt';
import { jwtAccessTokenMock } from './jwtAccessToken.mock';
import { jwtPayloadMock } from './jwtPayload.mock';

export const jwtServiceMock = {
  provide: JwtService,
  useValue: {
    sign: jest.fn().mockReturnValue(jwtAccessTokenMock),
    verify: jest.fn().mockReturnValue(jwtPayloadMock),
  },
};
